/**
 * Calls the configured AI provider (Meta Llama or Groq) with system
 * and user prompts. Parses response and extracts JSON metadata footer.
 * This function runs SERVER-SIDE ONLY via API routes for security.
 * @param systemPrompt - Full system prompt with game state
 * @param userMessage - Player's interrogation line
 * @returns Parsed response with suspect reply and metadata
 */
export async function callMetaLlama(
  systemPrompt: string,
  userMessage: string,
): Promise<{
  response: string;
  meta: {next_emotion: string; confession_progress: number};
}> {
  const apiKey = process.env.AI_API_KEY;
  const provider = process.env.AI_PROVIDER || 'meta';

  // Default models per provider
  const defaultModels = {
    meta: 'llama-3.1-8b-instruct',
    groq: 'llama-3.1-8b-instant',
  };

  const model = process.env.AI_MODEL ||
    defaultModels[provider as keyof typeof defaultModels];

  if (!apiKey) {
    throw new Error('AI_API_KEY not configured');
  }

  // Provider-specific endpoints
  const endpoints = {
    meta: 'https://api.llama.com/v1/chat/completions',
    groq: 'https://api.groq.com/openai/v1/chat/completions',
  };

  const apiUrl =
    endpoints[provider as keyof typeof endpoints] || endpoints.meta;

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: model,
      messages: [
        {role: 'system', content: systemPrompt},
        {role: 'user', content: userMessage},
      ],
      temperature: 0.65,
      max_tokens: 128,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `${provider.toUpperCase()} API error: ` +
      `${response.statusText} - ${errorText}`,
    );
  }

  const data = await response.json();
  const fullText = data.choices[0].message.content;

  return parseResponse(fullText);
}

/**
 * Parses AI response text and extracts JSON metadata footer.
 * @param text - Raw response from AI model
 * @returns Structured response with text and metadata
 */
function parseResponse(text: string): {
  response: string;
  meta: {next_emotion: string; confession_progress: number};
} {
  const jsonMatch = text.match(/\{[^}]*"next_emotion"[^}]*\}/);

  if (jsonMatch) {
    const jsonStr = jsonMatch[0];
    const textBeforeJson = text.substring(0, text.indexOf(jsonStr)).trim();

    try {
      const meta = JSON.parse(jsonStr);
      const confessionProgressValue =
        meta.confession_progress ?? meta.confessionProgress ?? 0;

      return {
        response: textBeforeJson || 'I have nothing more to say.',
        meta: {
          next_emotion: meta.next_emotion || 'neutral',
          confession_progress: confessionProgressValue,
        },
      };
    } catch (e) {
      console.error('Failed to parse JSON footer:', e);
    }
  }

  return {
    response: text.trim() || '...',
    meta: {
      next_emotion: 'neutral',
      confession_progress: 0,
    },
  };
}
