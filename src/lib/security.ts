/**
 * Security utilities for Nairamart
 * OWASP Top 10 defense-in-depth measures
 */

// Sanitize string input to prevent XSS
export function sanitizeInput(input: string): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/[<&>"']/g, (char) => {
      const escapeMap: Record<string, string> = {
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&#x27;",
      };
      return escapeMap[char] || char;
    })
    .trim();
}

// Validate and sanitize URL to prevent SSRF
export function sanitizeUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    // Only allow https: and http: protocols
    if (!["https:", "http:"].includes(parsed.protocol)) return null;
    // Block internal/private IPs
    const hostname = parsed.hostname;
    if (
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname === "0.0.0.0" ||
      hostname.startsWith("192.168.") ||
      hostname.startsWith("10.") ||
      hostname.startsWith("172.") ||
      hostname === "[::1]"
    ) {
      return null;
    }
    return url;
  } catch {
    return null;
  }
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

// Validate Nigerian phone number
export function isValidNigerianPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-+]/g, "");
  return /^234\d{10}$/.test(cleaned) || /^0\d{10}$/.test(cleaned);
}

// Validate price in Naira (positive number, max 100M)
export function isValidNairaPrice(price: number): boolean {
  return typeof price === "number" && price > 0 && price <= 100_000_000;
}

// Prevent SQL injection patterns (for raw queries)
export function hasSqlInjection(input: string): boolean {
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER|CREATE|EXEC|EXECUTE)\b)/i,
    /(--|;|\/\*|\*\/|xp_|sp_)/i,
    /(\b(OR|AND)\b\s+\d+\s*=\s*\d+)/i,
    /('\s*(OR|AND)\s+.*=)/i,
  ];
  return sqlPatterns.some((pattern) => pattern.test(input));
}

// Generate a CSRF token (simplified - use dedicated library in production)
export function generateCSRFToken(): string {
  const array = new Uint8Array(32);
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(array);
  } else {
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
  }
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
    ""
  );
}

// Validate password strength
export function validatePasswordStrength(
  password: string
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (password.length < 8) errors.push("Password must be at least 8 characters");
  if (!/[A-Z]/.test(password)) errors.push("Must contain an uppercase letter");
  if (!/[a-z]/.test(password)) errors.push("Must contain a lowercase letter");
  if (!/[0-9]/.test(password)) errors.push("Must contain a number");
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password))
    errors.push("Must contain a special character");
  return { valid: errors.length === 0, errors };
}

// Rate limit configuration
export const RATE_LIMIT = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 100,
  maxLoginAttempts: 5,
  lockoutDurationMs: 15 * 60 * 1000, // 15 minutes
} as const;