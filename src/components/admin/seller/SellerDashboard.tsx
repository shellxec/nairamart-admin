'use client';

import { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  DollarSign,
  ShoppingCart,
  Clock,
  Package,
  Target,
  Eye,
  Star,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';

// ─── Mock Data ────────────────────────────────────────────────────
const kpiCards = [
  { label: 'Total Revenue', value: '₦24.5M', change: 12.5, icon: DollarSign, color: 'emerald' },
  { label: 'Orders This Month', value: '342', change: 8.3, icon: ShoppingCart, color: 'emerald' },
  { label: 'Pending Orders', value: '5', change: 0, icon: Clock, color: 'amber' },
  { label: 'Products Live', value: '89', change: 4, icon: Package, color: 'violet' },
  { label: 'Conversion Rate', value: '4.2%', change: 0.3, icon: Target, color: 'blue' },
  { label: 'Store Visitors', value: '12,450', change: -2.1, icon: Eye, color: 'cyan' },
  { label: 'Avg Rating', value: '4.7★', change: 0.1, icon: Star, color: 'amber' },
  { label: 'Low Stock Items', value: '3', change: -1, icon: AlertTriangle, color: 'red' },
];

const revenueData = [
  { month: 'Jan', revenue: 1200000 },
  { month: 'Feb', revenue: 1800000 },
  { month: 'Mar', revenue: 1500000 },
  { month: 'Apr', revenue: 2100000 },
  { month: 'May', revenue: 1900000 },
  { month: 'Jun', revenue: 2300000 },
  { month: 'Jul', revenue: 2500000 },
  { month: 'Aug', revenue: 2200000 },
  { month: 'Sep', revenue: 2700000 },
  { month: 'Oct', revenue: 2400000 },
  { month: 'Nov', revenue: 2100000 },
  { month: 'Dec', revenue: 2450000 },
];

const topProducts = [
  { name: 'iPhone 14 Pro Max', sold: 124, revenue: '₦74.4M', rating: 4.8 },
  { name: 'Samsung Galaxy S23 Ultra', sold: 98, revenue: '₦52.7M', rating: 4.6 },
  { name: 'AirPods Pro 2nd Gen', sold: 215, revenue: '₦32.2M', rating: 4.9 },
  { name: 'MacBook Air M2', sold: 67, revenue: '₦66.9M', rating: 4.7 },
  { name: 'Apple Watch Series 9', sold: 89, revenue: '₦26.7M', rating: 4.5 },
];

const recentOrders = [
  { id: 'NM-28456', customer: 'Chidi Okonkwo', total: '₦245,000', status: 'Delivered', date: 'Jan 15, 2025' },
  { id: 'NM-28455', customer: 'Amina Bello', total: '₦89,500', status: 'Shipped', date: 'Jan 15, 2025' },
  { id: 'NM-28454', customer: 'Emeka Nwosu', total: '₦1,250,000', status: 'Processing', date: 'Jan 14, 2025' },
  { id: 'NM-28453', customer: 'Fatima Yusuf', total: '₦45,000', status: 'Pending', date: 'Jan 14, 2025' },
  { id: 'NM-28452', customer: 'Tobi Adeyemi', total: '₦678,000', status: 'Delivered', date: 'Jan 13, 2025' },
];

const colorMap: Record<string, string> = {
  emerald: 'bg-emerald-500/15 text-emerald-400',
  blue: 'bg-blue-500/15 text-blue-400',
  amber: 'bg-amber-500/15 text-amber-400',
  red: 'bg-red-500/15 text-red-400',
  violet: 'bg-violet-500/15 text-violet-400',
  cyan: 'bg-cyan-500/15 text-cyan-400',
};

const statusColorMap: Record<string, string> = {
  Delivered: 'bg-emerald-500/10 text-emerald-400',
  Shipped: 'bg-blue-500/10 text-blue-400',
  Processing: 'bg-amber-500/10 text-amber-400',
  Pending: 'bg-violet-500/10 text-violet-400',
};

function RevenueTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1C1C24] border border-nm-border rounded-xl px-4 py-3 shadow-xl">
      <p className="text-xs text-nm-muted mb-1">{label} 2025</p>
      <p className="text-sm font-semibold text-white">
        ₦{(payload[0].value / 1_000_000).toFixed(1)}M
      </p>
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-3.5 h-3.5 ${star <= Math.round(rating) ? 'text-amber-400' : 'text-nm-border'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs text-nm-text-dim ml-1">{rating}</span>
    </div>
  );
}

