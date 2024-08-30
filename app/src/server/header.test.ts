import { expect, test } from "vitest";
import { parseHeader } from "./header";

test("parseHeader", () => {
  expect(parseHeader("foo")).toBe(true);
});
