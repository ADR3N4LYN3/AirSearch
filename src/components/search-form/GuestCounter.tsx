"use client";

interface GuestCounterProps {
  label: string;
  subtitle: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}

export default function GuestCounter({
  label,
  subtitle,
  value,
  min,
  max,
  onChange,
}: GuestCounterProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
          {label}
        </div>
        <div className="text-xs" style={{ color: "var(--text-tertiary)" }}>
          {subtitle}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="number-btn"
          aria-label={`Moins de ${label.toLowerCase()}`}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M4 8H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <span
          className="text-sm font-semibold tabular-nums"
          style={{ color: "var(--text-primary)", minWidth: "20px", textAlign: "center" }}
        >
          {value}
        </span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="number-btn"
          aria-label={`Plus de ${label.toLowerCase()}`}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M8 4V12M4 8H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
