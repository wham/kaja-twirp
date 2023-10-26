import { Editor, Monaco } from "@monaco-editor/react";
import { PlayIcon } from "@primer/octicons-react";
import { Box, IconButton } from "@primer/react";
import { editor } from "monaco-editor";
import React, { useEffect } from "react";
import { Method, Project, Service } from "./project";

type ContentProps = {
  project: Project;
  service: Service;
  method: Method;
};

export function Content({ project, service, method }: ContentProps) {
  const codeEditorRef = React.useRef<editor.IStandaloneCodeEditor>();
  const consoleEditorRef = React.useRef<editor.IStandaloneCodeEditor>();

  function handleCodeEditorDidMount(editor: editor.IStandaloneCodeEditor, monaco: Monaco, project: Project) {
    codeEditorRef.current = editor;
    editor.focus();

    project.extraLibs.forEach((extraLib) => {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(extraLib.content, extraLib.filePath);
    });
  }

  function handleConsoleEditorDidMount(editor: editor.IStandaloneCodeEditor, monaco: Monaco, project: Project) {
    consoleEditorRef.current = editor;

    const styles = editor.getDomNode()?.style;

    if (styles) {
      // https://github.com/microsoft/monaco-editor/issues/338#issuecomment-1763246584
      styles.setProperty("--vscode-editor-background", "#000000");
      styles.setProperty("--vscode-editorGutter-background", "#000000");
    }
  }

  (window as any).GOUT = (output: string) => {
    if (consoleEditorRef.current) {
      consoleEditorRef.current.setValue(output);
    }
  };

  async function callMethod() {
    if (consoleEditorRef.current) {
      consoleEditorRef.current.setValue("");
    }

    if (codeEditorRef.current) {
      const func = new Function(codeEditorRef.current.getValue());
      func();
    }
  }

  useEffect(() => {
    if (codeEditorRef.current) {
      codeEditorRef.current.setValue(method.editorCode);
    }

    if (consoleEditorRef.current) {
      consoleEditorRef.current.setValue("");
    }
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ borderBottomWidth: 1, borderBottomStyle: "solid", borderBottomColor: "border.default" }}>
        <Editor
          height="50vh"
          defaultLanguage="typescript"
          defaultValue={method.editorCode}
          onMount={(editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
            handleCodeEditorDidMount(editor, monaco, project);
          }}
          theme="vs-dark"
          options={{ minimap: { enabled: false }, renderLineHighlight: "none" }}
        />
        <Box sx={{ position: "absolute", top: "10px", right: "30px" }}>
          <IconButton icon={PlayIcon} aria-label="Call" variant="primary" size="large" onClick={callMethod} />
        </Box>
      </Box>
      <Box sx={{ color: "fg.default" }}>
        <Editor
          height="50vh"
          defaultLanguage="typescript"
          onMount={(editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
            handleConsoleEditorDidMount(editor, monaco, project);
          }}
          theme="vs-dark"
          options={{ readOnly: true, minimap: { enabled: false }, renderLineHighlight: "none", lineNumbers: "off" }}
        />
      </Box>
    </Box>
  );
}
