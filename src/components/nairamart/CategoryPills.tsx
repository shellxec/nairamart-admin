'use client';

import { categories } from '@/data/products';
import { useNairamartStore } from '@/store/use-nairamart-store';

export function CategoryPills() {
  const { selectedCategory, setSelectedCategory } = useNairamartStore();

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-[#AFE607] text-black font-bold'
                : 'bg-[#161612] text-[#B0B0B0] border border-[#2a2a22] hover:border-[#AFE607]/30 hover:text-white'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}