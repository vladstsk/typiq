import { TypiqError } from "~/error";
import { number } from "~/number";
import { record } from "~/record";
import { unknown } from "~/unknown";
import { failure } from "~/validate";

import { simple } from "../__mocks__/payloads";

describe("record", () => {
  it("should parse record successfully", () => {
    const schema = record(unknown());

    for (const item of simple) {
      expect(schema.parse({ key: item }).key).toBe(item);
    }
  });

  it("should fail record parsing", () => {
    const schema = record(number());

    for (const item of simple) {
      if (typeof item !== "number") {
        expect(schema.handle({ key: item })).toEqual(
          failure([{ message: "Invalid number", path: ["key"] }])
        );
      }
    }

    expect(() => schema.parse(null)).toThrow(TypiqError);
  });

  it("should throw a custom error message", () => {
    const customMessage = "Custom error message";
    const schema = record(unknown(), customMessage);

    const result = schema.handle(null);

    expect(result.issues).toEqual([{ message: customMessage, path: [] }]);
  });
});
