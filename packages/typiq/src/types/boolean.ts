import type { Schema } from "~/types";

export function boolean(message?: string): Schema<boolean> {
  return {
    parse(value: unknown) {
      if (typeof value === "boolean") {
        return value;
      }

      if (value instanceof Boolean) {
        return value.valueOf();
      }

      throw new Error(message ?? "Invalid boolean");
    },
  };
}
