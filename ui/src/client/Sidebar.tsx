import { TreeView } from "@primer/react";
import { Method, Model, Service, methodId } from "./model";

type SidebarProps = {
  model: Model;
  onSelect: (service: Service, method: Method) => void;
  currentMethod?: Method;
};

export function Sidebar({ model, onSelect, currentMethod }: SidebarProps) {
  return (
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
  );
}
