import { CodeGeneratorRequest, GeneratedFile, PluginBase } from "@protobuf-ts/plugin-framework";

export class Plugin extends PluginBase {

    constructor() {
        //console.log('Hello from plugin constructor!');
        super();
    }
    
    generate(request: CodeGeneratorRequest): GeneratedFile[] | Promise<GeneratedFile[]> {
        //console.log('Hello from plugin!');
        return [{
            getFilename: () => 'kaja-twirp.ts',
            getContent: () => 'export const kaja = "Hello from plugin!";'
        }];
    }
}