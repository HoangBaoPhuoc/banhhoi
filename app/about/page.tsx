import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const coreValues = [
  {
    title: "We Win Together",
    subtitle: "Hệ sinh thái cùng thắng",
    desc: "Tối ưu hóa lợi ích tổng thể thay vì lợi nhuận cá nhân. Giúp chủ tiệm thu hồi vốn biên, giúp sinh viên tiết kiệm và giúp môi trường giảm rác thải.",
    color: "var(--primary)",
  },
  {
    title: "We Keep It Simple",
    subtitle: "Tối giản vận hành",
    desc: "Ứng dụng công nghệ tinh gọn, mô hình tự đến nhận (Self-pickup) giúp triệt tiêu hoàn toàn chi phí logistics, kho bãi và rủi ro bom hàng.",
    color: "var(--accent)",
  },
  {
    title: "We Raise The Bar",
    subtitle: "Không ngừng nâng chuẩn",
    desc: "Chuẩn hóa quy trình kiểm định thực phẩm giờ chót. Hộp Surprise Box trao đi phải đảm bảo tuyệt đối an toàn vệ sinh và trọn vẹn vị ngon.",
    color: "#d4a574",
  },
  {
    title: "We Care",
    subtitle: "Lan tỏa sự tử tế",
    desc: "Thấu hiểu từng khoản tổn thất của chủ tiệm và áp lực chi tiêu của sinh viên. Chuyển hóa hành vi của giới trẻ sang tiêu dùng có trách nhiệm.",
    color: "#b8956a",
  },
  {
    title: "We Build a Legacy",
    subtitle: "Kiến tạo tương lai xanh",
    desc: "Không dừng lại ở một ứng dụng thương mại, CrumbUp đồng hành cùng lộ trình dịch chuyển Đà Nẵng thành đô thị sinh thái không rác thải.",
    color: "var(--badge)",
  },
];

const esgPillars = [
  {
    initial: "E",
    title: "Môi trường (Environmental)",
    desc: "CrumbUp trực tiếp giảm thiểu áp lực lên hệ thống hạ tầng đô thị Đà Nẵng bằng mục tiêu giải cứu hơn 15.000 phần bánh dôi dư hằng năm, triệt tiêu lượng rác thải hữu cơ và cắt giảm lượng khí nhà kính độc hại phát sinh từ quá trình phân hủy thực phẩm.",
    color: "var(--accent)",
  },
  {
    initial: "S",
    title: "Xã hội (Social)",
    desc: "Chúng tôi xây dựng một cộng đồng tiêu dùng có trách nhiệm bằng cách kết nối lợi ích kinh tế với giá trị nhân văn. CrumbUp giúp học sinh, sinh viên tiết kiệm 50%–70% chi phí khi tiếp cận thực phẩm chất lượng cao, đồng thời hỗ trợ các chủ tiệm bánh địa phương thu hồi chi phí biến đổi biên để tái đầu tư vào dòng vốn lưu động.",
    color: "var(--primary)",
  },
  {
    initial: "G",
    title: "Quản trị (Governance)",
    desc: "Nền tảng cam kết tính minh bạch và an toàn tuyệt đối trong quản trị thông qua hệ thống số hóa dữ liệu thời gian thực. Bằng tính năng bắt buộc thanh toán trước 100%, CrumbUp thiết lập cơ chế bảo hiểm rủi ro 'bom hàng' hoàn hảo để bảo vệ quyền lợi cho đối tác, kết hợp với bộ quy chuẩn kiểm định nghiêm ngặt giúp kiểm soát chất lượng bánh giờ chót.",
    color: "var(--badge)",
  },
];

