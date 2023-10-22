import { BaseStyles, Box, ThemeProvider } from "@primer/react";
import { useEffect, useState } from "react";
import { Content } from "./Content";
import { Sidebar } from "./Sidebar";
import { Endpoint, Method, Project, Service, defaultEndpoint } from "./project";
import { loadProject } from "./projectLoader";

function App() {
  console.log("Rendering App");
  const [project, setProject] = useState<Project>();
  const [selectedEndpoint, setSelectedEndpoint] = useState<Endpoint>();

  useEffect(() => {
    const load = async () => {
      setProject(await loadProject());
    };

    load();
  }, []);

  if (!project) {
    return <Box>Loading...</Box>;
  }

  if (!selectedEndpoint) {
    setSelectedEndpoint(defaultEndpoint(project.services));
    if (!selectedEndpoint) {
      return <Box>No methods found</Box>;
    }
  }

  project.services.forEach((service) => {
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
            <Sidebar project={project} onSelect={onSelect} currentMethod={selectedEndpoint.method} />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            {selectedEndpoint ? <Content project={project} service={selectedEndpoint.service} method={selectedEndpoint.method} /> : <Box>Empty state</Box>}
          </Box>
        </Box>
      </BaseStyles>
    </ThemeProvider>
  );
}

export default App;
