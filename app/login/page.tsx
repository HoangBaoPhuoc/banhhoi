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
    <div style={{ minHeight: "100vh", background: "var(--cream)", display: "grid", placeItems: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center", marginBottom: 32 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--primary)", display: "grid", placeItems: "center", fontSize: 22, boxShadow: "var(--shadow-warm)" }}>🥐</div>
          <div style={{ lineHeight: 1.1 }}>
            <div style={{ fontWeight: 800, fontSize: 18, letterSpacing: "-0.02em" }}>Still Good</div>
            <div style={{ fontSize: 10, fontWeight: 600, color: "var(--primary)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Good Food. Saved.</div>
          </div>
        </Link>

        <div style={{ background: "white", borderRadius: 24, padding: "36px 32px", border: "1px solid var(--border)", boxShadow: "var(--shadow-md)" }}>
          <h1 style={{ fontSize: 26, marginBottom: 6, textAlign: "center" }}>Đăng nhập</h1>
          <p style={{ fontSize: 13, color: "var(--text-muted)", textAlign: "center", marginBottom: 28 }}>
            Chưa có tài khoản?{" "}
            <Link href="/register" style={{ color: "var(--primary)", fontWeight: 600 }}>Đăng ký ngay</Link>
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ban@email.com"
                style={{ width: "100%", padding: "11px 14px", borderRadius: 12, border: "1px solid var(--border)", fontSize: 14, outline: "none", background: "var(--ivory)", transition: "border-color 0.2s" }}
                onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
              />
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 600 }}>Mật khẩu</label>
                <Link href="/forgot-password" style={{ fontSize: 12, color: "var(--primary)" }}>Quên mật khẩu?</Link>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ width: "100%", padding: "11px 14px", borderRadius: 12, border: "1px solid var(--border)", fontSize: 14, outline: "none", background: "var(--ivory)", transition: "border-color 0.2s" }}
                onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
              />
            </div>

            {error && (
              <div style={{ padding: "10px 14px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, fontSize: 13, color: "var(--danger)" }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: "100%", padding: "13px", fontSize: 15, borderRadius: 12, marginTop: 4, opacity: loading ? 0.7 : 1 }}
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
