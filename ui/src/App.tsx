import { useEffect, useState } from "react";
import "./App.css";
import { Sidebar } from "./Sidebar";
import { Method, Model, Service } from "./Model";
import { Box, ThemeProvider } from "@primer/react";
import { Content, TabContent } from "./Content";

function App() {
  const [model, setModel] = useState<Model>({ Files: [] });
  const [tabs, setTabs] = useState<Array<TabContent>>([]);
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);

  useEffect(() => {
    fetch("/api/model")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setModel(data);
      });
  }, []);

  let addTab = (service: Service, method: Method) => {
    setTabs([
      ...tabs,
      { title: method.Name, code: service.Name + "." + method.Name + "();" },
    ]);
    setSelectedTabIndex(tabs.length);
  };

  return (
    <ThemeProvider colorMode="night">
      <Box sx={{ display: "flex", height: "100vh", bg: "canvas.default" }}>
        <Box sx={{ width: 300 }}>
          <Sidebar model={model} onSelect={addTab} />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Content
            tabs={tabs}
            selectedTabIndex={selectedTabIndex}
            onTabSelect={setSelectedTabIndex}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
