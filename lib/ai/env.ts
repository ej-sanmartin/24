/* eslint-disable @typescript-eslint/no-non-null-assertion */
const toNumber = (v: string | undefined, fallback: number): number =>
  v ? Number(v) : fallback;

export const AI_PROVIDER = process.env.AI_PROVIDER ?? 'groq'; // 'groq' | 'openai_compat'
export const AI_API_URL = process.env.AI_API_URL; // required for openai_compat
export const AI_MODEL = process.env.AI_MODEL; // optional override
export const AI_API_KEY = process.env.AI_API_KEY!;
export const AI_TEMPERATURE = toNumber(process.env.AI_TEMPERATURE, 0.65);
export const AI_MAX_TOKENS = toNumber(process.env.AI_MAX_TOKENS, 128);

export function assertServerEnv(): void {
  if (!AI_API_KEY) {
    throw new Error('AI_API_KEY is required.');
  }
  if (AI_PROVIDER === 'openai_compat' && !AI_API_URL) {
    throw new Error('AI_API_URL is required for openai_compat.');
  }
}
