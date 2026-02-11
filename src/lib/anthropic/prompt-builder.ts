import type { SearchRequest } from "../types";
import { formatCriteria } from "../format-criteria";

function escapePromptValue(value: string): string {
  return value
    .replace(/[`"']/g, "")
    .replace(/[\n\r]/g, " ")
    .trim();
}

export function buildSearchPrompt(criteria: SearchRequest): string {
  const parts: string[] = [];
  const safeDestination = escapePromptValue(criteria.destination);

  parts.push(
    `Tu es un assistant spécialisé dans la recherche de locations de vacances et hébergements.`
  );
  parts.push(
    `L'utilisateur cherche un logement avec les critères suivants :\n`
  );

  parts.push(...formatCriteria(criteria));

  parts.push("");
  parts.push(`STRATÉGIE DE RECHERCHE :`);
  parts.push(
    `1. Effectue des recherches web CIBLÉES par plateforme. Exemples de requêtes efficaces :`
  );
  parts.push(
    `   - "site:airbnb.fr ${safeDestination} location" ou "airbnb ${safeDestination} location vacances"`
  );
  parts.push(
    `   - "site:booking.com ${safeDestination} appartement" ou "booking.com ${safeDestination} location"`
  );
  parts.push(
    `   - "site:abritel.fr ${safeDestination}" ou "abritel ${safeDestination} location vacances"`
  );
  parts.push(
    `2. VARIE les plateformes : inclus au minimum 2 plateformes différentes dans tes résultats. Ne propose PAS uniquement des résultats Airbnb.`
  );
  parts.push(
    `3. PRIVILÉGIE les annonces avec de bonnes notes (4.0+/5 ou 8.0+/10). Les notes et avis sont un critère essentiel de qualité.`
  );
  parts.push(
    `4. Pour chaque résultat, cherche la NOTE réelle de l'annonce (ex: 4.8/5 sur Airbnb, 8.9/10 sur Booking) et le NOMBRE D'AVIS. Si tu ne trouves pas la note exacte, indique null.`
  );
  parts.push(
    `5. ⚠️ CRITIQUE : L'URL doit pointer vers UNE PROPRIÉTÉ SPÉCIFIQUE (ex: airbnb.fr/rooms/123456 ou booking.com/hotel/fr/nom-hotel.html), PAS vers une page de recherche générique (searchresults, search, etc.). Clique sur les résultats individuels pour obtenir l'URL exacte.`
  );

  parts.push("");
  parts.push(`FORMAT DE RÉPONSE :`);
  parts.push(
    `- Propose entre 3 et 5 résultats de VRAIES annonces trouvées sur le web.`
  );
  parts.push(
    `- Ta réponse DOIT être uniquement du JSON pur. Pas de markdown, pas de backticks, pas de texte avant ou après.`
  );
  parts.push(
    `- Voici le format JSON exact :`
  );
  parts.push(`{
  "summary": "Résumé du marché : fourchette de prix, disponibilité, tendances pour cette destination",
  "results": [
    {
      "title": "Nom exact du logement tel qu'affiché sur la plateforme",
      "location": "Quartier ou adresse précise",
      "price": "XX€/nuit",
      "description": "Description du logement (2-3 phrases, basée sur l'annonce réelle)",
      "highlights": ["Point fort 1", "Point fort 2", "Point fort 3"],
      "platform": "Airbnb ou Booking.com ou Abritel ou Vrbo",
      "rating": 4.8,
      "reviewCount": 125,
      "url": "https://URL-DIRECTE-VERS-PROPRIÉTÉ-SPÉCIFIQUE (JAMAIS searchresults ou pages de recherche) ou null si introuvable"
    }
  ],
  "tips": "Conseils pratiques : meilleure période, quartiers, transports, bons plans"
}`);
  parts.push("");
  parts.push(
    `IMPORTANT :`
  );
  parts.push(
    `- "rating" est un nombre décimal (ex: 4.8 pour Airbnb sur /5, ou 8.9 pour Booking sur /10 — convertis en /5 soit 4.45). "reviewCount" est le nombre entier d'avis. Mets null si l'information n'est pas trouvée.`
  );
  parts.push(
    `- "url" doit ABSOLUMENT pointer vers une annonce individuelle (ex: booking.com/hotel/fr/villa-example.html ou airbnb.fr/rooms/12345). Si tu ne trouves pas d'URL spécifique, mets null plutôt qu'une page de recherche.`
  );
  parts.push(
    `- Rédige TOUS les textes (summary, description, tips) en français correct et naturel. Pas de fautes, pas de tournures maladroites. Relis-toi.`
  );
  parts.push(
    `- N'inclus AUCUNE balise HTML (<cite>, <a>, <b>, etc.) dans le JSON. Texte brut uniquement.`
  );

  return parts.join("\n");
}
