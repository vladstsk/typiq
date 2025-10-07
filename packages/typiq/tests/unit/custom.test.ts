import { custom } from "~/custom";
import { TypiqError } from "~/error";
import { failure, success } from "~/validate";

import { number, string } from "../__mocks__/schemas";

describe("custom function", () => {
  const transform = jest.fn((value: number) => String(value));
  const toString = custom(transform);

  describe("handle method", () => {
    it("should validate number successfully", () => {
      const result = number.handle(42);

      expect(result).toEqual(success(42));
    });

    it("should fail number validation", () => {
      const result = number.handle("not a number");

      expect(result).toEqual(failure([{ message: "Not a number", path: [] }]));
    });
  });

  describe("parse method", () => {
    it("should parse number successfully", () => {
      const result = number.parse(42);

      expect(result).toBe(42);
    });

    it("should fail number parsing", () => {
      expect(() => number.parse("not a number")).toThrow(TypiqError);
    });
  });

  describe("pipe method", () => {
    it("should transform number to string successfully", () => {
      const numberToString = number.pipe(toString);

      expect(numberToString.parse(42)).toBe("42");
    });

    it("should fail number to string transformation", () => {
      const numberToString = number.pipe(toString);

      expect(() => numberToString.parse("42")).toThrow(TypiqError);
    });
  });

  describe("transform method", () => {
    it("should transform number to string successfully", () => {
      const numberToString = number.transform(
        (value) => value.toString(),
        string
      );

      expect(numberToString.parse(42)).toBe("42");
    });

    it("should fail number to string transformation", () => {
      const numberToString = number.transform(
        (value) => value.toString(),
        string
      );

      expect(() => numberToString.parse("42")).toThrow(TypiqError);
    });
  });
});
