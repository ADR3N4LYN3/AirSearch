"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  type MapMouseEvent,
} from "@vis.gl/react-google-maps";
import { MapPin } from "lucide-react";

interface Prediction {
  placeId: string;
  mainText: string;
  secondaryText: string;
}

interface LocationPickerProps {
  apiKey: string;
  destination: string;
  onDestinationChange: (value: string) => void;
  lat: number | undefined;
  lng: number | undefined;
  onLocationChange: (lat: number, lng: number) => void;
  radius: number;
  onRadiusChange: (radius: number) => void;
}

const RADIUS_OPTIONS = [1, 2, 5, 10, 15, 25, 50];

export default function LocationPicker({
  apiKey,
  destination,
  onDestinationChange,
  lat,
  lng,
  onLocationChange,
  radius,
  onRadiusChange,
}: LocationPickerProps) {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null);
  const placesService = useRef<google.maps.places.PlacesService | null>(null);
  const sessionToken = useRef<google.maps.places.AutocompleteSessionToken | null>(null);

  const defaultCenter = { lat: lat ?? 48.8566, lng: lng ?? 2.3522 };

  const initServices = useCallback(() => {
    if (autocompleteService.current) return;
    if (!window.google?.maps?.places) return;

    autocompleteService.current = new google.maps.places.AutocompleteService();
    const div = document.createElement("div");
    placesService.current = new google.maps.places.PlacesService(div);
    sessionToken.current = new google.maps.places.AutocompleteSessionToken();
  }, []);

  useEffect(() => {
    if (mapLoaded) initServices();
  }, [mapLoaded, initServices]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const fetchPredictions = useCallback((input: string) => {
    if (!autocompleteService.current || !input.trim()) {
      setPredictions([]);
      setShowDropdown(false);
      return;
    }

    autocompleteService.current.getPlacePredictions(
      {
        input,
        types: ["(cities)"],
        componentRestrictions: { country: "fr" },
        sessionToken: sessionToken.current ?? undefined,
      },
      (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          setPredictions(
            results.map((r) => {
              const terms = r.terms.map((t) => t.value);
              // terms = ["Ville", "Département", "France"] or ["Ville", "France"]
              const city = terms[0];
              const rest = terms.slice(1).join(", ");
              return {
                placeId: r.place_id,
                mainText: city,
                secondaryText: rest,
              };
            })
          );
          setShowDropdown(true);
        } else {
          setPredictions([]);
          setShowDropdown(false);
        }
      }
    );
  }, []);

  const handleSelect = useCallback(
    (prediction: Prediction) => {
      if (!placesService.current) return;

      placesService.current.getDetails(
        {
          placeId: prediction.placeId,
          fields: ["geometry", "formatted_address", "name"],
          sessionToken: sessionToken.current ?? undefined,
        },
        (place, status) => {
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            place?.geometry?.location
          ) {
            const newLat = place.geometry.location.lat();
            const newLng = place.geometry.location.lng();
            onLocationChange(newLat, newLng);
            onDestinationChange(
              `${prediction.mainText}, ${prediction.secondaryText}`
            );
            setShowMap(true);
          }
        }
      );

      setShowDropdown(false);
      setPredictions([]);
      // Reset session token after selection
      sessionToken.current = new google.maps.places.AutocompleteSessionToken();
    },
    [onLocationChange, onDestinationChange]
  );

  const handleInputChange = useCallback(
    (value: string) => {
      onDestinationChange(value);
      fetchPredictions(value);
    },
    [onDestinationChange, fetchPredictions]
  );

  // Show map if coordinates already set
  useEffect(() => {
    if (lat !== undefined && lng !== undefined) {
      setShowMap(true);
    }
  }, [lat, lng]);

  const handleMapClick = useCallback(
    (e: MapMouseEvent) => {
      const detail = e.detail;
      if (detail.latLng) {
        onLocationChange(detail.latLng.lat, detail.latLng.lng);
      }
    },
    [onLocationChange]
  );

  // Radius in meters for the circle
  const radiusMeters = radius * 1000;

  return (
    <div className="flex flex-col gap-4">
      {/* Label with map pin icon */}
      <label
        htmlFor="destination"
        className="flex items-center gap-2 text-sm font-semibold"
        style={{ color: "var(--text-primary)" }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
            fill="var(--accent)"
          />
          <circle cx="12" cy="9" r="2.5" fill="white" />
        </svg>
        Destination
      </label>

      <APIProvider
        apiKey={apiKey}
        onLoad={() => setMapLoaded(true)}
        libraries={["places"]}
      >
        {/* Search input with custom autocomplete dropdown */}
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-secondary)",
              display: "flex",
              alignItems: "center",
              pointerEvents: "none",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="11"
                cy="11"
                r="7"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M20 20l-3.5-3.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <input
            ref={inputRef}
            id="destination"
            type="text"
            value={destination}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={() => predictions.length > 0 && setShowDropdown(true)}
            placeholder="Rechercher une destination..."
            autoComplete="off"
            style={{
              paddingLeft: "42px",
              fontSize: "1rem",
              height: "48px",
            }}
          />

          {/* Custom dropdown */}
          {showDropdown && predictions.length > 0 && (
            <div
              ref={dropdownRef}
              style={{
                position: "absolute",
                top: "calc(100% + 4px)",
                left: 0,
                right: 0,
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                boxShadow: "var(--shadow-lg)",
                zIndex: 50,
                overflow: "hidden",
              }}
            >
              {predictions.map((p) => (
                <button
                  key={p.placeId}
                  type="button"
                  onClick={() => handleSelect(p)}
                  className="flex items-center gap-3 w-full text-left cursor-pointer"
                  style={{
                    padding: "12px 16px",
                    background: "none",
                    border: "none",
                    borderBottom: "1px solid var(--border)",
                    transition: "background 0.15s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "var(--surface-hover)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "none")
                  }
                >
                  <MapPin
                    size={16}
                    color="var(--accent)"
                    style={{ flexShrink: 0 }}
                  />
                  <div>
                    <span
                      className="text-sm font-medium"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {p.mainText}
                    </span>
                    <span
                      className="text-xs"
                      style={{
                        color: "var(--text-secondary)",
                        marginLeft: "6px",
                      }}
                    >
                      {p.secondaryText}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Radius selector */}
        <div className="flex flex-col items-center gap-2.5" style={{ marginTop: "4px" }}>
          <span
            className="text-xs font-medium tracking-wide uppercase"
            style={{ color: "var(--text-secondary)" }}
          >
            Rayon de recherche
          </span>
          <div className="flex gap-2 flex-wrap justify-center">
            {RADIUS_OPTIONS.map((r) => {
              const active = radius === r;
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => onRadiusChange(r)}
                  className="px-3.5 py-1.5 text-xs font-medium cursor-pointer select-none"
                  style={{
                    borderRadius: "var(--radius-chip)",
                    border: active
                      ? "2px solid var(--accent)"
                      : "1px solid var(--border)",
                    background: active
                      ? "rgba(255, 56, 92, 0.08)"
                      : "var(--bg)",
                    color: active
                      ? "var(--accent)"
                      : "var(--text-secondary)",
                    fontWeight: active ? 600 : 400,
                    padding: active ? "5px 13px" : "6px 14px",
                    transition: "all 0.2s ease",
                  }}
                >
                  {r} km
                </button>
              );
            })}
          </div>
        </div>

        {/* Map */}
        {showMap && (
          <div
            className="animate-fade-in"
            style={{
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid var(--border)",
              height: "clamp(220px, 40vw, 300px)",
              boxShadow: "var(--shadow-card)",
              marginTop: "4px",
            }}
          >
            <Map
              defaultCenter={defaultCenter}
              center={
                lat !== undefined && lng !== undefined
                  ? { lat, lng }
                  : defaultCenter
              }
              defaultZoom={getZoomForRadius(radius)}
              zoom={getZoomForRadius(radius)}
              mapId="airsearch-map"
              gestureHandling="cooperative"
              disableDefaultUI={false}
              zoomControl={true}
              mapTypeControl={false}
              streetViewControl={false}
              fullscreenControl={false}
              onClick={handleMapClick}
              colorScheme="LIGHT"
            >
              {lat !== undefined && lng !== undefined && (
                <AdvancedMarker position={{ lat, lng }} />
              )}
            </Map>
            {/* Circle overlay info */}
            {lat !== undefined && lng !== undefined && (
              <div
                className="text-xs px-4 py-2 flex items-center gap-2"
                style={{
                  background: "var(--surface)",
                  color: "var(--text-secondary)",
                  borderTop: "1px solid var(--border)",
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="var(--accent)"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                    fill="none"
                  />
                  <circle cx="12" cy="12" r="2" fill="var(--accent)" />
                </svg>
                Rayon de {radius} km autour de ({lat.toFixed(4)},{" "}
                {lng.toFixed(4)})
              </div>
            )}
          </div>
        )}
      </APIProvider>
    </div>
  );
}

function getZoomForRadius(radiusKm: number): number {
  if (radiusKm <= 1) return 14;
  if (radiusKm <= 2) return 13;
  if (radiusKm <= 5) return 12;
  if (radiusKm <= 10) return 11;
  if (radiusKm <= 15) return 10;
  if (radiusKm <= 25) return 9;
  return 8;
}
