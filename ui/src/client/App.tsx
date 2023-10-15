import { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Method, Model, Service } from "./model";
import { BaseStyles, Box, ThemeProvider } from "@primer/react";
import { Content } from "./Content";
import { loadModel } from "./modelLoader";

function App() {
  console.log("Rendering App");
  const [model, setModel] = useState<Model>();
  const [selectedService, setSelectedService] = useState<Service>();
  const [selectedMethod, setSelectedMethod] = useState<Method>();

  useEffect(() => {
    const load = async () => {
      setModel(await loadModel());
    };

    load();
  }, []);

  if (!model) {
    return <Box>Loading...</Box>;
  }

  if (model.services.length === 0) {
    return <Box>No services found</Box>;
  }

  model.services.forEach((service) => {
    window[service.name as any] = service.proxy;
  });

  const onSelect = (service: Service, method: Method) => {
    setSelectedService(service);
    setSelectedMethod(method);
  };

  return (
    <ThemeProvider colorMode="night">
      <BaseStyles>
        <Box sx={{ display: "flex", height: "100vh", bg: "canvas.default" }}>
          <Box sx={{ width: 300, borderRightWidth: 1, borderRightStyle: "solid", borderRightColor: "border.default", flexShrink: 0 }}>
            <Sidebar model={model} onSelect={onSelect} currentMethod={selectedMethod} />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            {selectedService && selectedMethod ? <Content model={model} service={selectedService} method={selectedMethod} /> : <Box>Empty state</Box>}
          </Box>
        </Box>
      </BaseStyles>
    </ThemeProvider>
  );
}

export default App;
