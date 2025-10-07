import { custom } from "~/custom";
import { issue } from "~/error";
import type { Schema } from "~/schema";

export function symbol(message?: string): Schema<symbol> {
  return custom((payload, delegate) => {
    if (typeof payload === "symbol") {
      return payload;
    }

    delegate(issue(message ?? "Invalid symbol"));
  });
}
