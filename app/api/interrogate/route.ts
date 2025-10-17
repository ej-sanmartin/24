/**
 * SECURITY: This API route runs SERVER-SIDE ONLY on Vercel Edge Functions.
 * - API keys are stored in environment variables, never exposed to client
 * - Client sends only game state (no API access)
 * - All AI provider calls happen server-side via lib/ai.ts
 * - Prevents API key theft, unauthorized usage, and client-side tampering
 */

import {NextRequest, NextResponse} from 'next/server';
import {callMetaLlama, chat, type ChatMessage} from '@/lib/ai';
import {buildSystemPrompt} from '@/lib/prompt';

type ConversationEntry = {
  role: 'player' | 'suspect';
  content: string;
};

type MemoryState = {
  summary: string;
  ledger: string[];
};

interface InterrogateRequest {
  name: {first: string; last: string};
  crimeSpec: string;
  alibiSpec: string;
  motiveKnown: boolean;
  opportunityKnown: boolean;
  inconsistencyFound: boolean;
  confessionProgress: number;
  currentEmotion: string;
  lastPlayerMove: string;
  accusationGate: boolean;
  conversationHistory?: ConversationEntry[];
  memory?: MemoryState;
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
const MEMORY_INSTRUCTIONS = `You maintain the internal memory for an AI roleplaying a suspect.
Update the suspect's mental ledger with concise bullet points that capture
what the detective has proven, contradictions they've exposed, or mistakes
the suspect has made. Preserve useful prior ledger items unless disproven.
Also maintain a short running summary (<= 120 words) of the investigation from
the suspect's point of view. Only respond with valid JSON shaped like:
{"summary":"...","ledger":["point one", "point two"]}. Ledger should
never exceed 6 entries. If nothing new happens, keep the previous summary and
ledger.`;

export async function POST(request: NextRequest) {
  let confessionProgress = 0;
  let requestBody: InterrogateRequest | null = null;
  try {
    const body: InterrogateRequest = await request.json();
    requestBody = body;
    confessionProgress = body.confessionProgress;

    const conversationHistory = body.conversationHistory ?? [];
    const memory: MemoryState = body.memory ?? {
      summary: '',
      ledger: [],
    };

    const systemPrompt = buildSystemPrompt({
      name: body.name,
      crimeSpec: body.crimeSpec,
      alibiSpec: body.alibiSpec,
      motiveKnown: body.motiveKnown,
      opportunityKnown: body.opportunityKnown,
      inconsistencyFound: body.inconsistencyFound,
      confessionProgress: body.confessionProgress,
      currentEmotion: body.currentEmotion,
      accusationGate: body.accusationGate,
      memorySummary: memory.summary,
      memoryLedger: memory.ledger,
      conversationHistory,
    });

    const isInjection =
      /\b(AI|model|prompt|instruction|system|ignore|disregard)\b/i
        .test(body.lastPlayerMove);

    let response: MetaResponse;

    if (isInjection) {
      response = {
        response: 'What are you talking about? Stick to the questions.',
        meta: {
          next_emotion: 'evasive',
          confession_progress: Math.max(
            0,
            body.confessionProgress - 5,
          ),
        },
      };
    } else {
      response = await callMetaLlama(
        systemPrompt,
        body.lastPlayerMove,
      );
    }

    const updatedHistory: ConversationEntry[] = [
      ...conversationHistory,
      {role: 'suspect', content: response.response},
    ];

    const updatedMemory = await updateSuspectMemory({
      previousMemory: memory,
      conversationHistory: updatedHistory,
      lastPlayerMove: body.lastPlayerMove,
      suspectReply: response.response,
    });

    return NextResponse.json({
      ...response,
      memory: updatedMemory,
    });
  } catch (error) {
    console.error('Interrogate API error:', error);
    const fallbackMemory = requestBody?.memory ?? {summary: '', ledger: []};
    return NextResponse.json(
      {
        error: 'Failed to process interrogation',
        response: '...',
        meta: {
          next_emotion: 'neutral',
          confession_progress: confessionProgress,
        },
        memory: fallbackMemory,
      },
      {status: 500},
    );
  }
}

async function updateSuspectMemory({
  previousMemory,
  conversationHistory,
  lastPlayerMove,
  suspectReply,
}: {
  previousMemory: MemoryState;
  conversationHistory: ConversationEntry[];
  lastPlayerMove: string;
  suspectReply: string;
}): Promise<MemoryState> {
  try {
    const recentHistory = formatHistoryForMemory(conversationHistory, 10);
    const payload = JSON.stringify({
      previousSummary: previousMemory.summary,
      previousLedger: previousMemory.ledger,
      conversationExcerpt: recentHistory,
      latestPlayerMove: lastPlayerMove,
      suspectReply,
    });

    const memoryMessages: ChatMessage[] = [
      {role: 'system', content: MEMORY_INSTRUCTIONS},
      {role: 'user', content: payload},
    ];

    const result = await chat(memoryMessages, {
      temperature: 0.2,
      maxTokens: 256,
    });

    const parsed = parseMemoryResponse(result.text);

    if (!parsed) {
      return previousMemory;
    }

    return {
      summary: parsed.summary || previousMemory.summary,
      ledger: sanitizeLedger(parsed.ledger, previousMemory.ledger),
    };
  } catch (error) {
    console.error('Failed to update suspect memory:', error);
    return previousMemory;
  }
}

function formatHistoryForMemory(
  history: ConversationEntry[],
  maxEntries: number,
): string {
  return history
    .slice(Math.max(history.length - maxEntries, 0))
    .map((entry) => {
      const speaker = entry.role === 'player' ? 'Detective' : 'Suspect';
      return `${speaker}: ${entry.content}`;
    })
    .join('\n');
}

function parseMemoryResponse(text: string):
  | {summary?: string; ledger?: unknown}
  | null {
  const trimmed = text.trim();
  try {
    return JSON.parse(trimmed);
  } catch (error) {
    const jsonMatch = trimmed.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[0]);
      } catch (e) {
        console.error('Failed to parse matched memory JSON:', e);
      }
    }
    console.error('Memory response was not valid JSON:', text);
    return null;
  }
}

function sanitizeLedger(
  proposed: unknown,
  fallback: string[],
): string[] {
  if (!Array.isArray(proposed)) {
    return fallback;
  }

  const cleaned = proposed
    .map((entry) => {
      if (typeof entry === 'string') {
        return entry.trim();
      }
      if (entry == null) {
        return '';
      }
      return String(entry).trim();
    })
    .filter((entry) => entry.length > 0)
    .slice(0, 6);

  return cleaned.length > 0 ? cleaned : fallback;
}
