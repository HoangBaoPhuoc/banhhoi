import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const pickupSteps = [
  { n: 1, ic: "📱", title: "Nhận mã QR đơn hàng", desc: "Sau khi thanh toán thành công, bạn sẽ nhận được mã QR riêng trong tab \"Đơn hàng của tôi\"." },
  { n: 2, ic: "🕒", title: "Đến cửa hàng đúng giờ", desc: "Đến tiệm trong khung giờ nhận đã đặt. Bạn có thể xem địa chỉ và bản đồ trong chi tiết đơn." },
  { n: 3, ic: "✨", title: "Đưa mã QR cho nhân viên", desc: "Nhân viên sẽ quét mã QR để xác nhận đơn và giao Surprise Box cho bạn." },
  { n: 4, ic: "💚", title: "Đánh giá & tận hưởng", desc: "Đừng quên đánh giá cửa hàng và chia sẻ trải nghiệm để giúp cộng đồng nhé!" },
];

const rules = [
  { ic: "⏰", title: "Đến trễ giờ nhận", desc: "Đơn hàng sẽ được tự động hủy sau 15 phút quá giờ hẹn và không hoàn tiền. Vui lòng đến đúng giờ.", strong: true },
  { ic: "❌", title: "Không đến nhận hàng", desc: "Nếu bạn không đến nhận trong khung giờ, đơn sẽ tính là không hoàn thành và không được hoàn tiền.", strong: true },
  { ic: "🔄", title: "Đổi giờ nhận", desc: "Bạn có thể đổi giờ nhận miễn phí 1 lần trước khung giờ ban đầu ít nhất 1 tiếng." },
  { ic: "💔", title: "Cửa hàng hết box", desc: "Trường hợp hiếm gặp do trùng đơn — bạn sẽ được hoàn 100% tiền hoặc đổi box tương đương." },
  { ic: "⚠️", title: "Sản phẩm không đạt chất lượng", desc: "Nếu phát hiện lỗi từ phía cửa hàng, vui lòng phản ánh trong 24h kèm hình ảnh để được hỗ trợ." },
];

