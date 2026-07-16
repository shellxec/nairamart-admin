'use client';

import { useState } from 'react';
import { productModeration } from '@/data/admin-data';
import type { ProductModeration as ProductModType } from '@/store/admin-store';
import {
  Search,
  CheckCircle,
  XCircle,
  Flag,
  EyeOff,
  Pencil,
  Clock,
  AlertTriangle,
  ShieldAlert,
} from 'lucide-react';

const statusColors: Record<ProductModType['status'], string> = {
  pending: 'bg-blue-500/10 text-blue-400',
  approved: 'bg-emerald-500/10 text-emerald-400',
  rejected: 'bg-red-500/10 text-red-400',
  revision: 'bg-amber-500/10 text-amber-400',
  hidden: 'bg-gray-500/10 text-gray-400',
  removed: 'bg-red-500/10 text-red-400',
};

const tabs = ['All', 'Pending', 'Approved', 'Rejected', 'Needs Revision'] as const;
type Tab = (typeof tabs)[number];

const tabMap: Record<Tab, ProductModType['status'] | 'all'> = {
  All: 'all',
  Pending: 'pending',
  Approved: 'approved',
  Rejected: 'rejected',
  'Needs Revision': 'revision',
};

const categories = [...new Set(productModeration.map((p) => p.category))];

