import { TypiqError } from "~/error";
import { instance } from "~/instance";

import { complex, nullable, simple } from "../__mocks__/payloads";

describe("instance", () => {
  class TestInstance {}

  it("should parse instance successfully", () => {
    for (const item of [String, Number, Boolean, Array, Object, Date]) {
      const schema = instance(item);

      const payload = new item();

      expect(schema.parse(payload)).toBe(payload);
    }
  });

  it("should fail instance parsing", () => {
    const schema = instance(TestInstance);

    for (const item of [...simple, ...nullable, ...complex]) {
      expect(() => schema.parse(item)).toThrow(TypiqError);
    }
  });

  it("should throw a custom error message", () => {
    const customMessage = "Custom error message";
    const schema = instance(TestInstance, customMessage);

    const result = schema.handle(null);

    expect(result.issues).toEqual([{ message: customMessage, path: [] }]);
  });
});
