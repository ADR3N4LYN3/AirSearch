# Guide: Ajouter une nouvelle destination

## Procédure en 3 étapes

### 1. Ouvrir le fichier des destinations
```bash
src/lib/destinations.ts
```

### 2. Ajouter la nouvelle ville dans DESTINATIONS

Copier-coller ce template et remplir les informations:

```typescript
{
  slug: "nom-ville",              // URL-friendly (lowercase, pas d'accents)
  name: "Nom Ville",              // Nom affiché
  region: "Région",               // Ex: "Île-de-France", "Provence-Alpes-Côte d'Azur"

  // SEO
  metaTitle: "Location vacances à [Ville] - Comparez Airbnb, Booking & Abritel | AirSearch",
  metaDescription: "Trouvez votre location à [Ville]. Comparez Airbnb, Booking et Abritel... dès XXX€/nuit.",

  // Contenu affiché
  h1: "Location vacances à [Ville] - Comparez Airbnb, Booking & Abritel",
  description: "Courte description de la ville en 1-2 phrases.",
  shortDescription: "Description très courte pour la carte sur /destination",

  // Paragraphe d'introduction (2-3 paragraphes, ~300 mots)
  introText: `[Ville], [description unique], offre [caractéristique]. Que vous recherchiez [type logement], AirSearch compare instantanément les meilleures offres.

Notre comparateur intelligent analyse [plateformes] pour vous proposer le meilleur rapport qualité-prix.

[Call-to-action et bénéfices].`,

  // Section "Pourquoi visiter"
  whyVisit: {
    title: "Pourquoi choisir [Ville] pour vos vacances ?",
    content: `[Contenu unique de 150+ mots expliquant pourquoi cette ville est spéciale, ses atouts, ce qui la différencie. Mentionner l'intérêt de louer un appartement vs hôtel.]`,
  },

  // 4 quartiers populaires
  popularQuarters: [
    {
      name: "Quartier 1",
      description: "Description unique du quartier, son ambiance, ce qu'on y trouve.",
    },
    {
      name: "Quartier 2",
      description: "...",
    },
    {
      name: "Quartier 3",
      description: "...",
    },
    {
      name: "Quartier 4",
      description: "...",
    },
  ],

  // 10 attractions principales
  attractions: [
    "Attraction 1",
    "Attraction 2",
    "Attraction 3",
    "Attraction 4",
    "Attraction 5",
    "Attraction 6",
    "Attraction 7",
    "Attraction 8",
    "Attraction 9",
    "Attraction 10",
  ],

  // Keywords SEO (pas affichés, juste pour référence)
  searchKeywords: [
    "location [ville]",
    "appartement [ville]",
    "airbnb [ville]",
    "logement [ville] centre",
    "location vacances [ville]",
    "hébergement [quartier célèbre]",
  ],

  // Infos pratiques
  avgPrice: "XX-XXX€",           // Fourchette de prix par nuit
  bestSeason: "Saison idéale",   // Ex: "Mai à Septembre", "Toute l'année"
  image: "/destinations/ville.jpg",  // Image OG (à créer)
},
```

### 3. Rebuild le projet

```bash
npm run build
```

La nouvelle destination sera automatiquement:
- ✅ Ajoutée au sitemap (`/sitemap.xml`)
- ✅ Générée en page statique (`/destination/ville`)
- ✅ Listée sur la page index (`/destination`)
- ✅ Accessible avec URL optimisée SEO

---

## Conseils pour un bon contenu SEO

### ✅ À FAIRE
- **Contenu unique**: Ne jamais copier-coller entre villes
- **Keywords naturels**: Intégrer naturellement "location", "appartement", nom de la ville
- **Long-tail keywords**: Mentionner les quartiers populaires
- **Local expertise**: Montrer que vous connaissez la ville
- **Call-to-action**: Encourager à utiliser le comparateur

### ❌ À ÉVITER
- Keyword stuffing (répéter "location" 50 fois)
- Contenu générique qui pourrait s'appliquer à n'importe quelle ville
- Meta description > 155 caractères
- Fautes d'orthographe
- Informations obsolètes

---

## Checklist avant de commit

- [ ] Le slug est unique et lowercase
- [ ] Meta description < 155 caractères
- [ ] IntroText fait 250-350 mots (2-3 paragraphes)
- [ ] WhyVisit.content fait 150+ mots
- [ ] 4 quartiers avec descriptions uniques
- [ ] 10 attractions listées
- [ ] Prix moyen renseigné
- [ ] Image path correcte (`/destinations/ville.jpg`)
- [ ] Build réussit (`npm run build`)
- [ ] Page s'affiche correctement sur `/destination/ville`

---

## Exemple de ville bien optimisée

Voir `Paris` dans `destinations.ts` comme référence complète.

**Caractéristiques:**
- 1500+ mots de contenu unique
- Keywords placés naturellement
- Quartiers variés (historique, moderne, bohème, résidentiel)
- Mix d'attractions (monuments, musées, parcs, quartiers)
- Appels à l'action multiples
- Informations pratiques (prix, saison)

---

## Images à créer

Pour chaque nouvelle destination, créer:

```
public/destinations/ville.jpg
```

**Specs:**
- Format: JPG ou PNG
- Dimensions: 1200 x 630 px (format OG)
- Poids: < 200 KB
- Contenu: Vue emblématique de la ville (non protégée par droits d'auteur)

---

## Tester la nouvelle destination

### En local
```bash
npm run dev
```
Visiter: `http://localhost:3000/destination/ville`

### Vérifier le SEO
1. **Title**: F12 → `<title>` dans le `<head>`
2. **Meta description**: F12 → `<meta name="description">`
3. **OG tags**: F12 → chercher `og:title`, `og:description`, `og:image`
4. **JSON-LD**: F12 → chercher `<script type="application/ld+json">`
5. **Sitemap**: Visiter `/sitemap.xml` et vérifier la présence

### Validators
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)

---

## Questions fréquentes

### Combien de mots minimum ?
- IntroText: 250-350 mots (2-3 paragraphes)
- WhyVisit: 150-200 mots
- Total page: 1500+ mots idéal pour SEO

### Comment choisir les quartiers ?
Mix de:
- 1 quartier historique/touristique
- 1 quartier moderne/branché
- 1 quartier résidentiel/familial
- 1 quartier unique/spécial à la ville

### Comment trouver le prix moyen ?
Faire une recherche rapide sur Airbnb/Booking pour la ville et noter la fourchette la plus courante.

### Faut-il traduire en anglais ?
Non, pour l'instant AirSearch est 100% français. Focus sur le marché FR.

---

**Besoin d'aide ?** Consultez `SEO_IMPLEMENTATION.md` pour la documentation complète.
