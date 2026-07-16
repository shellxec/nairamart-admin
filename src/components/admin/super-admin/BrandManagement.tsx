'use client';

import { useState } from 'react';
import { Search, Plus, MoreVertical, Pencil, Eye, ShieldAlert, CheckCircle, Ban } from 'lucide-react';

interface Brand {
  id: string;
  name: string;
  initial: string;
  color: string;
  products: number;
  sellers: number;
  status: 'Approved' | 'Pending' | 'Blacklisted';
}

const brands: Brand[] = [
  { id: 'BR-001', name: 'Samsung', initial: 'S', color: 'bg-blue-500', products: 342, sellers: 38, status: 'Approved' as const },
  { id: 'BR-002', name: 'Apple', initial: 'A', color: 'bg-gray-400', products: 287, sellers: 42, status: 'Approved' as const },
  { id: 'BR-003', name: 'Tecno', initial: 'T', color: 'bg-emerald-500', products: 456, sellers: 45, status: 'Approved' as const },
  { id: 'BR-004', name: 'Infinix', initial: 'I', color: 'bg-orange-500', products: 398, sellers: 32, status: 'Approved' as const },
  { id: 'BR-005', name: 'Nokia', initial: 'N', color: 'bg-blue-700', products: 156, sellers: 18, status: 'Approved' as const },
  { id: 'BR-006', name: 'Xiaomi', initial: 'X', color: 'bg-amber-500', products: 423, sellers: 29, status: 'Approved' as const },
  { id: 'BR-007', name: 'Oppo', initial: 'O', color: 'bg-green-500', products: 267, sellers: 22, status: 'Approved' as const },
  { id: 'BR-008', name: 'Sony', initial: 'S', color: 'bg-indigo-500', products: 189, sellers: 15, status: 'Approved' as const },
  { id: 'BR-009', name: 'Nike', initial: 'N', color: 'bg-red-500', products: 312, sellers: 28, status: 'Approved' as const },
  { id: 'BR-010', name: 'Adidas', initial: 'A', color: 'bg-sky-500', products: 278, sellers: 25, status: 'Approved' as const },
  { id: 'BR-011', name: 'HP', initial: 'H', color: 'bg-cyan-600', products: 198, sellers: 20, status: 'Approved' as const },
  { id: 'BR-012', name: 'Dell', initial: 'D', color: 'bg-teal-500', products: 167, sellers: 16, status: 'Approved' as const },
  { id: 'BR-013', name: 'Lenovo', initial: 'L', color: 'bg-red-600', products: 234, sellers: 21, status: 'Approved' as const },
  { id: 'BR-014', name: 'LG', initial: 'L', color: 'bg-purple-500', products: 145, sellers: 12, status: 'Approved' as const },
  { id: 'BR-015', name: 'JBL', initial: 'J', color: 'bg-orange-600', products: 89, sellers: 8, status: 'Approved' as const },
];

const statusColors: Record<Brand['status'], string> = {
  Approved: 'bg-emerald-500/10 text-emerald-400',
  Pending: 'bg-amber-500/10 text-amber-400',
  Blacklisted: 'bg-red-500/10 text-red-400',
};

export default function BrandManagement() {
  const [search, setSearch] = useState('');
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const filtered = brands.filter((b) =>
    !search || b.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-white text-2xl font-semibold">Brand Management</h1>
          <p className="text-nm-muted text-sm mt-1">Manage marketplace brands, approvals, and listings</p>
        </div>
        <button className="flex items-center gap-2 bg-[#AFE607] text-black font-medium rounded-xl px-4 py-2 text-sm hover:bg-[#9ed006] transition-colors">
          <Plus size={16} />
          Add Brand
        </button>
      </div>

      {/* Search */}
      <div className="bg-nm-card border border-nm-border rounded-2xl p-4">
        <div className="relative max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-nm-muted" />
          <input
            type="text"
            placeholder="Search brands..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-nm-input border border-nm-border rounded-xl pl-9 pr-3 py-2 text-sm text-white placeholder:text-nm-muted focus:outline-none focus:border-nm-border-light"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-nm-card border border-nm-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-nm-border text-left">
                <th className="p-4 text-nm-muted font-medium">Logo</th>
                <th className="p-4 text-nm-muted font-medium">Name</th>
                <th className="p-4 text-nm-muted font-medium hidden sm:table-cell">Products</th>
                <th className="p-4 text-nm-muted font-medium hidden md:table-cell">Sellers</th>
                <th className="p-4 text-nm-muted font-medium">Status</th>
                <th className="p-4 text-nm-muted font-medium w-12">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((brand) => (
                <tr
                  key={brand.id}
                  className="border-b border-nm-border hover:bg-nm-card-hover transition-colors"
                >
                  <td className="p-4">
                    <div className={`w-9 h-9 rounded-full ${brand.color} flex items-center justify-center text-white font-semibold text-sm`}>
                      {brand.initial}
                    </div>
                  </td>
                  <td className="p-4 text-white font-medium">{brand.name}</td>
                  <td className="p-4 text-nm-text-dim hidden sm:table-cell">{brand.products}</td>
                  <td className="p-4 text-nm-text-dim hidden md:table-cell">{brand.sellers}</td>
                  <td className="p-4">
                    <span className={`rounded-lg px-2.5 py-1 text-xs font-medium ${statusColors[brand.status]}`}>
                      {brand.status}
                    </span>
                  </td>
                  <td className="p-4 relative">
                    <button
                      onClick={() => setOpenMenu(openMenu === brand.id ? null : brand.id)}
                      className="text-nm-muted hover:text-white p-1.5 rounded-lg hover:bg-nm-card-hover transition-colors"
                    >
                      <MoreVertical size={16} />
                    </button>
                    {openMenu === brand.id && (
                      <div className="absolute right-0 top-10 z-50 w-44 bg-nm-card border border-nm-border rounded-xl py-1 shadow-xl animate-fade-in">
                        {[
                          { icon: Eye, label: 'View', color: 'text-white' },
                          { icon: Pencil, label: 'Edit', color: 'text-white' },
                          { icon: CheckCircle, label: 'Approve', color: 'text-emerald-400' },
                          { icon: ShieldAlert, label: 'Blacklist', color: 'text-red-400' },
                          { icon: Ban, label: 'Remove', color: 'text-red-400' },
                        ].map((item) => (
                          <button
                            key={item.label}
                            onClick={() => setOpenMenu(null)}
                            className="w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-nm-card-hover transition-colors"
                          >
                            <item.icon size={14} className={item.color} />
                            <span className={item.color}>{item.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}