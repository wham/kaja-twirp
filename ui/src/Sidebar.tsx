import { TreeView } from "@primer/react";
import { Model } from "./Model";

type SidebarProps = {
  model: Model;
};

export function Sidebar({ model }: SidebarProps) {
  return (
    <nav aria-label="Methods">
      <TreeView aria-label="Methods">
        {model.Files.map((file) => {
          return file.Services.map((service) => {
            return (
              <TreeView.Item id={service.Name}>
                <TreeView.LeadingVisual>
                  <TreeView.DirectoryIcon />
                </TreeView.LeadingVisual>
                {service.Name}
                <TreeView.SubTree>
                  {service.Methods.map((method) => {
                    return (
                      <TreeView.Item
                        id={method.Name}
                        onSelect={() => console.log(method.Name)}
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
