import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/auth/check
// ?email=...         → { exists, role }
// ?phone=...         → { exists, role }
// ?storeName=...&storeAddress=...  → { exists }
// ?storePhone=...    → { exists }
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email       = searchParams.get("email");
  const phone       = searchParams.get("phone");
  const storeName   = searchParams.get("storeName");
  const storeAddr   = searchParams.get("storeAddress");
  const storePhone  = searchParams.get("storePhone");

  if (email) {
    const user = await prisma.user.findUnique({ where: { email }, select: { role: true } });
    return NextResponse.json({ exists: !!user, role: user?.role ?? null });
  }

  if (phone) {
    const user = await prisma.user.findUnique({ where: { phone }, select: { role: true } });
    return NextResponse.json({ exists: !!user, role: user?.role ?? null });
  }

  if (storePhone) {
    const store = await prisma.store.findUnique({ where: { phone: storePhone }, select: { id: true } });
    return NextResponse.json({ exists: !!store });
  }

  if (storeName && storeAddr) {
    const store = await prisma.store.findUnique({
      where: { name_address: { name: storeName, address: storeAddr } },
      select: { id: true },
    });
    return NextResponse.json({ exists: !!store });
  }

  return NextResponse.json({ error: "Missing query params" }, { status: 400 });
}
