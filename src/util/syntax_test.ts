import { assertEquals } from "@std/assert/equals";
import { assertThrows } from "@std/assert/throws";
import { throws } from "./syntax.ts";

// throws()

Deno.test("throws(): Throws the given error", () => {
  const error = new Error("expectedError");

  const thrown = assertThrows(() => throws(error));
  assertEquals(thrown, error);
});
