import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const businessBenefits = [
  {
    emoji: "💰",
    label: "Dòng tiền",
    labelColor: "#784d2e",
    labelBg: "#f0ddc4",
    bg: "var(--cream)",
    border: "var(--border)",
    t: "Thu hồi chi phí, tối ưu dòng tiền",
    d: "Thay vì chịu lỗ kép, đóng gói bánh dư thành Surprise Box biến khoản chi phí chìm thành nguồn doanh thu ổn định mỗi tháng.",
  },
  {
    emoji: "👥",
    label: "Khách hàng mới",
    labelColor: "var(--primary)",
    labelBg: "var(--primary-soft)",
    bg: "var(--accent-soft)",
    border: "#e8d4b8",
    t: "Tiếp cận khách hàng tiềm năng",
    d: "Khách đến lấy box thường mua thêm đồ trong quán — tăng doanh thu mỗi lượt ghé thăm mà không tốn một đồng quảng cáo.",
  },
  {
    emoji: "🌿",
    label: "Thương hiệu xanh",
    labelColor: "#2d6a31",
    labelBg: "#d4edda",
    bg: "#eef6ef",
    border: "#c8e0ca",
    t: "Thương hiệu xanh chạm đến giới trẻ",
    d: "Gen Z và Millennials ưu tiên thương hiệu có trách nhiệm môi trường. Mỗi box giải cứu là một điểm cộng hình ảnh không mất phí.",
  },
];

const operationSteps = [
  { step: "1", emoji: "📋", title: "Đăng ký & Tạo hộp", desc: "Điền form thông tin, xác nhận khung giờ và chuyển khoản phí đăng ký. Sau khi được duyệt, bạn sẽ nhận mã đơn hàng để bắt đầu." },
  { step: "2", emoji: "📱", title: "Khách đặt trước", desc: "Người dùng tìm cửa hàng trên bản đồ và đặt trước Surprise Box của bạn." },
  { step: "3", emoji: "🎁", title: "Trao box tại quầy", desc: "Xác nhận chuyển khoản thành công, kiểm tra mã đơn hàng của khách và trao Surprise Box." },
  { step: "4", emoji: "📊", title: "Theo dõi doanh thu", desc: "Quản lý dòng tiền ngay trên app, nhận thanh toán chuyển khoản định kỳ." },
];

const storeCategories = [
  { emoji: "🥖", label: "Fresh Bakery", title: "Tiệm bánh mì & Bánh ngọt truyền thống" },
  { emoji: "🎂", label: "Pastry & Cake Shop", title: "Tiệm bánh kem & Bánh lạnh cao cấp" },
  { emoji: "☕", label: "Bakery Café", title: "Mô hình Bakery & Café hiện đại" },
  { emoji: "🧁", label: "Home Bakery", title: "Tiệm bánh online & Bánh thủ công" },
];

const partnerFaqs = [
  {
    q: "Phí dịch vụ tính như thế nào?",
    a: "Không phí khởi tạo, không phí duy trì. App chỉ trích một phần nhỏ trên mỗi Surprise Box được giải cứu thành công.",
  },
  {
    q: "Có cần đầu tư bao bì riêng không?",
    a: "Bạn có thể dùng túi giấy hoặc hộp carton sẵn có. App còn khuyến khích khách tự mang hộp khi chọn hình thức tự đến lấy.",
  },
  {
    q: "Khách đặt rồi không đến lấy thì sao?",
    a: "Khách thanh toán 100% trước, đơn mới hoàn tất. Quá giờ không đến — đơn vẫn tính thành công, tiệm không thiệt.",
  },
  {
    q: "Có thể thay đổi số lượng & giờ mỗi ngày không?",
    a: "Hoàn toàn chủ động. Số lượng box và khung giờ nhận do tiệm tự cài đặt mỗi ngày theo lượng bánh dôi dư thực tế.",
  },
];

