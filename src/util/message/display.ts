import { linked, plained } from "../misskey/mfm.ts";

/**
 * `"userName (@userID)"`形式のリンク付きMFM文字列を返す
 *
 * `name`が与えられなかった場合は`"@userID"`形式のリンク付きMFM文字列を返す
 */
export const displayUserNameOf = (
  // Sender
  unsafe: {
    name?: string | null;
    login: string;
    html_url: string;
  },
  // Opts
  {
    withName = true,
    link = {
      withPreview: true,
    },
  }: {
    withName?: boolean;
    link?: null | {
      withPreview?: boolean;
    };
  } = {},
): string => {
  const atID = plained(`@${unsafe.login}`);
  const nameWithID = (() => {
    if (withName) {
      const name = unsafe.name != null ? plained(unsafe.name) : null;
      return name !== null ? `${name} (${atID})` : atID;
    } else {
      return atID;
    }
  })();

  if (link) {
    return linked(nameWithID, unsafe.html_url, {
      withPreview: link.withPreview ?? true,
    });
  }
  return nameWithID;
};
