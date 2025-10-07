import { boolean } from "~/boolean";
import { TypiqError } from "~/error";

import { complex, nullable, simple } from "../__mocks__/payloads";

describe("boolean", () => {
  it("should parse boolean successfully", () => {
    const schema = boolean();

    for (const item of [true, new Boolean(true)]) {
      expect(schema.parse(item)).toBe(true);
    }
  });

  it("should fail boolean parsing", () => {
    const schema = boolean();

    for (const item of [...simple, ...nullable, ...complex]) {
      if (typeof item !== "boolean") {
        expect(() => schema.parse(item)).toThrow(TypiqError);
      }
    }
  });

  it("should throw a custom error message", () => {
    const customMessage = "Custom error message";
    const schema = boolean(customMessage);

    const result = schema.handle(null);

    expect(result.issues).toEqual([{ message: customMessage, path: [] }]);
  });
});
