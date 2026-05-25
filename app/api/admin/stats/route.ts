import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [customers, businesses, pendingStores, todayBoxes, newUsersToday] = await Promise.all([
    prisma.user.count({ where: { role: "CUSTOMER" } }),
    prisma.user.count({ where: { role: "BUSINESS" } }),
    prisma.store.count({ where: { verified: false } }),
    prisma.box.count({ where: { date: { gte: today }, active: true } }),
    prisma.user.count({ where: { createdAt: { gte: today } } }),
  ]);

  return NextResponse.json({ customers, businesses, pendingStores, todayBoxes, newUsersToday });
}
