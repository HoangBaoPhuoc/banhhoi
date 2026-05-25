"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const items = [
  { href: "/", label: "Trang chủ", key: "home" },
  { href: "/discover", label: "Khám phá Box", key: "discover" },
  { href: "/about", label: "Về chúng tôi", key: "about" },
  { href: "/delivery", label: "Nhận hàng", key: "delivery" },
  { href: "/for-stores", label: "Dành cho cửa hàng", key: "for-stores" },
];

export default function NavLinks() {
  const pathname = usePathname();
  const [hoverPos, setHoverPos] = useState<{ left: number; width: number } | null>(null);
  const [activePos, setActivePos] = useState<{ left: number; width: number } | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // recompute active underline position after DOM settles
  useEffect(() => {
    const activeIdx = items.findIndex((item) => {
      if (item.key === "home") return pathname === "/";
      return pathname.startsWith(item.href);
    });
    if (activeIdx === -1 || !navRef.current) { setActivePos(null); return; }
    const el = linkRefs.current[activeIdx];
    if (!el) return;
    const navRect = navRef.current.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    setActivePos({ left: rect.left - navRect.left, width: rect.width });
  }, [pathname]);

  const displayPos = isHovering ? hoverPos : activePos;

  return (
    <nav
      ref={navRef}
      className="nav"
      style={{ position: "relative" }}
      onMouseLeave={() => setIsHovering(false)}
    >
      {items.map((item, i) => {
        const active =
          item.key === "home" ? pathname === "/"
          : pathname.startsWith(item.href);

        return (
          <Link
            key={item.key}
            href={item.href}
            ref={(el) => { linkRefs.current[i] = el; }}
            className={active ? "active" : ""}
            onMouseEnter={(e) => {
              if (!navRef.current) return;
              const navRect = navRef.current.getBoundingClientRect();
              const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
              setHoverPos({ left: rect.left - navRect.left, width: rect.width });
              setIsHovering(true);
            }}
            onClick={() => {
              if (item.key === "home") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            {item.label}
          </Link>
        );
      })}

      <span
        style={{
          position: "absolute",
          bottom: 0,
          height: 2,
          borderRadius: 999,
          background: "var(--primary)",
          transition: "left 0.22s cubic-bezier(0.4,0,0.2,1), width 0.22s cubic-bezier(0.4,0,0.2,1), opacity 0.15s",
          pointerEvents: "none",
          left: displayPos?.left ?? 0,
          width: displayPos?.width ?? 0,
          opacity: displayPos ? 1 : 0,
        }}
      />
    </nav>
  );
}
