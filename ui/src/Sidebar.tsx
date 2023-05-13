import { Model } from "./Model";

type SidebarProps = {
  model: Model;
};

export function Sidebar({ model }: SidebarProps) {
  return (
    <div>
      {model.Files.map((file) => {
        return file.Services.map((service) => {
          return (
            <>
              <div>{service.Name}</div>
              {service.Methods.map((method) => {
                return <div> - {method.Name}</div>;
              })}
            </>
          );
        });
      })}
    </div>
  );
}
