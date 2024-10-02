import { expect, test } from "vitest";
import { formatAndColorizeJson } from "./json";

test("formatAndColorizeJson", () => {
  expect(formatAndColorizeJson("{ a: 1 }")).toBe("");
});
