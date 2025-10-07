import { TypiqError } from "~/error";
import { transform } from "~/transform";

import { string } from "../__mocks__/schemas";

describe("transform", () => {
  const toString = transform((value) => value?.toString(), string);

  it("should transform number to string successfully", () => {
    expect(toString.parse(35)).toBe("35");
  });

  it("should fail number to string transformation", () => {
    expect(() => toString.parse(null)).toThrow(TypiqError);
  });
});
