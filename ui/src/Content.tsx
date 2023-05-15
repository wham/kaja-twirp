import { TwirpFetchTransport } from "@protobuf-ts/twirp-transport";
import React, { useState } from "react";
import { SearchServiceClient } from "./search-service.client";
import { Editor, Monaco } from "@monaco-editor/react";
import { Box, Button, TabNav } from "@primer/react";
import Console from "./Console";
import { editor } from "monaco-editor";

export type TabContent = {
  id: number;
  title: string;
  code: string;
};

type ContentProps = {
  tabs: Array<TabContent>;
  selectedTabId: number;
  onTabSelect: (id: number) => void;
};

const xSearchService = {
  search: async function () {
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

let GOUT = (output: string) => {};

export function Content({ tabs, selectedTabId, onTabSelect }: ContentProps) {
  const [output, setOutput] = useState("");
  const editorRef = React.useRef<editor.IStandaloneCodeEditor | null>(null);

  // (editor: editor.IStandaloneCodeEditor, monaco: Monaco)
  function handleEditorDidMount(
    editor: editor.IStandaloneCodeEditor,
    monaco: Monaco
  ) {
    editorRef.current = editor;
    editor.focus();
  }

  GOUT = (output: string) => {
    setOutput(output);
  };

  async function callApi() {
    //let response = await xSearchService.search()

    if (editorRef.current) {
      eval((editorRef.current as any).getValue());
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
                defaultLanguage="javascript"
                defaultValue={tab.code}
                onMount={handleEditorDidMount}
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
