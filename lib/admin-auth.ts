import { createHash } from "crypto";
import { cookies } from "next/headers";

const COOKIE = "admin_session";

export function getAdminToken(): string {
  const email  = process.env.ADMIN_EMAIL    ?? "";
  const pw     = process.env.ADMIN_PASSWORD ?? "";
  const secret = process.env.ADMIN_SECRET   ?? "crumbup-admin-secret";
  return createHash("sha256").update(`${email}:${pw}:${secret}`).digest("hex");
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const jar   = await cookies();
  const value = jar.get(COOKIE)?.value;
  return !!value && value === getAdminToken();
}

export function ADMIN_COOKIE_NAME() {
  return COOKIE;
}
