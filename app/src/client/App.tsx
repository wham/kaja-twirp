import { BaseStyles, Box, ThemeProvider } from "@primer/react";
import { useEffect, useState } from "react";
import { Blankslate } from "./Blankslate";
import { Workspace } from "./Workspace";
import { Project, getDefaultEndpoint } from "./project";
import { loadProject } from "./projectLoader";

// https://github.com/GoogleChromeLabs/jsbi/issues/30#issuecomment-1006088574
(BigInt.prototype as any)["toJSON"] = function () {
  return this.toString();
};

function App() {
  const [project, setProject] = useState<Project>();
  console.log("Rendering App", project);

  useEffect(() => {
    const load = async () => {
      setProject(await loadProject());
    };

    load();
  }, []);

  const defaultEndpoint = project ? getDefaultEndpoint(project.services) : undefined;

  if (project) {
    project.services.forEach((service) => {
      window[service.name as any] = {} as any;
      service.methods.forEach((method) => {
        window[service.name as any][method.name as any] = method.globalTrigger as any;
      });
    });
  }

  let content: JSX.Element;

  if (!project) {
    content = <Box>Loading...</Box>;
  } else if (!defaultEndpoint) {
    content = <Blankslate />;
  } else {
    content = <Workspace project={project} defaultEndpoint={defaultEndpoint} />;
  }

  return (
    <ThemeProvider colorMode="night">
      <BaseStyles>
        <Box sx={{ display: "flex", height: "100vh", bg: "canvas.default" }}>{content}</Box>
      </BaseStyles>
    </ThemeProvider>
  );
}

export default App;
