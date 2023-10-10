import { TreeView } from "@primer/react";
import { Method, Model, Service } from "./Model";

type SidebarProps = {
  model: Model;
  onSelect: (service: Service, method: Method) => void;
};

export function Sidebar({ model, onSelect }: SidebarProps) {
  return (
    <nav aria-label="Services and methods">
      <TreeView aria-label="Services and methods">
        {model.services.map((service) => {
          return (
            <TreeView.Item id={service.name}>
              {service.name}
              <TreeView.SubTree>
                {service.methods.map((method) => {
                  return (
                    <TreeView.Item id={service.name + "." + method.name} onSelect={() => onSelect(service, method)}>
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
  );
}
