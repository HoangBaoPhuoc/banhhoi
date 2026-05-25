import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

async function getAdminToken(): Promise<string> {
  const email  = process.env.ADMIN_EMAIL    ?? "";
  const pw     = process.env.ADMIN_PASSWORD ?? "";
  const secret = process.env.ADMIN_SECRET   ?? "crumbup-admin-secret";
  const data   = new TextEncoder().encode(`${email}:${pw}:${secret}`);
  const buf    = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Admin route protection ──────────────────────────────────────────────
  if (pathname.startsWith("/admin")) {
    const reqHeaders = new Headers(request.headers);
    reqHeaders.set("x-pathname", pathname);
    if (pathname === "/admin/login") {
      return NextResponse.next({ request: { headers: reqHeaders } });
    }
    const session = request.cookies.get("admin_session")?.value;
    const token   = await getAdminToken();
    if (!session || session !== token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    return NextResponse.next({ request: { headers: reqHeaders } });
  }

  // ── Supabase user routes ────────────────────────────────────────────────
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  const protectedPaths = ["/profile", "/orders", "/partner"];
  if (protectedPaths.some((p) => pathname.startsWith(p)) && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (user && ["/login", "/register"].includes(pathname)) {
    const dest = user.user_metadata?.role === "BUSINESS" ? "/partner" : "/discover";
    return NextResponse.redirect(new URL(dest, request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
