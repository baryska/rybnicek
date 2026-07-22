#!/usr/bin/env node
/**
 * Vygeneruje SHA-256 hashe odpovědí pro Stezku berounských pověstí.
 *
 * Použití:
 *   node scripts/hash-answer.mjs "kladívko" "kladivo"
 *   node scripts/hash-answer.mjs "3"
 *
 * Pro čistě číselné odpovědi (0–20) se automaticky přidá i slovní varianta
 * („3" → „tri"). Výstupem je hotové pole `answerHashes` k vložení do
 * src/data/povesti.ts.
 *
 * POZOR: normalizace níže musí zůstat shodná s normalizeAnswer()
 * v src/lib/povesti/normalize.ts.
 */
import { createHash } from "node:crypto";

const NUMBER_WORDS = {
  0: ["nula"],
  1: ["jedna", "jeden"],
  2: ["dva", "dve"],
  3: ["tri"],
  4: ["ctyri"],
  5: ["pet"],
  6: ["sest"],
  7: ["sedm"],
  8: ["osm"],
  9: ["devet"],
  10: ["deset"],
  11: ["jedenact"],
  12: ["dvanact"],
  13: ["trinact"],
  14: ["ctrnact"],
  15: ["patnact"],
  16: ["sestnact"],
  17: ["sedmnact"],
  18: ["osmnact"],
  19: ["devatenact"],
  20: ["dvacet"],
};

function normalizeAnswer(input) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function sha256(text) {
  return createHash("sha256").update(text, "utf8").digest("hex");
}

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Použití: node scripts/hash-answer.mjs "odpověď" ["další varianta" ...]');
  process.exit(1);
}

const normalized = new Set();
for (const arg of args) {
  const norm = normalizeAnswer(arg);
  normalized.add(norm);
  if (/^\d+$/.test(norm) && NUMBER_WORDS[Number(norm)]) {
    for (const word of NUMBER_WORDS[Number(norm)]) normalized.add(word);
  }
}

console.log("Přijímané normalizované odpovědi a jejich hashe:");
for (const norm of normalized) {
  console.log(`  "${norm}" → ${sha256(norm)}`);
}
console.log("\nanswerHashes: [");
for (const norm of normalized) {
  console.log(`  "${sha256(norm)}", // ${norm}`);
}
console.log("],");
