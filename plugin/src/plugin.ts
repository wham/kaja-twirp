import * as ts from "typescript";
import { CodeGeneratorRequest, GeneratedFile, PluginBase, TypescriptFile } from "@protobuf-ts/plugin-framework";

export class Plugin extends PluginBase {

    constructor() {
        //console.log('Hello from plugin constructor!');
        super();
    }
    
    generate(request: CodeGeneratorRequest): GeneratedFile[] | Promise<GeneratedFile[]> {
        let file = new TypescriptFile("kaja-twirp.ts");

        for (let protoFile of request.protoFile) {
            for (let service of protoFile.service) {
                if (!service.name) {
                    continue;
                }
                
                const statement = ts.createVariableStatement(
                    [],
                    ts.createVariableDeclarationList(
                        [ts.createVariableDeclaration(
                            ts.createIdentifier(service.name),
                            ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
                            ts.createStringLiteral("test")
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