import * as fs from "fs";
import path from "path";
import * as ts from "typescript";
import { ProtocFile } from "./Model";

export async function linker(files: ProtocFile[]): Promise<void> {
  console.log("Running linker");

  for (const file of files) {
    const sourceFile = ts.createSourceFile(file.path, file.content, ts.ScriptTarget.Latest);

    const interfaces = sourceFile.statements.filter((statement): statement is ts.ClassDeclaration => ts.isClassDeclaration(statement));

    console.log("import", file.path);
    await import(file.path);
  }
}
