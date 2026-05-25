"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import OtpInput from "@/components/OtpInput";
import { createClient } from "@/lib/supabase/client";

type Step = "contact" | "otp" | "profile" | "location";
type Mode = "phone" | "email";

const OTP_TTL = 300;
const STEPS: { key: Step; label: string }[] = [
  { key: "contact",  label: "Liên hệ" },
  { key: "otp",      label: "Xác minh" },
  { key: "profile",  label: "Hồ sơ" },
  { key: "location", label: "Vị trí" },
];

export default function RegisterPage() {
  const router = useRouter();

  const [step, setStep]   = useState<Step>("contact");
  const [mode, setMode]   = useState<Mode>("phone");

  const [phone, setPhone]       = useState("");
  const [email, setEmail]       = useState("");
  const [otp, setOtp]           = useState("");
  const [name, setName]         = useState("");
  const [address, setAddress]   = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [timer, setTimer]       = useState(OTP_TTL);

  useEffect(() => {
    if (step !== "otp") return;
    setTimer(OTP_TTL);
    const id = setInterval(() => setTimer((t) => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [step]);

  const timerLabel = `${String(Math.floor(timer / 60)).padStart(2, "0")}:${String(timer % 60).padStart(2, "0")}`;
  const maskedContact = mode === "phone"
    ? `+84 ${phone.slice(0, 3)}***${phone.slice(-2)}`
    : email.replace(/^(.{3}).*(@.*)$/, "$1***$2");

  const curIdx = STEPS.findIndex((s) => s.key === step);

  async function sendOtp() {
    setError("");
    if (mode === "phone" && phone.replace(/\D/g, "").length < 9) { setError("Số điện thoại chưa hợp lệ"); return; }
    if (mode === "email" && !email.includes("@")) { setError("Email chưa hợp lệ"); return; }

    // Kiểm tra trùng trước khi gửi OTP
    const param = mode === "phone"
      ? `phone=84${phone.replace(/\D/g, "")}`
      : `email=${encodeURIComponent(email)}`;
    try {
      const res = await fetch(`/api/auth/check?${param}`);
      const data = await res.json();
      if (data.exists) {
        setError(data.role === "BUSINESS"
          ? "Số/email này đã là tài khoản cửa hàng. Vui lòng đăng nhập ở phần dành cho cửa hàng."
          : "Số/email này đã có tài khoản khách hàng. Vui lòng đăng nhập.");
        return;
      }
    } catch {
      // Network error — let it proceed, server will catch duplicates
    }

    setLoading(true);
    const supabase = createClient();
    let err;
    if (mode === "phone") {
      const digits = phone.replace(/\D/g, "");
      const e164 = `+84${digits.startsWith("0") ? digits.slice(1) : digits}`;
      ({ error: err } = await supabase.auth.signInWithOtp({
        phone: e164,
        options: { data: { role: "CUSTOMER" } },
      }));
    } else {
      ({ error: err } = await supabase.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: true, data: { role: "CUSTOMER" } },
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

    // Sync user vào DB sau khi xác minh thành công
    if (result.data.user) {
      const u = result.data.user;
      const digits = phone.replace(/\D/g, "");
      await fetch("/api/auth/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "sync-user",
          id: u.id,
          email: u.email || null,
          phone: mode === "phone" ? `+84${digits.startsWith("0") ? digits.slice(1) : digits}` : null,
          name,
        }),
      });
    }
    setStep("profile");
  }

  async function saveProfile() {
    setError("");
    if (!name.trim()) { setError("Vui lòng nhập tên của bạn"); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    setStep("location");
  }

  function requestLocation() {
    if (!navigator.geolocation) { router.push("/discover"); return; }
    navigator.geolocation.getCurrentPosition(
      () => router.push("/discover"),
      () => router.push("/discover"),
    );
  }

  return (
    <div className="auth-layout" style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "42% 1fr" }}>
      <BrandPanel currentStep={curIdx} />

      {/* RIGHT FORM */}
      <div style={{ background: "white", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 40px" }}>
        <div style={{ width: "100%", maxWidth: 400 }}>

          {/* Progress bar */}
          <StepBar current={curIdx} steps={STEPS} />

          {/* ── STEP 1: CONTACT ── */}
          {step === "contact" && (
            <>
              <h1 style={{ fontSize: 26, fontWeight: 900, marginBottom: 6 }}>Tạo tài khoản</h1>
              <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 28 }}>
                Đã có tài khoản?{" "}
                <Link href="/login" style={{ color: "var(--primary)", fontWeight: 700 }}>Đăng nhập</Link>
              </p>

              {/* Mode toggle */}
              <div style={{ display: "flex", background: "var(--cream)", borderRadius: 12, padding: 4, marginBottom: 22, gap: 4 }}>
                {(["phone", "email"] as Mode[]).map((m) => (
                  <button key={m} onClick={() => { setMode(m); setError(""); }}
                    style={{ flex: 1, padding: "9px 0", borderRadius: 10, fontSize: 13, fontWeight: 700,
                      background: mode === m ? "white" : "transparent",
                      color: mode === m ? "var(--text)" : "var(--text-muted)",
                      boxShadow: mode === m ? "var(--shadow-sm)" : "none", transition: "all 0.15s" }}>
                    {m === "phone" ? "Số điện thoại" : "Email"}
                  </button>
                ))}
              </div>

              {mode === "phone" ? (
                <div>
                  <label style={lbl}>Số điện thoại <Req /></label>
                  <div style={{ display: "flex", gap: 8 }}>
                    <div style={{ padding: "13px 14px", borderRadius: 12, border: "1.5px solid var(--border)", background: "var(--cream)", fontSize: 14, fontWeight: 700, whiteSpace: "nowrap" }}>
                      🇻🇳 +84
                    </div>
                    <input type="tel" value={phone} placeholder="901 234 567"
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      style={{ ...inp, flex: 1 }}
                      onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                      onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                      onKeyDown={(e) => e.key === "Enter" && sendOtp()} />
                  </div>
                  <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 6 }}>Chúng tôi sẽ gửi OTP 6 số đến số này</p>
                </div>
              ) : (
                <div>
                  <label style={lbl}>Email <Req /></label>
                  <input type="email" value={email} placeholder="ban@email.com"
                    onChange={(e) => setEmail(e.target.value)} style={inp}
                    onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                    onKeyDown={(e) => e.key === "Enter" && sendOtp()} />
                </div>
              )}

              {error && <ErrBox msg={error} />}

              <button onClick={sendOtp} disabled={loading} style={{ ...btn, marginTop: 20 }}>
                {loading ? "Đang gửi OTP..." : "Tiếp tục →"}
              </button>

              <Divider />

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <OAuthBtn icon="G" label="Đăng ký với Google"   color="#4285F4" />
                <OAuthBtn icon="f" label="Đăng ký với Facebook" color="#1877F2" />
              </div>

              <p style={{ marginTop: 20, textAlign: "center", fontSize: 11, color: "var(--text-muted)", lineHeight: 1.6 }}>
                Bằng cách tiếp tục, bạn đồng ý với{" "}
                <Link href="/terms" style={{ color: "var(--primary)" }}>Điều khoản dịch vụ</Link>
                {" "}và{" "}
                <Link href="/about#privacy" style={{ color: "var(--primary)" }}>Chính sách bảo mật</Link>
              </p>
            </>
          )}

          {/* ── STEP 2: OTP ── */}
          {step === "otp" && (
            <>
              <BackBtn onClick={() => { setStep("contact"); setOtp(""); setError(""); }} />

              <div style={{ textAlign: "center", marginBottom: 4 }}>
                <h1 style={{ fontSize: 24, fontWeight: 900, marginBottom: 6 }}>Nhập mã xác minh</h1>
                <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 4 }}>Mã OTP đã được gửi đến</p>
                <p style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 28 }}>{maskedContact}</p>

                <OtpInput value={otp} onChange={setOtp} autoFocus />

                {error && <ErrBox msg={error} />}

                <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 18, marginBottom: 4 }}>
                  {timer > 0 ? (
                    <>Hết hạn sau <strong style={{ color: "var(--primary)" }}>{timerLabel}</strong></>
                  ) : (
                    <button onClick={sendOtp} style={{ color: "var(--primary)", fontWeight: 700, fontSize: 13, background: "none", border: "none", cursor: "pointer" }}>
                      Gửi lại OTP
                    </button>
                  )}
                </p>

                <button onClick={verifyOtp} disabled={otp.length < 6 || loading}
                  style={{ ...btn, marginTop: 24, opacity: otp.length < 6 ? 0.45 : 1 }}>
                  {loading ? "Đang xác minh..." : "Xác nhận"}
                </button>
              </div>
            </>
          )}

          {/* ── STEP 3: PROFILE ── */}
          {step === "profile" && (
            <>
              <h1 style={{ fontSize: 26, fontWeight: 900, marginBottom: 6 }}>Tạo hồ sơ</h1>
              <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 28 }}>Chỉ mất dưới 30 giây</p>

              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div>
                  <label style={lbl}>Tên của bạn <Req /></label>
                  <input type="text" value={name} placeholder="Nguyễn Văn A"
                    onChange={(e) => setName(e.target.value)} style={inp}
                    onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
                </div>

                <div>
                  <label style={lbl}>Địa chỉ nhận hàng <span style={{ fontSize: 11, fontWeight: 500, color: "var(--text-muted)" }}>(tuỳ chọn)</span></label>
                  <input type="text" value={address} placeholder="123 Đường ABC, Quận 1, TP.HCM"
                    onChange={(e) => setAddress(e.target.value)} style={inp}
                    onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
                  <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 6 }}>Dùng để tính khoảng cách & gợi ý box gần bạn</p>
                </div>
              </div>

              {error && <ErrBox msg={error} />}

              <button onClick={saveProfile} disabled={loading} style={{ ...btn, marginTop: 24 }}>
                {loading ? "Đang lưu..." : "Tiếp tục →"}
              </button>

              <p style={{ textAlign: "center", marginTop: 12 }}>
                <button onClick={() => setStep("location")} style={{ fontSize: 12, color: "var(--text-muted)", background: "none", border: "none", cursor: "pointer" }}>
                  Bỏ qua, điền sau
                </button>
              </p>
            </>
          )}

          {/* ── STEP 4: LOCATION ── */}
          {step === "location" && (
            <>
              <div style={{ textAlign: "center" }}>
                <h1 style={{ fontSize: 24, fontWeight: 900, marginBottom: 10 }}>Cho phép vị trí?</h1>
                <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 32, maxWidth: 320, margin: "0 auto 32px" }}>
                  Chúng tôi sẽ hiện các Surprise Box gần bạn nhất — tươi, nhanh, đúng tầm tay.
                </p>

                <div style={{ background: "var(--cream)", borderRadius: 16, padding: "16px 20px", marginBottom: 28, textAlign: "left" }}>
                  {[
                    "Box từ các tiệm gần nhà",
                    "Thời gian nhận hàng ngắn nhất",
                    "Vị trí chỉ dùng trong app, không chia sẻ",
                  ].map((t) => (
                    <div key={t} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0", fontSize: 13, fontWeight: 500 }}>
                      <div style={{ width: 5, height: 5, borderRadius: 999, background: "var(--primary)", flexShrink: 0 }} />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>

                <button onClick={requestLocation} style={{ ...btn, marginBottom: 12 }}>
                  Cho phép vị trí
                </button>

                <button onClick={() => router.push("/discover")}
                  style={{ width: "100%", padding: "13px", fontSize: 14, fontWeight: 600, borderRadius: 12, background: "transparent", color: "var(--text-muted)", border: "1.5px solid var(--border)", cursor: "pointer" }}>
                  Bỏ qua
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Brand panel with step indicator ── */
function BrandPanel({ currentStep }: { currentStep: number }) {
  return (
    <div className="auth-brand-panel" style={{ background: "var(--text)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 40px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -80, left: -80, width: 300, height: 300, borderRadius: "50%", background: "rgba(232,119,34,0.12)" }} />
      <div style={{ position: "absolute", bottom: -60, right: -60, width: 240, height: 240, borderRadius: "50%", background: "rgba(76,140,74,0.10)" }} />

      <div style={{ position: "relative", textAlign: "center" }}>
        <div style={{ width: 80, height: 80, borderRadius: 24, background: "var(--primary)", display: "grid", placeItems: "center", fontSize: 40, margin: "0 auto 22px", boxShadow: "0 8px 32px rgba(232,119,34,0.4)" }}>🥐</div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 40, fontWeight: 900, color: "white", letterSpacing: "-0.03em", marginBottom: 8 }}>CrumbUp</div>
        <div style={{ fontSize: 11, fontWeight: 700, color: "var(--primary)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 40 }}>Save Every Crumb</div>

        {/* Step list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14, textAlign: "left" }}>
          {STEPS.map((s, i) => {
            const done    = i < currentStep;
            const active  = i === currentStep;
            return (
              <div key={s.key} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: done ? "var(--accent)" : active ? "var(--primary)" : "rgba(255,255,255,0.12)",
                  display: "grid", placeItems: "center",
                  fontSize: 13, fontWeight: 800, color: "white",
                  flexShrink: 0, transition: "background 0.3s",
                }}>
                  {done ? "✓" : i + 1}
                </div>
                <span style={{ fontSize: 14, fontWeight: active ? 700 : 500, color: active ? "white" : done ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.35)" }}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <p style={{ position: "absolute", bottom: 28, fontSize: 12, color: "rgba(255,255,255,0.35)" }}>© 2026 CrumbUp</p>
    </div>
  );
}

/* ── Micro components ── */
function StepBar({ current, steps }: { current: number; steps: typeof STEPS }) {
  return (
    <div style={{ display: "flex", gap: 6, marginBottom: 28 }}>
      {steps.map((_, i) => (
        <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= current ? "var(--primary)" : "var(--border)", transition: "background 0.3s" }} />
      ))}
    </div>
  );
}

function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--text-muted)", marginBottom: 24, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
      ← Quay lại
    </button>
  );
}

function Req() { return <span style={{ color: "var(--danger)" }}>*</span>; }

function ErrBox({ msg }: { msg: string }) {
  return <div style={{ marginTop: 14, padding: "11px 14px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, fontSize: 13, color: "var(--danger)" }}>{msg}</div>;
}

function Divider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "22px 0" }}>
      <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
      <span style={{ fontSize: 12, color: "var(--text-muted)" }}>hoặc</span>
      <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
    </div>
  );
}

function OAuthBtn({ icon, label, color }: { icon: string; label: string; color: string }) {
  return (
    <button style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1.5px solid var(--border)", background: "white", display: "flex", alignItems: "center", gap: 12, fontSize: 14, fontWeight: 600, cursor: "pointer" }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--cream)")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "white")}>
      <span style={{ width: 26, height: 26, borderRadius: 6, background: color, color: "white", display: "grid", placeItems: "center", fontSize: 13, fontWeight: 900, flexShrink: 0 }}>{icon}</span>
      <span style={{ flex: 1, textAlign: "center" }}>{label}</span>
    </button>
  );
}

const lbl: React.CSSProperties = { display: "block", fontSize: 13, fontWeight: 700, marginBottom: 8 };
const inp: React.CSSProperties = { width: "100%", padding: "13px 16px", borderRadius: 12, border: "1.5px solid var(--border)", fontSize: 14, outline: "none", background: "var(--ivory)", transition: "border-color 0.2s" };
const btn: React.CSSProperties = { width: "100%", padding: "14px", fontSize: 15, fontWeight: 700, borderRadius: 12, background: "var(--text)", color: "white", border: "none", cursor: "pointer" };
