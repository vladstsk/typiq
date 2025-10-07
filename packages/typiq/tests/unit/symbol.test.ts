import { TypiqError } from "~/error";
import { symbol } from "~/symbol";

import { complex, nullable, simple } from "../__mocks__/payloads";

describe("symbol", () => {
  it("should parse symbol successfully", () => {
    const schema = symbol();

    for (const value of [Symbol(), Symbol.for("test")]) {
      expect(schema.parse(value)).toBe(value);
    }
  });

  it("should fail symbol parsing", () => {
    const schema = symbol();

    for (const item of [...simple, ...nullable, ...complex]) {
      if (typeof item !== "symbol") {
        expect(() => schema.parse(item)).toThrow(TypiqError);
      }
    }
  });

  it("should throw a custom error message", () => {
    const customMessage = "Custom error message";
    const schema = symbol(customMessage);

    const result = schema.handle(null);

    expect(result.issues).toEqual([{ message: customMessage, path: [] }]);
  });
});
