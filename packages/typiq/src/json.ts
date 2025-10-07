import { array } from "~/array";
import { boolean } from "~/boolean";
import { custom } from "~/custom";
import { literal } from "~/literal";
import { number } from "~/number";
import { record } from "~/record";
import type { Schema } from "~/schema";
import { string } from "~/string";
import { union } from "~/union";

export type Json =
  | Json[]
  | boolean
  | number
  | string
  | null
  | { [key: string]: Json };

export function json(message?: string): Schema<Json> {
  return custom((payload, delegate) => {
    const schema = union(
      [
        literal(null),
        number(),
        string(),
        boolean(),
        array(json()),
        record(json()),
      ],
      message
    );

    const result = schema.handle(payload);

    if (result.success) {
      return result.data;
    }

    for (const item of result.issues) {
      delegate(item);
    }
  });
}
