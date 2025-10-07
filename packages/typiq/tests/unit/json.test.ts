import { TypiqError } from "~/error";
import { json } from "~/json";

describe("json", () => {
  it("should parse json successfully", () => {
    const schema = json();

    for (const item of [null, 1, "1", true, [], {}]) {
      expect(schema.parse(item)).toEqual(item);
    }
  });

  it("should fail json parsing", () => {
    const schema = json();

    for (const item of [undefined, Symbol(), [undefined], { key: undefined }]) {
      expect(() => schema.parse(item)).toThrow(TypiqError);
    }
  });

  it("should throw a custom error message", () => {
    const customMessage = "Custom error message";
    const schema = json(customMessage);

    const result = schema.handle(Symbol());

    expect(result.issues).toEqual([{ message: customMessage, path: [] }]);
  });
});
