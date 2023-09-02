export type Model = {
  services: Array<Service>;
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
