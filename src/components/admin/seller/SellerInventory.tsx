'use client';

import { useState } from 'react';
import {
  Search,
  PackageCheck,
  AlertTriangle,
  PackageX,
  Edit3,
  RefreshCw,
} from 'lucide-react';

// ─── Mock Data ────────────────────────────────────────────────────
interface InventoryItem {
  sku: string;
  product: string;
  category: string;
  stock: number;
  reorderLevel: number;
  warehouse: string;
  lastUpdated: string;
}

const inventory: InventoryItem[] = [
  { sku: 'TZ-PH-001', product: 'iPhone 14 Pro Max 256GB', category: 'Phones', stock: 24, reorderLevel: 10, warehouse: 'Lagos Main', lastUpdated: 'Jan 15, 2025' },
  { sku: 'TZ-PH-002', product: 'Samsung Galaxy S23 Ultra', category: 'Phones', stock: 18, reorderLevel: 10, warehouse: 'Lagos Main', lastUpdated: 'Jan 14, 2025' },
  { sku: 'TZ-AU-001', product: 'AirPods Pro 2nd Gen', category: 'Audio', stock: 5, reorderLevel: 10, warehouse: 'Lagos Main', lastUpdated: 'Jan 13, 2025' },
  { sku: 'TZ-LT-001', product: 'MacBook Air M2 13"', category: 'Laptops', stock: 8, reorderLevel: 5, warehouse: 'Abuja Hub', lastUpdated: 'Jan 12, 2025' },
  { sku: 'TZ-WR-001', product: 'Apple Watch Series 9', category: 'Wearables', stock: 12, reorderLevel: 10, warehouse: 'Lagos Main', lastUpdated: 'Jan 11, 2025' },
  { sku: 'TZ-AU-002', product: 'Sony WH-1000XM5', category: 'Audio', stock: 0, reorderLevel: 10, warehouse: 'PH Warehouse', lastUpdated: 'Jan 10, 2025' },
  { sku: 'TZ-LT-002', product: 'Dell XPS 15', category: 'Laptops', stock: 3, reorderLevel: 5, warehouse: 'Abuja Hub', lastUpdated: 'Jan 9, 2025' },
  { sku: 'TZ-AU-003', product: 'JBL Flip 6 Speaker', category: 'Audio', stock: 0, reorderLevel: 15, warehouse: 'Lagos Main', lastUpdated: 'Jan 8, 2025' },
  { sku: 'TZ-TB-001', product: 'iPad Air M1', category: 'Tablets', stock: 0, reorderLevel: 8, warehouse: 'Lagos Main', lastUpdated: 'Jan 7, 2025' },
  { sku: 'TZ-PH-003', product: 'Google Pixel 8 Pro', category: 'Phones', stock: 10, reorderLevel: 10, warehouse: 'Lagos Main', lastUpdated: 'Jan 6, 2025' },
  { sku: 'TZ-AC-001', product: 'Razer BlackWidow V4', category: 'Accessories', stock: 7, reorderLevel: 10, warehouse: 'PH Warehouse', lastUpdated: 'Jan 5, 2025' },
  { sku: 'TZ-PH-004', product: 'iPhone 15 Pro 128GB', category: 'Phones', stock: 0, reorderLevel: 10, warehouse: 'Lagos Main', lastUpdated: 'Jan 4, 2025' },
  { sku: 'TZ-AU-004', product: 'Galaxy Buds 2 Pro', category: 'Audio', stock: 6, reorderLevel: 15, warehouse: 'Lagos Main', lastUpdated: 'Jan 3, 2025' },
  { sku: 'TZ-WR-002', product: 'Samsung Galaxy Watch 6', category: 'Wearables', stock: 9, reorderLevel: 10, warehouse: 'Abuja Hub', lastUpdated: 'Jan 2, 2025' },
  { sku: 'TZ-AC-002', product: 'Logitech MX Master 3S', category: 'Accessories', stock: 4, reorderLevel: 10, warehouse: 'Lagos Main', lastUpdated: 'Jan 1, 2025' },
];

function getStockStatus(stock: number, reorderLevel: number): { label: string; classes: string } {
  if (stock === 0) return { label: 'Out of Stock', classes: 'bg-red-500/10 text-red-400' };
  if (stock < reorderLevel) return { label: 'Low Stock', classes: 'bg-amber-500/10 text-amber-400' };
  return { label: 'In Stock', classes: 'bg-emerald-500/10 text-emerald-400' };
}

