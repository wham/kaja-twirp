import { Monaco } from "@monaco-editor/react";
import { Box } from "@primer/react";
import { useEffect, useRef, useState } from "react";
import { formatJson } from "./formatter";
import { Log, LogLevel } from "./server/api";

interface ConsoleProps {
  children?: React.ReactNode;
}

export function Console({ children }: ConsoleProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [children]);

  return (
    <Box sx={{ fontSize: 12 }}>
      {children}
      <div ref={bottomRef} />
    </Box>
  );
}

interface LogsProps {
  logs: Log[];
}

Console.Logs = function ({ logs }: LogsProps) {
  return (
    <pre>
      <code style={{ whiteSpace: "pre-wrap" }}>
        {logs.map((log, index) => (
          <span key={index} style={{ color: colorForLogLevel(log.level) }}>
            {log.message}
            {"\n"}
          </span>
        ))}
      </code>
    </pre>
  );
};

interface JsonProps {
  json: any;
  monaco?: Monaco;
}

Console.Json = function ({ json, monaco }: JsonProps) {
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    if (monaco) {
      formatJson(JSON.stringify(json)).then((h) => {
        monaco.editor.colorize(h, "typescript", { tabSize: 2 }).then((h) => {
          console.log("COLORIZED");
          console.log(h);
          setHtml(h);
        });
      });
    }
  }, [json]);

  return (
    <pre>
      <code style={{ whiteSpace: "pre-wrap" }} dangerouslySetInnerHTML={{ __html: html }} />
    </pre>
  );
};

function colorForLogLevel(level: LogLevel): string {
  switch (level) {
    case LogLevel.LEVEL_DEBUG:
      return "rgb(99, 108, 118)";
    case LogLevel.LEVEL_INFO:
      return "#3dc9b0";
    case LogLevel.LEVEL_WARN:
      return "rgb(154, 103, 0)";
    case LogLevel.LEVEL_ERROR:
      return "rgb(209, 36, 47)";
  }
}
