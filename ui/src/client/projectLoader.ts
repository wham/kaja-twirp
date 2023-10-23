import { RpcTransport, ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { TwirpFetchTransport } from "@protobuf-ts/twirp-transport";
import ts from "typescript";
import { defaultInput } from "./defaultInput";
import { ExtraLib, InterfaceMap, Method, Project, Service } from "./project";

export async function loadProject(): Promise<Project> {
  const sourceFiles = await loadSourceFiles();
  const interfaceMap = getInterfaceMap(sourceFiles);

  const services: Service[] = [];
  const extraLibs: ExtraLib[] = [];

  sourceFiles.forEach((sourceFile) => {
    const interfaces = sourceFile.statements.filter((statement): statement is ts.InterfaceDeclaration => ts.isInterfaceDeclaration(statement));

    const ifcs: ts.InterfaceDeclaration[] = [];

    interfaces.forEach((interfaceDeclaration) => {
      let name = interfaceDeclaration.name.text;
      if (!name.endsWith("Client")) {
        let i = ts.factory.createInterfaceDeclaration(
          undefined,
          undefined,
          interfaceDeclaration.name,
          interfaceDeclaration.typeParameters,
          interfaceDeclaration.heritageClauses,
          interfaceDeclaration.members,
        );
        ifcs.push(i);
        return;
      }

      name = name.substring(0, name.length - 6);

      if (name.startsWith("I")) {
        name = name.substring(1);
      }

      const methods: Method[] = [];
      const funcs: ts.PropertyAssignment[] = [];
      const trigger = { [name]: async (input: any) => {} };

      interfaceDeclaration.members.forEach((member) => {
        if (!ts.isMethodSignature(member)) {
          return;
        }

        if (!member.name) {
          return;
        }

        let ip: ts.ParameterDeclaration;
        let input: string;

        member.parameters.forEach((parameter) => {
          if (parameter.name.getText(sourceFile) == "input" && parameter.type) {
            ip = parameter;
            input = parameter.type.getText(sourceFile);
          }
        });

        const method: Method = {
          name: member.name.getText(sourceFile),
          code: methodCode(member.name.getText(sourceFile), name, ip!, sourceFile, interfaceMap),
        };

        methods.push(method);

        const func = ts.factory.createPropertyAssignment(
          member.name.getText(sourceFile),
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
                ts.factory.createTypeReferenceNode(ts.factory.createIdentifier(input!), undefined),
              ),
            ],
            undefined,
            ts.factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
            ts.factory.createBlock([]),
            /*this.proxyBody(protoService, protoMethod)*/
          ),
        );
        funcs.push(func);

        trigger[member.name.getText(sourceFile)] = async (input: any) => {
          const url = new URL(window.location.href);
          const urlWithoutPath = `${url.protocol}//${url.hostname}${url.port ? ":" + url.port : ""}`;

          let transport = new TwirpFetchTransport({
            baseUrl: urlWithoutPath + "/twirp",
          });

          /*let client = new (Function.prototype.bind.apply(
            eval(name + "Client"),
            [null, ...[transport]]
          ))();*/

          let client = await createClient(name, transport, interfaceMap);

          let { response } = await (client as any)[member.name.getText(sourceFile)](input);

          (window as any)["GOUT"](JSON.stringify(response));
        };
      });

      services.push({
        name,
        methods,
        proxy: trigger,
      });

      const proxy = ts.factory.createVariableStatement(
        undefined,
        ts.factory.createVariableDeclarationList(
          [ts.factory.createVariableDeclaration(ts.factory.createIdentifier(name), undefined, undefined, ts.factory.createObjectLiteralExpression(funcs))],
          ts.NodeFlags.Const,
        ),
      );

      let tFile = ts.createSourceFile("new-file.ts", "", ts.ScriptTarget.Latest, /*setParentNodes*/ false, ts.ScriptKind.TS);

      tFile = ts.factory.updateSourceFile(tFile, [proxy]);
      const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

      extraLibs.push({
        filePath: name + ".ts",
        content: printer.printFile(tFile),
      });
    });

    let tFile = ts.createSourceFile("new-file.ts", "", ts.ScriptTarget.Latest, /*setParentNodes*/ false, ts.ScriptKind.TS);

    tFile = ts.factory.updateSourceFile(tFile, ifcs);
    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

    if (ifcs.length > 0) {
      extraLibs.push({
        filePath: sourceFile.fileName,
        content: printer.printFile(tFile),
      });
    }
  });

  return {
    services,
    extraLibs,
    sourceFiles,
  };
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

function getInterfaceMap(sourceFiles: ts.SourceFile[]): InterfaceMap {
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

async function createClient(name: string, transport: RpcTransport, interfaceMap: InterfaceMap): Promise<ServiceInfo | undefined> {
  const { sourceFile } = interfaceMap["I" + name + "Client"];
  if (!sourceFile) {
    return undefined;
  }
  const module = await import("./" + sourceFile.fileName);
  console.log("module", module);
  return new module[name + "Client"](transport);
}

function methodCode(method: string, service: string, ip: ts.ParameterDeclaration, sourceFile: ts.SourceFile, interfaceMap: InterfaceMap): string {
  let outputFile = ts.createSourceFile("new-file.ts", "", ts.ScriptTarget.Latest, /*setParentNodes*/ false, ts.ScriptKind.TS);

  const dp = defaultInput(ip, sourceFile, interfaceMap);

  const statements = [
    ts.factory.createExpressionStatement(
      ts.factory.createCallExpression(
        ts.factory.createPropertyAccessExpression(ts.factory.createIdentifier(service), ts.factory.createIdentifier(method)),
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
