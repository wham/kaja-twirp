import { useEffect, useState } from "react";
import "./App.css";
import { Sidebar } from "./Sidebar";
import { Method, Model, Service } from "./Model";
import { Box, ThemeProvider } from "@primer/react";
import { Content, TabContent } from "./Content";

function App() {
  var tabIdGenerator = 0;
  const [model, setModel] = useState<Model>({ Files: [] });
  const [tabs, setTabs] = useState<Array<TabContent>>([]);
  const [selectedTabId, setSelectedTabId] = useState<number>(0);

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
    ++tabIdGenerator;
    setTabs([
      ...tabs,
      {
        id: tabIdGenerator,
        title: method.Name,
        code: service.Name + "." + method.Name + "();",
      },
    ]);
    setSelectedTabId(tabIdGenerator);
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
            selectedTabId={selectedTabId}
            onTabSelect={setSelectedTabId}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
