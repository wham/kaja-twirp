import { TwirpFetchTransport } from "@protobuf-ts/twirp-transport";
import { QuirksClient } from "./quirks.client";
import { SearchServiceClient } from "./search-service.client";
export const model = {
  services: [
    {
      name: "Quirks",
      methods: [
        { name: "GetAuthentication", code: "Quirks.GetAuthentication();\n" },
        { name: "Map", code: "Quirks.Map();\n" },
        {
          name: "MethodWithAReallyLongNameGmthggupcbmnphflnnvu",
          code: "Quirks.MethodWithAReallyLongNameGmthggupcbmnphflnnvu();\n",
        },
        { name: "Panic", code: "Quirks.Panic();\n" },
        { name: "Repeated", code: "Quirks.Repeated();\n" },
        { name: "Types", code: "Quirks.Types();\n" },
      ],
      proxy: {
        GetAuthentication: async () => {
          var transport = new TwirpFetchTransport({
            baseUrl: "http://localhost:3000/twirp",
          });
          var client = new QuirksClient(transport);
          var { response } = await client.getAuthentication({} as any);
          (window as any).GOUT(response);
          return response;
        },
        Map: async () => {
          var transport = new TwirpFetchTransport({
            baseUrl: "http://localhost:3000/twirp",
          });
          var client = new QuirksClient(transport);
          var { response } = await client.map({} as any);
          (window as any).GOUT(response);
          return response;
        },
        MethodWithAReallyLongNameGmthggupcbmnphflnnvu: async () => {
          var transport = new TwirpFetchTransport({
            baseUrl: "http://localhost:3000/twirp",
          });
          var client = new QuirksClient(transport);
          var { response } =
            await client.methodWithAReallyLongNameGmthggupcbmnphflnnvu(
              {} as any
            );
          (window as any).GOUT(response);
          return response;
        },
        Panic: async () => {
          var transport = new TwirpFetchTransport({
            baseUrl: "http://localhost:3000/twirp",
          });
          var client = new QuirksClient(transport);
          var { response } = await client.panic({} as any);
          (window as any).GOUT(response);
          return response;
        },
        Repeated: async () => {
          var transport = new TwirpFetchTransport({
            baseUrl: "http://localhost:3000/twirp",
          });
          var client = new QuirksClient(transport);
          var { response } = await client.repeated({} as any);
          (window as any).GOUT(response);
          return response;
        },
        Types: async () => {
          var transport = new TwirpFetchTransport({
            baseUrl: "http://localhost:3000/twirp",
          });
          var client = new QuirksClient(transport);
          var { response } = await client.types({} as any);
          (window as any).GOUT(response);
          return response;
        },
      },
      extraLib:
        'const Quirks = { GetAuthentication: async () => { var transport = new TwirpFetchTransport({ baseUrl: "http://localhost:3000/twirp" }); var client = new QuirksClient(transport); var { response } = await client.getAuthentication(({} as any)); (window as any).GOUT(response); return response; }, Map: async () => { var transport = new TwirpFetchTransport({ baseUrl: "http://localhost:3000/twirp" }); var client = new QuirksClient(transport); var { response } = await client.map(({} as any)); (window as any).GOUT(response); return response; }, MethodWithAReallyLongNameGmthggupcbmnphflnnvu: async () => { var transport = new TwirpFetchTransport({ baseUrl: "http://localhost:3000/twirp" }); var client = new QuirksClient(transport); var { response } = await client.methodWithAReallyLongNameGmthggupcbmnphflnnvu(({} as any)); (window as any).GOUT(response); return response; }, Panic: async () => { var transport = new TwirpFetchTransport({ baseUrl: "http://localhost:3000/twirp" }); var client = new QuirksClient(transport); var { response } = await client.panic(({} as any)); (window as any).GOUT(response); return response; }, Repeated: async () => { var transport = new TwirpFetchTransport({ baseUrl: "http://localhost:3000/twirp" }); var client = new QuirksClient(transport); var { response } = await client.repeated(({} as any)); (window as any).GOUT(response); return response; }, Types: async () => { var transport = new TwirpFetchTransport({ baseUrl: "http://localhost:3000/twirp" }); var client = new QuirksClient(transport); var { response } = await client.types(({} as any)); (window as any).GOUT(response); return response; } };\n',
    },
    {
      name: "SearchService",
      methods: [
        { name: "Search", code: "SearchService.Search();\n" },
        { name: "Index", code: "SearchService.Index();\n" },
      ],
      proxy: {
        Search: async () => {
          var transport = new TwirpFetchTransport({
            baseUrl: "http://localhost:3000/twirp",
          });
          var client = new SearchServiceClient(transport);
          var { response } = await client.search({} as any);
          (window as any).GOUT(response);
          return response;
        },
        Index: async () => {
          var transport = new TwirpFetchTransport({
            baseUrl: "http://localhost:3000/twirp",
          });
          var client = new SearchServiceClient(transport);
          var { response } = await client.index({} as any);
          (window as any).GOUT(response);
          return response;
        },
      },
      extraLib:
        'const SearchService = { Search: async () => { var transport = new TwirpFetchTransport({ baseUrl: "http://localhost:3000/twirp" }); var client = new SearchServiceClient(transport); var { response } = await client.search(({} as any)); (window as any).GOUT(response); return response; }, Index: async () => { var transport = new TwirpFetchTransport({ baseUrl: "http://localhost:3000/twirp" }); var client = new SearchServiceClient(transport); var { response } = await client.index(({} as any)); (window as any).GOUT(response); return response; } };\n',
    },
  ],
};
