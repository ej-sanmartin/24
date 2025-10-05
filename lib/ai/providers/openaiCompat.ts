import { ChatMessage, ChatOptions, ChatResult, ProviderClient } from '../types';
import { AI_API_KEY, AI_API_URL, AI_MODEL, AI_TEMPERATURE, AI_MAX_TOKENS } from '../env';

/** Generic OpenAI-compatible client (e.g., Meta Llama API later).
 *  Expect a Chat Completions schema at AI_API_URL (e.g. https://api.llama.com/v1/chat/completions)
 */
const DEFAULT_MODEL = 'llama-3.1-8b-instruct';

type ChatChoice = {
  readonly message?: {
    readonly content?: string;
  };
};

type OpenAICompatResponse = {
  readonly choices?: readonly ChatChoice[];
};

export class OpenAICompatClient implements ProviderClient {
  async chat(
    messages: readonly ChatMessage[],
    options?: ChatOptions,
  ): Promise<ChatResult> {
    const url = AI_API_URL!;
    const model = options?.model ?? AI_MODEL ?? DEFAULT_MODEL;
    const temperature = options?.temperature ?? AI_TEMPERATURE;
    const maxTokens = options?.maxTokens ?? AI_MAX_TOKENS;

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${AI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        temperature,
        max_tokens: maxTokens,
        messages,
        ...(options?.stop ? { stop: options.stop } : {}),
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`OpenAI-compat error ${res.status}: ${body}`);
    }

    const data: OpenAICompatResponse = await res.json();
    const text = data.choices?.[0]?.message?.content ?? '';
    return { text };
  }
}
