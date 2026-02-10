"use client";

interface NumberInputProps {
  label: string;
  value: number | undefined;
  onChange: (value: number | undefined) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  placeholder?: string;
}

export default function NumberInput({
  label,
  value,
  onChange,
  min = 0,
  max = 1000,
  step = 1,
  unit,
  placeholder,
}: NumberInputProps) {
  const handleIncrement = () => {
    const current = value ?? min;
    if (current < max) {
      onChange(current + step);
    }
  };

  const handleDecrement = () => {
    const current = value ?? min;
    if (current > min) {
      onChange(current - step);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label
        className="text-sm font-medium"
        style={{ color: "var(--text-secondary)" }}
      >
        {label}
      </label>
      <div
        className="flex items-center justify-between gap-3"
        style={{
          padding: "8px 12px",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-input)",
          background: "var(--bg)",
        }}
      >
        <button
          type="button"
          onClick={handleDecrement}
          disabled={(value ?? min) <= min}
          className="number-btn"
          aria-label="Diminuer"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 8H12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="flex items-center gap-1.5">
          <span
            className="text-base font-semibold tabular-nums"
            style={{ color: "var(--text-primary)", minWidth: "24px", textAlign: "center" }}
          >
            {value ?? placeholder ?? min}
          </span>
          {unit && (
            <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
              {unit}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleIncrement}
          disabled={(value ?? min) >= max}
          className="number-btn"
          aria-label="Augmenter"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 4V12M4 8H12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
