import * as prettier from "prettier";
import prettierPluginBabel from "prettier/plugins/babel";
import prettierPluginEsTree from "prettier/plugins/estree";

export async function formatJson(json: string): Promise<string> {
  return prettier
    .format(json, { parser: "json", plugins: [prettierPluginBabel, prettierPluginEsTree] })
    .then((formattedJson) => {
      return formattedJson;
    })
    .catch((error) => {
      console.warn("Failed to format JSON", error);
      return json;
    });
}