export default function ProductModeration() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [flagFilter, setFlagFilter] = useState('all');
  const [activeTab, setActiveTab] = useState<Tab>('All');
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const pendingCount = 47;
  const approvedToday = 12;
  const rejectedToday = 3;
  const flaggedCount = 5;

  const filtered = productModeration.filter((p) => {
    const matchSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.seller.toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter === 'all' || p.category === categoryFilter;
    const matchFlag = flagFilter === 'all' || p.flags.includes(flagFilter);
    const matchTab = tabMap[activeTab] === 'all' || p.status === tabMap[activeTab];
    return matchSearch && matchCategory && matchFlag && matchTab;
  });

  const toggleAll = () => {
    if (selected.size === filtered.length) setSelected(new Set());
    else setSelected(new Set(filtered.map((p) => p.id)));
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const flagColors: Record<string, string> = {
    counterfeit: 'bg-red-500/10 text-red-400',
    'misleading-info': 'bg-red-500/10 text-red-400',
    'prohibited-item': 'bg-red-500/10 text-red-400',
    'wrong-category': 'bg-red-500/10 text-red-400',
    'duplicate-listing': 'bg-red-500/10 text-red-400',
    'poor-images': 'bg-red-500/10 text-red-400',
  };

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-white text-2xl font-semibold">Product Moderation</h1>
        <p className="text-nm-muted text-sm mt-1">Review and moderate product listings before they go live</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Pending Review', value: pendingCount, icon: Clock, color: 'text-blue-500' },
          { label: 'Approved Today', value: approvedToday, icon: CheckCircle, color: 'text-emerald-500' },
          { label: 'Rejected Today', value: rejectedToday, icon: XCircle, color: 'text-red-500' },
          { label: 'Flagged Items', value: flaggedCount, icon: ShieldAlert, color: 'text-amber-500' },
        ].map((stat) => (
          <div key={stat.label} className="bg-nm-card border border-nm-border rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-nm-muted text-xs font-medium">{stat.label}</span>
              <stat.icon size={16} className={stat.color} />
            </div>
            <p className="text-white text-2xl font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto hide-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setSelected(new Set()); }}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab
                ? 'bg-[#AFE607] text-black'
                : 'text-nm-muted hover:text-white hover:bg-nm-card-hover'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-nm-card border border-nm-border rounded-2xl p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-nm-muted" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-nm-input border border-nm-border rounded-xl pl-9 pr-3 py-2 text-sm text-white placeholder:text-nm-muted focus:outline-none focus:border-nm-border-light"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-nm-input border border-nm-border rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-nm-border-light"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select
            value={flagFilter}
            onChange={(e) => setFlagFilter(e.target.value)}
            className="bg-nm-input border border-nm-border rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-nm-border-light"
          >
            <option value="all">All Flags</option>
            <option value="counterfeit">Counterfeit</option>
            <option value="misleading-info">Misleading Info</option>
            <option value="prohibited-item">Prohibited Item</option>
            <option value="wrong-category">Wrong Category</option>
            <option value="duplicate-listing">Duplicate</option>
            <option value="poor-images">Poor Images</option>
          </select>
        </div>
      </div>

      {/* Bulk Actions */}
      {selected.size > 0 && (
        <div className="bg-nm-card border border-nm-border rounded-2xl p-3 flex items-center gap-4 animate-fade-in">
          <input
            type="checkbox"
            checked
            onChange={toggleAll}
            className="rounded border-nm-border bg-nm-input accent-[#AFE607]"
          />
          <span className="text-sm text-nm-muted">{selected.size} selected</span>
          <button className="text-sm text-emerald-500 hover:text-emerald-400 font-medium px-3 py-1.5 rounded-lg hover:bg-emerald-500/10 transition-colors">
            Approve Selected
          </button>
          <button className="text-sm text-red-500 hover:text-red-400 font-medium px-3 py-1.5 rounded-lg hover:bg-red-500/10 transition-colors">
            Reject Selected
          </button>
          <button className="text-sm text-amber-500 hover:text-amber-400 font-medium px-3 py-1.5 rounded-lg hover:bg-amber-500/10 transition-colors">
            Mark Counterfeit
          </button>
        </div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((product) => (
          <div
            key={product.id}
            className="bg-nm-card border border-nm-border rounded-2xl overflow-hidden hover:border-nm-border-light transition-colors"
          >
            <div className="relative">
              <img
                src={product.images[0] || `https://picsum.photos/seed/${product.id}/400/300`}
                alt={product.name}
                className="w-full h-44 object-cover rounded-xl"
              />
              <div className="absolute top-3 left-3">
                <span className={`rounded-lg px-2.5 py-1 text-xs font-medium capitalize ${statusColors[product.status]}`}>
                  {product.status}
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <input
                  type="checkbox"
                  checked={selected.has(product.id)}
                  onChange={() => toggleSelect(product.id)}
                  className="rounded border-nm-border bg-nm-input/80 accent-[#AFE607]"
                />
              </div>
              {product.flags.length > 0 && (
                <div className="absolute bottom-3 left-3 flex gap-1.5">
                  {product.flags.map((flag) => (
                    <span
                      key={flag}
                      className={`rounded-lg px-2 py-0.5 text-[10px] font-medium ${flagColors[flag] || 'bg-gray-500/15 text-gray-400'}`}
                    >
                      {flag.replace('-', ' ')}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 space-y-3">
              <div>
                <h3 className="text-white font-medium line-clamp-2">{product.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="bg-nm-card-hover text-nm-text-dim rounded-lg px-2 py-0.5 text-xs">{product.category}</span>
                  <span className="text-nm-muted text-xs">by {product.seller}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#AFE607] font-semibold text-lg">₦{product.price.toLocaleString()}</span>
                <span className="text-nm-muted text-xs">
                  {new Date(product.submittedAt).toLocaleDateString('en-NG', { month: 'short', day: 'numeric' })}
                </span>
              </div>

              {product.reviewedBy && (
                <p className="text-nm-text-dim text-xs">
                  Reviewed by {product.reviewedBy} on {product.reviewedBy && product.reviewedAt
                    ? new Date(product.reviewedAt).toLocaleDateString('en-NG', { month: 'short', day: 'numeric' })
                    : ''}
                </p>
              )}

              {product.reason && product.status === 'rejected' && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-2.5">
                  <div className="flex items-center gap-1.5 mb-1">
                    <AlertTriangle size={12} className="text-red-500" />
                    <span className="text-red-500 text-xs font-medium">Rejection Reason</span>
                  </div>
                  <p className="text-red-400 text-xs">{product.reason}</p>
                </div>
              )}

              <div className="flex items-center gap-2 pt-1">
                <button className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 text-xs font-medium px-3 py-2 rounded-lg transition-colors">
                  <CheckCircle size={13} />
                  Approve
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 bg-red-500/10 text-red-500 hover:bg-red-500/20 text-xs font-medium px-3 py-2 rounded-lg transition-colors">
                  <XCircle size={13} />
                  Reject
                </button>
                <button className="flex items-center justify-center p-2 text-amber-500 hover:bg-amber-500/10 rounded-lg transition-colors">
                  <Flag size={14} />
                </button>
                <button className="flex items-center justify-center p-2 text-nm-muted hover:text-white hover:bg-nm-card-hover rounded-lg transition-colors">
                  <EyeOff size={14} />
                </button>
                <button className="flex items-center justify-center p-2 text-nm-muted hover:text-white hover:bg-nm-card-hover rounded-lg transition-colors">
                  <Pencil size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full bg-nm-card border border-nm-border rounded-2xl p-12 text-center text-nm-muted">
            No products found matching your filters
          </div>
        )}
      </div>
    </div>
  );
}