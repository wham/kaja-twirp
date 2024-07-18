import ts from "typescript";

export type Registry = {
  //services: Array<Service>;
  //extraLibs: Array<ExtraLib>;
  items: Array<RegistryItem>;
};

interface RegistryItem {
  kind: "enum";
  importName: string;
  sourceFile: ts.SourceFile;
}

export function createRegistry(sourceFiles: ts.SourceFile[]): Registry {
  const registry: Registry = { items: [] };
  
  sourceFiles.forEach(sourceFile => {
    sourceFile.statements.forEach(statement => {
      let kind: "enum";
      if (ts.isEnumDeclaration(statement)) {
        kind = "enum";
      } else {
        return;
      }
      const importName = sourceFile.fileName.replace(".ts", "");
      registry.items.push({ kind, importName, sourceFile});
    });
  });

  return registry;
}

export function findItem(registry: Registry, type: {}): RegistryItem | undefined {
  return undefined;
}