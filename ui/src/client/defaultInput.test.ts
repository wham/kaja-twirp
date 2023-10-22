import ts from "typescript";
import { expect, test } from "vitest";
import { interfaceDefaultImplementation } from "./defaultInput";

const sourceFileContent = `export interface Result {
  url: string;
  title: string;
  snippets: string[];
  isAd: boolean;
  location: Location;
}

export interface Location {
  latlng: float[];
}`;

const expectedResult = `return { url: "", title: "", snippets: null, isAd: true, location: null };
`;

test("interfaceDefaultImplementation", () => {
  const sourceFile = ts.createSourceFile("test.ts", sourceFileContent, ts.ScriptTarget.Latest);

  const interfaces: ts.InterfaceDeclaration[] = [];

  sourceFile.statements.forEach((statement) => {
    if (ts.isInterfaceDeclaration(statement)) {
      interfaces.push(statement);
    }
  });

  expect(interfaces.length).toBe(2);

  const interfaceDeclaration = interfaces[0];

  let outputFile = ts.createSourceFile("output.ts", "", ts.ScriptTarget.Latest);
  const o = interfaceDefaultImplementation([interfaceDeclaration, sourceFile]);

  outputFile = ts.factory.updateSourceFile(outputFile, [ts.factory.createReturnStatement(o)]);

  const printer = ts.createPrinter();
  const actualResult = printer.printFile(outputFile);

  expect(actualResult).toBe(expectedResult);
});
