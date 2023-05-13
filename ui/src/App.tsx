import { useEffect, useState } from "react";
import "./App.css";
import { Sidebar } from "./Sidebar";
import { Model } from "./Model";
import { Box, ThemeProvider } from "@primer/react";
import { Content } from "./Content";

function App() {
  const [model, setModel] = useState<Model>({ Files: [] });

  useEffect(() => {
    fetch("/api/model")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setModel(data);
      });
  }, []);

  return (
    <ThemeProvider colorMode="night">
      <Box sx={{ display: "flex", height: "100vh", bg: "canvas.default" }}>
        <Box sx={{ width: 300 }}>
          <Sidebar model={model} />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Content />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
