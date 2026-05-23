import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const values = [
  { ic: "💰", title: "Tiết kiệm", desc: "Mang lại giá trị kinh tế tối ưu cho cả người mua và người bán.", color: "var(--badge)" },
  { ic: "🔍", title: "Minh bạch", desc: "Rõ ràng trong chính sách chất lượng và quy trình vận hành.", color: "var(--primary)" },
  { ic: "🌱", title: "Bền vững", desc: "Lấy việc giảm rác thải thực phẩm và bảo vệ môi trường làm kim chỉ nam.", color: "var(--accent)" },
  { ic: "⚡", title: "Tiện lợi", desc: "Trải nghiệm đặt hàng, nhận hàng nhanh chóng qua vài lượt chạm.", color: "var(--text)" },
];

const quality = [
  { n: "01", t: "100% sản phẩm trong ngày", d: "Hàng mới được sản xuất và sử dụng trong ngày, tuyệt đối không dùng bánh cũ qua ngày." },
  { n: "02", t: "Tiêu chuẩn ATTP nghiêm ngặt", d: "Yêu cầu khắt khe về an toàn vệ sinh thực phẩm từ khâu đóng gói tại tiệm đến tay shipper / khách hàng." },
  { n: "03", t: "Đền bù thỏa đáng", d: "Sẵn sàng lắng nghe và xử lý đền bù thỏa đáng nếu sản phẩm phát sinh lỗi chất lượng từ phía cửa hàng." },
];

