'use client';

import { products } from '@/data/products';
import { useNairamartStore } from '@/store/use-nairamart-store';
import { ProductCard } from './ProductCard';
import { PackageX } from 'lucide-react';

export function ProductGrid() {
  const { selectedCategory, searchQuery } = useNairamartStore();

  const filtered = products.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase().trim());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 pb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white">
          {selectedCategory === 'All' ? 'All Products' : selectedCategory}
        </h2>
        <span className="text-sm text-[#B0B0B0]">
          Showing {filtered.length} product{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <PackageX className="size-16 text-[#2a2a22] mb-4" />
          <h3 className="text-lg font-semibold text-white mb-1">No products found</h3>
          <p className="text-sm text-[#B0B0B0]">
            Try changing your search or category filter
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}