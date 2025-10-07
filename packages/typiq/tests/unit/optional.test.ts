import { TypiqError } from "~/error";
import { number } from "~/number";
import { optional } from "~/optional";

import { complex, nullable, simple } from "../__mocks__/payloads";

describe("optional", () => {
  it("should parse optional successfully", () => {
    const schema = optional(number());

    for (const item of [0, new Number(0)]) {
      expect(schema.parse(item)).toBe(0);
    }

    for (const item of nullable) {
      expect(schema.parse(item)).toBe(null);
    }
  });

  it("should fail optional parsing", () => {
    const schema = optional(number());

    for (const item of [...simple, ...nullable, ...complex]) {
      if (typeof item !== "number" && item !== null && item !== undefined) {
        expect(() => schema.parse(item)).toThrow(TypiqError);
      }
    }
  });
});