const faqs = [
  { q: "Surprise Box là gì, có biết trước món không?", a: "Surprise Box là hộp \"bí ẩn\" gồm các sản phẩm cuối ngày được cửa hàng tự chọn (bánh, đồ uống, đồ ăn nhẹ...). Bạn sẽ không biết chính xác món gì cho đến khi nhận, nhưng giá trị luôn cao hơn số tiền bạn trả 2–3 lần." },
  { q: "Tôi hoàn tiền thế nào, ai giải quyết khi có vấn đề?", a: "Hoàn tiền tự động vào tài khoản trong 3–5 ngày làm việc nếu cửa hàng hết box hoặc lỗi từ phía họ. Đội ngũ Still Good sẽ trực tiếp xử lý — bạn không cần làm việc với cửa hàng." },
  { q: "Hình thức tự đến lấy hoạt động như nào?", a: "Sau khi thanh toán, bạn nhận mã QR riêng. Đến cửa hàng trong khung giờ đã đặt, đưa QR cho nhân viên quét — xong! Xem chi tiết trong trang Giao hàng & Nhận hàng." },
  { q: "Nếu đến cửa hàng hết box, hoặc sản phẩm không đúng chất lượng?", a: "Trong trường hợp hiếm gặp này, bạn được hoàn 100% tiền hoặc đổi box tương đương. Đối với lỗi chất lượng, vui lòng phản ánh kèm hình ảnh trong 24h để được hỗ trợ." },
  { q: "Tôi có thể hủy đơn hàng sau khi đã thanh toán không?", a: "Bạn có thể hủy đơn miễn phí trước khung giờ nhận ít nhất 2 tiếng. Sau thời điểm đó, đơn không thể hủy để đảm bảo cửa hàng đã chuẩn bị Box." },
  { q: "Still Good có an toàn thực phẩm không khi là hàng cuối ngày?", a: "Có. Tất cả sản phẩm đều là hàng mới làm trong ngày, chỉ là chưa bán hết trước giờ đóng cửa. Cửa hàng có nghĩa vụ kiểm tra chất lượng trước khi đóng Box." },
];

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
        paddingBottom: 80,
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}>
        <div className="container" style={{ position: "relative", textAlign: "center", maxWidth: 800, width: "100%" }}>
          <div className="rise rise-1" style={{ fontSize: 12, fontWeight: 700, color: "var(--primary)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>
            Câu chuyện của chúng tôi
          </div>
          <h1 className="rise rise-2 about-hero-title" style={{ fontSize: 72, marginBottom: 24, lineHeight: 1.05 }}>
            Mỗi <em style={{ color: "var(--primary)", fontStyle: "italic", fontWeight: 800 }}>chiếc bánh</em><br />
            đều xứng đáng có người thưởng thức.
          </h1>
          <p className="rise rise-3" style={{ fontSize: 18, color: "var(--text-muted)", lineHeight: 1.6, maxWidth: 620, margin: "0 auto" }}>
            Still Good ra đời từ một câu hỏi nhỏ: "Tại sao mỗi tối, bao nhiêu bánh ngon phải bị bỏ đi
            chỉ vì hết giờ bán?" Chúng tôi tin rằng có cách tốt hơn — và đó là lý do bạn đang ở đây.
          </p>
        </div>
      </section>

      {/* MISSION + VISION */}
      <section style={{ padding: "96px 0", background: "white" }}>
        <div className="container">
          <div className="mission-grid" style={{ gap: 32 }}>
            <div className="card-hover" data-reveal data-reveal-delay="1" style={{
              background: "linear-gradient(135deg, var(--primary-soft) 0%, #f9e0c4 100%)",
              borderRadius: 28,
              padding: "44px 40px",
              position: "relative",
              overflow: "hidden",
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--primary)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>
                Sứ mệnh
              </div>
              <h2 style={{ fontSize: 32, marginBottom: 16, lineHeight: 1.2 }}>
                Kết nối — Tiết kiệm — Giảm lãng phí
              </h2>
              <p style={{ fontSize: 15, color: "var(--text)", lineHeight: 1.7, position: "relative" }}>
                Kết nối người dùng với các cửa hàng địa phương thông qua Surprise Box giá ưu đãi,
                giúp mọi người ăn ngon hơn, tiết kiệm hơn và góp phần giảm lãng phí thực phẩm.
              </p>
            </div>

            <div className="card-hover" data-reveal data-reveal-delay="2" style={{
              background: "linear-gradient(135deg, var(--accent-soft) 0%, #c5dcbf 100%)",
              borderRadius: 28,
              padding: "44px 40px",
              position: "relative",
              overflow: "hidden",
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--accent)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>
                Tầm nhìn
              </div>
              <h2 style={{ fontSize: 32, marginBottom: 16, lineHeight: 1.2 }}>
                Nền tảng giải cứu thực phẩm số một Việt Nam
              </h2>
              <p style={{ fontSize: 15, color: "var(--text)", lineHeight: 1.7, position: "relative" }}>
                Trở thành nền tảng tiên phong và hàng đầu tại Việt Nam trong lĩnh vực giải cứu thực phẩm
                qua mô hình Surprise Box, lan tỏa lối sống xanh và tiêu dùng có trách nhiệm.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section id="impact" style={{ padding: "96px 0", backgroundColor: "var(--ivory)", backgroundImage: "url('/low-opacity-cumpled-paper.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="container">
          <div data-reveal style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--primary)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
              Giá trị cốt lõi
            </div>
            <h2 style={{ fontSize: 44 }}>Bốn điều chúng tôi cam kết</h2>
          </div>

          <div className="values-grid" style={{ gap: 16 }}>
            {values.map((v, i) => (
              <div key={v.title} className="card-hover" data-reveal data-reveal-delay={String(i + 1)} style={{
                background: "white",
                borderRadius: 20,
                padding: "32px 24px",
                border: "1px solid var(--border)",
                borderTop: `3px solid ${v.color}`,
              }}>
                <h3 style={{ fontSize: 20, marginBottom: 10 }}>{v.title}</h3>
                <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUALITY POLICY */}
      <section style={{ padding: "96px 0", background: "white" }}>
        <div className="container">
          <div className="quality-grid" style={{ gap: 56 }}>
            <div data-reveal>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--accent)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 14 }}>
                Chính sách chất lượng
              </div>
              <h2 style={{ fontSize: 40, marginBottom: 20, lineHeight: 1.15 }}>
                Hàng cuối ngày — chứ không phải hàng cũ.
              </h2>
              <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.7 }}>
                Đây là lằn ranh quan trọng nhất với chúng tôi. Surprise Box giải cứu thực phẩm
                <em style={{ fontStyle: "italic", color: "var(--text)" }}> trước khi nó trở thành rác</em> —
                chứ không phải sau đó. Dưới đây là 3 cam kết không thoả hiệp.
              </p>
            </div>

            <div data-reveal data-reveal-delay="2" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {quality.map((q, i) => (
                <div key={q.n} className="card-hover" data-reveal data-reveal-delay={String(i + 1)} style={{
                  background: "var(--cream)",
                  borderRadius: 18,
                  padding: 24,
                  display: "flex",
                  gap: 20,
                  borderLeft: "4px solid var(--primary)",
                }}>
                  <div style={{ fontSize: 38, fontWeight: 800, fontFamily: "var(--font-display)", color: "var(--primary)", lineHeight: 1, opacity: 0.5 }}>
                    {q.n}
                  </div>
                  <div>
                    <h3 style={{ fontSize: 17, marginBottom: 6, fontFamily: "var(--font-body)" }}>{q.t}</h3>
                    <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6 }}>{q.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: "96px 0", backgroundColor: "var(--ivory)", backgroundImage: "url('/low-opacity-cumpled-paper.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="container" style={{ maxWidth: 880 }}>
          <div data-reveal style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--primary)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
              FAQ
            </div>
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
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  listStyle: "none",
                }}>
                  <span style={{
                    minWidth: 32, height: 32,
                    borderRadius: 999,
                    background: "var(--primary-soft)",
                    color: "var(--primary)",
                    display: "grid",
                    placeItems: "center",
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: 13,
                  }}>{i + 1}</span>
                  <span style={{ flex: 1 }}>{f.q}</span>
                  <span style={{ color: "var(--text-muted)", fontSize: 18 }}>+</span>
                </summary>
                <div style={{
                  padding: "0 24px 20px 72px",
                  fontSize: 14,
                  color: "var(--text-muted)",
                  lineHeight: 1.7,
                }}>{f.a}</div>
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
            padding: "56px 40px",
            color: "white",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}>
            <h2 style={{ color: "white", fontSize: 40, marginBottom: 16, lineHeight: 1.15 }}>
              Sẵn sàng cứu chiếc bánh đầu tiên?
            </h2>
            <p style={{ fontSize: 16, opacity: 0.8, maxWidth: 480, margin: "0 auto 28px" }}>
              Tham gia hơn 125 nghìn người Việt đang ăn ngon, tiết kiệm và sống xanh mỗi ngày.
            </p>
            <a href="/discover" className="btn btn-primary btn-lg">Khám phá Box ngay →</a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
