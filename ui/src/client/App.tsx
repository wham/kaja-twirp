import { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Endpoint, Method, Model, Service, defaultEndpoint } from "./model";
import { BaseStyles, Box, ThemeProvider } from "@primer/react";
import { Content } from "./Content";
import { loadModel } from "./modelLoader";

function App() {
  console.log("Rendering App");
  const [model, setModel] = useState<Model>();
  const [selectedEndpoint, setSelectedEndpoint] = useState<Endpoint>();

  useEffect(() => {
    const load = async () => {
      setModel(await loadModel());
    };

    load();
  }, []);

  if (!model) {
    return <Box>Loading...</Box>;
  }

  if (!selectedEndpoint) {
    setSelectedEndpoint(defaultEndpoint(model.services));
    if (!selectedEndpoint) {
      return <Box>No methods found</Box>;
    }
  }

  model.services.forEach((service) => {
    window[service.name as any] = service.proxy;
  });

  const onSelect = (service: Service, method: Method) => {
    setSelectedEndpoint({ service, method });
  };

  return (
    <ThemeProvider colorMode="night">
      <BaseStyles>
        <Box sx={{ display: "flex", height: "100vh", bg: "canvas.default" }}>
          <Box sx={{ width: 300, borderRightWidth: 1, borderRightStyle: "solid", borderRightColor: "border.default", flexShrink: 0 }}>
            <Sidebar model={model} onSelect={onSelect} currentMethod={selectedEndpoint.method} />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            {selectedEndpoint ? <Content model={model} service={selectedEndpoint.service} method={selectedEndpoint.method} /> : <Box>Empty state</Box>}
          </Box>
        </Box>
      </BaseStyles>
    </ThemeProvider>
  );
}

export default App;
