import { callback } from "~/callback";
import { TypiqError } from "~/error";

import { complex, nullable, simple } from "../__mocks__/payloads";

describe("callback", () => {
  it("should parse callback successfully", () => {
    const schema = callback();

    for (const item of simple) {
      if (typeof item === "function") {
        expect(schema.parse(item)).toBe(item);
      }
    }
  });

  it("should fail callback parsing", () => {
    const schema = callback();

    for (const item of [...simple, ...nullable, ...complex]) {
      if (typeof item !== "function") {
        expect(() => schema.parse(item)).toThrow(TypiqError);
      }
    }
  });

  it("should throw a custom error message", () => {
    const customMessage = "Custom error message";
    const schema = callback(customMessage);

    const result = schema.handle(null);

    expect(result.issues).toEqual([{ message: customMessage, path: [] }]);
  });
});
