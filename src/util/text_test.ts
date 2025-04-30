import { assertEquals } from "@std/assert/equals";
import { imkt, linesOf } from "./text.ts";

// linesOf()

Deno.test("linesOf(): Joins 2 lines with LF (\\n)", () => {
  const lines = ["honi", "hoge"];

  const ret = linesOf(...lines);

  assertEquals(ret, "honi\nhoge");
});

Deno.test("linesOf(): Returns single line as-is", () => {
  const lines = ["honi"];

  const ret = linesOf(...lines);

  assertEquals(ret, "honi");
});

Deno.test("linesOf(): Returns empty string for no lines", () => {
  const lines: string[] = [];

  const ret = linesOf(...lines);

  assertEquals(ret, "");
});

// imkt()

Deno.test("imkt(): Truncates to 3 lines with ellipses if over 3 lines", () => {
  const text = "honi\nhoge\nfuga\npiyo";

  const ret = imkt(text);

  assertEquals(ret, "honi\nhoge\nfuga……");
});

Deno.test("imkt(): Returns text as-is if less than 3 lines", () => {
  const text = "honi";

  const ret = imkt(text);

  assertEquals(ret, "honi");
});

Deno.test("imkt(): Returns text as-is if exactly 3 lines", () => {
  const text = "honi\nhoge\nfuga";

  const ret = imkt(text);

  assertEquals(ret, "honi\nhoge\nfuga");
});

Deno.test("imkt(): Blank lines in the string are stripped", () => {
  const text = "\nhoni\nhoge\n\nfuga\n";

  const ret = imkt(text);

  assertEquals(ret, "honi\nhoge\nfuga");
});
