'use client';

import { useState } from 'react';
import { Plus, Copy, Calendar, Tag, Percent, Pencil, BarChart3 } from 'lucide-react';

interface Coupon {
  id: string;
  code: string;
  discount: string;
  discountValue: string;
  usageLimit: number;
  usedCount: number;
  status: 'active' | 'expired' | 'scheduled';
  validUntil: string;
  categories: string[];
}

const coupons: Coupon[] = [
  { id: 'C-001', code: 'FLASH50', discount: '50% off', discountValue: '50%', usageLimit: 500, usedCount: 342, status: 'active', validUntil: '2026-03-31', categories: ['All Categories'] },
  { id: 'C-002', code: 'WELCOME10', discount: '₦1,000 off', discountValue: '₦1,000', usageLimit: 10000, usedCount: 8234, status: 'active', validUntil: '2026-06-30', categories: ['All Categories'] },
  { id: 'C-003', code: 'FREEDELIVERY', discount: 'Free Shipping', discountValue: 'Free', usageLimit: 2000, usedCount: 1890, status: 'active', validUntil: '2026-02-28', categories: ['All Categories'] },
  { id: 'C-004', code: 'SUMMER20', discount: '20% off', discountValue: '20%', usageLimit: 3000, usedCount: 3000, status: 'expired', validUntil: '2025-09-30', categories: ['Fashion', 'Home & Kitchen'] },
  { id: 'C-005', code: 'TECH15', discount: '15% off electronics', discountValue: '15%', usageLimit: 800, usedCount: 456, status: 'active', validUntil: '2026-04-30', categories: ['Electronics', 'Phones & Tablets'] },
  { id: 'C-006', code: 'FIRSTORDER', discount: '₦2,000 off', discountValue: '₦2,000', usageLimit: 5000, usedCount: 4120, status: 'scheduled', validUntil: '2026-12-31', categories: ['All Categories'] },
];

const statusColors: Record<Coupon['status'], string> = {
  active: 'bg-emerald-500/10 text-emerald-400',
  expired: 'bg-gray-500/10 text-gray-400',
  scheduled: 'bg-blue-500/10 text-blue-400',
};

export default function CouponManagement() {
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = coupons.filter((c) => statusFilter === 'all' || c.status === statusFilter);

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-white text-2xl font-semibold">Coupon Management</h1>
          <p className="text-nm-muted text-sm mt-1">Create and manage discount coupons and promotional codes</p>
        </div>
        <button className="flex items-center gap-2 bg-[#AFE607] text-black font-medium rounded-xl px-4 py-2 text-sm hover:bg-[#9ed006] transition-colors">
          <Plus size={16} />
          Create Coupon
        </button>
      </div>

      {/* Filter by status */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar">
        {['all', 'active', 'expired', 'scheduled'].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-4 py-2 rounded-xl text-sm font-medium capitalize whitespace-nowrap transition-colors ${
              statusFilter === s
                ? 'bg-[#AFE607] text-black'
                : 'text-nm-text-dim hover:text-white hover:bg-nm-card-hover'
            }`}
          >
            {s === 'all' ? 'All' : s}
          </button>
        ))}
      </div>

      {/* Coupon Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((coupon) => {
          const usagePercent = Math.round((coupon.usedCount / coupon.usageLimit) * 100);
          return (
            <div
              key={coupon.id}
              className="bg-nm-card rounded-2xl border border-nm-border p-5 hover:border-nm-border-light transition-colors"
            >
              {/* Top: Code + Status + Copy */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-[#AFE607]/10 flex items-center justify-center">
                    <Percent size={18} className="text-[#AFE607]" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold font-mono text-base tracking-wide">{coupon.code}</h3>
                    <span className={`rounded-lg px-2.5 py-1 text-xs font-medium capitalize ${statusColors[coupon.status]}`}>
                      {coupon.status}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => navigator.clipboard?.writeText(coupon.code)}
                  className="text-nm-text-dim hover:text-white p-1.5 rounded-lg hover:bg-nm-card-hover transition-colors"
                >
                  <Copy size={14} />
                </button>
              </div>

              {/* Discount */}
              <p className="text-2xl font-bold text-[#AFE607] mb-4">{coupon.discount}</p>

              {/* Details */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-nm-muted flex items-center gap-1.5">
                    <Calendar size={13} />
                    Valid until
                  </span>
                  <span className="text-nm-text-dim">
                    {new Date(coupon.validUntil).toLocaleDateString('en-NG', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-nm-muted">Usage</span>
                  <span className="text-nm-text-dim">
                    {coupon.usedCount.toLocaleString()} / {coupon.usageLimit.toLocaleString()}
                  </span>
                </div>

                <div className="w-full bg-nm-input rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${coupon.status === 'expired' ? 'bg-gray-500' : 'bg-[#AFE607]'}`}
                    style={{ width: `${Math.min(usagePercent, 100)}%` }}
                  />
                </div>

                <div className="flex items-center gap-1.5 flex-wrap">
                  <Tag size={12} className="text-nm-muted" />
                  {coupon.categories.map((cat) => (
                    <span key={cat} className="text-xs text-nm-text-dim bg-nm-card-hover rounded-lg px-2.5 py-1">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-3 border-t border-nm-border">
                <button className="flex-1 flex items-center justify-center gap-1.5 text-sm text-nm-text-dim hover:text-white hover:bg-nm-card-hover py-2 rounded-lg transition-colors">
                  <Pencil size={13} />
                  Edit
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 text-sm text-nm-text-dim hover:text-white hover:bg-nm-card-hover py-2 rounded-lg transition-colors">
                  <BarChart3 size={13} />
                  Stats
                </button>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="col-span-full bg-nm-card border border-nm-border rounded-2xl p-12 text-center text-nm-muted">
            No coupons found
          </div>
        )}
      </div>
    </div>
  );
}