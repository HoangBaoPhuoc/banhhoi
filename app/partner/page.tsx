import Link from "next/link";

// Generated QR-like pattern (16x16) for visual demo
const qrPattern = [
  "1111111011001111", "1000001011010001", "1011101000111101", "1011101010010101",
  "1011101011110101", "1000001001011001", "1111111010101111", "0000000010110000",
  "1101101110011010", "0011010100001110", "1010110111110001", "0101001001011010",
  "1110010101100111", "1000010110001000", "1011010011110110", "1110001100010111",
];

function QRCode() {
  const size = 180;
  const cells = 16;
  const cell = size / cells;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ background: "white", borderRadius: 8 }}>
      {qrPattern.map((row, r) =>
        row.split("").map((v, c) =>
          v === "1" ? <rect key={`${r}-${c}`} x={c * cell} y={r * cell} width={cell} height={cell} fill="#221c16" /> : null
        )
      )}
      {/* Corner finders */}
      {[[0, 0], [cells - 3, 0], [0, cells - 3]].map(([x, y], i) => (
        <g key={i}>
          <rect x={x * cell} y={y * cell} width={cell * 3} height={cell * 3} fill="#221c16" />
          <rect x={(x + 0.5) * cell} y={(y + 0.5) * cell} width={cell * 2} height={cell * 2} fill="white" />
          <rect x={(x + 1) * cell} y={(y + 1) * cell} width={cell} height={cell} fill="#221c16" />
        </g>
      ))}
    </svg>
  );
}

const navItems = [
  { ic: "📊", label: "Tổng quan", active: true },
  { ic: "📦", label: "Quản lý Box" },
  { ic: "🧾", label: "Đơn hàng" },
  { ic: "🛵", label: "Giao hàng / Nhận hàng" },
  { ic: "💰", label: "Doanh thu" },
  { ic: "👤", label: "Hồ sơ cửa hàng" },
  { ic: "🎁", label: "Hỗ trợ & Hỏi đáp" },
];

const stats = [
  { ic: "📦", lbl: "Box đã tạo", val: "36", sub: "+12% vs hôm qua", color: "var(--primary)" },
  { ic: "🧾", lbl: "Đơn mới", val: "18", sub: "5 đơn đang chờ xác nhận", color: "var(--accent)" },
  { ic: "💰", lbl: "Doanh thu", val: "1.080.000đ", sub: "Net: 972.000đ", color: "var(--text)" },
  { ic: "⭐", lbl: "Rating", val: "4.8", sub: "Trên 84 đánh giá", color: "var(--badge)" },
];

const boxRows = [
  { name: "Box Bánh Ngọt Cuối Ngày", oldP: "120.000đ", newP: "59.000đ", qty: 5, time: "18:00 - 20:00", status: "Đang bán", statusType: "success" },
  { name: "Box Bánh Mặn", oldP: "150.000đ", newP: "60.000đ", qty: 4, time: "18:00 - 20:30", status: "Đang bán", statusType: "success" },
  { name: "Box Mix (Bánh + Đồ uống)", oldP: "100.000đ", newP: "60.000đ", qty: 8, time: "17:00 - 19:30", status: "Đang bán", statusType: "success" },
  { name: "Box Pastry Cuối Tuần", oldP: "180.000đ", newP: "75.000đ", qty: 0, time: "—", status: "Đã hết", statusType: "danger" },
];

const orders = [
  { id: "#BH24507", cust: "Nguyễn Linh", box: "Box Bánh Ngọt", time: "Hôm nay 18:00", total: "59.000đ", status: "Chờ xác nhận", statusType: "warm" },
  { id: "#BH24506", cust: "Trần Minh", box: "Box Bánh Mặn", time: "Hôm nay 19:00", total: "60.000đ", status: "Đang giao", statusType: "primary" },
  { id: "#BH24505", cust: "Phạm Huy", box: "Box Mix", time: "Hôm nay 17:30", total: "60.000đ", status: "Khách đã lấy", statusType: "success" },
  { id: "#BH24504", cust: "Lê Trang", box: "Box Bánh Ngọt", time: "Hôm qua 20:00", total: "59.000đ", status: "Hoàn thành", statusType: "soft" },
];

