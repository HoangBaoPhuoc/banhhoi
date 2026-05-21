# 🥐 Bánh Hỡi — Surprise Box

Nền tảng giải cứu thực phẩm bằng mô hình Surprise Box. Production-ready Next.js 14 app, sẵn sàng deploy lên Vercel.

## Cấu trúc

```
app/
├── page.tsx              # 01. Homepage
├── discover/             # 02. Khám phá Box (customer)
├── box/[id]/             # 03. Chi tiết Box
├── partner/              # 04. Dashboard đối tác
├── delivery/             # 05. Giao hàng & Nhận hàng
├── about/                # 06. Về chúng tôi
├── globals.css           # Design tokens + shared styles
└── layout.tsx
components/
├── SiteHeader.tsx        # Shared customer-facing header
└── SiteFooter.tsx        # Shared footer
```

## Cài đặt

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

## Routes

| URL | Trang |
|-----|------|
| `/` | Homepage |
| `/discover` | Khám phá Box (giao diện khách hàng) |
| `/box/1`, `/box/2`, ... | Chi tiết Box |
| `/partner` | Dashboard đối tác (cửa hàng) |
| `/delivery` | Giao hàng & Nhận hàng |
| `/about` | Về chúng tôi (sứ mệnh, FAQ) |

## Design tokens

Mọi màu sắc đều ở dạng CSS variables trong `app/globals.css` — chỉnh 1 nơi, áp dụng toàn site.

| Token | Hex | Dùng cho |
|-------|-----|---------|
| `--primary` | `#e87722` | CTA, badges chính, accent màu cam ấm |
| `--accent` | `#4c8c4a` | Tag sustainability, success states |
| `--cream` | `#fdf5e6` | Background section ấm |
| `--ivory` | `#faf7f0` | Background mặc định |
| `--badge` | `#f5c34b` | Banner CTA, highlight |
| `--danger` | `#d2463c` | Lỗi, "Đã hết" |

Fonts: **Fraunces** (display, serif có cá tính) + **Plus Jakarta Sans** (body) — load từ Google Fonts trong `globals.css`.

## Deploy lên Vercel

1. Push project lên GitHub
2. Vào [vercel.com/new](https://vercel.com/new), import repo
3. Vercel auto-detect Next.js — bấm Deploy
4. Xong

Hoặc dùng CLI:
```bash
npm i -g vercel
vercel
```

## Còn thiếu (nice-to-have)

- Responsive mobile (hiện desktop-only như yêu cầu ban đầu)
- Trang `/login`, `/signup`, `/orders` (đơn của tôi)
- Database/API thật — hiện dữ liệu hard-coded
- i18n (mới chỉ tiếng Việt)
- Loading & error states
