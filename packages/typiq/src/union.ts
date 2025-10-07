import { custom } from "~/custom";
import { issue } from "~/error";
import type { Schema } from "~/schema";

export type UnionSchemas<T extends unknown[]> = {
  [K in keyof T]: Schema<T[K]>;
};

// eslint-disable-next-line prettier/prettier
export function union<T extends unknown[]>(schemas: UnionSchemas<T>, message?: string): Schema<T[number]> {
  return custom((payload, delegate) => {
    for (const schema of schemas) {
      const result = schema.handle(payload);

      if (result.success) {
        return result.data;
      }
    }

    delegate(issue(message ?? "Invalid union"));
  });
}
