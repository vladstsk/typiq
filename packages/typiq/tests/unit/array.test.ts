import { array } from "~/array";
import { TypiqError } from "~/error";
import { number } from "~/number";
import { unknown } from "~/unknown";

import { nullable, simple } from "../__mocks__/payloads";

describe("array", () => {
  it("should parse array successfully", () => {
    const schema = array(number());

    expect(schema.parse([])).toEqual([]);
    expect(schema.parse([1])).toEqual([1]);
  });

  it("should fail array parsing", () => {
    const schema = array(number());

    for (const item of [...simple, ...nullable]) {
      expect(() => schema.parse(item)).toThrow(TypiqError);
    }

    expect(() => schema.parse([1, "1"])).toThrow(TypiqError);
  });

  it("should throw a custom error message", () => {
    const customMessage = "Custom error message";
    const schema = array(unknown(), customMessage);

    const result = schema.handle(null);

    expect(result.issues).toEqual([{ message: customMessage, path: [] }]);
  });
});
