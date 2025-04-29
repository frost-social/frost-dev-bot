import { assertEquals } from "@std/assert/equals";
import { assertThrows } from "@std/assert/throws";
import { envVarOf } from "./env.ts";

// envVarOf().orNull

Deno.test("envVarOf().orNull: Returns value if present", () => {
  const key = "key";
  try {
    const value = "present";

    Deno.env.set(key, value);
    const ret = envVarOf(key).orNull;

    assertEquals(ret, value);
  } finally {
    Deno.env.delete(key);
  }
});

Deno.test("envVarOf().orNull: Returns null if absent", () => {
  const ret = envVarOf("notExist").orNull;

  assertEquals(ret, null);
});

// envVarOf().asAquired

Deno.test("envVarOf().asRequired: Returns value if present", () => {
  const key = "key";
  try {
    const value = "present";

    Deno.env.set(key, value);
    const ret = envVarOf(key).asRequired;

    assertEquals(ret, value);
  } finally {
    Deno.env.delete(key);
  }
});

Deno.test("envVarOf().asRequired: Throws if absent", () => {
  assertThrows(() => {
    envVarOf("notExist").asRequired;
  });
});
