'use client';

import {
  Wallet,
  TrendingUp,
  Clock,
  CheckCircle,
  RotateCcw,
  Receipt,
  ArrowUpRight,
  ArrowDownRight,
  Check,
  X,
} from 'lucide-react';

interface PayoutRequest {
  id: string;
  seller: string;
  amount: number;
  method: string;
  status: 'pending' | 'approved' | 'completed' | 'rejected';
  requestedAt: string;
}

const payouts: PayoutRequest[] = [
  { id: 'PAY-001', seller: 'Chukwuma Okafor', amount: 2450000, method: 'Bank Transfer', status: 'pending', requestedAt: '2026-01-15T09:00:00Z' },
  { id: 'PAY-002', seller: 'Ibrahim Danjuma', amount: 1800000, method: 'Bank Transfer', status: 'pending', requestedAt: '2026-01-15T10:30:00Z' },
  { id: 'PAY-003', seller: 'Aminat Ibrahim', amount: 980000, method: 'Bank Transfer', status: 'pending', requestedAt: '2026-01-14T14:00:00Z' },
  { id: 'PAY-004', seller: 'Emeka Nwankwo', amount: 3200000, method: 'Bank Transfer', status: 'approved', requestedAt: '2026-01-13T11:00:00Z' },
  { id: 'PAY-005', seller: 'Olusegun Adeyemi', amount: 1500000, method: 'Bank Transfer', status: 'rejected', requestedAt: '2026-01-12T16:00:00Z' },
];

const payoutStatusColors: Record<PayoutRequest['status'], string> = {
  pending: 'bg-amber-500/10 text-amber-400',
  approved: 'bg-blue-500/10 text-blue-400',
  completed: 'bg-emerald-500/10 text-emerald-400',
  rejected: 'bg-red-500/10 text-red-400',
};

const categoryRevenue = [
  { name: 'Electronics', revenue: 285000000, pct: 33.6 },
  { name: 'Phones & Tablets', revenue: 178000000, pct: 21.0 },
  { name: 'Fashion', revenue: 145000000, pct: 17.1 },
  { name: 'Beauty & Health', revenue: 89000000, pct: 10.5 },
  { name: 'Home & Kitchen', revenue: 62000000, pct: 7.3 },
  { name: 'Computers', revenue: 54000000, pct: 6.4 },
  { name: 'Others', revenue: 34500000, pct: 4.1 },
];

export default function FinanceDashboard() {
  const kpis = [
    { label: 'Platform Revenue', value: '₦847.5M', change: 12.5, icon: Wallet, color: 'text-emerald-400', positive: true },
    { label: 'Seller Earnings', value: '₦612.3M', change: 10.2, icon: TrendingUp, color: 'text-[#AFE607]', positive: true },
    { label: 'Pending Payouts', value: '₦8.5M', change: 2, icon: Clock, color: 'text-amber-400', positive: false },
    { label: 'Completed Payouts', value: '₦603.8M', change: 8.7, icon: CheckCircle, color: 'text-emerald-400', positive: true },
    { label: 'Refunds', value: '₦12.4M', change: -5.2, icon: RotateCcw, color: 'text-red-400', positive: false },
    { label: 'VAT Collected', value: '₦42.8M', change: 12.5, icon: Receipt, color: 'text-blue-400', positive: true },
  ];

  const maxPct = Math.max(...categoryRevenue.map((c) => c.pct));

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-white text-2xl font-semibold">Finance Dashboard</h1>
        <p className="text-nm-muted text-sm mt-1">Platform revenue, payouts, and financial overview</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-nm-card rounded-2xl border border-nm-border p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-nm-muted text-xs font-medium">{kpi.label}</span>
              <kpi.icon size={16} className={kpi.color} />
            </div>
            <p className="text-white text-lg font-semibold">{kpi.value}</p>
            <div className={`flex items-center gap-1 mt-1.5 text-xs ${kpi.positive && kpi.change > 0 ? 'text-emerald-400' : 'text-nm-muted'}`}>
              {kpi.change > 0 ? (
                <><ArrowUpRight size={12} /><span>{kpi.change}%</span></>
              ) : (
                <><ArrowDownRight size={12} /><span>{Math.abs(kpi.change)}%</span></>
              )}
              <span className="text-nm-muted ml-1">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Breakdown by Category */}
        <div className="bg-nm-card rounded-2xl border border-nm-border overflow-hidden">
          <div className="p-5 border-b border-nm-border">
            <h3 className="text-white font-semibold">Revenue Breakdown by Category</h3>
            <p className="text-nm-muted text-xs mt-0.5">This month&apos;s breakdown</p>
          </div>
          <div className="p-5 space-y-4">
            {categoryRevenue.map((cat) => (
              <div key={cat.name}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="text-nm-text-dim">{cat.name}</span>
                  <span className="text-white font-medium">₦{(cat.revenue / 1000000).toFixed(0)}M</span>
                </div>
                <div className="w-full bg-nm-input rounded-full h-2.5">
                  <div
                    className="bg-[#AFE607] h-2.5 rounded-full transition-all"
                    style={{ width: `${(cat.pct / maxPct) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Payout Requests */}
        <div className="bg-nm-card rounded-2xl border border-nm-border overflow-hidden">
          <div className="p-5 border-b border-nm-border">
            <h3 className="text-white font-semibold">Recent Payout Requests</h3>
            <p className="text-nm-muted text-xs mt-0.5">Seller withdrawal requests</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-nm-border text-left">
                  <th className="p-4 text-nm-muted font-medium">Seller</th>
                  <th className="p-4 text-nm-muted font-medium">Amount</th>
                  <th className="p-4 text-nm-muted font-medium hidden sm:table-cell">Method</th>
                  <th className="p-4 text-nm-muted font-medium">Status</th>
                  <th className="p-4 text-nm-muted font-medium hidden md:table-cell">Date</th>
                  <th className="p-4 text-nm-muted font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {payouts.map((payout) => (
                  <tr key={payout.id} className="border-b border-nm-border hover:bg-nm-card-hover transition-colors">
                    <td className="p-4 text-white">{payout.seller}</td>
                    <td className="p-4 text-white font-medium">₦{payout.amount.toLocaleString()}</td>
                    <td className="p-4 text-nm-text-dim hidden sm:table-cell">{payout.method}</td>
                    <td className="p-4">
                      <span className={`rounded-lg px-2.5 py-1 text-xs font-medium capitalize ${payoutStatusColors[payout.status]}`}>
                        {payout.status}
                      </span>
                    </td>
                    <td className="p-4 text-nm-text-dim hidden md:table-cell">
                      {new Date(payout.requestedAt).toLocaleDateString('en-NG', { month: 'short', day: 'numeric' })}
                    </td>
                    <td className="p-4">
                      {payout.status === 'pending' && (
                        <div className="flex items-center gap-1">
                          <button className="text-emerald-400 hover:text-emerald-300 p-1.5 rounded-lg hover:bg-emerald-500/10 transition-colors" title="Approve">
                            <Check size={14} />
                          </button>
                          <button className="text-red-400 hover:text-red-300 p-1.5 rounded-lg hover:bg-red-500/10 transition-colors" title="Reject">
                            <X size={14} />
                          </button>
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
    </div>
  );
}