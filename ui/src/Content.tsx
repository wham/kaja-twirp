import { TwirpFetchTransport } from "@protobuf-ts/twirp-transport";
import React from "react";
import { SearchServiceClient } from "./search-service.client";
import { Editor } from "@monaco-editor/react";
import { Box } from "@primer/react";

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

    alert(JSON.stringify(response));
  },
};

export function Content() {
  const editorRef = React.useRef(null);
  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
    editor.focus();
  }

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
      <button onClick={callApi}>Call</button>
      <Editor
        height="90vh"
        defaultLanguage="javascript"
        defaultValue="xSearchService.search();"
        onMount={handleEditorDidMount}
      />
    </Box>
  );
}
