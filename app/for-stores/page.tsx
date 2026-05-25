import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const businessBenefits = [
  {
    n: "1",
    t: "Thu hồi chi phí, tối ưu dòng tiền",
    d: "Thay vì chịu 'lỗ kép' (vừa mất tiền sản xuất, vừa mất công dọn rác), tiệm bánh chỉ cần đóng gói đồ chưa bán hết thành các Surprise Box với mức giá ưu đãi. Bạn sẽ bất ngờ khi thấy khoản chi phí chìm này biến thành một nguồn doanh thu ổn định mỗi tháng.",
  },
  {
    n: "2",
    t: "Tiếp cận tệp khách hàng mới tiềm năng",
    d: "Surprise Box là lời chào sân hoàn hảo để giới thiệu hương vị của tiệm đến mọi người xung quanh. Khách đến lấy bánh thường có tâm lý 'tiện công đôi việc'. Khi bước vào quán, họ rất dễ bị thu hút bởi tủ kính trưng bày và chủ động mua thêm một ly nước, một bịch bánh quy khô, hoặc một ổ bánh kem nguyên giá tại quầy. Đây chính là cơ hội tuyệt vời để tiệm tăng doanh thu trên mỗi lượt khách ghé thăm mà không tốn một đồng quảng cáo.",
  },
  {
    n: "3",
    t: "Thương hiệu xanh chạm đến trái tim giới trẻ",
    d: "Hành động giảm lãng phí thực phẩm giúp tiệm của bạn ghi điểm tuyệt đối trong mắt thế hệ trẻ (Gen Z, Millennials). Khách hàng ngày nay luôn ưu tiên ủng hộ các thương hiệu nhân văn và có trách nhiệm với môi trường.",
  },
];

const operationSteps = [
  { step: "1", title: "Đăng ký & Tạo hộp", desc: "Cửa hàng điền form thông tin trên hệ thống. Cuối ngày, bạn kiểm tra lượng đồ ăn còn dư (nhưng vẫn hoàn toàn đảm bảo chất lượng), set số lượng hộp trên app kèm khung giờ hẹn khách qua lấy." },
  { step: "2", title: "Khách hàng đặt trước", desc: "Người dùng mở ứng dụng, tìm kiếm các cửa hàng xung quanh trên bản đồ và tiến hành đặt trước những Surprise box của bạn." },
  { step: "3", title: "Trao hộp tại quầy", desc: "Nhân viên tiệm kiểm tra đơn trên app và trao Surprise Box cho người đến nhận. Quy trình vận hành linh hoạt theo lựa chọn của khách: tự đến lấy trực tiếp tại cửa hàng hoặc nhận hàng tận nơi qua đội ngũ Shipper của ứng dụng." },
  { step: "4", title: "Theo dõi doanh thu", desc: "Toàn bộ số tiền bán được sẽ được hệ thống tổng hợp rõ ràng. Bạn có thể dễ dàng quản lý dòng tiền ngay trên ứng dụng dành cho chủ quán và nhận thanh toán chuyển khoản định kỳ hàng tháng." },
];

const storeCategories = [
  "Tiệm bánh mì & Bánh ngọt truyền thống (Fresh Bakery)",
  "Tiệm bánh kem & Bánh lạnh cao cấp (Pastry & Cake Shop)",
  "Mô hình Bakery & Café hiện đại",
  "Tiệm bánh online & Bánh thủ công (Home-based Bakery)",
];

const partnerFaqs = [
  {
    q: "Phí dịch vụ trên app được tính như thế nào?",
    a: "Chúng tôi đồng hành cùng bạn dựa trên hiệu quả thực tế: Không thu phí khởi tạo, không phí duy trì hàng tháng. App chỉ trích một phần nhỏ chi phí dịch vụ trên mỗi chiếc Surprise Box được giải cứu thành công.",
  },
  {
    q: "Tiệm có cần đầu tư bao bì riêng cho Surprise Box không?",
    a: "Bạn hoàn toàn có thể tận dụng ngay túi giấy hoặc hộp carton sẵn có của tiệm để tối ưu chi phí. Đặc biệt, để lan tỏa lối sống xanh đúng nghĩa, app tích hợp tính năng khuyến khích khách hàng tự mang hộp cá nhân đến đựng bánh khi chọn hình thức Tự đến lấy (Self-pickup).",
  },
  {
    q: "Tiệm có bị 'bom hàng' không? Nếu khách đặt rồi không đến lấy thì sao?",
    a: "Hệ thống của chúng tôi bảo vệ quyền lợi của bạn tối đa: Khách phải thanh toán trước 100% qua ví điện tử thì đơn hàng mới hoàn tất. Nếu quá khung giờ quy định mà khách không đến nhận, đơn hàng vẫn tính là thành công.",
  },
  {
    q: "Tiệm có thể chủ động thay đổi số lượng Surprise Box và khung giờ mỗi ngày không?",
    a: "Hoàn toàn chủ động. Lượng bánh dư mỗi ngày là khác nhau, có ngày nhiều, có ngày ít. Tiệm có quyền tự nhập số lượng bánh dôi dư thực tế của ngày hôm đó lên app. Khung giờ hẹn khách đến lấy cũng do tiệm tự cài đặt sao cho phù hợp nhất với giờ đóng cửa của mình.",
  },
];

