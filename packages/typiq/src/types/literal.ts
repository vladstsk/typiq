import type { Schema } from "~/types";

export function literal<T extends bigint | boolean | number | object | string | symbol | null>(value: T): Schema<T> {
  return {
    parse(payload: unknown): T {
      if (payload === value) {
        return value;
      }

      throw new Error("Invalid literal");
    },
  };
}
