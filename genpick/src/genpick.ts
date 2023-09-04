import * as fs from "fs";
import * as ts from "typescript";

export function main() {
  const directoryPath = process.argv[2];

  if (!directoryPath) {
    console.error("No directory path provided");
    return;
  }

  const files = fs.readdirSync(directoryPath);
  const gens: ts.ObjectLiteralExpression[] = [];

  files.forEach((file) => {
    if (file === "kt.ts") return;

    let content: string;
    try {
      content = fs.readFileSync(directoryPath + "/" + file, "utf-8");
    } catch (_) {
      return;
    }

    gens.push(
      ts.factory.createObjectLiteralExpression([
        ts.factory.createPropertyAssignment("path", ts.factory.createStringLiteral(file)),
        ts.factory.createPropertyAssignment("content", ts.factory.createStringLiteral(content)),
      ])
    );
  });

  const model = ts.factory.createVariableStatement(
    [ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
    ts.factory.createVariableDeclarationList(
      [
        ts.factory.createVariableDeclaration(
          ts.factory.createIdentifier("model"),
          undefined,
          undefined,
          ts.factory.createObjectLiteralExpression([ts.factory.createPropertyAssignment("gens", ts.factory.createArrayLiteralExpression(gens))])
        ),
      ],
      ts.NodeFlags.Const
    )
  );

  let sourceFile = ts.createSourceFile("kt.ts", "", ts.ScriptTarget.Latest, /*setParentNodes*/ false, ts.ScriptKind.TS);
  sourceFile = ts.factory.updateSourceFile(sourceFile, [model]);
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  //console.log(printer.printFile(sourceFile));

  fs.writeFileSync(directoryPath + "/kt.ts", printer.printFile(sourceFile));
}