export default function DeliveryPage() {
  return (
    <>
      <SiteHeader active="delivery" />

      {/* HERO */}
      <section style={{ background: "var(--cream)", padding: "72px 64px 56px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 20, left: 80, fontSize: 100, opacity: 0.07, transform: "rotate(-20deg)" }}>🛍️</div>
        <div style={{ position: "absolute", bottom: 20, right: 80, fontSize: 100, opacity: 0.07, transform: "rotate(15deg)" }}>📱</div>
        <div className="container" style={{ position: "relative" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "var(--primary)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 14 }}>
            Hướng dẫn nhận hàng
          </div>
          <h1 style={{ fontSize: 56, marginBottom: 16, lineHeight: 1.1 }}>
            Đơn giản — chỉ <em style={{ color: "var(--primary)", fontStyle: "italic" }}>4 bước</em><br />
            để nhận Surprise Box
          </h1>
          <p style={{ fontSize: 16, color: "var(--text-muted)", maxWidth: 560, margin: "0 auto" }}>
            Hiện tại Still Good hỗ trợ hình thức <strong style={{ color: "var(--text)" }}>tự đến lấy tại cửa hàng (Pick-up)</strong>.
            Giao tận nơi đang được phát triển.
          </p>
        </div>
      </section>

      {/* PICKUP STEPS */}
      <section style={{ padding: "72px 0", background: "white" }}>
        <div className="container">
          <h2 style={{ fontSize: 36, textAlign: "center", marginBottom: 48 }}>Quy trình tự đến lấy</h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, position: "relative" }}>
            {/* Connecting dashed line */}
            <svg style={{ position: "absolute", top: 50, left: "12%", right: "12%", height: 2, width: "76%", zIndex: 0 }}>
              <line x1="0" y1="1" x2="100%" y2="1" stroke="var(--border-strong)" strokeWidth="2" strokeDasharray="6 6" />
            </svg>

            {pickupSteps.map((s) => (
              <div key={s.n} style={{ position: "relative", textAlign: "center", zIndex: 1 }}>
                <div style={{
                  width: 100,
                  height: 100,
                  borderRadius: 28,
                  background: "white",
                  border: "2px solid var(--border)",
                  margin: "0 auto 20px",
                  display: "grid",
                  placeItems: "center",
                  fontSize: 42,
                  position: "relative",
                  boxShadow: "var(--shadow-md)",
                }}>
                  {s.ic}
                  <div style={{
                    position: "absolute",
                    top: -10,
                    right: -10,
                    width: 32,
                    height: 32,
                    borderRadius: 999,
                    background: "var(--primary)",
                    color: "white",
                    display: "grid",
                    placeItems: "center",
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: 13,
                  }}>{s.n}</div>
                </div>
                <h3 style={{ fontSize: 18, marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QR DEMO */}
      <section style={{ padding: "72px 0", background: "var(--ivory)" }}>
        <div className="container">
          <div style={{
            background: "white",
            borderRadius: 28,
            padding: "48px 56px",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: 48,
            alignItems: "center",
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow-md)",
          }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--accent)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
                Mã QR riêng cho mỗi đơn
              </div>
              <h2 style={{ fontSize: 36, marginBottom: 16, lineHeight: 1.2 }}>
                Một mã QR — một đơn hàng — một lần dùng.
              </h2>
              <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 24 }}>
                Sau khi thanh toán thành công, hệ thống tạo mã QR riêng và lưu trong tab
                "Đơn hàng của tôi". Nhân viên cửa hàng sẽ quét mã để xác nhận trả Box cho bạn —
                nhanh chóng, không nhầm lẫn.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  "🔒 Mã hoá an toàn, không thể giả mạo",
                  "⚡ Quét 1 lần, tự động hết hiệu lực",
                  "📲 Lưu offline, không cần mạng để hiển thị",
                ].map((t) => (
                  <div key={t} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13 }}>
                    <span style={{ fontSize: 16 }}>{t.split(" ")[0]}</span>
                    <span>{t.split(" ").slice(1).join(" ")}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* QR mockup */}
            <div style={{
              background: "var(--cream)",
              padding: 28,
              borderRadius: 20,
              textAlign: "center",
            }}>
              <div style={{ background: "white", padding: 18, borderRadius: 12, boxShadow: "var(--shadow-sm)", display: "inline-block" }}>
                <svg width="160" height="160" viewBox="0 0 160 160">
                  {/* Simple QR-like pattern */}
                  {Array.from({ length: 200 }).map((_, i) => {
                    const r = Math.floor(i / 14), c = i % 14;
                    const seed = (r * 7 + c * 13) % 100;
                    return seed > 50 ? <rect key={i} x={c * 11 + 4} y={r * 11 + 4} width="10" height="10" fill="#221c16" /> : null;
                  })}
                  {/* Corner finders */}
                  {[[4, 4], [114, 4], [4, 114]].map(([x, y], i) => (
                    <g key={i}>
                      <rect x={x} y={y} width="34" height="34" fill="#221c16" />
                      <rect x={x + 4} y={y + 4} width="26" height="26" fill="white" />
                      <rect x={x + 10} y={y + 10} width="14" height="14" fill="#221c16" />
                    </g>
                  ))}
                </svg>
              </div>
              <div style={{ marginTop: 14, fontSize: 12, fontWeight: 700 }}>Đơn #BH24507</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Hết hiệu lực sau 19:30 hôm nay</div>
            </div>
          </div>
        </div>
      </section>

      {/* RULES */}
      <section style={{ padding: "72px 0", background: "white" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--danger)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
              Lưu ý quan trọng
            </div>
            <h2 style={{ fontSize: 36 }}>Quy định xử lý rủi ro</h2>
            <p style={{ fontSize: 15, color: "var(--text-muted)", maxWidth: 540, margin: "12px auto 0" }}>
              Để cả khách hàng và cửa hàng đều có trải nghiệm tốt nhất, vui lòng đọc kỹ các điều khoản dưới đây.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 1000, margin: "0 auto" }}>
            {rules.map((r) => (
              <div key={r.title} style={{
                background: r.strong ? "var(--cream)" : "white",
                border: r.strong ? "1px solid var(--badge)" : "1px solid var(--border)",
                borderRadius: 16,
                padding: 22,
                display: "flex",
                gap: 14,
              }}>
                <div style={{ fontSize: 24, lineHeight: 1 }}>{r.ic}</div>
                <div>
                  <h3 style={{ fontSize: 15, marginBottom: 6, fontFamily: "var(--font-body)" }}>{r.title}</h3>
                  <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6 }}>{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMING SOON DELIVERY */}
      <section style={{ padding: "56px 0 96px", background: "var(--ivory)" }}>
        <div className="container">
          <div style={{
            background: "linear-gradient(135deg, #4c8c4a 0%, #6ba968 100%)",
            borderRadius: 24,
            padding: "48px 56px",
            color: "white",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: 32,
            alignItems: "center",
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{ position: "absolute", right: -30, top: -30, fontSize: 200, opacity: 0.15 }}>🛵</div>
            <div style={{ position: "relative" }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12, opacity: 0.9 }}>
                Sắp ra mắt
              </div>
              <h2 style={{ fontSize: 32, color: "white", marginBottom: 12 }}>
                Giao tận nơi — sớm thôi! 🛵
              </h2>
              <p style={{ fontSize: 15, opacity: 0.92, lineHeight: 1.6, maxWidth: 560 }}>
                Chúng tôi đang phát triển mạng lưới shipper riêng để bạn có thể nhận Surprise Box mà không cần ra khỏi nhà.
                Đăng ký nhận thông báo khi tính năng ra mắt nhé!
              </p>
            </div>
            <button className="btn" style={{ background: "white", color: "var(--accent)" }}>Đăng ký nhận tin →</button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
