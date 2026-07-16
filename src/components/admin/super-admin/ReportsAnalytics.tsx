'use client';

import { useState } from 'react';
import {
  Download,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Eye,
  Package,
  Users,
  ShoppingCart,
  RefreshCcw,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

type ReportType = 'revenue' | 'traffic' | 'products' | 'sellers' | 'customers' | 'refunds';

interface KPI {
  label: string;
  value: string;
  change: number;
}

interface ReportConfig {
  key: ReportType;
  label: string;
  icon: typeof DollarSign;
  data: { label: string; value: number }[];
  kpis: KPI[];
  color: string;
}

const reports: ReportConfig[] = [
  {
    key: 'revenue',
    label: 'Revenue',
    icon: DollarSign,
    color: '#AFE607',
    data: [
      { label: 'Jun', value: 280 }, { label: 'Jul', value: 295 }, { label: 'Aug', value: 312 },
      { label: 'Sep', value: 298 }, { label: 'Oct', value: 325 }, { label: 'Nov', value: 356 }, { label: 'Dec', value: 342 },
    ],
    kpis: [
      { label: 'Total Revenue', value: '₦847.5M', change: 12.5 },
      { label: 'Monthly Revenue', value: '₦342M', change: 15.2 },
      { label: 'Avg Order Value', value: '₦8,540', change: 2.1 },
    ],
  },
  {
    key: 'traffic',
    label: 'Traffic',
    icon: Eye,
    color: '#3B82F6',
    data: [
      { label: 'Jun', value: 61000 }, { label: 'Jul', value: 67000 }, { label: 'Aug', value: 72000 },
      { label: 'Sep', value: 69000 }, { label: 'Oct', value: 78000 }, { label: 'Nov', value: 85000 }, { label: 'Dec', value: 89432 },
    ],
    kpis: [
      { label: 'Total Visits', value: '521,432', change: 12.3 },
      { label: 'Unique Visitors', value: '312,000', change: 8.7 },
      { label: 'Bounce Rate', value: '38.2%', change: -3.5 },
    ],
  },
  {
    key: 'products',
    label: 'Products',
    icon: Package,
    color: '#8B5CF6',
    data: [
      { label: 'Jun', value: 35200 }, { label: 'Jul', value: 38000 }, { label: 'Aug', value: 40200 },
      { label: 'Sep', value: 41500 }, { label: 'Oct', value: 43200 }, { label: 'Nov', value: 44800 }, { label: 'Dec', value: 45892 },
    ],
    kpis: [
      { label: 'Total Products', value: '45,892', change: 1567 },
      { label: 'New This Month', value: '1,092', change: 234 },
      { label: 'Out of Stock', value: '1,245', change: -89 },
    ],
  },
  {
    key: 'sellers',
    label: 'Sellers',
    icon: Users,
    color: '#F59E0B',
    data: [
      { label: 'Jun', value: 2410 }, { label: 'Jul', value: 2560 }, { label: 'Aug', value: 2630 },
      { label: 'Sep', value: 2700 }, { label: 'Oct', value: 2760 }, { label: 'Nov', value: 2810 }, { label: 'Dec', value: 2847 },
    ],
    kpis: [
      { label: 'Active Sellers', value: '2,847', change: 156 },
      { label: 'Avg Rating', value: '4.6', change: 0.1 },
      { label: 'Top Seller Revenue', value: '₦55.2M', change: 8.4 },
    ],
  },
  {
    key: 'customers',
    label: 'Customers',
    icon: ShoppingCart,
    color: '#10B981',
    data: [
      { label: 'Jun', value: 38500 }, { label: 'Jul', value: 40200 }, { label: 'Aug', value: 42100 },
      { label: 'Sep', value: 43800 }, { label: 'Oct', value: 45600 }, { label: 'Nov', value: 47200 }, { label: 'Dec', value: 48900 },
    ],
    kpis: [
      { label: 'Total Customers', value: '48,900', change: 1700 },
      { label: 'Retention Rate', value: '80%', change: 2.0 },
      { label: 'Avg Spend', value: '₦12,340', change: 5.3 },
    ],
  },
  {
    key: 'refunds',
    label: 'Refunds',
    icon: RefreshCcw,
    color: '#EF4444',
    data: [
      { label: 'Jun', value: 120 }, { label: 'Jul', value: 145 }, { label: 'Aug', value: 162 },
      { label: 'Sep', value: 138 }, { label: 'Oct', value: 155 }, { label: 'Nov', value: 178 }, { label: 'Dec', value: 168 },
    ],
    kpis: [
      { label: 'Total Refunds', value: '946', change: 5.2 },
      { label: 'Refund Rate', value: '2.8%', change: -0.3 },
      { label: 'Refund Amount', value: '₦12.8M', change: -5.2 },
    ],
  },
];

export default function ReportsAnalytics() {
  const [activeReport, setActiveReport] = useState<ReportType>('revenue');

  const report = reports.find((r) => r.key === activeReport);
  if (!report) return null;

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-white text-2xl font-semibold">Reports & Analytics</h1>
          <p className="text-nm-muted text-sm mt-1">Platform analytics and reporting</p>
        </div>
        <div className="flex items-center gap-2">
          {['CSV', 'Excel', 'PDF'].map((fmt) => (
            <button
              key={fmt}
              className="flex items-center gap-1.5 border border-nm-border text-nm-text-dim hover:text-white hover:border-nm-border-light rounded-xl px-4 py-2 text-sm transition-colors"
            >
              <Download size={14} />
              {fmt}
            </button>
          ))}
        </div>
      </div>

      {/* Report Type Selector */}
      <div className="flex gap-1.5 overflow-x-auto hide-scrollbar">
        {reports.map((r) => (
          <button
            key={r.key}
            onClick={() => setActiveReport(r.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
              activeReport === r.key
                ? 'bg-[#AFE607] text-black'
                : 'text-nm-muted hover:text-white hover:bg-nm-card-hover'
            }`}
          >
            <r.icon size={14} />
            {r.label}
          </button>
        ))}
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {report.kpis.map((kpi) => (
          <div key={kpi.label} className="bg-nm-card rounded-2xl border border-nm-border p-5">
            <p className="text-nm-muted text-xs font-medium">{kpi.label}</p>
            <div className="flex items-end gap-2 mt-2">
              <p className="text-white text-xl font-semibold">{kpi.value}</p>
              <div className={`flex items-center gap-0.5 text-xs pb-0.5 ${kpi.change > 0 ? 'text-emerald-400' : kpi.change < 0 ? 'text-red-400' : 'text-nm-muted'}`}>
                {kpi.change > 0 ? <TrendingUp size={12} /> : kpi.change < 0 ? <TrendingDown size={12} /> : null}
                <span>{kpi.change !== 0 ? (Math.abs(kpi.change) > 100 ? `+${kpi.change}` : `${kpi.change}%`) : ''}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Area */}
      <div className="bg-nm-card rounded-2xl border border-nm-border p-6">
        <h3 className="text-white font-semibold mb-6">{report.label} Trend</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={report.data}>
              <defs>
                <linearGradient id="reports-chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={report.color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={report.color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="label" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#14141A',
                  border: '1px solid #1E1E28',
                  borderRadius: '12px',
                  color: '#E5E7EB',
                  fontSize: '12px',
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={report.color}
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#reports-chartGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}