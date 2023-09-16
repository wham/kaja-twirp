import exp from "constants";
import ts from "typescript";
import { defaultParam, interfaceDefaultImplementation } from "./defaultParams";

const sourceFileContent = `export interface Result {
  /**
   * @generated from protobuf field: string url = 1;
   */
  url: string;
  /**
   * @generated from protobuf field: string title = 2;
   */
  title: string;
  /**
   * @generated from protobuf field: repeated string snippets = 3;
   */
  snippets: string[];
  /**
   * @generated from protobuf field: bool is_ad = 4;
   */
  isAd: boolean;
}`;

const expectedResult = `return { url: "", title: "", snippets: null, isAd: true };
`;

test("interfaceDefaultImplementation", () => {
  const sourceFile = ts.createSourceFile(
    "test.ts",
    sourceFileContent,
    ts.ScriptTarget.Latest
  );

  const interfaces: ts.InterfaceDeclaration[] = [];

  sourceFile.statements.forEach((statement) => {
    if (ts.isInterfaceDeclaration(statement)) {
      interfaces.push(statement);
    }
  });

  expect(interfaces.length).toBe(1);

  const interfaceDeclaration = interfaces[0];

  let outputFile = ts.createSourceFile("output.ts", "", ts.ScriptTarget.Latest);
  const o = interfaceDefaultImplementation([interfaceDeclaration, sourceFile]);

  outputFile = ts.factory.updateSourceFile(outputFile, [
    ts.factory.createReturnStatement(o),
  ]);

  const printer = ts.createPrinter();
  const actualResult = printer.printFile(outputFile);

  expect(actualResult).toBe(expectedResult);
});
