import React, { useEffect, useState } from "react";
import { Editor, Monaco } from "@monaco-editor/react";
import { Box, Button, IconButton, Overlay } from "@primer/react";
import { editor } from "monaco-editor";
import { Method, Model, Service } from "./model";
import { HeartIcon, TriangleRightIcon, ZapIcon } from "@primer/octicons-react";

type ContentProps = {
  model: Model;
  service: Service;
  method: Method;
};

let GOUT = (output: string) => {};

export function Content({ model, service, method }: ContentProps) {
  const codeEditorRef = React.useRef<editor.IStandaloneCodeEditor>();
  const consoleEditorRef = React.useRef<editor.IStandaloneCodeEditor>();

  function handleCodeEditorDidMount(editor: editor.IStandaloneCodeEditor, monaco: Monaco, model: Model) {
    codeEditorRef.current = editor;
    editor.focus();

    model.extraLibs.forEach((extraLib) => {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(extraLib.content, extraLib.filePath);
    });
  }

  function handleConsoleEditorDidMount(editor: editor.IStandaloneCodeEditor, monaco: Monaco, model: Model) {
    consoleEditorRef.current = editor;
  }

  (window as any).GOUT = (output: string) => {
    if (consoleEditorRef.current) {
      consoleEditorRef.current.setValue(output);
    }
  };

  async function callApi() {
    //let response = await xSearchService.search()

    if (codeEditorRef.current) {
      //eval(editorRefs.current[selectedTabId].getValue());
      const func = new Function(codeEditorRef.current.getValue());
      func();
    }
    //alert(JSON.stringify(response));
    //alert(JSON.stringify(await xSearchService.search()))
  }

  useEffect(() => {
    if (codeEditorRef.current) {
      codeEditorRef.current.setValue(method.code);
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
          defaultValue={method.code}
          onMount={(editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
            handleCodeEditorDidMount(editor, monaco, model);
          }}
          theme="vs-dark"
        />
        <Box sx={{ position: "absolute", top: "10px", right: "30px" }}>
          <IconButton icon={ZapIcon} aria-label="Call" variant="primary" size="large" onClick={callApi} />
        </Box>
      </Box>
      <Box sx={{ color: "fg.default" }}>
        <Editor
          height="50vh"
          defaultLanguage="typescript"
          onMount={(editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
            handleConsoleEditorDidMount(editor, monaco, model);
          }}
          theme="vs-dark"
        />
      </Box>
    </Box>
  );
}
