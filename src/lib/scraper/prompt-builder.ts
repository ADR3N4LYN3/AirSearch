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

  const MAX_LISTINGS_PER_PLATFORM = 5;
  let totalListings = 0;
  for (const result of scrapeResults) {
    if (result.success && result.listings.length > 0) {
      const top = result.listings.slice(0, MAX_LISTINGS_PER_PLATFORM);
      parts.push(`\n--- ${result.platform} (${top.length} annonces) ---`);
      for (const l of top) {
        const line = [
          l.title,
          l.price ? `PRIX: ${l.price}` : "PRIX: NON DISPONIBLE",
          l.rating != null ? `${l.rating}/5` : "",
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
  parts.push(`RÈGLES STRICTES :`);
  parts.push(`- Le champ "price" DOIT reprendre le prix EXACT des données scrapées (ex: "85€/nuit"). Si le prix indique "NON DISPONIBLE", mets "Prix non disponible".`);
  parts.push(`- Ne JAMAIS inventer un prix. Utilise uniquement les données fournies ci-dessus.`);
  parts.push(`Ta réponse DOIT être uniquement du JSON pur :`);
  parts.push(`{
  "summary": "Résumé court (1-2 phrases)",
  "results": [
    {
      "title": "Titre exact de l'annonce",
      "location": "Localisation",
      "price": "XX€/nuit",
      "description": "Description courte (1-2 phrases)",
      "highlights": ["Point fort 1", "Point fort 2"],
      "platform": "Airbnb ou Booking.com ou Abritel",
      "rating": 4.8,
      "reviewCount": 125,
      "url": "https://lien-exact-scrapé ou null"
    }
  ],
  "tips": "Un conseil pratique"
}`);

  return parts.join("\n");
}