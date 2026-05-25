"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import AddressPicker from "./AddressPicker";

type Step = "search" | "confirm" | "account" | "documents" | "payment" | "review" | "box";

const STEPS: { key: Step; label: string; icon: string }[] = [
  { key: "search",    label: "Địa chỉ tiệm",       icon: "📍" },
  { key: "confirm",   label: "Thông tin tiệm",      icon: "🏪" },
  { key: "account",   label: "Tài khoản",          icon: "🔐" },
  { key: "documents", label: "Giấy tờ",            icon: "📋" },
  { key: "payment",   label: "Thanh toán",         icon: "🏦" },
  { key: "review",    label: "Xét duyệt",          icon: "⏳" },
  { key: "box",       label: "Tạo box đầu tiên",   icon: "📦" },
];

const BANKS = ["Vietcombank", "BIDV", "Techcombank", "MB Bank", "VPBank", "ACB", "Agribank", "TPBank", "Sacombank", "VietinBank"];
const BOX_TYPES = ["Bánh ngọt", "Bánh mặn", "Đồ uống", "Mix (ngẫu nhiên)"];

export default function BusinessRegisterPage() {
  const router = useRouter();

  const [step, setStep]     = useState<Step>("search");
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState("");

  // Step 2: confirm / store info
  const [storeName, setStoreName]       = useState("");
  const [storeAddr, setStoreAddr]       = useState("");
  const [storeLat, setStoreLat]         = useState<number | null>(null);
  const [storeLng, setStoreLng]         = useState<number | null>(null);
  const [storePhone, setStorePhone]     = useState("");
  const [storeOpen, setStoreOpen]       = useState("07:00");
  const [storeClose, setStoreClose]     = useState("22:00");
  const [storeDesc, setStoreDesc]       = useState("");

  // Step 3: account
  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const [confirmPw, setConfirmPw]   = useState("");
  const [showPw, setShowPw]         = useState(false);
  const [twoFa, setTwoFa]           = useState(false);

  // Step 4: documents
  const [gpkdFile, setGpkdFile]   = useState<File | null>(null);
  const [attFile, setAttFile]     = useState<File | null>(null);

  // Step 5: payment
  const [bank, setBank]             = useState("");
  const [accountNum, setAccountNum] = useState("");
  const [accountName, setAccountName] = useState("");

  // Step 7: first box
  const [boxType, setBoxType]     = useState(BOX_TYPES[3]);
  const [priceOrig, setPriceOrig] = useState("");
  const [priceSale, setPriceSale] = useState("");
  const [pickStart, setPickStart] = useState("17:00");
  const [pickEnd, setPickEnd]     = useState("20:00");
  const [qty, setQty]             = useState("5");

  const curIdx = STEPS.findIndex((s) => s.key === step);

  async function go(nextStep: Step, validate?: () => string | null) {
    setError("");
    const err = validate?.();
    if (err) { setError(err); return; }
    setLoading(true);

    // Step account → documents: check email uniqueness
    if (step === "account" && nextStep === "documents") {
      try {
        const res = await fetch(`/api/auth/check?email=${encodeURIComponent(email)}`);
        const data = await res.json();
        if (data.exists) {
          setError(data.role === "CUSTOMER"
            ? "Email này đã là tài khoản khách hàng. Vui lòng dùng email khác."
            : "Email này đã có tài khoản cửa hàng. Vui lòng đăng nhập.");
          setLoading(false);
          return;
        }
      } catch { /* proceed */ }
    }

    // Step payment → review: actually create the account + store
    if (step === "payment" && nextStep === "review") {
      try {
        const res = await fetch("/api/auth/register-business", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email, password, name: storeName,
            storeName, storeAddr, storePhone,
            storeHours: storeOpen && storeClose ? `${storeOpen} – ${storeClose}` : "",
            storeDesc, lat: storeLat, lng: storeLng,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error ?? "Đăng ký thất bại. Vui lòng thử lại.");
          setLoading(false);
          return;
        }
      } catch {
        setError("Lỗi kết nối. Vui lòng thử lại.");
        setLoading(false);
        return;
      }
    }

    await new Promise((r) => setTimeout(r, 400));
    setLoading(false);
    setStep(nextStep);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const discountPct = priceOrig && priceSale
    ? Math.round((1 - Number(priceSale) / Number(priceOrig)) * 100)
    : null;

  return (
    <div className="biz-reg-layout" style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "300px 1fr" }}>

      {/* ── LEFT SIDEBAR ── */}
      <div className="biz-reg-sidebar" style={{ background: "var(--text)", display: "flex", flexDirection: "column", padding: "40px 28px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -60, left: -60, width: 200, height: 200, borderRadius: "50%", background: "rgba(232,119,34,0.1)" }} />
        <div style={{ position: "absolute", bottom: -40, right: -40, width: 160, height: 160, borderRadius: "50%", background: "rgba(76,140,74,0.08)" }} />

        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 40, position: "relative" }}>
          <img src="/crumbup-logo-tabweb.jpg" alt="CrumbUp" style={{ width: 44, height: 44, borderRadius: 14, objectFit: "cover", boxShadow: "0 4px 16px rgba(232,119,34,0.4)" }} />
          <div>
            <div style={{ fontWeight: 900, fontSize: 17, color: "white", letterSpacing: "-0.02em" }}>CrumbUp</div>
            <div style={{ fontSize: 10, fontWeight: 700, color: "var(--primary)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Dành cho cửa hàng</div>
          </div>
        </Link>

        <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Các bước</div>

        {/* Step list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1, position: "relative" }}>
          {STEPS.map((s, i) => {
            const done   = i < curIdx;
            const active = i === curIdx;
            const locked = i > curIdx;
            return (
              <div key={s.key} style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "10px 12px", borderRadius: 12,
                background: active ? "rgba(255,255,255,0.1)" : "transparent",
                opacity: locked ? 0.35 : 1,
                transition: "all 0.2s",
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                  background: done ? "var(--accent)" : active ? "var(--primary)" : "rgba(255,255,255,0.1)",
                  display: "grid", placeItems: "center",
                  fontSize: done ? 14 : 13, fontWeight: 800, color: "white",
                }}>
                  {done ? "✓" : active ? s.icon : i + 1}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: active ? 700 : 500, color: active ? "white" : done ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.4)" }}>
                    {s.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.08)", position: "relative" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "rgba(255,255,255,0.5)", textDecoration: "none", marginBottom: 14, fontWeight: 600 }}>
            ← Trang chủ
          </Link>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", lineHeight: 1.6 }}>
            Cần hỗ trợ?<br />
            <a href="mailto:partners@stillgood.vn" style={{ color: "var(--primary)", fontWeight: 600 }}>partners@stillgood.vn</a>
          </p>
        </div>
      </div>

      {/* ── RIGHT CONTENT ── */}
      <div className="biz-reg-content" style={{ background: "var(--ivory)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 56px", minHeight: "100vh" }}>
        {/* Mobile top bar — hidden on desktop via CSS */}
        <div className="biz-reg-mobile-header">
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <img src="/crumbup-logo-tabweb.jpg" alt="CrumbUp" style={{ width: 36, height: 36, borderRadius: 12, objectFit: "cover" }} />
            <span style={{ fontWeight: 900, fontSize: 15, letterSpacing: "-0.02em" }}>CrumbUp</span>
          </Link>
          <span style={{ fontSize: 12, fontWeight: 700, color: "var(--primary)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Bước {curIdx + 1}/{STEPS.length}
          </span>
        </div>

        <div style={{ width: "100%", maxWidth: 560 }}>

          {/* Progress bar */}
          <div style={{ display: "flex", gap: 5, marginBottom: 36 }}>
            {STEPS.map((_, i) => (
              <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= curIdx ? "var(--primary)" : "var(--border)", transition: "background 0.3s" }} />
            ))}
          </div>

          {/* Step label */}
          <div style={{ fontSize: 12, fontWeight: 700, color: "var(--primary)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>
            Bước {curIdx + 1} / {STEPS.length}
          </div>

          {/* ── STEP 1: ADDRESS SEARCH ── */}
          {step === "search" && (
            <>
              <h1 style={h1}>Địa chỉ tiệm của bạn</h1>
              <p style={sub}>Nhập địa chỉ và chọn từ gợi ý để xác định vị trí chính xác trên bản đồ.</p>

              <AddressPicker
                value={storeAddr}
                onChange={(v) => { setStoreAddr(v); setStoreLat(null); setStoreLng(null); }}
                onCoords={(lat, lng) => { setStoreLat(lat); setStoreLng(lng); }}
              />

              {error && <ErrBox msg={error} />}

              <Btn
                onClick={() => {
                  setError("");
                  if (!storeAddr.trim()) { setError("Vui lòng nhập địa chỉ tiệm"); return; }
                  if (!storeLat || !storeLng) { setError("Vui lòng chọn địa chỉ từ gợi ý để xác định vị trí trên bản đồ"); return; }
                  setStep("confirm");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                loading={false}
              >
                Tiếp tục →
              </Btn>
            </>
          )}

          {/* ── STEP 2: CONFIRM ── */}
          {step === "confirm" && (
            <>
              <BackBtn onClick={() => setStep("search")} />
              <h1 style={h1}>Thông tin tiệm</h1>
              <p style={sub}>Điền tên và thông tin tiệm. Địa chỉ đã được xác định ở bước trước.</p>

              {/* Address read-only */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "12px 16px", background: "var(--accent-soft)", borderRadius: 12, border: "1px solid var(--accent)", marginBottom: 18 }}>
                <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>📍</span>
                <span style={{ fontSize: 13, color: "var(--text)", lineHeight: 1.5 }}>{storeAddr}</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <Field label="Tên tiệm" required>
                  <input type="text" value={storeName} onChange={(e) => setStoreName(e.target.value)} placeholder="Tiệm Bánh Mì ABC" style={inp}
                    onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
                </Field>

                <Field label="Số điện thoại">
                  <input type="tel" value={storePhone} onChange={(e) => setStorePhone(e.target.value)} placeholder="028 1234 5678" style={inp}
                    onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
                </Field>

                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Giờ mở – đóng cửa</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 10, alignItems: "center" }}>
                    <input type="time" value={storeOpen} onChange={(e) => setStoreOpen(e.target.value)} style={inp}
                      onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                      onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
                    <span style={{ fontSize: 14, color: "var(--text-muted)", fontWeight: 600, textAlign: "center" }}>–</span>
                    <input type="time" value={storeClose} onChange={(e) => setStoreClose(e.target.value)} style={inp}
                      onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                      onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
                  </div>
                  {storeOpen && storeClose && storeClose <= storeOpen && (
                    <p style={{ fontSize: 12, color: "var(--danger)", marginTop: 6 }}>Giờ đóng cửa phải sau giờ mở cửa</p>
                  )}
                </div>

                <Field label="Mô tả ngắn">
                  <textarea value={storeDesc} onChange={(e) => setStoreDesc(e.target.value)}
                    placeholder="Mô tả về tiệm, món đặc trưng, không khí..."
                    rows={3}
                    style={{ ...inp, resize: "vertical" }}
                    onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
                </Field>

              </div>

              {error && <ErrBox msg={error} />}

              <Btn onClick={() => go("account", () => {
                if (!storeName.trim()) return "Vui lòng nhập tên tiệm";
                if (storeOpen && storeClose && storeClose <= storeOpen) return "Giờ đóng cửa phải sau giờ mở cửa";
                return null;
              })} loading={loading}>
                Tiếp tục →
              </Btn>
            </>
          )}

          {/* ── STEP 3: ACCOUNT ── */}
          {step === "account" && (
            <>
              <BackBtn onClick={() => setStep("confirm")} />
              <h1 style={h1}>Tạo tài khoản chủ tiệm</h1>
              <p style={sub}>Tài khoản này sẽ có quyền quản lý đơn hàng và xem doanh thu.</p>

              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <Field label="Email đăng nhập" required>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="owner@tiem.com" style={inp}
                    onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
                </Field>

                <Field label="Mật khẩu" required>
                  <div style={{ position: "relative" }}>
                    <input type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                      placeholder="Ít nhất 8 ký tự" style={{ ...inp, paddingRight: 48 }}
                      onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                      onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
                    <button type="button" onClick={() => setShowPw((v) => !v)}
                      style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", fontSize: 15, color: "var(--text-muted)", background: "none", border: "none", cursor: "pointer" }}>
                      {showPw ? "ẩn" : "hiện"}
                    </button>
                  </div>
                  <StrengthBar pw={password} />
                </Field>

                <Field label="Xác nhận mật khẩu" required>
                  <input type="password" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} placeholder="Nhập lại mật khẩu" style={inp}
                    onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
                  {confirmPw && confirmPw !== password && (
                    <p style={{ fontSize: 12, color: "var(--danger)", marginTop: 6 }}>Mật khẩu không khớp</p>
                  )}
                </Field>

                {/* Mandatory 2FA notice */}
                <div style={{ background: "var(--cream)", borderRadius: 14, padding: "16px 18px", border: "1px solid var(--border)" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>Xác thực 2 lớp (2FA) — Bắt buộc</div>
                  <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.6, marginBottom: 10 }}>
                    Tài khoản cửa hàng bắt buộc bật 2FA để bảo vệ dữ liệu doanh thu và thông tin đơn hàng.
                  </p>
                  <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                    <input type="checkbox" checked={twoFa} onChange={(e) => setTwoFa(e.target.checked)}
                      style={{ width: 16, height: 16, accentColor: "var(--primary)" }} />
                    <span style={{ fontSize: 13, fontWeight: 600 }}>Tôi đồng ý bật 2FA sau khi tạo tài khoản</span>
                  </label>
                </div>
              </div>

              {error && <ErrBox msg={error} />}

              <Btn onClick={() => go("documents", () => {
                if (!email.includes("@")) return "Email không hợp lệ";
                if (password.length < 8) return "Mật khẩu phải ít nhất 8 ký tự";
                if (password !== confirmPw) return "Mật khẩu không khớp";
                if (!twoFa) return "Bạn cần đồng ý bật 2FA để tiếp tục";
                return null;
              })} loading={loading}>
                Tạo tài khoản →
              </Btn>
            </>
          )}

          {/* ── STEP 4: DOCUMENTS ── */}
          {step === "documents" && (
            <>
              <BackBtn onClick={() => setStep("account")} />
              <h1 style={h1}>Giấy tờ kinh doanh</h1>
              <p style={sub}>Cần thiết để xác minh tính hợp lệ và đảm bảo chất lượng cho người dùng. Thiếu giấy tờ thì box chưa thể publish.</p>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <UploadBox
                  label="Giấy phép kinh doanh (GPKD)"
                  desc="File PDF hoặc ảnh, tối đa 10MB"
                  required
                  icon="🏢"
                  file={gpkdFile}
                  onChange={setGpkdFile}
                />
                <UploadBox
                  label="Giấy chứng nhận ATTP"
                  desc="An toàn thực phẩm — PDF hoặc ảnh, tối đa 10MB"
                  required
                  icon="✅"
                  file={attFile}
                  onChange={setAttFile}
                />
              </div>

              {!gpkdFile && !attFile && (
                <div style={{ marginTop: 16, padding: "12px 16px", background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, fontSize: 13, color: "#92400e", display: "flex", gap: 10 }}>
                  <span>⚠️</span>
                  <span>Bạn có thể bỏ qua và bổ sung sau. Tuy nhiên, box sẽ không được publish cho đến khi đủ giấy tờ.</span>
                </div>
              )}

              {error && <ErrBox msg={error} />}

              <Btn onClick={() => go("payment")} loading={loading}>
                {gpkdFile && attFile ? "Tiếp tục →" : "Bỏ qua, bổ sung sau →"}
              </Btn>
            </>
          )}

          {/* ── STEP 5: PAYMENT ── */}
          {step === "payment" && (
            <>
              <BackBtn onClick={() => setStep("documents")} />
              <h1 style={h1}>Thông tin thanh toán</h1>
              <p style={sub}>Doanh thu sẽ được chuyển vào tài khoản này hàng tuần, sau khi trừ phí nền tảng.</p>

              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <Field label="Ngân hàng" required>
                  <select value={bank} onChange={(e) => setBank(e.target.value)}
                    style={{ ...inp, appearance: "none", cursor: "pointer" }}>
                    <option value="">-- Chọn ngân hàng --</option>
                    {BANKS.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </Field>

                <Field label="Số tài khoản" required>
                  <input type="text" value={accountNum} onChange={(e) => setAccountNum(e.target.value.replace(/\D/g, ""))}
                    placeholder="0123456789" style={inp}
                    onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
                </Field>

                <Field label="Tên chủ tài khoản" required>
                  <input type="text" value={accountName} onChange={(e) => setAccountName(e.target.value.toUpperCase())}
                    placeholder="NGUYEN VAN A" style={{ ...inp, textTransform: "uppercase" }}
                    onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
                  <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 6 }}>Nhập đúng tên in trên thẻ ngân hàng</p>
                </Field>
              </div>

              {/* Fee info */}
              <div style={{ marginTop: 16, background: "var(--accent-soft)", borderRadius: 14, padding: "14px 18px", fontSize: 13, color: "var(--text)" }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>Phí nền tảng: 15% / đơn</div>
                <div style={{ color: "var(--text-muted)", lineHeight: 1.6 }}>Doanh thu được chuyển mỗi thứ Hai, không phí rút tiền tối thiểu.</div>
              </div>

              {error && <ErrBox msg={error} />}

              <Btn onClick={() => go("review", () => {
                if (!bank) return "Vui lòng chọn ngân hàng";
                if (!accountNum) return "Vui lòng nhập số tài khoản";
                if (!accountName) return "Vui lòng nhập tên chủ tài khoản";
                return null;
              })} loading={loading}>
                Nộp hồ sơ →
              </Btn>
            </>
          )}

          {/* ── STEP 6: REVIEW ── */}
          {step === "review" && (
            <>
              <div style={{ textAlign: "center" }}>
                <h1 style={{ ...h1, textAlign: "center" }}>Đã nhận hồ sơ!</h1>
                <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.7, maxWidth: 400, margin: "0 auto 28px" }}>
                  Đội ngũ CrumbUp sẽ xét duyệt giấy tờ trong <strong style={{ color: "var(--text)" }}>1–2 ngày làm việc</strong>.
                  Chúng tôi sẽ email cho bạn khi có kết quả.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32, textAlign: "left" }}>
                  {[
                    `Email xác nhận đã gửi đến ${email}`,
                    "Bạn có thể vào dashboard để setup box trước",
                    "Box sẽ ở chế độ preview cho đến khi được duyệt",
                  ].map((text) => (
                    <div key={text} style={{ padding: "12px 16px", background: "white", borderRadius: 12, border: "1px solid var(--border)", fontSize: 13 }}>
                      {text}
                    </div>
                  ))}
                </div>

                <button onClick={() => setStep("box")}
                  style={{ ...btnStyle, marginBottom: 12 }}>
                  Setup box đầu tiên (preview) →
                </button>

                <Link href="/partner"
                  style={{ display: "block", width: "100%", padding: "13px", borderRadius: 12, border: "1.5px solid var(--border)", fontSize: 14, fontWeight: 600, color: "var(--text-muted)", textAlign: "center" }}>
                  Vào Dashboard →
                </Link>
              </div>
            </>
          )}

          {/* ── STEP 7: FIRST BOX ── */}
          {step === "box" && (
            <>
              <BackBtn onClick={() => setStep("review")} />
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", background: "var(--primary-soft)", borderRadius: 999, fontSize: 12, fontWeight: 700, color: "var(--primary)", marginBottom: 16 }}>
                Chế độ Preview
              </div>
              <h1 style={h1}>Tạo Surprise Box đầu tiên</h1>
              <p style={sub}>Box sẽ hiển thị cho khách hàng ngay khi tài khoản được duyệt.</p>

              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <Field label="Loại box" required>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    {BOX_TYPES.map((t) => (
                      <button key={t} onClick={() => setBoxType(t)}
                        style={{ padding: "11px 14px", borderRadius: 12, border: boxType === t ? "2px solid var(--primary)" : "1.5px solid var(--border)", background: boxType === t ? "var(--primary-soft)" : "white", fontSize: 13, fontWeight: boxType === t ? 700 : 500, cursor: "pointer", transition: "all 0.15s", color: boxType === t ? "var(--primary)" : "var(--text)" }}>
                        {t}
                      </button>
                    ))}
                  </div>
                </Field>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <Field label="Giá gốc (đ)" required>
                    <input type="number" value={priceOrig} onChange={(e) => setPriceOrig(e.target.value)}
                      placeholder="120000" min="0" style={inp}
                      onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                      onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
                  </Field>
                  <Field label="Giá bán (đ)" required>
                    <input type="number" value={priceSale} onChange={(e) => setPriceSale(e.target.value)}
                      placeholder="59000" min="0" style={inp}
                      onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                      onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
                    {discountPct !== null && (
                      <p style={{ fontSize: 12, color: "var(--accent)", fontWeight: 700, marginTop: 6 }}>
                        ✅ Giảm {discountPct}% — hấp dẫn!
                      </p>
                    )}
                  </Field>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
                  <Field label="Giờ nhận từ">
                    <input type="time" value={pickStart} onChange={(e) => setPickStart(e.target.value)} style={inp}
                      onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                      onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
                  </Field>
                  <Field label="Đến">
                    <input type="time" value={pickEnd} onChange={(e) => setPickEnd(e.target.value)} style={inp}
                      onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                      onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
                  </Field>
                  <Field label="Số lượng">
                    <input type="number" value={qty} onChange={(e) => setQty(e.target.value)} min="1" max="50" style={inp}
                      onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                      onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
                  </Field>
                </div>
              </div>

              {error && <ErrBox msg={error} />}

              <Btn onClick={() => go("review" as Step, () => {
                if (!priceOrig || !priceSale) return "Vui lòng nhập giá gốc và giá bán";
                if (Number(priceSale) >= Number(priceOrig)) return "Giá bán phải thấp hơn giá gốc";
                return null;
              })} loading={loading}>
                Tạo box & vào Dashboard
              </Btn>
            </>
          )}

        </div>
      </div>
    </div>
  );
}

