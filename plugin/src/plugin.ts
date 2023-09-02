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
            ts.createObjectLiteral([ts.createPropertyAssignment("services", this.services(request, file, printer))])
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

        services.push(this.service(protoService, file, printer));
      }
    }

    return ts.createArrayLiteral(services);
  }

  private service(protoService: ServiceDescriptorProto, file: TypescriptFile, printer: ts.Printer): ts.ObjectLiteralExpression {
    const methods = [];

    for (let protoMethod of protoService.method) {
      if (!protoMethod.name) {
        continue;
      }

      const propeties = [
        ts.createPropertyAssignment("name", ts.createStringLiteral(protoMethod.name)),
        ts.createPropertyAssignment("code", ts.createStringLiteral(this.code(protoMethod, protoService, printer))),
      ];

      const method = ts.createObjectLiteral(propeties);

      methods.push(method);
    }

    const proxy = this.proxy(protoService);
    const extraLib = ts.createVariableStatement(
      undefined,
      ts.createVariableDeclarationList([ts.createVariableDeclaration(ts.createIdentifier(protoService.name!), undefined, proxy)], ts.NodeFlags.Const)
    );
    let sourceFile = ts.createSourceFile("new-file.ts", "", ts.ScriptTarget.Latest, /*setParentNodes*/ false, ts.ScriptKind.TS);
    sourceFile = ts.updateSourceFileNode(sourceFile, [extraLib]);

    return ts.createObjectLiteral([
      ts.createPropertyAssignment("name", ts.createStringLiteral(protoService.name!)),
      ts.createPropertyAssignment("methods", ts.createArrayLiteral(methods)),
      ts.createPropertyAssignment("proxy", proxy),
      ts.createPropertyAssignment("extraLib", ts.createStringLiteral(printer.printFile(sourceFile))),
    ]);
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

  private proxy(protoService: ServiceDescriptorProto): ts.ObjectLiteralExpression {
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

    const service = ts.createObjectLiteral(methods);

    return service;
  }
}
