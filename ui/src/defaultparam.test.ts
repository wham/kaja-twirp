import ts from "typescript";

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

test("defaultParam", () => {
  const sourceFile = ts.createSourceFile(
    "test.ts",
    sourceFileContent,
    ts.ScriptTarget.Latest
  );

  const interfaces = sourceFile.statements.filter((statement) => {
    return ts.isInterfaceDeclaration(statement);
  });

  expect(1).toBe(interfaces);
});
