import ts from "typescript";

export type Project = {
  services: Array<Service>;
  extraLibs: Array<ExtraLib>;
  sourceFiles: Array<ts.SourceFile>;
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

export type Endpoint = {
  service: Service;
  method: Method;
};

export type InterfaceMap = { [key: string]: { interfaceDeclaration: ts.InterfaceDeclaration; sourceFile: ts.SourceFile } };

export function methodId(service: Service, method: Method): string {
  return `${service.name}.${method.name}`;
}

export function defaultEndpoint(services: Service[]): Endpoint | undefined {
  for (const service of services) {
    for (const method of service.methods) {
      return { service, method };
    }
  }
  return undefined;
}
