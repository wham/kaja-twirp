import ts from "typescript";
import { Model, Service } from "./Model";
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
      services.push({
        name: interfaceDeclaration.name.text,
        methods: [],
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
