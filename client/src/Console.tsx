import { Monaco } from "@monaco-editor/react";
import { Box, Link, Spinner } from "@primer/react";
import { useEffect, useRef, useState } from "react";
import { formatJson } from "./formatter";
import { MethodCall } from "./kaja";
import { methodId } from "./project";
import { Log, LogLevel } from "./server/api";

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
  });

  const onColorized = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box sx={{ fontSize: 12, padding: 1 }}>
      {items.map((item, index) => {
        let itemElement;
        if (Array.isArray(item)) {
          itemElement = <Console.Logs logs={item} />;
        } else if ("method" in item) {
          itemElement = <Console.MethodCall methodCall={item} monaco={monaco} onColorized={onColorized} />;
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
  onColorized: () => void;
}

Console.MethodCall = function ({ methodCall, monaco, onColorized }: MethodCallProps) {
  const [html, setHtml] = useState<string>("");
  const [showingOutput, setShowingOutput] = useState(true);

  const onInputClick = () => {
    if (monaco) {
      formatJson(JSON.stringify(methodCall.input)).then((h) => {
        monaco.editor.colorize(h, "typescript", { tabSize: 2 }).then((h) => {
          setHtml(h);
          setShowingOutput(false);
          setTimeout(() => {
            onColorized();
          }, 100);
        });
      });
    }
  };

  const onOutputClick = () => {
    if (monaco) {
      formatJson(JSON.stringify(methodCall.output)).then((h) => {
        monaco.editor.colorize(h, "typescript", { tabSize: 2 }).then((h) => {
          setHtml(h);
          setShowingOutput(true);
          setTimeout(() => {
            onColorized();
          }, 100);
        });
      });
    }
  };

  const onErrorClick = () => {
    if (monaco) {
      formatJson(JSON.stringify(methodCall.error)).then((h) => {
        monaco.editor.colorize(h, "typescript", { tabSize: 2 }).then((h) => {
          setHtml(h);
          setShowingOutput(true);
          setTimeout(() => {
            onColorized();
          }, 100);
        });
      });
    }
  };

  useEffect(() => {
    if (monaco) {
      formatJson(JSON.stringify(methodCall.output || methodCall.error)).then((h) => {
        monaco.editor.colorize(h, "typescript", { tabSize: 2 }).then((h) => {
          setHtml(h);
          setTimeout(() => {
            onColorized();
          }, 100);
        });
      });
    }
  }, [methodCall, monaco]);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <code>
          <span style={{ color: colorForLogLevel(LogLevel.LEVEL_INFO) }}>{methodId(methodCall.service, methodCall.method) + "("}</span>
        </code>
        <Link muted={!showingOutput} onClick={onInputClick}>
          <code>input</code>
        </Link>
        <code>
          <span style={{ color: colorForLogLevel(LogLevel.LEVEL_INFO) }}>):&nbsp;</span>
        </code>
        {methodCall.output && (
          <Link muted={showingOutput} onClick={onOutputClick}>
            <code>output</code>
          </Link>
        )}
        {methodCall.error && (
          <Link muted={showingOutput} onClick={onErrorClick}>
            <code style={{ color: colorForLogLevel(LogLevel.LEVEL_ERROR) }}>error</code>
          </Link>
        )}
        {!methodCall.output && !methodCall.error && <Spinner size="small" />}
      </Box>
      <pre>
        <code style={{ whiteSpace: "pre-wrap" }} dangerouslySetInnerHTML={{ __html: html }} />
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
