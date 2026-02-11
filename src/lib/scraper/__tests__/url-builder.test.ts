import { describe, it, expect } from 'vitest';
import { buildSearchUrls } from '../url-builder';
import type { SearchRequest } from '../../types';

describe('buildSearchUrls', () => {
  const baseRequest: SearchRequest = {
    destination: 'Paris',
    adults: 2,
    children: 0,
    infants: 0,
    amenities: [],
  };

  describe('Platform URLs generation', () => {
    it('should generate correct URLs for all 8 platforms', () => {
      const urls = buildSearchUrls(baseRequest);

      expect(urls).toHaveLength(8);

      const platforms = urls.map(u => u.platform);
      expect(platforms).toEqual([
        'Airbnb',
        'Booking.com',
        'Vrbo',
        'Holidu',
        'HomeToGo',
        'Expedia',
        'Hotels.com',
        'Gîtes de France',
      ]);
    });

    it('should point to correct domains', () => {
      const urls = buildSearchUrls(baseRequest);

      expect(urls[0].url).toContain('airbnb.fr');
      expect(urls[1].url).toContain('booking.com');
      expect(urls[2].url).toContain('vrbo.com');
      expect(urls[3].url).toContain('holidu.fr');
      expect(urls[4].url).toContain('hometogo.fr');
      expect(urls[5].url).toContain('expedia.fr');
      expect(urls[6].url).toContain('hotels.com');
    });
  });

  describe('Date parameters', () => {
    it('should include checkin and checkout when both are provided', () => {
      const request: SearchRequest = {
        ...baseRequest,
        checkin: '2026-03-15',
        checkout: '2026-03-22',
      };

      const urls = buildSearchUrls(request);

      // Airbnb
      expect(urls[0].url).toContain('checkin=2026-03-15');
      expect(urls[0].url).toContain('checkout=2026-03-22');

      // Booking.com
      expect(urls[1].url).toContain('checkin=2026-03-15');
      expect(urls[1].url).toContain('checkout=2026-03-22');

      // Vrbo
      expect(urls[2].url).toContain('startDate=2026-03-15');
      expect(urls[2].url).toContain('endDate=2026-03-22');
    });

    it('should work with only checkin date', () => {
      const request: SearchRequest = {
        ...baseRequest,
        checkin: '2026-03-15',
      };

      const urls = buildSearchUrls(request);

      expect(urls[0].url).toContain('checkin=2026-03-15');
      expect(urls[0].url).not.toContain('checkout');
    });

    it('should work with only checkout date', () => {
      const request: SearchRequest = {
        ...baseRequest,
        checkout: '2026-03-22',
      };

      const urls = buildSearchUrls(request);

      expect(urls[0].url).toContain('checkout=2026-03-22');
      expect(urls[0].url).not.toContain('checkin');
    });

    it('should work without any dates', () => {
      const urls = buildSearchUrls(baseRequest);

      expect(urls[0].url).not.toContain('checkin');
      expect(urls[0].url).not.toContain('checkout');
      expect(urls[0].url).toContain('adults=2');
    });
  });

  describe('Destination encoding', () => {
    it('should encode special characters in destination', () => {
      const request: SearchRequest = {
        ...baseRequest,
        destination: 'Saint-Jean-de-Luz',
      };

      const urls = buildSearchUrls(request);

      // Airbnb uses encoded destination in path
      expect(urls[0].url).toContain('Saint-Jean-de-Luz');
      expect(urls[0].url).toContain(encodeURIComponent('Saint-Jean-de-Luz'));
    });

    it('should encode accents in destination', () => {
      const request: SearchRequest = {
        ...baseRequest,
        destination: 'Côte d\'Azur',
      };

      const urls = buildSearchUrls(request);

      const encoded = encodeURIComponent('Côte d\'Azur');

      // Airbnb uses encoded in path
      expect(urls[0].url).toContain(encoded);

      // Booking.com uses raw in query param (URLSearchParams handles encoding)
      expect(urls[1].url).toContain('ss=C');
    });

    it('should encode spaces in destination', () => {
      const request: SearchRequest = {
        ...baseRequest,
        destination: 'Mont Saint-Michel',
      };

      const urls = buildSearchUrls(request);

      const encoded = encodeURIComponent('Mont Saint-Michel');

      // Airbnb encodes in path
      expect(urls[0].url).toContain(encoded);
    });
  });

  describe('Children and infants parameters', () => {
    it('should include children parameter when children > 0', () => {
      const request: SearchRequest = {
        ...baseRequest,
        children: 2,
      };

      const urls = buildSearchUrls(request);

      // Airbnb
      expect(urls[0].url).toContain('children=2');

      // Booking.com
      expect(urls[1].url).toContain('group_children=2');

      // Vrbo
      expect(urls[2].url).toContain('children=2');
    });

    it('should not include children parameter when children = 0', () => {
      const urls = buildSearchUrls(baseRequest);

      expect(urls[0].url).not.toContain('children');
      expect(urls[1].url).not.toContain('group_children');
      expect(urls[2].url).not.toContain('children');
    });

    it('should include infants parameter when infants > 0', () => {
      const request: SearchRequest = {
        ...baseRequest,
        infants: 1,
      };

      const urls = buildSearchUrls(request);

      // Airbnb (only platform that supports infants explicitly)
      expect(urls[0].url).toContain('infants=1');
    });

    it('should not include infants parameter when infants = 0', () => {
      const urls = buildSearchUrls(baseRequest);

      expect(urls[0].url).not.toContain('infants');
    });

    it('should handle multiple children and infants', () => {
      const request: SearchRequest = {
        ...baseRequest,
        children: 3,
        infants: 2,
      };

      const urls = buildSearchUrls(request);

      expect(urls[0].url).toContain('children=3');
      expect(urls[0].url).toContain('infants=2');
    });
  });

  describe('Budget parameters', () => {
    it('should include both min and max budget', () => {
      const request: SearchRequest = {
        ...baseRequest,
        budgetMin: 50,
        budgetMax: 150,
      };

      const urls = buildSearchUrls(request);

      // Airbnb
      expect(urls[0].url).toContain('price_min=50');
      expect(urls[0].url).toContain('price_max=150');
    });

    it('should include only min budget', () => {
      const request: SearchRequest = {
        ...baseRequest,
        budgetMin: 50,
      };

      const urls = buildSearchUrls(request);

      expect(urls[0].url).toContain('price_min=50');
      expect(urls[0].url).not.toContain('price_max');
    });

    it('should include only max budget', () => {
      const request: SearchRequest = {
        ...baseRequest,
        budgetMax: 150,
      };

      const urls = buildSearchUrls(request);

      expect(urls[0].url).toContain('price_max=150');
      expect(urls[0].url).not.toContain('price_min');
    });

    it('should work without budget constraints', () => {
      const urls = buildSearchUrls(baseRequest);

      expect(urls[0].url).not.toContain('price_min');
      expect(urls[0].url).not.toContain('price_max');
    });
  });

  describe('Complete request with all parameters', () => {
    it('should handle a fully populated search request', () => {
      const request: SearchRequest = {
        destination: 'Bordeaux',
        checkin: '2026-07-01',
        checkout: '2026-07-08',
        adults: 4,
        children: 2,
        infants: 1,
        budgetMin: 100,
        budgetMax: 200,
        amenities: ['wifi', 'pool'],
        propertyType: 'villa',
        extraNotes: 'Vue sur mer',
      };

      const urls = buildSearchUrls(request);

      expect(urls).toHaveLength(8);

      // Verify Airbnb has all parameters
      const airbnbUrl = urls[0].url;
      expect(airbnbUrl).toContain('Bordeaux');
      expect(airbnbUrl).toContain('checkin=2026-07-01');
      expect(airbnbUrl).toContain('checkout=2026-07-08');
      expect(airbnbUrl).toContain('adults=4');
      expect(airbnbUrl).toContain('children=2');
      expect(airbnbUrl).toContain('infants=1');
      expect(airbnbUrl).toContain('price_min=100');
      expect(airbnbUrl).toContain('price_max=200');
      expect(airbnbUrl).toContain('display_currency=EUR');
    });
  });

  describe('Currency settings', () => {
    it('should always set EUR currency for French platforms', () => {
      const urls = buildSearchUrls(baseRequest);

      expect(urls[0].url).toContain('display_currency=EUR');
      expect(urls[1].url).toContain('selected_currency=EUR');
      expect(urls[2].url).toContain('currency=EUR');
      expect(urls[3].url).toContain('currency=EUR');
      expect(urls[4].url).toContain('currency=EUR');
      expect(urls[5].url).toContain('currency=EUR');
      expect(urls[6].url).toContain('currency=EUR');
    });
  });
});
