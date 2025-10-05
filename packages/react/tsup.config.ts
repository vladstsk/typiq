import { defineConfig } from "tsup";

export default defineConfig((options) => [
  {
    bundle: true,
    clean: !options.watch,
    entry: ["src/index.ts"],
    format: ["esm"],
    minify: !options.watch,
    platform: "neutral",
    silent: !!options.watch,
    sourcemap: !!options.watch,
    tsconfig: "tsconfig.json",

    outExtension() {
      return { js: ".mjs" };
    },
  },
  {
    bundle: true,
    dts: {
      only: true,
    },
    entry: ["src/index.ts"],
    platform: "neutral",
    silent: !!options.watch,
  },
]);
