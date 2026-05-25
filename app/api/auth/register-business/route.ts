import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const {
    email, password, name,
    storeName, storeAddr, storePhone, storeHours, storeDesc,
    lat, lng,
  } = await request.json();

  // 1. Check email not already used (by any role)
  const existingByEmail = await prisma.user.findUnique({ where: { email }, select: { role: true } });
  if (existingByEmail) {
    const msg = existingByEmail.role === "CUSTOMER"
      ? "Email này đã là tài khoản khách hàng. Vui lòng dùng email khác hoặc đăng nhập."
      : "Email này đã có tài khoản cửa hàng.";
    return NextResponse.json({ error: msg }, { status: 409 });
  }

  // 2. Check store phone not already claimed
  if (storePhone) {
    const existingByPhone = await prisma.store.findUnique({
      where: { phone: storePhone },
      select: { id: true },
    });
    if (existingByPhone) {
      return NextResponse.json(
        { error: "Tiệm này đã được đăng ký bởi chủ khác. Nếu bạn là chủ tiệm, vui lòng liên hệ hỗ trợ." },
        { status: 409 },
      );
    }
  }

  // 3. Check store name+address not already claimed
  const existingByNameAddr = await prisma.store.findUnique({
    where: { name_address: { name: storeName, address: storeAddr } },
    select: { id: true },
  });
  if (existingByNameAddr) {
    return NextResponse.json(
      { error: "Tiệm này đã được đăng ký bởi chủ khác. Nếu bạn là chủ tiệm, vui lòng liên hệ hỗ trợ." },
      { status: 409 },
    );
  }

  // 4. Create Supabase auth user
  const supabase = await createClient();
  const { data, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name, role: "BUSINESS" },
      emailRedirectTo: `${new URL(request.url).origin}/api/auth/callback`,
    },
  });

  if (authError) return NextResponse.json({ error: authError.message }, { status: 400 });

  if (!data.user) {
    return NextResponse.json(
      { error: "Email này đã được đăng ký. Vui lòng đăng nhập hoặc dùng email khác." },
      { status: 409 },
    );
  }

  // 5. Create User + Store in DB
  try {
    const user = await prisma.user.create({
      data: {
        id:    data.user.id,
        email: data.user.email!,
        name,
        role:  "BUSINESS",
      },
    });
    await prisma.store.create({
      data: {
        ownerId:     user.id,
        name:        storeName,
        address:     storeAddr,
        phone:       storePhone   || null,
        openHours:   storeHours   || null,
        description: storeDesc    || null,
        lat:         lat          ?? null,
        lng:         lng          ?? null,
        verified:    false,
      },
    });
  } catch (err) {
    console.error("[register-business] DB error:", err);
    return NextResponse.json({ error: "Lỗi lưu dữ liệu. Vui lòng thử lại." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, needsConfirm: !data.user.confirmed_at });
}
