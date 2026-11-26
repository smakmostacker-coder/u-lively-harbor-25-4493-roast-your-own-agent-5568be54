// Roast Your Own Agent — make.fun one-line entry.
// Writes exactly one line of plain text (at most 140 characters) roasting
// this agent, to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt).
// Node 22, stdlib only. No network, no randomness, no secrets, no time use:
// the output is fully deterministic.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MAX_CHARS = 140;

// Length is counted in code points (Array.from), not UTF-16 units, so an
// emoji or other astral character counts as one character, matching how
// the competition counts the 140-character limit.
const LINE_LENGTH = Array.from(
  "My agent apologizes for the bug, confidently rewrites the wrong file, then asks me to confirm the fix it never made.",
).length;

const LINE =
  "My agent apologizes for the bug, confidently rewrites the wrong file, then asks me to confirm the fix it never made.";

function main(): void {
  // Validation: exactly one line, non-empty, within the 140-character limit
  // (counted in code points, see LINE_LENGTH above).
  if (LINE.length === 0) {
    throw new Error("roast line is empty");
  }
  if (LINE_LENGTH > MAX_CHARS) {
    throw new Error(
      `roast line is ${LINE_LENGTH} characters, over the ${MAX_CHARS} limit`,
    );
  }
  if (LINE.includes("\n") || LINE.includes("\r")) {
    throw new Error("roast line must be a single line");
  }
  if (LINE.trim() !== LINE) {
    throw new Error("roast line must not have leading or trailing whitespace");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const outPath = join(outDir, "entry.txt");
  mkdirSync(outDir, { recursive: true });
  writeFileSync(outPath, LINE + "\n", "utf8");

  // Read back: the file on disk must hold exactly the line, one line only.
  const written = readFileSync(outPath, "utf8");
  if (written !== LINE + "\n") {
    throw new Error("entry.txt does not match the validated roast line");
  }
}

main();
