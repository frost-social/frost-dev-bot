import { assertEquals } from "@std/assert/equals";
import { linked, plained, quoted } from "./mfm.ts";

// plained()

Deno.test('plained(): Wraps text with "<plain>"', () => {
  const rawText = "honi";

  const ret = plained(rawText);

  assertEquals(ret, `<plain>${rawText}</plain>`);
});

Deno.test('plained(): Wraps multiline text with "<plain>" (line break included)', () => {
  const rawText = "honi\nhoge";

  const ret = plained(rawText);

  assertEquals(ret, `<plain>${rawText}</plain>`);
});

Deno.test("plained(): Returns empty text as-is", () => {
  const rawText = "";

  const ret = plained(rawText);

  assertEquals(ret, "");
});

// quoted()

Deno.test('quoted(): Adds ">" prefix to single line', () => {
  const text = "honi";

  const ret = quoted(text);

  assertEquals(ret, ">honi");
});

Deno.test('quoted(): Adds ">" prefix to each line', () => {
  const text = "honi\nhoge";

  const ret = quoted(text);

  assertEquals(ret, ">honi\n>hoge");
});

Deno.test("quoted(): Returns empty string for empty text", () => {
  const text = "";

  const ret = quoted(text);

  assertEquals(ret, "");
});

// linked()

Deno.test("linked(): Returns link text (w/ preview) when default", () => {
  const text = "honi";
  const url = "https://example.com/";

  const ret = linked(text, url);

  assertEquals(ret, `[${text}](${url})`);
});

Deno.test("linked(): Returns link text (w/ preview) when { withPreview: true }", () => {
  const text = "honi";
  const url = "https://example.com/";

  const ret = linked(text, url, {
    withPreview: true,
  });

  assertEquals(ret, `[${text}](${url})`);
});

Deno.test("linked(): Returns link text (w/o preview) when { withPreview: false }", () => {
  const text = "honi";
  const url = "https://example.com/";

  const ret = linked(text, url, {
    withPreview: false,
  });

  assertEquals(ret, `?[${text}](${url})`);
});
