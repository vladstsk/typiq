import { unknown } from "~/unknown";

import { complex, nullable, simple } from "../__mocks__/payloads";

describe("unknown", () => {
  it("should parse unknown successfully", () => {
    const schema = unknown();

    for (const item of [...simple, ...nullable, ...complex]) {
      expect(schema.parse(item)).toBe(item);
    }
  });
});
