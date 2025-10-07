import type { Issue } from "~/error";

export declare interface FailureValidate {
  data: never;
  issues: Issue[];
  success: false;
}

export declare interface SuccessValidate<T> {
  data: T;
  issues: never[];
  success: true;
}

export function failure(issues: Issue[]): FailureValidate {
  return { data: undefined as never, issues, success: false };
}

export function success<T>(data: T): SuccessValidate<T> {
  return { data, issues: [], success: true };
}
