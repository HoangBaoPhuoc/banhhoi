"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import OtpInput from "@/components/OtpInput";
import { createClient } from "@/lib/supabase/client";

type Mode = "phone" | "email";
type Step = "contact" | "otp" | "password";

const OTP_TTL = 300; // 5 phút

export default function LoginPage() {
  const router = useRouter();

  const [mode, setMode] = useState<Mode>("phone");
  const [step, setStep] = useState<Step>("contact");

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(OTP_TTL);

  // countdown timer
  useEffect(() => {
    if (step !== "otp") return;
    setTimer(OTP_TTL);
    const id = setInterval(() => setTimer((t) => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [step]);

  const timerLabel = `${String(Math.floor(timer / 60)).padStart(2, "0")}:${String(timer % 60).padStart(2, "0")}`;
  const maskedContact = mode === "phone"
    ? `+84 ${phone.slice(0, 3)}*** ${phone.slice(-3)}`
    : email.replace(/^(.{3}).*(@.*)$/, "$1***$2");

  async function sendOtp() {
    setError("");
    if (mode === "phone" && phone.replace(/\D/g, "").length < 9) {
      setError("Vui lòng nhập số điện thoại hợp lệ");
      return;
    }
    if (mode === "email" && !email.includes("@")) {
      setError("Vui lòng nhập email hợp lệ");
      return;
    }
    setLoading(true);
    const supabase = createClient();
    let err;
    if (mode === "phone") {
      const digits = phone.replace(/\D/g, "");
      const e164 = `+84${digits.startsWith("0") ? digits.slice(1) : digits}`;
      ({ error: err } = await supabase.auth.signInWithOtp({ phone: e164 }));
    } else {
      ({ error: err } = await supabase.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: false },
      }));
    }
    setLoading(false);
    if (err) { setError(err.message); return; }
    setStep("otp");
  }

  async function verifyOtp() {
    if (otp.length < 6) return;
    setError("");
    setLoading(true);
    const supabase = createClient();
    let result;
    if (mode === "phone") {
      const digits = phone.replace(/\D/g, "");
      const e164 = `+84${digits.startsWith("0") ? digits.slice(1) : digits}`;
      result = await supabase.auth.verifyOtp({ phone: e164, token: otp, type: "sms" });
    } else {
      result = await supabase.auth.verifyOtp({ email, token: otp, type: "email" });
    }
    setLoading(false);
    if (result.error) { setError(result.error.message); return; }
    router.push("/");
    router.refresh();
  }

  async function loginPassword() {
    setError("");
    setLoading(true);
    const res = await fetch("/api/auth/actions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "login", email, password }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.error) { setError("Email hoặc mật khẩu không đúng"); return; }
    router.push("/");
    router.refresh();
  }

  return (
    <div className="auth-layout" style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "42% 1fr" }}>
      <BrandPanel />

      {/* RIGHT */}
      <div style={{ background: "white", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 40px" }}>
        <div style={{ width: "100%", maxWidth: 400 }}>

          {/* ── STEP: CONTACT ── */}
          {step === "contact" && (
            <>
              <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 8 }}>Đăng nhập</h1>
              <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 32 }}>
                Chưa có tài khoản?{" "}
                <Link href="/register" style={{ color: "var(--primary)", fontWeight: 700 }}>Đăng ký ngay</Link>
              </p>

              {/* Mode toggle */}
              <div style={{ display: "flex", background: "var(--cream)", borderRadius: 12, padding: 4, marginBottom: 24, gap: 4 }}>
                {(["phone", "email"] as Mode[]).map((m) => (
                  <button key={m} onClick={() => { setMode(m); setError(""); }}
                    style={{ flex: 1, padding: "9px 0", borderRadius: 10, fontSize: 13, fontWeight: 700,
                      background: mode === m ? "white" : "transparent",
                      color: mode === m ? "var(--text)" : "var(--text-muted)",
                      boxShadow: mode === m ? "var(--shadow-sm)" : "none",
                      transition: "all 0.15s" }}>
                    {m === "phone" ? "Số điện thoại" : "Email"}
                  </button>
                ))}
              </div>

              {mode === "phone" ? (
                <div>
                  <label style={labelStyle}>Số điện thoại <Req /></label>
                  <div style={{ display: "flex", gap: 8 }}>
                    <div style={{ padding: "13px 14px", borderRadius: 12, border: "1.5px solid var(--border)", background: "var(--cream)", fontSize: 14, fontWeight: 700, whiteSpace: "nowrap" }}>
                      🇻🇳 +84
                    </div>
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      placeholder="901 234 567" style={{ ...inputSt, flex: 1 }}
                      onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                      onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                      onKeyDown={(e) => e.key === "Enter" && sendOtp()} />
                  </div>
                  <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 6 }}>Chúng tôi sẽ gửi mã OTP 6 số đến số này</p>
                </div>
              ) : (
                <div>
                  <label style={labelStyle}>Email <Req /></label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="ban@email.com" style={inputSt}
                    onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                    onKeyDown={(e) => e.key === "Enter" && sendOtp()} />
                </div>
              )}

              {error && <ErrorBox msg={error} />}

              <button onClick={sendOtp} disabled={loading} style={{ ...primaryBtn, marginTop: 20 }}>
                {loading ? "Đang gửi..." : "Gửi mã OTP →"}
              </button>

              {/* Divider */}
              <Divider label="hoặc đăng nhập với" />

              {/* OAuth */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <OAuthBtn icon="G" label="Tiếp tục với Google" color="#4285F4" onClick={() => {}} />
                <OAuthBtn icon="f" label="Tiếp tục với Facebook" color="#1877F2" onClick={() => {}} />
              </div>

              <p style={{ marginTop: 20, textAlign: "center", fontSize: 12, color: "var(--text-muted)" }}>
                Đăng nhập bằng mật khẩu?{" "}
                <button onClick={() => setStep("password")} style={{ color: "var(--primary)", fontWeight: 700, fontSize: 12, background: "none", border: "none", cursor: "pointer" }}>
                  Nhấn vào đây
                </button>
              </p>
            </>
          )}

          {/* ── STEP: OTP ── */}
          {step === "otp" && (
            <>
              <button onClick={() => { setStep("contact"); setOtp(""); setError(""); }}
                style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--text-muted)", marginBottom: 28, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                ← Quay lại
              </button>

              <div style={{ textAlign: "center" }}>
                <h1 style={{ fontSize: 26, fontWeight: 900, marginBottom: 8 }}>Nhập mã xác minh</h1>
                <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 8 }}>
                  Mã OTP đã được gửi đến
                </p>
                <p style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 32 }}>
                  {maskedContact}
                </p>

                <OtpInput value={otp} onChange={setOtp} autoFocus />

                {error && <ErrorBox msg={error} />}

                {/* Timer */}
                <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 20, marginBottom: 4 }}>
                  {timer > 0 ? (
                    <>Mã hết hạn sau <strong style={{ color: "var(--primary)" }}>{timerLabel}</strong></>
                  ) : (
                    <button onClick={sendOtp} style={{ color: "var(--primary)", fontWeight: 700, fontSize: 13, background: "none", border: "none", cursor: "pointer" }}>
                      Gửi lại mã OTP
                    </button>
                  )}
                </p>

                <button onClick={verifyOtp} disabled={otp.length < 6 || loading}
                  style={{ ...primaryBtn, marginTop: 24, opacity: otp.length < 6 ? 0.5 : 1 }}>
                  {loading ? "Đang xác minh..." : "Xác nhận đăng nhập"}
                </button>
              </div>
            </>
          )}

          {/* ── STEP: PASSWORD (email fallback) ── */}
          {step === "password" && (
            <>
              <button onClick={() => { setStep("contact"); setError(""); }}
                style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--text-muted)", marginBottom: 28, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                ← Quay lại
              </button>

              <h1 style={{ fontSize: 26, fontWeight: 900, marginBottom: 28 }}>Đăng nhập bằng mật khẩu</h1>

              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div>
                  <label style={labelStyle}>Email <Req /></label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="ban@email.com" style={inputSt}
                    onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <label style={labelStyle}>Mật khẩu <Req /></label>
                    <Link href="/forgot-password" style={{ fontSize: 12, color: "var(--primary)", fontWeight: 600 }}>Quên mật khẩu?</Link>
                  </div>
                  <div style={{ position: "relative" }}>
                    <input type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••" style={{ ...inputSt, paddingRight: 48 }}
                      onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                      onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                      onKeyDown={(e) => e.key === "Enter" && loginPassword()} />
                    <button type="button" onClick={() => setShowPw((v) => !v)}
                      style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", fontSize: 15, color: "var(--text-muted)", background: "none", border: "none", cursor: "pointer" }}>
                      {showPw ? "ẩn" : "hiện"}
                    </button>
                  </div>
                </div>
              </div>

              {error && <ErrorBox msg={error} />}

              <button onClick={loginPassword} disabled={loading} style={{ ...primaryBtn, marginTop: 24 }}>
                {loading ? "Đang đăng nhập..." : "ĐĂNG NHẬP"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Shared brand panel ── */
function BrandPanel() {
  return (
    <div className="auth-brand-panel" style={{ background: "var(--text)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 40px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -80, left: -80, width: 300, height: 300, borderRadius: "50%", background: "rgba(232,119,34,0.12)" }} />
      <div style={{ position: "absolute", bottom: -60, right: -60, width: 240, height: 240, borderRadius: "50%", background: "rgba(76,140,74,0.10)" }} />
      <div style={{ position: "relative", textAlign: "center" }}>
        <div style={{ width: 96, height: 96, borderRadius: 28, background: "var(--primary)", display: "grid", placeItems: "center", fontSize: 48, margin: "0 auto 28px", boxShadow: "0 8px 32px rgba(232,119,34,0.4)" }}>🥐</div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 48, fontWeight: 900, color: "white", letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 14 }}>Still Good</div>
        <div style={{ fontSize: 11, fontWeight: 700, color: "var(--primary)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 32 }}>Good Food. Saved.</div>
        <p style={{ fontSize: 18, fontWeight: 700, color: "white", lineHeight: 1.4, maxWidth: 280, opacity: 0.9 }}>
          Cứu bánh ngon cuối ngày,<br />
          <em style={{ color: "var(--primary)", fontStyle: "italic" }}>tiết kiệm mỗi tối.</em>
        </p>
      </div>
      <p style={{ position: "absolute", bottom: 28, fontSize: 12, color: "rgba(255,255,255,0.35)" }}>© 2026 Still Good</p>
    </div>
  );
}

/* ── Micro components ── */
function Req() { return <span style={{ color: "var(--danger)" }}>*</span>; }

function ErrorBox({ msg }: { msg: string }) {
  return (
    <div style={{ marginTop: 14, padding: "11px 14px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, fontSize: 13, color: "var(--danger)" }}>
      {msg}
    </div>
  );
}

function Divider({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0" }}>
      <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
      <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
    </div>
  );
}

function OAuthBtn({ icon, label, color, onClick }: { icon: string; label: string; color: string; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1.5px solid var(--border)", background: "white", display: "flex", alignItems: "center", gap: 12, fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "background 0.15s" }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--cream)")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "white")}>
      <span style={{ width: 26, height: 26, borderRadius: 6, background: color, color: "white", display: "grid", placeItems: "center", fontSize: 13, fontWeight: 900, flexShrink: 0 }}>{icon}</span>
      <span style={{ flex: 1, textAlign: "center" }}>{label}</span>
    </button>
  );
}

/* ── Shared styles ── */
const labelStyle: React.CSSProperties = { display: "block", fontSize: 13, fontWeight: 700, marginBottom: 8 };
const inputSt: React.CSSProperties = { width: "100%", padding: "13px 16px", borderRadius: 12, border: "1.5px solid var(--border)", fontSize: 14, outline: "none", background: "var(--ivory)", transition: "border-color 0.2s" };
const primaryBtn: React.CSSProperties = { width: "100%", padding: "14px", fontSize: 15, fontWeight: 700, borderRadius: 12, background: "var(--text)", color: "white", border: "none", cursor: "pointer", transition: "opacity 0.15s" };
