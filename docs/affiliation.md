← [Retour au README](../README.md)

# Guide de monétisation par affiliation — AirSearch

## Table des matières
- [Potentiel de revenus](#potentiel-de-revenus)
- [Étapes de configuration](#étapes-de-configuration)
- [Suivre vos performances](#suivre-vos-performances)
- [Optimisation des conversions](#optimisation-des-conversions)
- [Stratégies avancées](#stratégies-avancées)
- [Conformité légale](#conformité-légale)
- [Support](#support)
- [Ressources](#ressources)

---

Ce guide explique comment configurer les liens d'affiliation pour générer des revenus avec AirSearch.

## Potentiel de revenus

Avec **1000 utilisateurs/mois** qui font chacun 2 recherches et cliquent sur 1 résultat :
- **Clics mensuels** : 2000 clics
- **Taux de conversion** : 2-5% (estimation moyenne pour le voyage)
- **Réservations mensuelles** : 40-100 réservations
- **Panier moyen** : 500€ pour 3 nuits
- **Commission moyenne** : 4% (Booking) = 20€/réservation
- **📈 Revenus mensuels estimés** : **800€ - 2000€/mois**

## Étapes de configuration

### 1. S'inscrire aux programmes d'affiliation

> ⚠️ **NOTE IMPORTANTE** : Le programme Airbnb Affiliate a été fermé le 31 mars 2021. Airbnb ne propose plus de programme d'affiliation public.

#### Booking.com Affiliate Partner Program (PRIORITÉ #1)
- **Lien d'inscription** : https://www.booking.com/affiliate-program
- **Commission** : 25-40% de la commission Booking (~4-6% de la réservation finale)
- **Durée du cookie** : 30 jours
- **Paiement minimum** : 100€
- **Délai de paiement** : Mensuel (environ 60 jours après la réservation)
- **📌 NOTE** : C'est généralement le programme le plus rémunérateur !

#### Vrbo (Expedia Group)
- **Lien d'inscription** : https://www.expediagroup.com/home/affiliate/
- **Commission** : 2-6% par réservation
- **Durée du cookie** : 7 jours
- **Paiement minimum** : 50$
- **Délai de paiement** : 30-45 jours

> ⚠️ **Note Abritel** : Le "Réseau Partenaires Abritel" est sur invitation uniquement et réservé aux sites à très fort trafic. Vous pouvez afficher Abritel dans vos résultats sans affiliation pour la crédibilité. Si vous dépassez 50k visiteurs/mois, contactez-les pour négocier un partenariat custom.

### 2. Récupérer vos IDs d'affiliation

Une fois inscrit, chaque plateforme vous donnera un **Affiliate ID** (aussi appelé Partner ID, Publisher ID, etc.).

#### Exemple pour Booking.com :
```
URL normale : https://www.booking.com/hotel/fr/example.html
URL affiliée : https://www.booking.com/hotel/fr/example.html?aid=123456
                                                                  ^^^
                                                        Votre Affiliate ID
```

### 3. Ajouter vos IDs dans le fichier .env.local

Ouvrez le fichier `.env.local` à la racine du projet et remplacez les placeholders :

```env
# ❌ AVANT (valeurs par défaut)
NEXT_PUBLIC_AIRBNB_AFFILIATE_ID=YOUR_AIRBNB_AFFILIATE_ID
NEXT_PUBLIC_BOOKING_AFFILIATE_ID=YOUR_BOOKING_AFFILIATE_ID
NEXT_PUBLIC_ABRITEL_AFFILIATE_ID=YOUR_ABRITEL_AFFILIATE_ID

# ✅ APRÈS (avec vos vrais IDs)
NEXT_PUBLIC_AIRBNB_AFFILIATE_ID=1234567
NEXT_PUBLIC_BOOKING_AFFILIATE_ID=987654
NEXT_PUBLIC_ABRITEL_AFFILIATE_ID=555444
```

### 4. Redémarrer le serveur de dev

```bash
npm run dev
```

### 5. Tester les liens affiliés

1. Lancez une recherche sur AirSearch
2. Cliquez sur "Voir sur Booking.com" (ou autre plateforme)
3. **Vérifiez l'URL dans la barre d'adresse** — elle doit contenir votre `aid=` ou `af=`
4. Exemple attendu :
   ```
   https://www.booking.com/hotel/fr/example.html?aid=987654&utm_source=airsearch&utm_medium=referral
   ```

## Suivre vos performances

### Option 1 : Dans la console du navigateur (développement)

Les clics sont loggés dans la console :
```
📊 Affiliate click tracked: {
  platform: "Booking.com",
  url: "https://www.booking.com/hotel/fr/example.html",
  title: "Appartement vue mer",
  location: "Nice",
  price: "120€",
  timestamp: "2025-01-15T10:30:00.000Z"
}
```

### Option 2 : Dans les dashboards des plateformes

Chaque plateforme vous fournit un dashboard avec :
- Nombre de clics
- Nombre de réservations
- Revenus générés
- Taux de conversion

**Liens des dashboards** :
- Booking.com : https://admin.booking.com/partner/
- Expedia Group : https://www.expediagroup.com/Affiliate/

### Option 3 : Avec une base de données (recommandé en production)

Décommentez le code dans `src/app/api/analytics/click/route.ts` pour enregistrer les clics dans votre BDD :

```typescript
// OPTION 2 : Enregistrer dans une base de données
await db.clicks.create({
  data: {
    platform: data.platform,
    url: data.url,
    title: data.title,
    location: data.location,
    price: data.price,
    timestamp: new Date(data.timestamp),
  }
});
```

## Optimisation des conversions

### 1. Améliorer le taux de clic (CTR)
- ✅ Ajouter des badges "Meilleur prix" ou "Recommandé"
- ✅ Afficher des photos attrayantes (actuellement placeholder)
- ✅ Montrer les économies potentielles ("Économisez 30€ vs Airbnb")

### 2. Améliorer la confiance
- ✅ Ajouter une page "Comment ça marche ?" qui explique votre neutralité
- ✅ Afficher "Liens sponsorisés" pour la transparence
- ✅ Montrer les avis et notes

### 3. Ajouter des call-to-actions efficaces
Exemple dans `ResultCard.tsx` :
```tsx
<a href={affiliateUrl}>
  🔥 Voir l'offre sur Booking.com
  <span className="text-xs">Prix en temps réel</span>
</a>
```

## Stratégies avancées

### 1. Liens profonds (Deep Links)
Certaines plateformes paient plus pour les liens directs vers la page de réservation (checkout) :
```typescript
// Au lieu de :
https://www.booking.com/hotel/fr/example.html?aid=123

// Utilisez :
https://www.booking.com/hotel/fr/example.html?aid=123&checkin=2025-06-01&checkout=2025-06-05
```

### 2. Tracking UTM pour A/B testing
Les paramètres UTM vous permettent de tester différentes positions de boutons :
```typescript
utm_campaign=search_results_top    // Bouton en haut
utm_campaign=search_results_bottom // Bouton en bas
```

### 3. Programme de cashback (optionnel)
Redistribuez une partie de votre commission aux utilisateurs :
- "Réservez via AirSearch et obtenez 5€ de remboursement"
- Augmente drastiquement le taux de conversion

## Conformité légale

### 1. RGPD (Déjà implémenté ✅)
Vous avez déjà un [CookieBanner](src/components/CookieBanner.tsx) et une [page confidentialité](src/app/confidentialite/page.tsx).

### 2. Mentions obligatoires
Ajoutez cette phrase sur votre site :
> "AirSearch est un comparateur indépendant. Nous pouvons percevoir une commission lorsque vous réservez via nos liens, sans frais supplémentaires pour vous."

**Où l'ajouter** :
- Footer du site
- Page "À propos"
- Ou dans le [tooltip] à côté du bouton "Voir sur Booking.com"

### 3. Déclaration des revenus
Les revenus d'affiliation sont imposables. Consultez un comptable pour :
- Auto-entrepreneur (si < 70k€/an en France)
- Société (SASU, SAS, SARL) si revenus plus élevés

## Support

### Problèmes courants

**Q: Les liens ne contiennent pas mon affiliate ID**
- Vérifiez que `.env.local` contient vos IDs
- Redémarrez le serveur (`npm run dev`)
- Vérifiez la console du navigateur pour les erreurs

**Q: Je ne vois pas de commissions dans mon dashboard**
- Les commissions prennent 30-60 jours à apparaître (délai de rétractation)
- Vérifiez que l'utilisateur a bien réservé (cookie tracking)
- Certaines plateformes rejettent les auto-clics

**Q: Puis-je cumuler affiliation + publicité ?**
- Oui ! Vous pouvez ajouter Google AdSense en parallèle
- Ne surchargez pas la page pour ne pas nuire à l'UX

## Ressources

- [Guide Booking.com Affiliate](https://www.booking.com/affiliate-program/documentation)
- [Airbnb Associates FAQ](https://www.airbnb.com/associates/faq)
- [Expedia Affiliate Network](https://join.expediaaffiliate.com/)
- [Google Search Console](https://search.google.com/search-console) pour le SEO
- [Similarweb](https://www.similarweb.com/) pour analyser vos concurrents

---

**Prêt à générer vos premiers revenus ?**

Suivez les étapes ci-dessus, inscrivez-vous aux programmes, et regardez les commissions arriver !
