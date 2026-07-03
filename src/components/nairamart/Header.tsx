'use client';

import { Search, ShoppingCart, Heart, Store } from 'lucide-react';
import { useNairamartStore } from '@/store/use-nairamart-store';
import { SearchResults } from './SearchResults';
import { useState, useRef, useEffect } from 'react';

export function Header() {
  const { getCartCount, setCartOpen, wishlist, setSearchQuery, searchQuery } = useNairamartStore();
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const cartCount = getCartCount();
  const wishlistCount = wishlist.length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearch(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[#0E0E0B] border-b border-[#2a2a22]">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        {/* Logo */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-lg">🛒</span>
          <h1 className="text-[#AFE607] font-extrabold text-xl uppercase tracking-tight">
            Nairamart
          </h1>
        </div>

        {/* Search Bar */}
        <div className="flex-1 relative" ref={searchRef}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#B0B0B0]" />
            <input
              type="text"
              placeholder="Search for products, brands, and more..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearch(true);
              }}
              onFocus={() => setShowSearch(true)}
              className="w-full bg-[#161612] border border-[#2a2a22] rounded-full pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-[#B0B0B0] focus:outline-none focus:border-[#AFE607]/50 focus:ring-1 focus:ring-[#AFE607]/30 transition-colors"
            />
          </div>
          <SearchResults visible={showSearch} onClose={() => setShowSearch(false)} />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button className="hidden sm:inline-flex items-center gap-1.5 border border-[#AFE607] text-[#AFE607] text-xs font-medium rounded-full px-3 py-2 hover:bg-[#AFE607]/10 transition-colors">
            <Store className="size-3.5" />
            Sell on Nairamart
          </button>

          {/* Wishlist */}
          <button className="relative p-2 rounded-full hover:bg-[#161612] transition-colors">
            <Heart className="size-5 text-[#B0B0B0]" />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#AFE607] text-black text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                {wishlistCount > 99 ? '99+' : wishlistCount}
              </span>
            )}
          </button>

          {/* Cart */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative p-2 rounded-full hover:bg-[#161612] transition-colors"
          >
            <ShoppingCart className="size-5 text-[#B0B0B0]" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#AFE607] text-black text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}