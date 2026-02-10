"use client";

import { useState, useRef, useEffect } from "react";

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  id: string;
  minDate?: string;
}

const DAYS_FR = ["lu", "ma", "me", "je", "ve", "sa", "di"];
const MONTHS_FR = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1; // Monday = 0
}

function formatDate(year: number, month: number, day: number) {
  const m = String(month + 1).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  return `${year}-${m}-${d}`;
}

function parseDate(str: string) {
  if (!str) return null;
  const [y, m, d] = str.split("-").map(Number);
  return { year: y, month: m - 1, day: d };
}

export default function DatePicker({ value, onChange, label, id, minDate }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const today = new Date();
  const parsed = parseDate(value);
  const [viewYear, setViewYear] = useState(parsed?.year ?? today.getFullYear());
  const [viewMonth, setViewMonth] = useState(parsed?.month ?? today.getMonth());

  const todayStr = formatDate(today.getFullYear(), today.getMonth(), today.getDate());

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    if (open) {
      if (parsed) {
        setViewYear(parsed.year);
        setViewMonth(parsed.month);
      } else if (minDate) {
        const min = parseDate(minDate);
        if (min) {
          setViewYear(min.year);
          setViewMonth(min.month);
        }
      }
    }
  }, [open, parsed, minDate]);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const canGoPrevMonth = () => {
    const prevM = viewMonth === 0 ? 11 : viewMonth - 1;
    const prevY = viewMonth === 0 ? viewYear - 1 : viewYear;
    return prevY > today.getFullYear() || (prevY === today.getFullYear() && prevM >= today.getMonth());
  };

  const canGoPrevYear = () => {
    return viewYear - 1 > today.getFullYear() || (viewYear - 1 === today.getFullYear() && viewMonth >= today.getMonth());
  };

  const prevMonth = () => {
    if (!canGoPrevMonth()) return;
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const prevYear = () => {
    if (!canGoPrevYear()) return;
    setViewYear(viewYear - 1);
  };

  const nextYear = () => {
    setViewYear(viewYear + 1);
  };

  const selectDay = (day: number) => {
    onChange(formatDate(viewYear, viewMonth, day));
    setOpen(false);
  };

  const isDisabled = (day: number) => {
    const dateStr = formatDate(viewYear, viewMonth, day);
    if (minDate && dateStr < minDate) return true;
    if (dateStr < todayStr) return true;
    return false;
  };

  const isSelected = (day: number) => {
    if (!parsed) return false;
    return parsed.year === viewYear && parsed.month === viewMonth && parsed.day === day;
  };

  const isToday = (day: number) => {
    return viewYear === today.getFullYear() && viewMonth === today.getMonth() && day === today.getDate();
  };

  const displayValue = parsed
    ? `${parsed.day} ${MONTHS_FR[parsed.month].slice(0, 3)}. ${parsed.year}`
    : "";

  return (
    <div ref={ref} className="relative flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-xs font-medium uppercase tracking-wide"
        style={{ color: "var(--text-secondary)" }}
      >
        {label}
      </label>
      <button
        id={id}
        type="button"
        onClick={() => setOpen(!open)}
        className="text-left w-full transition-all"
        style={{
          fontFamily: "inherit",
          fontSize: "0.95rem",
          color: value ? "var(--text-primary)" : "var(--text-tertiary)",
          background: "var(--surface)",
          border: open ? "1px solid var(--border-focus)" : "1px solid var(--border)",
          borderRadius: "var(--radius-input)",
          padding: "12px 16px",
          outline: "none",
          boxShadow: open ? "0 0 0 2px rgba(34, 34, 34, 0.1)" : "none",
        }}
      >
        {displayValue || "Sélectionner"}
      </button>

      {open && (
        <div
          className="absolute z-50 animate-fade-in w-[calc(100vw-48px)] sm:w-[300px]"
          style={{
            top: "calc(100% + 8px)",
            left: 0,
            maxWidth: "300px",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-card)",
            boxShadow: "var(--shadow-xl)",
            padding: "16px",
          }}
        >
          {/* Header: year + month nav */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={prevYear}
                disabled={!canGoPrevYear()}
                className="flex items-center justify-center"
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  border: "1px solid var(--border)",
                  background: "transparent",
                  cursor: canGoPrevYear() ? "pointer" : "default",
                  color: "var(--text-primary)",
                  opacity: canGoPrevYear() ? 1 : 0.3,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M11 18l-6-6 6-6" />
                  <path d="M17 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={prevMonth}
                disabled={!canGoPrevMonth()}
                className="flex items-center justify-center"
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  border: "1px solid var(--border)",
                  background: "transparent",
                  cursor: canGoPrevMonth() ? "pointer" : "default",
                  color: "var(--text-primary)",
                  opacity: canGoPrevMonth() ? 1 : 0.3,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
            </div>
            <span
              className="text-sm font-semibold"
              style={{
                color: "var(--text-primary)",
                fontFamily: "var(--font-nunito), sans-serif",
              }}
            >
              {MONTHS_FR[viewMonth]} {viewYear}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={nextMonth}
                className="flex items-center justify-center"
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  border: "1px solid var(--border)",
                  background: "transparent",
                  cursor: "pointer",
                  color: "var(--text-primary)",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={nextYear}
                className="flex items-center justify-center"
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  border: "1px solid var(--border)",
                  background: "transparent",
                  cursor: "pointer",
                  color: "var(--text-primary)",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M7 18l6-6-6-6" />
                  <path d="M13 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Day names */}
          <div className="grid grid-cols-7 mb-1">
            {DAYS_FR.map((d) => (
              <div
                key={d}
                className="text-center text-xs font-semibold uppercase"
                style={{
                  color: "var(--text-tertiary)",
                  padding: "4px 0",
                }}
              >
                {d}
              </div>
            ))}
          </div>

          {/* Day grid */}
          <div className="grid grid-cols-7">
            {/* Empty cells before first day */}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const disabled = isDisabled(day);
              const selected = isSelected(day);
              const todayMark = isToday(day);

              return (
                <button
                  key={day}
                  type="button"
                  disabled={disabled}
                  onClick={() => selectDay(day)}
                  className="flex items-center justify-center transition-all"
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    border: "none",
                    fontSize: "14px",
                    fontWeight: selected || todayMark ? 700 : 400,
                    cursor: disabled ? "default" : "pointer",
                    background: selected
                      ? "var(--text-primary)"
                      : "transparent",
                    color: disabled
                      ? "var(--text-tertiary)"
                      : selected
                        ? "var(--text-inverse)"
                        : todayMark
                          ? "var(--accent)"
                          : "var(--text-primary)",
                    opacity: disabled ? 0.35 : 1,
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    if (!disabled && !selected) {
                      e.currentTarget.style.background = "var(--surface-hover)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!disabled && !selected) {
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div
            className="flex items-center justify-between mt-3 pt-3"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <button
              type="button"
              onClick={() => { onChange(""); setOpen(false); }}
              className="text-sm font-medium transition-colors"
              style={{
                background: "transparent",
                border: "none",
                color: "var(--text-secondary)",
                cursor: "pointer",
                padding: "6px 12px",
                borderRadius: "var(--radius-button)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-primary)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; }}
            >
              Effacer
            </button>
            <button
              type="button"
              onClick={() => {
                onChange(formatDate(today.getFullYear(), today.getMonth(), today.getDate()));
                setViewMonth(today.getMonth());
                setViewYear(today.getFullYear());
                setOpen(false);
              }}
              className="text-sm font-medium transition-colors"
              style={{
                background: "transparent",
                border: "none",
                color: "var(--text-secondary)",
                cursor: "pointer",
                padding: "6px 12px",
                borderRadius: "var(--radius-button)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-primary)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; }}
            >
              Aujourd&apos;hui
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
