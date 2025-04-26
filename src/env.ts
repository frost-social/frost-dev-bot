import { envVarOf } from "./util/env.ts";

export const ENVS = {
  GITHUB_WEBHOOKS_SECRET_KEY: envVarOf("GITHUB_WEBHOOKS_SECRET_KEY").asRequired,
} as const;
