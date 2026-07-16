'use client';

import { useState } from 'react';
import {
  Wallet,
  Clock,
  TrendingUp,
  Receipt,
  Landmark,
  ArrowDownToLine,
  CreditCard,
  Banknote,
  XCircle,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';

// ─── Mock Data ────────────────────────────────────────────────────
const kpiCards = [
  { label: 'Available Balance', value: '₦1.2M', icon: Wallet, color: 'emerald' },
  { label: 'Pending Payouts', value: '₦850K', icon: Clock, color: 'amber' },
  { label: 'Total Earnings', value: '₦24.5M', icon: TrendingUp, color: 'emerald' },
  { label: 'Commission Paid', value: '₦1.225M', icon: Receipt, color: 'violet' },
  { label: 'Taxes', value: '₦367K', icon: Landmark, color: 'blue' },
  { label: 'Withdrawn', value: '₦22.1M', icon: ArrowDownToLine, color: 'cyan' },
];

const payoutStatusColor: Record<string, string> = {
  Completed: 'bg-emerald-500/10 text-emerald-400',
  Pending: 'bg-amber-500/10 text-amber-400',
  Failed: 'bg-red-500/10 text-red-400',
};

interface Payout {
  date: string;
  amount: number;
  method: string;
  status: string;
  reference: string;
}

const payoutHistory: Payout[] = [
  { date: 'Jan 15, 2025', amount: 1200000, method: 'Bank Transfer', status: 'Completed', reference: 'PAY-2025-0115-001' },
  { date: 'Jan 1, 2025', amount: 950000, method: 'Paystack', status: 'Completed', reference: 'PAY-2025-0101-001' },
  { date: 'Dec 15, 2024', amount: 1100000, method: 'Bank Transfer', status: 'Completed', reference: 'PAY-2024-1215-001' },
  { date: 'Dec 1, 2024', amount: 800000, method: 'Paystack', status: 'Completed', reference: 'PAY-2024-1201-001' },
  { date: 'Nov 15, 2024', amount: 1050000, method: 'Bank Transfer', status: 'Completed', reference: 'PAY-2024-1115-001' },
  { date: 'Nov 1, 2024', amount: 750000, method: 'Bank Transfer', status: 'Completed', reference: 'PAY-2024-1101-001' },
  { date: 'Oct 15, 2024', amount: 900000, method: 'Paystack', status: 'Failed', reference: 'PAY-2024-1015-001' },
  { date: 'Oct 1, 2024', amount: 1200000, method: 'Bank Transfer', status: 'Completed', reference: 'PAY-2024-1001-001' },
];

const monthlyEarnings = [
  { month: 'Aug', amount: 1800000 },
  { month: 'Sep', amount: 2200000 },
  { month: 'Oct', amount: 2400000 },
  { month: 'Nov', amount: 2700000 },
  { month: 'Dec', amount: 2500000 },
  { month: 'Jan', amount: 2450000 },
];

const maxEarning = Math.max(...monthlyEarnings.map((e) => e.amount));

const colorMap: Record<string, string> = {
  emerald: 'bg-emerald-500/15 text-emerald-400',
  amber: 'bg-amber-500/15 text-amber-400',
  violet: 'bg-violet-500/15 text-violet-400',
  blue: 'bg-blue-500/15 text-blue-400',
  cyan: 'bg-cyan-500/15 text-cyan-400',
};

export default function SellerFinance() {
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Finance</h1>
          <p className="text-sm text-nm-muted mt-1">Track earnings, payouts, and financial reports</p>
        </div>
        <button
          onClick={() => setShowWithdrawModal(true)}
          className="bg-[#AFE607] text-black font-medium rounded-xl px-4 py-2 text-sm flex items-center gap-2 hover:bg-[#9dd006] transition-colors"
        >
          <Banknote size={16} />
          Request Withdrawal
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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

      {/* Earnings Breakdown */}
      <div className="bg-nm-card rounded-2xl border border-nm-border p-5">
        <h2 className="text-base font-semibold text-white mb-5">Monthly Earnings Breakdown</h2>
        <div className="space-y-4">
          {monthlyEarnings.map((e) => (
            <div key={e.month} className="flex items-center gap-4">
              <span className="text-xs text-nm-muted w-8 shrink-0">{e.month}</span>
              <div className="flex-1 h-6 bg-nm-input rounded-lg overflow-hidden">
                <div
                  className="h-full bg-[#AFE607]/30 rounded-lg flex items-center"
                  style={{ width: `${(e.amount / maxEarning) * 100}%` }}
                >
                  <div
                    className="h-full bg-[#AFE607] rounded-lg"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
              <span className="text-sm text-white font-medium w-24 text-right shrink-0">
                ₦{(e.amount / 1_000_000).toFixed(1)}M
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Payout History */}
      <div className="bg-nm-card rounded-2xl border border-nm-border overflow-hidden">
        <div className="px-5 py-4 border-b border-nm-border">
          <h2 className="text-base font-semibold text-white">Payout History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-nm-border">
                <th className="text-left text-nm-muted font-medium px-5 py-3">Date</th>
                <th className="text-right text-nm-muted font-medium px-5 py-3">Amount</th>
                <th className="text-left text-nm-muted font-medium px-5 py-3">Method</th>
                <th className="text-left text-nm-muted font-medium px-5 py-3">Status</th>
                <th className="text-left text-nm-muted font-medium px-5 py-3">Reference</th>
              </tr>
            </thead>
            <tbody>
              {payoutHistory.map((payout, i) => (
                <tr key={i} className="border-b border-nm-border/50 hover:bg-nm-card-hover transition-colors">
                  <td className="px-5 py-3 text-white">{payout.date}</td>
                  <td className="px-5 py-3 text-right text-emerald-400 font-medium">₦{payout.amount.toLocaleString()}</td>
                  <td className="px-5 py-3 text-nm-text-dim flex items-center gap-2">
                    {payout.method === 'Paystack' ? (
                      <CreditCard size={14} className="text-nm-muted" />
                    ) : (
                      <Banknote size={14} className="text-nm-muted" />
                    )}
                    {payout.method}
                  </td>
                  <td className="px-5 py-3">
                    <span className={`rounded-lg px-2.5 py-1 text-xs font-medium ${payoutStatusColor[payout.status]}`}>
                      {payout.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-nm-text-dim font-mono text-xs">{payout.reference}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Withdrawal Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowWithdrawModal(false)}>
          <div className="bg-nm-card rounded-2xl border border-nm-border p-6 w-full max-w-md animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-white">Request Withdrawal</h3>
              <button onClick={() => setShowWithdrawModal(false)} className="text-nm-muted hover:text-white transition-colors">
                <XCircle size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-nm-muted mb-1.5 block">Available Balance</label>
                <div className="bg-nm-input border border-nm-border rounded-xl px-3 py-2 text-lg font-bold text-emerald-400">
                  ₦1,200,000
                </div>
              </div>
              <div>
                <label className="text-xs text-nm-muted mb-1.5 block">Amount (₦)</label>
                <input
                  type="text"
                  placeholder="Enter amount"
                  className="w-full bg-nm-input border border-nm-border rounded-xl px-3 py-2 text-sm text-white placeholder:text-nm-muted focus:outline-none focus:border-[#AFE607]/40"
                />
              </div>
              <div>
                <label className="text-xs text-nm-muted mb-1.5 block">Withdrawal Method</label>
                <select className="w-full bg-nm-input border border-nm-border rounded-xl px-3 py-2 text-sm text-white appearance-none focus:outline-none focus:border-[#AFE607]/40">
                  <option>Bank Transfer</option>
                  <option>Paystack</option>
                </select>
              </div>
              <div className="flex items-start gap-2 bg-amber-500/10 rounded-xl p-3">
                <AlertTriangle size={16} className="text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-300/80">Withdrawals are processed within 24-48 business hours. A 5% commission fee applies.</p>
              </div>
              <button className="w-full bg-[#AFE607] text-black font-medium rounded-xl px-4 py-2.5 text-sm hover:bg-[#9dd006] transition-colors">
                Confirm Withdrawal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}