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
      const name = interfaceDeclaration.name.text;
      if (!name.endsWith("Client")) {
        return;
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
          code: "",
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
