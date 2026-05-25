import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import ScrollRevealProvider from "@/components/ScrollRevealProvider";
import ScrollToTop from "@/components/ScrollToTop";
import ProgressBar from "@/components/ProgressBar";
import { LocationProvider } from "@/lib/location-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "CrumbUp · Save Every Crumb, Share Every Value",
  description:
    "CrumbUp — giải cứu bánh cuối ngày chất lượng cao. Mua hộp bánh từ những tiệm bánh yêu thích với giá ưu đãi 50-70%. Ăn ngon, tiết kiệm, giảm lãng phí.",
  icons: {
    icon: "/crumbup-logo-tabweb.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <html lang="vi">
        <body>
          <LocationProvider>
            <ProgressBar />
            <ScrollRevealProvider />
            {children}
            <ScrollToTop />
          </LocationProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
