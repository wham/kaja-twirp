import ts from "typescript";
import { expect, test } from "vitest";
import { createRegistry, findItem } from "./registry";

test("registry", () => {
  const sourceFiles = createTestSourceFiles();
  const registry = createRegistry(sourceFiles);

  expect(registry).toBeDefined();
});

test("findItem", () => {
  const sourceFiles = createTestSourceFiles();
  const registry = createRegistry(sourceFiles);

  const item = findItem(registry, ts.SyntaxKind.StringLiteral);

  expect(item).toBeUndefined();
});

function createTestSourceFiles(): ts.SourceFile[] {
  const fileName = 'mockFile.ts';
  const sourceText = `const a = "Hello, world!";`;
  const languageVersion = ts.ScriptTarget.ES2015;
  const setParentNodes = false;

  const sourceFile = ts.createSourceFile(fileName, sourceText, languageVersion, setParentNodes);

  return [sourceFile];
}