import type { Schema } from "~/types";

export declare interface NumberSchema extends Schema<number> {
  int(): Schema<number>;
}

export function number(): NumberSchema {
  return {
    int(): Schema<number> {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this;

      return {
        parse(value: unknown): number {
          if (Number.isInteger(self.parse(value))) {
            return value as number;
          }

          throw new Error("Invalid number");
        },
      };
    },

    parse(value: unknown) {
      if (typeof value === "number") {
        return value;
      }

      throw new Error("Invalid number");
    },
  };
}
