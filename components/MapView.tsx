"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";

export type StorePin = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  boxCount: number;
};

const MapInner = dynamic(() => import("./MapInner"), {
  ssr: false,
  loading: () => (
    <div style={{
      height: "100%",
      minHeight: 220,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      background: "linear-gradient(135deg, #dcecd9 0%, #c5dcbf 100%)",
    }}>
      <div style={{ fontSize: 32, animation: "pulse 1.5s ease-in-out infinite" }}>🗺️</div>
      <div style={{ fontSize: 12, color: "var(--accent)", fontWeight: 600 }}>Đang tải bản đồ...</div>
    </div>
  ),
});

export default function MapView({ stores, height = 220 }: { stores: StorePin[]; height?: number }) {
  const [expanded, setExpanded] = useState(false);
  const [mounted, setMounted]   = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Close on Escape key
  useEffect(() => {
    if (!expanded) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setExpanded(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [expanded]);

  return (
    <>
      {/* ── Small preview map ── */}
      <div style={{ position: "relative" }}>
        <MapInner stores={stores} height={height} interactive={true} />

        {/* Expand button — top-right, above Leaflet layers */}
        <button
          onClick={() => setExpanded(true)}
          title="Phóng to bản đồ"
          style={{
            position: "absolute", top: 10, right: 10, zIndex: 1000,
            width: 32, height: 32, borderRadius: 8,
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(0,0,0,0.1)",
            cursor: "pointer",
            display: "grid", placeItems: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "white")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.95)")}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
        </button>
      </div>

      {/* ── Expanded modal (portal to body) ── */}
      {mounted && expanded && createPortal(
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "rgba(20,20,20,0.65)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: 24,
            animation: "fadeIn 0.18s ease",
          }}
          onClick={() => setExpanded(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%", maxWidth: 960,
              height: "82vh",
              borderRadius: 20, overflow: "hidden",
              position: "relative",
              boxShadow: "0 32px 80px rgba(0,0,0,0.45)",
            }}
          >
            <MapInner stores={stores} height="100%" interactive={true} />

            {/* Close button */}
            <button
              onClick={() => setExpanded(false)}
              style={{
                position: "absolute", top: 14, right: 14, zIndex: 1000,
                width: 38, height: 38, borderRadius: "50%",
                background: "white", border: "none", cursor: "pointer",
                display: "grid", placeItems: "center",
                boxShadow: "0 2px 12px rgba(0,0,0,0.22)",
                fontSize: 18, color: "var(--text)",
              }}
              title="Đóng (Esc)"
            >
              ✕
            </button>

            {/* Store count badge */}
            <div style={{
              position: "absolute", top: 14, left: 14, zIndex: 1000,
              background: "white", borderRadius: 10, padding: "6px 12px",
              fontSize: 12, fontWeight: 700, color: "var(--text)",
              boxShadow: "0 2px 12px rgba(0,0,0,0.18)",
              display: "flex", alignItems: "center", gap: 6,
            }}>
              🥐 {stores.length} tiệm có box hôm nay
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
