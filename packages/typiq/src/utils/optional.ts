import type { Schema } from "~/types";

export declare interface OptionalSchema<T> extends Schema<T | null> {
  default(value: T): Schema<T>;
}

export function optional<T>(schema: Schema<T>): OptionalSchema<T> {
  return {
    default(def: T) {
      return {
        parse(value: unknown) {
          if (value === undefined || value === null) {
            return def;
          }

          return schema.parse(value);
        },
      };
    },

    parse(value: unknown) {
      if (value === undefined || value === null) {
        return null;
      }

      return schema.parse(value);
    },
  };
}
