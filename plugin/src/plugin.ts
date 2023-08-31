import * as ts from "typescript";
import {
  CodeGeneratorRequest,
  GeneratedFile,
  PluginBase,
  TypescriptFile,
} from "@protobuf-ts/plugin-framework";

export class Plugin extends PluginBase {
  // https://github.dev/timostamm/protobuf-ts
  generate(
    request: CodeGeneratorRequest
  ): GeneratedFile[] | Promise<GeneratedFile[]> {
    let file = new TypescriptFile("kaja-twirp.ts");
    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

    const statement = ts.createVariableStatement(
      [ts.createToken(ts.SyntaxKind.ExportKeyword)],
      ts.createVariableDeclarationList(
        [
          ts.createVariableDeclaration(
            ts.createIdentifier("model"),
            undefined,
            ts.createObjectLiteral([
              ts.createPropertyAssignment(
                "services",
                this.services(request, file, printer)
              ),
            ])
          ),
        ],
        ts.NodeFlags.Const
      )
    );

    file.addStatement(statement);

    return [file];
  }

  private services(
    request: CodeGeneratorRequest,
    file: TypescriptFile,
    printer: ts.Printer
  ): ts.ArrayLiteralExpression {
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
          const p1 = ts.createPropertyAssignment(
            "code",
            ts.createStringLiteral(
              printer.printNode(
                ts.EmitHint.Unspecified,
                ts.createArrayLiteral([]),
                file.getSourceFile()
              )
            )
          );

          const method = ts.createObjectLiteral([p, p1]);

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
