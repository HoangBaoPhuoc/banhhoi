import { Suspense } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { prisma } from "@/lib/prisma";
import { formatPrice, discountPercent, getVietnamToday } from "@/lib/utils";

const EMOJIS = ["🥐", "☕", "🥖", "🧁", "🥪", "🎁"];

async function getBoxes(sort: string) {
  const { from, to } = getVietnamToday();

  return prisma.box.findMany({
    where: {
      active: true,
      quantityLeft: { gt: 0 },
      date: { gte: from, lt: to },
    },
    include: { store: true },
    orderBy:
      sort === "price_asc"
        ? { priceSale: "asc" }
        : sort === "price_desc"
        ? { priceSale: "desc" }
        : { quantityLeft: "asc" },
  });
}

function FilterGroup({ title, options }: { title: string; options: string[] }) {
  return (
    <div style={{ paddingBottom: 16, borderBottom: "1px solid var(--border)" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
        <div style={{ flex: 1, fontSize: 13, fontWeight: 700 }}>{title}</div>
        <span style={{ fontSize: 11, color: "var(--text-muted)" }}>▾</span>
      </div>
      {options.map((o) => (
        <label key={o} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12, padding: "5px 0", cursor: "pointer" }}>
          <input type="checkbox" style={{ width: 15, height: 15, accentColor: "var(--primary)" }} />
          {o}
        </label>
      ))}
    </div>
  );
}

function BoxSkeleton() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {[1, 2, 3].map((i) => (
        <div key={i} style={{
          background: "white",
          borderRadius: 18,
          border: "1px solid var(--border)",
          padding: 14,
          display: "grid",
          gridTemplateColumns: "140px 1fr auto",
          gap: 18,
          alignItems: "center",
        }}>
          <div style={{ width: 140, height: 140, borderRadius: 14, background: "var(--cream)", animation: "pulse 1.5s ease-in-out infinite" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ height: 14, width: "30%", borderRadius: 6, background: "var(--cream)", animation: "pulse 1.5s ease-in-out infinite" }} />
            <div style={{ height: 20, width: "60%", borderRadius: 6, background: "var(--cream)", animation: "pulse 1.5s ease-in-out infinite" }} />
            <div style={{ height: 28, width: "40%", borderRadius: 6, background: "var(--cream)", animation: "pulse 1.5s ease-in-out infinite" }} />
            <div style={{ height: 12, width: "70%", borderRadius: 6, background: "var(--cream)", animation: "pulse 1.5s ease-in-out infinite" }} />
          </div>
          <div style={{ width: 80, height: 36, borderRadius: 999, background: "var(--cream)", animation: "pulse 1.5s ease-in-out infinite" }} />
        </div>
      ))}
    </div>
  );
}

