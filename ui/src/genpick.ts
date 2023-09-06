import ts, { ExternalModuleReference } from "typescript";
import { ExtraLib, Method, Model, Service } from "./Model";
import { model } from "./gen/kt";

export function loadModel(): Model {
  const services: Service[] = [];
  const extraLibs: ExtraLib[] = [];

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

    interfaces.forEach((interfaceDeclaration) => {
      let name = interfaceDeclaration.name.text;
      if (!name.endsWith("Client")) {
        return;
      }

      name = name.substring(0, name.length - 6);

      if (name.startsWith("I")) {
        name = name.substring(1);
      }

      const methods: Method[] = [];
      const funcs: ts.PropertyAssignment[] = [];

      interfaceDeclaration.members.forEach((member) => {
        if (!ts.isMethodSignature(member)) {
          return;
        }

        if (!member.name) {
          return;
        }

        const method: Method = {
          name: member.name.getText(sourceFile),
          code: methodCode(member.name.getText(sourceFile), name),
        };

        methods.push(method);

        const func = ts.factory.createPropertyAssignment(
          member.name.getText(sourceFile),
          ts.factory.createArrowFunction(
            [ts.factory.createModifier(ts.SyntaxKind.AsyncKeyword)],
            undefined,
            [
              /*ts.createParameter(
                undefined,
                undefined,
                undefined,
                "input",
                undefined
                ts.createTypeReferenceNode(ts.createIdentifier(registry.resolveTypeName(mt.typeName).name!), undefined)
              ),*/
            ],
            undefined,
            ts.factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
            ts.factory.createBlock([])
            /*this.proxyBody(protoService, protoMethod)*/
          )
        );
        funcs.push(func);
      });

      services.push({
        name: interfaceDeclaration.name.text,
        methods,
        proxy: "",
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
  });

  return {
    services,
    extraLibs,
  };
}

function methodCode(method: string, service: string): string {
  const statements = [
    ts.factory.createExpressionStatement(
      ts.factory.createCallExpression(
        ts.factory.createPropertyAccessExpression(
          ts.factory.createIdentifier(service),
          ts.factory.createIdentifier(method)
        ),
        undefined,
        []
      )
    ),
  ];

  let sourceFile = ts.createSourceFile(
    "new-file.ts",
    "",
    ts.ScriptTarget.Latest,
    /*setParentNodes*/ false,
    ts.ScriptKind.TS
  );

  sourceFile = ts.factory.updateSourceFile(sourceFile, statements);
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

  return printer.printFile(sourceFile);
}
