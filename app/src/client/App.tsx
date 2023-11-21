import { BaseStyles, Box, ThemeProvider } from "@primer/react";
import { useEffect, useState } from "react";
import { Content } from "./Content";
import { Sidebar } from "./Sidebar";
import { Endpoint, Method, Project, Service, getDefaultEndpoint } from "./project";
import { loadProject } from "./projectLoader";

// https://github.com/GoogleChromeLabs/jsbi/issues/30#issuecomment-1006088574
(BigInt.prototype as any)["toJSON"] = function () {
  return this.toString();
};

function App() {
  const [project, setProject] = useState<Project>();
  const [selectedEndpoint, setSelectedEndpoint] = useState<Endpoint>();
  console.log("Rendering App", project);

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
    const defaultEndpoint = getDefaultEndpoint(project.services);
    if (!defaultEndpoint) {
      return <Box>No methods found</Box>;
    }
    setSelectedEndpoint(defaultEndpoint);
  }

  project.services.forEach((service) => {
    window[service.name as any] = {} as any;
    service.methods.forEach((method) => {
      window[service.name as any][method.name as any] = method.globalTrigger as any;
    });
  });

  const onSelect = (service: Service, method: Method) => {
    setSelectedEndpoint({ service, method });
  };

  return (
    <ThemeProvider colorMode="night">
      <BaseStyles>
        <Box sx={{ display: "flex", height: "100vh", bg: "canvas.default" }}>
          <Box sx={{ width: 300, borderRightWidth: 1, borderRightStyle: "solid", borderRightColor: "border.default", flexShrink: 0 }}>
            <Sidebar project={project} onSelect={onSelect} currentMethod={selectedEndpoint!.method} />
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
