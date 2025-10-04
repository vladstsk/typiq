import type { Schema } from "~/types";

export function and<T>(...schemas: Schema<T>[]): Schema<T> {
  return {
    parse(value: unknown) {
      return schemas.reduce((value, schema) => schema.parse(value), value) as T;
    },
  };
}
