/**
 * {@link lines}.join("\n")のショートハンド
 * @param lines 行の配列
 * @returns _{@link lines}を`"\n"`で結合した文字列
 */
export const linesOf = (...lines: readonly string[]) => lines.join("\n");

/**
 * 今北{@link maxLines}業
 * @param [maxLines=3] 最大行数
 */
export const imkt = (text: string, maxLines = 3) => {
  const squashedLines = text
    .split("\n")
    // 空行を削除
    .filter((line) => line);
  return squashedLines.length > 3
    // 3行超の場合
    ? `${linesOf(...squashedLines.slice(0, maxLines))}……`
    // 3行以下の場合
    : linesOf(...squashedLines);
};
