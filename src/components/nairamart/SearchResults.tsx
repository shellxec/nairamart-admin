'use client';

import { useNairamartStore, type Product } from '@/store/use-nairamart-store';
import { products } from '@/data/products';
import Image from 'next/image';

interface SearchResultsProps {
  visible: boolean;
  onClose: () => void;
}

export function SearchResults({ visible, onClose }: SearchResultsProps) {
  const { searchQuery, setSelectedProduct, addToRecentlyViewed } = useNairamartStore();

  if (!visible || !searchQuery.trim()) return null;

  const query = searchQuery.toLowerCase().trim();
  const filtered = products
    .filter((p) => p.name.toLowerCase().includes(query))
    .slice(0, 6);

  if (filtered.length === 0) return null;

  function handleSelect(product: Product) {
    addToRecentlyViewed(product);
    setSelectedProduct(product);
    onClose();
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-[#161612] border border-[#2a2a22] rounded-xl overflow-hidden shadow-2xl z-50">
      <div className="max-h-96 overflow-y-auto">
        {filtered.map((product) => (
          <button
            key={product.id}
            onClick={() => handleSelect(product)}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#1a1a16] transition-colors text-left"
          >
            <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-[#0E0E0B]">
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white truncate">{product.name}</p>
              <p className="text-sm font-bold text-[#AFE607]">
                ₦{product.price_ngn.toLocaleString()}
              </p>
            </div>
            {product.discount_percent > 0 && (
              <span className="text-xs text-[#B0B0B0] shrink-0">
                -{product.discount_percent}%
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}