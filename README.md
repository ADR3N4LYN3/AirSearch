# AirSearch

Comparateur intelligent de locations de vacances qui agrège en temps réel les offres d'Airbnb, Booking.com et Abritel. Propulsé par l'IA Claude Sonnet 4 pour recommander les meilleurs logements selon vos critères.

## Fonctionnalités

- Agrégation en temps réel via scraping web avancé (Playwright stealth)
- Analyse intelligente par l'IA Claude Sonnet 4 pour recommandations personnalisées
- Comparaison multi-plateformes : Airbnb, Booking.com, Abritel, Vrbo, Holidu, HomeToGo, Expedia, Hotels.com
- Monétisation via liens affiliés (Booking, Vrbo, Expedia, Hotels.com)
- 10+ pages destinations optimisées SEO avec génération statique
- Rate limiting intelligent et protection anti-bot
- Tests automatisés avec couverture de 60%
- Pipeline CI/CD avec GitHub Actions et scan de sécurité Trivy

## Stack technique

| Catégorie | Technologies |
|-----------|--------------|
| **Framework** | Next.js 16.1.6 (App Router, standalone output) |
| **Runtime** | React 19.2.4, Node.js 20 |
| **Langage** | TypeScript 5.9.3 (strict mode) |
| **Styling** | Tailwind CSS 4.1.18 |
| **Scraping** | Playwright 1.58.2 + playwright-extra + puppeteer-extra-plugin-stealth |
| **IA** | Anthropic Claude Sonnet 4 API |
| **Base de données** | Better-SQLite3 12.6.2 (cache) |
| **Tests** | Vitest 2.1.8 + Testing Library 16.1.0 |
| **Déploiement** | Docker multi-stage + Nginx + Let's Encrypt |
| **CI/CD** | GitHub Actions + Trivy security scan |
| **Maps** | Google Maps API (@vis.gl/react-google-maps) |
| **Animations** | Lottie (@lottiefiles/dotlottie-react) + Motion 12.34 |

## Démarrage rapide

### Prérequis

- Node.js 20+
- npm 10+
- Clé API Anthropic (obligatoire)
- Clé API Google Maps (optionnel)

### Installation

```bash
# Cloner le projet
git clone https://github.com/votre-username/AirSearch.git
cd AirSearch

# Installer les dépendances
npm install
```

### Configuration

Créer un fichier `.env.local` à la racine du projet :

```env
# OBLIGATOIRE : Clé API Anthropic
ANTHROPIC_API_KEY=sk-ant-xxxxx

# OPTIONNEL : Google Maps (pour la carte interactive)
NEXT_PUBLIC_GOOGLE_MAPS_KEY=AIzaSyxxxxx

# OPTIONNEL : URL du site en production
NEXT_PUBLIC_SITE_URL=https://airsearch.eu

# OPTIONNEL : Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# OPTIONNEL : Programmes d'affiliation
NEXT_PUBLIC_BOOKING_AFFILIATE_ID=YOUR_BOOKING_AFFILIATE_ID
NEXT_PUBLIC_VRBO_AFFILIATE_ID=YOUR_VRBO_AFFILIATE_ID
NEXT_PUBLIC_EXPEDIA_AFFILIATE_ID=YOUR_EXPEDIA_AFFILIATE_ID
NEXT_PUBLIC_HOTELSCOM_AFFILIATE_ID=YOUR_HOTELSCOM_AFFILIATE_ID
```

Voir `.env.example` pour la liste complète des variables disponibles.

### Développement

```bash
# Lancer le serveur de développement
npm run dev

# Ouvrir http://localhost:3000
```

### Production (Docker)

```bash
# Build et lancer avec Docker Compose
npm run docker:build
npm run docker:run

# Ou manuellement
docker build -t airsearch:latest .
docker run -p 3000:3000 --env-file .env airsearch:latest

# Vérifier le healthcheck
curl http://localhost:3000/api/health
```

## Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lance le serveur de développement sur le port 3000 |
| `npm run build` | Compile l'application pour la production |
| `npm run start` | Lance l'application compilée en mode production |
| `npm run lint` | Vérifie la qualité du code avec ESLint |
| `npm run type-check` | Vérifie les types TypeScript sans compiler |
| `npm run validate` | Lance lint + type-check (validation complète) |
| `npm test` | Lance les tests en mode watch |
| `npm run test:ui` | Lance l'interface graphique des tests (Vitest UI) |
| `npm run test:coverage` | Génère le rapport de couverture des tests |
| `npm run test:ci` | Lance les tests en mode CI (pour GitHub Actions) |
| `npm run docker:build` | Build l'image Docker |
| `npm run docker:run` | Lance l'app avec docker-compose |

