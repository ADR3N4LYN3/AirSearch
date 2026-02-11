import { describe, it, expect } from 'vitest';
import { formatCriteria } from '../format-criteria';
import type { SearchRequest } from '../types';

describe('formatCriteria', () => {
  const baseRequest: SearchRequest = {
    destination: 'Paris',
    adults: 2,
    children: 0,
    infants: 0,
    amenities: [],
  };

  describe('Destination formatting', () => {
    it('should format destination', () => {
      const result = formatCriteria(baseRequest);

      expect(result).toContain('- Destination : Paris');
    });

    it('should format destination with special characters', () => {
      const request: SearchRequest = {
        ...baseRequest,
        destination: 'Saint-Jean-de-Luz',
      };

      const result = formatCriteria(request);

      expect(result).toContain('- Destination : Saint-Jean-de-Luz');
    });
  });

  describe('Date formatting', () => {
    it('should format both checkin and checkout dates', () => {
      const request: SearchRequest = {
        ...baseRequest,
        checkin: '2026-06-15',
        checkout: '2026-06-22',
      };

      const result = formatCriteria(request);

      expect(result).toContain('- Dates : du 2026-06-15 au 2026-06-22');
    });

    it('should format only checkin date', () => {
      const request: SearchRequest = {
        ...baseRequest,
        checkin: '2026-06-15',
      };

      const result = formatCriteria(request);

      expect(result).toContain("- Date d'arrivée : 2026-06-15");
      expect(result.join('\n')).not.toContain('départ');
    });

    it('should format only checkout date', () => {
      const request: SearchRequest = {
        ...baseRequest,
        checkout: '2026-06-22',
      };

      const result = formatCriteria(request);

      expect(result).toContain('- Date de départ : 2026-06-22');
      expect(result.join('\n')).not.toContain('arrivée');
    });

    it('should not include date line when no dates provided', () => {
      const result = formatCriteria(baseRequest);

      expect(result.join('\n')).not.toContain('Date');
    });
  });

  describe('Travelers formatting', () => {
    it('should format single adult', () => {
      const request: SearchRequest = {
        ...baseRequest,
        adults: 1,
      };

      const result = formatCriteria(request);

      expect(result).toContain('- Voyageurs : 1 adulte (1 au total)');
    });

    it('should format multiple adults', () => {
      const request: SearchRequest = {
        ...baseRequest,
        adults: 3,
      };

      const result = formatCriteria(request);

      expect(result).toContain('- Voyageurs : 3 adultes (3 au total)');
    });

    it('should format adults and children', () => {
      const request: SearchRequest = {
        ...baseRequest,
        adults: 2,
        children: 2,
      };

      const result = formatCriteria(request);

      expect(result).toContain('- Voyageurs : 2 adultes, 2 enfants (4 au total)');
    });

    it('should format adults, children, and infants', () => {
      const request: SearchRequest = {
        ...baseRequest,
        adults: 2,
        children: 1,
        infants: 1,
      };

      const result = formatCriteria(request);

      expect(result).toContain('- Voyageurs : 2 adultes, 1 enfant, 1 bébé (3 au total)');
    });

    it('should use singular for single child', () => {
      const request: SearchRequest = {
        ...baseRequest,
        children: 1,
      };

      const result = formatCriteria(request);

      expect(result.join('\n')).toContain('1 enfant');
    });

    it('should use plural for multiple children', () => {
      const request: SearchRequest = {
        ...baseRequest,
        children: 3,
      };

      const result = formatCriteria(request);

      expect(result.join('\n')).toContain('3 enfants');
    });

    it('should use singular for single infant', () => {
      const request: SearchRequest = {
        ...baseRequest,
        infants: 1,
      };

      const result = formatCriteria(request);

      expect(result.join('\n')).toContain('1 bébé');
    });

    it('should use plural for multiple infants', () => {
      const request: SearchRequest = {
        ...baseRequest,
        infants: 2,
      };

      const result = formatCriteria(request);

      expect(result.join('\n')).toContain('2 bébés');
    });

    it('should add child-friendly warning when children present', () => {
      const request: SearchRequest = {
        ...baseRequest,
        children: 2,
      };

      const result = formatCriteria(request);

      expect(result).toContain('- IMPORTANT : Le logement doit être adapté aux enfants/bébés (sécurité, équipements bébé si besoin)');
    });

    it('should add child-friendly warning when infants present', () => {
      const request: SearchRequest = {
        ...baseRequest,
        infants: 1,
      };

      const result = formatCriteria(request);

      expect(result).toContain('- IMPORTANT : Le logement doit être adapté aux enfants/bébés (sécurité, équipements bébé si besoin)');
    });

    it('should not add warning when no children or infants', () => {
      const result = formatCriteria(baseRequest);

      expect(result.join('\n')).not.toContain('adapté aux enfants');
    });
  });

  describe('Budget formatting', () => {
    it('should format both min and max budget', () => {
      const request: SearchRequest = {
        ...baseRequest,
        budgetMin: 50,
        budgetMax: 150,
      };

      const result = formatCriteria(request);

      expect(result).toContain('- Budget : entre 50€ et 150€ par nuit');
    });

    it('should format only min budget', () => {
      const request: SearchRequest = {
        ...baseRequest,
        budgetMin: 50,
      };

      const result = formatCriteria(request);

      expect(result).toContain('- Budget minimum : 50€ par nuit');
    });

    it('should format only max budget', () => {
      const request: SearchRequest = {
        ...baseRequest,
        budgetMax: 150,
      };

      const result = formatCriteria(request);

      expect(result).toContain('- Budget maximum : 150€ par nuit');
    });

    it('should not include budget line when no budget provided', () => {
      const result = formatCriteria(baseRequest);

      expect(result.join('\n')).not.toContain('Budget');
    });
  });

  describe('Amenities formatting', () => {
    it('should format single amenity', () => {
      const request: SearchRequest = {
        ...baseRequest,
        amenities: ['wifi'],
      };

      const result = formatCriteria(request);

      expect(result).toContain('- Équipements souhaités : WiFi');
    });

    it('should format multiple amenities', () => {
      const request: SearchRequest = {
        ...baseRequest,
        amenities: ['wifi', 'pool', 'parking'],
      };

      const result = formatCriteria(request);

      expect(result).toContain('- Équipements souhaités : WiFi, Piscine, Parking');
    });

    it('should not include amenities line when empty', () => {
      const result = formatCriteria(baseRequest);

      expect(result.join('\n')).not.toContain('Équipements');
    });

    it('should handle unknown amenity IDs', () => {
      const request: SearchRequest = {
        ...baseRequest,
        amenities: ['wifi', 'unknown_amenity'],
      };

      const result = formatCriteria(request);

      expect(result).toContain('- Équipements souhaités : WiFi, unknown_amenity');
    });
  });

  describe('Property type formatting', () => {
    it('should format single property type', () => {
      const request: SearchRequest = {
        ...baseRequest,
        propertyType: 'apartment',
      };

      const result = formatCriteria(request);

      expect(result).toContain('- Type de logement : Appartement');
    });

    it('should format multiple property types', () => {
      const request: SearchRequest = {
        ...baseRequest,
        propertyType: ['apartment', 'house'],
      };

      const result = formatCriteria(request);

      expect(result).toContain('- Type de logement : Appartement, Maison');
    });

    it('should not include property type line when not provided', () => {
      const result = formatCriteria(baseRequest);

      expect(result.join('\n')).not.toContain('Type de logement');
    });

    it('should handle unknown property type IDs', () => {
      const request: SearchRequest = {
        ...baseRequest,
        propertyType: 'unknown_type',
      };

      const result = formatCriteria(request);

      expect(result).toContain('- Type de logement : unknown_type');
    });
  });

  describe('GPS coordinates (includeGeo: false)', () => {
    it('should NOT include GPS coordinates when includeGeo is false', () => {
      const request: SearchRequest = {
        ...baseRequest,
        lat: 48.8566,
        lng: 2.3522,
        radius: 10,
      };

      const result = formatCriteria(request, { includeGeo: false });

      expect(result.join('\n')).not.toContain('Coordonnées GPS');
      expect(result.join('\n')).not.toContain('48.8566');
      expect(result.join('\n')).not.toContain('2.3522');
      expect(result.join('\n')).not.toContain('Rayon de recherche');
    });
  });

  describe('GPS coordinates (includeGeo: true)', () => {
    it('should include GPS coordinates when includeGeo is true', () => {
      const request: SearchRequest = {
        ...baseRequest,
        lat: 48.8566,
        lng: 2.3522,
      };

      const result = formatCriteria(request, { includeGeo: true });

      expect(result).toContain('- Coordonnées GPS : 48.8566, 2.3522');
    });

    it('should include GPS coordinates by default (when option not provided)', () => {
      const request: SearchRequest = {
        ...baseRequest,
        lat: 48.8566,
        lng: 2.3522,
      };

      const result = formatCriteria(request);

      expect(result).toContain('- Coordonnées GPS : 48.8566, 2.3522');
    });

    it('should format GPS coordinates with 4 decimal places', () => {
      const request: SearchRequest = {
        ...baseRequest,
        lat: 48.856614,
        lng: 2.352222,
      };

      const result = formatCriteria(request, { includeGeo: true });

      expect(result).toContain('- Coordonnées GPS : 48.8566, 2.3522');
    });

    it('should include radius when GPS and radius provided', () => {
      const request: SearchRequest = {
        ...baseRequest,
        lat: 48.8566,
        lng: 2.3522,
        radius: 15,
      };

      const result = formatCriteria(request, { includeGeo: true });

      expect(result).toContain('- Coordonnées GPS : 48.8566, 2.3522');
      expect(result).toContain('- Rayon de recherche : 15 km autour de ce point');
    });

    it('should not include radius when GPS not provided', () => {
      const request: SearchRequest = {
        ...baseRequest,
        radius: 15,
      };

      const result = formatCriteria(request, { includeGeo: true });

      expect(result.join('\n')).not.toContain('Rayon de recherche');
    });
  });

  describe('Extra notes formatting', () => {
    it('should include extra notes when provided', () => {
      const request: SearchRequest = {
        ...baseRequest,
        extraNotes: 'Vue sur mer préférée',
      };

      const result = formatCriteria(request);

      expect(result).toContain('- Précisions supplémentaires : Vue sur mer préférée');
    });

    it('should not include extra notes line when not provided', () => {
      const result = formatCriteria(baseRequest);

      expect(result.join('\n')).not.toContain('Précisions supplémentaires');
    });
  });

  describe('Complete request formatting', () => {
    it('should format all criteria together', () => {
      const request: SearchRequest = {
        destination: 'Nice, Côte d\'Azur',
        checkin: '2026-07-01',
        checkout: '2026-07-08',
        adults: 2,
        children: 2,
        infants: 1,
        budgetMin: 100,
        budgetMax: 250,
        propertyType: 'villa',
        amenities: ['wifi', 'pool', 'parking'],
        extraNotes: 'Vue mer obligatoire',
        lat: 43.7102,
        lng: 7.2620,
        radius: 10,
      };

      const result = formatCriteria(request, { includeGeo: true });

      expect(result).toContain('- Destination : Nice, Côte d\'Azur');
      expect(result).toContain('- Dates : du 2026-07-01 au 2026-07-08');
      expect(result).toContain('- Voyageurs : 2 adultes, 2 enfants, 1 bébé (4 au total)');
      expect(result).toContain('- IMPORTANT : Le logement doit être adapté aux enfants/bébés (sécurité, équipements bébé si besoin)');
      expect(result).toContain('- Budget : entre 100€ et 250€ par nuit');
      expect(result).toContain('- Type de logement : Villa');
      expect(result).toContain('- Équipements souhaités : WiFi, Piscine, Parking');
      expect(result).toContain('- Coordonnées GPS : 43.7102, 7.2620');
      expect(result).toContain('- Rayon de recherche : 10 km autour de ce point');
      expect(result).toContain('- Précisions supplémentaires : Vue mer obligatoire');
    });

    it('should return array of strings', () => {
      const result = formatCriteria(baseRequest);

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(typeof result[0]).toBe('string');
    });
  });
});
