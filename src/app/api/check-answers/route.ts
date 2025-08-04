import { NextResponse } from 'next/server';
import { answers } from '@/data/answers';

export async function POST(req: Request) {
  const { id, userAnswer } = await req.json();
  const correctAnswers = answers[id];

  if (!correctAnswers) return NextResponse.json({ correct: false });

  const correct = correctAnswers.some(
    (a) => a.toLowerCase() === userAnswer.toLowerCase()
  );

  return NextResponse.json({ correct });
}
