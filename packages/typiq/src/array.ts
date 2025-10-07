import { custom } from "~/custom";
import { issue } from "~/error";
import type { Schema } from "~/schema";

export function array<T>(schema: Schema<T>, message?: string): Schema<T[]> {
  return custom((payload, delegate) => {
    if (!Array.isArray(payload)) {
      return delegate(issue(message ?? "Invalid array"));
    }

    return payload.map((value, i) => {
      const result = schema.handle(value);

      if (!result.success) {
        for (const item of result.issues) {
          delegate({ ...item, path: [i, ...item.path] });
        }
      }

      return value;
    });
  });
}
