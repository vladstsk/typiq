import { TypiqError } from "~/error";
import { promise } from "~/promise";

import { complex, nullable, simple } from "../__mocks__/payloads";

describe("promise", () => {
  it("should parse promise successfully", () => {
    const schema = promise();

    for (const item of [Promise.resolve(), new Promise(() => {})]) {
      expect(schema.parse(item)).toBe(item);
    }
  });

  it("should fail promise parsing", () => {
    const schema = promise();

    for (const item of [...simple, ...nullable, ...complex]) {
      if (!(item instanceof Promise)) {
        expect(() => schema.parse(item)).toThrow(TypiqError);
      }
    }
  });

  it("should throw a custom error message", () => {
    const customMessage = "Custom error message";
    const schema = promise(customMessage);

    const result = schema.handle(null);

    expect(result.issues).toEqual([{ message: customMessage, path: [] }]);
  });
});
