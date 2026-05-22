import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const reviews = [
  { name: "Nguyễn Linh", time: "2 ngày trước", stars: 5, content: "Box quá đỉnh luôn, cà phê thơm, bánh croissant ăn vẫn còn giòn. Sẽ ủng hộ tiếp!" },
  { name: "Trần Minh", time: "5 ngày trước", stars: 4, content: "Giá quá hời, được đến 3 loại bánh khác nhau. Chỉ tiếc là phải đến lấy nhanh kẻo hết." },
  { name: "Phạm Huy", time: "1 tuần trước", stars: 5, content: "Lần đầu thử Surprise Box, không ngờ nhận được nhiều thế. Highly recommend!" },
];

export default function BoxDetailPage({ params }: { params: { id: string } }) {
  return (
    <>
      <SiteHeader />

      <div style={{ padding: "16px 64px", paddingTop: 89, background: "white", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--text-muted)" }}>
          <Link href="/discover" style={{ color: "var(--text-muted)" }}>Khám phá</Link>
          <span>›</span>
          <span>Café An Nhiên</span>
          <span>›</span>
          <span style={{ color: "var(--text)", fontWeight: 600 }}>Box Đồ Uống & Bánh</span>
        </div>
      </div>

      <main style={{ padding: "32px 64px 64px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: 40, alignItems: "flex-start" }}>
          {/* LEFT — gallery + info */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Big image */}
            <div style={{
              background: "linear-gradient(135deg, #fde6d4 0%, #f5d4b3 100%)",
              borderRadius: 24,
              padding: "60px 40px",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
              minHeight: 380,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}>
              <div style={{ position: "absolute", top: 20, left: 20, display: "flex", gap: 8 }}>
                <span className="badge badge-primary" style={{ padding: "6px 14px", fontSize: 13 }}>−40%</span>
                <span className="badge badge-warm" style={{ padding: "6px 14px", fontSize: 13 }}>🔥 Bán chạy</span>
              </div>
              <div style={{ position: "absolute", top: 20, right: 20 }}>
                <button style={{ width: 44, height: 44, borderRadius: 999, background: "white", boxShadow: "var(--shadow-md)", fontSize: 18 }}>♡</button>
              </div>
              <div style={{ fontSize: 140, lineHeight: 1 }}>☕🥐🥯</div>
              <p style={{ marginTop: 24, fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 18, color: "var(--text-muted)" }}>
                "Bí mật ngon mỗi ngày"
              </p>

              <svg style={{ position: "absolute", bottom: 16, right: 24, opacity: 0.15 }} width="80" height="80" viewBox="0 0 80 80">
                <path d="M 10 60 Q 40 10 70 60" stroke="var(--text)" strokeWidth="2" fill="none" />
                <path d="M 10 50 Q 40 0 70 50" stroke="var(--text)" strokeWidth="2" fill="none" />
              </svg>
            </div>

            {/* Thumbnails */}
            <div style={{ display: "flex", gap: 12 }}>
              {["☕", "🥐", "🥯", "🧁"].map((emo, i) => (
                <div key={i} style={{
                  width: 80, height: 80,
                  background: "var(--cream)",
                  borderRadius: 14,
                  display: "grid",
                  placeItems: "center",
                  fontSize: 32,
                  border: i === 0 ? "2px solid var(--primary)" : "1px solid var(--border)",
                  cursor: "pointer",
                }}>{emo}</div>
              ))}
            </div>

            {/* Shop info card */}
            <div style={{ background: "white", borderRadius: 20, border: "1px solid var(--border)", padding: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 64, height: 64, borderRadius: 999, background: "var(--accent-soft)", display: "grid", placeItems: "center", fontSize: 30 }}>☕</div>
                <div style={{ flex: 1 }}>
                  <h2 style={{ fontSize: 22, marginBottom: 4 }}>Café An Nhiên</h2>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>⭐ 4.7 (89 đánh giá) · 📍 12 Hoàng Diệu, Ba Đình, Hà Nội</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>📞 0901 234 567 · 🕒 Mở cửa 7:00 – 21:00</div>
                </div>
                <button className="btn btn-ghost">+ Theo dõi</button>
              </div>

              <div style={{ borderTop: "1px solid var(--border)", margin: "20px 0" }} />

              <h3 style={{ fontSize: 17, marginBottom: 12, fontFamily: "var(--font-body)", fontWeight: 700 }}>Giới thiệu Box</h3>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--text)" }}>
                Box gồm hỗn hợp đồ uống và bánh ngọt được chuẩn bị trong ngày — có thể là cà phê đặc biệt,
                bánh croissant bơ, bánh ngọt thủ công hoặc bánh mì mặn. Nội dung cụ thể là bất ngờ, nhưng
                chất lượng và độ tươi luôn được đảm bảo.
              </p>
            </div>

            {/* Allergen */}
            <div style={{ background: "var(--cream)", borderRadius: 16, padding: 24, border: "1px solid var(--border)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <span style={{ fontSize: 22 }}>⚠️</span>
                <h3 style={{ fontSize: 16, fontFamily: "var(--font-body)" }}>Lưu ý dị ứng & thành phần</h3>
              </div>
              <p style={{ fontSize: 13, color: "var(--text)", marginBottom: 14, lineHeight: 1.6 }}>
                Vì box là ngẫu nhiên, nếu bạn có dị ứng với gluten, trứng, sữa, lạc... vui lòng ghi chú lại
                để cửa hàng có thể chọn sản phẩm phù hợp cho bạn.
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["Gluten-free", "Không trứng", "Không sữa", "Không lạc", "Chay"].map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div style={{ background: "white", borderRadius: 20, border: "1px solid var(--border)", padding: 28 }}>
              <div style={{ display: "flex", alignItems: "center", marginBottom: 18 }}>
                <h3 style={{ fontSize: 18, flex: 1, fontFamily: "var(--font-body)" }}>Đánh giá từ khách hàng</h3>
                <span style={{ fontSize: 14, fontWeight: 700, color: "var(--primary)" }}>⭐ 4.7 / 5 · 89 đánh giá</span>
              </div>

              {reviews.map((r, i) => (
                <div key={i} style={{ padding: "16px 0", borderTop: i === 0 ? "none" : "1px solid var(--border)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 999, background: "var(--accent-soft)", display: "grid", placeItems: "center", fontSize: 16 }}>👤</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 700 }}>{r.name}</div>
                      <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{r.time}</div>
                    </div>
                    <div style={{ fontSize: 13 }}>{"⭐".repeat(r.stars)}</div>
                  </div>
                  <p style={{ fontSize: 13, color: "var(--text)", lineHeight: 1.6, paddingLeft: 48 }}>{r.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — purchase panel */}
          <aside style={{ position: "sticky", top: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: "white", borderRadius: 24, border: "1px solid var(--border)", padding: 28, boxShadow: "var(--shadow-md)" }}>
              <h1 style={{ fontSize: 26, marginBottom: 12, lineHeight: 1.2 }}>Box Đồ Uống & Bánh</h1>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 6 }}>
                <span style={{ fontSize: 15, color: "var(--text-muted)", textDecoration: "line-through" }}>100.000đ</span>
                <span style={{ fontSize: 36, fontWeight: 800, color: "var(--primary)", fontFamily: "var(--font-display)" }}>60.000đ</span>
              </div>
              <span className="badge badge-success" style={{ marginBottom: 20 }}>Tiết kiệm 40.000đ (40%)</span>

              <div style={{ background: "var(--cream)", borderRadius: 14, padding: 16, marginTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { ic: "🕒", lbl: "Giờ nhận", val: "Hôm nay 17:00 – 19:30" },
                  { ic: "📦", lbl: "Còn lại", val: "2 box" },
                  { ic: "📍", lbl: "Khoảng cách", val: "1.2 km" },
                  { ic: "🏪", lbl: "Hình thức", val: "Nhận tại cửa hàng" },
                ].map((r) => (
                  <div key={r.lbl} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 14 }}>{r.ic}</span>
                    <span style={{ flex: 1, fontSize: 12, color: "var(--text-muted)" }}>{r.lbl}</span>
                    <span style={{ fontSize: 12, fontWeight: 700 }}>{r.val}</span>
                  </div>
                ))}
              </div>

              {/* Quantity */}
              <div style={{ display: "flex", alignItems: "center", marginTop: 20 }}>
                <div style={{ flex: 1, fontSize: 13, fontWeight: 700 }}>Số lượng</div>
                <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--border)", borderRadius: 999, overflow: "hidden" }}>
                  <button style={{ padding: "8px 14px", fontSize: 16, fontWeight: 700 }}>−</button>
                  <span style={{ padding: "8px 18px", fontSize: 14, fontWeight: 700, minWidth: 40, textAlign: "center" }}>1</span>
                  <button style={{ padding: "8px 14px", fontSize: 16, fontWeight: 700, background: "var(--primary)", color: "white" }}>+</button>
                </div>
              </div>

              {/* Note */}
              <div style={{ marginTop: 18 }}>
                <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 6 }}>Ghi chú dị ứng / yêu cầu (tuỳ chọn)</div>
                <textarea
                  placeholder="VD: Tôi bị dị ứng lạc, không ăn được bánh chứa sữa..."
                  style={{
                    width: "100%",
                    padding: 12,
                    border: "1px solid var(--border)",
                    borderRadius: 10,
                    fontSize: 12,
                    background: "var(--cream)",
                    resize: "vertical",
                    minHeight: 70,
                    outline: "none",
                  }}
                />
              </div>

              <button className="btn btn-primary btn-lg" style={{ width: "100%", marginTop: 18, padding: 16, fontSize: 15 }}>
                Đặt ngay · 60.000đ
              </button>
              <button className="btn btn-ghost" style={{ width: "100%", marginTop: 8 }}>♡ Thêm vào yêu thích</button>
            </div>

            {/* Trust block */}
            <div style={{ background: "white", borderRadius: 16, border: "1px solid var(--border)", padding: 18, display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { ic: "✅", t: "100% sản phẩm sản xuất trong ngày" },
                { ic: "🔒", t: "Thanh toán an toàn, mã QR riêng" },
                { ic: "♻️", t: "Mỗi đơn cứu ~2 kg thực phẩm khỏi rác" },
              ].map((r) => (
                <div key={r.t} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 16 }}>{r.ic}</span>
                  <span style={{ fontSize: 12, fontWeight: 500 }}>{r.t}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
