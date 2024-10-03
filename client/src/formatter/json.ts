export function formatAndColorizeJson(json: string): string {
  if (!json) return "";

  try {
    json = JSON.stringify(JSON.parse(json), null, 2);
  } catch (error) {
    console.log("Failed to parse JSON", error);
    return json;
  }

  return json
    .split("\n")
    .map((line, index) => {
      const keyMatch = line.match(/"([^"]+)":/);
      const valueMatch = line.match(/: (.*)/);

      let coloredLine = line;

      if (keyMatch) {
        const key = keyMatch[1];
        coloredLine = coloredLine.replace(`"${key}"`, `<span style="color: #d4d4d4;">"${key}"</span>`);
      }

      if (valueMatch) {
        const value = valueMatch[1];
        if (/^".*"$/.test(value)) {
          coloredLine = coloredLine.replace(value, `<span style="color: #ce9178;">${value}</span>`);
        } else if (/true|false/.test(value)) {
          coloredLine = coloredLine.replace(value, `<span style="color: #569cd6;">${value}</span>`);
        } else if (/null/.test(value)) {
          coloredLine = coloredLine.replace(value, `<span style="color: magenta;">${value}</span>`);
        } else if (!isNaN(Number(value))) {
          coloredLine = coloredLine.replace(value, `<span style="color: #b5cea8;">${value}</span>`);
        }
      }

      return coloredLine;
    })
    .join("\n");
}

export function stringifyAndColorize(value: any): string {
  if (value === null) {
    return `<span style="color: #b5cea8;">null</span>`;
  }

  if (value === undefined) {
    return `<span style="color: #b5cea8;">undefined</span>`;
  }

  if (Array.isArray(value)) {
    let output = `<span style="color: #b5cea8;">[</span>`;
    for (let i = 0; i < value.length; i++) {
      output += ", " + stringifyAndColorize(value[i]);
    }
    output += `<span style="color: #b5cea8;">]</span>`;

    return output;
  }

  if (Object.prototype.toString.call(value) === "[object Object]") {
    let output = `<span style="color: #b5cea8;">{</span>`;
    for (const key in value) {
      output += `<span style="color: #d4d4d4;">"${key}"</span>: ` + stringifyAndColorize(value[key]);
    }
    output += `<span style="color: #b5cea8;">}</span>`;

    return output;
  }

  const type = typeof value;

  switch (type) {
    case "string":
      return `<span style="color: #ce9178;">"${escapeHtml(value)}"</span>`;
    case "number":
    case "bigint":
      return `<span style="color: #b5cea8;">${value}</span>`;
    case "boolean":
      return `<span style="color: #569cd6;">${value}</span>`;
    case "object":
    case "undefined":
      return `<span style="color: magenta;">${value}</span>`;
    default:
      return value + "?(" + type + ")";
  }
}

function escapeHtml(string: string) {
  return string.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
