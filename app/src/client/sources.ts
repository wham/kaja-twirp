import ts from "typescript";

export interface Source {
  path: string;
  file: ts.SourceFile;
  module: any;
  serviceNames: string[];
}

export type Sources = Source[];

export async function loadSources(): Promise<Sources> {
  const sources: Source[] = [];
  const rawFiles = import.meta.glob("./protoc/**/*.ts", { as: "raw", eager: false });
  const modules = import.meta.glob("./protoc/**/*.ts");

  for (const path in rawFiles) {
    if (!modules[path]) {
      continue;
    }

    const source: Source = {
      path,
      file: ts.createSourceFile(path, await rawFiles[path](), ts.ScriptTarget.Latest),
      module: await modules[path](),
      serviceNames: [],
    };

    source.file.statements.forEach((statement) => {
      const serviceName = getServiceName(statement, source.file);
      if (serviceName) {
        source.serviceNames.push(serviceName);
      }
    });

    sources.push(source);
  }

  return sources;
}

export function findSourceForClass(sources: Sources, className: string): Source | undefined {
  return sources.find((source) => {
    return source.file.statements.find((statement) => {
      return ts.isClassDeclaration(statement) && statement.name?.escapedText === className;
    });
  });
}

function getServiceName(statement: ts.Statement, sourceFile: ts.SourceFile): string | undefined {
  if (!ts.isVariableStatement(statement)) {
    return;
  }

  for (const declaration of statement.declarationList.declarations) {
    if (!ts.isIdentifier(declaration.name)) {
      continue;
    }

    if (declaration.initializer && ts.isNewExpression(declaration.initializer) && declaration.initializer.expression.getText(sourceFile) === "ServiceType") {
      return declaration.name.text;
    }
  }
}
