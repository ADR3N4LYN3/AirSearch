/**
 * Système de tracking et d'affiliation pour AirSearch
 *
 * Ce module transforme les URLs normales en liens affiliés pour monétiser le trafic.
 * Il gère également le tracking des clics pour analyser les conversions.
 */

// ============================================
// 1. CONFIGURATION DES PROGRAMMES D'AFFILIATION
// ============================================

interface AffiliateConfig {
  id: string;
  paramName: string;
  paramValue: string;
  trackingParams?: Record<string, string>;
}

const AFFILIATE_CONFIGS: Record<string, AffiliateConfig> = {
  "Booking.com": {
    id: "booking",
    paramName: "aid",
    paramValue: process.env.NEXT_PUBLIC_BOOKING_AFFILIATE_ID || "YOUR_BOOKING_AFFILIATE_ID",
    trackingParams: {
      // Booking.com utilise plusieurs paramètres
      // aid = Affiliate ID
      // label = optionnel pour segmenter vos campagnes
    }
  },
  "Vrbo": {
    id: "vrbo",
    paramName: "affiliateId",
    paramValue: process.env.NEXT_PUBLIC_VRBO_AFFILIATE_ID || "YOUR_VRBO_AFFILIATE_ID",
    trackingParams: {
      // Vrbo (groupe Expedia) utilise affiliateId
    }
  },
  "Expedia": {
    id: "expedia",
    paramName: "affiliateId",
    paramValue: process.env.NEXT_PUBLIC_EXPEDIA_AFFILIATE_ID || "YOUR_EXPEDIA_AFFILIATE_ID",
    trackingParams: {}
  },
  "Hotels.com": {
    id: "hotelscom",
    paramName: "affiliateId",
    paramValue: process.env.NEXT_PUBLIC_HOTELSCOM_AFFILIATE_ID || "YOUR_HOTELSCOM_AFFILIATE_ID",
    trackingParams: {}
  }
  // Note : Airbnb (fermé 2021) et Abritel (invitation uniquement)
  // sont affichés sans affiliation dans les résultats
};

// ============================================
// 2. FONCTION PRINCIPALE : AJOUTER L'AFFILIATION
// ============================================

export function addAffiliateParams(url: string | null, platform: string): string | null {
  if (!url) return null;

  const config = AFFILIATE_CONFIGS[platform];
  if (!config) {
    // Plateformes sans programme d'affiliation (Airbnb fermé 2021, Abritel sur invitation)
    return url;
  }

  try {
    const urlObj = new URL(url);

    // Ajouter l'ID d'affiliation
    urlObj.searchParams.set(config.paramName, config.paramValue);

    // Ajouter les paramètres de tracking additionnels
    if (config.trackingParams) {
      Object.entries(config.trackingParams).forEach(([key, value]) => {
        urlObj.searchParams.set(key, value);
      });
    }

    // Ajouter un identifiant unique pour tracker les clics (optionnel)
    urlObj.searchParams.set('utm_source', 'airsearch');
    urlObj.searchParams.set('utm_medium', 'referral');
    urlObj.searchParams.set('utm_campaign', 'search_results');

    return urlObj.toString();
  } catch (error) {
    console.error(`Error adding affiliate params to ${url}:`, error);
    return url;
  }
}

// ============================================
// 3. TRACKING DES CLICS (OPTIONNEL)
// ============================================

/**
 * Enregistre un clic sur un lien affilié pour analytics
 * Vous pouvez envoyer ces données à votre backend ou à un service d'analytics
 */
export async function trackAffiliateClick(
  platform: string,
  url: string,
  metadata?: Record<string, any>
) {
  try {
    // Envoi asynchrone pour ne pas bloquer l'ouverture du lien
    await fetch('/api/analytics/click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        platform,
        url,
        timestamp: new Date().toISOString(),
        ...metadata
      })
    });
  } catch (error) {
    // Fail silently - on ne veut pas bloquer l'utilisateur
    console.error('Failed to track affiliate click:', error);
  }
}

// ============================================
// 4. UTILITAIRES
// ============================================

/**
 * Vérifie si un lien contient déjà des paramètres d'affiliation
 */
export function hasAffiliateParams(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return Object.values(AFFILIATE_CONFIGS).some(config =>
      urlObj.searchParams.has(config.paramName)
    );
  } catch {
    return false;
  }
}

/**
 * Retourne la liste des plateformes configurées pour l'affiliation
 */
export function getConfiguredPlatforms(): string[] {
  return Object.keys(AFFILIATE_CONFIGS);
}
