import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";
import LocationPill from "./LocationPill";
import MobileMenuToggle from "./MobileMenuToggle";
import UserMenu from "./UserMenu";

export default async function SiteHeader() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="site-header">
      <Link href="/" className="logo">
        <div
          className="logo-mark"
          style={{
            width: 36,
            height: 36,
            backgroundColor: "white",
            backgroundImage: "url('/crumbup-logo-nocap.jpg')",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="logo-text">
          <strong>CrumbUp</strong>
          <span>Save Every Crumb</span>
        </div>
      </Link>

      {/* Desktop-only middle section */}
      <div className="header-middle" style={{ display: "contents" }}>
        <LocationPill />
        <NavLinks />
        <SearchBar />
      </div>

      {/* Desktop-only auth buttons */}
      <div className="header-auth">
        {user ? (
          <UserMenu
            email={user.email ?? ""}
            name={user.user_metadata?.name ?? user.user_metadata?.full_name ?? ""}
          />
        ) : (
          <div style={{ display: "flex", gap: 8 }}>
            <Link
              href="/login"
              className="btn btn-ghost"
              style={{ padding: "9px 16px", fontSize: 13 }}
            >
              Đăng nhập
            </Link>
            <Link
              href="/register"
              className="btn btn-primary"
              style={{ padding: "9px 16px", fontSize: 13 }}
            >
              Đăng ký
            </Link>
          </div>
        )}
      </div>

      {/* Mobile hamburger — hidden on desktop via CSS */}
      <MobileMenuToggle isLoggedIn={!!user} />
    </header>
  );
}
