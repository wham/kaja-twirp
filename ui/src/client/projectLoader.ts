import { RpcTransport, ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { TwirpFetchTransport } from "@protobuf-ts/twirp-transport";
import ts from "typescript";
import { defaultInput } from "./defaultInput";
import { ExtraLib, InterfaceMap, Method, Project, Service } from "./project";

export async function loadProject(): Promise<Project> {
  const sourceFiles = await loadSourceFiles();
  const interfaceMap = createInterfaceMap(sourceFiles);

  const services: Service[] = [];
  const extraLibs: ExtraLib[] = [];

  sourceFiles.forEach((sourceFile) => {
    const interfaces = sourceFile.statements.filter((statement): statement is ts.InterfaceDeclaration => ts.isInterfaceDeclaration(statement));
    const nonClientInterfaces: ts.InterfaceDeclaration[] = [];

    interfaces.forEach((interfaceDeclaration) => {
      const serviceName = extractClientName(interfaceDeclaration.name.text);

      if (!serviceName) {
        nonClientInterfaces.push(copyInterface(interfaceDeclaration));
        return;
      }

      const methods: Method[] = [];
      const funcs: ts.PropertyAssignment[] = [];
      const trigger = { [serviceName]: async (input: any) => {} };

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

        const method: Method = {
          name: methodName,
          editorCode: methodEditorCode(methodName, serviceName, inputParameter, sourceFile, interfaceMap),
          globalTrigger,
        };

        methods.push(method);

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

      services.push({
        name: serviceName,
        methods,
      });

      const proxy = ts.factory.createVariableStatement(
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

      let tFile = ts.createSourceFile("new-file.ts", "", ts.ScriptTarget.Latest, /*setParentNodes*/ false, ts.ScriptKind.TS);

      tFile = ts.factory.updateSourceFile(tFile, [proxy]);
      const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

      extraLibs.push({
        filePath: serviceName + ".ts",
        content: printer.printFile(tFile),
      });
    });

    if (nonClientInterfaces.length > 0) {
      let tFile = ts.createSourceFile("new-file.ts", "", ts.ScriptTarget.Latest, /*setParentNodes*/ false, ts.ScriptKind.TS);

      tFile = ts.factory.updateSourceFile(tFile, nonClientInterfaces);
      const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

      extraLibs.push({
        filePath: sourceFile.fileName,
        content: printer.printFile(tFile),
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
  let outputFile = ts.createSourceFile("new-file.ts", "", ts.ScriptTarget.Latest, /*setParentNodes*/ false, ts.ScriptKind.TS);

  const dp = defaultInput(inputParameter, sourceFile, interfaceMap);

  const statements = [
    ts.factory.createExpressionStatement(
      ts.factory.createCallExpression(
        ts.factory.createPropertyAccessExpression(ts.factory.createIdentifier(serviceName), ts.factory.createIdentifier(methodName)),
        undefined,
        [dp],
      ),
    ),
  ];
  outputFile = ts.factory.updateSourceFile(outputFile, statements);
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  const out = printer.printFile(outputFile);

  return out;
}
