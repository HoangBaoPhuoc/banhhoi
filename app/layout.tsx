import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bánh Hỡi · Surprise Box",
  description:
    "Cứu bánh ngon cuối ngày, săn deal hời mỗi tối. Nền tảng giải cứu thực phẩm Surprise Box từ các tiệm bánh, quán cà phê yêu thích của bạn.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
