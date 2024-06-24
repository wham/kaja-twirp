import ts from "typescript";

export type Registry = {
  //services: Array<Service>;
  //extraLibs: Array<ExtraLib>;
};

interface RegistryItem {
  type: {};
  importName: string;
  sourceFile: ts.SourceFile;
}

export function createRegistry(sourceFiles: ts.SourceFile[]): Registry {
  return {};
}

export function findItem(registry: Registry, type: {}): RegistryItem | undefined {
  return undefined;
}