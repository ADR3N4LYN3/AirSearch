"use client";

import GuestCounter from "./GuestCounter";

interface GuestSectionProps {
  adults: number;
  children: number;
  infants: number;
  onAdultsChange: (value: number) => void;
  onChildrenChange: (value: number) => void;
  onInfantsChange: (value: number) => void;
}

export default function GuestSection({
  adults,
  children,
  infants,
  onAdultsChange,
  onChildrenChange,
  onInfantsChange,
}: GuestSectionProps) {
  return (
    <div
      style={{
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-card)",
        padding: "14px 20px",
        background: "var(--surface)",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        maxWidth: "420px",
        margin: "0 auto",
        width: "100%",
      }}
    >
      <GuestCounter
        label="Adultes"
        subtitle="13 ans et plus"
        value={adults}
        min={1}
        max={16}
        onChange={onAdultsChange}
      />

      <div style={{ height: "1px", background: "var(--border)" }} />

      <GuestCounter
        label="Enfants"
        subtitle="De 2 à 12 ans"
        value={children}
        min={0}
        max={10}
        onChange={onChildrenChange}
      />

      <div style={{ height: "1px", background: "var(--border)" }} />

      <GuestCounter
        label="Bébés"
        subtitle="Moins de 2 ans"
        value={infants}
        min={0}
        max={5}
        onChange={onInfantsChange}
      />
    </div>
  );
}
