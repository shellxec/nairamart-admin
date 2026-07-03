'use client';

import { Instagram, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[#AFE607]/20 bg-[#0E0E0B]">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3">About</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-[#B0B0B0] hover:text-[#AFE607] transition-colors">
                  About Nairamart
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#B0B0B0] hover:text-[#AFE607] transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#B0B0B0] hover:text-[#AFE607] transition-colors">
                  Press
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-[#B0B0B0] hover:text-[#AFE607] transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#B0B0B0] hover:text-[#AFE607] transition-colors">
                  Live Chat
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#B0B0B0] hover:text-[#AFE607] transition-colors">
                  Email Support
                </a>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3">Policies</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-[#B0B0B0] hover:text-[#AFE607] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#B0B0B0] hover:text-[#AFE607] transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#B0B0B0] hover:text-[#AFE607] transition-colors">
                  Return Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3">Follow Us</h4>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="p-2 rounded-full border border-[#2a2a22] hover:border-[#AFE607]/50 hover:bg-[#161612] transition-colors"
              >
                <Instagram className="size-5 text-[#AFE607]" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full border border-[#2a2a22] hover:border-[#AFE607]/50 hover:bg-[#161612] transition-colors"
              >
                <Twitter className="size-5 text-[#AFE607]" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full border border-[#2a2a22] hover:border-[#AFE607]/50 hover:bg-[#161612] transition-colors"
              >
                <svg
                  className="size-5 text-[#AFE607]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.69a8.24 8.24 0 0 0 4.76 1.51V6.81a4.84 4.84 0 0 1-1-.12z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[#2a2a22] pt-6 text-center">
          <p className="text-xs text-[#888888]">
            © 2026 Nairamart – All prices in Nigerian Naira (₦)
          </p>
        </div>
      </div>
    </footer>
  );
}