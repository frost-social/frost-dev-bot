import { createWebMiddleware } from "@octokit/webhooks";
import { webhooks } from "./webhooks.ts";

const webhooksMiddleware = createWebMiddleware(webhooks, {
  path: "/webhooks",
});
Deno.serve(webhooksMiddleware);
