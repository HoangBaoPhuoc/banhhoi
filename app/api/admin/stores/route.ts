import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const verified = searchParams.get("verified"); // "true" | "false" | null
  const q        = searchParams.get("q") ?? "";
  const page     = Math.max(1, Number(searchParams.get("page") ?? 1));
  const limit    = 20;

  const where = {
    ...(verified !== null ? { verified: verified === "true" } : {}),
    ...(q ? {
      OR: [
        { name: { contains: q, mode: "insensitive" as const } },
        { address: { contains: q, mode: "insensitive" as const } },
      ],
    } : {}),
  };

  const [stores, total] = await Promise.all([
    prisma.store.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        owner: { select: { name: true, email: true } },
        _count: { select: { boxes: true, orders: true } },
      },
    }),
    prisma.store.count({ where }),
  ]);

  return NextResponse.json({ stores, total, page, pages: Math.ceil(total / limit) });
}
