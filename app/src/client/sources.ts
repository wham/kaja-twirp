import ts from "typescript";

export interface Source {
  path: string;
  file: ts.SourceFile;
  module: any;
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

    const content = await rawFiles[path]();

    sources.push({
      path,
      file: ts.createSourceFile(path, content, ts.ScriptTarget.Latest),
      module: modules[path],
    });
  }

  return sources;
}

export function findSourceForClass(sources: Sources, className: string): Source | undefined {
  return sources.find((source) => {
    return source.file.statements.find((statement) => {
      ts.isClassDeclaration(statement) && statement.name?.text === className;
    });
  });
}
