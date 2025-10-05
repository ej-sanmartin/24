/**
 * Calls Meta Llama API with system and user prompts.
 * Parses response and extracts JSON metadata footer.
 * @param systemPrompt - Full system prompt with game state
 * @param userMessage - Player's interrogation line
 * @returns Parsed response with suspect reply and metadata
 */
export async function callMetaLlama(
  systemPrompt: string,
  userMessage: string
): Promise<{
  response: string;
  meta: {next_emotion: string; confession_progress: number};
}> {
  const apiKey = process.env.AI_API_KEY;
  const model = process.env.AI_MODEL || 'llama-3.1-8b-instruct';

  if (!apiKey) {
    throw new Error('AI_API_KEY not configured');
  }

  const response = await fetch(
    'https://api.llama.com/v1/chat/completions',
    {
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
    }
  );

  if (!response.ok) {
    throw new Error(`Meta API error: ${response.statusText}`);
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
      return {
        response: textBeforeJson || 'I have nothing more to say.',
        meta: {
          next_emotion: meta.next_emotion || 'neutral',
          confession_progress: meta.confession_progress || 0,
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