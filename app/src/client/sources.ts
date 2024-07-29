import ts from "typescript";

export interface Source {
  path: string;
  file: ts.SourceFile;
  module: any;
  serviceNames: string[];
  interfaces: { [key: string]: ts.InterfaceDeclaration };
  enums: { [key: string]: { declaration: ts.EnumDeclaration; T: any } };
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
      interfaces: {},
      enums: {},
    };

    source.file.statements.forEach((statement) => {
      const serviceName = getServiceName(statement, source.file);
      if (serviceName) {
        source.serviceNames.push(serviceName);
      } else if (ts.isInterfaceDeclaration(statement)) {
        source.interfaces[statement.name.text] = statement;
      } else if (ts.isEnumDeclaration(statement)) {
        const enumName = statement.name.text;
        const T = source.module[enumName];
        if (T) {
          source.enums[enumName] = { declaration: statement, T };
        }
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

export function findInterface(sources: Sources, interfaceName: string): [ts.InterfaceDeclaration, Source] | undefined {
  for (const source of sources) {
    const interfaceDeclaration = source.interfaces[interfaceName];
    if (interfaceDeclaration) {
      return [interfaceDeclaration, source];
    }
  }
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
