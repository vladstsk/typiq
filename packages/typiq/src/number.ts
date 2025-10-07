import { custom } from "~/custom";
import { issue } from "~/error";
import type { Schema } from "~/schema";

export function number(message?: string): Schema<number> {
  return custom((payload, delegate) => {
    if (payload instanceof Number) {
      payload = payload.valueOf();
    }

    if (typeof payload === "number") {
      return payload;
    }

    delegate(issue(message ?? "Invalid number"));
  });
}
