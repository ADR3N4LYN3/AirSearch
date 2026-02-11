import { describe, it, expect } from 'vitest';
import { tryParseJson } from '../json-parser';

describe('tryParseJson', () => {
  describe('Valid JSON parsing', () => {
    it('should parse pure JSON', () => {
      const json = '{"name": "Test", "value": 42}';
      const result = tryParseJson(json);

      expect(result).toEqual({ name: 'Test', value: 42 });
    });

    it('should parse JSON with nested objects', () => {
      const json = '{"user": {"name": "Alice", "age": 30}, "active": true}';
      const result = tryParseJson(json);

      expect(result).toEqual({
        user: { name: 'Alice', age: 30 },
        active: true,
      });
    });

    it('should parse JSON with arrays', () => {
      const json = '{"items": ["a", "b", "c"], "count": 3}';
      const result = tryParseJson(json);

      expect(result).toEqual({
        items: ['a', 'b', 'c'],
        count: 3,
      });
    });
  });

  describe('JSON in markdown code blocks', () => {
    it('should parse JSON in markdown code blocks with json tag', () => {
      const text = '```json\n{"name": "Test", "value": 42}\n```';
      const result = tryParseJson(text);

      expect(result).toEqual({ name: 'Test', value: 42 });
    });

    it('should parse JSON in markdown code blocks without json tag', () => {
      const text = '```\n{"name": "Test", "value": 42}\n```';
      const result = tryParseJson(text);

      expect(result).toEqual({ name: 'Test', value: 42 });
    });

    it('should parse JSON in code blocks with extra whitespace', () => {
      const text = '```json\n\n  {"name": "Test", "value": 42}  \n\n```';
      const result = tryParseJson(text);

      expect(result).toEqual({ name: 'Test', value: 42 });
    });

    it('should parse JSON in code blocks without newlines', () => {
      const text = '```json{"name": "Test"}```';
      const result = tryParseJson(text);

      expect(result).toEqual({ name: 'Test' });
    });
  });

  describe('JSON surrounded by text', () => {
    it('should extract JSON from text with prefix', () => {
      const text = 'Here is the result: {"name": "Test", "value": 42}';
      const result = tryParseJson(text);

      expect(result).toEqual({ name: 'Test', value: 42 });
    });

    it('should extract JSON from text with suffix', () => {
      const text = '{"name": "Test", "value": 42} - this is the result';
      const result = tryParseJson(text);

      expect(result).toEqual({ name: 'Test', value: 42 });
    });

    it('should extract JSON from text with both prefix and suffix', () => {
      const text = 'The data is: {"name": "Test", "value": 42} as requested.';
      const result = tryParseJson(text);

      expect(result).toEqual({ name: 'Test', value: 42 });
    });

    it('should extract JSON with nested braces', () => {
      const text = 'Result: {"outer": {"inner": {"deep": "value"}}}';
      const result = tryParseJson(text);

      expect(result).toEqual({
        outer: { inner: { deep: 'value' } },
      });
    });
  });

  describe('JSON with nested braces', () => {
    it('should parse deeply nested objects', () => {
      const json = '{"a": {"b": {"c": {"d": "value"}}}}';
      const result = tryParseJson(json);

      expect(result).toEqual({
        a: { b: { c: { d: 'value' } } },
      });
    });

    it('should parse objects with multiple nested levels', () => {
      const json = '{"results": [{"name": "A", "data": {"x": 1}}, {"name": "B", "data": {"y": 2}}]}';
      const result = tryParseJson(json);

      expect(result).toEqual({
        results: [
          { name: 'A', data: { x: 1 } },
          { name: 'B', data: { y: 2 } },
        ],
      });
    });
  });

  describe('Multiple text blocks separated by newlines', () => {
    it('should parse JSON from first valid block', () => {
      const text = 'Some text here\n\n{"name": "Test", "value": 42}\n\nMore text';
      const result = tryParseJson(text);

      expect(result).toEqual({ name: 'Test', value: 42 });
    });

    it('should parse JSON from second block if first is invalid', () => {
      const text = 'Invalid block\n\n{"name": "Test", "value": 42}\n\nMore';
      const result = tryParseJson(text);

      expect(result).toEqual({ name: 'Test', value: 42 });
    });

    it('should parse JSON from standalone block', () => {
      const text = 'Introduction text.\n\n{"summary": "Result", "count": 5}\n\nConclusion.';
      const result = tryParseJson(text);

      expect(result).toEqual({ summary: 'Result', count: 5 });
    });
  });

  describe('Invalid input', () => {
    it('should return null for plain text without JSON', () => {
      const text = 'This is just plain text with no JSON';
      const result = tryParseJson(text);

      expect(result).toBeNull();
    });

    it('should return null for malformed JSON', () => {
      const text = '{name: "Test", value: 42}'; // missing quotes
      const result = tryParseJson(text);

      expect(result).toBeNull();
    });

    it('should return null for incomplete JSON', () => {
      const text = '{"name": "Test", "value":';
      const result = tryParseJson(text);

      expect(result).toBeNull();
    });

    it('should return null for empty string', () => {
      const result = tryParseJson('');

      expect(result).toBeNull();
    });

    it('should return null for only braces', () => {
      const result = tryParseJson('{}{}');

      // '{}{}' is not valid JSON — parser returns null
      expect(result).toBeNull();
    });
  });

  describe('Real-world AI responses', () => {
    it('should parse JSON from typical Claude response', () => {
      const text = `Voici les résultats de votre recherche:

\`\`\`json
{
  "summary": "5 logements trouvés à Paris",
  "results": [
    {
      "title": "Appartement cosy",
      "price": "80€/nuit",
      "platform": "Airbnb"
    }
  ]
}
\`\`\`

J'espère que cela vous aide!`;

      const result = tryParseJson(text);

      expect(result).toEqual({
        summary: '5 logements trouvés à Paris',
        results: [
          {
            title: 'Appartement cosy',
            price: '80€/nuit',
            platform: 'Airbnb',
          },
        ],
      });
    });

    it('should parse JSON with special characters in values', () => {
      const text = `{"title": "Maison à Saint-Jean-de-Luz", "description": "Vue sur l'océan"}`;
      const result = tryParseJson(text);

      expect(result).toEqual({
        title: 'Maison à Saint-Jean-de-Luz',
        description: "Vue sur l'océan",
      });
    });
  });
});
