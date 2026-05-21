import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const results = [
  { id: 1, shop: "Tiệm Bánh Mì Nâu", name: "Box Bánh Ngọt Cuối Ngày", oldP: "120.000đ", newP: "59.000đ", discount: 50, badge: "Sắp hết", left: 3, dist: "0.8 km", rating: 4.8, ratingN: 120, time: "18:00 - 20:00", emoji: "🥐", tone: "warm" },
  { id: 2, shop: "Café An Nhiên", name: "Box Đồ Uống & Bánh", oldP: "100.000đ", newP: "60.000đ", discount: 40, badge: "Bán chạy", left: 2, dist: "1.2 km", rating: 4.7, ratingN: 89, time: "17:00 - 19:30", emoji: "☕", tone: "cream" },
  { id: 3, shop: "Tiệm Bánh Mây", name: "Box Bánh Mặn", oldP: "150.000đ", newP: "60.000đ", discount: 60, badge: "Mới", left: 1, dist: "1.8 km", rating: 4.9, ratingN: 150, time: "19:00 - 20:30", emoji: "🥖", tone: "warm" },
  { id: 4, shop: "Brew House Café", name: "Box Pastry Mix", oldP: "160.000đ", newP: "58.000đ", discount: 65, badge: "Gần bạn", left: 4, dist: "2.1 km", rating: 4.6, ratingN: 72, time: "18:30 - 21:00", emoji: "🧁", tone: "cream" },
];

function FilterGroup({ title, options }: { title: string; options: string[] }) {
  return (
    <div style={{ paddingBottom: 16, borderBottom: "1px solid var(--border)" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
        <div style={{ flex: 1, fontSize: 13, fontWeight: 700 }}>{title}</div>
        <span style={{ fontSize: 11, color: "var(--text-muted)" }}>▾</span>
      </div>
      {options.map((o) => (
        <label key={o} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12, padding: "5px 0", cursor: "pointer", color: "var(--text)" }}>
          <input type="checkbox" style={{ width: 15, height: 15, accentColor: "var(--primary)" }} />
          {o}
        </label>
      ))}
    </div>
  );
}

