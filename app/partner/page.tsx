import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import CreateBoxModal from "./CreateBoxModal";
import PartnerOrderActions from "./PartnerOrderActions";
import BoxToggle from "./BoxToggle";
import PartnerLogoutButton from "./PartnerLogoutButton";

export const dynamic = "force-dynamic";

const STATUS_LABEL: Record<string, string> = {
  PENDING:   "Chờ xác nhận",
  CONFIRMED: "Đã xác nhận",
  PICKED_UP: "Đã nhận hàng",
  CANCELLED: "Đã hủy",
};
const STATUS_COLOR: Record<string, React.CSSProperties> = {
  PENDING:   { background: "#fef3c7", color: "#92400e" },
  CONFIRMED: { background: "#dbeafe", color: "#1e40af" },
  PICKED_UP: { background: "#dcfce7", color: "#15803d" },
  CANCELLED: { background: "#f1f5f9", color: "#64748b" },
};

export default async function PartnerDashboard() {
  /* ── Auth ── */
  const supabase = await createClient();
  const { data: { user: authUser } } = await supabase.auth.getUser();
  if (!authUser) redirect("/login");

  const prismaUser = await prisma.user.findUnique({
    where: { id: authUser.id },
    select: { id: true, name: true, role: true },
  });
  if (!prismaUser || prismaUser.role !== "BUSINESS") redirect("/");

  /* ── Store ── */
  const store = await prisma.store.findFirst({
    where: { ownerId: prismaUser.id },
    select: { id: true, name: true, address: true, verified: true, openHours: true },
  });

  if (!store) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--ivory)" }}>
        <div style={{ textAlign: "center", maxWidth: 400 }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: "var(--text)", marginBottom: 8 }}>Chưa có cửa hàng</div>
          <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 20 }}>Tài khoản của bạn chưa liên kết với cửa hàng nào. Vui lòng liên hệ hỗ trợ.</p>
          <Link href="/" className="btn btn-primary">Về trang chủ</Link>
        </div>
      </div>
    );
  }

  /* ── Data ── */
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [todayBoxes, pastBoxes, recentOrders, reviews, totalOrders] = await Promise.all([
    prisma.box.findMany({
      where: { storeId: store.id, date: { gte: today, lt: tomorrow } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.box.findMany({
      where: { storeId: store.id, date: { lt: today } },
      orderBy: { date: "desc" },
      take: 30,
    }),
    prisma.order.findMany({
      where: { storeId: store.id },
      take: 20,
      orderBy: { createdAt: "desc" },
      select: {
        id: true, total: true, status: true, pickupCode: true, createdAt: true,
        user: { select: { name: true } },
        items: { take: 1, select: { box: { select: { name: true } } } },
      },
    }),
    prisma.review.findMany({ where: { storeId: store.id }, select: { rating: true } }),
    prisma.order.count({ where: { storeId: store.id } }),
  ]);

  /* ── Stats ── */
  const activeBoxes    = todayBoxes.filter((b) => b.active && b.quantityLeft > 0).length;
  const pendingOrders  = recentOrders.filter((o) => o.status === "PENDING").length;
  const todayRevenue   = recentOrders
    .filter((o) => o.status === "PICKED_UP" && new Date(o.createdAt) >= today)
    .reduce((sum, o) => sum + o.total, 0);
  const avgRating = reviews.length > 0
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  const displayDate = today.toLocaleDateString("vi-VN", { weekday: "long", day: "2-digit", month: "2-digit", year: "numeric" });

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--ivory)", fontFamily: "var(--font-body)" }}>

      {/* ── Sidebar ── */}
      <aside style={{
        width: 220, background: "white", borderRight: "1px solid var(--border)",
        display: "flex", flexDirection: "column", padding: "24px 12px",
        position: "sticky", top: 0, height: "100vh", flexShrink: 0,
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: 28, paddingLeft: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: "var(--primary)", display: "grid", placeItems: "center" }}>
            <div style={{ width: 28, height: 28, backgroundImage: "url('/crumbup-logo-nocap.jpg')", backgroundSize: "contain", backgroundPosition: "center", backgroundRepeat: "no-repeat" }} />
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 900, color: "var(--text)", letterSpacing: "-0.02em" }}>CrumbUp</div>
            <div style={{ fontSize: 9, fontWeight: 700, color: "var(--primary)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Cửa hàng</div>
          </div>
        </Link>

        <nav style={{ flex: 1 }}>
          <a href="#overview" style={{
            display: "block", padding: "9px 12px", borderRadius: 10,
            fontSize: 14, fontWeight: 600, color: "var(--text)",
            textDecoration: "none", background: "var(--cream)",
          }}>
            Tổng quan
          </a>
        </nav>

        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 14, paddingLeft: 10 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", marginBottom: 2 }}>{prismaUser.name}</div>
          <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 12 }}>Chủ cửa hàng</div>
          <PartnerLogoutButton />
        </div>
      </aside>

      {/* ── Main ── */}
      <main style={{ flex: 1, padding: "28px 36px 48px", maxWidth: "calc(100vw - 220px)" }}>

        {/* Header */}
        <div id="overview" style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                <h1 style={{ fontSize: 22, fontWeight: 900, color: "var(--text)" }}>{store.name}</h1>
                <span style={{
                  padding: "3px 10px", borderRadius: 999, fontSize: 11, fontWeight: 700,
                  background: store.verified ? "#dcfce7" : "#fef3c7",
                  color: store.verified ? "#15803d" : "#92400e",
                }}>
                  {store.verified ? "Đã xác nhận" : "Chờ xét duyệt"}
                </span>
              </div>
              <p style={{ fontSize: 13, color: "var(--text-muted)" }}>{displayDate}</p>
            </div>
            <CreateBoxModal storeAddress={store.address} />
          </div>

          {!store.verified && (
            <div style={{ marginTop: 16, padding: "12px 16px", background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, fontSize: 13, color: "#92400e" }}>
              Cửa hàng đang chờ admin xét duyệt. Box sẽ hiển thị công khai sau khi được duyệt.
            </div>
          )}
        </div>

        {/* Stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 28 }}>
          {[
            { label: "Box đang bán", value: activeBoxes, sub: `${todayBoxes.length} box hôm nay` },
            { label: "Chờ xác nhận", value: pendingOrders, sub: `${totalOrders} đơn tổng cộng`, alert: pendingOrders > 0 },
            { label: "Doanh thu hôm nay", value: todayRevenue.toLocaleString("vi-VN") + "đ", sub: "Sau 15% phí nền tảng: " + Math.round(todayRevenue * 0.85).toLocaleString("vi-VN") + "đ" },
            { label: "Đánh giá TB", value: avgRating ? `${avgRating} ★` : "—", sub: `${reviews.length} đánh giá` },
          ].map((s) => (
            <div key={s.label} style={{
              background: "white", borderRadius: 14, padding: "18px 20px",
              border: (s as { alert?: boolean }).alert ? "2px solid var(--primary)" : "1px solid var(--border)",
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>{s.label}</div>
              <div style={{ fontSize: 26, fontWeight: 900, color: (s as { alert?: boolean }).alert ? "var(--primary)" : "var(--text)", lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 6 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Today's boxes */}
        <section id="boxes" style={{ background: "white", borderRadius: 16, border: "1px solid var(--border)", overflow: "hidden", marginBottom: 24 }}>
          <div style={{ padding: "16px 22px", borderBottom: "1px solid var(--cream)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)" }}>Box hôm nay</h2>
            <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{todayBoxes.length} box</span>
          </div>

          {todayBoxes.length === 0 ? (
            <div style={{ padding: "48px 24px", textAlign: "center" }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)", marginBottom: 6 }}>Chưa có box nào hôm nay</div>
              <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 16 }}>Tạo box để bắt đầu bán hàng.</p>
              <CreateBoxModal storeAddress={store.address} />
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "var(--ivory)" }}>
                  {["Tên box", "Giá gốc", "Giá bán", "Còn lại", "Giờ nhận", "Trạng thái", ""].map((h) => (
                    <th key={h} style={th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {todayBoxes.map((b) => {
                  const sold = b.quantityTotal - b.quantityLeft;
                  const pct  = b.quantityTotal > 0 ? Math.round((sold / b.quantityTotal) * 100) : 0;
                  return (
                    <tr key={b.id} style={{ borderTop: "1px solid var(--cream)", opacity: b.active ? 1 : 0.5 }}>
                      <td style={td}>
                        <div style={{ fontWeight: 600 }}>{b.name}</div>
                        {b.description && <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>{b.description}</div>}
                      </td>
                      <td style={{ ...td, color: "var(--text-muted)", textDecoration: "line-through", fontSize: 12 }}>
                        {b.priceOriginal.toLocaleString("vi-VN")}đ
                      </td>
                      <td style={{ ...td, fontWeight: 700, color: "var(--primary)" }}>
                        {b.priceSale.toLocaleString("vi-VN")}đ
                        <div style={{ fontSize: 10, color: "var(--text-muted)", fontWeight: 400 }}>
                          -{Math.round((1 - b.priceSale / b.priceOriginal) * 100)}%
                        </div>
                      </td>
                      <td style={td}>
                        <div style={{ fontWeight: 600 }}>{b.quantityLeft}/{b.quantityTotal}</div>
                        <div style={{ marginTop: 4, height: 4, background: "var(--cream)", borderRadius: 999, width: 60 }}>
                          <div style={{ height: "100%", width: `${pct}%`, background: "var(--primary)", borderRadius: 999 }} />
                        </div>
                      </td>
                      <td style={{ ...td, fontSize: 12, color: "var(--text-muted)" }}>{b.pickupStart} – {b.pickupEnd}</td>
                      <td style={td}>
                        <span style={{
                          padding: "3px 10px", borderRadius: 999, fontSize: 11, fontWeight: 700,
                          background: b.active && b.quantityLeft > 0 ? "var(--primary-soft)" : b.quantityLeft === 0 ? "#f1f5f9" : "#fef9f0",
                          color: b.active && b.quantityLeft > 0 ? "var(--primary-dark)" : b.quantityLeft === 0 ? "#64748b" : "var(--accent)",
                        }}>
                          {b.quantityLeft === 0 ? "Hết hàng" : b.active ? "Đang bán" : "Tạm dừng"}
                        </span>
                      </td>
                      <td style={td}><BoxToggle boxId={b.id} active={b.active} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </section>

        {/* Orders */}
        <section id="orders" style={{ background: "white", borderRadius: 16, border: "1px solid var(--border)", overflow: "hidden" }}>
          <div style={{ padding: "16px 22px", borderBottom: "1px solid var(--cream)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)" }}>Đơn hàng gần đây</h2>
            <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{totalOrders} đơn tổng cộng</span>
          </div>

          {recentOrders.length === 0 ? (
            <div style={{ padding: "48px 24px", textAlign: "center", color: "var(--text-muted)", fontSize: 13 }}>
              Chưa có đơn hàng nào
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "var(--ivory)" }}>
                  {["Mã đơn", "Khách hàng", "Box", "Tổng tiền", "Thời gian", "Trạng thái", "Thao tác"].map((h) => (
                    <th key={h} style={th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr key={o.id} style={{ borderTop: "1px solid var(--cream)" }}>
                    <td style={td}>
                      <div style={{ fontWeight: 700, color: "var(--primary)", fontSize: 12 }}>#{o.pickupCode.slice(0, 8).toUpperCase()}</div>
                    </td>
                    <td style={{ ...td, fontWeight: 600 }}>{o.user.name}</td>
                    <td style={{ ...td, fontSize: 12, color: "var(--text-muted)" }}>{o.items[0]?.box.name ?? "—"}</td>
                    <td style={{ ...td, fontWeight: 700 }}>{o.total.toLocaleString("vi-VN")}đ</td>
                    <td style={{ ...td, fontSize: 12, color: "var(--text-muted)" }}>
                      {new Date(o.createdAt).toLocaleString("vi-VN", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}
                    </td>
                    <td style={td}>
                      <span style={{ padding: "3px 10px", borderRadius: 999, fontSize: 11, fontWeight: 700, ...STATUS_COLOR[o.status] }}>
                        {STATUS_LABEL[o.status]}
                      </span>
                    </td>
                    <td style={td}>
                      <PartnerOrderActions orderId={o.id} status={o.status as "PENDING" | "CONFIRMED" | "PICKED_UP" | "CANCELLED"} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {/* Box history */}
        {pastBoxes.length > 0 && (
          <section id="history" style={{ background: "white", borderRadius: 16, border: "1px solid var(--border)", overflow: "hidden" }}>
            <div style={{ padding: "16px 22px", borderBottom: "1px solid var(--cream)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h2 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)" }}>Lịch sử box</h2>
              <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{pastBoxes.length} box</span>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "var(--ivory)" }}>
                  {["Ngày", "Tên box", "Giá bán", "Đã bán", "Doanh thu"].map((h) => (
                    <th key={h} style={th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pastBoxes.map((b) => {
                  const sold    = b.quantityTotal - b.quantityLeft;
                  const revenue = sold * b.priceSale;
                  return (
                    <tr key={b.id} style={{ borderTop: "1px solid var(--cream)", opacity: 0.75 }}>
                      <td style={{ ...td, fontSize: 12, color: "var(--text-muted)", whiteSpace: "nowrap" }}>
                        {new Date(b.date).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" })}
                      </td>
                      <td style={td}>
                        <div style={{ fontWeight: 600 }}>{b.name}</div>
                        <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{b.pickupStart} – {b.pickupEnd}</div>
                      </td>
                      <td style={{ ...td, fontWeight: 700, color: "var(--primary)" }}>
                        {b.priceSale.toLocaleString("vi-VN")}đ
                      </td>
                      <td style={td}>
                        <div style={{ fontWeight: 600 }}>{sold}/{b.quantityTotal}</div>
                        <div style={{ marginTop: 4, height: 4, background: "var(--cream)", borderRadius: 999, width: 60 }}>
                          <div style={{ height: "100%", width: `${b.quantityTotal > 0 ? Math.round((sold / b.quantityTotal) * 100) : 0}%`, background: "var(--accent)", borderRadius: 999 }} />
                        </div>
                      </td>
                      <td style={{ ...td, fontWeight: 700 }}>
                        {revenue.toLocaleString("vi-VN")}đ
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        )}
      </main>
    </div>
  );
}

const th: React.CSSProperties = {
  padding: "10px 20px", textAlign: "left", fontSize: 11,
  fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em",
};
const td: React.CSSProperties = { padding: "13px 20px", fontSize: 13, color: "var(--text)" };
