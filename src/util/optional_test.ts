import { AssertionError } from "@std/assert/assertion-error";
import { assertEquals } from "@std/assert/equals";
import { Optional } from "./optional.ts";
import { throws } from "./syntax.ts";

// Constructor

Deno.test("constructor: Creates present instance", () => {
  const value = "present";

  const instance = new Optional(value);
  const unwrapped = instance.getOr(() =>
    throws(new AssertionError("Unexpected call"))
  );

  assertEquals(unwrapped, value);
});

Deno.test("constructor: Creates absent instance", () => {
  const value: typeof Optional.ABSENT = Optional.ABSENT;
  const otherValue = "other";

  const instance = new Optional<string>(value);
  const unwrapped = instance.getOr(() => otherValue);

  assertEquals(unwrapped, otherValue);
});

// of()

Deno.test("of(): Creates present instance", () => {
  const value = "present";

  const instance = Optional.of(() => value);
  const unwrapped = instance.getOr(() =>
    throws(new AssertionError("Unexpected call"))
  );

  assertEquals(unwrapped, value);
});

Deno.test("of(): Creates absent instance", () => {
  const instance = Optional.of<string>((absent) => absent);
  const otherValue = "other";
  const unwrapped = instance.getOr(() => otherValue);

  assertEquals(unwrapped, otherValue);
});

// ofNullish()

Deno.test("ofNullish(): Creates present instance from non-nullish value", () => {
  const value = "present";

  const instance = Optional.ofNullish(value);
  const unwrapped = instance.getOr(() =>
    throws(new AssertionError("Unexpected call"))
  );

  assertEquals(unwrapped, value);
});

Deno.test("ofNullish(): Creates absent instance from null", () => {
  const value = null;
  const otherValue = "other";

  const instance = Optional.ofNullish<string>(value);
  const unwrapped = instance.getOr(() => otherValue);

  assertEquals(unwrapped, otherValue);
});

Deno.test("ofNullish(): Creates absent instance from undefined", () => {
  const value = undefined;
  const otherValue = "other";

  const instance = Optional.ofNullish<string>(value);
  const unwrapped = instance.getOr(() => otherValue);

  assertEquals(unwrapped, otherValue);
});

// getOr()

Deno.test("getOr(): Returns value if present", () => {
  const value = "present";

  const instance = new Optional(value);
  const unwrapped = instance.getOr(() =>
    throws(new AssertionError("Unexpected call"))
  );

  assertEquals(unwrapped, value);
});

Deno.test("getOr(): Returns other value if absent", () => {
  const value = Optional.ABSENT;
  const otherValue = "other";

  const instance = new Optional(value);
  const unwrapped = instance.getOr(() => otherValue);

  assertEquals(unwrapped, otherValue);
});

// map()

Deno.test("map(): Maps value if present", () => {
  const value = "present";

  const instance = new Optional(value);
  const mappedValue = instance
    .map((value) => value.length)
    .getOr(() => throws(new AssertionError("Unexpected call")));

  assertEquals(mappedValue, value.length);
});

Deno.test("map(): Returns other value if absent", () => {
  const value: typeof Optional.ABSENT = Optional.ABSENT;
  const otherValue = "other";

  const instance = new Optional<string>(value);
  const mappedValue = instance
    .map(() => throws(new AssertionError("Unexpected call")))
    .getOr(() => otherValue);

  assertEquals(mappedValue, otherValue);
});

// flatMap()

Deno.test("flatMap(): Maps to present child if parent is present", () => {
  const value = "presentParent";
  const childValue = "presentChild";

  const instance = new Optional(value);
  const mappedValue = instance
    .flatMap(() => new Optional(childValue))
    .getOr(() => throws(new AssertionError("Unexpected call")));

  assertEquals(mappedValue, childValue);
});

Deno.test("flatMap(): Maps to absent child if parent is present", () => {
  const value = "presentParent";
  const childValue: typeof Optional.ABSENT = Optional.ABSENT;
  const otherValue = "other";

  const instance = new Optional(value);
  const mappedValue = instance
    .flatMap(() => new Optional<string>(childValue))
    .getOr(() => otherValue);

  assertEquals(mappedValue, otherValue);
});

Deno.test("flatMap(): Returns other value if parent is absent", () => {
  const value: typeof Optional.ABSENT = Optional.ABSENT;
  const childValue = "presentChild";
  const otherValue = "other";

  const instance = new Optional<string>(value);
  const mappedValue = instance
    .flatMap(() => new Optional(childValue))
    .getOr(() => otherValue);

  assertEquals(mappedValue, otherValue);
});

Deno.test("flatMap(): Returns other value if both parent and child are absent", () => {
  const value: typeof Optional.ABSENT = Optional.ABSENT;
  const childValue: typeof Optional.ABSENT = Optional.ABSENT;
  const otherValue = "other";

  const instance = new Optional<string>(value);
  const mappedValue = instance
    .flatMap(() => new Optional<string>(childValue))
    .getOr(() => otherValue);

  assertEquals(mappedValue, otherValue);
});
