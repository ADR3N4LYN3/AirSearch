import type { SearchRequest } from "../types";
import type { ScrapeResult } from "./types";
import { formatCriteria } from "../format-criteria";

export function buildAnalysisPrompt(
  criteria: SearchRequest,
  scrapeResults: ScrapeResult[]
): string {
  const parts: string[] = [];

  parts.push(
    `Tu es un assistant spécialisé dans la comparaison de locations de vacances.`
  );
  parts.push(
    `L'utilisateur cherche un logement avec les critères suivants :\n`
  );

  parts.push(...formatCriteria(criteria));

  // Inject scraped data
  parts.push("");
  parts.push(`DONNÉES RÉELLES SCRAPÉES DEPUIS LES PLATEFORMES :`);

  let totalListings = 0;
  for (const result of scrapeResults) {
    if (result.success && result.listings.length > 0) {
      parts.push(`\n--- ${result.platform} (${result.listings.length} annonces) ---`);
      for (const l of result.listings) {
        const line = [
          l.title,
          l.price || "prix inconnu",
          l.rating != null ? `${l.rating}/5` : "note inconnue",
          l.reviewCount != null ? `${l.reviewCount} avis` : "",
          l.location || "",
          l.url || "pas de lien",
        ].filter(Boolean).join(" | ");
        parts.push(`• ${line}`);
        totalListings++;
      }
    } else {
      parts.push(`\n--- ${result.platform} --- Échec du scraping`);
    }
  }

  parts.push("");
  parts.push(`À partir de ces ${totalListings} annonces RÉELLES, sélectionne les 3 à 5 meilleures qui correspondent aux critères.`);
  parts.push(`Privilégie les annonces avec de bonnes notes et un bon rapport qualité/prix.`);
  parts.push(`Ta réponse DOIT être uniquement du JSON pur :`);
  parts.push(`{
  "summary": "Résumé : comparaison des plateformes, fourchette de prix, tendances",
  "results": [
    {
      "title": "Titre exact de l'annonce",
      "location": "Localisation",
      "price": "XX€/nuit",
      "description": "Description basée sur les données scrapées (2-3 phrases)",
      "highlights": ["Point fort 1", "Point fort 2", "Point fort 3"],
      "platform": "Airbnb ou Booking.com ou Abritel",
      "rating": 4.8,
      "reviewCount": 125,
      "url": "https://lien-exact-scrapé ou null"
    }
  ],
  "tips": "Conseils : comparaison des prix entre plateformes, meilleur moment pour réserver"
}`);

  return parts.join("\n");
}