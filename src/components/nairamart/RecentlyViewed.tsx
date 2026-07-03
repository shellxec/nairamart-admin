'use client';

import Image from 'next/image';
import { useNairamartStore } from '@/store/use-nairamart-store';

export function RecentlyViewed() {
  const { recentlyViewed, setSelectedProduct, addToRecentlyViewed } = useNairamartStore();

  if (recentlyViewed.length === 0) return null;

  function handleClick(product: typeof recentlyViewed[0]) {
    addToRecentlyViewed(product);
    setSelectedProduct(product);
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-lg font-bold text-white mb-3">Recently Viewed</h2>
      <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar pb-2">
        {recentlyViewed.map((product) => (
          <button
            key={product.id}
            onClick={() => handleClick(product)}
            className="shrink-0 w-32 bg-[#161612] rounded-xl overflow-hidden border border-[#2a2a22] hover:border-[#AFE607]/30 transition-all text-left group"
          >
            <div className="relative aspect-square bg-[#0E0E0B]">
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                unoptimized
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-2">
              <p className="text-[11px] text-white line-clamp-2 leading-snug">
                {product.name}
              </p>
              <p className="text-xs font-bold text-[#AFE607] mt-1">
                ₦{product.price_ngn.toLocaleString()}
              </p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}