const faqs = [
  {
    q: "Surprise Box là gì, có biết trước món không?",
    a: "Surprise Box là hộp 'bí ẩn' gồm các sản phẩm cuối ngày được cửa hàng tự chọn (bánh, đồ uống, đồ ăn nhẹ...). Bạn sẽ không biết chính xác món gì cho đến khi nhận, nhưng giá trị luôn cao hơn số tiền bạn trả 2–3 lần.",
  },
  { q: "Tôi hoàn tiền thế nào, ai giải quyết khi có vấn đề?", a: "Hoàn tiền tự động vào tài khoản trong 3–5 ngày làm việc nếu cửa hàng hết box hoặc lỗi từ phía họ. Đội ngũ CrumbUp sẽ trực tiếp xử lý — bạn không cần làm việc với cửa hàng." },
  { q: "Hình thức tự đến lấy hoạt động như nào?", a: "Sau khi thanh toán, bạn nhận mã QR riêng. Đến cửa hàng trong khung giờ đã đặt, đưa QR cho nhân viên quét — xong!" },
  { q: "Nếu đến cửa hàng hết box, hoặc sản phẩm không đúng chất lượng?", a: "Trong trường hợp hiếm gặp này, bạn được hoàn 100% tiền hoặc đổi box tương đương. Đối với lỗi chất lượng, vui lòng phản ánh kèm hình ảnh trong 24h để được hỗ trợ." },
  { q: "Tôi có thể hủy đơn hàng sau khi đã thanh toán không?", a: "Bạn có thể hủy đơn miễn phí trước khung giờ nhận ít nhất 2 tiếng. Sau thời điểm đó, đơn không thể hủy để đảm bảo cửa hàng đã chuẩn bị Box." },
  { q: "CrumbUp có an toàn thực phẩm không khi là hàng cuối ngày?", a: "Có. Tất cả sản phẩm đều là hàng mới làm trong ngày, chỉ là chưa bán hết trước giờ đóng cửa. Cửa hàng có nghĩa vụ kiểm tra chất lượng trước khi đóng Box." },
];

