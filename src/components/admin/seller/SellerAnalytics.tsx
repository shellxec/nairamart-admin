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
  Eye,
  MousePointerClick,
  Target,
  DollarSign,
  TrendingUp,
} from 'lucide-react';

// ─── Mock Data ────────────────────────────────────────────────────
const kpiCards = [
  { label: 'Total Visitors', value: '12,450', icon: Eye, color: 'emerald' },
  { label: 'Page Views', value: '45,200', icon: MousePointerClick, color: 'blue' },
  { label: 'Conversion Rate', value: '4.2%', icon: Target, color: 'amber' },
  { label: 'Avg Order Value', value: '₦8,200', icon: DollarSign, color: 'emerald' },
];

function generateVisitorsData() {
  return Array.from({ length: 30 }, (_, i) => ({
    day: `${i + 1}`,
    visitors: Math.floor(300 + Math.random() * 200 + (i > 15 ? 50 : 0)),
  }));
}

const topProducts = [
  { name: 'iPhone 14 Pro Max', views: 3240, sold: 124, revenue: '₦74.4M', conversion: '3.8%' },
  { name: 'Samsung Galaxy S23 Ultra', views: 2890, sold: 98, revenue: '₦52.7M', conversion: '3.4%' },
  { name: 'AirPods Pro 2nd Gen', views: 2560, sold: 215, revenue: '₦32.2M', conversion: '8.4%' },
  { name: 'MacBook Air M2 13"', views: 1980, sold: 67, revenue: '₦66.9M', conversion: '3.4%' },
  { name: 'Apple Watch Series 9', views: 1750, sold: 89, revenue: '₦26.7M', conversion: '5.1%' },
];

const topCities = [
  { city: 'Lagos', percentage: 45 },
  { city: 'Abuja', percentage: 18 },
  { city: 'Port Harcourt', percentage: 12 },
  { city: 'Kano', percentage: 8 },
  { city: 'Others', percentage: 17 },
];

const trafficSources = [
  { source: 'Direct', percentage: 40, color: '#AFE607' },
  { source: 'Search', percentage: 35, color: '#3B82F6' },
  { source: 'Social', percentage: 15, color: '#F59E0B' },
  { source: 'Email', percentage: 10, color: '#8B5CF6' },
];

const colorMap: Record<string, string> = {
  emerald: 'bg-emerald-500/15 text-emerald-400',
  blue: 'bg-blue-500/15 text-blue-400',
  amber: 'bg-amber-500/15 text-amber-400',
};

function VisitorsTooltip({
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
      <p className="text-xs text-nm-muted mb-1">Day {label}</p>
      <p className="text-sm font-semibold text-white">{payload[0].value} visitors</p>
    </div>
  );
}

export default function SellerAnalytics() {
  const [visitorsData] = useState(generateVisitorsData);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="text-sm text-nm-muted mt-1">Insights into your store performance and customer behavior</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpiCards.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="bg-nm-card rounded-2xl border border-nm-border p-5">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorMap[kpi.color]} mb-3`}>
                <Icon size={18} />
              </div>
              <p className="text-xs text-nm-muted mb-1">{kpi.label}</p>
              <p className="text-2xl font-bold text-white">{kpi.value}</p>
            </div>
          );
        })}
      </div>

      {/* Visitors Chart */}
      <div className="bg-nm-card rounded-2xl border border-nm-border p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-white">Store Visitors (Last 30 Days)</h2>
          <div className="flex items-center gap-2">
            <TrendingUp size={14} className="text-emerald-400" />
            <span className="text-xs text-emerald-400">+12.5% vs last month</span>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={visitorsData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="seller-analytics-visitorGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#AFE607" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#AFE607" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E1E28" />
              <XAxis
                dataKey="day"
                tick={{ fill: '#6B7280', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                interval={4}
              />
              <YAxis
                tick={{ fill: '#6B7280', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<VisitorsTooltip />} />
              <Area
                type="monotone"
                dataKey="visitors"
                stroke="#AFE607"
                strokeWidth={2}
                fill="url(#seller-analytics-visitorGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-nm-card rounded-2xl border border-nm-border p-5">
          <h2 className="text-base font-semibold text-white mb-4">Top Products</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-nm-border">
                  <th className="text-left text-nm-muted font-medium pb-3 pr-3">Product</th>
                  <th className="text-right text-nm-muted font-medium pb-3 pr-3">Views</th>
                  <th className="text-right text-nm-muted font-medium pb-3 pr-3">Sold</th>
                  <th className="text-right text-nm-muted font-medium pb-3 pr-3 hidden sm:table-cell">Revenue</th>
                  <th className="text-right text-nm-muted font-medium pb-3">Conv.</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((p) => (
                  <tr key={p.name} className="border-b border-nm-border/50 hover:bg-nm-card-hover transition-colors">
                    <td className="py-3 pr-3 text-white font-medium">{p.name}</td>
                    <td className="py-3 pr-3 text-right text-nm-text-dim">{p.views.toLocaleString()}</td>
                    <td className="py-3 pr-3 text-right text-nm-text-dim">{p.sold}</td>
                    <td className="py-3 pr-3 text-right text-emerald-400 font-medium hidden sm:table-cell">{p.revenue}</td>
                    <td className="py-3 text-right">
                      <span className="bg-[#AFE607]/10 text-[#AFE607] rounded-lg px-2 py-0.5 text-xs font-medium">
                        {p.conversion}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Customer Insights */}
        <div className="space-y-6">
          {/* Top Cities */}
          <div className="bg-nm-card rounded-2xl border border-nm-border p-5">
            <h2 className="text-base font-semibold text-white mb-4">Top Cities</h2>
            <div className="space-y-3">
              {topCities.map((c) => (
                <div key={c.city} className="flex items-center gap-3">
                  <span className="text-sm text-nm-text-dim w-28 shrink-0">{c.city}</span>
                  <div className="flex-1 h-2.5 bg-nm-input rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#AFE607] rounded-full transition-all duration-500"
                      style={{ width: `${c.percentage}%` }}
                    />
                  </div>
                  <span className="text-xs text-white font-medium w-10 text-right">{c.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Traffic Sources */}
          <div className="bg-nm-card rounded-2xl border border-nm-border p-5">
            <h2 className="text-base font-semibold text-white mb-4">Traffic Sources</h2>
            <div className="space-y-3">
              {trafficSources.map((t) => (
                <div key={t.source} className="flex items-center gap-3">
                  <span className="text-sm text-nm-text-dim w-16 shrink-0">{t.source}</span>
                  <div className="flex-1 h-6 bg-nm-input rounded-lg overflow-hidden">
                    <div
                      className="h-full rounded-lg flex items-center pl-2 transition-all duration-500"
                      style={{ width: `${t.percentage}%`, backgroundColor: t.color + '40', borderLeft: `3px solid ${t.color}` }}
                    >
                      <span className="text-[10px] font-medium" style={{ color: t.color }}>{t.percentage}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}