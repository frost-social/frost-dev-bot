import { createWebMiddleware } from "@octokit/webhooks";
import { registerHandlers } from "./handlers.ts";
import { webhooks } from "./webhooks.ts";

registerHandlers(webhooks);
const webhooksMiddleware = createWebMiddleware(webhooks, {
  path: "/webhooks",
});
Deno.serve(webhooksMiddleware);
