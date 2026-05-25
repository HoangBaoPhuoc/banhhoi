import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const box = await prisma.box.findUnique({
    where: { id },
    select: { id: true, active: true, store: { select: { ownerId: true } } },
  });
  if (!box) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (box.store.ownerId !== user.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  await prisma.box.update({ where: { id }, data: { active: !box.active } });
  return NextResponse.json({ ok: true });
}
