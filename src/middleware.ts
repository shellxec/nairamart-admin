// Security middleware for Nairamart
// OWASP Top 10 mitigations applied

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rate limiting store (in-memory for demo; use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const RATE_LIMIT_MAX = 100; // requests per window

// Blocked IPs (in-memory for demo; use database in production)
const blockedIPs = new Set<string>();

// Paths that require rate limiting
const SENSITIVE_PATHS = ["/api/", "/admin/"];

function isRateLimited(ip: string, path: string): boolean {
  const isSensitive = SENSITIVE_PATHS.some((p) => path.startsWith(p));
  if (!isSensitive) return false;

  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  record.count++;
  if (record.count > RATE_LIMIT_MAX) {
    return true;
  }
  return false;
}

// Sanitize input to prevent XSS
function sanitizeHeaders(headers: Headers): Headers {
  const sanitized = new Headers(headers);
  // Remove potentially dangerous headers
  sanitized.delete("x-forwarded-host");
  sanitized.delete("x-forwarded-server");
  return sanitized;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() 
    || request.headers.get("x-real-ip") 
    || "unknown";

  // Check blocked IPs
  if (blockedIPs.has(ip)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  // Rate limiting for sensitive paths
  if (isRateLimited(ip, pathname)) {
    return new NextResponse("Too Many Requests", {
      status: 429,
      headers: { "Retry-After": "60" },
    });
  }

  // Security headers
  const response = NextResponse.next();
  
  // Prevent MIME type sniffing
  response.headers.set("X-Content-Type-Options", "nosniff");
  
  // Prevent clickjacking
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  
  // HSTS
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );
  
  // Referrer policy
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  
  // Permissions policy
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), interest-cohort=()"
  );

  // Prevent browsers from sending Referer in cross-origin requests
  response.headers.set("X-XSS-Protection", "1; mode=block");

  // Nonce-based CSP would go here in production with proper setup
  // For now, basic CSP
  if (pathname.startsWith("/api/")) {
    response.headers.set(
      "Content-Security-Policy",
      "default-src 'none'; frame-ancestors 'none'"
    );
  }

  // Remove server identification
  response.headers.delete("x-powered-by");

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|logo.svg).*)"],
};