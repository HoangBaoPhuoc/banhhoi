import Link from "next/link";

export default function SiteHeader({ active }: { active?: string }) {
  const items = [
    { href: "/discover", label: "Khám phá Box", key: "discover" },
    { href: "/#how", label: "Cách hoạt động", key: "how" },
    { href: "/about", label: "Về chúng tôi", key: "about" },
    { href: "/partner", label: "Dành cho cửa hàng", key: "partner" },
    { href: "/delivery", label: "Giao hàng", key: "delivery" },
    { href: "/#support", label: "Hỗ trợ", key: "support" },
  ];

  return (
    <header className="site-header">
      <Link href="/" className="logo">
        <div className="logo-mark">🥐</div>
        <div className="logo-text">
          <strong>Bánh Hỡi</strong>
          <span>Surprise Box</span>
        </div>
      </Link>

      <div className="addr-pill">
        <span>📍</span>
        <span>Hà Nội, Việt Nam</span>
      </div>

      <nav className="nav">
        {items.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className={active === item.key ? "active" : ""}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <Link href="/login" className="btn btn-primary">
        Đăng nhập
      </Link>
    </header>
  );
}
