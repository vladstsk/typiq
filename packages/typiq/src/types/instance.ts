import type { Schema } from "~/types";

export declare interface InstanceConstructor<T> {
  new (...args: unknown[]): T;

  prototype: T;
}

export function instance<T>(constructor: InstanceConstructor<T>): Schema<T> {
  return {
    parse(value: unknown) {
      if (value instanceof constructor) {
        return value;
      }

      throw new Error("Invalid instance");
    },
  };
}
