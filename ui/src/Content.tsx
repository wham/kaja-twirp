import { TwirpFetchTransport } from "@protobuf-ts/twirp-transport";
import React, { useState } from "react";
import { SearchServiceClient } from "./search-service.client";
import { Editor, Monaco } from "@monaco-editor/react";
import { Box, Button, TabNav } from "@primer/react";
import Console from "./Console";
import { editor } from "monaco-editor";
import { Model } from "./Model";

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

// https://github.com/lukasbach/monaco-editor-auto-typings/
const SearchService = {
  Search: async function () {
    let transport = new TwirpFetchTransport({
      baseUrl: "http://localhost:3000/twirp",
    });

    let client = new SearchServiceClient(transport);

    let { response } = await client.search({
      query: "",
      pageNumber: 0,
      resultPerPage: 0,
    });

    GOUT(JSON.stringify(response));
  },
};

let ssContent = `const SearchService = {
  Search: async function (name: string) {
    let transport = new TwirpFetchTransport({
      baseUrl: "http://localhost:3000/twirp",
    });

    let client = new SearchServiceClient(transport);

    let { response } = await client.search({
      query: "",
      pageNumber: 0,
      resultPerPage: 0,
    });

    GOUT(JSON.stringify(response));
  },
};
const TwirpFetchTransport = {};`;

let GOUT = (output: string) => {};

export function Content({
  tabs,
  selectedTabId,
  onTabSelect,
  model,
}: ContentProps) {
  const [output, setOutput] = useState("");
  const editorRefs = React.useRef<{
    [index: number]: editor.IStandaloneCodeEditor;
  }>({});

  // (editor: editor.IStandaloneCodeEditor, monaco: Monaco)
  function handleEditorDidMount(
    tabId: number,
    editor: editor.IStandaloneCodeEditor,
    monaco: Monaco,
    model: Model
  ) {
    editorRefs.current[tabId] = editor;
    editor.focus();

    model.services.forEach((service) => {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(
        service.extraLib
      );
    });

    monaco.languages.typescript.typescriptDefaults.addExtraLib(ssContent);
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
            <Box
              sx={{ display: tab.id === selectedTabId ? "block" : "none" }}
              key={tab.id}
            >
              <Editor
                height="60vh"
                defaultLanguage="typescript"
                defaultValue={tab.code}
                onMount={(
                  editor: editor.IStandaloneCodeEditor,
                  monaco: Monaco
                ) => {
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
