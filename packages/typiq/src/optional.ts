import { custom } from "~/custom";
import type { Schema } from "~/schema";

export function optional<T>(schema: Schema<T>): Schema<T | null> {
  return custom((payload, delegate) => {
    if (payload === null || payload === undefined) {
      return null;
    }

    const result = schema.handle(payload);

    if (result.success) {
      return result.data;
    }

    for (const item of result.issues) {
      delegate(item);
    }
  });
}
