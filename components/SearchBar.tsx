"use client";

import { useRef, useState } from "react";

export default function SearchBar() {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const open = hovered || focused;
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => inputRef.current?.focus()}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 12px",
        borderRadius: 12,
        border: `1.5px solid ${open ? "var(--border)" : "transparent"}`,
        background: open ? "var(--ivory)" : "transparent",
        width: open ? 220 : 168,
        transition: "width 0.3s cubic-bezier(0.4,0,0.2,1), border-color 0.2s, background 0.2s",
        cursor: "text",
        overflow: "hidden",
      }}
    >
      <svg width="14" height="14" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0, color: "var(--text-muted)" }}>
        <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>

      <input
        ref={inputRef}
        placeholder="Box gần bạn..."
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          border: "none",
          outline: "none",
          background: "transparent",
          fontSize: 14,
          color: "var(--text)",
          width: "100%",
          caretColor: "var(--primary)",
        }}
      />
    </div>
  );
}
