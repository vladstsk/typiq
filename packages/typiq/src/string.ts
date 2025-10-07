import { custom } from "~/custom";
import { issue } from "~/error";
import type { Schema } from "~/schema";

export function string(message?: string): Schema<string> {
  return custom((payload, delegate) => {
    if (payload instanceof String) {
      payload = payload.valueOf();
    }

    if (typeof payload === "string") {
      return payload;
    }

    delegate(issue(message ?? "Invalid string"));
  });
}