## Architecture

```
src/
├── app/                    # Pages et API routes (Next.js App Router)
│   ├── api/               # API endpoints
│   │   ├── search/        # POST /api/search - Recherche principale
│   │   ├── health/        # GET /api/health - Healthcheck
│   │   └── analytics/     # POST /api/analytics/click - Tracking clics
│   ├── destination/       # Pages SEO par ville
│   ├── a-propos/          # Page à propos
│   ├── mentions-legales/  # Mentions légales
│   └── confidentialite/   # Politique de confidentialité
├── components/            # Composants React réutilisables
│   ├── layout/            # Header, Footer, Navigation
│   ├── search-form/       # Formulaire de recherche principal
│   ├── sections/          # Sections landing page
│   └── __tests__/         # Tests des composants
├── lib/                   # Logique métier
│   ├── scraper/           # Scraping Playwright + URL builders
│   ├── anthropic.ts       # Client API Claude (analyse IA)
│   ├── affiliate.ts       # Génération des liens affiliés
│   ├── destinations.ts    # Base de données des villes SEO
│   ├── seo.ts             # Utilitaires SEO (schemas, canonical)
│   ├── rate-limiter.ts    # Rate limiting (10 req/5min par IP)
│   ├── validators.ts      # Validation des requêtes
│   └── __tests__/         # Tests unitaires métier
└── styles/                # Design system (Tailwind + CSS vars)
```

### Flux principal

```
User Input (SearchForm)
        |
        v
POST /api/search
        |
        v
Rate Limiter (10 req/5min)
        |
        v
Input Validation (Zod schemas)
        |
        v
URL Builder (7 plateformes)
        |
        v
Playwright Scraper (stealth mode)
        |
        v
Claude Sonnet 4 API (analyse + recommandations)
        |
        v
Affiliate Link Generator
        |
        v
JSON Response (summary + results + tips)
        |
        v
UI Display (ResultCard components)
```

## Documentation

| Document | Description |
|----------|-------------|
| [DEPLOYMENT.md](DEPLOYMENT.md) | Guide Docker + nginx + SSL + déploiement VPS |
| [SEO_IMPLEMENTATION.md](SEO_IMPLEMENTATION.md) | Implémentation SEO complète (meta tags, structured data, sitemap) |
| [AFFILIATION.md](AFFILIATION.md) | Programme de monétisation et setup des liens affiliés |
| [AJOUTER_DESTINATION.md](AJOUTER_DESTINATION.md) | Guide pour ajouter une nouvelle destination SEO |
| [TESTS_DOCUMENTATION.md](TESTS_DOCUMENTATION.md) | Documentation complète des tests (60% coverage) |
| [IMPROVEMENTS.md](IMPROVEMENTS.md) | Rapport d'amélioration full-stack (40+ optimisations) |

## API

### POST /api/search

Recherche de locations de vacances avec analyse IA.

**Body:**

```json
{
  "destination": "Paris",
  "checkin": "2026-06-15",
  "checkout": "2026-06-20",
  "adults": 2,
  "children": 0,
  "infants": 0,
  "budgetMin": 50,
  "budgetMax": 250,
  "propertyType": ["Appartement", "Studio"],
  "amenities": ["wifi", "kitchen", "parking"],
  "extraNotes": "Centre-ville, proche métro",
  "lat": 48.8566,
  "lng": 2.3522,
  "radius": 5
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "summary": "Nous avons trouvé 15 locations correspondant à vos critères...",
    "results": [
      {
        "title": "Appartement cosy Marais",
        "location": "Paris 3e",
        "price": "120€/nuit",
        "description": "Studio lumineux avec cuisine équipée...",
        "highlights": ["WiFi gratuit", "Cuisine", "Proche métro"],
        "url": "https://www.booking.com/...",
        "image": "https://...",
        "platform": "Booking.com",
        "rating": 4.5,
        "reviewCount": 87
      }
    ],
    "tips": "Réservez rapidement, forte demande pour ces dates."
  }
}
```

**Rate Limiting:** 10 requêtes par 5 minutes par IP

### GET /api/health

Healthcheck de l'application (utilisé par Docker).

**Response:**

```json
{
  "status": "healthy",
  "timestamp": "2026-02-11T10:30:00.000Z",
  "uptime": 3600.5,
  "environment": "production"
}
```

### POST /api/analytics/click

Tracking des clics sur les liens affiliés (optionnel).

**Body:**

