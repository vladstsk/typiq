import { TypiqError } from "~/error";
import { number } from "~/number";
import { string } from "~/string";
import { tuple } from "~/tuple";

import { nullable, simple } from "../__mocks__/payloads";

describe("tuple", () => {
  it("should parse tuple successfully", () => {
    const schema = tuple([number(), string()]);

    expect(schema.parse([1, "1"])).toEqual([1, "1"]);
  });

  it("should fail tuple parsing", () => {
    const schema = tuple([number(), string()]);

    for (const item of [...simple, ...nullable]) {
      expect(() => schema.parse(item)).toThrow(TypiqError);
    }

    expect(() => schema.parse(["1", 1])).toThrow(TypiqError);
  });

  it("should throw a custom error message", () => {
    const customMessage = "Custom error message";
    const schema = tuple([], customMessage);

    const result = schema.handle(null);

    expect(result.issues).toEqual([{ message: customMessage, path: [] }]);
  });
});
