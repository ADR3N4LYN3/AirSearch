"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import type { SearchRequest, SearchResponse } from "@/lib/types";

export interface StreamProgress {
  stage: "scraping" | "analyzing" | "websearch";
  message: string;
  percent: number;
}

export interface StreamState {
  status: "idle" | "connecting" | "streaming" | "done" | "error";
  progress: StreamProgress | null;
  result: SearchResponse | null;
  error: string | null;
}

const INITIAL_STATE: StreamState = {
  status: "idle",
  progress: null,
  result: null,
  error: null,
};

export function useSearchStream() {
  const [state, setState] = useState<StreamState>(INITIAL_STATE);
  const eventSourceRef = useRef<EventSource | null>(null);
  const payloadRef = useRef<SearchRequest | null>(null);

  const closeEventSource = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
  }, []);

  const fallbackToPost = useCallback(async (request: SearchRequest) => {
    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      });

      const data: SearchResponse = await res.json();

      if (!res.ok || !data.success) {
        setState((prev) => ({
          ...prev,
          status: "error",
          error: data.error || "Une erreur est survenue lors de la recherche.",
        }));
        return;
      }

      setState((prev) => ({
        ...prev,
        status: "done",
        result: data,
      }));
    } catch {
      setState((prev) => ({
        ...prev,
        status: "error",
        error: "Impossible de contacter le serveur. Réessayez plus tard.",
      }));
    }
  }, []);

  const startSearch = useCallback(
    (request: SearchRequest) => {
      closeEventSource();
      payloadRef.current = request;

      setState({
        status: "connecting",
        progress: null,
        result: null,
        error: null,
      });

      const encoded = btoa(
        unescape(encodeURIComponent(JSON.stringify(request)))
      );
      const es = new EventSource(`/api/search/stream?q=${encoded}`);
      eventSourceRef.current = es;

      es.addEventListener("progress", (e: MessageEvent) => {
        try {
          const progress: StreamProgress = JSON.parse(e.data);
          setState((prev) => ({
            ...prev,
            status: "streaming",
            progress,
          }));
        } catch {
          console.error("[useSearchStream] Failed to parse progress event");
        }
      });

      es.addEventListener("result", (e: MessageEvent) => {
        try {
          const result: SearchResponse = JSON.parse(e.data);
          setState((prev) => ({
            ...prev,
            status: "done",
            result,
          }));
          closeEventSource();
        } catch {
          console.error("[useSearchStream] Failed to parse result event");
          setState((prev) => ({
            ...prev,
            status: "error",
            error: "Erreur lors de la lecture des résultats.",
          }));
          closeEventSource();
        }
      });

      // Server-sent "event: error" has e.data with JSON payload.
      // Connection-level errors have no data — let es.onerror handle those.
      es.addEventListener("error", (e: MessageEvent) => {
        if (!e.data) return; // Connection error, handled by es.onerror
        try {
          const parsed = JSON.parse(e.data);
          setState((prev) => ({
            ...prev,
            status: "error",
            error: parsed.error || "Une erreur est survenue.",
          }));
        } catch {
          setState((prev) => ({
            ...prev,
            status: "error",
            error: "Une erreur est survenue lors de la recherche.",
          }));
        }
        closeEventSource();
        payloadRef.current = null; // Prevent onerror from triggering fallback
      });

      es.onerror = () => {
        closeEventSource();
        // Only fallback if not already handled by a server-sent error event
        if (payloadRef.current) {
          fallbackToPost(payloadRef.current);
        }
      };
    },
    [closeEventSource, fallbackToPost]
  );

  const cancel = useCallback(() => {
    closeEventSource();
    setState(INITIAL_STATE);
  }, [closeEventSource]);

  const reset = useCallback(() => {
    closeEventSource();
    payloadRef.current = null;
    setState(INITIAL_STATE);
  }, [closeEventSource]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };
  }, []);

  return { state, startSearch, cancel, reset };
}
