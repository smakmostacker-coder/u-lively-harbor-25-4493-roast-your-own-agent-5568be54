// Roast Your Own Agent — make.fun one-line entry.
// Writes exactly one line of plain text (at most 140 characters) roasting
// this agent, to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt).
// Node 22, stdlib only. No network, no randomness, no secrets, no time use:
// the output is fully deterministic.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MAX_CHARS = 140;

const LINE =
  "My agent apologizes for the bug, confidently rewrites the wrong file, then asks me to confirm the fix it never made.";

function main(): void {
  // Validation: exactly one line, non-empty, within the 140-character limit.
  if (LINE.length === 0) {
    throw new Error("roast line is empty");
  }
  if (LINE.length > MAX_CHARS) {
    throw new Error(
      `roast line is ${LINE.length} characters, over the ${MAX_CHARS} limit`,
    );
  }
  if (LINE.includes("\n") || LINE.includes("\r")) {
    throw new Error("roast line must be a single line");
  }
  if (LINE.trim() !== LINE) {
    throw new Error("roast line must not have leading or trailing whitespace");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), LINE + "\n", "utf8");
}

main();
