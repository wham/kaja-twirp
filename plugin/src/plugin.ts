import * as ts from "typescript";
import {
  CodeGeneratorRequest,
  GeneratedFile,
  PluginBase,
  TypescriptFile,
} from "@protobuf-ts/plugin-framework";

export class Plugin extends PluginBase {
  constructor() {
    //console.log('Hello from plugin constructor!');
    super();
  }

  // https://github.dev/timostamm/protobuf-ts
  generate(
    request: CodeGeneratorRequest
  ): GeneratedFile[] | Promise<GeneratedFile[]> {
    let file = new TypescriptFile("kaja-twirp.ts");
    const file2 = ts.createSourceFile(
      "source.ts",
      "",
      ts.ScriptTarget.ESNext,
      false,
      ts.ScriptKind.TS
    );
    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

    const statement = ts.createVariableStatement(
      [ts.createToken(ts.SyntaxKind.ExportKeyword)],
      ts.createVariableDeclarationList(
        [
          ts.createVariableDeclaration(
            ts.createIdentifier("model"),
            ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
            ts.createStringLiteral(
              printer.printNode(
                ts.EmitHint.Unspecified,
                this.services(request),
                file2
              )
            )
          ),
        ],
        ts.NodeFlags.Const
      )
    );

    //console.log('Hello from plugin!');
    // https://github.dev/timostamm/protobuf-ts
    return [file];
  }

  private services(request: CodeGeneratorRequest): ts.ArrayLiteralExpression {
    const services = [];

    for (let protoFile of request.protoFile) {
      for (let protoService of protoFile.service) {
        if (!protoService.name) {
          continue;
        }

        const methods = [];

        for (let protoMethod of protoService.method) {
          if (!protoMethod.name) {
            continue;
          }

          const p = ts.createPropertyAssignment(
            "name",
            ts.createStringLiteral(protoMethod.name)
          );
          const method = ts.createObjectLiteral([p]);

          methods.push(method);
        }

        const service = ts.createObjectLiteral([
          ts.createPropertyAssignment(
            "name",
            ts.createStringLiteral(protoService.name)
          ),
          ts.createPropertyAssignment(
            "methods",
            ts.createArrayLiteral(methods)
          ),
        ]);

        services.push(service);
      }
    }

    return ts.createArrayLiteral(services);
  }
}
