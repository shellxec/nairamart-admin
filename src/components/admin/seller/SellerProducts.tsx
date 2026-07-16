'use client';

import { useState } from 'react';
import {
  Search,
  Plus,
  Upload,
  MoreVertical,
  Edit3,
  Copy,
  Archive,
  Trash2,
  RotateCcw,
  Package,
  CheckCircle,
  Clock,
  XCircle,
} from 'lucide-react';

// ─── Mock Data ────────────────────────────────────────────────────
const statusStats = [
  { label: 'All Products', count: 89, color: 'text-white' },
  { label: 'Live', count: 72, color: 'text-emerald-400' },
  { label: 'Pending Approval', count: 3, color: 'text-amber-400' },
  { label: 'Rejected', count: 2, color: 'text-red-400' },
  { label: 'Drafts', count: 8, color: 'text-nm-text-dim' },
  { label: 'Archived', count: 4, color: 'text-nm-muted' },
];

const tabs = ['All', 'Live', 'Pending', 'Rejected', 'Draft', 'Archived'] as const;
type TabType = (typeof tabs)[number];

const statusColorMap: Record<string, string> = {
  Live: 'bg-emerald-500/10 text-emerald-400',
  Pending: 'bg-amber-500/10 text-amber-400',
  Rejected: 'bg-red-500/10 text-red-400',
  Draft: 'bg-violet-500/10 text-violet-400',
  Archived: 'bg-nm-card-hover text-nm-muted',
};

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  status: TabType;
  category: string;
  date: string;
  image: string;
  rejectionReason?: string;
}

const products: Product[] = [
  { id: '1', name: 'iPhone 14 Pro Max 256GB', price: 750000, stock: 24, status: 'Live', category: 'Phones', date: 'Jan 10, 2025', image: 'https://picsum.photos/seed/iphone14/300/300' },
  { id: '2', name: 'Samsung Galaxy S23 Ultra', price: 580000, stock: 18, status: 'Live', category: 'Phones', date: 'Jan 8, 2025', image: 'https://picsum.photos/seed/samsung23/300/300' },
  { id: '3', name: 'AirPods Pro 2nd Gen', price: 145000, stock: 5, status: 'Live', category: 'Audio', date: 'Jan 5, 2025', image: 'https://picsum.photos/seed/airpods/300/300' },
  { id: '4', name: 'MacBook Air M2 13"', price: 850000, stock: 8, status: 'Live', category: 'Laptops', date: 'Dec 28, 2024', image: 'https://picsum.photos/seed/macbook/300/300' },
  { id: '5', name: 'Apple Watch Series 9', price: 320000, stock: 12, status: 'Pending', category: 'Wearables', date: 'Jan 12, 2025', image: 'https://picsum.photos/seed/applewatch/300/300' },
  { id: '6', name: 'Sony WH-1000XM5', price: 210000, stock: 0, status: 'Rejected', category: 'Audio', date: 'Jan 11, 2025', image: 'https://picsum.photos/seed/sonyxm5/300/300', rejectionReason: 'Product description lacks required specifications. Please include frequency response, driver size, and battery life details.' },
  { id: '7', name: 'JBL Flip 6 Speaker', price: 85000, stock: 15, status: 'Rejected', category: 'Audio', date: 'Jan 9, 2025', image: 'https://picsum.photos/seed/jblflip/300/300', rejectionReason: 'Inaccurate pricing. Market price for this product is significantly lower.' },
  { id: '8', name: 'iPad Air M1', price: 420000, stock: 0, status: 'Draft', category: 'Tablets', date: 'Jan 13, 2025', image: 'https://picsum.photos/seed/ipadair/300/300' },
  { id: '9', name: 'Google Pixel 8 Pro', price: 520000, stock: 10, status: 'Draft', category: 'Phones', date: 'Jan 7, 2025', image: 'https://picsum.photos/seed/pixel8/300/300' },
  { id: '10', name: 'Galaxy Buds 2 Pro', price: 65000, stock: 0, status: 'Archived', category: 'Audio', date: 'Nov 20, 2024', image: 'https://picsum.photos/seed/galaxybuds/300/300' },
  { id: '11', name: 'Dell XPS 15', price: 980000, stock: 3, status: 'Live', category: 'Laptops', date: 'Dec 15, 2024', image: 'https://picsum.photos/seed/dellxps/300/300' },
  { id: '12', name: 'Razer BlackWidow V4', price: 175000, stock: 0, status: 'Pending', category: 'Accessories', date: 'Jan 14, 2025', image: 'https://picsum.photos/seed/razerkb/300/300' },
];

