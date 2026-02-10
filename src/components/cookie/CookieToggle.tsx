"use client";

interface CookieToggleProps {
  label: string;
  description: string;
  enabled: boolean;
  disabled?: boolean;
  onToggle?: () => void;
  showBorder?: boolean;
}

export default function CookieToggle({
  label,
  description,
  enabled,
  disabled = false,
  onToggle,
  showBorder = true,
}: CookieToggleProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 16px",
        borderBottom: showBorder ? "1px solid var(--border)" : undefined,
      }}
    >
      <div>
        <div style={{ color: "var(--text-primary)", fontSize: "0.9rem", fontWeight: 600 }}>
          {label}
        </div>
        <div style={{ color: "var(--text-secondary)", fontSize: "0.8rem", marginTop: "2px" }}>
          {description}
        </div>
      </div>
      <button
        disabled={disabled}
        onClick={onToggle}
        style={{
          position: "relative",
          width: "44px",
          height: "24px",
          borderRadius: "12px",
          border: "none",
          cursor: disabled ? "not-allowed" : "pointer",
          transition: "background 0.2s ease",
          flexShrink: 0,
          padding: 0,
          background: enabled ? "var(--accent)" : "var(--border)",
          opacity: disabled ? 0.6 : 1,
        }}
        aria-label={`${label} : ${enabled ? "activés" : "désactivés"}`}
      >
        <div
          style={{
            position: "absolute",
            top: "2px",
            left: enabled ? "22px" : "2px",
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            background: "#fff",
            transition: "left 0.2s ease",
            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
          }}
        />
      </button>
    </div>
  );
}