async function BoxList({ sort }: { sort: string }) {
  const boxes = await getBoxes(sort);

  if (boxes.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "64px 0", color: "var(--text-muted)" }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🥲</div>
        <p style={{ fontSize: 16, fontWeight: 600 }}>Hôm nay chưa có box nào</p>
        <p style={{ fontSize: 13, marginTop: 6 }}>Quay lại sau nhé!</p>
      </div>
    );
  }

  return (
    <>
      {boxes.map((box, i) => {
        const disc = discountPercent(box.priceOriginal, box.priceSale);
        const emoji = EMOJIS[i % EMOJIS.length];
        const isLow = box.quantityLeft <= 2;
        const tone = i % 2 === 0 ? "warm" : "cream";

        return (
          <Link key={box.id} href={`/box/${box.id}`} className="card-hover card-hover-warm" data-reveal data-reveal-delay={String(Math.min(i + 1, 4))} style={{
            background: "white",
            borderRadius: 18,
            border: "1px solid var(--border)",
            padding: 14,
            display: "grid",
            gridTemplateColumns: "140px 1fr auto",
            gap: 18,
            alignItems: "center",
          }}>
            <div style={{
              width: 140, height: 140, borderRadius: 14, fontSize: 56,
              background: tone === "warm"
                ? "linear-gradient(135deg, #fde6d4, #f5d4b3)"
                : "linear-gradient(135deg, #fdf5e6, #e8dcc6)",
              display: "grid", placeItems: "center",
            }}>{emoji}</div>

            <div>
              <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
                <span className="badge badge-primary">−{disc}%</span>
                {isLow && <span className="badge badge-warm">🔥 Sắp hết</span>}
              </div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>
                {box.store.name}
              </div>
              <h3 style={{ fontSize: 18, margin: "4px 0 10px" }}>{box.name}</h3>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: 12, color: "var(--text-muted)", textDecoration: "line-through" }}>
                  {formatPrice(box.priceOriginal)}
                </span>
                <span style={{ fontSize: 22, fontWeight: 800, color: "var(--primary)" }}>
                  {formatPrice(box.priceSale)}
                </span>
              </div>
              <div style={{ display: "flex", gap: 16, fontSize: 11, color: "var(--text-muted)" }}>
                <span>🕒 {box.pickupStart} - {box.pickupEnd}</span>
                <span>📍 {box.store.address.split(",")[0]}</span>
                <span style={{ color: isLow ? "var(--danger)" : "var(--accent)", fontWeight: 600 }}>
                  📦 Còn {box.quantityLeft} box
                </span>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-end" }}>
              <button
                style={{ width: 36, height: 36, borderRadius: 999, background: "var(--cream)", display: "grid", placeItems: "center", fontSize: 16 }}
                onClick={(e) => e.preventDefault()}
              >♡</button>
              <span className="btn btn-primary">Xem Box</span>
            </div>
          </Link>
        );
      })}
    </>
  );
}

export default async function DiscoverPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>;
}) {
  const { sort = "default" } = await searchParams;

  return (
    <>
      <SiteHeader />

      <div className="rise rise-1" style={{ background: "white", padding: "0 64px", borderBottom: "1px solid var(--border)", paddingTop: 73 }}>
        <div style={{ display: "flex", gap: 32 }}>
          {[
            { label: "Khám phá Box", active: true },
            { label: "Đơn hàng của tôi" },
            { label: "Yêu thích" },
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

      <main style={{ padding: "32px 64px 48px", backgroundColor: "var(--ivory)", backgroundImage: "url('/low-opacity-cumpled-paper.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="rise rise-2" style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ fontSize: 24, flex: 1 }}>
            Box hôm nay
          </h2>
          <div style={{ display: "flex", gap: 8 }}>
            {[
              { label: "Mặc định", value: "default" },
              { label: "Giá thấp nhất", value: "price_asc" },
              { label: "Giá cao nhất", value: "price_desc" },
            ].map((s) => (
              <Link
                key={s.value}
                href={`/discover?sort=${s.value}`}
                className={sort === s.value ? "btn btn-primary" : "btn btn-ghost"}
                style={{ fontSize: 12, padding: "8px 14px" }}
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 24, alignItems: "flex-start" }}>
          {/* Filters */}
          <aside className="rise rise-3" style={{ background: "white", padding: 24, borderRadius: 20, border: "1px solid var(--border)", position: "sticky", top: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <h3 style={{ fontSize: 18 }}>Bộ lọc</h3>
            <FilterGroup title="Loại box" options={["Bánh ngọt", "Bánh mặn", "Đồ uống", "Mix"]} />
            <FilterGroup title="Khoảng giá" options={["Dưới 50.000đ", "50k – 100k", "100k – 150k"]} />
            <FilterGroup title="Giờ nhận" options={["Trong 2 giờ tới", "Hôm nay"]} />
            <FilterGroup title="Đánh giá" options={["★★★★★", "★★★★ trở lên"]} />
            <button className="btn btn-ghost" style={{ width: "100%" }}>Xóa bộ lọc</button>
          </aside>

          {/* Results */}
          <div className="rise rise-4" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Suspense fallback={<BoxSkeleton />}>
              <BoxList sort={sort} />
            </Suspense>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