export default function SellerDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Seller Dashboard</h1>
        <p className="text-sm text-nm-muted mt-1">Welcome back, <span className="text-[#AFE607]">TechZone Nigeria</span></p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpiCards.map((kpi, i) => {
          const Icon = kpi.icon;
          const isPositive = kpi.change > 0;
          const isNeutral = kpi.change === 0;
          return (
            <div
              key={kpi.label}
              className="bg-nm-card rounded-2xl border border-nm-border p-5 animate-fade-in"
              style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorMap[kpi.color]}`}>
                  <Icon size={18} />
                </div>
                {!isNeutral && (
                  <span className={`text-xs font-medium flex items-center gap-0.5 ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                    {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {Math.abs(kpi.change)}%
                  </span>
                )}
                {isNeutral && <span className="text-xs text-nm-muted">—</span>}
              </div>
              <p className="text-xs text-nm-muted mb-1">{kpi.label}</p>
              <p className="text-2xl font-bold text-white">{kpi.value}</p>
            </div>
          );
        })}
      </div>

      {/* Revenue Chart */}
      <div className="bg-nm-card rounded-2xl border border-nm-border p-5">
        <h2 className="text-base font-semibold text-white mb-4">Revenue Overview</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="sellerRevenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#AFE607" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#AFE607" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E1E28" />
              <XAxis dataKey="month" tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fill: '#6B7280', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `₦${(v / 1_000_000).toFixed(0)}M`}
              />
              <Tooltip content={<RevenueTooltip />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#AFE607"
                strokeWidth={2}
                fill="url(#sellerRevenueGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Section: Top Products + Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top 5 Products */}
        <div className="bg-nm-card rounded-2xl border border-nm-border p-5">
          <h2 className="text-base font-semibold text-white mb-4">Top 5 Products</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-nm-border">
                  <th className="text-left text-nm-muted font-medium pb-3 pr-4">Product</th>
                  <th className="text-right text-nm-muted font-medium pb-3 pr-4">Sold</th>
                  <th className="text-right text-nm-muted font-medium pb-3 pr-4">Revenue</th>
                  <th className="text-right text-nm-muted font-medium pb-3">Rating</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((p) => (
                  <tr key={p.name} className="border-b border-nm-border/50 hover:bg-nm-card-hover transition-colors">
                    <td className="py-3 pr-4 text-white font-medium">{p.name}</td>
                    <td className="py-3 pr-4 text-right text-nm-text-dim">{p.sold}</td>
                    <td className="py-3 pr-4 text-right text-emerald-400 font-medium">{p.revenue}</td>
                    <td className="py-3 text-right">
                      <div className="flex justify-end">
                        <StarRating rating={p.rating} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-nm-card rounded-2xl border border-nm-border p-5">
          <h2 className="text-base font-semibold text-white mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-nm-border">
                  <th className="text-left text-nm-muted font-medium pb-3 pr-4">Order ID</th>
                  <th className="text-left text-nm-muted font-medium pb-3 pr-4">Customer</th>
                  <th className="text-right text-nm-muted font-medium pb-3 pr-4">Total</th>
                  <th className="text-left text-nm-muted font-medium pb-3 pr-4">Status</th>
                  <th className="text-right text-nm-muted font-medium pb-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr key={o.id} className="border-b border-nm-border/50 hover:bg-nm-card-hover transition-colors">
                    <td className="py-3 pr-4 text-white font-medium">{o.id}</td>
                    <td className="py-3 pr-4 text-nm-text-dim">{o.customer}</td>
                    <td className="py-3 pr-4 text-right text-emerald-400 font-medium">{o.total}</td>
                    <td className="py-3 pr-4">
                      <span className={`rounded-lg px-2.5 py-1 text-xs font-medium ${statusColorMap[o.status] || 'bg-nm-card text-nm-muted'}`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="py-3 text-right text-nm-text-dim text-xs">{o.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}