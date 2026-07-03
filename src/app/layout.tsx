import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nairamart – Nigeria's #1 Online Marketplace",
  description: "Shop thousands of products at unbeatable prices. Electronics, Fashion, Home & Kitchen, Phones, and more – all in Nigerian Naira (₦).",
  keywords: ["Nairamart", "Nigeria", "e-commerce", "marketplace", "Naira", "discounts", "flash sale"],
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🛒</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased bg-nm-dark text-white min-h-screen`} style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}