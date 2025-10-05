export type ChatMessageRole = 'system' | 'user' | 'assistant';

export interface ChatMessage {
  readonly role: ChatMessageRole;
  readonly content: string;
}

export interface ChatOptions {
  readonly model?: string;
  readonly temperature?: number;
  readonly maxTokens?: number;
  readonly stop?: readonly string[] | undefined;
}

export interface ChatResult {
  readonly text: string;
}

export interface ProviderClient {
  chat(
    messages: readonly ChatMessage[],
    options?: ChatOptions,
  ): Promise<ChatResult>;
}
