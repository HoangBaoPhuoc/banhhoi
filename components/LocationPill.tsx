"use client";

import { useLocation } from "@/lib/location-context";

export default function LocationPill() {
  const { coords, address, loading, requestLocation } = useLocation();

  return (
    <button
      className="addr-pill"
      onClick={requestLocation}
      title={coords ? "Cập nhật vị trí" : "Bật vị trí để tìm tiệm gần bạn"}
      style={{ cursor: "pointer", border: "none", transition: "background 0.2s" }}
    >
      {loading ? (
        <>
          <span style={{ display: "inline-block", animation: "spin 0.8s linear infinite" }}>⌛</span>
          <span>Đang xác định...</span>
        </>
      ) : coords ? (
        <>
          <span>📍</span>
          <span style={{ maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {address ?? "Vị trí của bạn"}
          </span>
        </>
      ) : (
        <>
          <span>📍</span>
          <span style={{ color: "var(--text-muted)" }}>Bật vị trí</span>
        </>
      )}
    </button>
  );
}
