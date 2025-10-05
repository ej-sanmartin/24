/**
 * SECURITY: This API route runs SERVER-SIDE ONLY on Vercel Edge Functions.
 * - API keys are stored in environment variables, never exposed to client
 * - Client sends only game state (no API access)
 * - All AI provider calls happen server-side via lib/ai.ts
 * - Prevents API key theft, unauthorized usage, and client-side tampering
 */

import {NextRequest, NextResponse} from 'next/server';
import {callMetaLlama} from '@/lib/ai';
import {buildSystemPrompt} from '@/lib/prompt';

interface InterrogateRequest {
  name: {first: string; last: string};
  crimeSpec: string;
  alibiSpec: string;
  motiveKnown: boolean;
  opportunityKnown: boolean;
  inconsistencyFound: boolean;
  confession_progress: number;
  current_emotion: string;
  last_player_move: string;
  accusation_gate: boolean;
}

interface MetaResponse {
  response: string;
  meta: {
    next_emotion: string;
    confession_progress: number;
  };
}

/**
 * Handles interrogation API calls to Meta Llama.
 * Processes player input and returns suspect response with metadata.
 * @param request - Next.js request object
 * @returns JSON response with suspect reply and game state updates
 */
export async function POST(request: NextRequest) {
  try {
    const body: InterrogateRequest = await request.json();

    const systemPrompt = buildSystemPrompt(body);

    const isInjection = 
      /\b(AI|model|prompt|instruction|system|ignore|disregard)\b/i
        .test(body.last_player_move);

    let response: MetaResponse;

    if (isInjection) {
      response = {
        response: 'What are you talking about? Stick to the questions.',
        meta: {
          next_emotion: 'evasive',
          confession_progress: Math.max(
            0, 
            body.confession_progress - 5
          ),
        },
      };
    } else {
      response = await callMetaLlama(
        systemPrompt, 
        body.last_player_move
      );
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Interrogate API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to process interrogation',
        response: '...',
        meta: {
          next_emotion: 'neutral',
          confession_progress: 0,
        },
      },
      {status: 500}
    );
  }
}