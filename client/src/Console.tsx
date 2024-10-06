import { Monaco } from "@monaco-editor/react";
import { Box } from "@primer/react";
import { useEffect, useRef, useState } from "react";
import { Log, LogLevel } from "./server/api";

interface MethodCall {
  serviceName: string;
  methodName: string;
  input: any;
  output: any;
}

export type ConsoleItem = Log[] | MethodCall;

interface ConsoleProps {
  items: ConsoleItem[];
  monaco?: Monaco;
}

export function Console({ items, monaco }: ConsoleProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [items]);

  return (
    <Box sx={{ fontSize: 12, padding: 1 }}>
      {items.map((item, index) => {
        let itemElement;
        if (Array.isArray(item)) {
          itemElement = <Console.Logs logs={item} />;
        } else if ("serviceName" in item) {
          itemElement = Console.MethodCall({ methodCall: item, monaco });
        }

        return <Box key={index}>{itemElement}</Box>;
      })}
      <div ref={bottomRef} />
    </Box>
  );
}

interface LogsProps {
  logs: Log[];
}

Console.Logs = function ({ logs }: LogsProps) {
  return (
    <pre style={{ margin: 0 }}>
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

interface MethodCallProps {
  methodCall: MethodCall;
  monaco?: Monaco;
}

Console.MethodCall = function ({ methodCall, monaco }: MethodCallProps) {
  const [html, setHtml] = useState<string>("");

  /*useEffect(() => {
    if (monaco) {
      formatJson(JSON.stringify(methodCall.output)).then((h) => {
        monaco.editor.colorize(h, "typescript", { tabSize: 2 }).then((h) => {
          console.log("COLORIZED");
          console.log(h);
          setHtml(h);
        });
      });
    }
  }, [methodCall]);*/

  return (
    <>
      <Console.Logs
        logs={[
          {
            index: 0,
            level: methodCall.output instanceof Error ? LogLevel.LEVEL_ERROR : LogLevel.LEVEL_INFO,
            message: methodCall.serviceName + "." + methodCall.methodName + "()",
          },
        ]}
      />
      <pre>
        <code style={{ whiteSpace: "pre-wrap" }} dangerouslySetInnerHTML={{ __html: "foo" }} />
      </pre>
    </>
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
