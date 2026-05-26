import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const coreValues = [
  {
    emoji: "🤝",
    title: "We Win Together",
    subtitle: "Hệ sinh thái cùng thắng",
    desc: "Tối ưu lợi ích tổng thể thay vì lợi nhuận cá nhân — giúp chủ tiệm thu hồi vốn, khách tiết kiệm, môi trường giảm rác.",
    bg: "white",
    border: "var(--border)",
    labelColor: "var(--primary)",
    labelBg: "#fef3e8",
  },
  {
    emoji: "✨",
    title: "We Keep It Simple",
    subtitle: "Tối giản vận hành",
    desc: "Công nghệ tinh gọn, mô hình tự đến nhận (Self-pickup) triệt tiêu hoàn toàn chi phí logistics và rủi ro bom hàng.",
    bg: "#fdfaf6",
    border: "var(--border)",
    labelColor: "#784d2e",
    labelBg: "#fef3e8",
  },
  {
    emoji: "🏆",
    title: "We Raise The Bar",
    subtitle: "Không ngừng nâng chuẩn",
    desc: "Mỗi Surprise Box trao đi phải đảm bảo tuyệt đối an toàn vệ sinh và trọn vẹn vị ngon — không thỏa hiệp.",
    bg: "#eef6ef",
    border: "#c8e0ca",
    labelColor: "#2d6a31",
    labelBg: "#d4edda",
  },
  {
    emoji: "💚",
    title: "We Care",
    subtitle: "Lan tỏa sự tử tế",
    desc: "Thấu hiểu từng khoản tổn thất của chủ tiệm và áp lực chi tiêu của người trẻ. Tiêu dùng có trách nhiệm bắt đầu từ sự thấu cảm.",
    bg: "linear-gradient(135deg, #fdf5e6 0%, #fde6d4 100%)",
    border: "#e8cdb0",
    labelColor: "var(--primary)",
    labelBg: "var(--badge)",
  },
  {
    emoji: "🌱",
    title: "We Build a Legacy",
    subtitle: "Kiến tạo tương lai xanh",
    desc: "CrumbUp đồng hành cùng lộ trình đưa Đà Nẵng trở thành đô thị sinh thái không rác thải thực phẩm.",
    bg: "white",
    border: "var(--border)",
    labelColor: "#2d6a31",
    labelBg: "#d4edda",
  },
];

const esgPillars = [
  {
    emoji: "🌍",
    initial: "E",
    title: "Môi trường",
    desc: "Mục tiêu giải cứu hơn 15.000 phần bánh dôi dư mỗi năm, cắt giảm rác thải hữu cơ và khí nhà kính phát sinh từ quá trình phân hủy thực phẩm tại đô thị.",
    color: "var(--accent)",
    bg: "#eef6ef",
  },
  {
    emoji: "🤲",
    initial: "S",
    title: "Xã hội",
    desc: "Giúp người trẻ tiết kiệm 50–70% chi phí thực phẩm, đồng thời hỗ trợ các tiệm bánh địa phương thu hồi chi phí biến đổi biên để tái đầu tư.",
    color: "var(--primary)",
    bg: "white",
  },
  {
    emoji: "🔒",
    initial: "G",
    title: "Quản trị",
    desc: "Thanh toán trước 100% bảo vệ quyền lợi đối tác, số hóa dữ liệu thời gian thực, và bộ quy chuẩn kiểm định chất lượng bánh giờ chót nghiêm ngặt.",
    color: "#b8960a",
    bg: "#fef9e7",
  },
];

const faqs = [
  {
    q: "Surprise Box là gì, có biết trước món không?",
    a: "Là hộp 'bí ẩn' gồm sản phẩm cuối ngày do cửa hàng tự chọn. Bạn không biết chính xác nhưng giá trị luôn cao hơn số tiền trả 2–3 lần.",
  },
  {
    q: "Hình thức tự đến lấy hoạt động như nào?",
    a: "Sau khi cửa hàng xác nhận chuyển khoản, bạn nhận mã đơn hàng riêng. Đến trong khung giờ đã đặt, xuất trình mã cho nhân viên — xong!",
  },
  {
    q: "Tôi có thể hủy đơn sau khi đã thanh toán không?",
    a: "Có thể hủy miễn phí trước khung giờ nhận ít nhất 2 tiếng. Sau thời điểm đó, đơn không thể hủy vì cửa hàng đã chuẩn bị Box.",
  },
  {
    q: "Cửa hàng hết box hoặc sản phẩm không đạt chất lượng?",
    a: "Bạn được hoàn 100% tiền hoặc đổi box tương đương. Với lỗi chất lượng, phản ánh kèm ảnh trong 24h để được hỗ trợ.",
  },
  {
    q: "CrumbUp có an toàn thực phẩm không?",
    a: "Có. Tất cả sản phẩm đều mới làm trong ngày, chưa bán hết trước giờ đóng cửa. Cửa hàng có nghĩa vụ kiểm tra chất lượng trước khi đóng Box.",
  },
];

