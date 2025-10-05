import {
  ChatMessage,
  ChatOptions,
  ChatResult,
  ProviderClient,
} from '../types';
import {
  AI_API_KEY,
  AI_MODEL,
  AI_TEMPERATURE,
  AI_MAX_TOKENS,
} from '../env';

/** Groq uses an OpenAI-compatible endpoint at:
 *  https://api.groq.com/openai/v1/chat/completions
 *  We keep baseURL inline to avoid extra env if provider is known.
 */
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const DEFAULT_MODEL = 'llama-3.3-70b-versatile';

type ChatChoice = {
  readonly message?: {
    readonly content?: string;
  };
};

type GroqChatResponse = {
  readonly choices?: readonly ChatChoice[];
};

export class GroqClient implements ProviderClient {
  async chat(
    messages: readonly ChatMessage[],
    options?: ChatOptions,
  ): Promise<ChatResult> {
    const model = options?.model ?? AI_MODEL ?? DEFAULT_MODEL;
    const temperature = options?.temperature ?? AI_TEMPERATURE;
    const maxTokens = options?.maxTokens ?? AI_MAX_TOKENS;

    const res = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        temperature,
        max_tokens: maxTokens,
        messages,
        ...(options?.stop ? {stop: options.stop} : {}),
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Groq error ${res.status}: ${body}`);
    }

    const data: GroqChatResponse = await res.json();
    const text = data.choices?.[0]?.message?.content ?? '';
    return {text};
  }
}
