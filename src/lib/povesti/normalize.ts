/**
 * Normalizace a ověřování odpovědí pro Stezku berounských pověstí.
 *
 * POZOR: normalizeAnswer() musí zůstat shodná s kopií
 * ve scripts/hash-answer.mjs (skript generuje hashe do src/data/povesti.ts).
 */

export function normalizeAnswer(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export async function sha256Hex(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function checkAnswer(
  input: string,
  answerHashes: string[]
): Promise<boolean> {
  const normalized = normalizeAnswer(input);
  if (normalized === "") return false;
  const hash = await sha256Hex(normalized);
  return answerHashes.includes(hash);
}
