import { custom } from "~/custom";
import { issue } from "~/error";
import type { Schema } from "~/schema";

export type Callback = (...args: unknown[]) => unknown;

export function callback<T extends Callback>(message?: string): Schema<T> {
  return custom((payload, delegate) => {
    if (typeof payload === "function") {
      return payload as T;
    }

    delegate(issue(message ?? "Invalid function"));
  });
}
