export type Model = {
  services: Array<Service>;
  extraLibs: Array<string>;
};

export type Service = {
  name: string;
  methods: Array<Method>;
};

export type Method = {
  name: string;
  code: string;
};
