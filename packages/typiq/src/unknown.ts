import { custom } from "~/custom";
import type { Schema } from "~/schema";

export function unknown(): Schema<unknown> {
  return custom((payload) => payload);
}
