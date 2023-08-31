export type Model = {
  services: Array<Service>;
};

export type Service = {
  name: string;
  methods: Array<Method>;
};

export type Method = {
  name: string;
  code: string;
};
