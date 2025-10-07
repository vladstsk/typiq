export declare interface Issue {
  message: string;
  path: PropertyKey[];
}

export function issue(message: string, path?: PropertyKey[]): Issue {
  return { message, path: path || [] };
}

export class TypiqError extends Error {
  readonly issues: Issue[];

  constructor(message?: string, issues?: Issue[]) {
    super(message || "Invalid input");
    this.issues = issues || [];
  }
}
