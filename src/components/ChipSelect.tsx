"use client";

import { memo } from "react";
import type { ChipItem } from "@/lib/constants-ui";

interface ChipSelectProps {
  items: ChipItem[];
  selected: string | string[];
  onToggle: (id: string) => void;
  multi?: boolean;
}

export default memo(function ChipSelect({
  items,
  selected,
  onToggle,
  multi = false,
}: ChipSelectProps) {
  const isSelected = (id: string): boolean => {
    if (multi && Array.isArray(selected)) {
      return selected.includes(id);
    }
    return selected === id;
  };

  return (
    <div className="flex flex-wrap gap-2.5">
      {items.map((item) => {
        const active = isSelected(item.id);
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onToggle(item.id)}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm cursor-pointer select-none"
            style={{
              borderRadius: "var(--radius-chip)",
              border: active
                ? "2px solid var(--accent)"
                : "1px solid var(--border)",
              background: active ? "rgba(255, 56, 92, 0.06)" : "var(--bg)",
              color: active ? "var(--accent)" : "var(--text-primary)",
              fontWeight: active ? 600 : 400,
              padding: active ? "9px 15px" : "10px 16px",
              boxShadow: "none",
              transition:
                "all 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease",
            }}
            onMouseEnter={(e) => {
              if (!active) {
                e.currentTarget.style.borderColor = "var(--border-focus)";
                e.currentTarget.style.boxShadow =
                  "0 2px 8px rgba(0, 0, 0, 0.06)";
              }
            }}
            onMouseLeave={(e) => {
              if (!active) {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.boxShadow = "none";
              }
            }}
            aria-pressed={active}
          >
            <span className="flex items-center leading-none">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
})
