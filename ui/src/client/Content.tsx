import React, { useState } from "react";
import { Editor, Monaco } from "@monaco-editor/react";
import { Box, Button, TabNav } from "@primer/react";
import Console from "./Console";
import { editor } from "monaco-editor";
import { Model } from "./model";

export type TabContent = {
  id: number;
  title: string;
  code: string;
};

type ContentProps = {
  tabs: Array<TabContent>;
  selectedTabId: number;
  onTabSelect: (id: number) => void;
  model: Model;
};

let GOUT = (output: string) => {};

export function Content({ tabs, selectedTabId, onTabSelect, model }: ContentProps) {
  const [output, setOutput] = useState("");
  const editorRefs = React.useRef<{
    [index: number]: editor.IStandaloneCodeEditor;
  }>({});

  // (editor: editor.IStandaloneCodeEditor, monaco: Monaco)
  function handleEditorDidMount(tabId: number, editor: editor.IStandaloneCodeEditor, monaco: Monaco, model: Model) {
    editorRefs.current[tabId] = editor;
    editor.focus();

    /*model.services.forEach((service) => {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(
        service.extraLib
      );
    });*/

    model.extraLibs.forEach((extraLib) => {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(extraLib.content, extraLib.filePath);
    });
  }

  (window as any).GOUT = (output: string) => {
    setOutput(JSON.stringify(output));
  };

  async function callApi() {
    //let response = await xSearchService.search()

    if (editorRefs.current[selectedTabId]) {
      //eval(editorRefs.current[selectedTabId].getValue());
      const func = new Function(editorRefs.current[selectedTabId].getValue());
      func();
    }
    //alert(JSON.stringify(response));
    //alert(JSON.stringify(await xSearchService.search()))
  }

  return (
    <Box>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ flex: 1 }}>
          <TabNav aria-label="Main">
            {tabs.map((tab) => {
              return (
                <TabNav.Link
                  key={tab.id}
                  selected={tab.id === selectedTabId}
                  onClick={() => {
                    onTabSelect(tab.id);
                  }}
                >
                  {tab.title}
                </TabNav.Link>
              );
            })}
          </TabNav>
        </Box>
        <Box sx={{ padding: "2px" }}>
          <Button variant="primary" size="medium" onClick={callApi}>
            Call
          </Button>
        </Box>
      </Box>
      <Box>
        {tabs.map((tab) => {
          return (
            <Box sx={{ display: tab.id === selectedTabId ? "block" : "none" }} key={tab.id}>
              <Editor
                height="60vh"
                defaultLanguage="typescript"
                defaultValue={tab.code}
                onMount={(editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
                  handleEditorDidMount(tab.id, editor, monaco, model);
                }}
                theme="vs-dark"
              />
            </Box>
          );
        })}
      </Box>
      <Box sx={{ height: "40vh", color: "fg.default" }}>
        <Console output={output} />
      </Box>
    </Box>
  );
}
