export type Model = {
  services: Array<Service>;
  extraLibs: Array<ExtraLib>;
  files: Array<ProtocFile>;
};

export type Service = {
  name: string;
  methods: Array<Method>;
  proxy: any;
  extraLib: string;
};

export type Method = {
  name: string;
  code: string;
};

export type ExtraLib = {
  filePath: string;
  content: string;
};

export type ProtocFile = {
  path: string;
  content: string;
};

export function methodId(service: Service, method: Method): string {
  return `${service.name}.${method.name}`;
}
