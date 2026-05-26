import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

const VALID_TRANSITIONS: Record<string, string[]> = {
  PENDING:   ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["PICKED_UP", "CANCELLED"],
};

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const { status: newStatus } = await request.json();

  const order = await prisma.order.findUnique({
    where: { id },
    select: { id: true, status: true, store: { select: { ownerId: true } } },
  });
  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });
  if (order.store.ownerId !== user.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const allowed = VALID_TRANSITIONS[order.status] ?? [];
  if (!allowed.includes(newStatus)) {
    return NextResponse.json({ error: `Không thể chuyển từ ${order.status} → ${newStatus}` }, { status: 400 });
  }

  await prisma.order.update({
    where: { id },
    data: {
      status: newStatus,
      ...(newStatus === "PICKED_UP" ? { pickedUpAt: new Date() } : {}),
    },
  });
  return NextResponse.json({ ok: true });
}
