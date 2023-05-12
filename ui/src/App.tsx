import React, { useEffect, useState } from 'react';
import './App.css';
import { Sidebar } from './Sidebar';
import Editor from '@monaco-editor/react';
import { QuirksClient } from './quirks.client';
import { TwirpFetchTransport } from '@protobuf-ts/twirp-transport';
import { SearchService } from './search-service';
import { SearchServiceClient } from './search-service.client';
import { Model } from './Model';
import { Box, ThemeProvider } from '@primer/react';

const xSearchService = {
  search: async function() {
    let transport = new TwirpFetchTransport({
      baseUrl: "http://localhost:3000/twirp"
    });
  
    let client = new SearchServiceClient(transport)
  
    let {response} = await client.search({
      query: '',
      pageNumber: 0,
      resultPerPage: 0
    })
    
    alert(JSON.stringify(response));
  }
}

function App() {
  const editorRef = React.useRef(null);

  const [model, setModel] = useState<Model>({Files: []});

  useEffect(() => {
    fetch("/api/model")
      .then((response) => {
        return response.json();  
      })
      .then((data) => {
        setModel(data);
      });
  }, [])

  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
    editor.focus();
  }

  async function callApi() {
    //let response = await xSearchService.search()
  
    if (editorRef.current)  {
      eval((editorRef.current as any).getValue());
    }
    //alert(JSON.stringify(response));
    //alert(JSON.stringify(await xSearchService.search()))
  }

  return (
    <ThemeProvider colorMode="night">
      <Box sx={{display: "flex", height: "100vh"}}>
        <Sidebar model={model}/>
        <Box sx={{flexGrow: 1}}>
          <button onClick={ callApi }>Call</button>
          <Editor height="90vh" defaultLanguage="javascript" defaultValue="xSearchService.search();" onMount={handleEditorDidMount} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
