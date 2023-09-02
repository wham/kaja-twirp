import * as ts from "typescript";
import { CodeGeneratorRequest, GeneratedFile, MethodDescriptorProto, PluginBase, ServiceDescriptorProto, TypescriptFile } from "@protobuf-ts/plugin-framework";

export class Plugin extends PluginBase {
  // https://github.dev/timostamm/protobuf-ts
  generate(request: CodeGeneratorRequest): GeneratedFile[] | Promise<GeneratedFile[]> {
    let file = new TypescriptFile("kaja-twirp.ts");
    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

    const model = ts.createVariableStatement(
      [ts.createToken(ts.SyntaxKind.ExportKeyword)],
      ts.createVariableDeclarationList(
        [
          ts.createVariableDeclaration(
            ts.createIdentifier("model"),
            undefined,
            ts.createObjectLiteral([
              ts.createPropertyAssignment("services", this.services(request, file, printer)),
              ts.createPropertyAssignment("extraLibs", this.extraLibs(request, file, printer)),
            ])
          ),
        ],
        ts.NodeFlags.Const
      )
    );

    file.addStatement(model);

    return [file];
  }

  private services(request: CodeGeneratorRequest, file: TypescriptFile, printer: ts.Printer): ts.ArrayLiteralExpression {
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

          const p = ts.createPropertyAssignment("name", ts.createStringLiteral(protoMethod.name));
          const p1 = ts.createPropertyAssignment("code", ts.createStringLiteral(this.code(protoMethod, protoService, printer)));

          const method = ts.createObjectLiteral([p, p1]);

          methods.push(method);
        }

        const service = ts.createObjectLiteral([
          ts.createPropertyAssignment("name", ts.createStringLiteral(protoService.name)),
          ts.createPropertyAssignment("methods", ts.createArrayLiteral(methods)),
        ]);

        services.push(service);
      }
    }

    return ts.createArrayLiteral(services);
  }

  private code(protoMethod: MethodDescriptorProto, protoService: ServiceDescriptorProto, printer: ts.Printer): string {
    const statements = [
      ts.createExpressionStatement(
        ts.createCall(ts.createPropertyAccess(ts.createIdentifier(protoService.name!), ts.createIdentifier(protoMethod.name!)), undefined, [
          ts.createStringLiteral("argument"),
        ])
      ),
    ];

    let sourceFile = ts.createSourceFile("new-file.ts", "", ts.ScriptTarget.Latest, /*setParentNodes*/ false, ts.ScriptKind.TS);

    sourceFile = ts.updateSourceFileNode(sourceFile, statements);

    return printer.printFile(sourceFile);
  }

  private extraLibs(request: CodeGeneratorRequest, file: TypescriptFile, printer: ts.Printer): ts.ArrayLiteralExpression {
    const extraLibs = [];

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

          const method = ts.createPropertyAssignment(
            protoMethod.name,
            ts.createArrowFunction(
              undefined,
              undefined,
              [ts.createParameter(undefined, undefined, undefined, "hello")],
              undefined,
              ts.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
              ts.createNumericLiteral("2")
            )
          );

          methods.push(method);
        }

        const service = ts.createVariableStatement(
          undefined,
          ts.createVariableDeclarationList(
            [ts.createVariableDeclaration(ts.createIdentifier(protoService.name), undefined, ts.createObjectLiteral(methods))],
            ts.NodeFlags.Const
          )
        );

        let sourceFile = ts.createSourceFile("new-file.ts", "", ts.ScriptTarget.Latest, /*setParentNodes*/ false, ts.ScriptKind.TS);

        sourceFile = ts.updateSourceFileNode(sourceFile, [service]);

        extraLibs.push(ts.createStringLiteral(printer.printFile(sourceFile)));
      }
    }

    return ts.createArrayLiteral(extraLibs);
  }
}
