"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

const BANK = { name: "MB Bank", number: "0987654321", owner: "CONG TY CO PHAN CRUMBUP" };

const PICKUP_GUIDE = [
  "Đến cửa hàng, xuất trình đơn hàng trên website hoặc ứng dụng để nhận Surprise Box của bạn.",
  "Bạn cũng có thể nhờ bạn bè nhận giúp hoặc lựa chọn giao hàng linh hoạt tại một số cửa hàng đối tác.",
  "Điều tuyệt nhất là bạn sẽ không biết chính xác bên trong có gì cho đến khi mở hộp.",
];

type BoxInfo  = { id: string; name: string; priceSale: number; pickupStart: string; pickupEnd: string };
type StoreInfo = { name: string; phone: string | null; address: string };

export default function OrderButton({ box, store, isLoggedIn }: { box: BoxInfo; store: StoreInfo; isLoggedIn: boolean }) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen]       = useState(false);
  const [step, setStep]       = useState<"confirm" | "payment" | "done">("confirm");
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [agreed, setAgreed]   = useState(false);
  const [error, setError]     = useState("");

  useEffect(() => setMounted(true), []);

  function openModal() {
    setStep("confirm"); setAgreed(false); setError(""); setOrderId("");
    setOpen(true);
  }

  async function createOrder() {
    setError(""); setLoading(true);
    try {
      const res  = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ boxId: box.id }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Lỗi tạo đơn. Vui lòng thử lại."); setLoading(false); return; }
      setOrderId(data.orderId);
      setStep("payment");
    } catch { setError("Lỗi kết nối. Vui lòng thử lại."); }
    setLoading(false);
  }

  const shortId = orderId.slice(0, 8).toUpperCase();

  if (!isLoggedIn) {
    return (
      <Link href={`/login?redirect=/box/${box.id}`} style={{
        display: "block", width: "100%", marginTop: 16, padding: 16, fontSize: 15,
        fontWeight: 700, borderRadius: 12, background: "var(--primary)", color: "white",
        textAlign: "center", textDecoration: "none",
      }}>
        Đăng nhập để đặt hàng
      </Link>
    );
  }

  return (
    <>
      <button onClick={openModal} className="btn btn-primary btn-lg"
        style={{ width: "100%", marginTop: 16, padding: 16, fontSize: 15 }}>
        Đặt ngay
      </button>

      {mounted && open && createPortal(
        <div
          style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
          onClick={() => { if (step !== "done") setOpen(false); }}
        >
          <div onClick={(e) => e.stopPropagation()} style={{
            background: "white", borderRadius: 24, width: "100%", maxWidth: 480,
            maxHeight: "92vh", overflowY: "auto", boxShadow: "0 24px 64px rgba(0,0,0,0.3)",
          }}>
            {/* Header */}
            <div style={{ padding: "22px 24px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                {step === "confirm" ? "Xác nhận đơn" : step === "payment" ? "Thông tin thanh toán" : "Đặt hàng thành công"}
              </div>
              {step !== "done" && (
                <button onClick={() => setOpen(false)} style={{ width: 30, height: 30, borderRadius: "50%", border: "1px solid var(--border)", background: "white", cursor: "pointer", display: "grid", placeItems: "center", fontSize: 13 }}>✕</button>
              )}
            </div>

            <div style={{ padding: "16px 24px 28px" }}>

              {/* ── STEP 1: CONFIRM ── */}
              {step === "confirm" && (
                <>
                  <h2 style={{ fontSize: 20, fontWeight: 900, marginBottom: 4 }}>{box.name}</h2>
                  <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 20 }}>{store.name}</p>

                  <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
                    {[
                      { ic: "🕒", lbl: "Giờ nhận hàng", val: `${box.pickupStart} – ${box.pickupEnd}` },
                      { ic: "📍", lbl: "Địa điểm",      val: store.address },
                      { ic: "💳", lbl: "Thanh toán",     val: "Chuyển khoản ngân hàng" },
                    ].map((r) => (
                      <div key={r.lbl} style={{ display: "flex", gap: 10, padding: "10px 14px", background: "var(--cream)", borderRadius: 10, alignItems: "flex-start" }}>
                        <span style={{ flexShrink: 0 }}>{r.ic}</span>
                        <span style={{ fontSize: 12, color: "var(--text-muted)", flexShrink: 0, minWidth: 90 }}>{r.lbl}</span>
                        <span style={{ fontSize: 12, fontWeight: 700, flex: 1, textAlign: "right" }}>{r.val}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", marginBottom: 20 }}>
                    <span style={{ fontSize: 14, fontWeight: 700 }}>Tổng thanh toán</span>
                    <span style={{ fontSize: 26, fontWeight: 900, color: "var(--primary)" }}>{formatPrice(box.priceSale)}</span>
                  </div>

                  {error && <div style={{ padding: "10px 14px", background: "#fef2f2", borderRadius: 10, fontSize: 13, color: "#b91c1c", marginBottom: 14 }}>{error}</div>}

                  <button onClick={createOrder} disabled={loading} style={{
                    width: "100%", padding: 14, borderRadius: 12,
                    background: loading ? "var(--cream)" : "var(--text)",
                    color: loading ? "var(--text-muted)" : "white",
                    border: "none", fontSize: 14, fontWeight: 700,
                    cursor: loading ? "not-allowed" : "pointer",
                  }}>
                    {loading ? "Đang xử lý..." : "Tiến hành thanh toán →"}
                  </button>
                </>
              )}

              {/* ── STEP 2: PAYMENT ── */}
              {step === "payment" && (
                <>
                  <h2 style={{ fontSize: 18, fontWeight: 900, marginBottom: 4 }}>Chuyển khoản ngân hàng</h2>
                  <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 18 }}>Chuyển khoản đúng nội dung để đơn được xác nhận nhanh nhất</p>

                  {/* Bank info */}
                  <div style={{ background: "var(--cream)", borderRadius: 14, padding: 18, marginBottom: 16 }}>
                    {[
                      { lbl: "Ngân hàng",    val: BANK.name,                           mono: false, highlight: false },
                      { lbl: "Số tài khoản", val: BANK.number,                         mono: true,  highlight: false },
                      { lbl: "Chủ tài khoản",val: BANK.owner,                          mono: false, highlight: false },
                      { lbl: "Số tiền",      val: formatPrice(box.priceSale),           mono: false, highlight: true  },
                      { lbl: "Nội dung CK",  val: `CRUMBUP ${shortId}`,               mono: true,  highlight: false },
                    ].map((r) => (
                      <div key={r.lbl} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, padding: "7px 0", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                        <span style={{ fontSize: 12, color: "var(--text-muted)", flexShrink: 0 }}>{r.lbl}</span>
                        <span style={{ fontSize: 13, fontWeight: 800, fontFamily: r.mono ? "monospace" : "inherit", color: r.highlight ? "var(--primary)" : "var(--text)", textAlign: "right" }}>{r.val}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pickup guide */}
                  <div style={{ border: "1px solid var(--border)", borderRadius: 14, padding: 16, marginBottom: 16 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>Hướng dẫn lấy hàng</div>
                    {PICKUP_GUIDE.map((t, i) => (
                      <div key={i} style={{ display: "flex", gap: 8, marginBottom: i < PICKUP_GUIDE.length - 1 ? 8 : 0, fontSize: 12, color: "var(--text)", lineHeight: 1.6 }}>
                        <span style={{ flexShrink: 0, fontWeight: 700, color: "var(--primary)" }}>{i + 1}.</span>
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>

                  {/* Agreement */}
                  <label style={{ display: "flex", gap: 10, alignItems: "flex-start", cursor: "pointer", marginBottom: 18, padding: "12px 14px", background: "var(--cream)", borderRadius: 12 }}>
                    <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)}
                      style={{ width: 16, height: 16, accentColor: "var(--primary)", marginTop: 2, flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: "var(--text)", lineHeight: 1.6 }}>
                      Tôi xác nhận đã chuyển khoản đúng số tiền và nội dung, và cam kết đến nhận hàng trong khung giờ <strong>{box.pickupStart} – {box.pickupEnd}</strong>.
                    </span>
                  </label>

                  <button onClick={() => setStep("done")} disabled={!agreed} style={{
                    width: "100%", padding: 14, borderRadius: 12,
                    background: agreed ? "var(--accent)" : "var(--cream)",
                    color: agreed ? "white" : "var(--text-muted)",
                    border: "none", fontSize: 14, fontWeight: 700,
                    cursor: agreed ? "pointer" : "not-allowed", transition: "all 0.2s",
                  }}>
                    Tôi đã chuyển khoản ✓
                  </button>
                </>
              )}

              {/* ── STEP 3: DONE ── */}
              {step === "done" && (
                <>
                  <div style={{ textAlign: "center", padding: "12px 0 24px" }}>
                    <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--accent-soft)", display: "grid", placeItems: "center", fontSize: 28, margin: "0 auto 14px", color: "var(--accent)" }}>✓</div>
                    <h2 style={{ fontSize: 20, fontWeight: 900, color: "var(--accent)", marginBottom: 6 }}>Đặt hàng thành công!</h2>
                    <p style={{ fontSize: 13, color: "var(--text-muted)" }}>Đơn đang chờ cửa hàng xác nhận</p>
                  </div>

                  {/* Order info */}
                  <div style={{ background: "var(--cream)", borderRadius: 14, padding: 16, marginBottom: 14 }}>
                    {[
                      { lbl: "Mã đơn",    val: `#${shortId}`, mono: true },
                      { lbl: "Tình trạng", val: "Chờ xác nhận", badge: true },
                      { lbl: "Giờ nhận",  val: `${box.pickupStart} – ${box.pickupEnd}`, mono: false },
                    ].map((r) => (
                      <div key={r.lbl} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{r.lbl}</span>
                        {r.badge ? (
                          <span style={{ fontSize: 11, fontWeight: 700, color: "#92400e", background: "#fef3c7", padding: "3px 10px", borderRadius: 999 }}>{r.val}</span>
                        ) : (
                          <span style={{ fontSize: 13, fontWeight: 800, fontFamily: r.mono ? "monospace" : "inherit" }}>{r.val}</span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Store contact */}
                  <div style={{ border: "1px solid var(--border)", borderRadius: 14, padding: 16, marginBottom: 14 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Liên hệ cửa hàng</div>
                    <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{store.name}</div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: store.phone ? 4 : 0 }}>📍 {store.address}</div>
                    {store.phone && <div style={{ fontSize: 12, color: "var(--text-muted)" }}>📞 {store.phone}</div>}
                  </div>

                  {/* Pickup guide */}
                  <div style={{ background: "var(--cream)", borderRadius: 14, padding: 16, marginBottom: 20 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>Hướng dẫn lấy hàng</div>
                    {PICKUP_GUIDE.map((t, i) => (
                      <div key={i} style={{ display: "flex", gap: 8, marginBottom: i < PICKUP_GUIDE.length - 1 ? 8 : 0, fontSize: 12, color: "var(--text)", lineHeight: 1.6 }}>
                        <span style={{ flexShrink: 0, fontWeight: 700, color: "var(--primary)" }}>{i + 1}.</span>
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>

                  <Link href="/orders" onClick={() => setOpen(false)} style={{
                    display: "block", width: "100%", padding: 14, borderRadius: 12,
                    background: "var(--text)", color: "white", textAlign: "center",
                    textDecoration: "none", fontSize: 14, fontWeight: 700,
                  }}>
                    Xem đơn hàng của tôi →
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
