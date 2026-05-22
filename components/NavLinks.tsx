"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import PartnerModal from "./PartnerModal";

const items = [
  { href: "/", label: "Trang chủ", key: "home" },
  { href: "/discover", label: "Khám phá Box", key: "discover" },
  { href: "/about", label: "Về chúng tôi", key: "about" },
  { href: "/delivery", label: "Nhận hàng", key: "delivery" },
  { href: "/partner", label: "Dành cho cửa hàng", key: "partner" },
];

export default function NavLinks() {
  const pathname = usePathname();
  const [hoverPos, setHoverPos] = useState<{ left: number; width: number } | null>(null);
  const [activePos, setActivePos] = useState<{ left: number; width: number } | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [partnerOpen, setPartnerOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // recompute active underline position after DOM settles
  useEffect(() => {
    const activeIdx = items.findIndex((item) => {
      if (item.key === "partner") return false;
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
          item.key === "partner" ? false
          : item.key === "home" ? pathname === "/"
          : pathname.startsWith(item.href);

        return (
          <Link
            key={item.key}
            href={item.key === "partner" ? "#" : item.href}
            ref={(el) => { linkRefs.current[i] = el; }}
            className={active ? "active" : ""}
            onMouseEnter={(e) => {
              if (!navRef.current) return;
              const navRect = navRef.current.getBoundingClientRect();
              const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
              setHoverPos({ left: rect.left - navRect.left, width: rect.width });
              setIsHovering(true);
            }}
            onClick={(e) => {
              if (item.key === "home") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else if (item.key === "partner") {
                e.preventDefault();
                setPartnerOpen(true);
                setIsHovering(false);
              }
            }}
          >
            {item.label}
          </Link>
        );
      })}

      {partnerOpen && <PartnerModal onClose={() => setPartnerOpen(false)} />}

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