const sectionStyle: React.CSSProperties = { scrollMarginTop: 100 };

export default function AboutPage() {
  return (
    <>
      <SiteHeader />

      {/* HERO */}
      <section style={{
        backgroundColor: "var(--cream)",
        backgroundImage: "url('/low-opacity-cumpled-paper.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        paddingTop: 169,
        paddingBottom: 96,
        position: "relative",
        overflow: "hidden",
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
      }}>
        {/* Floating stickers */}
        <div style={{ position: "absolute", top: 130, left: "6%", fontSize: 60, opacity: 0.15, transform: "rotate(-12deg)", userSelect: "none" }}>🥐</div>
        <div style={{ position: "absolute", top: 200, right: "6%", fontSize: 52, opacity: 0.13, transform: "rotate(10deg)", userSelect: "none" }}>🌿</div>
        <div style={{ position: "absolute", bottom: 48, left: "18%", fontSize: 44, opacity: 0.11, transform: "rotate(5deg)", userSelect: "none" }}>🧁</div>

        <div className="container" style={{ position: "relative", textAlign: "center", maxWidth: 860, width: "100%" }}>
          <div className="rise rise-1" style={{ fontSize: 12, fontWeight: 700, color: "var(--primary)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 20 }}>
            Câu chuyện của chúng tôi
          </div>
          <h1 className="rise rise-2 about-hero-title" style={{ fontSize: 60, marginBottom: 28, lineHeight: 1.1 }}>
            Save Every Crumb,<br />Share Every Value
          </h1>
          <p className="rise rise-3" style={{ fontSize: 17, color: "var(--text-muted)", lineHeight: 1.8, maxWidth: 620, margin: "0 auto" }}>
            "Một mẩu bánh vụn không làm nên bữa ăn, nhưng triệu cánh tay gom nhặt sẽ thay đổi cả một số phận."
          </p>
        </div>
      </section>

      {/* GIỚI THIỆU + MISSION / VISION */}
      <section id="about" style={{ ...sectionStyle, padding: "96px 0", background: "white" }}>
        <div className="container">
          <div data-reveal style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--primary)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
              Our Identity
            </div>
            <h2 style={{ fontSize: 44, marginBottom: 16 }}>Giới thiệu chung</h2>
            <p style={{ fontSize: 16, color: "var(--text-muted)", maxWidth: 680, margin: "0 auto", lineHeight: 1.8 }}>
              CrumbUp là nền tảng công nghệ tác động xã hội tiên phong tại miền Trung Việt Nam, kết nối tiệm bánh với người tiêu dùng để giải cứu thực phẩm cuối ngày — biến lãng phí thành giá trị.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            {/* Mission */}
            <div data-reveal className="card-hover" style={{
              background: "linear-gradient(135deg, #fef8f2 0%, #fdeede 100%)",
              borderRadius: 28,
              padding: "48px 44px",
              position: "relative",
              overflow: "hidden",
            }}>
              <div style={{ position: "absolute", bottom: -12, right: 8, fontSize: 96, opacity: 0.1, lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>🎯</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--primary)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 14 }}>Sứ mệnh</div>
              <h3 style={{ fontSize: 30, marginBottom: 16, lineHeight: 1.2 }}>Our Mission</h3>
              <p style={{ fontSize: 15, color: "var(--text)", lineHeight: 1.8, position: "relative" }}>
                Giải pháp công nghệ tinh gọn giúp đối tác F&B tối ưu nguồn cung dôi dư giờ chót, đồng thời giúp người trẻ tiếp cận thực phẩm chất lượng với chi phí tiết kiệm.
              </p>
            </div>

            {/* Vision */}
            <div data-reveal className="card-hover" style={{
              background: "linear-gradient(135deg, #f4fbf4 0%, #dff0dd 100%)",
              borderRadius: 28,
              padding: "48px 44px",
              position: "relative",
              overflow: "hidden",
            }}>
              <div style={{ position: "absolute", bottom: -12, right: 8, fontSize: 96, opacity: 0.1, lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>🌱</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#2d6a31", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 14 }}>Tầm nhìn</div>
              <h3 style={{ fontSize: 30, marginBottom: 16, lineHeight: 1.2 }}>Our Vision</h3>
              <p style={{ fontSize: 15, color: "var(--text)", lineHeight: 1.8, position: "relative" }}>
                Trở thành hệ sinh thái giải cứu thực phẩm dẫn dắt thị trường, định hình lối sống xanh và tiêu dùng có trách nhiệm tại các đô thị thông minh Việt Nam.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GIÁ TRỊ CỐT LÕI */}
      <section id="values" style={{ ...sectionStyle, padding: "96px 0", background: "var(--ivory)", backgroundImage: "url('/low-opacity-cumpled-paper.png')", backgroundSize: "cover" }}>
        <div className="container">
          <div data-reveal style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--primary)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
              Our Core Values
            </div>
            <h2 style={{ fontSize: 44 }}>Năm giá trị cốt lõi</h2>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 20 }}>
            {coreValues.map((v, i) => (
              <div key={v.title} className="card-hover" data-reveal data-reveal-delay={String(Math.min(i + 1, 4))} style={{ width: "calc(33.333% - 14px)", minWidth: 260,
                background: v.bg,
                borderRadius: 24,
                padding: "32px 28px",
                border: `1px solid ${v.border}`,
                position: "relative",
                overflow: "hidden",
              }}>
                {/* Background sticker */}
                <div style={{ position: "absolute", bottom: -8, right: 12, fontSize: 68, opacity: 0.12, lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>
                  {v.emoji}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                  <span style={{ fontSize: 26, lineHeight: 1 }}>{v.emoji}</span>
                  <span style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
                    color: v.labelColor, background: v.labelBg, padding: "3px 9px", borderRadius: 999,
                  }}>{v.subtitle}</span>
                </div>
                <h3 style={{ fontSize: 18, marginBottom: 10, fontWeight: 700, color: "var(--text)", position: "relative" }}>{v.title}</h3>
                <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.75, position: "relative" }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LỊCH SỬ */}
      <section id="history" style={{ ...sectionStyle, padding: "96px 0", background: "white" }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <div data-reveal style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--primary)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
              Our History
            </div>
            <h2 style={{ fontSize: 44 }}>Hành trình CrumbUp</h2>
          </div>

          <div data-reveal style={{ fontSize: 17, color: "var(--text)", lineHeight: 1.9 }}>
            <p style={{ marginBottom: 24 }}>
              <strong>CrumbUp được thành lập vào năm 2026 tại Đà Nẵng</strong> với một sứ mệnh duy nhất: Chống lãng phí thực phẩm.
            </p>
            <p style={{ marginBottom: 24 }}>
              Dự án bắt nguồn từ việc chúng tôi chứng kiến một <em>nghịch lý diễn ra hằng ngày</em> tại các đô thị lớn:
            </p>
            <ul style={{ marginBottom: 24, paddingLeft: 28, listStyleType: "disc" }}>
              <li style={{ marginBottom: 16 }}>Hàng tấn bánh tươi đạt chuẩn buộc phải hủy bỏ vào cuối ngày</li>
              <li style={{ marginBottom: 16 }}>Hàng ngàn sinh viên và người trẻ phải thắt chặt chi tiêu từng bữa ăn</li>
              <li>Các tiệm bánh địa phương mất lợi nhuận từ chi phí vận hành không hồi đáp</li>
            </ul>
            <p>
              Từ <strong>sự tương tác giữa ba vấn đề này</strong>, CrumbUp ra đời không chỉ là một ứng dụng thương mại, mà là một nền tảng công nghệ tác động xã hội, kết nối lợi ích kinh tế với giá trị nhân văn và bảo vệ môi trường.
            </p>
          </div>
        </div>
      </section>

      {/* ESG */}
      <section id="esg" style={{ ...sectionStyle, padding: "96px 0", background: "var(--ivory)", backgroundImage: "url('/low-opacity-cumpled-paper.png')", backgroundSize: "cover" }}>
        <div className="container">
          <div data-reveal style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--primary)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
              Tiêu chuẩn ESG
            </div>
            <h2 style={{ fontSize: 44 }}>Cam kết bền vững</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {esgPillars.map((pillar, i) => (
              <div key={pillar.initial} className="card-hover" data-reveal data-reveal-delay={String(i + 1)} style={{
                background: pillar.bg,
                borderRadius: 24,
                padding: "40px 32px",
                border: "1px solid var(--border)",
                position: "relative",
                overflow: "hidden",
              }}>
                {/* Background sticker */}
                <div style={{ position: "absolute", bottom: -8, right: 10, fontSize: 72, opacity: 0.1, lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>
                  {pillar.emoji}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 14,
                    background: pillar.color, color: "white",
                    display: "grid", placeItems: "center",
                    fontSize: 22, fontWeight: 900,
                    flexShrink: 0,
                  }}>{pillar.initial}</div>
                  <span style={{ fontSize: 20 }}>{pillar.emoji}</span>
                </div>
                <h3 style={{ fontSize: 18, marginBottom: 12, fontWeight: 700, position: "relative" }}>{pillar.title}</h3>
                <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.75, position: "relative" }}>{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MÔ HÌNH KINH DOANH */}
      <section id="business" style={{ ...sectionStyle, padding: "96px 0", background: "white" }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <div data-reveal style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--primary)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
              Business Model
            </div>
            <h2 style={{ fontSize: 44, marginBottom: 10 }}>Mô hình Win — Win — Win</h2>
            <p style={{ fontSize: 15, color: "var(--text-muted)" }}>Vì con người, lợi nhuận và hành tinh</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 28 }}>
            {[
              { emoji: "🏪", who: "Tiệm bánh", win: "Tối ưu doanh thu từ hàng hao hụt giờ chót, không còn lỗ kép.", color: "white", border: "var(--border)" },
              { emoji: "🧑‍🎓", who: "Khách hàng", win: "Thực phẩm chất lượng cao, giá giảm 50–70%, giao dịch minh bạch.", color: "var(--accent-soft)", border: "#e8d4b8" },
              { emoji: "🌿", who: "Môi trường", win: "Mỗi box giải cứu là một bước nhỏ giảm rác thải hữu cơ và khí nhà kính.", color: "#eef6ef", border: "#c8e0ca" },
            ].map((item, i) => (
              <div key={i} className="card-hover" data-reveal data-reveal-delay={String(i + 1)} style={{
                background: item.color,
                borderRadius: 20,
                padding: "28px 24px",
                border: `1px solid ${item.border}`,
                textAlign: "center",
              }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>{item.emoji}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>{item.who}</div>
                <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.7 }}>{item.win}</p>
              </div>
            ))}
          </div>

          <div data-reveal style={{
            borderLeft: "4px solid var(--accent)",
            paddingLeft: 24,
            padding: "24px 28px",
            background: "var(--ivory)",
            borderRadius: "0 16px 16px 0",
          }}>
            <p style={{ fontSize: 15, color: "var(--text)", lineHeight: 1.8, marginBottom: 8 }}>
              <strong>Giảm thiểu rác thải thực phẩm</strong> là hành động thiết thực nhất để đẩy lùi khủng hoảng khí hậu — góp phần vào mục tiêu giới hạn nhiệt độ Trái Đất dưới 2°C vào 2100.
            </p>
            <p style={{ fontSize: 13, color: "var(--text-muted)", fontStyle: "italic" }}>— Theo Project Drawdown</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ ...sectionStyle, padding: "96px 0", backgroundColor: "var(--ivory)", backgroundImage: "url('/low-opacity-cumpled-paper.png')", backgroundSize: "cover" }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <div data-reveal style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--primary)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>FAQ</div>
            <h2 style={{ fontSize: 44 }}>Câu hỏi thường gặp</h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {faqs.map((f, i) => (
              <details key={i} className="card-hover" data-reveal data-reveal-delay={String(Math.min(i + 1, 4))} style={{
                background: "white",
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
                  <span style={{ flex: 1 }}>{f.q}</span>
                  <span style={{ color: "var(--text-muted)", fontSize: 20, lineHeight: 1 }}>+</span>
                </summary>
                <div style={{ padding: "0 24px 20px 68px", fontSize: 14, color: "var(--text-muted)", lineHeight: 1.8 }}>{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "72px 0 96px", background: "white" }}>
        <div className="container">
          <div data-reveal style={{
            background: "var(--text)",
            borderRadius: 28,
            padding: "64px 48px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: -10, left: "5%", fontSize: 80, opacity: 0.07, transform: "rotate(-15deg)", userSelect: "none" }}>🥐</div>
            <div style={{ position: "absolute", bottom: -10, right: "5%", fontSize: 80, opacity: 0.07, transform: "rotate(12deg)", userSelect: "none" }}>🌿</div>

            <div style={{ position: "relative" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--accent)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>
                Bắt đầu ngay hôm nay
              </div>
              <h2 style={{ color: "white", fontSize: 44, marginBottom: 16, lineHeight: 1.15 }}>
                Sẵn sàng cứu chiếc bánh đầu tiên?
              </h2>
              <p style={{ fontSize: 16, color: "rgba(253,245,230,0.75)", maxWidth: 440, margin: "0 auto 28px", lineHeight: 1.7 }}>
                Tham gia cộng đồng CrumbUp đang ăn ngon, tiết kiệm và sống xanh mỗi ngày.
              </p>
              <a href="/discover" className="btn btn-primary btn-lg">Khám phá Box ngay →</a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
