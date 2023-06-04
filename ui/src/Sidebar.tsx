import { TreeView } from "@primer/react";
import { Method, Model, Service } from "./Model";

type SidebarProps = {
  model: Model;
  onSelect: (service: Service, method: Method) => void;
};

export function Sidebar({ model, onSelect }: SidebarProps) {
  return (
    <nav aria-label="Methods">
      <TreeView aria-label="Methods">
        {model.Files.map((file) => {
          return file.Services.map((service) => {
            return (
              <TreeView.Item id={service.Name} key={service.Name} expanded={true}>
                <TreeView.LeadingVisual>
                  <TreeView.DirectoryIcon />
                </TreeView.LeadingVisual>
                {service.Name}
                <TreeView.SubTree>
                  {service.Methods.map((method) => {
                    return (
                      <TreeView.Item
                        id={method.Name}
                        key={method.Name}
                        onSelect={() => onSelect(service, method)}
                      >
                        {method.Name}
                      </TreeView.Item>
                    );
                  })}
                </TreeView.SubTree>
              </TreeView.Item>
            );
          });
        })}
      </TreeView>
    </nav>
  );
}
