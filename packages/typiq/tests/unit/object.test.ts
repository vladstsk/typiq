import { TypiqError } from "~/error";
import { object } from "~/object";
import { string } from "~/string";

describe("object", () => {
  it("should parse object successfully", () => {
    const schema = object({
      key: string(),
    });

    expect(schema.parse({ key: "value" })).toEqual({ key: "value" });
  });

  it("should fail object parsing", () => {
    const schema = object({
      key: string(),
    });

    expect(() => schema.parse({ key: 1 })).toThrow(TypiqError);
    expect(() => schema.parse(null)).toThrow(TypiqError);
  });

  it("should throw a custom error message", () => {
    const customMessage = "Custom error message";
    const schema = object({}, customMessage);

    const result = schema.handle(null);

    expect(result.issues).toEqual([{ message: customMessage, path: [] }]);
  });
});
