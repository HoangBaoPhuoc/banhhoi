"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

const SORTS = [
  { label: "Mặc định",      value: "default"    },
  { label: "Giá thấp nhất", value: "price_asc"  },
  { label: "Giá cao nhất",  value: "price_desc" },
];

export default function SortButtons({ current }: { current: string }) {
  const router   = useRouter();
  const pathname = usePathname();
  const params   = useSearchParams();

  function setSort(value: string) {
    const next = new URLSearchParams(params.toString());
    next.set("sort", value);
    router.push(`${pathname}?${next.toString()}`);
  }

  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {SORTS.map((s) => (
        <button
          key={s.value}
          onClick={() => setSort(s.value)}
          className={current === s.value ? "btn btn-primary" : "btn btn-ghost"}
          style={{ fontSize: 12, padding: "8px 14px" }}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
