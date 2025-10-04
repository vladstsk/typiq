import { boolean } from "../../../src/types/boolean";

describe("boolean function", () => {
  test("should validate boolean values", () => {
    const schema = boolean();

    expect(schema.parse(true)).toBe(true);
    expect(schema.parse(false)).toBe(false);
    expect(schema.parse(new Boolean(true))).toBe(true);
    expect(schema.parse(new Boolean(false))).toBe(false);
  });

  test("should reject non-boolean values", () => {
    const schema = boolean();

    expect(() => schema.parse(0)).toThrow("Invalid boolean");
    expect(() => schema.parse(1)).toThrow("Invalid boolean");
    expect(() => schema.parse("true")).toThrow("Invalid boolean");
    expect(() => schema.parse("false")).toThrow("Invalid boolean");
    expect(() => schema.parse({})).toThrow("Invalid boolean");
    expect(() => schema.parse([])).toThrow("Invalid boolean");
    expect(() => schema.parse(null)).toThrow("Invalid boolean");
    expect(() => schema.parse(undefined)).toThrow("Invalid boolean");
  });

  test("should allow custom error message", () => {
    const schema = boolean("Custom error");

    expect(() => schema.parse("true")).toThrow("Custom error");
  });
});
