export const model = { services: [{ name: "Quirks", methods: [{ name: "GetAuthentication", code: "Quirks.GetAuthentication(\"argument\");\n" }, { name: "Map", code: "Quirks.Map(\"argument\");\n" }, { name: "MethodWithAReallyLongNameGmthggupcbmnphflnnvu", code: "Quirks.MethodWithAReallyLongNameGmthggupcbmnphflnnvu(\"argument\");\n" }, { name: "Panic", code: "Quirks.Panic(\"argument\");\n" }, { name: "Repeated", code: "Quirks.Repeated(\"argument\");\n" }, { name: "Types", code: "Quirks.Types(\"argument\");\n" }], proxy: { GetAuthentication: () => (window as any).GOUT("GetAuthentication"), Map: () => (window as any).GOUT("Map"), MethodWithAReallyLongNameGmthggupcbmnphflnnvu: () => (window as any).GOUT("MethodWithAReallyLongNameGmthggupcbmnphflnnvu"), Panic: () => (window as any).GOUT("Panic"), Repeated: () => (window as any).GOUT("Repeated"), Types: () => (window as any).GOUT("Types") }, extraLib: "const Quirks = { GetAuthentication: () => (window as any).GOUT(\"GetAuthentication\"), Map: () => (window as any).GOUT(\"Map\"), MethodWithAReallyLongNameGmthggupcbmnphflnnvu: () => (window as any).GOUT(\"MethodWithAReallyLongNameGmthggupcbmnphflnnvu\"), Panic: () => (window as any).GOUT(\"Panic\"), Repeated: () => (window as any).GOUT(\"Repeated\"), Types: () => (window as any).GOUT(\"Types\") };\n" }, { name: "SearchService", methods: [{ name: "Search", code: "SearchService.Search(\"argument\");\n" }, { name: "Index", code: "SearchService.Index(\"argument\");\n" }], proxy: { Search: () => (window as any).GOUT("Search"), Index: () => (window as any).GOUT("Index") }, extraLib: "const SearchService = { Search: () => (window as any).GOUT(\"Search\"), Index: () => (window as any).GOUT(\"Index\") };\n" }] };
