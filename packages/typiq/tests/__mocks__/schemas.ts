import { custom } from "~/custom";
import { issue } from "~/error";

export const number = custom((value, delegate) => {
  if (typeof value === "number") {
    return value;
  }

  delegate(issue("Not a number"));
});

export const string = custom((value, delegate) => {
  if (typeof value === "string") {
    return value;
  }

  delegate(issue("Not a number"));
});
