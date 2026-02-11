← [Retour au README](../README.md)

# Documentation des Tests AirSearch

## Table des matières
- [Vue d'ensemble](#vue-densemble)
- [Modules testés](#modules-testés)
- [Exécution des tests](#exécution-des-tests)
- [Structure des tests](#structure-des-tests)
- [Données de test](#données-de-test)
- [Bonnes pratiques](#bonnes-pratiques)
- [Configuration](#configuration)
- [Statistiques](#statistiques)
- [Prochaines étapes](#prochaines-étapes)

---

## Vue d'ensemble

Cette documentation décrit les tests unitaires des modules critiques d'AirSearch. Les tests sont écrits avec Vitest et couvrent les fonctionnalités essentielles du projet.

## Modules testés

### 1. URL Builder (`src/lib/scraper/__tests__/url-builder.test.ts`)

Teste la génération des URLs de recherche pour les 7 plateformes de location.

**Couverture :**
- ✅ Génération correcte pour les 7 plateformes (Airbnb, Booking.com, Vrbo, Holidu, HomeToGo, Expedia, Hotels.com)
- ✅ Vérification des domaines corrects
- ✅ Paramètres de date optionnels (checkin, checkout)
- ✅ Encodage de la destination (caractères spéciaux, accents, espaces)
- ✅ Paramètres conditionnels enfants/bébés
- ✅ Paramètres conditionnels budget (min, max)
- ✅ Configuration de la devise (EUR)

**Exemple de test :**
```typescript
it('should encode accents in destination', () => {
  const request = {
    destination: 'Côte d\'Azur',
    adults: 2,
    children: 0,
    infants: 0,
    amenities: [],
  };
  const urls = buildSearchUrls(request);
  expect(urls[0].url).toContain(encodeURIComponent('Côte d\'Azur'));
});
```

### 2. JSON Parser (`src/lib/anthropic/__tests__/json-parser.test.ts`)

Teste l'extraction de JSON depuis les réponses de l'API Anthropic.

**Couverture :**
- ✅ Parse de JSON pur valide
- ✅ Parse de JSON dans des backticks markdown (```json...```)
- ✅ Parse de JSON entouré de texte
- ✅ Parse de JSON avec des accolades imbriquées
- ✅ Retourne null pour du texte invalide
- ✅ Gestion des blocs séparés par des sauts de ligne
- ✅ Cas réels de réponses AI

**Stratégies testées :**
1. Parse direct (JSON pur)
2. Extraction depuis code fences markdown
3. Extraction depuis texte avec préfixe/suffixe
4. Parse par blocs séparés

### 3. Prompt Builder (`src/lib/scraper/__tests__/prompt-builder.test.ts`)

Teste la construction du prompt d'analyse pour l'API Anthropic.

**Couverture :**
- ✅ Génération du prompt avec critères de base
- ✅ Inclusion des données scrapées
- ✅ Limitation à MAX_LISTINGS_PER_PLATFORM (3 par plateforme)
- ✅ Gestion des plateformes en échec
- ✅ Présence du schéma JSON dans le prompt
- ✅ Exclusion des coordonnées GPS (includeGeo: false)
- ✅ Échappement des caractères spéciaux dans les données scrapées
- ✅ Troncature des valeurs longues (300 caractères max)

**Points clés :**
- Le prompt appelle `formatCriteria()` avec `{ includeGeo: false }`
- Les données scrapées sont limitées à 3 annonces par plateforme
- Les valeurs sont échappées pour éviter les problèmes de formatage

### 4. Format Criteria (`src/lib/__tests__/format-criteria.test.ts`)

Teste le formatage des critères de recherche en texte lisible.

**Couverture :**
- ✅ Formatage de la destination
- ✅ Formatage des dates (checkin seul, checkout seul, les deux)
- ✅ Formatage des voyageurs (adultes, enfants, bébés)
- ✅ Formatage du budget (min seul, max seul, les deux)
- ✅ Formatage des équipements
- ✅ Formatage du type de logement
- ✅ Option includeGeo: false (exclut les coordonnées)
- ✅ Option includeGeo: true (inclut les coordonnées)
- ✅ Formatage des notes supplémentaires
- ✅ Pluralisation correcte (adulte/adultes, enfant/enfants, bébé/bébés)
- ✅ Avertissement pour logements adaptés aux enfants

**Options :**
```typescript
interface FormatOptions {
  includeGeo?: boolean; // Par défaut: true
}
```

### 5. Fix vitest + jest-dom typing (`vitest.setup.ts`)

**Modification effectuée :**
- ✅ Import de `@testing-library/jest-dom/vitest` au lieu de l'ancien système de matchers
- ✅ Configuration du cleanup automatique après chaque test

**Avant :**
```typescript
import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);
```

**Après :**
```typescript
import '@testing-library/jest-dom/vitest';
```

## Exécution des tests

### Commandes disponibles

```bash
# Exécuter tous les tests
npm test

# Exécuter les tests avec interface UI
npm run test:ui

# Exécuter les tests avec couverture
npm run test:coverage

# Exécuter les tests en mode CI
npm run test:ci
```

### Exécuter des tests spécifiques

```bash
# Tester uniquement l'URL builder
npm test url-builder

# Tester uniquement le JSON parser
npm test json-parser

# Tester uniquement le prompt builder
npm test prompt-builder

# Tester uniquement le format criteria
npm test format-criteria
```

## Structure des tests

Tous les tests suivent la même structure :

```typescript
import { describe, it, expect } from 'vitest';
import { functionToTest } from '../module';

describe('ModuleName', () => {
  describe('Feature group', () => {
    it('should do something specific', () => {
      // Arrange
      const input = { /* test data */ };

      // Act
      const result = functionToTest(input);

      // Assert
      expect(result).toBe(expectedValue);
    });
  });
});
```

## Données de test

Les tests utilisent des données réalistes françaises :

- Destinations : Paris, Nice, Bordeaux, Saint-Jean-de-Luz, Côte d'Azur
- Dates : Format ISO 8601 (2026-06-15)
- Budget : En euros (50€-250€)
- Équipements : wifi, pool, parking, kitchen, etc.

## Bonnes pratiques

1. **Pas de types `any`** : Tous les tests utilisent des types stricts
2. **Données réalistes** : Les tests utilisent des données qui reflètent l'usage réel
3. **Tests indépendants** : Chaque test peut s'exécuter seul
4. **Couverture complète** : Les edge cases importants sont testés
5. **Pas de mocks externes** : Les tests testent le comportement réel

## Configuration

### vitest.config.ts

```typescript
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      exclude: [
        'node_modules/',
        '.next/',
        'vitest.config.ts',
        'vitest.setup.ts',
        '**/*.d.ts',
        '**/types.ts',
        '**/constants.ts',
      ],
    },
  },
});
```

### tsconfig.json

Le tsconfig exclut déjà les fichiers de test :
```json
{
  "exclude": [
    "node_modules",
    "vitest.config.ts",
    "vitest.setup.ts"
  ]
}
```

## Statistiques

- **Modules testés** : 4
- **Total de tests** : ~60+
- **Plateformes couvertes** : 7 (Airbnb, Booking.com, Vrbo, Holidu, HomeToGo, Expedia, Hotels.com)
- **Stratégies de parsing JSON** : 4
- **Edge cases** : Caractères spéciaux, accents, valeurs nulles, données manquantes

## Prochaines étapes

Pour étendre la couverture de tests :

1. Tests des composants React (avec @testing-library/react)
2. Tests d'intégration des routes API
3. Tests E2E avec Playwright
4. Tests de performance pour le scraping
5. Tests de sécurité pour la validation des entrées
