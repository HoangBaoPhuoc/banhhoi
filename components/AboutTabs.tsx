"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

interface Tab {
  id: string;
  label: string;
}

const tabs: Tab[] = [
  { id: "about", label: "About us" },
  { id: "history", label: "Our history" },
  { id: "esg", label: "ESG" },
  { id: "business", label: "Business Model" },
];

export default function AboutTabs() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "about";
  const tabsRef = useRef<HTMLElement>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (tabsRef.current) {
      const top = tabsRef.current.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }
  }, [activeTab]);

  const handleTabClick = (tabId: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push(`/about?tab=${tabId}`, { scroll: false });
  };

  return (
    <section ref={tabsRef} style={{ borderBottom: "1px solid var(--border)", background: "white", position: "sticky", top: 80, zIndex: 50 }}>
      <div className="container">
        <div style={{ display: "flex", gap: 0, overflowX: "auto", paddingBottom: 0, scrollBehavior: "smooth" }}>
          {tabs.map((tab) => (
            <a
              key={tab.id}
              href={`/about?tab=${tab.id}`}
              onClick={handleTabClick(tab.id)}
              style={{
                padding: "16px 24px",
                fontSize: 14,
                fontWeight: activeTab === tab.id ? 700 : 600,
                color: activeTab === tab.id ? "var(--primary)" : "var(--text-muted)",
                background: "transparent",
                border: "none",
                borderBottom: activeTab === tab.id ? "2px solid var(--primary)" : "transparent",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.2s",
                textDecoration: "none",
                display: "block",
              }}
            >
              {tab.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
