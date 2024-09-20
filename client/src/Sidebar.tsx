import { Box, TreeView } from "@primer/react";
import { Method, Project, Service, methodId } from "./project";

interface SidebarProps {
  project: Project;
  onSelect: (service: Service, method: Method) => void;
  currentMethod?: Method;
}

export function Sidebar({ project, onSelect, currentMethod }: SidebarProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ paddingX: 2, flexGrow: 1 }}>
        <nav aria-label="Services and methods">
          <TreeView aria-label="Services and methods">
            {project.services.map((service, index) => {
              return (
                <TreeView.Item id={service.name} key={service.name} defaultExpanded={index === 0}>
                  {service.name}
                  <TreeView.SubTree>
                    {service.methods.map((method) => {
                      return (
                        <TreeView.Item
                          id={methodId(service, method)}
                          key={methodId(service, method)}
                          onSelect={() => onSelect(service, method)}
                          current={currentMethod === method}
                        >
                          {method.name}
                        </TreeView.Item>
                      );
                    })}
                  </TreeView.SubTree>
                </TreeView.Item>
              );
            })}
          </TreeView>
        </nav>
      </Box>
    </Box>
  );
}
