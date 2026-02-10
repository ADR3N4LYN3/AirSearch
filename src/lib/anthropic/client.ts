import type { SearchResponse } from "../types";
import { mapApiResponse } from "./response-mapper";

interface CallOptions {
  useTools?: boolean;
  timeout?: number;
}

export async function callAnthropic(
  prompt: string,
  options: CallOptions = {}
): Promise<SearchResponse> {
  const { useTools = true, timeout = 30000 } = options;
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey || !apiKey.startsWith('sk-ant-')) {
    console.error('[Security] API key missing or invalid format');
    return {
      success: false,
      error: "Service temporairement indisponible. Contactez le support.",
    };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const body: Record<string, unknown> = {
      model: "claude-sonnet-4-20250514",
      max_tokens: useTools ? 5000 : 4000,
      messages: [{ role: "user", content: prompt }],
    };

    if (useTools) {
      body.tools = [
        {
          type: "web_search_20250305",
          name: "web_search",
          max_uses: 8,
        },
      ];
    }

    const MAX_RETRIES = 2;
    let response: Response | null = null;

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) break;

      const isRetryable = response.status === 429 || response.status >= 500;
      if (!isRetryable || attempt === MAX_RETRIES) {
        clearTimeout(timeoutId);
        await response.text();
        console.error(
          `[Anthropic API] HTTP ${response.status} - Request ID: ${response.headers.get('request-id') || 'N/A'}`
        );
        return {
          success: false,
          error: "Service de recherche temporairement indisponible. Réessayez dans quelques instants.",
        };
      }

      // Exponential backoff: 1s, 2s
      const delay = 1000 * (attempt + 1);
      console.warn(`[Anthropic API] HTTP ${response.status}, retrying in ${delay}ms (attempt ${attempt + 1}/${MAX_RETRIES})`);
      await new Promise((r) => setTimeout(r, delay));
    }

    clearTimeout(timeoutId);

    if (!response || !response.ok) {
      return {
        success: false,
        error: "Service de recherche temporairement indisponible. Réessayez dans quelques instants.",
      };
    }

    const data = await response.json();

    // Extract text blocks from the multi-block response
    const textBlocks: string[] = [];

    if (data.content && Array.isArray(data.content)) {
      for (const block of data.content) {
        if (block.type === "text" && typeof block.text === "string") {
          textBlocks.push(block.text);
        }
      }
    }

    if (textBlocks.length === 0) {
      return {
        success: false,
        rawText: JSON.stringify(data.content),
        error: "Aucune réponse textuelle reçue de l'API.",
      };
    }

    const rawText = textBlocks.join("\n");
    return mapApiResponse(rawText);
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof Error && error.name === 'AbortError') {
      console.error("[Anthropic API] Request timeout after 30s");
      return {
        success: false,
        error: "La recherche a pris trop de temps. Veuillez réessayer avec des critères plus précis.",
      };
    }

    console.error("[Anthropic API] Unexpected error:", error instanceof Error ? error.message : 'Unknown error');
    return {
      success: false,
      error: "Erreur inattendue lors de l'appel à l'API. Veuillez réessayer.",
    };
  }
}
