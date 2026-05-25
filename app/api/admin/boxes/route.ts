import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const dateParam = searchParams.get("date");
  const page  = Math.max(1, Number(searchParams.get("page") ?? 1));
  const limit = 30;

  const day = dateParam ? new Date(dateParam) : new Date();
  day.setHours(0, 0, 0, 0);
  const nextDay = new Date(day);
  nextDay.setDate(nextDay.getDate() + 1);

  const [boxes, total] = await Promise.all([
    prisma.box.findMany({
      where: { date: { gte: day, lt: nextDay } },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        store: { select: { id: true, name: true, address: true, verified: true } },
        _count: { select: { orderItems: true } },
      },
    }),
    prisma.box.count({ where: { date: { gte: day, lt: nextDay } } }),
  ]);

  return NextResponse.json({ boxes, total, page, pages: Math.ceil(total / limit) });
}
