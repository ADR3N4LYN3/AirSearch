import { describe, it, expect } from 'vitest';
import { buildAnalysisPrompt } from '../prompt-builder';
import type { SearchRequest } from '../../types';
import type { ScrapeResult, ScrapedListing } from '../types';

describe('buildAnalysisPrompt', () => {
  const baseRequest: SearchRequest = {
    destination: 'Nice',
    checkin: '2026-06-15',
    checkout: '2026-06-22',
    adults: 2,
    children: 0,
    infants: 0,
    amenities: ['wifi', 'pool'],
    propertyType: 'apartment',
  };

  const createListing = (overrides?: Partial<ScrapedListing>): ScrapedListing => ({
    title: 'Test Listing',
    price: '100€/nuit',
    rating: 4.5,
    reviewCount: 50,
    url: 'https://example.com/listing',
    location: 'Nice',
    image: null,
    platform: 'Airbnb',
    ...overrides,
  });

  describe('Basic prompt generation', () => {
    it('should generate prompt with basic criteria', () => {
      const scrapeResults: ScrapeResult[] = [];
      const prompt = buildAnalysisPrompt(baseRequest, scrapeResults);

      expect(prompt).toContain('Tu es un assistant spécialisé dans la comparaison de locations de vacances');
      expect(prompt).toContain('Destination : Nice');
      expect(prompt).toContain('du 2026-06-15 au 2026-06-22');
      expect(prompt).toContain('2 adultes');
    });

    it('should include amenities in criteria', () => {
      const scrapeResults: ScrapeResult[] = [];
      const prompt = buildAnalysisPrompt(baseRequest, scrapeResults);

      expect(prompt).toContain('WiFi');
      expect(prompt).toContain('Piscine');
    });

    it('should include property type in criteria', () => {
      const scrapeResults: ScrapeResult[] = [];
      const prompt = buildAnalysisPrompt(baseRequest, scrapeResults);

      expect(prompt).toContain('Appartement');
    });
  });

  describe('Scraped data inclusion', () => {
    it('should include scraped listings in prompt', () => {
      const scrapeResults: ScrapeResult[] = [
        {
          platform: 'Airbnb',
          success: true,
          listings: [
            createListing({
              title: 'Villa moderne à Nice',
              price: '150€/nuit',
              rating: 4.8,
              reviewCount: 120,
            }),
          ],
        },
      ];

      const prompt = buildAnalysisPrompt(baseRequest, scrapeResults);

      expect(prompt).toContain('DONNÉES RÉELLES SCRAPÉES DEPUIS LES PLATEFORMES');
      expect(prompt).toContain('--- Airbnb');
      expect(prompt).toContain('Villa moderne à Nice');
      expect(prompt).toContain('150€/nuit');
      expect(prompt).toContain('4.8/5');
      expect(prompt).toContain('120 avis');
    });

    it('should include listings from multiple platforms', () => {
      const scrapeResults: ScrapeResult[] = [
        {
          platform: 'Airbnb',
          success: true,
          listings: [createListing({ title: 'Airbnb Listing' })],
        },
        {
          platform: 'Booking.com',
          success: true,
          listings: [createListing({ title: 'Booking Listing', platform: 'Booking.com' })],
        },
      ];

      const prompt = buildAnalysisPrompt(baseRequest, scrapeResults);

      expect(prompt).toContain('--- Airbnb');
      expect(prompt).toContain('--- Booking.com');
      expect(prompt).toContain('Airbnb Listing');
      expect(prompt).toContain('Booking Listing');
    });

    it('should handle listings with null price', () => {
      const scrapeResults: ScrapeResult[] = [
        {
          platform: 'Airbnb',
          success: true,
          listings: [
            createListing({
              title: 'Listing sans prix',
              price: null,
            }),
          ],
        },
      ];

      const prompt = buildAnalysisPrompt(baseRequest, scrapeResults);

      expect(prompt).toContain('Listing sans prix');
      expect(prompt).toContain('PRIX: NON DISPONIBLE');
    });

    it('should handle listings with null rating and reviewCount', () => {
      const scrapeResults: ScrapeResult[] = [
        {
          platform: 'Airbnb',
          success: true,
          listings: [
            createListing({
              title: 'Nouvelle annonce',
              rating: null,
              reviewCount: null,
            }),
          ],
        },
      ];

      const prompt = buildAnalysisPrompt(baseRequest, scrapeResults);

      expect(prompt).toContain('Nouvelle annonce');
      expect(prompt).not.toContain('/5');
      expect(prompt).not.toContain('avis');
    });
  });

  describe('MAX_LISTINGS_PER_PLATFORM limit', () => {
    it('should limit to 3 listings per platform', () => {
      const listings: ScrapedListing[] = [
        createListing({ title: 'Listing 1' }),
        createListing({ title: 'Listing 2' }),
        createListing({ title: 'Listing 3' }),
        createListing({ title: 'Listing 4' }),
        createListing({ title: 'Listing 5' }),
      ];

      const scrapeResults: ScrapeResult[] = [
        {
          platform: 'Airbnb',
          success: true,
          listings,
        },
      ];

      const prompt = buildAnalysisPrompt(baseRequest, scrapeResults);

      expect(prompt).toContain('Listing 1');
      expect(prompt).toContain('Listing 2');
      expect(prompt).toContain('Listing 3');
      expect(prompt).not.toContain('Listing 4');
      expect(prompt).not.toContain('Listing 5');
      expect(prompt).toContain('(3 annonces)');
    });

    it('should show actual count when less than 3 listings', () => {
      const scrapeResults: ScrapeResult[] = [
        {
          platform: 'Airbnb',
          success: true,
          listings: [
            createListing({ title: 'Listing 1' }),
            createListing({ title: 'Listing 2' }),
          ],
        },
      ];

      const prompt = buildAnalysisPrompt(baseRequest, scrapeResults);

      expect(prompt).toContain('(2 annonces)');
    });
  });

  describe('Failed platform handling', () => {
    it('should show failure message for failed platforms', () => {
      const scrapeResults: ScrapeResult[] = [
        {
          platform: 'Airbnb',
          success: false,
          listings: [],
          error: 'Timeout',
        },
      ];

      const prompt = buildAnalysisPrompt(baseRequest, scrapeResults);

      expect(prompt).toContain('--- Airbnb --- Échec du scraping');
    });

    it('should show failure for platforms with empty listings', () => {
      const scrapeResults: ScrapeResult[] = [
        {
          platform: 'Booking.com',
          success: true,
          listings: [],
        },
      ];

      const prompt = buildAnalysisPrompt(baseRequest, scrapeResults);

      // Should not show the platform section if no listings
      expect(prompt).not.toContain('--- Booking.com (0 annonces)');
    });

    it('should handle mix of successful and failed platforms', () => {
      const scrapeResults: ScrapeResult[] = [
        {
          platform: 'Airbnb',
          success: true,
          listings: [createListing({ title: 'Success' })],
        },
        {
          platform: 'Booking.com',
          success: false,
          listings: [],
          error: 'Network error',
        },
      ];

      const prompt = buildAnalysisPrompt(baseRequest, scrapeResults);

      expect(prompt).toContain('--- Airbnb');
      expect(prompt).toContain('Success');
      expect(prompt).toContain('--- Booking.com --- Échec du scraping');
    });
  });

  describe('JSON schema presence', () => {
    it('should include JSON schema in prompt', () => {
      const scrapeResults: ScrapeResult[] = [];
      const prompt = buildAnalysisPrompt(baseRequest, scrapeResults);

      expect(prompt).toContain('Ta réponse DOIT être uniquement du JSON pur');
      expect(prompt).toContain('"summary"');
      expect(prompt).toContain('"results"');
      expect(prompt).toContain('"title"');
      expect(prompt).toContain('"location"');
      expect(prompt).toContain('"price"');
      expect(prompt).toContain('"description"');
      expect(prompt).toContain('"highlights"');
      expect(prompt).toContain('"platform"');
      expect(prompt).toContain('"rating"');
      expect(prompt).toContain('"reviewCount"');
      expect(prompt).toContain('"url"');
    });

    it('should include instructions about selecting exactly 5 results', () => {
      const scrapeResults: ScrapeResult[] = [];
      const prompt = buildAnalysisPrompt(baseRequest, scrapeResults);

      expect(prompt).toContain('sélectionne EXACTEMENT 5 annonces');
      expect(prompt).toContain('ou toutes si moins de 5 disponibles');
    });

    it('should include price handling instructions', () => {
      const scrapeResults: ScrapeResult[] = [];
      const prompt = buildAnalysisPrompt(baseRequest, scrapeResults);

      expect(prompt).toContain('Le champ "price" DOIT reprendre le prix EXACT');
      expect(prompt).toContain('Ne JAMAIS inventer un prix');
      expect(prompt).toContain('Prix non disponible');
    });
  });

  describe('includeGeo: false option', () => {
    it('should NOT include GPS coordinates in prompt', () => {
      const requestWithGeo: SearchRequest = {
        ...baseRequest,
        lat: 43.7102,
        lng: 7.2620,
        radius: 10,
      };

      const scrapeResults: ScrapeResult[] = [];
      const prompt = buildAnalysisPrompt(requestWithGeo, scrapeResults);

      expect(prompt).not.toContain('Coordonnées GPS');
      expect(prompt).not.toContain('43.7102');
      expect(prompt).not.toContain('7.2620');
      expect(prompt).not.toContain('Rayon de recherche');
    });

    it('should include all other criteria even without geo', () => {
      const requestWithGeo: SearchRequest = {
        ...baseRequest,
        lat: 43.7102,
        lng: 7.2620,
        radius: 10,
      };

      const scrapeResults: ScrapeResult[] = [];
      const prompt = buildAnalysisPrompt(requestWithGeo, scrapeResults);

      expect(prompt).toContain('Destination : Nice');
      expect(prompt).toContain('2 adultes');
      expect(prompt).toContain('WiFi');
      expect(prompt).toContain('Piscine');
    });
  });

  describe('Geographic filtering instructions', () => {
    it('should instruct NOT to filter by distance', () => {
      const scrapeResults: ScrapeResult[] = [];
      const prompt = buildAnalysisPrompt(baseRequest, scrapeResults);

      expect(prompt).toContain('NE FILTRE PAS par distance géographique');
      expect(prompt).toContain('toutes les annonces fournies sont déjà dans la zone recherchée');
    });
  });

  describe('Value escaping', () => {
    it('should escape special characters in scraped values', () => {
      const scrapeResults: ScrapeResult[] = [
        {
          platform: 'Airbnb',
          success: true,
          listings: [
            createListing({
              title: 'Appartement "luxueux" avec vue',
              location: "Près de l'océan",
            }),
          ],
        },
      ];

      const prompt = buildAnalysisPrompt(baseRequest, scrapeResults);

      // Should remove quotes and keep text
      expect(prompt).toContain('Appartement luxueux avec vue');
      expect(prompt).toContain('Près de locéan');
    });

    it('should limit long values to 300 characters', () => {
      const longTitle = 'A'.repeat(400);
      const scrapeResults: ScrapeResult[] = [
        {
          platform: 'Airbnb',
          success: true,
          listings: [
            createListing({
              title: longTitle,
            }),
          ],
        },
      ];

      const prompt = buildAnalysisPrompt(baseRequest, scrapeResults);

      // Should be truncated to 300 chars
      expect(prompt).toContain('A'.repeat(300));
      expect(prompt).not.toContain('A'.repeat(301));
    });
  });
});
