/**
 * Attempt to parse JSON from a string that may contain markdown backticks
 * or surrounding text. Tries multiple strategies.
 */
export function tryParseJson(text: string): Record<string, unknown> | null {
  // Strategy 1: Direct parse
  try {
    return JSON.parse(text);
  } catch {
    // continue
  }

  // Strategy 2: Strip markdown code fences (```json ... ``` or ``` ... ```)
  const fenceRegex = /```(?:json)?\s*\n?([\s\S]*?)\n?\s*```/;
  const fenceMatch = text.match(fenceRegex);
  if (fenceMatch) {
    try {
      return JSON.parse(fenceMatch[1].trim());
    } catch {
      // continue
    }
  }

  // Strategy 3: Find the first { ... } block (greedy)
  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace > firstBrace) {
    const jsonCandidate = text.slice(firstBrace, lastBrace + 1);
    try {
      return JSON.parse(jsonCandidate);
    } catch {
      // continue
    }
  }

  // Strategy 4: Try each text block individually (for multi-block responses)
  const blocks = text.split("\n\n");
  for (const block of blocks) {
    const trimmed = block.trim();
    if (trimmed.startsWith("{")) {
      try {
        return JSON.parse(trimmed);
      } catch {
        // continue
      }
    }
  }

  return null;
}
