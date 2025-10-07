import { custom } from "~/custom";
import { issue } from "~/error";
import type { Schema } from "~/schema";

export type SchemaShape<T> = {
  [K in keyof T]: Schema<T[K]>;
};

// eslint-disable-next-line prettier/prettier
export function object<T extends Record<string, unknown>>(shape: SchemaShape<T>, message?: string): Schema<T> {
  return custom((payload, delegate) => {
    if (typeof payload !== "object" || payload === null) {
      return delegate(issue(message ?? "Invalid object"));
    }

    return Object.keys(shape).reduce((value, property) => {
      const result = shape[property as keyof typeof shape].handle(
        value[property as keyof typeof payload]
      );

      if (result.success) {
        // @ts-expect-error - Type T is generic and can only be indexed for reading.
        value[property] = result.data as T[string];
      } else {
        for (const item of result.issues) {
          delegate({ ...item, path: [property, ...item.path] });
        }
      }

      return value;
    }, payload as T);
  });
}