/* ── Sub-components ── */
function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--text-muted)", marginBottom: 24, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
      ← Quay lại
    </button>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: 8 }}>
        {label} {required && <span style={{ color: "var(--danger)" }}>*</span>}
      </label>
      {children}
    </div>
  );
}

function Btn({ onClick, loading, children }: { onClick: () => void; loading?: boolean; children: React.ReactNode }) {
  return (
    <button onClick={onClick} disabled={loading}
      style={{ ...btnStyle, marginTop: 24, opacity: loading ? 0.7 : 1 }}>
      {children}
    </button>
  );
}

function ErrBox({ msg }: { msg: string }) {
  return <div style={{ marginTop: 16, padding: "11px 14px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, fontSize: 13, color: "var(--danger)" }}>{msg}</div>;
}

function UploadBox({ label, desc, required, icon, file, onChange }: {
  label: string; desc: string; required?: boolean; icon: string;
  file: File | null; onChange: (f: File | null) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div>
      <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>
        {label} {required && <span style={{ color: "var(--danger)" }}>*</span>}
      </div>
      <input ref={ref} type="file" accept=".pdf,.jpg,.jpeg,.png" style={{ display: "none" }}
        onChange={(e) => onChange(e.target.files?.[0] ?? null)} />
      <div
        role="button"
        tabIndex={0}
        onClick={() => ref.current?.click()}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") ref.current?.click(); }}
        style={{
          width: "100%", padding: "20px", borderRadius: 14,
          border: file ? "2px solid var(--accent)" : "2px dashed var(--border)",
          background: file ? "var(--accent-soft)" : "white",
          cursor: "pointer", display: "flex", alignItems: "center", gap: 14, transition: "all 0.15s",
        }}>
        <span style={{ fontSize: 28 }}>{file ? "✅" : icon}</span>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: file ? "var(--accent)" : "var(--text)" }}>
            {file ? file.name : "Nhấn để upload"}
          </div>
          <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{file ? `${(file.size / 1024).toFixed(0)} KB` : desc}</div>
        </div>
        {file && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onChange(null); }}
            style={{ marginLeft: "auto", fontSize: 18, background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", flexShrink: 0 }}>
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

function StrengthBar({ pw }: { pw: string }) {
  const score = [pw.length >= 8, /[A-Z]/.test(pw), /[0-9]/.test(pw), /[^a-zA-Z0-9]/.test(pw)].filter(Boolean).length;
  const colors = ["var(--danger)", "var(--badge)", "var(--primary)", "var(--accent)"];
  const labels = ["Yếu", "Trung bình", "Tốt", "Mạnh"];
  if (!pw) return null;
  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i < score ? colors[score - 1] : "var(--border)", transition: "background 0.2s" }} />
        ))}
      </div>
      <p style={{ fontSize: 11, color: colors[score - 1] || "var(--text-muted)" }}>Mức độ: {labels[score - 1] || "—"}</p>
    </div>
  );
}

/* ── Shared styles ── */
const h1: React.CSSProperties = { fontSize: 26, fontWeight: 900, marginBottom: 8 };
const sub: React.CSSProperties = { fontSize: 14, color: "var(--text-muted)", marginBottom: 28, lineHeight: 1.6 };
const inp: React.CSSProperties = { width: "100%", padding: "13px 16px", borderRadius: 12, border: "1.5px solid var(--border)", fontSize: 14, outline: "none", background: "white", transition: "border-color 0.2s" };
const btnStyle: React.CSSProperties = { width: "100%", padding: "14px", fontSize: 15, fontWeight: 700, borderRadius: 12, background: "var(--text)", color: "white", border: "none", cursor: "pointer" };