export default function DiscoverPage() {
  return (
    <>
      <SiteHeader active="discover" />

      {/* Sub-tabs */}
      <div style={{ background: "white", padding: "0 64px", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", gap: 32 }}>
          {[
            { label: "Khám phá Box", active: true },
            { label: "Đơn hàng của tôi" },
            { label: "Yêu thích" },
            { label: "Ưu đãi" },
          ].map((t) => (
            <div key={t.label} style={{
              padding: "14px 0",
              fontSize: 14,
              fontWeight: t.active ? 700 : 500,
              color: t.active ? "var(--primary)" : "var(--text-muted)",
              borderBottom: t.active ? "3px solid var(--primary)" : "3px solid transparent",
              cursor: "pointer",
            }}>{t.label}</div>
          ))}
        </div>
      </div>

      <main style={{ padding: "32px 64px 48px" }}>
        {/* Toggle row */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <button className="btn btn-primary">🏪 Nhận tại cửa hàng</button>
          <button className="btn btn-ghost">🛵 Giao tận nơi</button>
          <span style={{ fontSize: 13, color: "var(--text-muted)", marginLeft: 8 }}>Hoặc kết hợp cả hai</span>
        </div>

        {/* Result header */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ fontSize: 24, flex: 1 }}>Gần bạn nhất · <span style={{ color: "var(--text-muted)", fontWeight: 500 }}>12 kết quả</span></h2>
          <button className="btn btn-ghost">Sắp xếp: Gần nhất ▾</button>
        </div>

        {/* Tri-column */}
        <div style={{ display: "grid", gridTemplateColumns: "240px 1fr 340px", gap: 24, alignItems: "flex-start" }}>
          {/* Filters */}
          <aside style={{ background: "white", padding: 24, borderRadius: 20, border: "1px solid var(--border)", position: "sticky", top: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <h3 style={{ fontSize: 18 }}>Bộ lọc</h3>
            <FilterGroup title="Loại box" options={["Bánh ngọt", "Bánh mặn", "Đồ uống", "Mix (bánh + đồ uống)"]} />
            <FilterGroup title="Khoảng giá" options={["Dưới 50.000đ", "50.000đ – 100.000đ", "100.000đ – 150.000đ", "Trên 150.000đ"]} />
            <FilterGroup title="Giờ nhận" options={["Trong 2 giờ tới", "Hôm nay", "Ngày mai"]} />
            <div style={{ paddingBottom: 16, borderBottom: "1px solid var(--border)" }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>Khoảng cách</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 10 }}>Trong bán kính: 5km</div>
              <input type="range" min={1} max={10} defaultValue={5} style={{ width: "100%", accentColor: "var(--primary)" }} />
            </div>
            <FilterGroup title="Đánh giá cửa hàng" options={["★★★★★", "★★★★ trở lên", "★★★ trở lên"]} />
            <button className="btn btn-ghost" style={{ width: "100%" }}>Xóa bộ lọc</button>
          </aside>

          {/* Results */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {results.map((r) => (
              <Link key={r.id} href={`/box/${r.id}`} style={{
                background: "white",
                borderRadius: 18,
                border: "1px solid var(--border)",
                padding: 14,
                display: "grid",
                gridTemplateColumns: "140px 1fr auto",
                gap: 18,
                alignItems: "center",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}>
                <div style={{
                  width: 140,
                  height: 140,
                  borderRadius: 14,
                  background: r.tone === "warm" ? "linear-gradient(135deg, #fde6d4, #f5d4b3)" : "linear-gradient(135deg, #fdf5e6, #e8dcc6)",
                  display: "grid",
                  placeItems: "center",
                  fontSize: 56,
                }}>{r.emoji}</div>

                <div>
                  <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
                    <span className="badge badge-primary">−{r.discount}%</span>
                    <span className="badge badge-warm">🔥 {r.badge}</span>
                  </div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>{r.shop}</div>
                  <h3 style={{ fontSize: 18, margin: "4px 0 10px" }}>{r.name}</h3>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 10 }}>
                    <span style={{ fontSize: 12, color: "var(--text-muted)", textDecoration: "line-through" }}>{r.oldP}</span>
                    <span style={{ fontSize: 22, fontWeight: 800, color: "var(--primary)", fontFamily: "var(--font-display)" }}>{r.newP}</span>
                  </div>
                  <div style={{ display: "flex", gap: 16, fontSize: 11, color: "var(--text-muted)" }}>
                    <span>🕒 {r.time}</span>
                    <span>📍 {r.dist}</span>
                    <span>⭐ {r.rating} ({r.ratingN})</span>
                    <span style={{ color: "var(--accent)", fontWeight: 600 }}>📦 Còn {r.left} box</span>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-end" }}>
                  <button style={{ width: 36, height: 36, borderRadius: 999, background: "var(--cream)", display: "grid", placeItems: "center", fontSize: 16 }}>♡</button>
                  <button className="btn btn-primary">Xem Box</button>
                </div>
              </Link>
            ))}

            <button className="btn btn-ghost" style={{ alignSelf: "center", marginTop: 8 }}>Xem thêm Box ↓</button>
          </div>

          {/* Map + Order */}
          <aside style={{ display: "flex", flexDirection: "column", gap: 16, position: "sticky", top: 24 }}>
            {/* Map preview */}
            <div style={{ borderRadius: 18, border: "1px solid var(--border)", overflow: "hidden", background: "white" }}>
              <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border)", fontSize: 14, fontWeight: 700 }}>
                Bản đồ khu vực
              </div>
              <div style={{
                height: 240,
                background: "linear-gradient(135deg, #dcecd9 0%, #b8d4ae 100%)",
                position: "relative",
                display: "grid",
                placeItems: "center",
              }}>
                {/* Pseudo map grid */}
                <svg viewBox="0 0 300 240" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.4 }}>
                  <defs>
                    <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="white" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="300" height="240" fill="url(#grid)" />
                  <path d="M 0 100 Q 80 80 150 110 T 300 90" stroke="white" strokeWidth="3" fill="none" opacity="0.6" />
                  <path d="M 50 0 L 80 240" stroke="white" strokeWidth="2" fill="none" opacity="0.5" />
                </svg>
                {/* Pins */}
                {[
                  { x: "30%", y: "40%", color: "var(--primary)" },
                  { x: "55%", y: "30%", color: "var(--primary)" },
                  { x: "70%", y: "60%", color: "var(--accent)" },
                  { x: "40%", y: "70%", color: "var(--primary)" },
                ].map((p, i) => (
                  <div key={i} style={{
                    position: "absolute",
                    left: p.x,
                    top: p.y,
                    width: 28,
                    height: 28,
                    borderRadius: "50% 50% 50% 0",
                    background: p.color,
                    transform: "rotate(-45deg)",
                    boxShadow: "var(--shadow-md)",
                  }} />
                ))}
                <button style={{ position: "absolute", bottom: 12, right: 12, background: "white", color: "var(--text)", padding: "8px 14px", borderRadius: 999, fontSize: 12, fontWeight: 700, boxShadow: "var(--shadow-md)" }}>
                  Mở rộng bản đồ
                </button>
              </div>
            </div>

            {/* Order summary */}
            <div style={{ background: "white", borderRadius: 18, border: "1px solid var(--border)", padding: 18 }}>
              <h4 style={{ fontSize: 15, marginBottom: 14, fontFamily: "var(--font-body)" }}>Đơn của bạn</h4>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <div style={{ width: 48, height: 48, borderRadius: 10, background: "var(--cream)", display: "grid", placeItems: "center", fontSize: 22 }}>☕</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Café An Nhiên</div>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>Box Đồ Uống & Bánh</div>
                  <div style={{ fontSize: 10, color: "var(--text-muted)" }}>Nhận hôm nay 17:00-19:30</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", paddingTop: 14, borderTop: "1px dashed var(--border)" }}>
                <span style={{ flex: 1, fontSize: 12, color: "var(--text-muted)" }}>Tổng tạm tính</span>
                <span style={{ fontSize: 18, fontWeight: 800, color: "var(--primary)", fontFamily: "var(--font-display)" }}>60.000đ</span>
              </div>
              <button className="btn btn-primary" style={{ width: "100%", marginTop: 14 }}>Thanh toán →</button>
            </div>
          </aside>
        </div>

        {/* Bottom impact bar */}
        <div style={{
          marginTop: 40,
          background: "white",
          border: "1px solid var(--border)",
          borderRadius: 18,
          padding: "20px 28px",
          display: "flex",
          alignItems: "center",
          gap: 32,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--accent-soft)", display: "grid", placeItems: "center", fontSize: 22 }}>🌿</div>
            <div>
              <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Bạn đã giúp tiết kiệm</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "var(--accent)", fontFamily: "var(--font-display)" }}>12 box thực phẩm</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--primary-soft)", display: "grid", placeItems: "center", fontSize: 22 }}>💧</div>
            <div>
              <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Giảm phát thải</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "var(--primary)", fontFamily: "var(--font-display)" }}>~24 kg CO₂</div>
            </div>
          </div>
          <div style={{ flex: 1 }} />
          <Link href="/about#impact" className="btn btn-ghost">Xem tác động của tôi →</Link>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
