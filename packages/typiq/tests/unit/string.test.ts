import { TypiqError } from "~/error";
import { string } from "~/string";

import { complex, nullable, simple } from "../__mocks__/payloads";

describe("string", () => {
  it("should parse string successfully", () => {
    const schema = string();

    for (const item of ["text", new String("text")]) {
      expect(schema.parse(item)).toBe("text");
    }
  });

  it("should fail string parsing", () => {
    const schema = string();

    for (const item of [...simple, ...nullable, ...complex]) {
      if (typeof item !== "string") {
        expect(() => schema.parse(item)).toThrow(TypiqError);
      }
    }
  });

  it("should throw a custom error message", () => {
    const customMessage = "Custom error message";
    const schema = string(customMessage);

    const result = schema.handle(null);

    expect(result.issues).toEqual([{ message: customMessage, path: [] }]);
  });
});
