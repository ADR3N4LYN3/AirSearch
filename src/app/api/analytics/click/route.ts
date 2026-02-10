import { NextRequest, NextResponse } from "next/server";
import { getClientIp, isRateLimited } from "@/lib/rate-limiter";

/**
 * API endpoint pour tracker les clics sur les liens affiliés
 *
 * Ce endpoint enregistre les clics pour vous permettre de :
 * 1. Analyser quelles plateformes génèrent le plus de clics
 * 2. Calculer votre taux de conversion
 * 3. Identifier les destinations les plus populaires
 * 4. Optimiser votre stratégie de monétisation
 */

interface ClickData {
  platform: string;
  url: string;
  timestamp: string;
  title?: string;
  location?: string;
  price?: string;
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      return NextResponse.json({ success: false, error: "Too many requests" }, { status: 429 });
    }

    const data: ClickData = await req.json();

    // Validation basique
    if (!data.platform || !data.url) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: platform, url" },
        { status: 400 }
      );
    }

    // ============================================
    // OPTION 1 : Logger dans la console (dev)
    // ============================================
    console.log("📊 Affiliate click tracked:", {
      platform: data.platform,
      url: data.url.split("?")[0], // Log URL sans params pour la confidentialité
      title: data.title,
      location: data.location,
      price: data.price,
      timestamp: data.timestamp,
    });

    // ============================================
    // OPTION 2 : Enregistrer dans une base de données
    // ============================================
    // Décommentez et adaptez selon votre BDD (Supabase, MongoDB, PostgreSQL, etc.)
    /*
    await db.clicks.create({
      data: {
        platform: data.platform,
        url: data.url,
        title: data.title,
        location: data.location,
        price: data.price,
        timestamp: new Date(data.timestamp),
        userAgent: req.headers.get("user-agent"),
        ip: req.ip || req.headers.get("x-forwarded-for"),
      }
    });
    */

    // ============================================
    // OPTION 3 : Envoyer à un service d'analytics externe
    // ============================================
    // Exemples : Google Analytics, Plausible, PostHog, Mixpanel
    /*
    await fetch('https://analytics.example.com/api/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'affiliate_click',
        properties: {
          platform: data.platform,
          title: data.title,
          location: data.location,
          price: data.price,
        }
      })
    });
    */

    // ============================================
    // OPTION 4 : Enregistrer dans un fichier log
    // ============================================
    // Utile pour analyser avec des outils comme AWStats, GoAccess, etc.
    // Note : nécessite un système de fichiers persistant (pas idéal sur Vercel)
    /*
    const fs = require('fs').promises;
    const logLine = `${new Date().toISOString()} | ${data.platform} | ${data.location} | ${data.price}\n`;
    await fs.appendFile('/var/log/airsearch-clicks.log', logLine);
    */

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error tracking click:", error);

    // Ne pas bloquer l'utilisateur si le tracking échoue
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Endpoint GET pour consulter les statistiques (optionnel)
export async function GET(req: NextRequest) {
  // TODO : Implémenter un dashboard pour voir vos statistiques de clics
  // Exemple : nombre de clics par plateforme, destinations populaires, etc.

  return NextResponse.json({
    message: "Analytics dashboard coming soon",
    endpoints: {
      trackClick: "POST /api/analytics/click",
      getStats: "GET /api/analytics/stats (coming soon)",
    },
  });
}