import { TypiqError } from "~/error";
import { literal } from "~/literal";

import { complex, nullable, simple } from "../__mocks__/payloads";

describe("literal", () => {
  it("should parse literal successfully", () => {
    for (const item of [...simple, ...nullable]) {
      if (
        item === null ||
        (typeof item !== "object" && typeof item !== "function")
      ) {
        const schema = literal(item);

        expect(schema.parse(item)).toBe(item);
      }
    }
  });

  it("should fail literal parsing", () => {
    for (const item of [...simple, ...nullable, ...complex]) {
      const schema = literal(!item);

      expect(() => schema.parse(item)).toThrow(TypiqError);
    }
  });

  it("should throw a custom error message", () => {
    const customMessage = "Custom error message";
    const schema = literal(1, customMessage);

    const result = schema.handle(null);

    expect(result.issues).toEqual([{ message: customMessage, path: [] }]);
  });
});
