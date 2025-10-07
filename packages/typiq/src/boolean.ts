import { custom } from "~/custom";
import { issue } from "~/error";
import type { Schema } from "~/schema";

export function boolean(message?: string): Schema<boolean> {
  return custom((payload, delegate) => {
    if (payload instanceof Boolean) {
      payload = payload.valueOf();
    }

    if (typeof payload === "boolean") {
      return payload;
    }

    delegate(issue(message ?? "Invalid boolean"));
  });
}
