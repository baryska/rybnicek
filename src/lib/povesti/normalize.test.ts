import { describe, expect, it } from "vitest";
import { checkAnswer, normalizeAnswer, sha256Hex } from "./normalize";

describe("normalizeAnswer", () => {
  it("převede na malá písmena", () => {
    expect(normalizeAnswer("KLADÍVKO")).toBe("kladivko");
  });

  it("odstraní diakritiku", () => {
    expect(normalizeAnswer("kladívko")).toBe("kladivko");
    expect(normalizeAnswer("tři")).toBe("tri");
    expect(normalizeAnswer("pět")).toBe("pet");
    expect(normalizeAnswer("ěščřžýáíéůúďťň")).toBe("escrzyaieuudtn");
  });

  it("ořízne mezery na krajích", () => {
    expect(normalizeAnswer("  kladivko  ")).toBe("kladivko");
  });

  it("sjednotí vícenásobné mezery (včetně tabulátorů)", () => {
    expect(normalizeAnswer("u   bozi \t vody")).toBe("u bozi vody");
  });

  it("číslice zůstávají beze změny", () => {
    expect(normalizeAnswer(" 1612 ")).toBe("1612");
  });

  it("prázdný a bílý vstup dá prázdný řetězec", () => {
    expect(normalizeAnswer("")).toBe("");
    expect(normalizeAnswer("   ")).toBe("");
  });
});

describe("sha256Hex", () => {
  it("počítá známý SHA-256 otisk", async () => {
    // otisk shodný s výstupem scripts/hash-answer.mjs
    expect(await sha256Hex("kladivko")).toBe(
      "9a5a4044b06831393d343709eb96025b4b589dd5a72bc7083fd2534c6f762b82"
    );
    expect(await sha256Hex("3")).toBe(
      "4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce"
    );
  });
});

describe("checkAnswer", () => {
  const hashes = [
    "4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce", // 3
    "cddd67830982a78cc83998c15c13e49e1cb6bea286c4507cb5510d9c6aba4ec3", // tri
  ];

  it("přijme číslici i slovo", async () => {
    expect(await checkAnswer("3", hashes)).toBe(true);
    expect(await checkAnswer("tři", hashes)).toBe(true);
    expect(await checkAnswer("TŘI", hashes)).toBe(true);
    expect(await checkAnswer("  tri  ", hashes)).toBe(true);
  });

  it("odmítne špatnou odpověď", async () => {
    expect(await checkAnswer("4", hashes)).toBe(false);
    expect(await checkAnswer("ctyri", hashes)).toBe(false);
  });

  it("odmítne prázdný vstup", async () => {
    expect(await checkAnswer("", hashes)).toBe(false);
    expect(await checkAnswer("   ", hashes)).toBe(false);
  });
});
