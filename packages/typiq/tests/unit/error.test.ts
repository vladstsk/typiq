import { TypiqError } from "~/error";

describe("TypiqError", () => {
  it("should create an error with default message and empty issues array when no arguments are provided", () => {
    const error = new TypiqError();

    expect(error.message).toBe("Invalid input");
    expect(error.issues).toEqual([]);
  });

  it("should create an error with a custom message when provided", () => {
    const customMessage = "Custom error message";
    const error = new TypiqError(customMessage);

    expect(error.message).toBe(customMessage);
    expect(error.issues).toEqual([]);
  });

  it("should create an error with custom issues when provided", () => {
    const customIssues = [
      { message: "Issue 1", path: ["field1"] },
      { message: "Issue 2", path: ["field2", "subfield"] },
    ];
    const error = new TypiqError("Error with issues", customIssues);

    expect(error.message).toBe("Error with issues");
    expect(error.issues).toEqual(customIssues);
  });

  it("should create an error with default message if only issues are provided", () => {
    const customIssues = [{ message: "Issue 1", path: ["field1"] }];
    const error = new TypiqError(undefined, customIssues);

    expect(error.message).toBe("Invalid input");
    expect(error.issues).toEqual(customIssues);
  });
});
