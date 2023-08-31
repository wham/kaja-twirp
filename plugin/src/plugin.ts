import * as ts from "typescript";
import { CodeGeneratorRequest, GeneratedFile, PluginBase, TypescriptFile } from "@protobuf-ts/plugin-framework";

export class Plugin extends PluginBase {

    constructor() {
        //console.log('Hello from plugin constructor!');
        super();
    }
    
    // https://github.dev/timostamm/protobuf-ts
    generate(request: CodeGeneratorRequest): GeneratedFile[] | Promise<GeneratedFile[]> {
        let file = new TypescriptFile("kaja-twirp.ts");
        const file2 = ts.createSourceFile("source.ts", "", ts.ScriptTarget.ESNext, false, ts.ScriptKind.TS);
        const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

        for (let protoFile of request.protoFile) {
            for (let service of protoFile.service) {
                if (!service.name) {
                    continue;
                }

                const methodFuncs = [];

                for (let method of service.method) {
                    if (!method.name) {
                        continue;
                    }

                    const functionDeclaration = ts.createFunctionExpression(
                        undefined,
                        undefined,
                        ts.createIdentifier('add'),
                        undefined,
                        [ts.createParameter(undefined, undefined, undefined, 'a', undefined, ts.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword)), ts.createParameter(undefined, undefined, undefined, 'b', undefined, ts.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword))],
                        ts.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
                        ts.createBlock([
                          ts.createReturn(ts.createBinary(ts.createIdentifier('a'), ts.SyntaxKind.PlusToken, ts.createIdentifier('b')))
                        ])
                      );
                    
                    methodFuncs.push(ts.createPropertyAssignment(method.name, functionDeclaration));

                }

                const objectLiteral = ts.createObjectLiteral(methodFuncs);
                
                const statement = ts.createVariableStatement(
                    [ts.createToken(ts.SyntaxKind.ExportKeyword)],
                    ts.createVariableDeclarationList(
                        [ts.createVariableDeclaration(
                            ts.createIdentifier(service.name),
                            ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
                            ts.createStringLiteral(printer.printNode(ts.EmitHint.Unspecified, objectLiteral, file2))
                        )],
                        ts.NodeFlags.Const
                    )
                );
        
                file.addStatement(statement);
            }
        }
        
        //console.log('Hello from plugin!');
        // https://github.dev/timostamm/protobuf-ts
        return [file];
    }
}