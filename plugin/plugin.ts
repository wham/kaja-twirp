import { CodeGeneratorRequest, GeneratedFile, PluginBase } from "@protobuf-ts/plugin-framework";

export class Plugin extends PluginBase {

    generate(request: CodeGeneratorRequest): GeneratedFile[] | Promise<GeneratedFile[]> {
        return [];
    }
}