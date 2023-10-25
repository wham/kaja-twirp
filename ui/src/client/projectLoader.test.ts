import { expect, test } from "vitest";
import { extractClientName } from "./projectLoader";

test("extractClientName", () => {
  expect(extractClientName("IQuirksClient")).toBe("Quirks");
  expect(extractClientName("QuirksClient")).toBe(undefined);
  expect(extractClientName("IQuirks")).toBe(undefined);
  expect(extractClientName("IQuirksClientX")).toBe(undefined);
  expect(extractClientName("IClient")).toBe(undefined);
  expect(extractClientName("")).toBe(undefined);
});
