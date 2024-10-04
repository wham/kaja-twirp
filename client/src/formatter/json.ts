import * as prettier from "prettier";
import prettierPluginBabel from "prettier/plugins/babel";
import prettierPluginEsTree from "prettier/plugins/estree";

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
