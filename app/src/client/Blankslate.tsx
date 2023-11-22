import { Box } from "@primer/react";
import { Blankslate as PrimerBlankslate } from "@primer/react/drafts";

export function Blankslate() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <PrimerBlankslate>
        <PrimerBlankslate.Heading>Hello</PrimerBlankslate.Heading>
        <PrimerBlankslate.PrimaryAction href="/bootstrap">Bootstrap</PrimerBlankslate.PrimaryAction>
      </PrimerBlankslate>
    </Box>
  );
}
