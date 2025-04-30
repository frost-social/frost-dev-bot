import { Webhooks } from "@octokit/webhooks";
import { ENVS } from "./env.ts";

export const webhooks = new Webhooks({
  secret: ENVS.GITHUB_WEBHOOKS_SECRET_KEY,
});
