import { envVarOf } from "../src/util/env.ts";

// Arguments

const ENVS = {
  DENO_PROJECT: envVarOf("DENO_PROJECT").asRequired,
} as const;

const ARGS = {
  prod: Deno.args.includes("--prod"),
} as const;

// Deployment

const deploy = async () => {
  const command = new Deno.Command("deployctl", {
    args: [
      "deploy",
      `--project=${ENVS.DENO_PROJECT}`,
      ...ARGS.prod ? ["--prod"] : [],
    ],
  });

  const { stdout, stderr, success, code } = await command.output();

  const decodeText = (() => {
    const decoder = new TextDecoder();
    return (buffer: BufferSource) => decoder.decode(buffer);
  })();
  console.log(decodeText(stdout));
  console.error(decodeText(stderr));

  if (!success) throw new Error(`Failed with error code: ${code}`);
};
await deploy();
