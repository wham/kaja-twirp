import { Box } from "@primer/react";
import { Blankslate as PrimerBlankslate } from "@primer/react/drafts";
import { useEffect } from "react";
import { FetchRPC } from "twirp-ts";
import { ApiClientJSON } from "../shared/api.twirp";

export function Blankslate() {
  useEffect(() => {
    const client = new ApiClientJSON(
      FetchRPC({
        baseUrl: "http://localhost:3000/api",
      }),
    );

    client.Bootstrap({}).then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <PrimerBlankslate>
        <PrimerBlankslate.Heading>Hello</PrimerBlankslate.Heading>
        <PrimerBlankslate.PrimaryAction href="/bootstrap">Bootstrap</PrimerBlankslate.PrimaryAction>
      </PrimerBlankslate>
    </Box>
  );
}
