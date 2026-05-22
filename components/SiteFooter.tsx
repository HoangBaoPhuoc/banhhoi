import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-col">
          <h4>Still Good</h4>
          <p>Cứu bánh ngon cuối ngày,<br />lan tỏa lối sống xanh.</p>
          <p style={{ marginTop: 16, display: "flex", gap: 12 }}>
            <span style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.1)", display: "grid", placeItems: "center" }}>f</span>
            <span style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.1)", display: "grid", placeItems: "center" }}>ig</span>
            <span style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.1)", display: "grid", placeItems: "center" }}>td</span>
            <span style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.1)", display: "grid", placeItems: "center" }}>yt</span>
          </p>
        </div>
        <div className="footer-col">
          <h4>Về chúng tôi</h4>
          <Link href="/about">Sứ mệnh & Tầm nhìn</Link>
          <Link href="/about#impact">Food waste & Impact</Link>
          <Link href="/about#blog">Tin tức & Blog</Link>
        </div>
        <div className="footer-col">
          <h4>Hỗ trợ</h4>
          <Link href="/about#faq">Câu hỏi thường gặp</Link>
          <Link href="/delivery">Hướng dẫn sử dụng</Link>
          <Link href="/about#privacy">Chính sách bảo mật</Link>
          <Link href="/about#refund">Chính sách đổi trả</Link>
        </div>
        <div className="footer-col">
          <h4>Liên hệ</h4>
          <p>✉ hello@stillgood.vn</p>
          <p>📞 1900 1234</p>
          <p>📍 Hồ Chí Minh, Việt Nam</p>
        </div>
      </div>
      <div className="footer-bottom">© 2026 Still Good. All rights reserved.</div>
    </footer>
  );
}
