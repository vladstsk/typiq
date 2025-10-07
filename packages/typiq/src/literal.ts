import { custom } from "~/custom";
import { issue } from "~/error";
import type { Schema } from "~/schema";

export type Literal =
  | bigint
  | boolean
  | number
  | string
  | symbol
  | null
  | undefined;

// eslint-disable-next-line prettier/prettier
export function literal<T extends Literal>(value: T, message?: string): Schema<T> {
  return custom((payload, delegate) => {
    if (payload === value) {
      return payload as T;
    }

    delegate(issue(message ?? "Invalid literal"));
  });
}
