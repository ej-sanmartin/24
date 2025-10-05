import { NextRequest, NextResponse } from 'next/server';
import { chat } from '@/lib/ai';
import { ChatMessage } from '@/lib/ai/types';

export const runtime = 'nodejs'; // ensure server runtime

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();

  if (typeof body !== 'object' || body === null) {
    return NextResponse.json(
      { error: 'Request body must be a JSON object.' },
      { status: 400 },
    );
  }

  const systemPrompt = typeof body.systemPrompt === 'string' ? body.systemPrompt : '';
  const userPrompt = typeof body.userPrompt === 'string' ? body.userPrompt : '';

  if (!userPrompt) {
    return NextResponse.json(
      { error: 'userPrompt is required.' },
      { status: 400 },
    );
  }

  const messages: readonly ChatMessage[] = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt },
  ];

  const result = await chat(messages, {
    // optional overrides; otherwise defaults from env
    // model: 'llama-3.3-70b-versatile',
    // temperature: 0.65,
    // maxTokens: 128,
  });

  return NextResponse.json({ text: result.text });
}
