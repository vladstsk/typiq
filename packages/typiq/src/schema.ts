import type { Transformer } from "~/transform";
import type { FailureValidate, SuccessValidate } from "~/validate";

export type PipeSchema<T, U> = T & U;

export type SchemaInputType<T> = T extends Schema<unknown, infer U> ? U : never;

export type SchemaType<T> = T extends Schema<infer U> ? U : never;

export declare interface Schema<O, I = unknown> {
  handle(payload: I): FailureValidate | SuccessValidate<O>;

  parse(payload: I): O;

  pipe<T, S extends Schema<T, O>>(schema: S): PipeSchema<S, Schema<T, I>>;

  // eslint-disable-next-line prettier/prettier
  transform<T, U, S extends Schema<U, T>>(transform: Transformer<T, O>, schema: S): PipeSchema<S, Schema<U, I>>;
}
