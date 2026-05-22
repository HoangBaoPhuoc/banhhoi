"use client";

import { useEffect, useRef } from "react";
import { useLocation } from "@/lib/location-context";
import type { StorePin } from "./MapView";

const HCM: [number, number] = [10.7769, 106.7009];

export default function MapInner({ stores, height }: { stores: StorePin[]; height: number }) {
  const { coords } = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);

  // Init map once on mount, destroy on unmount
  useEffect(() => {
    if (!containerRef.current) return;

    let map: any; // eslint-disable-line @typescript-eslint/no-explicit-any

    import("leaflet").then((Lm) => {
      const L = Lm.default ?? Lm;
      if (!containerRef.current || mapRef.current) return;

      // Inject Leaflet CSS once
      if (!document.getElementById("leaflet-css")) {
        const link = document.createElement("link");
        link.id = "leaflet-css";
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);
      }

      const center = coords ? [coords.lat, coords.lng] as [number, number] : HCM;

      map = L.map(containerRef.current, {
        center,
        zoom: 13,
        zoomControl: false,
        scrollWheelZoom: false,
        attributionControl: false,
      });

      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        maxZoom: 19,
      }).addTo(map);

      // User marker
      if (coords) {
        const userIcon = L.divIcon({
          className: "",
          html: `<div style="width:14px;height:14px;border-radius:50%;background:#e87722;border:3px solid white;box-shadow:0 0 0 4px rgba(232,119,34,0.25),0 2px 8px rgba(0,0,0,0.3)"></div>`,
          iconSize: [14, 14],
          iconAnchor: [7, 7],
        });
        L.marker([coords.lat, coords.lng], { icon: userIcon })
          .addTo(map)
          .bindPopup("📍 Vị trí của bạn");
      }

      // Store markers
      stores.forEach((s) => {
        const icon = L.divIcon({
          className: "",
          html: `<div style="background:#e87722;color:white;border-radius:999px;padding:3px 8px;font-size:11px;font-weight:800;white-space:nowrap;box-shadow:0 2px 8px rgba(232,119,34,0.45);border:2px solid white;font-family:sans-serif">🥐 ${s.boxCount}</div>`,
          iconSize: [52, 26],
          iconAnchor: [26, 26],
        });
        L.marker([s.lat, s.lng], { icon })
          .addTo(map)
          .bindPopup(`<strong>${s.name}</strong><br/>${s.boxCount} box còn hôm nay`);
      });

      mapRef.current = map;
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Recenter when user grants location
  useEffect(() => {
    if (!mapRef.current || !coords) return;
    mapRef.current.setView([coords.lat, coords.lng], 14, { animate: true });

    import("leaflet").then((Lm) => {
      const L = Lm.default ?? Lm;
      if (!mapRef.current) return;
      const userIcon = L.divIcon({
        className: "",
        html: `<div style="width:14px;height:14px;border-radius:50%;background:#e87722;border:3px solid white;box-shadow:0 0 0 4px rgba(232,119,34,0.25),0 2px 8px rgba(0,0,0,0.3)"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });
      L.marker([coords.lat, coords.lng], { icon: userIcon })
        .addTo(mapRef.current)
        .bindPopup("📍 Vị trí của bạn");
    });
  }, [coords]);

  return <div ref={containerRef} style={{ height, width: "100%" }} />;
}
