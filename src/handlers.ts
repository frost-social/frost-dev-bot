import { EmitterWebhookEventName, Webhooks } from "@octokit/webhooks";
import { HandlerFunction } from "@octokit/webhooks/types";
import { misskeyApi } from "./misskey.ts";
import { displayUserNameOf } from "./util/message/display.ts";
import { linked, plained, quoted } from "./util/misskey/mfm.ts";
import { imkt, linesOf } from "./util/text.ts";

// Handlers

interface HandlerDefinition<E extends EmitterWebhookEventName> {
  event: E | E[];
  handler: HandlerFunction<E>;
}
const handlers: readonly HandlerDefinition<
  // deno-lint-ignore no-explicit-any
  any
>[] = [
  {
    // Issueが生やされたときに
    event: "issues.opened",
    handler: async ({ payload: unsafe }) => {
      const message = (() => {
        // NOTE: 下書きの可能性もあるが下書き解除のイベントを受けれなそうなので下書きIssueであっても投稿する
        const title = plained(unsafe.issue.title);
        const url = unsafe.issue.html_url;
        const bodyImkt = unsafe.issue.body !== null
          ? plained(imkt(unsafe.issue.body))
          : null;
        return linesOf(
          "[New Issue❗]",
          `${linked(title, url)}`,
        ) + (bodyImkt !== null ? `\n${quoted(bodyImkt)}` : "");
      })();
      await misskeyApi.request("notes/create", {
        text: message,
        visibility: "home",
      });
    },
  } satisfies HandlerDefinition<"issues.opened">,
  {
    // プルリクが生やされたときに
    event: "pull_request.opened",
    handler: async ({ payload: unsafe }) => {
      // 下書きは対象外
      if (unsafe.pull_request.draft) return;

      const message = (() => {
        const title = plained(unsafe.pull_request.title);
        const url = unsafe.pull_request.html_url;
        const userName = displayUserNameOf(unsafe.pull_request.user, {
          link: null,
        });
        return linesOf(
          "[New PR🚀]",
          `${linked(title, url)}`,
          `by ${userName}さん`,
        );
      })();
      await misskeyApi.request("notes/create", {
        text: message,
        visibility: "home",
      });
    },
  } satisfies HandlerDefinition<"pull_request.opened">,
  {
    // プルリクの下書きが解除されたときに
    event: "pull_request.ready_for_review",
    handler: async ({ payload: unsafe }) => {
      const message = (() => {
        const title = plained(unsafe.pull_request.title);
        const url = unsafe.pull_request.html_url;
        return linesOf(
          "[Ready for Review🏁]",
          `${linked(title, url)}`,
        );
      })();
      await misskeyApi.request("notes/create", {
        text: message,
        visibility: "home",
      });
    },
  } satisfies HandlerDefinition<"pull_request.ready_for_review">,
  {
    // プルリクがマージされたときに
    event: "pull_request.closed",
    handler: async ({ payload: unsafe }) => {
      // 非マージのCloseは対象外
      if (!unsafe.pull_request.merged) return;

      const message = (() => {
        const title = plained(unsafe.pull_request.title);
        const url = unsafe.pull_request.html_url;
        const userName = displayUserNameOf(unsafe.pull_request.user, {
          link: null,
        });
        return linesOf(
          "[PR Merged🎉]",
          `${linked(title, url)}`,
          `Implemented by ${userName}さん`,
          // TODO: `Reviewed by: レビュアー1さん, レビュアー2さん`, レビュアーの名前はREST APIとかでしか取れないっぽいのでやる気が出たらやる
        );
      })();
      await misskeyApi.request("notes/create", {
        text: message,
        visibility: "home",
      });
    },
  } satisfies HandlerDefinition<"pull_request.closed">,
  {
    // プルリクがClose(非マージ)されたときに
    event: "pull_request.closed",
    handler: async ({ payload: unsafe }) => {
      // マージは対象外
      if (unsafe.pull_request.merged) return;

      const message = (() => {
        const title = plained(unsafe.pull_request.title);
        const url = unsafe.pull_request.html_url;
        return linesOf(
          "[PR Closed❌]",
          `${linked(title, url)}`,
        );
      })();
      await misskeyApi.request("notes/create", {
        text: message,
        visibility: "home",
      });
    },
  } satisfies HandlerDefinition<"pull_request.closed">,
  {
    // 星をもらえたときに
    event: "star.created",
    handler: async ({ payload: unsafe }) => {
      const message = (() => {
        const userName = displayUserNameOf(unsafe.sender);
        return linesOf(
          "[Get Starred🌟]",
          `${userName}さんから星をもらいました！`,
        );
      })();
      await misskeyApi.request("notes/create", {
        text: message,
        visibility: "home",
      });
    },
  } satisfies HandlerDefinition<"star.created">,
];

// API

export const registerHandlers = (() => {
  // Utilities
  const registerAndGetUnregister = <E extends EmitterWebhookEventName>(
    event: E | E[],
    callback: HandlerFunction<E>,
    webhooks: Webhooks,
  ) => {
    webhooks.on(event, callback);
    return () => webhooks.removeListener(event, callback);
  };

  // Implement
  /**
   * @returns Unregister
   */
  return <TTransformed>(
    webhooks: Webhooks<TTransformed>,
  ) => {
    // Register
    const unregisters = handlers.map(({ event, handler }) =>
      registerAndGetUnregister(event, handler, webhooks)
    );

    return () => {
      // Unregister
      for (const unregister of unregisters) {
        unregister();
      }
    };
  };
})();
