import { Box } from "@primer/react";
import React from "react";
import { Console } from "./Console";
import { ControlBar } from "./ControlBar";
import { Editor } from "./Editor";
import { Gutter } from "./Gutter";
import { Method, Project, Service } from "./project";
import { LogLevel } from "./server/api";

interface ContentProps {
  project: Project;
  service: Service;
  method: Method;
}

export function Content({ project, method }: ContentProps) {
  const [consoleChildren, setConsoleChildren] = React.useState<React.ReactElement[]>([]);
  const [editorHeight, setEditorHeight] = React.useState(400);
  let editorCode: string | undefined;

  function onEditorChange(code: string | undefined) {
    editorCode = code;
  }

  window.setOutput = (endpoint: string, output: string, isError: boolean) => {
    setConsoleChildren((consoleChildren) => [
      ...consoleChildren,
      <Console.Logs key={consoleChildren.length * 2} logs={[{ index: 0, level: isError ? LogLevel.LEVEL_ERROR : LogLevel.LEVEL_INFO, message: endpoint }]} />,
      <Console.Json key={consoleChildren.length * 2 + 1} json={output} />,
    ]);
  };

  async function callMethod() {
    if (!editorCode) {
      return;
    }

    let lines = editorCode.split("\n"); // split the code into lines
    let isInImport = false;
    // remove import statements
    while (lines.length > 0 && (lines[0].startsWith("import ") || isInImport)) {
      isInImport = !lines[0].endsWith(";");
      lines.shift();
    }

    const func = new Function(lines.join("\n"));
    func();
  }

  const onEditorResize = (delta: number) => {
    setEditorHeight((height) => height + delta);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <ControlBar onRun={callMethod} />
      <Box
        sx={{
          height: editorHeight,
          borderTopWidth: 1,
          borderTopStyle: "solid",
          borderTopColor: "border.default",
        }}
      >
        <Editor code={method.editorCode} extraLibs={project.extraLibs} onChange={onEditorChange} />
      </Box>
      <Gutter orientation="horizontal" onResize={onEditorResize} />
      <Box sx={{ color: "fg.default", overflowY: "scroll", paddingX: 1 }}>
        <Console>{consoleChildren}</Console>
      </Box>
    </Box>
  );
}
