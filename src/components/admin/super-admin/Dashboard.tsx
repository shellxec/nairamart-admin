'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';
import {
  Wallet,
  TrendingUp,
  Users,
  Package,
  ShoppingCart,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  UserPlus,
  Eye,
  MousePointerClick,
  Ticket,
  Clock,
  Store,
  Globe,
  Target,
  RotateCcw,
  Receipt,
  Calendar,
} from 'lucide-react';
import {
  dashboardKPIs,
  revenueChartData,
  categoryData,
  topSellersData,
  orderStatusData,
  sellerStatusData,
  recentActivities,
} from '@/data/admin-data';
import type { KPIData } from '@/store/admin-store';

// ─── Icon Map ─────────────────────────────────────────────────────
const iconMap: Record<string, React.ElementType> = {
  Wallet,
  TrendingUp,
  Users,
  Package,
  ShoppingCart,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  UserPlus,
  Eye,
  MousePointerClick,
  Ticket,
  Clock,
  Store,
  Globe,
  Target,
  RotateCcw,
  Receipt,
  Calendar,
};

const colorMap: Record<string, string> = {
  emerald: 'bg-emerald-500/15 text-emerald-400',
  blue: 'bg-blue-500/15 text-blue-400',
  amber: 'bg-amber-500/15 text-amber-400',
  red: 'bg-red-500/15 text-red-400',
  violet: 'bg-violet-500/15 text-violet-400',
};

const activityColorMap: Record<string, string> = {
  seller: 'bg-emerald-400',
  product: 'bg-amber-400',
  finance: 'bg-blue-400',
  commission: 'bg-violet-400',
  support: 'bg-cyan-400',
  cms: 'bg-pink-400',
  coupon: 'bg-orange-400',
  report: 'bg-indigo-400',
  review: 'bg-red-400',
};

// ─── Formatters ───────────────────────────────────────────────────
function formatNairaShort(value: number): string {
  if (value >= 1_000_000_000) return `₦${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `₦${(value / 1_000_000).toFixed(0)}M`;
  if (value >= 1_000) return `₦${(value / 1_000).toFixed(0)}K`;
  return `₦${value}`;
}

function formatNairaFull(value: number): string {
  return `₦${(value / 1_000_000).toFixed(1)}M`;
}

// ─── Custom Tooltip ───────────────────────────────────────────────
function RevenueTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1C1C24] border border-nm-border rounded-xl px-4 py-3 shadow-xl">
      <p className="text-xs text-nm-muted mb-1">{label} 2024</p>
      <p className="text-sm font-semibold text-white">
        ₦{(payload[0].value / 1_000_000).toFixed(0)}M
      </p>
    </div>
  );
}

// ─── KPI Card ─────────────────────────────────────────────────────
function KPICard({ data, index }: { data: KPIData; index: number }) {
  const Icon = iconMap[data.icon] || Package;
  const colorClasses = colorMap[data.color] || colorMap.emerald;
  const isPositive = data.change > 0;
  const isNeutral = data.change === 0;

  return (
    <div
      className="glass-light rounded-2xl p-5 animate-fade-in hover:bg-white/[0.05] transition-colors duration-200"
      style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorClasses}`}>
          <Icon size={18} />
        </div>
        {!isNeutral && (
          <span
            className={`text-xs font-medium flex items-center gap-0.5 ${
              isPositive ? 'text-emerald-400' : 'text-red-400'
            }`}
          >
            {isPositive ? '▲' : '▼'} {Math.abs(data.change)}
            {data.label.includes('Rate') || data.label.includes('Revenue') || data.label.includes('Traffic')
              ? '%'
              : ''}
          </span>
        )}
        {isNeutral && (
          <span className="text-xs text-nm-muted">—</span>
        )}
      </div>
      <p className="text-xs text-nm-muted mb-1">{data.label}</p>
      <p className="text-2xl font-bold text-white">
        {data.prefix || ''}{data.value}
      </p>
    </div>
  );
}

// ─── Legend Item ──────────────────────────────────────────────────
function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
      <span className="text-xs text-nm-muted">{label}</span>
    </div>
  );
}

