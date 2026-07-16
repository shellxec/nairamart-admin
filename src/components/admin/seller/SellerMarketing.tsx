'use client';

import { useState } from 'react';
import {
  Ticket,
  Plus,
  Clock,
  Tag,
  Zap,
  Package,
  ChevronDown,
  Calendar,
  Percent,
  Box,
} from 'lucide-react';

// ─── Mock Data ────────────────────────────────────────────────────
interface Coupon {
  code: string;
  discount: string;
  type: string;
  usage: string;
  expiry: string;
  status: string;
  minOrder: string;
}

const coupons: Coupon[] = [
  { code: 'TECH10', discount: '10%', type: 'Percentage', usage: '156/500', expiry: 'Feb 28, 2025', status: 'Active', minOrder: '₦50,000' },
  { code: 'WELCOME500', discount: '₦500', type: 'Fixed', usage: '89/200', expiry: 'Mar 31, 2025', status: 'Active', minOrder: '₦10,000' },
  { code: 'FLASH20', discount: '20%', type: 'Percentage', usage: '45/100', expiry: 'Jan 20, 2025', status: 'Active', minOrder: '₦100,000' },
];

const couponStatusColor: Record<string, string> = {
  Active: 'bg-emerald-500/10 text-emerald-400',
  Expired: 'bg-red-500/10 text-red-400',
  Draft: 'bg-amber-500/10 text-amber-400',
};

