import { api } from "misskey-js";
import { ENVS } from "./env.ts";

export const misskeyApi = new api.APIClient({
  origin: ENVS.MISSKEY_ORIGIN,
  credential: ENVS.MISSKEY_CREDENTIAL,
});