// ─── Star Rating ──────────────────────────────────────────────────
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-3.5 h-3.5 ${star <= Math.round(rating) ? 'text-[#AFE607]' : 'text-nm-border'}`}
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

// ─── Main Dashboard Component ─────────────────────────────────────
export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* ── Page Header ──────────────────────────────────────────── */}
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-sm text-nm-muted mt-1">
          Welcome back, Admin. Here&apos;s what&apos;s happening.
        </p>
        <p className="text-xs text-nm-text-dim mt-2">
          Last updated: just now
        </p>
      </div>

      {/* ── KPI Grid ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {dashboardKPIs.map((kpi, i) => (
          <KPICard key={kpi.label} data={kpi} index={i} />
        ))}
      </div>

      {/* ── Charts Row 1: Revenue Trends + Order Status ──────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trends Chart */}
        <div className="bg-nm-card rounded-2xl p-5 border border-nm-border animate-fade-in" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
          <h3 className="text-sm font-semibold text-white mb-4">Revenue Trends</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueChartData} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="dash-revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#AFE607" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#AFE607" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E1E28" vertical={false} />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={formatNairaShort}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                  domain={['dataMin - 50000000', 'dataMax + 50000000']}
                />
                <Tooltip content={<RevenueTooltip />} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#AFE607"
                  strokeWidth={2}
                  fill="url(#dash-revenueGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order Status Distribution */}
        <div className="bg-nm-card rounded-2xl p-5 border border-nm-border animate-fade-in" style={{ animationDelay: '150ms', animationFillMode: 'both' }}>
          <h3 className="text-sm font-semibold text-white mb-4">Order Status Distribution</h3>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="count"
                  stroke="none"
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`order-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1C1C24',
                    border: '1px solid #1E1E28',
                    borderRadius: '12px',
                    fontSize: '13px',
                    color: '#E5E7EB',
                  }}
                  itemStyle={{ color: '#E5E7EB' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Legend */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
            {orderStatusData.map((entry) => (
              <LegendItem key={entry.status} color={entry.color} label={`${entry.status} (${entry.count.toLocaleString()})`} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Charts Row 2: Category Performance + Seller Status ───── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Performance */}
        <div className="bg-nm-card rounded-2xl p-5 border border-nm-border animate-fade-in" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
          <h3 className="text-sm font-semibold text-white mb-4">Category Performance</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={categoryData.slice(0, 8)}
                layout="vertical"
                margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1E1E28" horizontal={false} />
                <XAxis
                  type="number"
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={formatNairaFull}
                  tick={{ fill: '#6B7280', fontSize: 11 }}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  width={90}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1C1C24',
                    border: '1px solid #1E1E28',
                    borderRadius: '12px',
                    fontSize: '13px',
                    color: '#E5E7EB',
                  }}
                  formatter={(value: number) => [`₦${(value / 1_000_000).toFixed(1)}M`, 'Revenue']}
                />
                <Bar dataKey="revenue" fill="#AFE607" radius={[0, 6, 6, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Seller Status */}
        <div className="bg-nm-card rounded-2xl p-5 border border-nm-border animate-fade-in" style={{ animationDelay: '250ms', animationFillMode: 'both' }}>
          <h3 className="text-sm font-semibold text-white mb-4">Seller Status</h3>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sellerStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="count"
                  stroke="none"
                >
                  {sellerStatusData.map((entry, index) => (
                    <Cell key={`seller-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1C1C24',
                    border: '1px solid #1E1E28',
                    borderRadius: '12px',
                    fontSize: '13px',
                    color: '#E5E7EB',
                  }}
                  itemStyle={{ color: '#E5E7EB' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Legend */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
            {sellerStatusData.map((entry) => (
              <LegendItem key={entry.status} color={entry.color} label={`${entry.status} (${entry.count.toLocaleString()})`} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom Row: Top Sellers + Recent Activity ─────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Sellers Table */}
        <div className="bg-nm-card rounded-2xl p-5 border border-nm-border animate-fade-in" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
          <h3 className="text-sm font-semibold text-white mb-4">Top Sellers</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-nm-border">
                  <th className="text-left text-xs font-medium text-nm-muted pb-3 pr-3">#</th>
                  <th className="text-left text-xs font-medium text-nm-muted pb-3 pr-3">Store</th>
                  <th className="text-right text-xs font-medium text-nm-muted pb-3 pr-3">Revenue</th>
                  <th className="text-right text-xs font-medium text-nm-muted pb-3 pr-3">Orders</th>
                  <th className="text-right text-xs font-medium text-nm-muted pb-3">Rating</th>
                </tr>
              </thead>
              <tbody>
                {topSellersData.map((seller, i) => (
                  <tr
                    key={seller.store}
                    className="border-b border-nm-border/50 last:border-0 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="py-3 pr-3">
                      <span className={`text-xs font-bold w-6 h-6 inline-flex items-center justify-center rounded-lg ${
                        i === 0
                          ? 'bg-[#AFE607]/15 text-[#AFE607]'
                          : i === 1
                          ? 'bg-gray-400/15 text-gray-400'
                          : i === 2
                          ? 'bg-amber-600/15 text-amber-600'
                          : 'bg-nm-border text-nm-muted'
                      }`}>
                        {i + 1}
                      </span>
                    </td>
                    <td className="py-3 pr-3">
                      <p className="text-sm font-medium text-white">{seller.store}</p>
                      <p className="text-xs text-nm-muted">{seller.name}</p>
                    </td>
                    <td className="py-3 pr-3 text-right text-sm font-medium text-white">
                      ₦{(seller.revenue / 1_000_000).toFixed(1)}M
                    </td>
                    <td className="py-3 pr-3 text-right text-sm text-nm-text-dim">
                      {seller.orders.toLocaleString()}
                    </td>
                    <td className="py-3 text-right">
                      <StarRating rating={seller.rating} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-nm-card rounded-2xl p-5 border border-nm-border animate-fade-in" style={{ animationDelay: '350ms', animationFillMode: 'both' }}>
          <h3 className="text-sm font-semibold text-white mb-4">Recent Activity</h3>
          <div className="space-y-0 max-h-[360px] overflow-y-auto">
            {recentActivities.map((activity, i) => (
              <div
                key={i}
                className="flex items-start gap-3 py-3 border-b border-nm-border/50 last:border-0 hover:bg-white/[0.02] transition-colors rounded-lg px-2 -mx-2"
              >
                <div className="mt-1.5 shrink-0">
                  <span
                    className={`w-2.5 h-2.5 rounded-full inline-block ${
                      activityColorMap[activity.type] || 'bg-nm-muted'
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-nm-text leading-snug">{activity.action}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-medium text-white">{activity.user}</span>
                    <span className="text-xs text-nm-muted">·</span>
                    <span className="text-xs text-nm-muted">{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}