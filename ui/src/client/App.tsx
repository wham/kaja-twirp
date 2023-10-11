import { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Method, Model, Service } from "./model";
import { BaseStyles, Box, ThemeProvider } from "@primer/react";
import { Content, TabContent } from "./Content";
import { loadModel } from "./modelLoader";

function App() {
  console.log("Rendering App");
  const [model, setModel] = useState<Model>();
  const [tabs, setTabs] = useState<Array<TabContent>>([]);
  const [tabIdGenerator, setTabIdGenerator] = useState<number>(0);
  const [selectedTabId, setSelectedTabId] = useState<number>(0);
  const [currentMethod, setCurrentMethod] = useState<Method>();

  useEffect(() => {
    const load = async () => {
      setModel(await loadModel());
    };

    load();
  }, []);

  if (!model) {
    return <Box>Loading...</Box>;
  }

  model.services.forEach((service) => {
    window[service.name as any] = service.proxy;
  });

  let addTab = (service: Service, method: Method) => {
    setTabIdGenerator(tabIdGenerator + 1);
    setTabs([
      ...tabs,
      {
        id: tabIdGenerator,
        title: method.name,
        code: method.code,
      },
    ]);
    setSelectedTabId(tabIdGenerator);
    setCurrentMethod(method);
  };

  return (
    <ThemeProvider colorMode="night">
      <BaseStyles>
        <Box sx={{ display: "flex", height: "100vh", bg: "canvas.default" }}>
          <Box sx={{ width: 300, borderRightWidth: 1, borderRightStyle: "solid", borderRightColor: "border.default" }}>
            <Sidebar model={model} onSelect={addTab} currentMethod={currentMethod} />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Content tabs={tabs} selectedTabId={selectedTabId} onTabSelect={setSelectedTabId} model={model} />
          </Box>
        </Box>
      </BaseStyles>
    </ThemeProvider>
  );
}

export default App;