export default function PartnerDashboard() {
  return (
    <>
      {/* Top bar */}
      <header style={{ background: "white", borderBottom: "1px solid var(--border)", padding: "14px 32px", display: "flex", alignItems: "center", gap: 24, marginTop: 73 }}>
        <Link href="/" className="logo">
          <div className="logo-mark">🥐</div>
          <div className="logo-text">
            <strong>CrumbUp</strong>
            <span>Dành cho cửa hàng</span>
          </div>
        </Link>

        <div style={{ flex: 1 }} />

        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: "var(--cream)", borderRadius: 10, width: 280 }}>
          <span style={{ fontSize: 13 }}>🔍</span>
          <input type="text" placeholder="Tìm đơn hàng, mã đơn..." style={{ flex: 1, border: "none", background: "transparent", outline: "none", fontSize: 12 }} />
        </div>

        <span style={{ fontSize: 18, cursor: "pointer" }}>🔔</span>
        <span style={{ fontSize: 18, cursor: "pointer" }}>⚙️</span>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 999, background: "var(--accent-soft)", display: "grid", placeItems: "center", fontSize: 16 }}>🍞</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700 }}>Tiệm Bánh Mì Nâu</div>
            <div style={{ fontSize: 10, fontWeight: 600, color: "var(--accent)" }}>● Đang mở cửa</div>
          </div>
        </div>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "240px 1fr" }}>
        {/* Sidebar */}
        <aside style={{ background: "white", borderRight: "1px solid var(--border)", padding: "24px 16px", minHeight: "calc(100vh - 70px)" }}>
          <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {navItems.map((item) => (
              <div key={item.label} style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 14px",
                borderRadius: 10,
                background: item.active ? "var(--primary)" : "transparent",
                color: item.active ? "white" : "var(--text)",
                fontWeight: item.active ? 700 : 500,
                fontSize: 13,
                cursor: "pointer",
              }}>
                <span style={{ fontSize: 16 }}>{item.ic}</span>
                {item.label}
              </div>
            ))}
          </nav>

          <div style={{ height: 24 }} />
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: 16, padding: "16px 14px 0" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>
              Thông tin công ty
            </div>
            {["Chính sách", "Điều khoản", "Liên hệ"].map((t) => (
              <div key={t} style={{ fontSize: 12, padding: "4px 0", cursor: "pointer" }}>{t}</div>
            ))}
          </div>
        </aside>

        {/* Content */}
        <main style={{ background: "var(--ivory)", padding: "28px 32px 40px" }}>
          {/* Page header */}
          <div style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
            <h1 style={{ fontSize: 30, flex: 1 }}>Tổng quan hôm nay</h1>
            <button className="btn btn-ghost">📅 Hôm nay ▾</button>
          </div>

          {/* Stat cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
            {stats.map((s) => (
              <div key={s.lbl} className="card-hover" style={{ background: "white", borderRadius: 16, border: "1px solid var(--border)", padding: 22 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--cream)", display: "grid", placeItems: "center", fontSize: 18 }}>{s.ic}</div>
                  <span style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 500 }}>{s.lbl}</span>
                </div>
                <div style={{ fontSize: 32, fontWeight: 800, color: s.color, fontFamily: "var(--font-display)", lineHeight: 1.1 }}>{s.val}</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Box management */}
          <section style={{ background: "white", borderRadius: 20, border: "1px solid var(--border)", padding: 24, marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
              <h2 style={{ fontSize: 20, flex: 1, fontFamily: "var(--font-body)" }}>Quản lý Box</h2>
              <button className="btn btn-primary">+ Tạo box mới</button>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "var(--cream)" }}>
                  {["Tên Box", "Giá gốc", "Giá giảm", "Số lượng", "Giờ nhận", "Trạng thái", "Thao tác"].map((h) => (
                    <th key={h} style={{ padding: "12px 14px", fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.04em", textAlign: "left" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {boxRows.map((r, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={{ padding: "14px", fontSize: 13, fontWeight: 600 }}>{r.name}</td>
                    <td style={{ padding: "14px", fontSize: 12, color: "var(--text-muted)", textDecoration: "line-through" }}>{r.oldP}</td>
                    <td style={{ padding: "14px", fontSize: 13, fontWeight: 800, color: "var(--primary)", fontFamily: "var(--font-display)" }}>{r.newP}</td>
                    <td style={{ padding: "14px", fontSize: 13, fontWeight: 600 }}>{r.qty}</td>
                    <td style={{ padding: "14px", fontSize: 12 }}>{r.time}</td>
                    <td style={{ padding: "14px" }}>
                      <span className={`badge ${r.statusType === "success" ? "badge-success" : "badge-danger"}`}>{r.status}</span>
                    </td>
                    <td style={{ padding: "14px", fontSize: 14, display: "flex", gap: 12 }}>
                      <span style={{ cursor: "pointer" }}>✏️</span>
                      <span style={{ cursor: "pointer" }}>🗑️</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Two-col: orders + QR */}
          <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 16 }}>
            {/* Orders */}
            <section style={{ background: "white", borderRadius: 20, border: "1px solid var(--border)", padding: 24 }}>
              <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
                <h2 style={{ fontSize: 18, flex: 1, fontFamily: "var(--font-body)" }}>Đơn hàng mới</h2>
                <Link href="#" style={{ color: "var(--primary)", fontSize: 12, fontWeight: 700 }}>Xem tất cả →</Link>
              </div>

              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "var(--cream)" }}>
                    {["Mã đơn", "Khách hàng", "Box", "Giờ nhận", "Tổng", "Trạng thái"].map((h) => (
                      <th key={h} style={{ padding: "10px 12px", fontSize: 10, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.04em", textAlign: "left" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id} style={{ borderBottom: "1px solid var(--border)" }}>
                      <td style={{ padding: "12px", fontSize: 12, fontWeight: 700, color: "var(--primary)" }}>{o.id}</td>
                      <td style={{ padding: "12px", fontSize: 12, fontWeight: 600 }}>{o.cust}</td>
                      <td style={{ padding: "12px", fontSize: 12 }}>{o.box}</td>
                      <td style={{ padding: "12px", fontSize: 11, color: "var(--text-muted)" }}>{o.time}</td>
                      <td style={{ padding: "12px", fontSize: 12, fontWeight: 700 }}>{o.total}</td>
                      <td style={{ padding: "12px" }}>
                        <span className={`badge badge-${o.statusType}`}>{o.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            {/* QR */}
            <section style={{ background: "white", borderRadius: 20, border: "1px solid var(--border)", padding: 24, display: "flex", flexDirection: "column" }}>
              <h2 style={{ fontSize: 18, marginBottom: 6, fontFamily: "var(--font-body)" }}>QR xác nhận lấy hàng</h2>
              <p style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 16 }}>
                Khách hàng xuất trình mã QR để bạn quét và xác nhận đơn.
              </p>

              <div style={{ background: "var(--cream)", borderRadius: 14, padding: 20, display: "flex", flexDirection: "column", alignItems: "center", gap: 12, flex: 1, justifyContent: "center" }}>
                <div style={{ background: "white", padding: 14, borderRadius: 10, boxShadow: "var(--shadow-sm)" }}>
                  <QRCode />
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>Đơn #BH24507</div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Nguyễn Linh · Hôm nay 18:00</div>
                </div>
              </div>

              <button className="btn btn-primary" style={{ width: "100%", marginTop: 14 }}>📷 Quét mã giao hàng</button>
            </section>
          </div>

          {/* Help banner */}
          <div style={{ background: "linear-gradient(120deg, var(--badge) 0%, #f7d27a 100%)", borderRadius: 20, padding: "20px 28px", marginTop: 24, display: "flex", alignItems: "center", gap: 18 }}>
            <span style={{ fontSize: 28 }}>💡</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 800, fontFamily: "var(--font-display)" }}>Cần bạn hỗ trợ?</div>
              <div style={{ fontSize: 12 }}>Đội ngũ chúng tôi luôn sẵn sàng giúp bạn 24/7.</div>
            </div>
            <button className="btn btn-dark">Liên hệ hỗ trợ →</button>
          </div>
        </main>
      </div>
    </>
  );
}
