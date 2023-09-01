import * as ts from "typescript";
import { CodeGeneratorRequest, GeneratedFile, MethodDescriptorProto, PluginBase, ServiceDescriptorProto, TypescriptFile } from "@protobuf-ts/plugin-framework";

export class Plugin extends PluginBase {
  // https://github.dev/timostamm/protobuf-ts
  generate(request: CodeGeneratorRequest): GeneratedFile[] | Promise<GeneratedFile[]> {
    let file = new TypescriptFile("kaja-twirp.ts");
    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

    const statement = ts.createVariableStatement(
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

    file.addStatement(statement);

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
    let ssContent = `const SearchService = {
      Search: async function (name: string) {
        let transport = new TwirpFetchTransport({
          baseUrl: "http://localhost:3000/twirp",
        });
    
        let client = new SearchServiceClient(transport);
    
        let { response } = await client.search({
          query: "",
          pageNumber: 0,
          resultPerPage: 0,
        });
    
        GOUT(JSON.stringify(response));
      },
    };`;

    const statements = [
      ts.createVariableStatement(
        undefined,
        ts.createVariableDeclarationList(
          [
            ts.createVariableDeclaration(
              "transport",
              undefined,
              ts.createNew(ts.createIdentifier("TwirpFetchTransport"), undefined, [
                ts.createObjectLiteral([ts.createPropertyAssignment("baseUrl", ts.createStringLiteral("http://localhost:3000/twirp"))]),
              ])
            ),
          ],
          ts.NodeFlags.Let
        )
      ),
      ts.createVariableStatement(
        undefined,
        ts.createVariableDeclarationList(
          [
            ts.createVariableDeclaration(
              "client",
              undefined,
              ts.createNew(ts.createIdentifier(protoService.name + "Client"), undefined, [ts.createIdentifier("transport")])
            ),
          ],
          ts.NodeFlags.Let
        )
      ),
      ts.createVariableStatement(
        undefined,
        ts.createVariableDeclarationList(
          [
            ts.createVariableDeclaration(
              "{ response }",
              undefined,
              ts.createCall(ts.createPropertyAccess(ts.createIdentifier("client"), ts.createIdentifier(protoMethod.name!)), undefined, [])
            ),
          ],
          ts.NodeFlags.None
        )
      ),
      ts.createExpressionStatement(
        ts.createCall(ts.createIdentifier("GOUT"), undefined, [
          ts.createCall(ts.createPropertyAccess(ts.createIdentifier("JSON"), ts.createIdentifier("stringify")), undefined, [ts.createIdentifier("response")]),
        ])
      ),
    ];

    let sourceFile = ts.createSourceFile("new-file.ts", "", ts.ScriptTarget.Latest, /*setParentNodes*/ false, ts.ScriptKind.TS);

    sourceFile = ts.updateSourceFileNode(sourceFile, statements);

    return printer.printFile(sourceFile);
  }
}
