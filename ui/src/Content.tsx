import { TwirpFetchTransport } from "@protobuf-ts/twirp-transport";
import React, { useState } from "react";
import { SearchServiceClient } from "./search-service.client";
import { Editor } from "@monaco-editor/react";
import { Box, Button, TabNav } from "@primer/react";
import Console from "./Console";

export type TabContent = {
  title: string;
  code: string;
};

type ContentProps = {
  tabs: Array<TabContent>;
  selectedTabIndex: number;
  onTabSelect: (index: number) => void;
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

export function Content({ tabs, selectedTabIndex, onTabSelect }: ContentProps) {
  const [output, setOutput] = useState("");
  const editorRef = React.useRef(null);
  function handleEditorDidMount(editor: any, monaco: any) {
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
            {tabs.map((tab, index) => {
              return (
                <TabNav.Link
                  href="#todo"
                  selected={index === selectedTabIndex}
                  onClick={() => {
                    onTabSelect(index);
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
      <Editor
        height="60vh"
        defaultLanguage="javascript"
        defaultValue="xSearchService.search();"
        onMount={handleEditorDidMount}
        theme="vs-dark"
      />
      <Box sx={{ height: "40vh", color: "fg.default" }}>
        <Console output={output} />
      </Box>
    </Box>
  );
}
