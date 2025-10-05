import {ChatMessage, ChatOptions, ChatResult, ProviderClient} from './types';
import {AI_PROVIDER, assertServerEnv} from './env';
import {GroqClient} from './providers/groq';
import {OpenAICompatClient} from './providers/openaiCompat';

let client: ProviderClient | null = null;

function getClient(): ProviderClient {
  if (client) {
    return client;
  }

  assertServerEnv();
  switch (AI_PROVIDER) {
  case 'groq':
    client = new GroqClient();
    break;
  case 'openai_compat':
    client = new OpenAICompatClient();
    break;
  default:
    throw new Error(`Unsupported AI_PROVIDER: ${AI_PROVIDER}`);
  }
  return client;
}

function validateMessages(messages: readonly ChatMessage[]): void {
  if (!Array.isArray(messages) || messages.length === 0) {
    throw new Error('chat requires at least one message.');
  }

  for (const message of messages) {
    if (!message?.role || !message?.content) {
      throw new Error('Each message requires a role and content.');
    }
  }
}

export async function chat(
  messages: readonly ChatMessage[],
  options?: ChatOptions,
): Promise<ChatResult> {
  validateMessages(messages);
  return getClient().chat(messages, options);
}
