import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import ScrollRevealProvider from "@/components/ScrollRevealProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Still Good · Save Food, Save Money",
  description:
    "Still Good — good food, not wasted. Grab end-of-day boxes from your favourite bakeries and cafés at up to 70% off.",
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
          <ScrollRevealProvider />
          {children}
        </body>
      </html>
    </ViewTransitions>
  );
}
