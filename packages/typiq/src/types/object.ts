import type { Schema } from "~/types";

export type Shape<T> = {
  [K in keyof T]: Schema<T[K]>;
};

export function object<T>(shape: Shape<T>): Schema<T> {
  return {
    parse(value: unknown) {
      if (value && typeof value === "object") {
        for (const key in shape) {
          (value as T)[key as keyof T] = shape[key].parse(value[key as keyof object]);
        }

        return value as T;
      }

      throw new Error("Invalid object");
    },
  };
}
