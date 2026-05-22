"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/actions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "login", email, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.error) {
      setError("Email hoặc mật khẩu không đúng");
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <div style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "42% 1fr" }}>

      {/* ── LEFT BRAND PANEL ── */}
      <div style={{
        background: "var(--text)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 40px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Decorative blobs */}
        <div style={{ position: "absolute", top: -80, left: -80, width: 300, height: 300, borderRadius: "50%", background: "rgba(232,119,34,0.12)" }} />
        <div style={{ position: "absolute", bottom: -60, right: -60, width: 240, height: 240, borderRadius: "50%", background: "rgba(76,140,74,0.10)" }} />

        <div style={{ position: "relative", textAlign: "center" }}>
          {/* Logo mark */}
          <div style={{
            width: 96,
            height: 96,
            borderRadius: 28,
            background: "var(--primary)",
            display: "grid",
            placeItems: "center",
            fontSize: 48,
            margin: "0 auto 28px",
            boxShadow: "0 8px 32px rgba(232,119,34,0.4)",
          }}>🥐</div>

          <div style={{
            fontFamily: "var(--font-display)",
            fontSize: 48,
            fontWeight: 900,
            color: "white",
            letterSpacing: "-0.03em",
            lineHeight: 1,
            marginBottom: 14,
          }}>Still Good</div>

          <div style={{
            fontSize: 11,
            fontWeight: 700,
            color: "var(--primary)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            marginBottom: 32,
          }}>Good Food. Saved.</div>

          <p style={{
            fontSize: 18,
            fontWeight: 700,
            color: "white",
            lineHeight: 1.4,
            maxWidth: 280,
            opacity: 0.9,
          }}>
            Cứu bánh ngon cuối ngày,<br />
            <em style={{ color: "var(--primary)", fontStyle: "italic" }}>tiết kiệm mỗi tối.</em>
          </p>
        </div>

        <p style={{
          position: "absolute",
          bottom: 28,
          fontSize: 12,
          color: "rgba(255,255,255,0.35)",
        }}>© 2026 Still Good</p>
      </div>

      {/* ── RIGHT FORM PANEL ── */}
      <div style={{
        background: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 40px",
      }}>
        <div style={{ width: "100%", maxWidth: 400 }}>
          <h1 style={{ fontSize: 28, marginBottom: 8, fontWeight: 900 }}>Đăng nhập</h1>
          <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 32 }}>
            Chưa có tài khoản?{" "}
            <Link href="/register" style={{ color: "var(--primary)", fontWeight: 700 }}>Đăng ký ngay</Link>
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: 8 }}>
                Địa chỉ email <span style={{ color: "var(--danger)" }}>*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ban@email.com"
                style={{
                  width: "100%",
                  padding: "13px 16px",
                  borderRadius: 12,
                  border: "1.5px solid var(--border)",
                  fontSize: 14,
                  outline: "none",
                  background: "var(--ivory)",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
              />
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <label style={{ fontSize: 13, fontWeight: 700 }}>
                  Mật khẩu <span style={{ color: "var(--danger)" }}>*</span>
                </label>
                <Link href="/forgot-password" style={{ fontSize: 12, color: "var(--primary)", fontWeight: 600 }}>
                  Quên mật khẩu?
                </Link>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  type={showPw ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{
                    width: "100%",
                    padding: "13px 48px 13px 16px",
                    borderRadius: 12,
                    border: "1.5px solid var(--border)",
                    fontSize: 14,
                    outline: "none",
                    background: "var(--ivory)",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  style={{
                    position: "absolute",
                    right: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: 16,
                    color: "var(--text-muted)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                  aria-label={showPw ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  {showPw ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {error && (
              <div style={{ padding: "12px 14px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, fontSize: 13, color: "var(--danger)" }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "14px",
                fontSize: 15,
                fontWeight: 700,
                borderRadius: 12,
                background: loading ? "var(--border)" : "var(--text)",
                color: "white",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "background 0.2s",
                marginTop: 4,
              }}
            >
              {loading ? "Đang đăng nhập..." : "ĐĂNG NHẬP"}
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "4px 0" }}>
              <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
              <span style={{ fontSize: 12, color: "var(--text-muted)" }}>hoặc</span>
              <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
            </div>

            <Link
              href="/register"
              style={{
                width: "100%",
                padding: "13px",
                fontSize: 14,
                fontWeight: 700,
                borderRadius: 12,
                background: "transparent",
                color: "var(--text)",
                border: "1.5px solid var(--text)",
                textAlign: "center",
                display: "block",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--cream)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              Đăng ký tài khoản mới
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
