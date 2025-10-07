import { custom } from "~/custom";
import { issue } from "~/error";
import type { Schema } from "~/schema";

export type TupleSchemas<T extends unknown[]> = {
  [K in keyof T]: Schema<T[K]>;
};

// eslint-disable-next-line prettier/prettier
export function tuple<T extends unknown[]>(schemas: TupleSchemas<T>, message?: string): Schema<[...T]> {
  return custom((payload, delegate) => {
    if (!Array.isArray(payload)) {
      return delegate(issue(message ?? "Invalid tuple"));
    }

    return schemas.map((schema, i) => {
      const result = schema.handle(payload[i]);

      if (!result.success) {
        for (const item of result.issues) {
          delegate({ ...item, path: [i, ...item.path] });
        }
      }

      return result.data;
    }) as [...T];
  });
}
