import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "./LogoutButton";
import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";

export default async function SiteHeader() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="site-header">
      <Link href="/" className="logo">
        <div className="logo-mark">🥐</div>
        <div className="logo-text">
          <strong>Still Good</strong>
          <span>Good Food. Saved.</span>
        </div>
      </Link>

      <div className="addr-pill">
        <span>📍</span>
        <span>Hồ Chí Minh, Việt Nam</span>
      </div>

      <NavLinks />

      <SearchBar />

      {user ? (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="/profile" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600 }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--primary-soft)", border: "2px solid var(--primary)", display: "grid", placeItems: "center", fontSize: 15 }}>
              👤
            </div>
          </Link>
          <LogoutButton />
        </div>
      ) : (
        <div style={{ display: "flex", gap: 8 }}>
          <Link href="/login" className="btn btn-ghost" style={{ padding: "9px 16px", fontSize: 13 }}>
            Đăng nhập
          </Link>
          <Link href="/register" className="btn btn-primary" style={{ padding: "9px 16px", fontSize: 13 }}>
            Đăng ký
          </Link>
        </div>
      )}
    </header>
  );
}
