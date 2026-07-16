'use client';

import { useState } from 'react';
import { Search, ArrowUpRight, ArrowDownRight, AlertCircle } from 'lucide-react';

interface Payment {
  id: string;
  type: 'Credit' | 'Debit' | 'Refund';
  amount: number;
  gateway: string;
  status: 'Success' | 'Failed' | 'Pending';
  date: string;
  reference: string;
}

const payments: Payment[] = [
  { id: 'TXN-2026-001', type: 'Credit', amount: 45800, gateway: 'Paystack', status: 'Success', date: '2026-01-15T10:15:00Z', reference: 'REF-PST-88234' },
  { id: 'TXN-2026-002', type: 'Credit', amount: 125000, gateway: 'Flutterwave', status: 'Success', date: '2026-01-15T09:45:00Z', reference: 'REF-FLW-77123' },
  { id: 'TXN-2026-003', type: 'Debit', amount: 78500, gateway: 'Bank Transfer', status: 'Success', date: '2026-01-15T09:00:00Z', reference: 'REF-BNK-55432' },
  { id: 'TXN-2026-004', type: 'Credit', amount: 32000, gateway: 'Paystack', status: 'Failed', date: '2026-01-15T08:30:00Z', reference: 'REF-PST-66891' },
  { id: 'TXN-2026-005', type: 'Refund', amount: 25400, gateway: 'Paystack', status: 'Success', date: '2026-01-14T16:00:00Z', reference: 'REF-PST-44321' },
  { id: 'TXN-2026-006', type: 'Credit', amount: 67800, gateway: 'Flutterwave', status: 'Pending', date: '2026-01-14T15:30:00Z', reference: 'REF-FLW-33210' },
  { id: 'TXN-2026-007', type: 'Debit', amount: 198000, gateway: 'Bank Transfer', status: 'Success', date: '2026-01-14T14:00:00Z', reference: 'REF-BNK-22109' },
  { id: 'TXN-2026-008', type: 'Credit', amount: 54200, gateway: 'Paystack', status: 'Success', date: '2026-01-14T13:00:00Z', reference: 'REF-PST-11987' },
  { id: 'TXN-2026-009', type: 'Credit', amount: 89000, gateway: 'Flutterwave', status: 'Failed', date: '2026-01-14T12:00:00Z', reference: 'REF-FLW-00876' },
  { id: 'TXN-2026-010', type: 'Debit', amount: 156000, gateway: 'Bank Transfer', status: 'Pending', date: '2026-01-14T11:00:00Z', reference: 'REF-BNK-99765' },
  { id: 'TXN-2026-011', type: 'Refund', amount: 12500, gateway: 'Paystack', status: 'Success', date: '2026-01-13T16:30:00Z', reference: 'REF-PST-88654' },
  { id: 'TXN-2026-012', type: 'Credit', amount: 34500, gateway: 'Paystack', status: 'Success', date: '2026-01-13T15:00:00Z', reference: 'REF-PST-77543' },
  { id: 'TXN-2026-013', type: 'Credit', amount: 112000, gateway: 'Flutterwave', status: 'Success', date: '2026-01-13T14:00:00Z', reference: 'REF-FLW-66432' },
  { id: 'TXN-2026-014', type: 'Debit', amount: 89000, gateway: 'Bank Transfer', status: 'Success', date: '2026-01-13T13:00:00Z', reference: 'REF-BNK-55321' },
  { id: 'TXN-2026-015', type: 'Credit', amount: 76500, gateway: 'Paystack', status: 'Pending', date: '2026-01-13T12:00:00Z', reference: 'REF-PST-44210' },
];

const typeColors: Record<Payment['type'], string> = {
  Credit: 'bg-emerald-500/10 text-emerald-400',
  Debit: 'bg-blue-500/10 text-blue-400',
  Refund: 'bg-orange-500/10 text-orange-400',
};

const statusColors: Record<Payment['status'], string> = {
  Success: 'bg-emerald-500/10 text-emerald-400',
  Failed: 'bg-red-500/10 text-red-400',
  Pending: 'bg-amber-500/10 text-amber-400',
};