export default function SellerMarketing() {
  const [showCouponForm, setShowCouponForm] = useState(false);
  const [showFlashForm, setShowFlashForm] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Marketing</h1>
        <p className="text-sm text-nm-muted mt-1">Promote your products with coupons and campaigns</p>
      </div>

      {/* My Coupons */}
      <div className="bg-nm-card rounded-2xl border border-nm-border p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-white flex items-center gap-2">
            <Ticket size={18} className="text-[#AFE607]" />
            My Coupons
          </h2>
          <button
            onClick={() => setShowCouponForm(!showCouponForm)}
            className="bg-[#AFE607] text-black font-medium rounded-xl px-4 py-2 text-sm flex items-center gap-2 hover:bg-[#9dd006] transition-colors"
          >
            <Plus size={16} />
            Create Coupon
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {coupons.map((coupon) => (
            <div key={coupon.code} className="bg-nm-input rounded-xl border border-nm-border p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-[#AFE607] font-mono">{coupon.code}</span>
                <span className={`rounded-lg px-2.5 py-1 text-xs font-medium ${couponStatusColor[coupon.status]}`}>
                  {coupon.status}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Tag size={14} className="text-nm-muted" />
                <span className="text-sm text-white font-medium">{coupon.discount} Off</span>
                <span className="text-xs text-nm-muted">({coupon.type})</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-nm-muted">Usage: </span>
                  <span className="text-nm-text-dim">{coupon.usage}</span>
                </div>
                <div>
                  <span className="text-nm-muted">Min Order: </span>
                  <span className="text-nm-text-dim">{coupon.minOrder}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-nm-muted">Expiry: </span>
                  <span className="text-nm-text-dim">{coupon.expiry}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Coupon Form */}
      {showCouponForm && (
        <div className="bg-nm-card rounded-2xl border border-nm-border p-5 space-y-4 animate-fade-in">
          <h2 className="text-base font-semibold text-white flex items-center gap-2">
            <Plus size={18} className="text-[#AFE607]" />
            Create New Coupon
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-nm-muted mb-1.5 block">Coupon Code</label>
              <input
                type="text"
                placeholder="e.g. SAVE20"
                className="w-full bg-nm-input border border-nm-border rounded-xl px-3 py-2 text-sm text-white placeholder:text-nm-muted focus:outline-none focus:border-[#AFE607]/40"
              />
            </div>
            <div>
              <label className="text-xs text-nm-muted mb-1.5 block">Discount Type</label>
              <div className="relative">
                <Percent size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-nm-muted" />
                <select className="w-full bg-nm-input border border-nm-border rounded-xl pl-8 pr-3 py-2 text-sm text-white appearance-none focus:outline-none focus:border-[#AFE607]/40">
                  <option>Percentage (%)</option>
                  <option>Fixed Amount (₦)</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-nm-muted pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="text-xs text-nm-muted mb-1.5 block">Discount Value</label>
              <input
                type="text"
                placeholder="e.g. 10 or 5000"
                className="w-full bg-nm-input border border-nm-border rounded-xl px-3 py-2 text-sm text-white placeholder:text-nm-muted focus:outline-none focus:border-[#AFE607]/40"
              />
            </div>
            <div>
              <label className="text-xs text-nm-muted mb-1.5 block">Minimum Order (₦)</label>
              <input
                type="text"
                placeholder="e.g. 50000"
                className="w-full bg-nm-input border border-nm-border rounded-xl px-3 py-2 text-sm text-white placeholder:text-nm-muted focus:outline-none focus:border-[#AFE607]/40"
              />
            </div>
            <div>
              <label className="text-xs text-nm-muted mb-1.5 block">Usage Limit</label>
              <input
                type="text"
                placeholder="e.g. 500"
                className="w-full bg-nm-input border border-nm-border rounded-xl px-3 py-2 text-sm text-white placeholder:text-nm-muted focus:outline-none focus:border-[#AFE607]/40"
              />
            </div>
            <div>
              <label className="text-xs text-nm-muted mb-1.5 block">Expiry Date</label>
              <div className="relative">
                <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-nm-muted" />
                <input
                  type="date"
                  className="w-full bg-nm-input border border-nm-border rounded-xl pl-8 pr-3 py-2 text-sm text-white focus:outline-none focus:border-[#AFE607]/40"
                />
              </div>
            </div>
          </div>
          <div>
            <label className="text-xs text-nm-muted mb-1.5 block">Categories (select applicable)</label>
            <div className="flex flex-wrap gap-2">
              {['Electronics', 'Phones', 'Laptops', 'Audio', 'Wearables', 'Accessories'].map((cat) => (
                <label key={cat} className="flex items-center gap-2 bg-nm-input border border-nm-border rounded-lg px-3 py-1.5 text-xs text-nm-text-dim cursor-pointer hover:border-[#AFE607]/40 transition-colors">
                  <input type="checkbox" className="accent-[#AFE607] rounded" />
                  {cat}
                </label>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <button className="bg-[#AFE607] text-black font-medium rounded-xl px-4 py-2 text-sm hover:bg-[#9dd006] transition-colors">
              Create Coupon
            </button>
            <button
              onClick={() => setShowCouponForm(false)}
              className="text-nm-text-dim hover:text-white hover:bg-nm-card-hover rounded-xl px-4 py-2 text-sm transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Flash Sale */}
      <div className="bg-nm-card rounded-2xl border border-nm-border p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-white flex items-center gap-2">
            <Zap size={18} className="text-[#AFE607]" />
            Flash Sale
          </h2>
          <button
            onClick={() => setShowFlashForm(!showFlashForm)}
            className="text-nm-text-dim hover:text-white hover:bg-nm-card-hover rounded-xl px-4 py-2 text-sm border border-nm-border flex items-center gap-2 transition-colors"
          >
            <Plus size={16} />
            Apply for Flash Sale
          </button>
        </div>

        {showFlashForm ? (
          <div className="space-y-4 animate-fade-in border-t border-nm-border pt-4">
            <p className="text-xs text-nm-muted">Apply to have your products featured in our platform-wide flash sale events.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-nm-muted mb-1.5 block">Select Product</label>
                <div className="relative">
                  <Box size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-nm-muted" />
                  <select className="w-full bg-nm-input border border-nm-border rounded-xl pl-8 pr-3 py-2 text-sm text-white appearance-none focus:outline-none focus:border-[#AFE607]/40">
                    <option>iPhone 14 Pro Max 256GB</option>
                    <option>Samsung Galaxy S23 Ultra</option>
                    <option>AirPods Pro 2nd Gen</option>
                    <option>MacBook Air M2 13&quot;</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-nm-muted pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="text-xs text-nm-muted mb-1.5 block">Discount (%)</label>
                <input
                  type="text"
                  placeholder="e.g. 15"
                  className="w-full bg-nm-input border border-nm-border rounded-xl px-3 py-2 text-sm text-white placeholder:text-nm-muted focus:outline-none focus:border-[#AFE607]/40"
                />
              </div>
              <div>
                <label className="text-xs text-nm-muted mb-1.5 block">Start Date</label>
                <input
                  type="date"
                  className="w-full bg-nm-input border border-nm-border rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#AFE607]/40"
                />
              </div>
              <div>
                <label className="text-xs text-nm-muted mb-1.5 block">End Date</label>
                <input
                  type="date"
                  className="w-full bg-nm-input border border-nm-border rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#AFE607]/40"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button className="bg-[#AFE607] text-black font-medium rounded-xl px-4 py-2 text-sm hover:bg-[#9dd006] transition-colors">
                Submit Application
              </button>
              <button
                onClick={() => setShowFlashForm(false)}
                className="text-nm-text-dim hover:text-white hover:bg-nm-card-hover rounded-xl px-4 py-2 text-sm transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="border-t border-nm-border pt-4">
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Zap size={32} className="text-nm-muted mb-3" />
              <p className="text-sm text-nm-text-dim">No active flash sale listings</p>
              <p className="text-xs text-nm-muted mt-1">Apply to feature your products in the next flash sale event</p>
            </div>
          </div>
        )}
      </div>

      {/* Product Bundles - Coming Soon */}
      <div className="bg-nm-card rounded-2xl border border-nm-border p-5">
        <h2 className="text-base font-semibold text-white flex items-center gap-2 mb-4">
          <Package size={18} className="text-[#AFE607]" />
          Product Bundles
        </h2>
        <div className="border border-dashed border-nm-border rounded-xl p-12 text-center">
          <Clock size={32} className="text-nm-muted mx-auto mb-3" />
          <p className="text-sm font-medium text-nm-text-dim">Coming Soon</p>
          <p className="text-xs text-nm-muted mt-1">Create product bundles to offer combined deals and increase your average order value.</p>
        </div>
      </div>
    </div>
  );
}