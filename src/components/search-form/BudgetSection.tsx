"use client";

interface BudgetSectionProps {
  budgetMin: number | undefined;
  budgetMax: number | undefined;
  onBudgetMinChange: (value: number | undefined) => void;
  onBudgetMaxChange: (value: number | undefined) => void;
}

export default function BudgetSection({
  budgetMin,
  budgetMax,
  onBudgetMinChange,
  onBudgetMaxChange,
}: BudgetSectionProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="budgetMin"
          className="text-xs font-medium uppercase tracking-wide"
          style={{ color: "var(--text-secondary)" }}
        >
          Minimum
        </label>
        <div style={{ position: "relative" }}>
          <input
            id="budgetMin"
            type="number"
            min={0}
            placeholder="50"
            value={budgetMin ?? ""}
            onChange={(e) =>
              onBudgetMinChange(e.target.value ? Number(e.target.value) : undefined)
            }
            style={{ paddingRight: "36px" }}
          />
          <span
            style={{
              position: "absolute",
              right: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-secondary)",
              fontSize: "0.9rem",
              pointerEvents: "none",
            }}
          >
            EUR
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="budgetMax"
          className="text-xs font-medium uppercase tracking-wide"
          style={{ color: "var(--text-secondary)" }}
        >
          Maximum
        </label>
        <div style={{ position: "relative" }}>
          <input
            id="budgetMax"
            type="number"
            min={0}
            placeholder="300"
            value={budgetMax ?? ""}
            onChange={(e) =>
              onBudgetMaxChange(e.target.value ? Number(e.target.value) : undefined)
            }
            style={{ paddingRight: "36px" }}
          />
          <span
            style={{
              position: "absolute",
              right: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-secondary)",
              fontSize: "0.9rem",
              pointerEvents: "none",
            }}
          >
            EUR
          </span>
        </div>
      </div>
    </div>
  );
}
