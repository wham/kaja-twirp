import ts, { ExternalModuleReference } from "typescript";
import { ExtraLib, Method, Model, Service } from "./Model";
import { model, getClient } from "./gen/kt";
import { TwirpFetchTransport } from "@protobuf-ts/twirp-transport";
import { QuirksClient } from "./gen/quirks.client";
import { defaultParam } from "./defaultParams";
import { SearchServiceClient } from "./gen/search-service.client";

export function loadModel(): Model {
  const services: Service[] = [];
  const extraLibs: ExtraLib[] = [];
  const allInterfaces: {
    [key: string]: [ts.InterfaceDeclaration, ts.SourceFile];
  } = {};

  model.gens.forEach((gen) => {
    const sourceFile = ts.createSourceFile(
      gen.path,
      gen.content,
      ts.ScriptTarget.Latest
    );

    sourceFile.statements.forEach((statement) => {
      if (ts.isInterfaceDeclaration(statement)) {
        allInterfaces[statement.name.text] = [statement, sourceFile];
      }
    });
  });

  model.gens.forEach((gen) => {
    const sourceFile = ts.createSourceFile(
      gen.path,
      gen.content,
      ts.ScriptTarget.Latest
    );

    const interfaces = sourceFile.statements.filter(
      (statement): statement is ts.InterfaceDeclaration =>
        ts.isInterfaceDeclaration(statement)
    );

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
          interfaceDeclaration.members
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
          code: methodCode(
            member.name.getText(sourceFile),
            name,
            ip!,
            sourceFile,
            allInterfaces
          ),
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
                ts.factory.createTypeReferenceNode(
                  ts.factory.createIdentifier(input!),
                  undefined
                )
              ),
            ],
            undefined,
            ts.factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
            ts.factory.createBlock([])
            /*this.proxyBody(protoService, protoMethod)*/
          )
        );
        funcs.push(func);

        trigger[member.name.getText(sourceFile)] = async (input: any) => {
          let transport = new TwirpFetchTransport({
            baseUrl: "http://localhost:3000/twirp",
          });

          /*let client = new (Function.prototype.bind.apply(
            eval(name + "Client"),
            [null, ...[transport]]
          ))();*/

          let client = getClient(name + "Client", transport);

          let { response } = await (client as any)[
            member.name.getText(sourceFile)
          ](input);

          (window as any)["GOUT"](JSON.stringify(response));
        };
      });

      services.push({
        name,
        methods,
        proxy: trigger,
        extraLib: "",
      });

      const proxy = ts.factory.createVariableStatement(
        undefined,
        ts.factory.createVariableDeclarationList(
          [
            ts.factory.createVariableDeclaration(
              ts.factory.createIdentifier(name),
              undefined,
              undefined,
              ts.factory.createObjectLiteralExpression(funcs)
            ),
          ],
          ts.NodeFlags.Const
        )
      );

      let tFile = ts.createSourceFile(
        "new-file.ts",
        "",
        ts.ScriptTarget.Latest,
        /*setParentNodes*/ false,
        ts.ScriptKind.TS
      );

      tFile = ts.factory.updateSourceFile(tFile, [proxy]);
      const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

      extraLibs.push({
        filePath: name + ".ts",
        content: printer.printFile(tFile),
      });
    });

    let tFile = ts.createSourceFile(
      "new-file.ts",
      "",
      ts.ScriptTarget.Latest,
      /*setParentNodes*/ false,
      ts.ScriptKind.TS
    );

    tFile = ts.factory.updateSourceFile(tFile, ifcs);
    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

    if (ifcs.length > 0) {
      extraLibs.push({
        filePath: gen.path + ".ts",
        content: printer.printFile(tFile),
      });
    }
  });

  return {
    services,
    extraLibs,
  };
}

function methodCode(
  method: string,
  service: string,
  ip: ts.ParameterDeclaration,
  sourceFile: ts.SourceFile,
  allInterfaces: { [key: string]: [ts.InterfaceDeclaration, ts.SourceFile] }
): string {
  let outputFile = ts.createSourceFile(
    "new-file.ts",
    "",
    ts.ScriptTarget.Latest,
    /*setParentNodes*/ false,
    ts.ScriptKind.TS
  );

  const dp = defaultParam(ip, sourceFile, allInterfaces);

  const statements = [
    ts.factory.createExpressionStatement(
      ts.factory.createCallExpression(
        ts.factory.createPropertyAccessExpression(
          ts.factory.createIdentifier(service),
          ts.factory.createIdentifier(method)
        ),
        undefined,
        [dp]
      )
    ),
  ];
  outputFile = ts.factory.updateSourceFile(outputFile, statements);
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  const out = printer.printFile(outputFile);

  return out;
}
