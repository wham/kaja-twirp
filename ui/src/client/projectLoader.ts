import { MethodInfo, RpcTransport, ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { TwirpFetchTransport } from "@protobuf-ts/twirp-transport";
import ts from "typescript";
import { defaultInput } from "./defaultInput";
import { defaultInput2 } from "./defaultInput2";
import { ExtraLib, InterfaceMap, Method, Project, Service } from "./project";

export async function loadProject(): Promise<Project> {
  const sourceFiles = await loadSourceFiles();
  const modules = await loadModules();
  const interfaceMap = createInterfaceMap(sourceFiles);

  const services: Service[] = [];
  const extraLibs: ExtraLib[] = [];

  sourceFiles.forEach((sourceFile) => {
    const interfaces = sourceFile.statements.filter((statement): statement is ts.InterfaceDeclaration => ts.isInterfaceDeclaration(statement));
    const serviceInterfaceDefinitions: ts.VariableStatement[] = [];
    const serviceNames = findServiceNames(sourceFile);
    const module = modules["./" + sourceFile.fileName];

    serviceNames.forEach((serviceName) => {
      if (module && module[serviceName]) {
        const serviceInfo: ServiceInfo = module[serviceName];
        const methods: Method[] = [];
        const { interfaceDeclaration } = interfaceMap["I" + serviceName + "Client"];
        serviceInfo.methods.forEach((methodInfo) => {
          const methodName = methodInfo.name;
          const globalTrigger = async (input: any) => {
            const url = new URL(window.location.href);
            const urlWithoutPath = `${url.protocol}//${url.hostname}${url.port ? ":" + url.port : ""}`;

            let transport = new TwirpFetchTransport({
              baseUrl: urlWithoutPath + "/twirp",
            });

            let client = await createClient(serviceName, transport, interfaceMap);

            let { response } = await (client as any)[methodName](input);

            (window as any)["GOUT"](JSON.stringify(response));
          };

          methods.push({
            name: methodName,
            editorCode: methodEditorCode2(methodInfo),
            globalTrigger,
          });
        });
        services.push({
          name: serviceName,
          methods,
          info: serviceInfo,
        });

        if (interfaceDeclaration) {
          const funcs: ts.PropertyAssignment[] = [];
          interfaceDeclaration.members.forEach((member) => {
            if (!ts.isMethodSignature(member)) {
              return;
            }

            if (!member.name) {
              return;
            }

            const methodName = member.name.getText(sourceFile);
            const inputParameter = getInputParameter(member, sourceFile);

            if (!inputParameter || !inputParameter.type) {
              return;
            }

            const inputParameterType = inputParameter.type.getText(sourceFile);

            const func = ts.factory.createPropertyAssignment(
              methodName,
              ts.factory.createArrowFunction(
                [ts.factory.createModifier(ts.SyntaxKind.AsyncKeyword)],
                undefined,
                [
                  ts.factory.createParameterDeclaration(
                    undefined,
                    undefined,
                    undefined,
                    "input",
                    undefined,
                    ts.factory.createTypeReferenceNode(ts.factory.createIdentifier(inputParameterType), undefined),
                  ),
                ],
                undefined,
                ts.factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
                ts.factory.createBlock([]),
                /*this.proxyBody(protoService, protoMethod)*/
              ),
            );
            funcs.push(func);
          });

          const serviceInterfaceDefinition = ts.factory.createVariableStatement(
            undefined,
            ts.factory.createVariableDeclarationList(
              [
                ts.factory.createVariableDeclaration(
                  ts.factory.createIdentifier(serviceName),
                  undefined,
                  undefined,
                  ts.factory.createObjectLiteralExpression(funcs),
                ),
              ],
              ts.NodeFlags.Const,
            ),
          );

          serviceInterfaceDefinitions.push(serviceInterfaceDefinition);
        }
      }
    });

    if (serviceInterfaceDefinitions.length > 0 || interfaces.length > 0) {
      extraLibs.push({
        filePath: sourceFile.fileName,
        content: printStatements([...serviceInterfaceDefinitions, ...interfaces]),
      });
    }
  });

  return {
    services,
    extraLibs,
  };
}

export function extractClientName(interfaceName: string): string | undefined {
  if (interfaceName.startsWith("I") && interfaceName.endsWith("Client") && interfaceName.length > 7) {
    return interfaceName.substring(1, interfaceName.length - 6);
  }

  return undefined;
}

async function loadSourceFiles(): Promise<ts.SourceFile[]> {
  const sourceFiles: ts.SourceFile[] = [];
  const modules = import.meta.glob("./protoc/**/*.ts", { as: "raw", eager: false });
  for (const path in modules) {
    const content = await modules[path]();
    const sourceFile = ts.createSourceFile(path, content, ts.ScriptTarget.Latest);
    sourceFiles.push(sourceFile);
  }

  return sourceFiles;
}

async function loadModules(): Promise<Record<string, any>> {
  const imports = import.meta.glob("./protoc/**/*.ts");
  const modules: Record<string, any> = {};

  for (const path in imports) {
    const module = await imports[path]();
    modules[path] = module;
  }

  return modules;
}

function createInterfaceMap(sourceFiles: ts.SourceFile[]): InterfaceMap {
  const interfaceMap: InterfaceMap = {};

  sourceFiles.forEach((sourceFile) => {
    sourceFile.statements.forEach((statement) => {
      if (ts.isInterfaceDeclaration(statement)) {
        interfaceMap[statement.name.text] = { interfaceDeclaration: statement, sourceFile };
      }
    });
  });

  return interfaceMap;
}

function copyInterface(interfaceDeclaration: ts.InterfaceDeclaration): ts.InterfaceDeclaration {
  const copy = ts.factory.createInterfaceDeclaration(
    undefined,
    undefined,
    interfaceDeclaration.name,
    interfaceDeclaration.typeParameters,
    interfaceDeclaration.heritageClauses,
    interfaceDeclaration.members,
  );

  return copy;
}

async function createClient(name: string, transport: RpcTransport, interfaceMap: InterfaceMap): Promise<ServiceInfo | undefined> {
  const { sourceFile } = interfaceMap["I" + name + "Client"];
  if (!sourceFile) {
    return undefined;
  }
  const module = await import("./" + sourceFile.fileName);
  console.log("module", module);
  return new module[name + "Client"](transport);
}

function getInputParameter(method: ts.MethodSignature, sourceFile: ts.SourceFile): ts.ParameterDeclaration | undefined {
  return method.parameters.find((parameter) => parameter.name.getText(sourceFile) == "input");
}

function methodEditorCode(
  methodName: string,
  serviceName: string,
  inputParameter: ts.ParameterDeclaration,
  sourceFile: ts.SourceFile,
  interfaceMap: InterfaceMap,
): string {
  const input = defaultInput(inputParameter, sourceFile, interfaceMap);

  const statements = [
    ts.factory.createExpressionStatement(
      ts.factory.createCallExpression(
        ts.factory.createPropertyAccessExpression(ts.factory.createIdentifier(serviceName), ts.factory.createIdentifier(methodName)),
        undefined,
        [input],
      ),
    ),
  ];

  return printStatements(statements);
}

function methodEditorCode2(methodInfo: MethodInfo): string {
  const input = defaultInput2(methodInfo);

  const statements = [
    ts.factory.createExpressionStatement(
      ts.factory.createCallExpression(
        ts.factory.createPropertyAccessExpression(ts.factory.createIdentifier(methodInfo.service.typeName), ts.factory.createIdentifier(methodInfo.name)),
        undefined,
        [input],
      ),
    ),
  ];

  return printStatements(statements);
}

function printStatements(statements: ts.Statement[]): string {
  let sourceFile = ts.createSourceFile("temp.ts", "", ts.ScriptTarget.Latest, /*setParentNodes*/ false, ts.ScriptKind.TS);
  sourceFile = ts.factory.updateSourceFile(sourceFile, statements);

  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

  return printer.printFile(sourceFile);
}

function findServiceNames(sourceFile: ts.SourceFile): string[] {
  const serviceNames: string[] = [];

  sourceFile.statements.forEach((statement) => {
    if (!ts.isVariableStatement(statement)) {
      return;
    }

    statement.declarationList.declarations.forEach((declaration) => {
      if (!ts.isIdentifier(declaration.name)) {
        return;
      }

      if (declaration.initializer && ts.isNewExpression(declaration.initializer) && declaration.initializer.expression.getText(sourceFile) === "ServiceType") {
        serviceNames.push(declaration.name.text);
      }
    });
  });

  return serviceNames;
}
