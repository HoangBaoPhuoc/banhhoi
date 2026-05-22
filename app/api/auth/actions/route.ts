import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const { action, email, password, name } = await request.json();
  const supabase = await createClient();

  if (action === "register") {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
        emailRedirectTo: `${new URL(request.url).origin}/api/auth/callback`,
      },
    });

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    // Nếu email confirm bị tắt, tạo user luôn
    if (data.user && data.user.confirmed_at) {
      await prisma.user.upsert({
        where: { id: data.user.id },
        update: {},
        create: { id: data.user.id, email: data.user.email!, name },
      });
    }

    return NextResponse.json({ ok: true, needsConfirm: !data.user?.confirmed_at });
  }

  if (action === "login") {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    // Đảm bảo user có trong DB
    await prisma.user.upsert({
      where: { id: data.user.id },
      update: {},
      create: {
        id: data.user.id,
        email: data.user.email!,
        name: data.user.user_metadata?.name ?? email.split("@")[0],
      },
    });

    return NextResponse.json({ ok: true });
  }

  if (action === "logout") {
    await supabase.auth.signOut();
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
