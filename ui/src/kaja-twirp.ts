export const model = {
  services: [
    {
      name: "Quirks",
      methods: [
        {
          name: "GetAuthentication",
          code: 'Quirks.GetAuthentication("argument");\n',
        },
        { name: "Map", code: 'Quirks.Map("argument");\n' },
        {
          name: "MethodWithAReallyLongNameGmthggupcbmnphflnnvu",
          code: 'Quirks.MethodWithAReallyLongNameGmthggupcbmnphflnnvu("argument");\n',
        },
        { name: "Panic", code: 'Quirks.Panic("argument");\n' },
        { name: "Repeated", code: 'Quirks.Repeated("argument");\n' },
        { name: "Types", code: 'Quirks.Types("argument");\n' },
      ],
      proxy: {
        GetAuthentication: (hello) => 2,
        Map: (hello) => 2,
        MethodWithAReallyLongNameGmthggupcbmnphflnnvu: (hello) => 2,
        Panic: (hello) => 2,
        Repeated: (hello) => 2,
        Types: (hello) => 2,
      },
      extraLib:
        "const Quirks = { GetAuthentication: hello => 2, Map: hello => 2, MethodWithAReallyLongNameGmthggupcbmnphflnnvu: hello => 2, Panic: hello => 2, Repeated: hello => 2, Types: hello => 2 };\n",
    },
    {
      name: "SearchService",
      methods: [
        { name: "Search", code: 'SearchService.Search("argument");\n' },
        { name: "Index", code: 'SearchService.Index("argument");\n' },
      ],
      proxy: { Search: (hello) => 2, Index: (hello) => 2 },
      extraLib:
        "const SearchService = { Search: hello => 2, Index: hello => 2 };\n",
    },
  ],
};
