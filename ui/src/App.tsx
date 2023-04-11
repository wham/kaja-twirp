import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Sidebar } from './Sidebar';
import Editor from '@monaco-editor/react';

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
      <Editor height="90vh" defaultLanguage="javascript" defaultValue="// some comment" />
    </div>
  );
}

export default App;
