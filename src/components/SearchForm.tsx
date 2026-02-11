"use client";

import { useState, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import type { SearchRequest, SearchResponse } from "@/lib/types";
import { AMENITIES, PROPERTY_TYPES } from "@/lib/constants-ui";
import {
  MapPin,
  CalendarDays,
  CircleDollarSign,
  Home,
  ListChecks,
  FileText,
  AlertCircle,
  Search,
  Landmark,
} from "lucide-react";
import ChipSelect from "./ChipSelect";
import LoadingState from "./LoadingState";
import ResultsList from "./ResultsList";
import DatePicker from "./DatePicker";
import GuestSection from "./search-form/GuestSection";
import BudgetSection from "./search-form/BudgetSection";

const LocationPicker = dynamic(() => import("./LocationPicker"), { ssr: false });

const GOOGLE_MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY ?? "";

interface SearchFormProps {
  defaultLocation?: string;
  attractions?: string[];
}

export default function SearchForm({ defaultLocation = "", attractions = [] }: SearchFormProps) {
  // Form fields
  const [destination, setDestination] = useState(defaultLocation);
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [budgetMin, setBudgetMin] = useState<number | undefined>(undefined);
  const [budgetMax, setBudgetMax] = useState<number | undefined>(undefined);
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [extraNotes, setExtraNotes] = useState("");
  const [selectedAttractions, setSelectedAttractions] = useState<string[]>([]);
  const [lat, setLat] = useState<number | undefined>(undefined);
  const [lng, setLng] = useState<number | undefined>(undefined);
  const [radius, setRadius] = useState(10);

  // UI state
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLElement>(null);

  const handlePropertyTypeToggle = useCallback((id: string) => {
    setPropertyTypes((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  }, []);

  const handleAmenityToggle = useCallback((id: string) => {
    setAmenities((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  }, []);

  const handleAttractionToggle = useCallback((id: string) => {
    setSelectedAttractions((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  }, []);

  const handleLocationChange = useCallback((newLat: number, newLng: number) => {
    setLat(newLat);
    setLng(newLng);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (!destination.trim()) {
      setError("Veuillez indiquer une destination.");
      return;
    }

    setError(null);
    setLoading(true);
    setResults(null);
    scrollToTop();

    const attractionsNote = selectedAttractions.length > 0
      ? `Proche des attractions : ${selectedAttractions.join(", ")}`
      : "";
    const combinedNotes = [attractionsNote, extraNotes.trim()].filter(Boolean).join(". ");

    const payload: SearchRequest = {
      destination: destination.trim(),
      checkin: checkin || undefined,
      checkout: checkout || undefined,
      adults,
      children,
      infants,
      budgetMin,
      budgetMax,
      propertyType: propertyTypes.length > 0 ? propertyTypes : undefined,
      amenities,
      extraNotes: combinedNotes || undefined,
      lat,
      lng,
      radius,
    };

    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data: SearchResponse = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Une erreur est survenue lors de la recherche.");
        setLoading(false);
        return;
      }

      setResults(data);
    } catch (error) {
      console.error("[SearchForm] Search request failed:", error);
      setError("Impossible de contacter le serveur. Réessayez plus tard.");
    } finally {
      setLoading(false);
    }
  }, [destination, selectedAttractions, extraNotes, checkin, checkout, adults, children, infants, budgetMin, budgetMax, propertyTypes, amenities, lat, lng, radius, scrollToTop]);

  const handleReset = () => {
    setResults(null);
    setError(null);
  };

  if (loading) return <div ref={formRef as React.RefObject<HTMLDivElement>}><LoadingState /></div>;
  if (results?.data) return <div ref={formRef as React.RefObject<HTMLDivElement>}><ResultsList data={results.data} onReset={handleReset} /></div>;

  return (
    <form ref={formRef as React.RefObject<HTMLFormElement>} onSubmit={handleSubmit} className="flex flex-col" style={{ gap: 0 }}>
      {/* Error banner */}
      {error && (
        <div
          className="animate-fade-in"
          style={{
            background: "linear-gradient(135deg, rgba(255,56,92,0.04) 0%, rgba(255,56,92,0.08) 100%)",
            border: "1px solid rgba(255,56,92,0.12)",
            borderRadius: "var(--radius-card)",
            padding: "20px 24px",
            marginBottom: "24px",
            boxShadow: "0 2px 12px rgba(255,56,92,0.06)",
          }}
        >
          <div className="flex items-start gap-4">
            <div
              className="flex items-center justify-center"
              style={{
                width: 40,
                height: 40,
                borderRadius: "var(--radius-card)",
                background: "var(--accent-gradient)",
                flexShrink: 0,
              }}
            >
              <AlertCircle size={20} color="white" />
            </div>
            <div className="flex flex-col gap-1" style={{ paddingTop: 2 }}>
              <span
                className="text-sm font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                Oups, quelque chose s&apos;est mal passé
              </span>
              <span
                className="text-sm"
                style={{ color: "var(--text-secondary)", lineHeight: 1.5 }}
              >
                {error}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 1: Destination */}
      <section style={{ paddingBottom: "28px" }}>
        {GOOGLE_MAPS_KEY ? (
          <LocationPicker
            apiKey={GOOGLE_MAPS_KEY}
            destination={destination}
            onDestinationChange={setDestination}
            lat={lat}
            lng={lng}
            onLocationChange={handleLocationChange}
            radius={radius}
            onRadiusChange={setRadius}
          />
        ) : (
          <div className="flex flex-col gap-2">
            <label
              htmlFor="destination"
              className="flex items-center gap-2 text-sm font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              <MapPin size={18} color="var(--accent)" fill="var(--accent)" />
              Destination
            </label>
            <input
              id="destination"
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Rechercher une destination..."
              autoComplete="off"
            />
          </div>
        )}
      </section>

      <div style={{ height: "1px", background: "var(--border)", margin: "0 0 28px 0" }} />

      {/* SECTION 2: Dates & Voyageurs */}
      <section style={{ paddingBottom: "28px" }}>
        <h3
          className="flex items-center gap-2 text-sm font-semibold"
          style={{ color: "var(--text-primary)", marginBottom: "16px" }}
        >
          <CalendarDays size={18} color="var(--text-primary)" />
          Dates et voyageurs
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" style={{ marginBottom: "20px" }}>
          <DatePicker id="checkin" label="Arrivée" value={checkin} onChange={setCheckin} />
          <DatePicker id="checkout" label="Départ" value={checkout} onChange={setCheckout} minDate={checkin || undefined} />
        </div>

        <GuestSection
          adults={adults}
          children={children}
          infants={infants}
          onAdultsChange={setAdults}
          onChildrenChange={setChildren}
          onInfantsChange={setInfants}
        />
      </section>

      <div style={{ height: "1px", background: "var(--border)", margin: "0 0 28px 0" }} />

      {/* SECTION 3: Budget */}
      <section style={{ paddingBottom: "28px" }}>
        <h3
          className="flex items-center gap-2 text-sm font-semibold"
          style={{ color: "var(--text-primary)", marginBottom: "16px" }}
        >
          <CircleDollarSign size={18} color="var(--text-primary)" />
          Budget par nuit
        </h3>
        <BudgetSection
          budgetMin={budgetMin}
          budgetMax={budgetMax}
          onBudgetMinChange={setBudgetMin}
          onBudgetMaxChange={setBudgetMax}
        />
      </section>

      <div style={{ height: "1px", background: "var(--border)", margin: "0 0 28px 0" }} />

      {/* SECTION 4: Type de logement */}
      <section style={{ paddingBottom: "28px" }}>
        <h3
          className="flex items-center gap-2 text-sm font-semibold"
          style={{ color: "var(--text-primary)", marginBottom: "16px" }}
        >
          <Home size={18} color="var(--text-primary)" />
          Type de logement
        </h3>
        <ChipSelect items={PROPERTY_TYPES} selected={propertyTypes} onToggle={handlePropertyTypeToggle} multi />
      </section>

      <div style={{ height: "1px", background: "var(--border)", margin: "0 0 28px 0" }} />

      {/* SECTION 5: Equipements */}
      <section style={{ paddingBottom: "28px" }}>
        <h3
          className="flex items-center gap-2 text-sm font-semibold"
          style={{ color: "var(--text-primary)", marginBottom: "16px" }}
        >
          <ListChecks size={18} color="var(--text-primary)" />
          Equipements souhaités
        </h3>
        <ChipSelect items={AMENITIES} selected={amenities} onToggle={handleAmenityToggle} multi />
      </section>

      {/* SECTION 6: Attractions (conditional) */}
      {attractions.length > 0 && (
        <>
          <div style={{ height: "1px", background: "var(--border)", margin: "0 0 28px 0" }} />
          <section style={{ paddingBottom: "28px" }}>
            <h3
              className="flex items-center gap-2 text-sm font-semibold"
              style={{ color: "var(--text-primary)", marginBottom: "16px" }}
            >
              <Landmark size={18} color="var(--text-primary)" />
              Attractions à proximité
            </h3>
            <ChipSelect
              items={attractions.map((a) => ({ id: a, label: a, icon: "📍" }))}
              selected={selectedAttractions}
              onToggle={handleAttractionToggle}
              multi
            />
          </section>
        </>
      )}

      <div style={{ height: "1px", background: "var(--border)", margin: "0 0 28px 0" }} />

      {/* SECTION 7: Notes */}
      <section style={{ paddingBottom: "32px" }}>
        <h3
          className="flex items-center gap-2 text-sm font-semibold"
          style={{ color: "var(--text-primary)", marginBottom: "16px" }}
        >
          <FileText size={18} color="var(--text-primary)" />
          Notes supplémentaires
        </h3>
        <textarea
          id="extraNotes"
          value={extraNotes}
          onChange={(e) => setExtraNotes(e.target.value)}
          placeholder="Proche du centre-ville, calme, vue sur mer..."
          rows={3}
          style={{ borderRadius: "var(--radius-card)", fontSize: "0.95rem" }}
        />
      </section>

      {/* Submit button */}
      <div className="flex justify-center w-full">
        <button
          type="submit"
          className="flex items-center justify-center gap-2.5 py-6 px-12 text-base font-semibold cursor-pointer transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
          style={{
            background: "var(--accent-gradient)",
            border: "none",
            borderRadius: "var(--radius-full)",
            color: "#fff",
            letterSpacing: "0.02em",
            fontSize: "1.15rem",
            boxShadow: "0 6px 20px rgba(255, 56, 92, 0.3)",
            maxWidth: "420px",
            width: "100%",
            minHeight: "64px",
          }}
        >
          <Search size={20} color="white" strokeWidth={2.5} />
          Rechercher
        </button>
      </div>
    </form>
  );
}
