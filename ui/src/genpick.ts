import ts from "typescript";
import { Method, Model, Service } from "./Model";
import { model } from "./gen/kt";

export function loadModel(): Model {
  const services: Service[] = [];

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
      });

      services.push({
        name: interfaceDeclaration.name.text,
        methods,
        proxy: "",
        extraLib: "",
      });
    });
  });

  return {
    services,
    extraLibs: [],
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
