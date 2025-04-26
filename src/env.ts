import { envVarOf } from "./util/env.ts";

export const ENVS = {
  GITHUB_WEBHOOKS_SECRET_KEY: envVarOf("GITHUB_WEBHOOKS_SECRET_KEY").asRequired,
  MISSKEY_ORIGIN: envVarOf("MISSKEY_ORIGIN").asRequired,
  MISSKEY_CREDENTIAL: envVarOf("MISSKEY_CREDENTIAL").asRequired,
} as const;