export default function PaymentManagement() {
  const [search, setSearch] = useState('');
  const [gatewayFilter, setGatewayFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const filtered = payments.filter((p) => {
    const matchSearch =
      !search ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.reference.toLowerCase().includes(search.toLowerCase());
    const matchGateway = gatewayFilter === 'all' || p.gateway === gatewayFilter;
    const matchStatus = statusFilter === 'all' || p.status === statusFilter;
    const matchType = typeFilter === 'all' || p.type === typeFilter;
    return matchSearch && matchGateway && matchStatus && matchType;
  });

  const totalVolume = payments.reduce((s, p) => s + p.amount, 0);
  const successCount = payments.filter((p) => p.status === 'Success').length;
  const failedCount = payments.filter((p) => p.status === 'Failed').length;
  const successRate = Math.round((successCount / payments.length) * 100);

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-white text-2xl font-semibold">Payment Management</h1>
        <p className="text-nm-muted text-sm mt-1">Track all transactions, refunds, and payment gateway activity</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-nm-card rounded-2xl border border-nm-border p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-nm-muted text-xs font-medium">Total Volume</span>
            <ArrowUpRight size={16} className="text-emerald-400" />
          </div>
          <p className="text-white text-xl font-semibold">₦{totalVolume.toLocaleString()}</p>
          <p className="text-nm-muted text-xs mt-1">{payments.length} transactions</p>
        </div>
        <div className="bg-nm-card rounded-2xl border border-nm-border p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-nm-muted text-xs font-medium">Success Rate</span>
            <ArrowUpRight size={16} className="text-emerald-400" />
          </div>
          <p className="text-white text-xl font-semibold">{successRate}%</p>
          <p className="text-nm-muted text-xs mt-1">{successCount} successful</p>
        </div>
        <div className="bg-nm-card rounded-2xl border border-nm-border p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-nm-muted text-xs font-medium">Failed Count</span>
            <AlertCircle size={16} className="text-red-400" />
          </div>
          <p className="text-white text-xl font-semibold">{failedCount}</p>
          <p className="text-nm-muted text-xs mt-1">Requires attention</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-nm-card border border-nm-border rounded-2xl p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-nm-muted" />
            <input
              type="text"
              placeholder="Search by TXN ID or reference..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-nm-input border border-nm-border rounded-xl pl-9 pr-3 py-2 text-sm text-white placeholder:text-nm-muted focus:outline-none focus:border-nm-border-light"
            />
          </div>
          <select
            value={gatewayFilter}
            onChange={(e) => setGatewayFilter(e.target.value)}
            className="bg-nm-input border border-nm-border rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-nm-border-light"
          >
            <option value="all">All Gateways</option>
            <option value="Paystack">Paystack</option>
            <option value="Flutterwave">Flutterwave</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-nm-input border border-nm-border rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-nm-border-light"
          >
            <option value="all">All Status</option>
            <option value="Success">Success</option>
            <option value="Failed">Failed</option>
            <option value="Pending">Pending</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-nm-input border border-nm-border rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-nm-border-light"
          >
            <option value="all">All Types</option>
            <option value="Credit">Credit</option>
            <option value="Debit">Debit</option>
            <option value="Refund">Refund</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-nm-card border border-nm-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-nm-border text-left">
                <th className="p-4 text-nm-muted font-medium">TXN ID</th>
                <th className="p-4 text-nm-muted font-medium">Type</th>
                <th className="p-4 text-nm-muted font-medium">Amount</th>
                <th className="p-4 text-nm-muted font-medium hidden sm:table-cell">Gateway</th>
                <th className="p-4 text-nm-muted font-medium">Status</th>
                <th className="p-4 text-nm-muted font-medium hidden md:table-cell">Date</th>
                <th className="p-4 text-nm-muted font-medium hidden lg:table-cell">Reference</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((payment) => (
                <tr key={payment.id} className="border-b border-nm-border hover:bg-nm-card-hover transition-colors">
                  <td className="p-4 text-white font-medium font-mono text-xs">{payment.id}</td>
                  <td className="p-4">
                    <span className={`rounded-lg px-2.5 py-1 text-xs font-medium ${typeColors[payment.type]}`}>
                      {payment.type}
                    </span>
                  </td>
                  <td className="p-4 text-white font-medium">
                    {payment.type === 'Refund' ? '-' : ''}₦{payment.amount.toLocaleString()}
                  </td>
                  <td className="p-4 text-nm-text-dim hidden sm:table-cell">{payment.gateway}</td>
                  <td className="p-4">
                    <span className={`rounded-lg px-2.5 py-1 text-xs font-medium ${statusColors[payment.status]}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="p-4 text-nm-text-dim hidden md:table-cell">
                    {new Date(payment.date).toLocaleDateString('en-NG', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="p-4 text-nm-text-dim hidden lg:table-cell font-mono text-xs">{payment.reference}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-nm-muted">
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}