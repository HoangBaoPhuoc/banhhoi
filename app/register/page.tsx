"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/auth/actions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "register", email, password, name }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.error) {
      setError(data.error.includes("already") ? "Email này đã được đăng ký" : data.error);
      return;
    }

    if (data.needsConfirm) {
      setSuccess(true);
    } else {
      router.push("/");
      router.refresh();
    }
  }

  if (success) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--cream)", display: "grid", placeItems: "center", padding: 24 }}>
        <div style={{ background: "white", borderRadius: 24, padding: "48px 40px", maxWidth: 420, width: "100%", textAlign: "center", border: "1px solid var(--border)", boxShadow: "var(--shadow-md)" }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>📧</div>
          <h2 style={{ fontSize: 24, marginBottom: 10 }}>Kiểm tra email của bạn</h2>
          <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.6 }}>
            Chúng tôi đã gửi link xác nhận đến <strong>{email}</strong>. Nhấn vào link để hoàn tất đăng ký.
          </p>
          <Link href="/login" className="btn btn-primary" style={{ marginTop: 24, width: "100%", display: "flex", justifyContent: "center", borderRadius: 12 }}>
            Về trang đăng nhập
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--cream)", display: "grid", placeItems: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center", marginBottom: 32 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--primary)", display: "grid", placeItems: "center", fontSize: 22, boxShadow: "var(--shadow-warm)" }}>🥐</div>
          <div style={{ lineHeight: 1.1 }}>
            <div style={{ fontWeight: 800, fontSize: 18, letterSpacing: "-0.02em" }}>Still Good</div>
            <div style={{ fontSize: 10, fontWeight: 600, color: "var(--primary)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Good Food. Saved.</div>
          </div>
        </Link>

        <div style={{ background: "white", borderRadius: 24, padding: "36px 32px", border: "1px solid var(--border)", boxShadow: "var(--shadow-md)" }}>
          <h1 style={{ fontSize: 26, marginBottom: 6, textAlign: "center" }}>Tạo tài khoản</h1>
          <p style={{ fontSize: 13, color: "var(--text-muted)", textAlign: "center", marginBottom: 28 }}>
            Đã có tài khoản?{" "}
            <Link href="/login" style={{ color: "var(--primary)", fontWeight: 600 }}>Đăng nhập</Link>
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Họ tên</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nguyễn Văn A"
                style={{ width: "100%", padding: "11px 14px", borderRadius: 12, border: "1px solid var(--border)", fontSize: 14, outline: "none", background: "var(--ivory)" }}
                onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ban@email.com"
                style={{ width: "100%", padding: "11px 14px", borderRadius: 12, border: "1px solid var(--border)", fontSize: 14, outline: "none", background: "var(--ivory)" }}
                onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Mật khẩu</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Tối thiểu 6 ký tự"
                style={{ width: "100%", padding: "11px 14px", borderRadius: 12, border: "1px solid var(--border)", fontSize: 14, outline: "none", background: "var(--ivory)" }}
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
              {loading ? "Đang tạo tài khoản..." : "Đăng ký"}
            </button>

            <p style={{ fontSize: 11, color: "var(--text-muted)", textAlign: "center", lineHeight: 1.5 }}>
              Bằng cách đăng ký, bạn đồng ý với{" "}
              <Link href="/terms" style={{ color: "var(--primary)" }}>Điều khoản dịch vụ</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
