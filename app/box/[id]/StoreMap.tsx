"use client";

import { useEffect, useRef } from "react";

export default function StoreMap({ lat, lng, name }: { lat: number; lng: number; name: string }) {
  const ref    = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (!ref.current || mapRef.current) return;

    import("leaflet").then((Lm) => {
      const L = Lm.default ?? Lm;
      if (!ref.current || mapRef.current) return;

      if (!document.getElementById("leaflet-css")) {
        const link = document.createElement("link");
        link.id = "leaflet-css"; link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);
      }

      const map = L.map(ref.current, {
        center: [lat, lng], zoom: 16,
        zoomControl: true, scrollWheelZoom: false,
        dragging: true, attributionControl: false,
      });

      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", { maxZoom: 19 }).addTo(map);

      const icon = L.divIcon({
        className: "",
        html: `<div style="width:22px;height:22px;border-radius:50%;background:#e87722;border:3px solid white;box-shadow:0 2px 10px rgba(232,119,34,0.5)"></div>`,
        iconSize: [22, 22], iconAnchor: [11, 11],
      });

      L.marker([lat, lng], { icon }).addTo(map).bindPopup(`<strong>${name}</strong>`, { maxWidth: 160 });

      mapRef.current = map;
    });

    return () => {
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={ref} style={{ height: "100%", width: "100%" }} />;
}
