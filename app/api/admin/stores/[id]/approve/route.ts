import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const store = await prisma.store.update({
    where: { id },
    data: { verified: true },
    select: { id: true, name: true, verified: true },
  });
  return NextResponse.json({ ok: true, store });
}
