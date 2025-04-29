import "@std/dotenv/load";
import { Optional } from "./optional.ts";
import { throws } from "./syntax.ts";

export const envVarOf = (() => {
  class Variable extends Optional<string> {
    readonly key;

    constructor(key: string) {
      const value = Deno.env.get(key);
      super(value ?? Optional.ABSENT);

      this.key = key;
    }

    get orNull() {
      return this.getOr(() => null);
    }

    get asRequired() {
      return this.getOr(() =>
        throws(new Error(`Environment variable "${this.key}" is not set`))
      );
    }
  }

  return (key: string) => new Variable(key);
})();
