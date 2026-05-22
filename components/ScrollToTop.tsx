"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title="Lên đầu trang"
      style={{
        position: "fixed",
        bottom: 32,
        right: 32,
        zIndex: 900,
        width: 44,
        height: 44,
        borderRadius: "50%",
        background: "var(--primary)",
        color: "white",
        border: "none",
        cursor: "pointer",
        display: "grid",
        placeItems: "center",
        boxShadow: "0 4px 16px rgba(232,119,34,0.4)",
        opacity: visible ? (hovered ? 1 : 0.45) : 0,
        transform: visible ? `translateY(0) scale(${hovered ? 1.1 : 1})` : "translateY(16px) scale(0.8)",
        transition: "opacity 0.2s ease, transform 0.25s cubic-bezier(0.34,1.56,0.64,1)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 13.5V4.5M9 4.5L4.5 9M9 4.5L13.5 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
