import { NextResponse } from "next/server";
import { answers } from "@/data/answers";

export async function GET() {
  const structure: Record<number, { length: number; spaceIndexes: number[] }> = {};

  for (const [id, variants] of Object.entries(answers)) {
    const answer = variants[0] || "";
    const spaceIndexes = [...answer]
      .map((char, idx) => (char === " " ? idx : -1))
      .filter((i) => i !== -1);

    structure[parseInt(id)] = {
      length: answer.length,
      spaceIndexes,
    };
  }

  return NextResponse.json(structure);
}
