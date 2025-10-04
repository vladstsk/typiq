import base from "@repo/config/jest/base";

/** @type import("jest").Config */
const config = {
  ...base,

  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/src/$1",
  },
};

export default config;
