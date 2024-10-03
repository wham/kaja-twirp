import { expect, test } from "vitest";
import { stringifyAndColorize } from "./json";

test("formatAndColorize", () => {
  expect(stringifyAndColorize("hi>")).toBe(`<span style="color: #ce9178;">"hi&gt;"</span>`);
  expect(stringifyAndColorize(10)).toBe(`<span style="color: #b5cea8;">10</span>`);
  expect(stringifyAndColorize(10n)).toBe(`<span style="color: #b5cea8;">10</span>`);
  expect(stringifyAndColorize(true)).toBe(`<span style="color: #569cd6;">true</span>`);
  expect(stringifyAndColorize(null)).toBe(`<span style="color: #b5cea8;">null</span>`);
  expect(stringifyAndColorize(undefined)).toBe(`<span style="color: #b5cea8;">undefined</span>`);
  expect(stringifyAndColorize(["hi>", 10])).toBe(
    `<span style="color: #b5cea8;">[</span>, <span style="color: #ce9178;">"hi&gt;"</span>, <span style="color: #b5cea8;">10</span><span style="color: #b5cea8;">]</span>`,
  );
  expect(
    stringifyAndColorize({ string: "hi>", number: 10, boolean: true, null: null, undefined: undefined, array: [["hi>", 10]], object: { next: "level" } }),
  ).toBe(
    `<span style="color: #b5cea8;">{</span><span style="color: #d4d4d4;">"string"</span>: <span style="color: #ce9178;">"hi&gt;"</span><span style="color: #d4d4d4;">"number"</span>: <span style="color: #b5cea8;">10</span><span style="color: #d4d4d4;">"boolean"</span>: <span style="color: #569cd6;">true</span><span style="color: #d4d4d4;">"null"</span>: <span style="color: #b5cea8;">null</span><span style="color: #d4d4d4;">"undefined"</span>: <span style="color: #b5cea8;">undefined</span><span style="color: #d4d4d4;">"array"</span>: <span style="color: #b5cea8;">[</span>, <span style="color: #b5cea8;">[</span>, <span style="color: #ce9178;">"hi&gt;"</span>, <span style="color: #b5cea8;">10</span><span style="color: #b5cea8;">]</span><span style="color: #b5cea8;">]</span><span style="color: #d4d4d4;">"object"</span>: <span style="color: #b5cea8;">{</span><span style="color: #d4d4d4;">"next"</span>: <span style="color: #ce9178;">"level"</span><span style="color: #b5cea8;">}</span><span style="color: #b5cea8;">}</span>`,
  );
});
