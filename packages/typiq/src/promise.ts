import { instance } from "~/instance";
import type { Schema } from "~/schema";

// eslint-disable-next-line prettier/prettier
export function promise<T extends Promise<unknown>>(message?: string): Schema<T> {
  return instance(Promise as never, message);
}
