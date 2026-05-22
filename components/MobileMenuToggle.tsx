"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import PartnerModal from "./PartnerModal";

const items = [
  { href: "/",         label: "Trang chủ",          key: "home" },
  { href: "/discover", label: "Khám phá Box",        key: "discover" },
  { href: "/about",    label: "Về chúng tôi",        key: "about" },
  { href: "/delivery", label: "Nhận hàng",           key: "delivery" },
  { href: "#partner",  label: "Dành cho cửa hàng",   key: "partner" },
];

export default function MobileMenuToggle({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [open, setOpen] = useState(false);
  const [partnerOpen, setPartnerOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setOpen(false); }, [pathname]);

  // prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  function isActive(item: typeof items[0]) {
    if (item.key === "partner") return false;
    if (item.key === "home") return pathname === "/";
    return pathname.startsWith(item.href);
  }

  return (
    <>
      <button
        className="mobile-menu-btn"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Đóng menu" : "Mở menu"}
      >
        <span className={`hamburger ${open ? "open" : ""}`}>
          <span />
          <span />
          <span />
        </span>
      </button>

      {open && (
        <div className="mobile-drawer" onClick={() => setOpen(false)}>
          <div className="mobile-drawer-inner" onClick={(e) => e.stopPropagation()}>
            <nav className="mobile-nav">
              {items.map((item) => (
                <Link
                  key={item.key}
                  href={item.key === "partner" ? "#" : item.href}
                  className={isActive(item) ? "active" : ""}
                  onClick={(e) => {
                    if (item.key === "partner") {
                      e.preventDefault();
                      setOpen(false);
                      setPartnerOpen(true);
                    } else {
                      setOpen(false);
                    }
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {!isLoggedIn && (
              <div className="mobile-nav-auth">
                <Link href="/login"    className="btn btn-ghost"   onClick={() => setOpen(false)}>Đăng nhập</Link>
                <Link href="/register" className="btn btn-primary" onClick={() => setOpen(false)}>Đăng ký</Link>
              </div>
            )}

            {isLoggedIn && (
              <div className="mobile-nav-auth">
                <Link href="/profile" className="btn btn-ghost" style={{ flex: 1, justifyContent: "center" }} onClick={() => setOpen(false)}>
                  👤 Trang cá nhân
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {partnerOpen && <PartnerModal onClose={() => setPartnerOpen(false)} />}
    </>
  );
}
