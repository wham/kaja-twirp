import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Sidebar } from './Sidebar';
import Editor from '@monaco-editor/react';
import { QuirksClient } from './quirks.client';
import { TwirpFetchTransport } from '@protobuf-ts/twirp-transport';
import { SearchService } from './search-service';
import { SearchServiceClient } from './search-service.client';

function App() {
  useEffect(() => {
    fetch("/api/model")
      .then((response) => {
        console.log(response)
      })
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Sidebar/>
      <button onClick={ callApi }>Call</button>
      <Editor height="90vh" defaultLanguage="javascript" defaultValue="// some comment" />
    </div>
  );
}

async function callApi() {
  let transport = new TwirpFetchTransport({
    baseUrl: "http://localhost:3000/proxy"
  });

  let client = new SearchServiceClient(transport)

  let {response} = await client.search({
    query: '',
    pageNumber: 0,
    resultPerPage: 0
  })

  alert(JSON.stringify(response))
}

export default App;
