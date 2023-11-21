import { Blankslate as PrimerBlankslate } from "@primer/react/drafts";

export function Blankslate() {
  return (
    <PrimerBlankslate>
      <PrimerBlankslate.Heading>Hello</PrimerBlankslate.Heading>
      <PrimerBlankslate.PrimaryAction href="#">Create the first page</PrimerBlankslate.PrimaryAction>
    </PrimerBlankslate>
  );
}
