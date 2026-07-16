'use client';

import { useState } from 'react';
import {
  Plus,
  Pencil,
  Power,
  Trash2,
  Monitor,
  Smartphone,
  Shirt,
  Home,
  Apple,
  Dumbbell,
  Baby,
  Car,
  Sparkles,
  Gamepad2,
  Laptop,
  TrendingUp,
  Package,
} from 'lucide-react';

interface Category {
  name: string;
  icon: React.ElementType;
  products: number;
  revenue: number;
  growth: number;
  subcategories: string[];
  color: string;
}

const categories: Category[] = [
  { name: 'Electronics', icon: Monitor, products: 12450, revenue: 285000000, growth: 18.5, subcategories: ['TVs & Displays', 'Audio', 'Cameras'], color: 'bg-emerald-500/10 text-emerald-400' },
  { name: 'Phones & Tablets', icon: Smartphone, products: 9820, revenue: 178000000, growth: 12.3, subcategories: ['Smartphones', 'Tablets', 'Accessories'], color: 'bg-blue-500/10 text-blue-400' },
  { name: 'Fashion', icon: Shirt, products: 8650, revenue: 145000000, growth: 9.2, subcategories: ["Men's Wear", "Women's Wear", 'Shoes'], color: 'bg-pink-500/10 text-pink-400' },
  { name: 'Home & Kitchen', icon: Home, products: 6340, revenue: 112000000, growth: 8.7, subcategories: ['Appliances', 'Furniture', 'Decor'], color: 'bg-amber-500/10 text-amber-400' },
  { name: 'Fresh Fruits', icon: Apple, products: 2120, revenue: 45000000, growth: 24.3, subcategories: ['Tropical', 'Seasonal', 'Fruit Boxes'], color: 'bg-green-500/10 text-green-400' },
  { name: 'Gym & Sports', icon: Dumbbell, products: 3210, revenue: 45000000, growth: 15.4, subcategories: ['Equipment', 'Sportswear', 'Supplements'], color: 'bg-orange-500/10 text-orange-400' },
  { name: 'Baby Products', icon: Baby, products: 2870, revenue: 38000000, growth: 9.8, subcategories: ['Diapers & Care', 'Baby Food', 'Toys'], color: 'bg-cyan-500/10 text-cyan-400' },
  { name: 'Auto Parts', icon: Car, products: 1540, revenue: 52000000, growth: 6.2, subcategories: ['Car Parts', 'Motorcycle', 'Accessories'], color: 'bg-red-500/10 text-red-400' },
  { name: 'Beauty & Health', icon: Sparkles, products: 5890, revenue: 89000000, growth: 22.1, subcategories: ['Skincare', 'Makeup', 'Hair Care'], color: 'bg-purple-500/10 text-purple-400' },
  { name: 'Gaming', icon: Gamepad2, products: 1780, revenue: 32000000, growth: 19.8, subcategories: ['Consoles', 'Games', 'Accessories'], color: 'bg-violet-500/10 text-violet-400' },
  { name: 'Computers', icon: Laptop, products: 3450, revenue: 98000000, growth: 14.5, subcategories: ['Laptops', 'Desktops', 'Components'], color: 'bg-teal-500/10 text-teal-400' },
];

export default function CategoryManagement() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-white text-2xl font-semibold">Category Management</h1>
          <p className="text-nm-muted text-sm mt-1">Organize marketplace categories and subcategories</p>
        </div>
        <button className="flex items-center gap-2 bg-[#AFE607] text-black font-medium rounded-xl px-4 py-2 text-sm hover:bg-[#9ed006] transition-colors">
          <Plus size={16} />
          Add Category
        </button>
      </div>

      {/* Category Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.name}
              className="bg-nm-card rounded-2xl border border-nm-border p-5 hover:border-nm-border-light transition-colors"
            >
              {/* Top: Icon + Name */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl ${cat.color} flex items-center justify-center`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{cat.name}</h3>
                    <div className="flex items-center gap-1.5 text-nm-text-dim text-xs mt-0.5">
                      <Package size={12} />
                      <span>{cat.products.toLocaleString()} products</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Revenue + Growth */}
              <div className="flex items-end justify-between mb-4">
                <div>
                  <p className="text-nm-muted text-xs">Revenue</p>
                  <p className="text-white text-lg font-semibold">₦{(cat.revenue / 1000000).toFixed(0)}M</p>
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${cat.growth >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  <TrendingUp size={14} className={cat.growth >= 0 ? '' : 'rotate-180'} />
                  <span>{cat.growth}%</span>
                </div>
              </div>

              {/* Subcategory Pills */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {cat.subcategories.map((sub) => (
                  <span
                    key={sub}
                    className="text-xs text-nm-text-dim bg-nm-card-hover rounded-lg px-2.5 py-1"
                  >
                    {sub}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-3 border-t border-nm-border">
                <button
                  onClick={() => setOpenMenu(openMenu === cat.name ? null : cat.name)}
                  className="text-nm-text-dim hover:text-white hover:bg-nm-card-hover rounded-lg px-3 py-2 text-sm transition-colors"
                >
                  <Pencil size={14} />
                </button>
                <button className="text-nm-text-dim hover:text-amber-400 hover:bg-nm-card-hover rounded-lg px-3 py-2 text-sm transition-colors">
                  <Power size={14} />
                </button>
                <button className="text-nm-text-dim hover:text-red-400 hover:bg-nm-card-hover rounded-lg px-3 py-2 text-sm transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}