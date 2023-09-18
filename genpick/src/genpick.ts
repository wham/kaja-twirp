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
  const imps: ts.ImportDeclaration[] = [];

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

    const sourceFile = ts.createSourceFile(file, content, ts.ScriptTarget.Latest);

    const interfaces = sourceFile.statements.filter((statement): statement is ts.ClassDeclaration => ts.isClassDeclaration(statement));

    interfaces.forEach((interfaceDeclaration) => {
      let name = interfaceDeclaration.name!.text;
      if (!name.endsWith("Client")) {
        return;
      }

      const importStatement = ts.factory.createImportDeclaration(
        undefined,
        ts.factory.createImportClause(
          false,
          undefined,
          ts.factory.createNamedImports([ts.factory.createImportSpecifier(false, undefined, ts.factory.createIdentifier(name))])
        ),
        ts.factory.createStringLiteral("./" + file.substring(0, file.length - 3))
      );

      imps.push(importStatement);
    });
  });

  imps.push(
    ts.factory.createImportDeclaration(
      undefined,
      ts.factory.createImportClause(
        false,
        undefined,
        ts.factory.createNamedImports([
          ts.factory.createImportSpecifier(false, undefined, ts.factory.createIdentifier("RpcTransport")),
          ts.factory.createImportSpecifier(false, undefined, ts.factory.createIdentifier("ServiceInfo")),
        ])
      ),
      ts.factory.createStringLiteral("@protobuf-ts/runtime-rpc")
    )
  );

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

  const getClientFunction = ts.factory.createFunctionDeclaration(
    [ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
    undefined,
    ts.factory.createIdentifier("getClient"),
    undefined,
    [
      ts.factory.createParameterDeclaration(
        undefined,
        undefined,
        ts.factory.createIdentifier("name"),
        undefined,
        ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)
      ),
      ts.factory.createParameterDeclaration(
        undefined,
        undefined,
        ts.factory.createIdentifier("transport"),
        undefined,
        ts.factory.createTypeReferenceNode(ts.factory.createIdentifier("RpcTransport"), undefined)
      ),
    ],
    ts.factory.createUnionTypeNode([
      ts.factory.createTypeReferenceNode(ts.factory.createIdentifier("ServiceInfo"), undefined),
      ts.factory.createKeywordTypeNode(ts.SyntaxKind.UndefinedKeyword),
    ]),
    ts.factory.createBlock([
      ts.factory.createSwitchStatement(
        ts.factory.createIdentifier("name"),
        ts.factory.createCaseBlock([
          ts.factory.createCaseClause(ts.factory.createStringLiteral("SearchServiceClient"), [
            ts.factory.createReturnStatement(
              ts.factory.createNewExpression(ts.factory.createIdentifier("SearchServiceClient"), undefined, [ts.factory.createIdentifier("transport")])
            ),
          ]),
          ts.factory.createCaseClause(ts.factory.createStringLiteral("QuirksClient"), [
            ts.factory.createReturnStatement(
              ts.factory.createNewExpression(ts.factory.createIdentifier("QuirksClient"), undefined, [ts.factory.createIdentifier("transport")])
            ),
          ]),
        ])
      ),
      ts.factory.createReturnStatement(ts.factory.createIdentifier("undefined")),
    ])
  );

  let outputFile = ts.createSourceFile("kt.ts", "", ts.ScriptTarget.Latest, /*setParentNodes*/ false, ts.ScriptKind.TS);
  outputFile = ts.factory.updateSourceFile(outputFile, [...imps, model, getClientFunction]);
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  //console.log(printer.printFile(sourceFile));

  fs.writeFileSync(directoryPath + "/kt.ts", printer.printFile(outputFile));
}
