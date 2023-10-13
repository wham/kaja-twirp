import React, { useState } from "react";
import { Editor, Monaco } from "@monaco-editor/react";
import { Box, Button } from "@primer/react";
import Console from "./Console";
import { editor } from "monaco-editor";
import { Method, Model, Service } from "./model";

type ContentProps = {
  model: Model;
  service: Service;
  method: Method;
};

let GOUT = (output: string) => {};

export function Content({ model, service, method }: ContentProps) {
  const [output, setOutput] = useState("");
  const editorRef = React.useRef<editor.IStandaloneCodeEditor>();

  // (editor: editor.IStandaloneCodeEditor, monaco: Monaco)
  function handleEditorDidMount(editor: editor.IStandaloneCodeEditor, monaco: Monaco, model: Model) {
    editorRef.current = editor;
    editor.focus();

    model.extraLibs.forEach((extraLib) => {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(extraLib.content, extraLib.filePath);
    });
  }

  (window as any).GOUT = (output: string) => {
    setOutput(JSON.stringify(output));
  };

  async function callApi() {
    //let response = await xSearchService.search()

    if (editorRef.current) {
      //eval(editorRefs.current[selectedTabId].getValue());
      const func = new Function(editorRef.current.getValue());
      func();
    }
    //alert(JSON.stringify(response));
    //alert(JSON.stringify(await xSearchService.search()))
  }

  return (
    <Box>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ flex: 1 }}>Service.Method</Box>
        <Box sx={{ padding: "2px" }}>
          <Button variant="primary" size="medium" onClick={callApi}>
            Call
          </Button>
        </Box>
      </Box>
      <Box>
        <Editor
          height="60vh"
          defaultLanguage="typescript"
          defaultValue={method.code}
          onMount={(editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
            handleEditorDidMount(editor, monaco, model);
          }}
          theme="vs-dark"
        />
      </Box>
      <Box sx={{ height: "40vh", color: "fg.default" }}>
        <Console output={output} />
      </Box>
    </Box>
  );
}
