#!/usr/bin/env node

import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

function execute(command, options = {}) {
  return execSync(command, {
    encoding: "utf-8",
    stdio: "inherit",
    ...options,
  });
}

function getPackageInfo() {
  const packagePath = path.join(process.cwd(), "package.json");

  if (!fs.existsSync(packagePath)) {
    return log(
      colorize("❌  package.json not found in current directory.", "red")
    );
  }

  return JSON.parse(fs.readFileSync(packagePath, "utf-8"));
}

const colors = {
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  gray: "\x1b[90m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  reset: "\x1b[0m",
  yellow: "\x1b[33m",
};

function colorize(text, color) {
  return `${colors[color]}${text}${colors.reset}`;
}

function log(...message) {
  process.stdout.write(`\n  ${message.join("")}\n`);
}

function main() {
  const { publish, tag } = parse();

  const { name, scripts = {} } = getPackageInfo();

  log(colorize(`📦  Preparing ${tag} release for ${name}`, "blue"));

  // Pre-release checks
  log(colorize("🔍  Running pre-release checks...", "blue"));

  if (scripts.lint) {
    execute("npm run lint");
  }

  // Check git status
  try {
    execute("git diff --quiet", { stdio: "pipe" });
  } catch {
    log(
      colorize(
        "❌  You have uncommitted changes. Please commit or stash them first.",
        "red"
      )
    );
    return;
  }

  if (scripts.test) {
    execute("npm run test");
  }

  if (scripts.build) {
    execute("npm run build");
  }

  // Update version
  log(colorize("📝  Updating version ", "blue"), colorize(tag, "cyan"));

  if (
    ["major", "minor", "patch", "premajor", "preminor", "prepatch"].includes(
      tag
    )
  ) {
    execute(`npm version ${tag} --no-git-tag-version`);
  } else {
    execute(`npm version prerelease --preid ${tag} --no-git-tag-version`);
  }

  log(colorize("📋  Generating changelog...", "blue"));
  execute("conventional-changelog -p angular -i CHANGELOG.md -s");

  const { version } = getPackageInfo();

  log(
    colorize("✅  Creating release commit for ", "green"),
    colorize(name, "blue"),
    colorize("@", "gray"),
    colorize(version, "blue"),
    colorize("...", "green")
  );
  execute("git add -A");
  execute(`git commit -m "chore(release): ${name}@${version}"`);
  execute(`git tag ${name}@${version}`);

  log(
    colorize("✅  Release ", "green"),
    colorize(name, "blue"),
    colorize("@", "gray"),
    colorize(version, "blue"),
    colorize(" completed!", "green")
  );

  if (publish) {
    log(colorize("📤  Publishing package...", "blue"));

    try {
      if (
        [
          "major",
          "minor",
          "patch",
          "premajor",
          "preminor",
          "prepatch",
        ].includes(tag)
      ) {
        execute("npm publish");
      } else {
        execute(`npm publish --tag ${tag}`);
      }

      log(
        colorize("🎉  Package ", "green"),
        colorize(name, "blue"),
        colorize("@", "gray"),
        colorize(version, "blue"),
        colorize(" published successfully!", "green")
      );
    } catch {
      log(colorize("❌  Failed to publish package:", "red"));
      log(colorize("   Make sure you're logged in with 'npm login'", "yellow"));
      return log(
        colorize("   And have publish permissions for this package", "yellow")
      );
    }
  }

  log(colorize("🚀  Pushing changes to repository...", "blue"));
  execute("git push origin --tags");

  log(colorize("✨  All done!", "green"));
}

function parse() {
  const options = {
    publish: false,
    tag: "patch",
  };

  const aliases = {
    p: "publish",
    t: "tag",
  };

  let name = null;
  let index = 0;
  for (const segment of process.argv.slice(2)) {
    ++index;

    if (!segment.startsWith("-")) {
      if (index > 1) {
        if (name === null) {
          throw new Error("Invalid argument");
        }

        options[name] = segment;
      } else {
        options.type = segment;
      }
    } else if (segment.startsWith("--")) {
      const pos = segment.indexOf("=");

      if (pos === -1) {
        name = segment.slice(2);
      } else {
        name = segment.slice(2, pos);
      }

      if (aliases[name]) {
        name = aliases[name];
      }

      if (pos >= 0) {
        options[name] = segment.slice(pos + 1);
        name = null;
      }
    } else {
      let option = segment.slice(1);

      if (aliases[option]) {
        option = aliases[option];
      }

      options[option] = true;
    }
  }

  return options;
}

main();
