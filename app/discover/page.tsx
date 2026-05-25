import { Suspense } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { prisma } from "@/lib/prisma";
import { formatPrice, discountPercent, getVietnamToday } from "@/lib/utils";
import MapView from "@/components/MapView";
import type { StorePin } from "@/components/MapView";
import PickupCountdown from "./PickupCountdown";
import FilterSidebar from "./FilterSidebar";
import SortButtons from "./SortButtons";

const EMOJIS = ["🥐", "☕", "🥖", "🧁", "🥪", "🎁"];

async function getStorePins(): Promise<StorePin[]> {
  const { from, to } = getVietnamToday();
  const stores = await prisma.store.findMany({
    where: { lat: { not: null }, lng: { not: null } },
    select: {
      id: true, name: true, lat: true, lng: true,
      boxes: {
        where: { active: true, quantityLeft: { gt: 0 }, date: { gte: from, lt: to } },
        select: { id: true },
      },
    },
  });
  return stores
    .filter((s) => s.lat !== null && s.lng !== null)
    .map((s) => ({ id: s.id, name: s.name, lat: s.lat!, lng: s.lng!, boxCount: s.boxes.length }));
}

function vnTimeHHMM(offsetMinutes = 0): string {
  const now = new Date(Date.now() + (7 * 60 + offsetMinutes) * 60_000);
  return `${String(now.getUTCHours()).padStart(2, "0")}:${String(now.getUTCMinutes()).padStart(2, "0")}`;
}

const PRICE_RANGES: Record<string, { gte?: number; lt?: number; lte?: number }> = {
  low:  { lt: 50_000 },
  mid:  { gte: 50_000, lt: 100_000 },
  high: { gte: 100_000, lte: 150_000 },
};

async function getBoxes(sort: string, prices: string[], pickups: string[]) {
  const { from, to } = getVietnamToday();

  const priceOR = prices
    .filter((p) => PRICE_RANGES[p])
    .map((p) => ({ priceSale: PRICE_RANGES[p] }));

  const hasSoon      = pickups.includes("soon");
  const nowHHMM      = hasSoon ? vnTimeHHMM(0)   : "";
  const twoHoursHHMM = hasSoon ? vnTimeHHMM(120) : "";

  return prisma.box.findMany({
    where: {
      active: true,
      quantityLeft: { gt: 0 },
      date: { gte: from, lt: to },
      ...(priceOR.length > 0 && { OR: priceOR }),
      ...(hasSoon && {
        pickupEnd:   { gte: nowHHMM },
        pickupStart: { lte: twoHoursHHMM },
      }),
    },
    include: { store: true },
    orderBy:
      sort === "price_asc"  ? { priceSale: "asc" } :
      sort === "price_desc" ? { priceSale: "desc" } :
      { quantityLeft: "asc" },
  });
}


