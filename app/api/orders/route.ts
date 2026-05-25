import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { boxId } = await request.json();
  if (!boxId) return NextResponse.json({ error: "boxId required" }, { status: 400 });

  const box = await prisma.box.findUnique({
    where: { id: boxId },
    select: { id: true, storeId: true, priceSale: true, quantityLeft: true, active: true },
  });
  if (!box || !box.active) return NextResponse.json({ error: "Box không tồn tại" }, { status: 404 });
  if (box.quantityLeft <= 0) return NextResponse.json({ error: "Box đã hết hàng" }, { status: 409 });

  const existing = await prisma.order.findFirst({
    where: { userId: user.id, status: { in: ["PENDING", "CONFIRMED"] }, items: { some: { boxId } } },
  });
  if (existing) return NextResponse.json({ error: "Bạn đã đặt box này rồi" }, { status: 409 });

  const dbUser = await prisma.user.findUnique({ where: { id: user.id }, select: { id: true } });
  if (!dbUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const order = await prisma.$transaction(async (tx) => {
    const o = await tx.order.create({
      data: {
        userId: user.id,
        storeId: box.storeId,
        total: box.priceSale,
        paymentMethod: "bank_transfer",
        items: { create: { boxId, quantity: 1, priceAtTime: box.priceSale } },
      },
    });
    await tx.box.update({ where: { id: boxId }, data: { quantityLeft: { decrement: 1 } } });
    return o;
  });

  return NextResponse.json({ orderId: order.id });
}
