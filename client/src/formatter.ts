import * as prettier from "prettier";
import prettierPluginEsTree from "prettier/plugins/estree";
import prettierPluginTypescript from "prettier/plugins/typescript";

export function formatAndColorizeJson(json: string): string {
  if (!json) return "";

  const jsonString = JSON.stringify(JSON.parse(json), null, 2);

  return jsonString
    .split("\n")
    .map((line, index) => {
      const keyMatch = line.match(/"([^"]+)":/);
      const valueMatch = line.match(/: (.*)/);

      let coloredLine = line;

      if (keyMatch) {
        const key = keyMatch[1];
        coloredLine = coloredLine.replace(`"${key}"`, `<span style="color: brown;">"${key}"</span>`);
      }

      if (valueMatch) {
        const value = valueMatch[1];
        if (/^".*"$/.test(value)) {
          coloredLine = coloredLine.replace(value, `<span style="color: green;">${value}</span>`);
        } else if (/true|false/.test(value)) {
          coloredLine = coloredLine.replace(value, `<span style="color: blue;">${value}</span>`);
        } else if (/null/.test(value)) {
          coloredLine = coloredLine.replace(value, `<span style="color: magenta;">${value}</span>`);
        } else if (!isNaN(Number(value))) {
          coloredLine = coloredLine.replace(value, `<span style="color: red;">${value}</span>`);
        }
      }

      return coloredLine;
    })
    .join("\n");
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
