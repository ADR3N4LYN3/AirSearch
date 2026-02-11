import { NextRequest, NextResponse } from "next/server";
import { getClientIp, isRateLimited } from "@/lib/rate-limiter";
import { ALLOWED_PLATFORMS, MAX_STRING_LENGTH } from "@/lib/constants";
import { sanitizeText } from "@/lib/validators/search";

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:";
  } catch {
    return false;
  }
}

function sanitizeString(value: unknown, maxLen = MAX_STRING_LENGTH): string | undefined {
  if (typeof value !== "string") return undefined;
  const cleaned = sanitizeText(value);
  return cleaned.length > 0 ? cleaned.slice(0, maxLen) : undefined;
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: "Trop de requêtes. Veuillez patienter." },
        { status: 429 },
      );
    }

    const body: unknown = await req.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Corps de la requête invalide." },
        { status: 400 },
      );
    }

    const b = body as Record<string, unknown>;

    const platform = sanitizeString(b.platform);
    const url = sanitizeString(b.url, 2000);

    if (!platform || !ALLOWED_PLATFORMS.has(platform)) {
      return NextResponse.json(
        { success: false, error: "Plateforme invalide." },
        { status: 400 },
      );
    }
    if (!url || !isValidUrl(url)) {
      return NextResponse.json(
        { success: false, error: "URL invalide." },
        { status: 400 },
      );
    }

    const title = sanitizeString(b.title, 200);
    const location = sanitizeString(b.location, 200);
    const price = sanitizeString(b.price, 50);

    console.log("Affiliate click tracked:", {
      platform,
      url: url.split("?")[0],
      title,
      location,
      price,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Click] Erreur lors du suivi du clic:", error);
    return NextResponse.json(
      { success: false, error: "Erreur interne du serveur." },
      { status: 500 },
    );
  }
}
