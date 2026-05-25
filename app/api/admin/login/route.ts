import { NextResponse } from "next/server";
import { getAdminToken, ADMIN_COOKIE_NAME } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const adminEmail = process.env.ADMIN_EMAIL ?? "";
  const adminPw    = process.env.ADMIN_PASSWORD ?? "";

  if (email !== adminEmail || password !== adminPw) {
    return NextResponse.json({ error: "Sai thông tin đăng nhập" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE_NAME(), getAdminToken(), {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 8, // 8 giờ
    path: "/",
  });
  return res;
}
