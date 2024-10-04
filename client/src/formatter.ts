import * as prettier from "prettier";
import prettierPluginBabel from "prettier/plugins/babel";
import prettierPluginEsTree from "prettier/plugins/estree";
import prettierPluginTypescript from "prettier/plugins/typescript";

export async function formatJson(code: string): Promise<string> {
  return prettier
    .format(code, { parser: "json", plugins: [prettierPluginBabel, prettierPluginEsTree] })
    .then((formattedCode) => {
      return formattedCode;
    })
    .catch((error) => {
      console.warn("Failed to format JSON", error);
      return code;
    });
}

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
