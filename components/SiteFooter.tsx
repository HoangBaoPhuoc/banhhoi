import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-col">
          <h4>CrumbUp</h4>
          <p>Save Every Crumb,<br />Share Every Value.</p>
          <p style={{ marginTop: 16, display: "flex", gap: 12 }}>
            <span style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.1)", display: "grid", placeItems: "center" }}>f</span>
            <span style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.1)", display: "grid", placeItems: "center" }}>ig</span>
            <span style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.1)", display: "grid", placeItems: "center" }}>td</span>
            <span style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.1)", display: "grid", placeItems: "center" }}>yt</span>
          </p>
        </div>
        <div className="footer-col">
          <h4>Về chúng tôi</h4>
          <Link href="/about#about">Sứ mệnh & Tầm nhìn</Link>
          <Link href="/about#history">Lịch sử</Link>
          <Link href="/about#esg">ESG & Impact</Link>
          <Link href="/about#business">Mô hình kinh doanh</Link>
        </div>
        <div className="footer-col">
          <h4>Hỗ trợ</h4>
          <Link href="/about#faq">Câu hỏi thường gặp</Link>
          <Link href="/delivery">Hướng dẫn sử dụng</Link>
          <Link href="/about#faq">Chính sách bảo mật</Link>
          <Link href="/about#faq">Chính sách đổi trả</Link>
        </div>
        <div className="footer-col">
          <h4>Liên hệ</h4>
          <p>✉ hello@crumbup.vn</p>
          <p>📞 1900 1234</p>
          <p>📍 Đà Nẵng, Việt Nam</p>
        </div>
      </div>
      <div className="footer-bottom">© 2026 CrumbUp. All rights reserved.</div>
    </footer>
  );
}
