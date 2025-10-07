import { custom } from "~/custom";
import { issue } from "~/error";
import type { Schema } from "~/schema";

// eslint-disable-next-line prettier/prettier
export function record<T>(schema: Schema<T>, message?: string): Schema<Record<string, T>> {
  return custom((payload, delegate) => {
    if (typeof payload !== "object" || payload === null) {
      return delegate(issue(message ?? "Invalid record"));
    }

    return Object.keys(payload).reduce(
      (value, property) => {
        const result = schema.handle(value[property as keyof typeof payload]);

        if (result.success) {
          // @ts-expect-error - Type T is generic and can only be indexed for reading.
          value[property] = result.data as T[string];
        } else {
          for (const item of result.issues) {
            delegate({ ...item, path: [property, ...item.path] });
          }
        }

        return value;
      },
      payload as Record<string, T>
    );
  });
}