export default function SellerProducts() {
  const [activeTab, setActiveTab] = useState<TabType>('All');
  const [search, setSearch] = useState('');
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const filtered = products.filter((p) => {
    const matchTab = activeTab === 'All' || p.status === activeTab;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Products</h1>
          <p className="text-sm text-nm-muted mt-1">Manage your product listings</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-[#AFE607] text-black font-medium rounded-xl px-4 py-2 text-sm flex items-center gap-2 hover:bg-[#9dd006] transition-colors">
            <Plus size={16} />
            Add Product
          </button>
          <button className="ghost-btn border border-nm-border text-nm-text-dim hover:text-white hover:bg-nm-card-hover rounded-xl px-4 py-2 text-sm flex items-center gap-2 transition-colors">
            <Upload size={16} />
            Import CSV
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {statusStats.map((s) => (
          <div key={s.label} className="bg-nm-card rounded-2xl border border-nm-border p-4 text-center">
            <p className={`text-xl font-bold ${s.color}`}>{s.count}</p>
            <p className="text-xs text-nm-muted mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative flex-1 w-full sm:max-w-xs">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-nm-muted" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-nm-input border border-nm-border rounded-xl pl-9 pr-3 py-2 text-sm text-white placeholder:text-nm-muted focus:outline-none focus:border-[#AFE607]/40"
          />
        </div>
        <div className="flex gap-1 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-[#AFE607]/15 text-[#AFE607]'
                  : 'text-nm-muted hover:text-white hover:bg-nm-card-hover'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((product) => (
          <div key={product.id} className="bg-nm-card rounded-2xl border border-nm-border overflow-hidden group">
            {/* Image */}
            <div className="relative h-44 bg-nm-input overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className={`absolute top-3 left-3 rounded-lg px-2.5 py-1 text-xs font-medium ${statusColorMap[product.status]}`}>
                {product.status}
              </span>
              <div className="absolute top-3 right-3">
                <button
                  onClick={() => setOpenMenu(openMenu === product.id ? null : product.id)}
                  className="w-8 h-8 rounded-lg bg-nm-dark/60 backdrop-blur-sm flex items-center justify-center text-nm-text-dim hover:text-white transition-colors"
                >
                  <MoreVertical size={14} />
                </button>
                {openMenu === product.id && (
                  <div className="absolute right-0 top-10 bg-[#1C1C24] border border-nm-border rounded-xl shadow-xl py-1 z-10 min-w-[140px]">
                    <button className="w-full text-left px-3 py-2 text-sm text-nm-text-dim hover:text-white hover:bg-nm-card-hover flex items-center gap-2 transition-colors">
                      <Edit3 size={14} /> Edit
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm text-nm-text-dim hover:text-white hover:bg-nm-card-hover flex items-center gap-2 transition-colors">
                      <Copy size={14} /> Duplicate
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm text-nm-text-dim hover:text-white hover:bg-nm-card-hover flex items-center gap-2 transition-colors">
                      <Archive size={14} /> Archive
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-2 transition-colors">
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              <div>
                <h3 className="text-sm font-medium text-white line-clamp-1">{product.name}</h3>
                <p className="text-lg font-bold text-[#AFE607] mt-1">₦{product.price.toLocaleString()}</p>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-nm-muted">Stock: {product.stock > 0 ? product.stock : <span className="text-red-400">Out of stock</span>}</span>
                <span className="text-nm-muted">{product.category}</span>
              </div>

              <p className="text-xs text-nm-text-dim">{product.date}</p>

              {/* Rejection Reason */}
              {product.status === 'Rejected' && product.rejectionReason && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 space-y-2">
                  <p className="text-xs text-red-400 font-medium flex items-center gap-1">
                    <XCircle size={12} />
                    Rejection Reason:
                  </p>
                  <p className="text-xs text-red-300/80">{product.rejectionReason}</p>
                  <button className="text-xs text-nm-text-dim hover:text-white hover:bg-nm-card-hover rounded-lg px-3 py-1.5 flex items-center gap-1.5 transition-colors">
                    <RotateCcw size={12} />
                    Resubmit
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="bg-nm-card rounded-2xl border border-nm-border p-12 text-center">
          <Package size={40} className="mx-auto text-nm-muted mb-3" />
          <p className="text-nm-muted">No products found</p>
        </div>
      )}
    </div>
  );
}