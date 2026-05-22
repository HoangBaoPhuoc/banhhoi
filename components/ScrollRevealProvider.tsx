"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollRevealProvider() {
  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -48px 0px" }
    );

    // Small delay so DOM settles after view transition
    const timer = setTimeout(() => {
      document.querySelectorAll("[data-reveal]").forEach((el) => {
        observer.observe(el);
      });
    }, 80);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
