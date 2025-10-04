import type { Schema } from "~/types";

export function array<T>(schema: Schema<T>): Schema<T[]> {
  return {
    parse(value: unknown) {
      if (Array.isArray(value)) {
        return value.map(schema.parse);
      }

      throw new Error("Invalid array");
    },
  };
}