export default function ForStoresPage() {
  return (
    <>
      <SiteHeader />

      {/* HERO */}
      <section style={{
        backgroundColor: "var(--cream)",
        backgroundImage: "url('/low-opacity-cumpled-paper.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        paddingTop: 160,
        paddingBottom: 96,
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}>
        {/* Decorative floating stickers */}
        <div style={{ position: "absolute", top: 120, left: "8%", fontSize: 56, opacity: 0.18, transform: "rotate(-12deg)", userSelect: "none" }}>🥐</div>
        <div style={{ position: "absolute", top: 180, right: "7%", fontSize: 48, opacity: 0.15, transform: "rotate(10deg)", userSelect: "none" }}>🧁</div>
        <div style={{ position: "absolute", bottom: 60, left: "15%", fontSize: 40, opacity: 0.12, transform: "rotate(6deg)", userSelect: "none" }}>🥖</div>

        <div className="container" style={{ position: "relative", maxWidth: 820, width: "100%" }}>
          <div className="rise rise-1" style={{ fontSize: 12, fontWeight: 700, color: "var(--primary)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>
            Dành cho cửa hàng
          </div>
          <h1 className="rise rise-2" style={{ fontSize: 56, marginBottom: 24, lineHeight: 1.1 }}>
            Biến bánh dư cuối ngày<br />
            <em style={{ color: "var(--primary)", fontStyle: "italic", fontWeight: 800 }}>thành doanh thu</em>
          </h1>
          <p className="rise rise-3" style={{ fontSize: 16, color: "var(--text-muted)", lineHeight: 1.8, maxWidth: 620, margin: "0 auto 36px" }}>
            Những mẻ bánh tươi ngon chưa kịp tìm được chủ nhân không cần phải bị hủy bỏ — hãy để CrumbUp kết nối chúng với hàng ngàn khách hàng xung quanh bạn.
          </p>
          <a href="/register/business" className="btn btn-primary btn-lg rise rise-3">Đăng ký đối tác ngay →</a>
        </div>
      </section>

      {/* SURPRISE BOX LÀ GÌ */}
      <section style={{ padding: "80px 0", background: "white" }}>
        <div className="container">
          <div data-reveal className="right-auto-grid" style={{
            background: "linear-gradient(120deg, var(--badge) 0%, #f7d27a 100%)",
            borderRadius: 28,
            padding: "52px 56px",
            gap: 48,
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Background sticker */}
            <div style={{ position: "absolute", right: -20, bottom: -20, fontSize: 160, opacity: 0.1, lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>📦</div>

            <div style={{ position: "relative" }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 14 }}>
                Surprise Box là gì?
              </div>
              <h2 style={{ fontSize: 36, marginBottom: 16, lineHeight: 1.2 }}>
                Một chiếc hộp —<br />vô vàn cơ hội
              </h2>
              <p style={{ fontSize: 15, color: "var(--text)", lineHeight: 1.8, maxWidth: 520 }}>
                Cuối ngày, gom những mẻ bánh tươi chưa kịp bán vào Surprise Box. Khách đặt trước trên app, đến nhận đúng giờ — tiệm thu hồi chi phí, khách được bánh ngon giá hời, cùng nhau giảm lãng phí thực phẩm.
              </p>
            </div>

            {/* Stats sticker card */}
            <div style={{
              background: "white",
              borderRadius: 20,
              padding: "32px 28px",
              textAlign: "center",
              minWidth: 200,
              boxShadow: "0 8px 32px rgba(139,111,71,0.15)",
              flexShrink: 0,
            }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>📦</div>
              <div style={{ fontSize: 36, fontWeight: 800, fontFamily: "var(--font-display)", color: "var(--primary)", letterSpacing: "-0.03em" }}>−50%</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", marginTop: 4 }}>mức giá trung bình</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>khách hàng tiết kiệm được</div>
            </div>
          </div>
        </div>
      </section>

      {/* LỢI ÍCH KINH DOANH */}
      <section style={{ padding: "80px 0", backgroundColor: "var(--ivory)", backgroundImage: "url('/low-opacity-cumpled-paper.png')", backgroundSize: "cover" }}>
        <div className="container">
          <div data-reveal style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--primary)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
              Tại sao chọn CrumbUp
            </div>
            <h2 style={{ fontSize: 44 }}>Lợi ích thực tế cho tiệm bánh</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {businessBenefits.map((item, i) => (
              <div key={item.t} className="card-hover" data-reveal data-reveal-delay={String(i + 1)} style={{
                background: item.bg,
                borderRadius: 24,
                padding: "36px 32px",
                border: `1px solid ${item.border}`,
                position: "relative",
                overflow: "hidden",
              }}>
                {/* Background sticker */}
                <div style={{ position: "absolute", bottom: -8, right: 12, fontSize: 72, opacity: 0.12, lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>
                  {item.emoji}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                  <span style={{ fontSize: 28, lineHeight: 1 }}>{item.emoji}</span>
                  <span style={{
                    fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
                    color: item.labelColor, background: item.labelBg, padding: "4px 10px", borderRadius: 999,
                  }}>{item.label}</span>
                </div>
                <h3 style={{ fontSize: 19, marginBottom: 12, fontWeight: 700, lineHeight: 1.3 }}>{item.t}</h3>
                <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.75, position: "relative" }}>{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MÔ HÌNH VẬN HÀNH */}
      <section style={{ padding: "80px 0", background: "white" }}>
        <div className="container">
          <div data-reveal style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--primary)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
              Đơn giản — 4 bước
            </div>
            <h2 style={{ fontSize: 44 }}>Vận hành như thế nào?</h2>
          </div>

          <div className="steps-grid" style={{ gap: 20, position: "relative" }}>
            <svg className="steps-connector" style={{ position: "absolute", top: 48, left: "12%", right: "12%", height: 2, width: "76%", zIndex: 0 }}>
              <line x1="0" y1="1" x2="100%" y2="1" stroke="var(--border-strong)" strokeWidth="2" strokeDasharray="6 6" />
            </svg>

            {operationSteps.map((item, i) => (
              <div key={item.step} className="card-hover" data-reveal data-reveal-delay={String(i + 1)} style={{
                position: "relative",
                zIndex: 1,
                background: "var(--cream)",
                borderRadius: 20,
                padding: "40px 20px 28px",
                border: "1px solid var(--border)",
                textAlign: "center",
              }}>
                {/* Step badge */}
                <div style={{
                  position: "absolute", top: -16, left: "50%", transform: "translateX(-50%)",
                  width: 32, height: 32, borderRadius: 999,
                  background: "var(--primary)", color: "white",
                  display: "grid", placeItems: "center",
                  fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 13,
                }}>{item.step}</div>
                <div style={{ fontSize: 36, marginBottom: 14 }}>{item.emoji}</div>
                <h3 style={{ fontSize: 17, marginBottom: 10, fontWeight: 700 }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DANH MỤC CỬA HÀNG */}
      <section style={{ padding: "80px 0", backgroundColor: "var(--ivory)", backgroundImage: "url('/low-opacity-cumpled-paper.png')", backgroundSize: "cover" }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <div data-reveal style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--primary)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
              Ai phù hợp?
            </div>
            <h2 style={{ fontSize: 44, marginBottom: 12 }}>Danh mục cửa hàng</h2>
            <p style={{ fontSize: 15, color: "var(--text-muted)" }}>Chỉ cần có bánh tươi dư thừa cuối ngày, bạn đều có thể tham gia.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {storeCategories.map((cat, i) => (
              <div key={cat.title} className="card-hover" data-reveal data-reveal-delay={String(i + 1)} style={{
                background: "white",
                borderRadius: 20,
                border: "1px solid var(--border)",
                padding: "24px 28px",
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: "var(--cream)",
                  display: "grid", placeItems: "center",
                  fontSize: 26, flexShrink: 0,
                }}>{cat.emoji}</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "var(--primary)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>
                    {cat.label}
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "var(--text)" }}>{cat.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNER FAQs */}
      <section style={{ padding: "80px 0", background: "white" }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <div data-reveal style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--primary)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
              FAQ
            </div>
            <h2 style={{ fontSize: 44 }}>Câu hỏi thường gặp</h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {partnerFaqs.map((item, i) => (
              <details key={i} className="card-hover" data-reveal data-reveal-delay={String(Math.min(i + 1, 4))} style={{
                background: "var(--cream)",
                borderRadius: 16,
                border: "1px solid var(--border)",
                overflow: "hidden",
              }}>
                <summary style={{
                  padding: "20px 24px",
                  fontSize: 15, fontWeight: 700,
                  cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 14,
                  listStyle: "none",
                }}>
                  <span style={{
                    minWidth: 30, height: 30, borderRadius: 999,
                    background: "var(--primary)", color: "white",
                    display: "grid", placeItems: "center",
                    fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 12,
                  }}>{i + 1}</span>
                  <span style={{ flex: 1 }}>{item.q}</span>
                  <span style={{ color: "var(--text-muted)", fontSize: 20, lineHeight: 1 }}>+</span>
                </summary>
                <div style={{
                  padding: "0 24px 20px 68px",
                  fontSize: 14, color: "var(--text-muted)", lineHeight: 1.75,
                }}>{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "56px 0 96px", background: "white" }}>
        <div className="container">
          <div data-reveal style={{
            background: "var(--text)",
            borderRadius: 28,
            padding: "56px 64px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Decorative stickers */}
            <div style={{ position: "absolute", top: -10, left: "5%", fontSize: 80, opacity: 0.07, transform: "rotate(-15deg)", userSelect: "none" }}>🥐</div>
            <div style={{ position: "absolute", bottom: -10, right: "5%", fontSize: 80, opacity: 0.07, transform: "rotate(12deg)", userSelect: "none" }}>🎂</div>

            <div style={{ position: "relative" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--accent)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>
                Bắt đầu ngay hôm nay
              </div>
              <h2 style={{ color: "white", fontSize: 40, marginBottom: 16, lineHeight: 1.15 }}>
                Sẵn sàng tham gia CrumbUp?
              </h2>
              <p style={{ fontSize: 15, color: "rgba(253,245,230,0.75)", maxWidth: 440, margin: "0 auto 28px", lineHeight: 1.7 }}>
                Hãy cho bánh cuối ngày của bạn một cơ hội thứ hai. Không phí khởi tạo, không ràng buộc.
              </p>
              <a href="/register/business" className="btn btn-primary btn-lg">Đăng ký đối tác ngay →</a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
