import { redirect } from "next/navigation";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const STATUS_LABEL: Record<string, string> = {
  PENDING:   "Chờ xác nhận",
  CONFIRMED: "Đã xác nhận",
  PICKED_UP: "Đã nhận hàng",
  CANCELLED: "Đã hủy",
};

const STATUS_STYLE: Record<string, React.CSSProperties> = {
  PENDING:   { background: "#fef3c7", color: "#92400e" },
  CONFIRMED: { background: "#dbeafe", color: "#1e40af" },
  PICKED_UP: { background: "#dcfce7", color: "#15803d" },
  CANCELLED: { background: "#f1f5f9", color: "#94a3b8" },
};

export default async function OrdersPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: {
      store: { select: { id: true, name: true, address: true } },
      items: {
        include: {
          box: { select: { name: true, pickupStart: true, pickupEnd: true, image: true } },
        },
      },
      review: { select: { id: true } },
    },
  });

  const active    = orders.filter((o) => ["PENDING", "CONFIRMED"].includes(o.status));
  const completed = orders.filter((o) => ["PICKED_UP", "CANCELLED"].includes(o.status));

  return (
    <>
      <SiteHeader />
      <main style={{ minHeight: "100vh", background: "var(--ivory)", paddingTop: 80 }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 20px 64px" }}>

          {/* Back + title */}
          <div style={{ marginBottom: 28 }}>
            <Link href="/discover" style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 600, textDecoration: "none" }}>
              ← Khám phá Box
            </Link>
            <h1 style={{ fontSize: 24, fontWeight: 900, color: "var(--text)", marginTop: 10, marginBottom: 0 }}>
              Đơn hàng của tôi
            </h1>
            <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>
              {orders.length} đơn hàng
            </p>
          </div>

          {orders.length === 0 ? (
            <div style={{
              background: "white", borderRadius: 20, border: "1px solid var(--border)",
              padding: "64px 24px", textAlign: "center",
            }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>🛍️</div>
              <p style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>
                Chưa có đơn hàng nào
              </p>
              <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 24 }}>
                Khám phá các box bánh ngon và đặt ngay hôm nay!
              </p>
              <Link href="/discover" className="btn btn-primary">Khám phá Box</Link>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {/* Active orders */}
              {active.length > 0 && (
                <section>
                  <h2 style={{ fontSize: 13, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
                    Đang xử lý · {active.length}
                  </h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {active.map((o) => <OrderCard key={o.id} order={o} />)}
                  </div>
                </section>
              )}

              {/* Completed orders */}
              {completed.length > 0 && (
                <section>
                  <h2 style={{ fontSize: 13, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
                    Lịch sử · {completed.length}
                  </h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {completed.map((o) => <OrderCard key={o.id} order={o} />)}
                  </div>
                </section>
              )}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

type OrderWithRelations = Awaited<ReturnType<typeof prisma.order.findMany>>[number] & {
  store: { id: string; name: string; address: string };
  items: Array<{
    id: string; quantity: number; priceAtTime: number;
    box: { name: string; pickupStart: string; pickupEnd: string; image: string | null };
  }>;
  review: { id: string } | null;
};

function OrderCard({ order }: { order: OrderWithRelations }) {
  const isConfirmed = order.status === "CONFIRMED";
  const isPickedUp  = order.status === "PICKED_UP";
  const canReview   = isPickedUp && !order.review;
  const firstBox    = order.items[0]?.box;
  const extraItems  = order.items.length - 1;

  return (
    <div style={{
      background: "white", borderRadius: 18,
      border: isConfirmed ? "2px solid var(--primary)" : "1px solid var(--border)",
      overflow: "hidden",
    }}>
      {/* Confirmed highlight banner */}
      {isConfirmed && (
        <div style={{
          background: "var(--primary)", color: "white",
          padding: "8px 20px", fontSize: 12, fontWeight: 700,
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <span>Đơn đã được xác nhận — Mã nhận hàng:</span>
          <span style={{
            background: "rgba(255,255,255,0.25)", borderRadius: 6,
            padding: "2px 10px", letterSpacing: "0.12em", fontFamily: "monospace", fontSize: 14,
          }}>
            {order.pickupCode.slice(0, 8).toUpperCase()}
          </span>
        </div>
      )}

      <div style={{ padding: "16px 20px" }}>
        {/* Top row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 3 }}>
              {new Date(order.createdAt).toLocaleDateString("vi-VN", {
                day: "2-digit", month: "2-digit", year: "numeric",
                hour: "2-digit", minute: "2-digit",
              })}
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text)" }}>
              {order.store.name}
            </div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>
              {order.store.address.split(",")[0]}
            </div>
          </div>
          <span style={{
            padding: "4px 12px", borderRadius: 999, fontSize: 11, fontWeight: 700,
            ...STATUS_STYLE[order.status],
          }}>
            {STATUS_LABEL[order.status]}
          </span>
        </div>

        {/* Items */}
        <div style={{
          background: "var(--ivory)", borderRadius: 12, padding: "12px 16px",
          marginBottom: 14,
        }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>
            {firstBox?.name ?? "—"}
            {extraItems > 0 && (
              <span style={{ color: "var(--text-muted)", fontWeight: 400 }}> +{extraItems} box khác</span>
            )}
          </div>
          {firstBox && (
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>
              Giờ nhận: {firstBox.pickupStart} – {firstBox.pickupEnd}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            {order.status !== "CONFIRMED" && (
              <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 2 }}>
                Mã: <span style={{ fontFamily: "monospace", fontWeight: 700, color: "var(--text)" }}>
                  {order.pickupCode.slice(0, 8).toUpperCase()}
                </span>
              </div>
            )}
            <div style={{ fontSize: 17, fontWeight: 900, color: "var(--primary)" }}>
              {order.total.toLocaleString("vi-VN")}đ
            </div>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            {canReview && (
              <Link
                href={`/review/${order.id}`}
                style={{
                  padding: "8px 16px", borderRadius: 10,
                  background: "var(--primary)", color: "white",
                  fontSize: 12, fontWeight: 700, textDecoration: "none",
                }}
              >
                Đánh giá
              </Link>
            )}
            <Link
              href={`/store/${order.store.id}`}
              style={{
                padding: "8px 16px", borderRadius: 10,
                border: "1px solid var(--border)", color: "var(--text-muted)",
                fontSize: 12, fontWeight: 600, textDecoration: "none",
              }}
            >
              Xem cửa hàng
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
