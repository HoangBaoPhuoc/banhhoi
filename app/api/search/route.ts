import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getVietnamToday } from "@/lib/utils";

export async function GET(request: Request) {
  const q = new URL(request.url).searchParams.get("q")?.trim() ?? "";
  if (q.length < 2) return NextResponse.json([]);

  const { from, to } = getVietnamToday();

  const boxes = await prisma.box.findMany({
    where: {
      active: true,
      quantityLeft: { gt: 0 },
      date: { gte: from, lt: to },
      OR: [
        { name: { contains: q, mode: "insensitive" } },
        { store: { name: { contains: q, mode: "insensitive" } } },
      ],
    },
    select: {
      id: true, name: true, priceSale: true, image: true,
      store: { select: { name: true } },
    },
    take: 6,
    orderBy: { quantityLeft: "asc" },
  });

  return NextResponse.json(boxes);
}
