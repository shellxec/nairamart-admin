# Nairamart — Nigeria's Multi-Vendor Marketplace Platform

> A Temu-clone e-commerce storefront with enterprise-grade admin dashboard, sub-admin portal, and seller dashboard. Built with Next.js 16, TypeScript, Tailwind CSS 4, and shadcn/ui.

![Nairamart](public/logo.svg)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation Guides](#installation-guides)
  - [Ubuntu / Debian](#ubuntu--debian)
  - [Fedora / RHEL](#fedora--rhel)
  - [CentOS Stream](#centos-stream)
  - [Kali Linux](#kali-linux)
  - [Docker](#docker)
  - [macOS](#macos)
  - [Windows (WSL2)](#windows-wsl2)
- [Running the App](#running-the-app)
- [Environment Variables](#environment-variables)
- [Portals](#portals)
- [Security](#security)
- [Deployment](#deployment)
- [License](#license)

---

## Overview

Nairamart is a full-featured multi-vendor marketplace platform designed for the Nigerian market. It includes:

1. **Customer Storefront** — A Temu-style dark-themed storefront with 222+ products in Nigerian Naira (₦), featuring flash sales, a spin-to-win wheel, social proof, cart, wishlist, search, and category filtering.

2. **Super Admin Portal** — An enterprise-grade dashboard with 18 modules: analytics dashboard, seller management, product moderation, order management, customer management, category/brand management, coupon system, commission management, finance dashboard, payment management, logistics management, notification center, CMS, review moderation, reports & analytics, audit logs, and RBAC roles & permissions.

3. **Sub-Admin Portal** — A permission-scoped portal for staff roles (Customer Support, Marketing, Content Moderation, Finance), showing only modules relevant to each role's permissions.

4. **Seller Dashboard** — A complete merchant portal with 11 modules: store dashboard, product management, inventory tracking, order management, messaging, store profile, finance, marketing tools, review management, analytics, and settings.

---

## Features

### Customer Storefront
- **222+ products** across 11 categories (Electronics, Phones & Tablets, Fashion, Home & Kitchen, Fresh Fruits, Gym & Sports, Baby Products, Auto Parts, Beauty & Health, Gaming, Computers)
- **Nigerian Naira (₦)** pricing with realistic marketplace prices
- **Flash sale countdown timers** on high-discount items
- **Spin-to-win discount wheel** for first-time visitors
- **Full-text product search** with live dropdown results
- **Category filtering** with horizontal scrollable pills
- **Shopping cart** with quantity controls, delivery fee calculation, and slide-out sidebar
- **Wishlist** with heart toggle and counter badge
- **Product detail modal** with quantity selector, installment pricing, and "People Also Bought" suggestions
- **Recently viewed products** horizontal scroll
- **Social proof** ("X people bought this recently")
- **Responsive design** — optimized for mobile (375px) to ultrawide (1920px+)
- **Hero banner carousel** with auto-rotation and manual navigation
- **Referral banner** with CTA

### Super Admin Portal (18 Modules)
| Module | Capabilities |
|--------|-------------|
| Dashboard | Revenue KPIs, revenue chart, top sellers, category breakdown, recent activity |
| Seller Management | List/filter/search sellers, KYC status, approval workflow, suspend/ban |
| Product Moderation | Pending/reviewed queue, approve/reject/flag/revision workflow, image preview |
| Order Management | Full order lifecycle, status filters, date filtering, tracking numbers |
| Customer Management | Customer list, spend tracking, complaint tracking, blacklist management |
| Category Management | Category CRUD, product counts, status toggling |
| Brand Management | Brand directory with approval status, product counts |
| Coupon Management | Create/view coupons, copy codes, usage tracking, status badges |
| Commission Management | Default rates, category-specific rates, holiday rates, seller overrides |
| Finance Dashboard | Revenue tracking, pending payouts, monthly breakdown, transaction stats |
| Payment Management | Transaction list, payment methods, status tracking, success rates |
| Logistics | Shipping partners, delivery zones, pricing tiers, performance metrics |
| Notifications | System-wide notification management, type filtering, read/unread |
| CMS | Banner management, page management, FAQ management, policy management |
| Review Moderation | Customer review queue, approve/delete, rating distribution, reply to reviews |
| Reports & Analytics | Multi-report views (Revenue, Products, Sellers, Customers, Orders), export capability |
| Audit Logs | Full action trail with user, role, module, IP, device, timestamp tracking |
| Roles & Permissions | RBAC system with module-level and action-level permissions, 5 system roles |

### Sub-Admin Portal
- **Customer Support** — Orders, Customers, Reviews, Notifications
- **Marketing Staff** — Coupons, CMS, Notifications, Reports
- **Content Moderator** — Products, Reviews, Sellers (view-only)
- **Finance Staff** — Finance, Payments, Commission, Reports

### Seller Dashboard (11 Modules)
- **Dashboard** — Revenue, orders, products, rating overview with charts
- **Products** — Product CRUD with status workflow (Draft → Pending → Approved → Published)
- **Inventory** — Stock levels, low-stock alerts, reorder management
- **Orders** — Order processing with status filters and date range
- **Messages** — Chat interface with conversation list and message history
- **Store Profile** — Store info, logo, description, policies, return address
- **Finance** — Earnings, payouts, transaction history, withdrawal requests
- **Marketing** — Coupon creation, flash sale applications, promotional tools
- **Reviews** — Customer reviews with star ratings, reply capability, sentiment overview
- **Analytics** — Visitor trends, top products, traffic sources, conversion rates
- **Settings** — Password change, bank details, notification preferences, 2FA, VAT

---

## Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Framework** | Next.js (Turbopack) | 16.1.x |
| **Language** | TypeScript | 5.x |
| **Styling** | Tailwind CSS | 4.x |
| **UI Components** | shadcn/ui (New York) | Latest |
| **State Management** | Zustand | 5.x |
| **Animations** | Framer Motion | 12.x |
| **Icons** | Lucide React | 0.525.x |
| **Charts** | Recharts (via shadcn) | 2.x |
| **Forms** | React Hook Form + Zod | 7.x / 4.x |
| **Database ORM** | Prisma | 6.x |
| **Package Manager** | Bun | Latest |
| **CSS Animations** | tw-animate-css | 1.x |
| **Font** | Inter (via next/font/google) | — |

### Design System
- **Dark Theme**: `#0E0E0B` (background), `#AFE607` (neon-lime accent), `#161612` (card)
- **Glassmorphism** effects on overlays and sidebars
- **Custom animations**: fade-in, slide-in, pulse-green, spin-wheel, count-up
- **Custom scrollbar** styling (5px, dark track, subtle thumb)

---

## Architecture

```
nairamart/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with Inter font
│   │   ├── page.tsx            # Admin SPA entry (client-side routing)
│   │   ├── globals.css         # Tailwind v4 + custom theme + animations
│   │   └── api/route.ts        # API health check
│   ├── components/
│   │   ├── nairamart/          # Storefront components (12)
│   │   ├── admin/              # Admin shell + 29 module components
│   │   │   ├── super-admin/    # 18 super-admin modules
│   │   │   └── seller/         # 11 seller modules
│   │   └── ui/                 # 50+ shadcn/ui primitives
│   ├── store/
│   │   ├── use-nairamart-store.ts  # Zustand: cart, wishlist, recently viewed, UI
│   │   └── admin-store.ts         # Zustand: auth, RBAC, navigation, notifications
│   ├── data/
│   │   ├── products.ts         # 222 products with ₦ pricing
│   │   └── admin-data.ts       # Mock data for all admin modules
│   ├── lib/
│   │   ├── utils.ts            # cn() utility (clsx + tailwind-merge)
│   │   ├── db.ts               # Prisma client
│   │   └── security.ts         # XSS prevention, URL sanitization, CSRF, validation
│   ├── hooks/
│   │   ├── use-mobile.ts       # Mobile viewport detection
│   │   └── use-toast.ts        # Toast notification system
│   └── middleware.ts           # Security middleware (rate limiting, headers)
├── public/
│   ├── logo.svg                # Nairamart logo
│   └── robots.txt              # Search engine directives
├── prisma/
│   └── schema.prisma           # Database schema (extensible)
└── config files                # next.config.ts, tailwind.config.ts, tsconfig.json, etc.
```

### State Management
- **Customer Store** (`use-nairamart-store`): Cart (localStorage-persisted), Wishlist (localStorage-persisted), Recently Viewed (localStorage-persisted), UI state (cart open, selected product, spin wheel, search, category)
- **Admin Store** (`admin-store`): Authentication, Role-based navigation, Sidebar collapse, Notifications, Global search, Theme toggle, RBAC permission checks

### RBAC Permission System
```typescript
type Permission = 'view' | 'create' | 'edit' | 'delete' | 'approve' | 'export' | 'manage';

// 5 system roles with module-scoped permissions:
// 1. Super Admin    — Full unrestricted access (all 18 modules × all actions)
// 2. Customer Support — Orders, Customers, Reviews, Notifications (limited actions)
// 3. Marketing Staff  — Coupons, CMS, Notifications, Reports (limited actions)
// 4. Content Moderator — Products, Reviews, Sellers view (limited actions)
// 5. Finance Staff   — Finance, Payments, Commission, Reports (limited actions)
```

---

## Prerequisites

- **Bun** >= 1.0 (recommended) or Node.js >= 18
- **Git** for version control
- A terminal / shell

---

## Installation Guides

### Ubuntu / Debian

```bash
# 1. Install system dependencies
sudo apt update && sudo apt install -y curl unzip git build-essential

# 2. Install Bun
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc

# 3. Clone the repository
git clone https://github.com/shellxec/nairamart.git
cd nairamart

# 4. Install dependencies
bun install

# 5. Copy environment file
cp .env.example .env
# Edit .env with your configuration (see Environment Variables section)

# 6. (Optional) Set up database
bun run db:generate
bun run db:push

# 7. Build for production
bun run build

# 8. Start the production server
bun run start
# Server runs on http://localhost:3000
```

### Fedora / RHEL

```bash
# 1. Install system dependencies
sudo dnf install -y curl unzip git gcc gcc-c++ make

# 2. Install Bun
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc

# 3. Clone the repository
git clone https://github.com/shellxec/nairamart.git
cd nairamart

# 4. Install dependencies
bun install

# 5. Copy environment file
cp .env.example .env

# 6. (Optional) Set up database
bun run db:generate
bun run db:push

# 7. Build and start
bun run build
bun run start
```

### CentOS Stream

```bash
# 1. Install system dependencies
sudo dnf install -y curl unzip git gcc gcc-c++ make

# 2. Install Bun
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc

# 3. Enable EPEL (may be needed for some build tools)
sudo dnf install -y epel-release

# 4. Clone the repository
git clone https://github.com/shellxec/nairamart.git
cd nairamart

# 5. Install dependencies
bun install

# 6. Copy environment file
cp .env.example .env

# 7. Build and start
bun run build
bun run start
```

### Kali Linux

```bash
# 1. Update system
sudo apt update && sudo apt full-upgrade -y

# 2. Install system dependencies
sudo apt install -y curl unzip git build-essential

# 3. Install Bun
curl -fsSL https://bun.sh/install | bash
source ~/.zshrc  # or ~/.bashrc if using bash

# 4. Clone the repository
git clone https://github.com/shellxec/nairamart.git
cd nairamart

# 5. Install dependencies
bun install

# 6. Copy environment file
cp .env.example .env

# 7. Build and start
bun run build
bun run start
```

### Docker

```bash
# 1. Clone the repository
git clone https://github.com/shellxec/nairamart.git
cd nairamart

# 2. Build the Docker image
docker build -t nairamart:latest .

# 3. Run the container
docker run -d \
  --name nairamart \
  -p 3000:3000 \
  -e NODE_ENV=production \
  --restart unless-stopped \
  nairamart:latest

# Or using Docker Compose
# docker compose up -d
```

#### Dockerfile (included)

```dockerfile
FROM oven/bun:1 AS base
WORKDIR /app

# Install dependencies
FROM base AS deps
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Build
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run build

# Production
FROM base AS runner
ENV NODE_ENV=production
WORKDIR /app

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["bun", "server.js"]
```

### macOS

```bash
# 1. Install Homebrew (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 2. Install Bun
brew install oven-sh/bun/bun

# 3. Clone and install
git clone https://github.com/shellxec/nairamart.git
cd nairamart
bun install
cp .env.example .env

# 4. Build and start
bun run build
bun run start
```

### Windows (WSL2)

```powershell
# In WSL2 Ubuntu terminal:

# 1. Install Bun
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc

# 2. Clone and install
git clone https://github.com/shellxec/nairamart.git
cd nairamart
bun install
cp .env.example .env

# 3. Build and start
bun run build
bun run start

# Access at http://localhost:3000 from Windows browser
```

---

## Running the App

### Development Mode
```bash
bun run dev
# Opens on http://localhost:3000 with Turbopack hot reload
```

### Production Mode
```bash
bun run build    # Creates optimized standalone build
bun run start    # Runs on http://localhost:3000
```

### Reverse Proxy (Caddy)
A `Caddyfile` is included for production deployment with automatic HTTPS:
```bash
caddy run
```

---

## Environment Variables

Copy `.env.example` to `.env` and configure:

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | Prisma database connection string | `file:./db/nairamart.db` |
| `NODE_ENV` | Environment (`development` / `production`) | `production` |
| `NEXT_PUBLIC_APP_URL` | Public URL of the app | `https://nairamart.ng` |
| `NEXTAUTH_URL` | NextAuth callback URL | — |
| `NEXTAUTH_SECRET` | NextAuth signing secret | — |
| `REDIS_URL` | Redis for rate limiting (production) | — |
| `PAYSTACK_PUBLIC_KEY` | Paystack payment gateway public key | — |
| `PAYSTACK_SECRET_KEY` | Paystack payment gateway secret key | — |
| `S3_BUCKET` | AWS S3 bucket for image uploads | — |
| `S3_REGION` | AWS S3 region (af-south-1 for Lagos) | — |

> ⚠️ **NEVER commit `.env` to version control.** The `.gitignore` excludes it.

---

## Portals

The app uses client-side routing within a single page. The landing page shows a **role selection screen**:

| Portal | Access Level | Description |
|--------|-------------|-------------|
| **Super Admin** | Full unrestricted | Access to all 18 admin modules |
| **Customer Support** | Limited (4 modules) | Orders, Customers, Reviews, Notifications |
| **Marketing Staff** | Limited (4 modules) | Coupons, CMS, Notifications, Reports |
| **Content Moderator** | Limited (3 modules) | Products, Reviews, Sellers (view) |
| **Finance Staff** | Limited (4 modules) | Finance, Payments, Commission, Reports |
| **Seller Portal** | Own store only | 11 seller-specific modules |

---

## Security

Nairamart implements defense-in-depth security based on **OWASP Top 10**:

| OWASP Category | Mitigation |
|---------------|------------|
| **A01 - Broken Access Control** | RBAC with module-level + action-level permissions; middleware enforces route protection |
| **A02 - Cryptographic Failures** | HSTS headers; no sensitive data in localStorage; environment secrets |
| **A03 - Injection** | Input sanitization utility (`lib/security.ts`); SQL injection pattern detection; parameterized Prisma queries |
| **A04 - Insecure Design** | Rate limiting on sensitive endpoints (100 req/min); account lockout configuration |
| **A05 - Security Misconfiguration** | Security headers (CSP, X-Frame-Options, X-Content-Type-Options, HSTS, Referrer-Policy); `poweredByHeader: false` |
| **A06 - Vulnerable Components** | Locked dependency versions in `bun.lock`; regular audit via `bun audit` |
| **A07 - Auth Failures** | Password strength validation (8+ chars, mixed case, number, special char); CSRF token generation |
| **A08 - Data Integrity** | Strict CSP policy; no `dangerouslySetInnerHTML`; no inline script injection |
| **A09 - Logging Failures** | Audit log system tracking all admin actions with IP, device, and timestamp |
| **A10 - SSRF** | URL sanitization utility blocking private IPs and non-HTTP protocols |

### Security Headers
```
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
X-XSS-Protection: 1; mode=block
Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' ...
```

### Security Files
- `src/middleware.ts` — Rate limiting, security headers, IP blocking
- `src/lib/security.ts` — XSS prevention, URL sanitization, CSRF tokens, input validation
- `public/robots.txt` — Blocks crawlers from `/api/` and `/admin/`
- `.gitignore` — Prevents `.env` and database files from being committed

---

## Deployment

### Standalone (Bun)
```bash
bun run build
bun run start  # Runs on port 3000
```

### Docker
```bash
docker build -t nairamart .
docker run -d -p 3000:3000 nairamart
```

### Behind Caddy (auto-HTTPS)
```bash
caddy run  # Uses included Caddyfile
```

### Systemd Service
```ini
# /etc/systemd/system/nairamart.service
[Unit]
Description=Nairamart Marketplace
After=network.target

[Service]
Type=simple
User=nairamart
WorkingDirectory=/opt/nairamart
ExecStart=/home/nairamart/.bun/bin/bun run start
Restart=always
RestartSec=5
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

---

## License

Private — All rights reserved. Not licensed for redistribution.

---

Built with ❤️ for the Nigerian e-commerce ecosystem.