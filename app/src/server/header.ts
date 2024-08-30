interface Header {
  name: string;
  value: string;
}

export function parseHeader(header: string): Header {
  const parts = header.split(":");
  const name = parts[0];
  const value = parts.slice(1).join(":").trim();
  return { name, value };
}
