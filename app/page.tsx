import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PartnerCTAButton from "@/components/PartnerCTAButton";
import ScrollArrow from "@/components/ScrollArrow";

const featuredBoxes = [
  {
    shop: "Tiệm Bánh Mì Nâu",
    name: "Box Bánh Ngọt Cuối Ngày",
    oldP: "120.000đ",
    newP: "59.000đ",
    discount: 50,
    time: "18:00 - 20:00",
    left: 3,
    emoji: "🥐",
    tone: "warm",
  },
  {
    shop: "Café An Nhiên",
    name: "Box Đồ Uống & Bánh",
    oldP: "100.000đ",
    newP: "60.000đ",
    discount: 40,
    time: "17:00 - 20:00",
    left: 2,
    emoji: "☕",
    tone: "cream",
  },
  {
    shop: "Tiệm Bánh Mây",
    name: "Box Bánh Mặn",
    oldP: "150.000đ",
    newP: "60.000đ",
    discount: 60,
    time: "19:00 - 20:30",
    left: 5,
    emoji: "🥖",
    tone: "warm",
  },
  {
    shop: "Brew House Café",
    name: "Box Pastry Mix",
    oldP: "160.000đ",
    newP: "58.000đ",
    discount: 70,
    time: "18:00 - 21:00",
    left: 1,
    emoji: "🧁",
    tone: "cream",
  },
];