function BoxSkeleton() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {[1, 2, 3].map((i) => (
        <div key={i} className="box-card-row" style={{
          background: "white",
          borderRadius: 18,
          border: "1px solid var(--border)",
          padding: 14,
          display: "grid",
          gridTemplateColumns: "140px 1fr auto",
          gap: 18,
          alignItems: "center",
        }}>
          <div className="box-card-img" style={{ width: 140, height: 140, borderRadius: 14, background: "var(--cream)", animation: "pulse 1.5s ease-in-out infinite" }} />
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

async function BoxList({ sort, prices, pickups }: { sort: string; prices: string[]; pickups: string[] }) {
  const boxes = await getBoxes(sort, prices, pickups);

  if (boxes.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "64px 0", color: "var(--text-muted)" }}>
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
          <Link key={box.id} href={`/box/${box.id}`}
            className="card-hover card-hover-warm box-card-row"
            style={{
              background: "white",
              borderRadius: 18,
              border: "1px solid var(--border)",
              padding: 14,
              display: "grid",
              gridTemplateColumns: "140px 1fr auto",
              gap: 18,
              alignItems: "center",
            }}>
            <div className="box-card-img" style={{
              width: 140, height: 140, borderRadius: 14, fontSize: 56, flexShrink: 0,
              background: tone === "warm"
                ? "linear-gradient(135deg, #fde6d4, #f5d4b3)"
                : "linear-gradient(135deg, #fdf5e6, #e8dcc6)",
              display: "grid", placeItems: "center", overflow: "hidden",
            }}>
              {box.image
                ? <img src={box.image} alt={box.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                : emoji}
            </div>

            <div>
              <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
                <span className="badge badge-primary">−{disc}%</span>
                {isLow && <span className="badge badge-warm">Sắp hết</span>}
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
              <div style={{ display: "flex", gap: 16, fontSize: 11, color: "var(--text-muted)", flexWrap: "wrap" }}>
                <span>{box.pickupStart} – {box.pickupEnd}</span>
                <span>{box.store.address.split(",")[0]}</span>
                <span style={{ color: isLow ? "var(--danger)" : "var(--accent)", fontWeight: 600 }}>
                  Còn {box.quantityLeft} box
                </span>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-end" }}>
              <PickupCountdown pickupStart={box.pickupStart} pickupEnd={box.pickupEnd} />
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
  searchParams: Promise<{ sort?: string; price?: string | string[]; pickup?: string | string[] }>;
}) {
  const sp      = await searchParams;
  const sort    = sp.sort ?? "default";
  const prices  = sp.price  ? (Array.isArray(sp.price)  ? sp.price  : [sp.price])  : [];
  const pickups = sp.pickup ? (Array.isArray(sp.pickup) ? sp.pickup : [sp.pickup]) : [];
  const storePins = await getStorePins();

  return (
    <>
      <SiteHeader />

      {/* Tab bar */}
      <div
        className="rise rise-1 discover-tabs"
        style={{
          background: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid var(--border)",
          paddingTop: 73,
          position: "sticky",
          top: 0,
          zIndex: 90,
        }}
      >
        <div className="discover-tabs-inner" style={{ display: "flex", gap: 32 }}>
          <div style={{ padding: "14px 0", fontSize: 14, fontWeight: 700, color: "var(--primary)", borderBottom: "3px solid var(--primary)", whiteSpace: "nowrap" }}>
            Khám phá Box
          </div>
        </div>
      </div>

      <main className="discover-main">
        <div className="discover-layout" style={{ gap: 24 }}>
          {/* Filters sidebar */}
          <div>
            <Suspense fallback={<div style={{ width: 220, height: 200, borderRadius: 20, background: "var(--cream)" }} />}>
              <FilterSidebar />
            </Suspense>
          </div>

          {/* Results */}
          <div className="rise rise-4" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 4, flexWrap: "wrap", gap: 8 }}>
              <h2 style={{ fontSize: 22, flex: 1 }}>Box hôm nay</h2>
              <Suspense fallback={null}>
                <SortButtons current={sort} />
              </Suspense>
            </div>
            <Suspense fallback={<BoxSkeleton />}>
              <BoxList sort={sort} prices={prices} pickups={pickups} />
            </Suspense>
          </div>

          {/* Right sidebar (map + impact) */}
          <div>
            <aside style={{ display: "flex", flexDirection: "column", gap: 16, position: "sticky", top: 130 }}>

              {/* Map */}
              <div className="rise rise-4" style={{
                background: "white",
                borderRadius: 20,
                border: "1px solid var(--border)",
                overflow: "hidden",
              }}>
                <MapView stores={storePins} height={220} />
                <div style={{ padding: "10px 14px", fontSize: 12, color: "var(--text-muted)", borderTop: "1px solid var(--border)" }}>
                  Bấm vị trí trên header để định vị
                </div>
              </div>

              {/* Impact card */}
              <div className="rise rise-5" style={{
                background: "white",
                borderRadius: 20,
                border: "1px solid var(--border)",
                padding: 20,
                display: "flex",
                flexDirection: "column",
                gap: 0,
              }}>
                <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 16 }}>Tác động của bạn</div>

                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ background: "var(--accent-soft)", borderRadius: 14, padding: "14px 16px" }}>
                    <div style={{ fontSize: 11, color: "var(--accent)", fontWeight: 600, marginBottom: 2 }}>Bạn đã cứu</div>
                    <div style={{ fontSize: 22, fontWeight: 900, color: "var(--accent)", lineHeight: 1 }}>— box</div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>trong tháng này</div>
                  </div>

                  <div style={{ background: "var(--cream)", borderRadius: 14, padding: "14px 16px" }}>
                    <div style={{ fontSize: 11, color: "var(--primary)", fontWeight: 600, marginBottom: 2 }}>CO₂ giảm phát thải</div>
                    <div style={{ fontSize: 22, fontWeight: 900, color: "var(--primary)", lineHeight: 1 }}>— kg</div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>tương đương tháng này</div>
                  </div>
                </div>

                <button style={{
                  marginTop: 14,
                  width: "100%",
                  padding: "10px 0",
                  borderRadius: 999,
                  border: "1px solid var(--border)",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "var(--text-muted)",
                  background: "transparent",
                  cursor: "pointer",
                }}>
                  Xem tác động của cộng đồng →
                </button>
              </div>

            </aside>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