export default function ForStoresPage() {
  return (
    <>
      <SiteHeader />

      {/* HERO */}
      <section style={{
        backgroundColor: "var(--cream)",
        backgroundImage: "url('/low-opacity-cumpled-paper.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        paddingTop: 100,
        paddingBottom: 80,
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <div className="container" style={{ position: "relative", textAlign: "center", maxWidth: 900, width: "100%" }}>
          <h1 style={{ fontSize: 56, marginBottom: 24, lineHeight: 1.1 }}>
            Biến bánh dư cuối ngày<br />
            <em style={{ color: "var(--primary)", fontStyle: "italic", fontWeight: 800 }}>thành doanh thu</em>
          </h1>
          <p style={{ fontSize: 16, color: "var(--text-muted)", lineHeight: 1.8, maxWidth: 700, margin: "0 auto 32px" }}>
            Bạn có biết cảm giác xót xa khi nhìn những ổ bánh mì tươi ngon, những chiếc bánh ngọt tâm huyết phải huỷ bỏ vào cuối ngày? Toàn bộ chi phí nguyên liệu, tiền điện chạy lò và công sức nhào bột của thợ bánh coi như biến mất.
          </p>
          <p style={{ fontSize: 16, color: "var(--text)", lineHeight: 1.8, maxWidth: 700, margin: "0 auto 32px" }}>
            Ứng dụng này giúp tiệm bánh của bạn "giải phóng" lượng bánh tồn dư trong ngày qua các Surprise Box. Kết nối nhanh chóng với hàng ngàn khách hàng xung quanh, tối ưu chi phí nguyên liệu và biến mọi mẻ bánh thành doanh thu thực tế.
          </p>
          <a href="/register/business" className="btn btn-primary btn-lg">Đăng ký đối tác ngay →</a>
        </div>
      </section>

      {/* SURPRISE BOX LÀ GÌ */}
      <section style={{ padding: "80px 0", background: "white" }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <div style={{ textAlign: "center", marginBottom: 48 }} data-reveal>
            <h2 style={{ fontSize: 44 }}>Surprise Box là gì?</h2>
          </div>
          <p style={{ fontSize: 16, color: "var(--text)", lineHeight: 1.8, marginBottom: 20 }} data-reveal data-reveal-delay="1">
            Cuối ngày, tiệm của bạn luôn có những mẻ bánh tươi ngon chưa kịp tìm được chủ nhân. Thay vì hủy bỏ lãng phí, hãy gom chúng vào chiếc Surprise Box đầy bất ngờ.
          </p>
          <p style={{ fontSize: 16, color: "var(--text)", lineHeight: 1.8 }} data-reveal data-reveal-delay="2">
            Khách hàng sẽ đặt trước trên ứng dụng và đến nhận vào khung giờ bạn quy định với mức giá giảm sâu. Bằng cách này, bạn vừa bảo vệ được giá trị thương hiệu, vừa cùng cộng đồng lan tỏa lối sống xanh, giảm thiểu rác thải thực phẩm ra môi trường.
          </p>
        </div>
      </section>

      {/* LỢI ÍCH KINH DOANH */}
      <section style={{ padding: "80px 0", backgroundColor: "var(--ivory)", backgroundImage: "url('/low-opacity-cumpled-paper.png')", backgroundSize: "cover" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }} data-reveal>
            <h2 style={{ fontSize: 44 }}>Lợi ích kinh doanh thực tế cho tiệm bánh</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 32 }}>
            {businessBenefits.map((item, i) => (
              <div key={item.n} className="card-hover" data-reveal data-reveal-delay={String(Math.min(i, 3))} style={{
                background: "white",
                borderRadius: 20,
                padding: "32px 28px",
                border: "1px solid var(--border)",
                borderLeft: "4px solid var(--primary)",
              }}>
                <div style={{ fontSize: 36, fontWeight: 800, fontFamily: "var(--font-display)", color: "var(--primary)", marginBottom: 12, opacity: 0.3 }}>
                  {item.n}
                </div>
                <h3 style={{ fontSize: 18, marginBottom: 12, fontWeight: 700 }}>{item.t}</h3>
                <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.7 }}>{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MÔ HÌNH VẬN HÀNH */}
      <section style={{ padding: "80px 0", background: "white" }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <div style={{ textAlign: "center", marginBottom: 56 }} data-reveal>
            <h2 style={{ fontSize: 44 }}>Mô hình Surprise Box vận hành như thế nào?</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {operationSteps.map((item, i) => (
              <div key={item.step} className="card-hover" data-reveal data-reveal-delay={String(Math.min(i, 3))} style={{
                background: "var(--cream)",
                borderRadius: 20,
                padding: "32px 24px",
                border: "1px solid var(--border)",
              }}>
                <div style={{ fontSize: 28, fontWeight: 800, fontFamily: "var(--font-display)", color: "var(--primary)", marginBottom: 12 }}>
                  Bước {item.step}
                </div>
                <h3 style={{ fontSize: 17, marginBottom: 12, fontWeight: 700 }}>{item.title}</h3>
                <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DANH MỤC CỬA HÀNG */}
      <section style={{ padding: "80px 0", backgroundColor: "var(--ivory)", backgroundImage: "url('/low-opacity-cumpled-paper.png')", backgroundSize: "cover" }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <div style={{ textAlign: "center", marginBottom: 48 }} data-reveal>
            <h2 style={{ fontSize: 44, marginBottom: 24 }}>Danh mục cửa hàng phù hợp</h2>
          </div>
          <p style={{ fontSize: 16, color: "var(--text)", lineHeight: 1.8, marginBottom: 32, textAlign: "center" }} data-reveal data-reveal-delay="1">
            Bất kể tiệm của bạn đang kinh doanh mô hình bakery nào, chỉ cần có bánh tươi dư thừa cuối ngày, bạn đều có thể đồng hành cùng chúng tôi:
          </p>
          <ul style={{ paddingLeft: 24, listStyleType: "none", display: "flex", flexDirection: "column", gap: 12 }}>
            {storeCategories.map((cat, i) => (
              <li key={cat} className="card-hover" data-reveal data-reveal-delay={String(Math.min(i, 3))} style={{ paddingLeft: 24, fontSize: 15, color: "var(--text)", position: "relative" }}>
                <span style={{ position: "absolute", left: 0, color: "var(--primary)", fontWeight: 700 }}>•</span>
                {cat}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PARTNER FAQs */}
      <section style={{ padding: "80px 0", background: "white" }}>
        <div className="container" style={{ maxWidth: 880 }}>
          <div style={{ textAlign: "center", marginBottom: 48 }} data-reveal>
            <h2 style={{ fontSize: 44, marginBottom: 12 }}>Câu hỏi thường gặp — Dành cho chủ quán</h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {partnerFaqs.map((item, i) => (
              <details key={i} className="card-hover" data-reveal data-reveal-delay={String(Math.min(i, 3))} style={{
                background: "var(--cream)",
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
                    fontSize: 12,
                  }}>{i + 1}</span>
                  <span style={{ flex: 1 }}>{item.q}</span>
                  <span style={{ color: "var(--text-muted)", fontSize: 18 }}>+</span>
                </summary>
                <div style={{
                  padding: "0 24px 20px 72px",
                  fontSize: 14,
                  color: "var(--text-muted)",
                  lineHeight: 1.7,
                }}>{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "72px 0 96px", background: "white" }}>
        <div className="container">
          <div className="card-hover" data-reveal style={{
            background: "var(--text)",
            borderRadius: 28,
            padding: "56px 40px",
            color: "white",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}>
            <h2 style={{ color: "white", fontSize: 40, marginBottom: 16, lineHeight: 1.15 }}>
              Sẵn sàng tham gia CrumbUp?
            </h2>
            <p style={{ fontSize: 16, opacity: 0.8, maxWidth: 480, margin: "0 auto 28px" }}>
              Hãy cho bánh cuối ngày của bạn một cơ hội thứ hai. Kết nối với hàng ngàn khách hàng tiềm năng ngay hôm nay.
            </p>
            <a href="/register/business" className="btn btn-primary btn-lg">Đăng ký đối tác ngay →</a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
