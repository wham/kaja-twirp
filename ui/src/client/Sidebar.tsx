import { Box, Link, TreeView, Text } from "@primer/react";
import { Method, Model, Service, methodId } from "./model";
import { Icon, MarkGithubIcon } from "@primer/octicons-react";

type SidebarProps = {
  model: Model;
  onSelect: (service: Service, method: Method) => void;
  currentMethod?: Method;
};

export function Sidebar({ model, onSelect, currentMethod }: SidebarProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ paddingX: 2, flexGrow: 1 }}>
        <nav aria-label="Services and methods">
          <TreeView aria-label="Services and methods">
            {model.services.map((service, index) => {
              return (
                <TreeView.Item id={service.name} defaultExpanded={index === 0}>
                  {service.name}
                  <TreeView.SubTree>
                    {service.methods.map((method) => {
                      return (
                        <TreeView.Item id={methodId(service, method)} onSelect={() => onSelect(service, method)} current={currentMethod === method}>
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
      <Box sx={{ position: "fixed", bottom: 0, width: 300, borderTopWidth: 1, borderTopStyle: "solid", borderTopColor: "border.default" }}>
        <Link href="https://github.com/wham/kaja-twirp" sx={{ color: "btn.primary.text", paddingX: 2, paddingY: 2, fontSize: "12px" }}>
          <MarkGithubIcon />
          <Text sx={{ paddingLeft: 2 }}>kaja-twirp</Text>
        </Link>
      </Box>
    </Box>
  );
}
