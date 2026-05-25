"use client";

import { useSearchParams } from "next/navigation";

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
    desc: "Chúng tôi xây dựng một cộng đồng tiêu dùng có trách nhiệm bằng cách kết nối lợi ích kinh tế với giá trị nhân văn. CrumbUp giúp học sinh, sinh viên tiết kiệm 50% - 70% chi phí khi tiếp cận thực phẩm chất lượng cao, đồng thời hỗ trợ các chủ tiệm bánh địa phương thu hồi chi phí biến đổi biên để tái đầu tư vào dòng vốn lưu động.",
    color: "var(--primary)",
  },
  {
    initial: "G",
    title: "Quản trị (Governance)",
    desc: "Nền tảng cam kết tính minh bạch và an toàn tuyệt đối trong quản trị thông qua hệ thống số hóa dữ liệu thời gian thực. Bằng tính năng bắt buộc thanh toán trước 100%, CrumbUp thiết lập cơ chế bảo hiểm rủi ro 'bom hàng' hoàn hảo để bảo vệ quyền lợi cho đối tác, kết hợp với bộ quy chuẩn kiểm định nghiêm ngặt giúp kiểm soát chất lượng bánh giờ chót.",
    color: "var(--badge)",
  },
];

export default function AboutTabContent() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "about";

  return (
    <>
      {/* ────── TAB: ABOUT US ────── */}
      {activeTab === "about" && (
        <>
          <section style={{ padding: "80px 0", background: "white" }}>
            <div className="container">
              <div style={{ textAlign: "center", marginBottom: 60 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--primary)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
                  Our Identity
                </div>
                <h2 style={{ fontSize: 44, marginBottom: 20, lineHeight: 1.15 }}>Giới thiệu chung</h2>
                <p style={{ fontSize: 15, color: "var(--text-muted)", maxWidth: 720, margin: "0 auto", lineHeight: 1.7 }}>
                  CrumbUp là nền tảng công nghệ tác động xã hội (Social Impact Platform) tiên phong tại miền Trung Việt Nam, ra đời với sứ mệnh kết nối và truyền cảm hứng cho cộng đồng cùng hành động chống lại nạn lãng phí thực phẩm. Chúng tôi tin rằng mỗi chiếc bánh, mỗi phần ăn dôi dư vào cuối ngày đều xứng đáng có một cơ hội thứ hai để mang lại giá trị kinh tế và niềm vui cho người tiêu dùng.
                </p>
              </div>
            </div>
          </section>

          <section style={{ padding: "80px 0", background: "var(--ivory)", backgroundImage: "url('/low-opacity-cumpled-paper.png')", backgroundSize: "cover" }}>
            <div className="container">
              <div style={{ gap: 32, display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "start" }}>
                <div data-reveal style={{
                  background: "linear-gradient(135deg, var(--primary-soft) 0%, #f9e0c4 100%)",
                  borderRadius: 28,
                  padding: "44px 40px",
                  position: "relative",
                  overflow: "hidden",
                }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "var(--primary)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>
                    Sứ mệnh
                  </div>
                  <h3 style={{ fontSize: 28, marginBottom: 16, lineHeight: 1.2 }}>Our Mission</h3>
                  <p style={{ fontSize: 14, color: "var(--text)", lineHeight: 1.7 }}>
                    Kiến tạo một giải pháp công nghệ thời gian thực (Real-time) tinh gọn, giúp các đối tác ngành F&B (Bakery & Café, Nhà hàng) tối ưu hóa nguồn cung dôi dư giờ chót, đồng thời giúp thế hệ trẻ tiếp cận thực phẩm chất lượng với chi phí tiết kiệm.
                  </p>
                </div>

                <div data-reveal style={{
                  background: "linear-gradient(135deg, var(--accent-soft) 0%, #c5dcbf 100%)",
                  borderRadius: 28,
                  padding: "44px 40px",
                  position: "relative",
                  overflow: "hidden",
                }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "var(--accent)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>
                    Tầm nhìn
                  </div>
                  <h3 style={{ fontSize: 28, marginBottom: 16, lineHeight: 1.2 }}>Our Vision</h3>
                  <p style={{ fontSize: 14, color: "var(--text)", lineHeight: 1.7 }}>
                    Hướng đến một hành tinh không còn rác thải thực phẩm hữu cơ. CrumbUp đặt mục tiêu trở thành hệ sinh thái công nghệ giải cứu thực phẩm dôi dư dẫn dắt thị trường, định hình phong cách sống xanh và tiêu dùng có trách nhiệm tại các đô thị thông minh.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section style={{ padding: "80px 0", background: "white" }}>
            <div className="container">
              <div style={{ textAlign: "center", marginBottom: 56 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--primary)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
                  Our Core Values
                </div>
                <h2 style={{ fontSize: 44 }}>Năm giá trị cốt lõi của CrumbUp</h2>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
                {coreValues.map((v) => (
                  <div key={v.title} data-reveal style={{
                    background: "white",
                    borderRadius: 20,
                    padding: "32px 24px",
                    border: "1px solid var(--border)",
                    borderTop: `4px solid ${v.color}`,
                    transition: "all 0.3s",
                  }}
                  className="card-hover"
                  >
                    <h3 style={{ fontSize: 18, marginBottom: 4, color: v.color, fontWeight: 700 }}>{v.title}</h3>
                    <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 12, fontStyle: "italic" }}>{v.subtitle}</p>
                    <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6 }}>{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ────── TAB: HISTORY ────── */}
      {activeTab === "history" && (
        <section style={{ padding: "80px 0", background: "white" }}>
          <div className="container" style={{ maxWidth: 760 }}>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--primary)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
                Our History
              </div>
              <h2 style={{ fontSize: 44 }}>Hành trình CrumbUp</h2>
            </div>

            <div data-reveal style={{ fontSize: 15, color: "var(--text)", lineHeight: 1.8, textAlign: "left" }}>
              <p style={{ marginBottom: 20 }}>
                <strong>CrumbUp được thành lập vào năm 2026 tại Đà Nẵng</strong> với một sứ mệnh duy nhất: Chống lãng phí thực phẩm.
              </p>
              <p style={{ marginBottom: 20 }}>
                Dự án bắt nguồn từ việc chúng tôi chứng kiến một <em>nghịch lý diễn ra hằng ngày</em> tại các đô thị lớn:
              </p>
              <ul style={{ marginBottom: 20, paddingLeft: 24, listStyleType: "disc" }}>
                <li style={{ marginBottom: 12 }}>Hàng tấn bánh tươi đạt chuẩn buộc phải hủy bỏ vào cuối ngày</li>
                <li style={{ marginBottom: 12 }}>Hàng ngàn sinh viên và người trẻ phải thắt chặt chi tiêu từng bữa ăn</li>
                <li>Các tiệm bánh địa phương mất lợi nhuận từ chi phí vận hành không hồi đáp</li>
              </ul>
              <p>
                Từ <strong>sự tương tác giữa ba vấn đề này</strong>, CrumbUp ra đời không chỉ là một ứng dụng thương mại, mà là một nền tảng công nghệ tác động xã hội, kết nối lợi ích kinh tế với giá trị nhân văn và bảo vệ môi trường.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ────── TAB: ESG ────── */}
      {activeTab === "esg" && (
        <section style={{ padding: "80px 0", background: "white" }}>
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--primary)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
                Tiêu chuẩn ESG
              </div>
              <h2 style={{ fontSize: 44 }}>Cam kết bền vững của CrumbUp</h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32 }}>
              {esgPillars.map((pillar) => (
                <div key={pillar.initial} data-reveal style={{
                  background: "white",
                  borderRadius: 20,
                  padding: "40px 32px",
                  border: "1px solid var(--border)",
                  position: "relative",
                }}
                className="card-hover"
                >
                  <div style={{
                    width: 60,
                    height: 60,
                    borderRadius: 16,
                    background: pillar.color,
                    color: "white",
                    display: "grid",
                    placeItems: "center",
                    fontSize: 28,
                    fontWeight: 800,
                    marginBottom: 20,
                  }}>
                    {pillar.initial}
                  </div>
                  <h3 style={{ fontSize: 18, marginBottom: 12, fontWeight: 700 }}>{pillar.title}</h3>
                  <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.7 }}>{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ────── TAB: BUSINESS MODEL ────── */}
      {activeTab === "business" && (
        <section style={{ padding: "80px 0", background: "white" }}>
          <div className="container" style={{ maxWidth: 880 }}>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--primary)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
                Business Model
              </div>
              <h2 style={{ fontSize: 44, marginBottom: 20 }}>Mô hình Win Win Win</h2>
              <p style={{ fontSize: 15, color: "var(--text-muted)", maxWidth: 640, margin: "0 auto" }}>
                Vì con người, lợi nhuận và hành tinh
              </p>
            </div>

            <div data-reveal style={{
              background: "linear-gradient(135deg, var(--primary-soft) 0%, var(--cream) 100%)",
              borderRadius: 24,
              padding: "48px 40px",
              marginBottom: 40,
            }}>
              <p style={{ fontSize: 15, color: "var(--text)", lineHeight: 1.8, marginBottom: 20 }}>
                CrumbUp vận hành theo triết lý cốt lõi: <strong>kết nối công nghệ để giải cứu nguồn thực phẩm dôi dư chất lượng cao</strong>. Bằng giải pháp này, chúng tôi:
              </p>
              <ul style={{ paddingLeft: 24, listStyleType: "disc" }}>
                <li style={{ marginBottom: 12, fontSize: 14, color: "var(--text)" }}>Giúp các đối tác tiệm bánh <strong>tối ưu hóa doanh thu</strong> từ lượng hàng hao hụt giờ chót</li>
                <li style={{ marginBottom: 12, fontSize: 14, color: "var(--text)" }}>Giúp người tiêu dùng trẻ <strong>trải nghiệm những miếc ngon</strong> với giá trị kinh tế tốt nhất</li>
                <li style={{ fontSize: 14, color: "var(--text)" }}>Truyền cảm hứng cho cộng đồng <strong>cùng chung tay bảo vệ môi trường</strong></li>
              </ul>
            </div>

            <div data-reveal style={{
              background: "var(--ivory)",
              borderRadius: 20,
              padding: "40px 32px",
              borderLeft: "4px solid var(--accent)",
            }}>
              <p style={{ fontSize: 14, color: "var(--text)", lineHeight: 1.8, marginBottom: 12 }}>
                <strong>Giảm thiểu rác thải thực phẩm</strong> chính là hành động thiết thực và mạnh mẽ nhất mà bạn có thể thực hiện để đẩy lùi cuộc khủng hoảng khí hậu, góp phần quan trọng vào mục tiêu toàn cầu nhằm giới hạn mức tăng nhiệt độ Trái Đất ở ngưỡng dưới 2°C vào năm 2100.
              </p>
              <p style={{ fontSize: 12, color: "var(--text-muted)", fontStyle: "italic" }}>
                — Theo nghiên cứu của tổ chức uy tín toàn cầu Project Drawdown
              </p>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