export default function HomePage() {
  return (
    <>
      <SiteHeader />

      {/* HERO */}
      <section
        className="hero-section"
        style={{
          backgroundColor: "var(--cream)",
          backgroundImage: "url('/low-opacity-cumpled-paper.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          overflow: "hidden",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          className="container hero-grid"
          style={{
            gap: 64,
            paddingTop: 73 + 64,
            paddingBottom: 64,
            alignItems: "center",
            width: "100%",
          }}
        >
          <div style={{ minWidth: 0 }}>
            <div
              className="rise rise-1"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 14px",
                background: "white",
                borderRadius: 999,
                border: "1px solid var(--border)",
                fontSize: 12,
                fontWeight: 600,
                color: "var(--primary)",
                marginBottom: 24,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: "var(--accent)",
                }}
              />
              Đang giải cứu 412 box hôm nay
            </div>
            <h1
              className="rise rise-2 hero-title"
              style={{
                fontSize: 64,
                lineHeight: 1.05,
                marginBottom: 24,
                fontWeight: 700,
              }}
            >
              Cứu{" "}
              <em
                style={{
                  color: "var(--primary)",
                  fontStyle: "italic",
                  fontWeight: 800,
                }}
              >
                bánh ngon
              </em>
              <br />
              cuối ngày, săn
              <br />
              deal hời mỗi tối.
            </h1>
            <p
              className="rise rise-3"
              style={{
                fontSize: 17,
                lineHeight: 1.6,
                color: "var(--text-muted)",
                marginBottom: 32,
                maxWidth: 520,
              }}
            >
              Bánh, đồ uống & đồ ăn cuối ngày từ các tiệm bánh, quán cà phê yêu
              thích của bạn — giá siêu hời, giảm lãng phí thực phẩm.
            </p>

            {/* CTA buttons */}
            <div
              className="rise rise-3"
              style={{
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
                marginBottom: 24,
              }}
            >
              <Link href="/discover" className="btn btn-primary btn-lg">
                Khám phá Box ngay →
              </Link>
              <Link href="/about" className="btn btn-ghost btn-lg">
                Tìm hiểu thêm
              </Link>
            </div>

            {/* Marquee tags */}
            <div
              className="rise rise-4 tag-strip"
              style={{ marginTop: 16, width: "100%", overflow: "hidden" }}
            >
              <div className="marquee-wrap">
                <div className="marquee-track">
                  {[
                    { icon: "🍞", text: "Giảm tới 70%", accent: "primary" },
                    { icon: "🔒", text: "Thanh toán an toàn", accent: "accent" },
                    { icon: "📦", text: "Đa dạng hàng quán", accent: null },
                    { icon: "🎁", text: "125k+ Box đã cứu", accent: "primary" },
                    { icon: "🏪", text: "2.850 Đối tác", accent: null },
                    { icon: "🌿", text: "Hôm nay +312 kg cứu khỏi rác", accent: "accent" },
                    { icon: "🍞", text: "Giảm tới 70%", accent: "primary" },
                    { icon: "🔒", text: "Thanh toán an toàn", accent: "accent" },
                    { icon: "📦", text: "Đa dạng hàng quán", accent: null },
                    { icon: "🎁", text: "125k+ Box đã cứu", accent: "primary" },
                    { icon: "🏪", text: "2.850 Đối tác", accent: null },
                    { icon: "🌿", text: "Hôm nay +312 kg cứu khỏi rác", accent: "accent" },
                  ].map((tag, i) => (
                    <span
                      key={i}
                      className="tag"
                      style={{ marginRight: 12, flexShrink: 0 }}
                    >
                      {tag.icon}{" "}
                      <strong
                        style={{
                          color:
                            tag.accent === "primary"
                              ? "var(--primary)"
                              : tag.accent === "accent"
                                ? "var(--accent)"
                                : "inherit",
                        }}
                      >
                        {tag.text}
                      </strong>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Hero image */}
          <div
            className="rise-right rise-img hero-img-col"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="/box-cake.png"
              alt="Surprise Box"
              style={{
                width: "110%",
                maxWidth: 720,
                height: "auto",
                objectFit: "contain",
                filter: "drop-shadow(0 24px 48px rgba(232,119,34,0.22))",
                marginLeft: "-10%",
              }}
            />
          </div>
        </div>

        <ScrollArrow />
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how"
        style={{ padding: "96px 0", background: "var(--ivory)" }}
      >
        <div className="container">
          <div data-reveal style={{ textAlign: "center", marginBottom: 56 }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "var(--primary)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Đơn giản — 4 bước
            </div>
            <h2 style={{ fontSize: 44 }}>Cách hoạt động</h2>
          </div>

          <div className="steps-grid" style={{ gap: 20 }}>
            {[
              {
                icon: "🔍",
                n: 1,
                title: "Tìm box",
                desc: "Khám phá các Surprise Box gần bạn với nhiều mức giảm hấp dẫn",
              },
              {
                icon: "📅",
                n: 2,
                title: "Đặt trước",
                desc: "Chọn thời gian nhận hàng và thanh toán dễ dàng",
              },
              {
                icon: "🛍️",
                n: 3,
                title: "Nhận hàng",
                desc: "Đến tiệm hoặc nhận giao tận nơi nhanh chóng",
              },
              {
                icon: "♻️",
                n: 4,
                title: "Giảm lãng phí",
                desc: "Cùng cộng đồng giải cứu thực phẩm mỗi ngày",
              },
            ].map((s, i) => (
              <div
                key={i}
                className="card-hover"
                data-reveal
                data-reveal-delay={String(i + 1)}
                style={{
                  background: "white",
                  padding: "32px 24px",
                  borderRadius: 20,
                  border: "1px solid var(--border)",
                  textAlign: "center",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: -16,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 32,
                    height: 32,
                    borderRadius: 999,
                    background: "var(--primary)",
                    color: "white",
                    display: "grid",
                    placeItems: "center",
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: 14,
                  }}
                >
                  {s.n}
                </div>
                <div
                  style={{
                    width: 72,
                    height: 72,
                    margin: "16px auto 20px",
                    borderRadius: 24,
                    background: "var(--cream)",
                    display: "grid",
                    placeItems: "center",
                    fontSize: 32,
                  }}
                >
                  {s.icon}
                </div>
                <h3 style={{ fontSize: 22, marginBottom: 10 }}>{s.title}</h3>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--text-muted)",
                    lineHeight: 1.6,
                  }}
                >
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED BOXES */}
      <section style={{ padding: "80px 0", background: "white" }}>
        <div className="container">
          <div
            data-reveal
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: 32,
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "var(--primary)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                Hôm nay
              </div>
              <h2 style={{ fontSize: 40 }}>
                Surprise Box nổi bật
                <br />
                gần bạn
              </h2>
            </div>
            <Link
              href="/discover"
              style={{
                color: "var(--primary)",
                fontWeight: 700,
                fontSize: 14,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              Xem tất cả →
            </Link>
          </div>

          <div className="boxes-grid" style={{ gap: 20 }}>
            {featuredBoxes.map((b, i) => (
              <Link
                key={i}
                href={`/box/${i + 1}`}
                className="card-hover card-hover-warm"
                data-reveal
                data-reveal-delay={String(i + 1)}
                style={{
                  background: "white",
                  borderRadius: 20,
                  border: "1px solid var(--border)",
                  overflow: "hidden",
                  display: "block",
                }}
              >
                <div
                  style={{
                    background:
                      b.tone === "warm"
                        ? "linear-gradient(135deg, #fde6d4 0%, #f5d4b3 100%)"
                        : "linear-gradient(135deg, #fdf5e6 0%, #e8dcc6 100%)",
                    padding: 16,
                    height: 180,
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", gap: 6 }}>
                    <span className="badge badge-primary">−{b.discount}%</span>
                    {b.left <= 2 && (
                      <span className="badge badge-warm">🔥 Sắp hết</span>
                    )}
                  </div>
                  <div
                    style={{
                      fontSize: 72,
                      textAlign: "center",
                      filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.08))",
                    }}
                  >
                    {b.emoji}
                  </div>
                  <button
                    style={{
                      position: "absolute",
                      top: 14,
                      right: 14,
                      width: 32,
                      height: 32,
                      borderRadius: 999,
                      background: "rgba(255,255,255,0.9)",
                      display: "grid",
                      placeItems: "center",
                      fontSize: 16,
                    }}
                  >
                    ♡
                  </button>
                </div>
                <div style={{ padding: 18 }}>
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      fontWeight: 600,
                      marginBottom: 4,
                    }}
                  >
                    {b.shop}
                  </div>
                  <h3
                    style={{ fontSize: 17, marginBottom: 12, lineHeight: 1.3 }}
                  >
                    {b.name}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 8,
                      marginBottom: 10,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 12,
                        color: "var(--text-muted)",
                        textDecoration: "line-through",
                      }}
                    >
                      {b.oldP}
                    </span>
                    <span
                      style={{
                        fontSize: 22,
                        fontWeight: 800,
                        color: "var(--primary)",
                        fontFamily: "var(--font-display)",
                      }}
                    >
                      {b.newP}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--text-muted)",
                      display: "flex",
                      flexDirection: "column",
                      gap: 4,
                    }}
                  >
                    <span>🕒 {b.time}</span>
                    <span style={{ color: "var(--accent)", fontWeight: 600 }}>
                      📦 Còn {b.left} box
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNITY IMPACT */}
      <section
        style={{
          padding: "96px 0",
          background: "var(--cream)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="container">
          <div data-reveal style={{ textAlign: "center", marginBottom: 56 }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "var(--accent)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Cùng nhau làm điều tốt
            </div>
            <h2 style={{ fontSize: 44, marginBottom: 12 }}>
              Tác động cộng đồng
            </h2>
            <p
              style={{
                fontSize: 16,
                color: "var(--text-muted)",
                maxWidth: 520,
                margin: "0 auto",
              }}
            >
              Cùng Still Good và cộng đồng giải cứu thực phẩm mỗi ngày — từng
              box nhỏ, tác động lớn.
            </p>
          </div>

          <div className="impact-grid" style={{ gap: 24 }}>
            {[
              {
                icon: "🌿",
                num: "125.430",
                label: "Box đã được cứu",
                sub: "Cập nhật hôm nay",
                color: "var(--accent)",
              },
              {
                icon: "💧",
                num: "312,6 tấn",
                label: "Thực phẩm giảm lãng phí",
                sub: "Tương đương 850 hộ gia đình",
                color: "var(--primary)",
              },
              {
                icon: "🏪",
                num: "2.850+",
                label: "Cửa hàng đồng hành",
                sub: "Trên 18 tỉnh thành",
                color: "var(--text)",
              },
            ].map((s, i) => (
              <div
                key={i}
                className="card-hover"
                data-reveal
                data-reveal-delay={String(i + 1)}
                style={{
                  background: "white",
                  padding: "36px 32px",
                  borderRadius: 24,
                  textAlign: "center",
                  border: "1px solid var(--border)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: -20,
                    right: -20,
                    fontSize: 120,
                    opacity: 0.05,
                  }}
                >
                  {s.icon}
                </div>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    margin: "0 auto 20px",
                    borderRadius: 16,
                    background:
                      i === 0
                        ? "var(--accent-soft)"
                        : i === 1
                          ? "var(--primary-soft)"
                          : "var(--cream)",
                    display: "grid",
                    placeItems: "center",
                    fontSize: 26,
                  }}
                >
                  {s.icon}
                </div>
                <div
                  style={{
                    fontSize: 40,
                    fontWeight: 800,
                    fontFamily: "var(--font-display)",
                    color: s.color,
                    marginBottom: 8,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {s.num}
                </div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: "var(--text)",
                    marginBottom: 4,
                  }}
                >
                  {s.label}
                </div>
                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                  {s.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNER CTA */}
      <section style={{ padding: "80px 0", background: "white" }}>
        <div className="container">
          <div
            data-reveal
            className="partner-cta-grid"
            style={{
              background:
                "linear-gradient(120deg, var(--badge) 0%, #f7d27a 100%)",
              borderRadius: 28,
              padding: "48px 56px",
              gap: 32,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -40,
                right: 120,
                fontSize: 200,
                opacity: 0.15,
                transform: "rotate(-15deg)",
              }}
            >
              🏪
            </div>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                Dành cho đối tác
              </div>
              <h2 style={{ fontSize: 36, marginBottom: 12, lineHeight: 1.15 }}>
                Bạn là chủ tiệm bánh
                <br />
                hoặc quán cà phê?
              </h2>
              <p
                style={{
                  fontSize: 15,
                  color: "var(--text)",
                  maxWidth: 560,
                  lineHeight: 1.6,
                }}
              >
                Tham gia Still Good để tăng doanh thu và cùng chúng tôi giảm
                lãng phí thực phẩm mỗi ngày — không phí khởi tạo, không ràng
                buộc.
              </p>
            </div>
            <PartnerCTAButton />
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
