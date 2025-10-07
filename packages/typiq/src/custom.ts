import type { Issue } from "~/error";
import { TypiqError } from "~/error";
import type { PipeSchema, Schema } from "~/schema";
import { transform, type Transformer } from "~/transform";
import type { FailureValidate, SuccessValidate } from "~/validate";
import { failure, success } from "~/validate";

export declare interface SchemaExecutor<O, I = unknown> {
  (payload: I, delegate: (issue: Issue) => void): O | undefined | void;
}

// eslint-disable-next-line prettier/prettier
export function custom<O, I = unknown>(execute: SchemaExecutor<O, I>): Schema<O, I> {
  const issues: Issue[] = [];

  const process = (input: I): O => {
    issues.length = 0;

    return execute(input, (issue) => issues.push(issue)) as O;
  };

  return {
    handle(input: I): FailureValidate | SuccessValidate<O> {
      const output = process(input);

      if (issues.length) {
        return failure(issues);
      } else {
        return success(output);
      }
    },

    parse(input: I): O {
      const output = process(input);

      if (issues.length) {
        throw new TypiqError(undefined, issues);
      }

      return output;
    },

    // @ts-expect-error Type S is not assignable to type Schema<T, O>
    pipe<T, S extends Schema<T, O>>(schema: S): PipeSchema<S, Schema<T, I>> {
      return {
        ...schema,
        ...custom((input: I, delegate): T | void => {
          const output = process(input);

          if (issues.length) {
            for (const issue of issues) {
              delegate(issue);
            }

            return;
          }

          const result = schema.handle(output);

          /* istanbul ignore next */
          for (const issue of result.issues) {
            delegate(issue);
          }

          return result.data;
        }),
      };
    },

    // @ts-expect-error - Type S is not assignable to type Schema<U, T>
    // eslint-disable-next-line prettier/prettier
    transform<T, U, S extends Schema<U, T>>(cb: Transformer<T, O>, schema: S): PipeSchema<S, Schema<U, I>> {
      return this.pipe(transform(cb, schema));
    },
  };
}
