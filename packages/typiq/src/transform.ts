import { custom } from "~/custom";
import type { PipeSchema, Schema } from "~/schema";

export declare interface Transformer<O, I = unknown> {
  (value: I): O;
}

// eslint-disable-next-line prettier/prettier
export function transform<O, T, S extends Schema<O, T>, I = unknown>(transform: Transformer<T, I>, schema: S): PipeSchema<S, Schema<O, I>> {
  return {
    ...schema,
    ...custom((payload, delegate) => {
      const result = schema.handle(transform(payload));

      if (result.success) {
        return result.data;
      }

      for (const issue of result.issues) {
        delegate(issue);
      }
    }),
  };
}
