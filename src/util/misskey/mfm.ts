// Utilities

/**
 * {@link text}が空文字列でない場合に{@link text}を{@link mapper}関数で変換したものを返す
 */
const mapNonEmpty = <R>(text: string, mapper: (nonEmptyText: string) => R) =>
  text ? mapper(text) : text;

// API

/**
 * @returns `"<plain>text</plain>"`
 */
export const plained = (text: string) =>
  mapNonEmpty(text, (text) => `<plain>${text}</plain>`);

/**
 * @returns `>text`
 */
export const quoted = (text: string) =>
  mapNonEmpty(text, (text) => `>${text.replaceAll("\n", "\n>")}`);

/**
 * @returns `"[text](url)"`
 */
export const linked = (
  text: string,
  url: string,
  {
    withPreview = true,
  } = {},
) => `${withPreview ? "" : "?"}[${text}](${url})`;