export default function SellerInventory() {
  const [search, setSearch] = useState('');

  const inStock = inventory.filter((i) => i.stock > 0 && i.stock >= i.reorderLevel).length;
  const lowStock = inventory.filter((i) => i.stock > 0 && i.stock < i.reorderLevel).length;
  const outOfStock = inventory.filter((i) => i.stock === 0).length;

  const filtered = inventory.filter(
    (i) =>
      i.product.toLowerCase().includes(search.toLowerCase()) ||
      i.sku.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Inventory</h1>
          <p className="text-sm text-nm-muted mt-1">Track and manage your stock levels</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-[#AFE607] text-black font-medium rounded-xl px-4 py-2 text-sm flex items-center gap-2 hover:bg-[#9dd006] transition-colors">
            <Edit3 size={16} />
            Update Stock
          </button>
          <button className="text-nm-text-dim hover:text-white hover:bg-nm-card-hover rounded-xl px-4 py-2 text-sm flex items-center gap-2 border border-nm-border transition-colors">
            <RefreshCw size={16} />
            Bulk Update
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-nm-card rounded-2xl border border-nm-border p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
              <PackageCheck size={18} />
            </div>
            <div>
              <p className="text-xs text-nm-muted">In Stock</p>
              <p className="text-2xl font-bold text-white">{inStock}</p>
            </div>
          </div>
        </div>
        <div className="bg-nm-card rounded-2xl border border-nm-border p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
              <AlertTriangle size={18} />
            </div>
            <div>
              <p className="text-xs text-nm-muted">Low Stock Alert</p>
              <p className="text-2xl font-bold text-white">{lowStock}</p>
            </div>
          </div>
        </div>
        <div className="bg-nm-card rounded-2xl border border-nm-border p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/15 text-red-400 flex items-center justify-center">
              <PackageX size={18} />
            </div>
            <div>
              <p className="text-xs text-nm-muted">Out of Stock</p>
              <p className="text-2xl font-bold text-white">{outOfStock}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-xs">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-nm-muted" />
        <input
          type="text"
          placeholder="Search by product or SKU..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-nm-input border border-nm-border rounded-xl pl-9 pr-3 py-2 text-sm text-white placeholder:text-nm-muted focus:outline-none focus:border-[#AFE607]/40"
        />
      </div>

      {/* Table */}
      <div className="bg-nm-card rounded-2xl border border-nm-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-nm-border">
                <th className="text-left text-nm-muted font-medium px-5 py-3">SKU</th>
                <th className="text-left text-nm-muted font-medium px-5 py-3">Product</th>
                <th className="text-left text-nm-muted font-medium px-5 py-3 hidden md:table-cell">Category</th>
                <th className="text-right text-nm-muted font-medium px-5 py-3">Current Stock</th>
                <th className="text-right text-nm-muted font-medium px-5 py-3 hidden lg:table-cell">Reorder Level</th>
                <th className="text-left text-nm-muted font-medium px-5 py-3">Status</th>
                <th className="text-left text-nm-muted font-medium px-5 py-3 hidden xl:table-cell">Warehouse</th>
                <th className="text-left text-nm-muted font-medium px-5 py-3 hidden lg:table-cell">Last Updated</th>
                <th className="text-right text-nm-muted font-medium px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => {
                const status = getStockStatus(item.stock, item.reorderLevel);
                const isAlert = item.stock > 0 && item.stock < item.reorderLevel;
                return (
                  <tr
                    key={item.sku}
                    className={`border-b border-nm-border/50 hover:bg-nm-card-hover transition-colors ${
                      isAlert ? 'bg-amber-500/5' : ''
                    }`}
                  >
                    <td className="px-5 py-3 text-white font-mono text-xs">{item.sku}</td>
                    <td className="px-5 py-3 text-white font-medium">{item.product}</td>
                    <td className="px-5 py-3 text-nm-text-dim hidden md:table-cell">{item.category}</td>
                    <td className={`px-5 py-3 text-right font-medium ${item.stock === 0 ? 'text-red-400' : isAlert ? 'text-amber-400' : 'text-white'}`}>
                      {item.stock}
                    </td>
                    <td className="px-5 py-3 text-right text-nm-text-dim hidden lg:table-cell">{item.reorderLevel}</td>
                    <td className="px-5 py-3">
                      <span className={`rounded-lg px-2.5 py-1 text-xs font-medium ${status.classes}`}>
                        {status.label}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-nm-text-dim hidden xl:table-cell">{item.warehouse}</td>
                    <td className="px-5 py-3 text-nm-text-dim text-xs hidden lg:table-cell">{item.lastUpdated}</td>
                    <td className="px-5 py-3 text-right">
                      <button className="text-nm-text-dim hover:text-white hover:bg-nm-card-hover rounded-lg px-3 py-1.5 text-xs transition-colors">
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}