const sectionStyle: React.CSSProperties = {
  scrollMarginTop: 100,
};

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
        <div className="container" style={{ position: "relative", textAlign: "center", maxWidth: 900, width: "100%" }}>
          <div className="rise rise-1" style={{ fontSize: 13, fontWeight: 700, color: "var(--primary)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 20 }}>
            Câu chuyện của chúng tôi
          </div>
          <h1 className="rise rise-2" style={{ fontSize: 60, marginBottom: 28, lineHeight: 1.1 }}>
            Save Every Crumb,<br />Share Every Value
          </h1>
          <p className="rise rise-3" style={{ fontSize: 18, color: "var(--text-muted)", lineHeight: 1.8, maxWidth: 680, margin: "0 auto" }}>
            "Một mẩu bánh vụn không làm nên bữa ăn, nhưng triệu cánh tay gom nhặt sẽ thay đổi cả một số phận."
          </p>
        </div>
      </section>

      {/* ── GIỚI THIỆU CHUNG ── */}
      <section id="about" style={{ ...sectionStyle, padding: "96px 0", background: "white" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--primary)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>
              Our Identity
            </div>
            <h2 style={{ fontSize: 48, marginBottom: 24, lineHeight: 1.15 }}>Giới thiệu chung</h2>
            <p style={{ fontSize: 17, color: "var(--text-muted)", maxWidth: 760, margin: "0 auto", lineHeight: 1.8 }}>
              CrumbUp là nền tảng công nghệ tác động xã hội (Social Impact Platform) tiên phong tại miền Trung Việt Nam, ra đời với sứ mệnh kết nối và truyền cảm hứng cho cộng đồng cùng hành động chống lại nạn lãng phí thực phẩm. Chúng tôi tin rằng mỗi chiếc bánh, mỗi phần ăn dôi dư vào cuối ngày đều xứng đáng có một cơ hội thứ hai để mang lại giá trị kinh tế và niềm vui cho người tiêu dùng.
            </p>
          </div>

          {/* Mission + Vision */}
          <div style={{ gap: 32, display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "stretch" }}>
            <div data-reveal style={{
              background: "linear-gradient(135deg, var(--primary-soft) 0%, #f9e0c4 100%)",
              borderRadius: 28,
              padding: "48px 44px",
              height: "100%",
              boxSizing: "border-box",
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--primary)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>
                Sứ mệnh
              </div>
              <h3 style={{ fontSize: 32, marginBottom: 20, lineHeight: 1.2 }}>Our Mission</h3>
              <p style={{ fontSize: 16, color: "var(--text)", lineHeight: 1.8 }}>
                Kiến tạo một giải pháp công nghệ thời gian thực (Real-time) tinh gọn, giúp các đối tác ngành F&B (Bakery & Café, Nhà hàng) tối ưu hóa nguồn cung dôi dư giờ chót, đồng thời giúp thế hệ trẻ tiếp cận thực phẩm chất lượng với chi phí tiết kiệm.
              </p>
            </div>

            <div data-reveal style={{
              background: "linear-gradient(135deg, var(--accent-soft) 0%, #c5dcbf 100%)",
              borderRadius: 28,
              padding: "48px 44px",
              height: "100%",
              boxSizing: "border-box",
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--accent)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>
                Tầm nhìn
              </div>
              <h3 style={{ fontSize: 32, marginBottom: 20, lineHeight: 1.2 }}>Our Vision</h3>
              <p style={{ fontSize: 16, color: "var(--text)", lineHeight: 1.8 }}>
                Hướng đến một hành tinh không còn rác thải thực phẩm hữu cơ. CrumbUp đặt mục tiêu trở thành hệ sinh thái công nghệ giải cứu thực phẩm dôi dư dẫn dắt thị trường, định hình phong cách sống xanh và tiêu dùng có trách nhiệm tại các đô thị thông minh.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── GIÁ TRỊ CỐT LÕI ── */}
      <section id="values" style={{ ...sectionStyle, padding: "96px 0", background: "var(--ivory)", backgroundImage: "url('/low-opacity-cumpled-paper.png')", backgroundSize: "cover" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--primary)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>
              Our Core Values
            </div>
            <h2 style={{ fontSize: 48 }}>Năm giá trị cốt lõi của CrumbUp</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {coreValues.map((v) => (
              <div key={v.title} data-reveal style={{
                background: "white",
                borderRadius: 20,
                padding: "36px 28px",
                border: "1px solid var(--border)",
                borderTop: `4px solid ${v.color}`,
                transition: "all 0.3s",
              }}
              className="card-hover"
              >
                <h3 style={{ fontSize: 20, marginBottom: 6, color: v.color, fontWeight: 700 }}>{v.title}</h3>
                <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 14, fontStyle: "italic" }}>{v.subtitle}</p>
                <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LỊCH SỬ ── */}
      <section id="history" style={{ ...sectionStyle, padding: "96px 0", background: "white" }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--primary)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>
              Our History
            </div>
            <h2 style={{ fontSize: 48 }}>Hành trình CrumbUp</h2>
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

      {/* ── ESG ── */}
      <section id="esg" style={{ ...sectionStyle, padding: "96px 0", background: "var(--ivory)", backgroundImage: "url('/low-opacity-cumpled-paper.png')", backgroundSize: "cover" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--primary)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>
              Tiêu chuẩn ESG
            </div>
            <h2 style={{ fontSize: 48 }}>Cam kết bền vững của CrumbUp</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32 }}>
            {esgPillars.map((pillar) => (
              <div key={pillar.initial} data-reveal style={{
                background: "white",
                borderRadius: 20,
                padding: "44px 36px",
                border: "1px solid var(--border)",
              }}
              className="card-hover"
              >
                <div style={{
                  width: 64,
                  height: 64,
                  borderRadius: 16,
                  background: pillar.color,
                  color: "white",
                  display: "grid",
                  placeItems: "center",
                  fontSize: 32,
                  fontWeight: 800,
                  marginBottom: 24,
                }}>
                  {pillar.initial}
                </div>
                <h3 style={{ fontSize: 20, marginBottom: 16, fontWeight: 700 }}>{pillar.title}</h3>
                <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.8 }}>{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MÔ HÌNH KINH DOANH ── */}
      <section id="business" style={{ ...sectionStyle, padding: "96px 0", background: "white" }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--primary)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>
              Business Model
            </div>
            <h2 style={{ fontSize: 48, marginBottom: 20 }}>Mô hình Win Win Win</h2>
            <p style={{ fontSize: 18, color: "var(--text-muted)", maxWidth: 640, margin: "0 auto" }}>
              Vì con người, lợi nhuận và hành tinh
            </p>
          </div>

          <div data-reveal style={{
            background: "linear-gradient(135deg, var(--primary-soft) 0%, var(--cream) 100%)",
            borderRadius: 24,
            padding: "52px 44px",
            marginBottom: 32,
          }}>
            <p style={{ fontSize: 17, color: "var(--text)", lineHeight: 1.9, marginBottom: 24 }}>
              CrumbUp vận hành theo triết lý cốt lõi: <strong>kết nối công nghệ để giải cứu nguồn thực phẩm dôi dư chất lượng cao</strong>. Bằng giải pháp này, chúng tôi:
            </p>
            <ul style={{ paddingLeft: 28, listStyleType: "disc" }}>
              <li style={{ marginBottom: 16, fontSize: 16, color: "var(--text)" }}>Giúp các đối tác tiệm bánh <strong>tối ưu hóa doanh thu</strong> từ lượng hàng hao hụt giờ chót</li>
              <li style={{ marginBottom: 16, fontSize: 16, color: "var(--text)" }}>Giúp người tiêu dùng trẻ <strong>trải nghiệm những miếng ngon</strong> với giá trị kinh tế tốt nhất</li>
              <li style={{ fontSize: 16, color: "var(--text)" }}>Truyền cảm hứng cho cộng đồng <strong>cùng chung tay bảo vệ môi trường</strong></li>
            </ul>
          </div>

          <div data-reveal style={{
            background: "var(--ivory)",
            borderRadius: 20,
            padding: "40px 36px",
            borderLeft: "4px solid var(--accent)",
          }}>
            <p style={{ fontSize: 16, color: "var(--text)", lineHeight: 1.9, marginBottom: 12 }}>
              <strong>Giảm thiểu rác thải thực phẩm</strong> chính là hành động thiết thực và mạnh mẽ nhất mà bạn có thể thực hiện để đẩy lùi cuộc khủng hoảng khí hậu, góp phần quan trọng vào mục tiêu toàn cầu nhằm giới hạn mức tăng nhiệt độ Trái Đất ở ngưỡng dưới 2°C vào năm 2100.
            </p>
            <p style={{ fontSize: 14, color: "var(--text-muted)", fontStyle: "italic" }}>
              — Theo nghiên cứu của tổ chức uy tín toàn cầu Project Drawdown
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" style={{ ...sectionStyle, padding: "96px 0", backgroundColor: "var(--ivory)", backgroundImage: "url('/low-opacity-cumpled-paper.png')", backgroundSize: "cover" }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--primary)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>
              FAQ
            </div>
            <h2 style={{ fontSize: 48 }}>Câu hỏi thường gặp</h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {faqs.map((f, i) => (
              <details key={i} className="card-hover" data-reveal style={{
                background: "white",
                borderRadius: 16,
                border: "1px solid var(--border)",
                overflow: "hidden",
              }}>
                <summary style={{
                  padding: "22px 28px",
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  listStyle: "none",
                }}>
                  <span style={{
                    minWidth: 36, height: 36,
                    borderRadius: 999,
                    background: "var(--primary-soft)",
                    color: "var(--primary)",
                    display: "grid",
                    placeItems: "center",
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: 14,
                  }}>{i + 1}</span>
                  <span style={{ flex: 1 }}>{f.q}</span>
                  <span style={{ color: "var(--text-muted)", fontSize: 20 }}>+</span>
                </summary>
                <div style={{
                  padding: "0 28px 24px 80px",
                  fontSize: 15,
                  color: "var(--text-muted)",
                  lineHeight: 1.8,
                }}>{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "80px 0 100px", background: "white" }}>
        <div className="container">
          <div data-reveal style={{
            background: "var(--text)",
            borderRadius: 28,
            padding: "64px 48px",
            color: "white",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}>
            <h2 style={{ color: "white", fontSize: 44, marginBottom: 20, lineHeight: 1.15 }}>
              Sẵn sàng cứu chiếc bánh đầu tiên?
            </h2>
            <p style={{ fontSize: 18, opacity: 0.8, maxWidth: 480, margin: "0 auto 32px" }}>
              Tham gia cộng đồng CrumbUp đang ăn ngon, tiết kiệm và sống xanh mỗi ngày.
            </p>
            <a href="/discover" className="btn btn-primary btn-lg">Khám phá Box ngay →</a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
