import { describe, it, expect, vi, beforeEach } from 'vitest';
import { callAnthropic } from '../anthropic';

// Mock fetch globally
global.fetch = vi.fn();

describe('callAnthropic', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.unstubAllEnvs();
  });

  it('should return error if API key is missing', async () => {
    vi.stubEnv('ANTHROPIC_API_KEY', '');

    const result = await callAnthropic('test prompt');

    expect(result.success).toBe(false);
    expect(result.error).toContain('indisponible');
  });

  it('should return error if API key format is invalid', async () => {
    vi.stubEnv('ANTHROPIC_API_KEY', 'invalid-key');

    const result = await callAnthropic('test prompt');

    expect(result.success).toBe(false);
    expect(result.error).toContain('indisponible');
  });

  it('should call API with correct parameters', async () => {
    vi.stubEnv('ANTHROPIC_API_KEY', 'sk-ant-test123');

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      headers: new Map(),
      json: async () => ({
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              summary: 'Test summary',
              results: [],
              tips: 'Test tips',
            }),
          },
        ],
      }),
    });

    await callAnthropic('test prompt');

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.anthropic.com/v1/messages',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'x-api-key': 'sk-ant-test123',
        }),
        body: expect.stringContaining('test prompt'),
      })
    );
  });

  it('should use reduced token limits', async () => {
    vi.stubEnv('ANTHROPIC_API_KEY', 'sk-ant-test123');

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      headers: new Map(),
      json: async () => ({
        content: [{ type: 'text', text: '{"summary":"","results":[],"tips":""}' }],
      }),
    });

    await callAnthropic('test');

    const callArgs = (global.fetch as any).mock.calls[0][1];
    const body = JSON.parse(callArgs.body);

    expect(body.max_tokens).toBe(5000); // useTools=true → 5000
    expect(body.tools[0].max_uses).toBe(8); // web_search max_uses
  });

  it('should handle timeout', async () => {
    vi.stubEnv('ANTHROPIC_API_KEY', 'sk-ant-test123');

    (global.fetch as any).mockImplementation(() =>
      new Promise((_, reject) => {
        const error = new Error('Timeout');
        error.name = 'AbortError';
        setTimeout(() => reject(error), 100);
      })
    );

    const result = await callAnthropic('test');

    expect(result.success).toBe(false);
    expect(result.error).toContain('trop de temps');
  });

  it('should handle API errors gracefully', async () => {
    vi.stubEnv('ANTHROPIC_API_KEY', 'sk-ant-test123');

    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 500,
      headers: new Map([['request-id', 'req-123']]),
      text: async () => 'Internal Server Error',
    });

    const result = await callAnthropic('test');

    expect(result.success).toBe(false);
    expect(result.error).toContain('temporairement indisponible');
  });

  it('should parse JSON response correctly', async () => {
    vi.stubEnv('ANTHROPIC_API_KEY', 'sk-ant-test123');

    const mockResponse = {
      summary: 'Found 3 apartments in Paris',
      results: [
        {
          title: 'Cozy Studio',
          location: 'Marais, Paris',
          price: '80€/nuit',
          description: 'Beautiful studio',
          highlights: ['WiFi', 'Kitchen'],
          url: 'https://example.com',
        },
      ],
      tips: 'Best time to visit is spring',
    };

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      headers: new Map(),
      json: async () => ({
        content: [{ type: 'text', text: JSON.stringify(mockResponse) }],
      }),
    });

    const result = await callAnthropic('test');

    expect(result.success).toBe(true);
    expect(result.data?.summary).toBe('Found 3 apartments in Paris');
    expect(result.data?.results).toHaveLength(1);
    expect(result.data?.results[0].title).toBe('Cozy Studio');
  });
});
