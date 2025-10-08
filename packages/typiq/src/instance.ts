import { custom } from "~/custom";
import { issue } from "~/error";
import type { Schema } from "~/schema";

export declare interface InstanceConstructor<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (...args: any): T;

  prototype: T;
}

// eslint-disable-next-line prettier/prettier
export function instance<T>(constructor: InstanceConstructor<T>, message?: string): Schema<T> {
  return custom((payload, delegate) => {
    if (payload instanceof constructor) {
      return payload;
    }

    delegate(issue(message ?? "Invalid instance"));
  });
}
