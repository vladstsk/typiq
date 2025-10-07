import { TypiqError } from "~/error";
import { number } from "~/number";
import { string } from "~/string";
import { union } from "~/union";

import { complex, nullable, simple } from "../__mocks__/payloads";

describe("union", () => {
  it("should parse union successfully", () => {
    const schema = union([string(), number()]);

    for (const item of ["", 0]) {
      expect(schema.parse(item)).toEqual(item);
    }
  });

  it("should fail union parsing", () => {
    const schema = union([]);

    for (const item of [...simple, ...nullable, ...complex]) {
      expect(() => schema.parse(item)).toThrow(TypiqError);
    }
  });

  it("should throw a custom error message", () => {
    const customMessage = "Custom error message";
    const schema = union([], customMessage);

    const result = schema.handle(null);

    expect(result.issues).toEqual([{ message: customMessage, path: [] }]);
  });
});