```json
{
  "platform": "Booking.com",
  "url": "https://www.booking.com/...",
  "title": "Appartement cosy Marais",
  "location": "Paris 3e",
  "price": "120€/nuit",
  "timestamp": "2026-02-11T10:30:00.000Z"
}
```

**Response:** `200 OK`

## Variables d'environnement

### Obligatoires

| Variable | Description | Exemple |
|----------|-------------|---------|
| `ANTHROPIC_API_KEY` | Clé API Claude (Anthropic Console) | `sk-ant-api03-...` |

### Optionnelles

| Variable | Description | Défaut |
|----------|-------------|--------|
| `NEXT_PUBLIC_GOOGLE_MAPS_KEY` | Clé API Google Maps | - |
| `NEXT_PUBLIC_SITE_URL` | URL du site en production | `http://localhost:3000` |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics Measurement ID | - |
| `NEXT_PUBLIC_BOOKING_AFFILIATE_ID` | ID affilié Booking.com | - |
| `NEXT_PUBLIC_VRBO_AFFILIATE_ID` | ID affilié Vrbo | - |
| `NEXT_PUBLIC_EXPEDIA_AFFILIATE_ID` | ID affilié Expedia | - |
| `NEXT_PUBLIC_HOTELSCOM_AFFILIATE_ID` | ID affilié Hotels.com | - |
| `NODE_ENV` | Environnement (development/production) | `development` |

## Sécurité

- Headers de sécurité configurés (CSP, X-Frame-Options, etc.)
- Rate limiting par IP (10 req/5min)
- Protection anti-spoofing IP (validation headers Cloudflare/Vercel)
- Timeout API (30s)
- Validation stricte des entrées (Zod schemas)
- Conteneur Docker non-root
- Scan de sécurité Trivy en CI/CD
- Secrets jamais exposés au client

## Tests

```bash
# Lancer tous les tests
npm test

# Interface graphique
npm run test:ui

# Avec couverture de code
npm run test:coverage
```

**Modules testés:**

- URL builders (7 plateformes)
- JSON parser (4 stratégies d'extraction)
- Prompt builder (Claude API)
- Format criteria (texte lisible)
- Validators (Zod schemas)
- API routes (/api/search)

**Couverture actuelle:** ~60% (objectif: 80%)

## Déploiement

Voir [DEPLOYMENT.md](DEPLOYMENT.md) pour le guide complet de déploiement sur VPS avec Docker, nginx et SSL.

**Résumé:**

```bash
# Sur le VPS
git clone https://github.com/votre-username/AirSearch.git
cd AirSearch
cp .env.example .env
nano .env  # Configurer ANTHROPIC_API_KEY

# Lancer avec Docker
docker-compose -f docker-compose.prod.yml up -d

# Configurer SSL
chmod +x setup-ssl.sh
./setup-ssl.sh votre-domaine.com
```

## Performances

- Génération statique (SSG) pour toutes les pages destinations
- Standalone output Next.js (optimisé pour Docker)
- Image Docker multi-stage (réduction de 60% de la taille)
- Cache SQLite pour les résultats de scraping
- Réduction de 87% du coût API (4000 tokens max vs 16000)
- Timeout API de 30s pour éviter les requêtes bloquées

## SEO

- 10+ pages destinations générées statiquement
- Meta tags optimisés (title < 60 chars, description < 155 chars)
- Structured data (JSON-LD) : WebSite, Organization, WebApplication, City
- Sitemap XML dynamique (7+ URLs)
- Breadcrumb navigation avec schema
- Canonical URLs sur toutes les pages
- Open Graph + Twitter Cards
- Google Search Box integration
- Robots.txt optimisé

**Destinations actuelles:** Paris, Nice, Lyon, Marseille, Bordeaux

Voir [AJOUTER_DESTINATION.md](AJOUTER_DESTINATION.md) pour ajouter une nouvelle ville.

## Affiliation

AirSearch génère des revenus via des programmes d'affiliation avec les principales plateformes de réservation.

**Programmes supportés:**

- Booking.com (4-6% de commission)
- Vrbo/Expedia/Hotels.com (2-6% de commission)

**Potentiel de revenus:** 800€ - 2000€/mois avec 1000 utilisateurs

Voir [AFFILIATION.md](AFFILIATION.md) pour configurer vos IDs affiliés.

## Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/amazing-feature`)
3. Commit vos changements (`git commit -m 'Add amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

**Guidelines:**

- Respecter le strict mode TypeScript
- Écrire des tests pour les nouvelles fonctionnalités
- Suivre les conventions de nommage existantes
- Mettre à jour la documentation si nécessaire

## Licence

ISC

---

Développé avec Claude Code - Anthropic's official CLI for Claude
