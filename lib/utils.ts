export function formatPrice(n: number): string {
  return n.toLocaleString("vi-VN") + "đ";
}

export function discountPercent(original: number, sale: number): number {
  return Math.round(((original - sale) / original) * 100);
}

/** Returns start-of-day and end-of-day Date objects in Vietnam time (UTC+7). */
export function getVietnamToday(): { from: Date; to: Date } {
  const now = new Date();
  const vnOffset = 7 * 60 * 60 * 1000;
  const vnNow = new Date(now.getTime() + vnOffset);
  const from = new Date(Date.UTC(vnNow.getUTCFullYear(), vnNow.getUTCMonth(), vnNow.getUTCDate()));
  const to = new Date(from.getTime() + 24 * 60 * 60 * 1000);
  return { from, to };
}
