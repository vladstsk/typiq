import type { Schema } from "~/types";

export declare interface StringSchema extends Schema<string> {
  enum<T extends string>(...values: T[]): Schema<T>;
}

export function string(): StringSchema {
  return {
    enum<T extends string>(this: StringSchema, ...values: T[]): Schema<T> {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this;

      return {
        parse(value: unknown): T {
          if (values.includes(self.parse(value) as T)) {
            return value as T;
          }

          throw new Error("Invalid string");
        },
      };
    },

    parse(value: unknown): string {
      if (typeof value === "string") {
        return value;
      }

      throw new Error("Invalid string");
    },
  };
}
