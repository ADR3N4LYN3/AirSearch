"use client";

import { useState, useCallback } from "react";
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
} from "lucide-react";
import ChipSelect from "./ChipSelect";
import LoadingState from "./LoadingState";
import ResultsList from "./ResultsList";
import LocationPicker from "./LocationPicker";
import DatePicker from "./DatePicker";
import GuestSection from "./search-form/GuestSection";
import BudgetSection from "./search-form/BudgetSection";

const GOOGLE_MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY ?? "";

interface SearchFormProps {
  defaultLocation?: string;
}

export default function SearchForm({ defaultLocation = "" }: SearchFormProps) {
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
  const [lat, setLat] = useState<number | undefined>(undefined);
  const [lng, setLng] = useState<number | undefined>(undefined);
  const [radius, setRadius] = useState(10);

  // UI state
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePropertyTypeToggle = (id: string) => {
    setPropertyTypes((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleAmenityToggle = (id: string) => {
    setAmenities((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const handleLocationChange = useCallback((newLat: number, newLng: number) => {
    setLat(newLat);
    setLng(newLng);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!destination.trim()) {
      setError("Veuillez indiquer une destination.");
      return;
    }

    setError(null);
    setLoading(true);
    setResults(null);

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
      extraNotes: extraNotes.trim() || undefined,
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
    } catch {
      setError("Impossible de contacter le serveur. Réessayez plus tard.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResults(null);
    setError(null);
  };

  if (loading) return <LoadingState />;
  if (results?.data) return <ResultsList data={results.data} onReset={handleReset} />;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col" style={{ gap: 0 }}>
      {/* Error banner */}
      {error && (
        <div
          className="animate-fade-in flex items-center gap-2.5 text-sm px-4 py-3"
          style={{
            background: "rgba(255, 56, 92, 0.06)",
            border: "1px solid rgba(255, 56, 92, 0.2)",
            borderRadius: "var(--radius-input)",
            color: "var(--accent)",
            marginBottom: "24px",
          }}
        >
          <AlertCircle size={18} style={{ flexShrink: 0 }} />
          {error}
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

      <div style={{ height: "1px", background: "var(--border)", margin: "0 0 28px 0" }} />

      {/* SECTION 6: Notes */}
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
