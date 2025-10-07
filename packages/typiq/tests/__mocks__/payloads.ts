export const simple = [
  "text",
  0,
  0n,
  true,
  Symbol(),
  new Date(),
  Promise.resolve(),
  () => undefined,
];

export const nullable = [
  null,
  undefined,
];

export const complex = [
  {
    a: 1,
    b: "2",
    c: true,
    d: null,
    e: undefined,
    f: Symbol(),
    g: new Date(),
  },
  {
    a: 1,
    b: {
      c: "2",
      d: {
        e: true,
      },
    },
  },
  [1, "2", true, null, undefined, Symbol(), new Date()],
  [1, ["2", [true]]],
];
