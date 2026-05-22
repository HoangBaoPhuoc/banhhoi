"use client";

import dynamic from "next/dynamic";

export type StorePin = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  boxCount: number;
};

// Dynamically import to avoid SSR (Leaflet needs window)
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
  return <MapInner stores={stores} height={height} />;
}
