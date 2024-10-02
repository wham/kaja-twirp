import * as prettier from "prettier";
import prettierPluginEsTree from "prettier/plugins/estree";
import prettierPluginTypescript from "prettier/plugins/typescript";

export async function formatTypeScript(code: string): Promise<string> {
  return prettier
    .format(code, { parser: "typescript", plugins: [prettierPluginTypescript, prettierPluginEsTree] })
    .then((formattedCode) => {
      return formattedCode;
    })
    .catch((error) => {
      console.warn("Failed to format TypeScript", error);
      return code;
    });
}
