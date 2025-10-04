import type { Schema } from "~/types";

type Union<T> = T extends Schema<infer U>[] ? U : never;

export function or<T extends Schema<unknown>[]>(...schemas: T): Schema<Union<T>> {
  return {
    parse(value: unknown) {
      for (const schema of schemas) {
        try {
          return schema.parse(value) as Union<T>;
        } catch {
          //
        }
      }

      throw new Error("Invalid union");
    },
  };
}
