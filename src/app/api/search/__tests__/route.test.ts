import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from '../route';
import { NextRequest } from 'next/server';

// Mock the anthropic module
vi.mock('@/lib/anthropic', () => ({
  buildSearchPrompt: vi.fn(() => 'mock prompt'),
  callAnthropic: vi.fn(async () => ({
    success: true,
    data: {
      summary: 'Test summary',
      results: [],
      tips: 'Test tips',
    },
  })),
}));

// Mock the scraper module to avoid Playwright dependency in tests
vi.mock('@/lib/scraper', () => ({
  buildSearchUrls: vi.fn(() => []),
  scrapeAllPlatforms: vi.fn(async () => []),
  buildAnalysisPrompt: vi.fn(() => 'mock analysis prompt'),
}));

describe('POST /api/search', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return 400 for invalid JSON', async () => {
    const request = new NextRequest('http://localhost/api/search', {
      method: 'POST',
      body: 'invalid json',
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.error).toContain('JSON invalide');
  });

  it('should return 400 if destination is missing', async () => {
    const request = new NextRequest('http://localhost/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toContain('destination');
  });

  it('should return 400 if destination is empty', async () => {
    const request = new NextRequest('http://localhost/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ destination: '   ' }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toContain('vide');
  });

  it('should return 400 if destination exceeds 200 chars', async () => {
    const longDest = 'a'.repeat(201);
    const request = new NextRequest('http://localhost/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ destination: longDest }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toContain('200 caractères');
  });

  it('should return 400 if adults is out of range', async () => {
    const request = new NextRequest('http://localhost/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ destination: 'Paris', adults: 50 }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toContain('entre 1 et 16');
  });

  it('should return 400 if budgetMin > budgetMax', async () => {
    const request = new NextRequest('http://localhost/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        destination: 'Paris',
        budgetMin: 200,
        budgetMax: 100,
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toContain('minimum');
  });

  it('should return 400 if extraNotes exceeds 500 chars', async () => {
    const longNotes = 'a'.repeat(501);
    const request = new NextRequest('http://localhost/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        destination: 'Paris',
        extraNotes: longNotes,
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toContain('500 caractères');
  });

  it('should return 200 with valid minimal request', async () => {
    const request = new NextRequest('http://localhost/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ destination: 'Paris' }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data).toBeDefined();
  });

  it('should return 200 with full request', async () => {
    const request = new NextRequest('http://localhost/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        destination: 'Paris',
        checkin: '2024-06-01',
        checkout: '2024-06-10',
        adults: 2,
        children: 1,
        infants: 0,
        budgetMin: 50,
        budgetMax: 150,
        propertyType: 'apartment',
        amenities: ['wifi', 'kitchen'],
        extraNotes: 'Near metro',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
  });

  it('should enforce rate limiting', async () => {
    const headers = { 'Content-Type': 'application/json', 'x-real-ip': '1.2.3.4' };
    const body = JSON.stringify({ destination: 'Paris' });

    // Make 10 requests (should succeed)
    for (let i = 0; i < 10; i++) {
      const request = new NextRequest('http://localhost/api/search', {
        method: 'POST',
        headers,
        body,
      });
      const response = await POST(request);
      expect(response.status).toBe(200);
    }

    // 11th request should be rate limited
    const request = new NextRequest('http://localhost/api/search', {
      method: 'POST',
      headers,
      body,
    });
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(429);
    expect(data.error).toContain('Trop de requêtes');
  });
});
