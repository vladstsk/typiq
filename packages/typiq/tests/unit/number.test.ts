import { TypiqError } from "~/error";
import { number } from "~/number";

import { complex, nullable, simple } from "../__mocks__/payloads";

describe("number", () => {
  it("should parse number successfully", () => {
    const schema = number();

    for (const item of [0, new Number(0)]) {
      expect(schema.parse(item)).toBe(0);
    }
  });

  it("should fail number parsing", () => {
    const schema = number();

    for (const item of [...simple, ...nullable, ...complex]) {
      if (typeof item !== "number") {
        expect(() => schema.parse(item)).toThrow(TypiqError);
      }
    }
  });

  it("should throw a custom error message", () => {
    const customMessage = "Custom error message";
    const schema = number(customMessage);

    const result = schema.handle(null);

    expect(result.issues).toEqual([{ message: customMessage, path: [] }]);
  });
});
