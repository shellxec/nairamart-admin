'use client';

import { useState } from 'react';
import {
  Search,
  ShoppingCart,
  Clock,
  Package,
  Truck,
  CheckCircle,
  RotateCcw,
  Filter,
  Calendar,
  ChevronDown,
  Eye,
  PackageCheck,
  TruckIcon,
  MapPin,
} from 'lucide-react';

// ─── Mock Data ────────────────────────────────────────────────────
type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Returns';

interface Order {
  id: string;
  customer: string;
  items: number;
  total: number;
  status: OrderStatus;
  payment: string;
  date: string;
}

const stats = [
  { label: 'Total Orders', value: '1,245', icon: ShoppingCart, color: 'emerald' },
  { label: 'Pending', value: '5', icon: Clock, color: 'amber' },
  { label: 'Processing', value: '12', icon: Package, color: 'blue' },
  { label: 'Shipped', value: '28', icon: Truck, color: 'violet' },
  { label: 'Delivered', value: '1,180', icon: CheckCircle, color: 'emerald' },
  { label: 'Returns', value: '20', icon: RotateCcw, color: 'red' },
];

const statusColorMap: Record<OrderStatus, string> = {
  Pending: 'bg-amber-500/10 text-amber-400',
  Processing: 'bg-blue-500/10 text-blue-400',
  Shipped: 'bg-violet-500/10 text-violet-400',
  Delivered: 'bg-emerald-500/10 text-emerald-400',
  Returns: 'bg-red-500/10 text-red-400',
};

const statusTabs: OrderStatus[] = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Returns'];

const orders: Order[] = [
  { id: 'NM-28456', customer: 'Chidi Okonkwo', items: 2, total: 245000, status: 'Delivered', payment: 'Paid', date: 'Jan 15, 2025' },
  { id: 'NM-28455', customer: 'Amina Bello', items: 1, total: 89500, status: 'Shipped', payment: 'Paid', date: 'Jan 15, 2025' },
  { id: 'NM-28454', customer: 'Emeka Nwosu', items: 3, total: 1250000, status: 'Processing', payment: 'Paid', date: 'Jan 14, 2025' },
  { id: 'NM-28453', customer: 'Fatima Yusuf', items: 1, total: 45000, status: 'Pending', payment: 'Pending', date: 'Jan 14, 2025' },
  { id: 'NM-28452', customer: 'Tobi Adeyemi', items: 4, total: 678000, status: 'Delivered', payment: 'Paid', date: 'Jan 13, 2025' },
  { id: 'NM-28451', customer: 'Chioma Eze', items: 1, total: 320000, status: 'Shipped', payment: 'Paid', date: 'Jan 13, 2025' },
  { id: 'NM-28450', customer: 'Ibrahim Danjuma', items: 2, total: 156000, status: 'Processing', payment: 'Paid', date: 'Jan 12, 2025' },
  { id: 'NM-28449', customer: 'Ngozi Obi', items: 1, total: 750000, status: 'Pending', payment: 'Pending', date: 'Jan 12, 2025' },
  { id: 'NM-28448', customer: 'Bola Tinubu Jr', items: 5, total: 2340000, status: 'Delivered', payment: 'Paid', date: 'Jan 11, 2025' },
  { id: 'NM-28447', customer: 'Sade Akinwale', items: 2, total: 89000, status: 'Returns', payment: 'Refunded', date: 'Jan 11, 2025' },
  { id: 'NM-28446', customer: 'Yusuf Garba', items: 1, total: 520000, status: 'Shipped', payment: 'Paid', date: 'Jan 10, 2025' },
  { id: 'NM-28445', customer: 'Obioma Nwachukwu', items: 3, total: 178000, status: 'Delivered', payment: 'Paid', date: 'Jan 10, 2025' },
];

const colorMap: Record<string, string> = {
  emerald: 'bg-emerald-500/15 text-emerald-400',
  blue: 'bg-blue-500/15 text-blue-400',
  amber: 'bg-amber-500/15 text-amber-400',
  red: 'bg-red-500/15 text-red-400',
  violet: 'bg-violet-500/15 text-violet-400',
};

function getActionButtons(status: OrderStatus) {
  switch (status) {
    case 'Pending':
      return [{ label: 'Accept', icon: CheckCircle, primary: true }];
    case 'Processing':
      return [{ label: 'Package', icon: PackageCheck, primary: true }];
    case 'Shipped':
      return [{ label: 'Track', icon: MapPin, primary: false }];
    case 'Delivered':
      return [];
    case 'Returns':
      return [{ label: 'View', icon: Eye, primary: false }];
  }
}

export default function SellerOrders() {
  const [search, setSearch] = useState('');
  const [activeStatus, setActiveStatus] = useState<OrderStatus | null>(null);
  const [dateRange, setDateRange] = useState('');

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !activeStatus || o.status === activeStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Orders</h1>
        <p className="text-sm text-nm-muted mt-1">Manage and track your orders</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="bg-nm-card rounded-2xl border border-nm-border p-5 cursor-pointer hover:border-[#AFE607]/30 transition-colors"
              onClick={() => setActiveStatus(activeStatus === null || stats.find((x) => x.label === s.label)?.label === 'Total Orders' ? null : s.label as OrderStatus)}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colorMap[s.color]}`}>
                  <Icon size={14} />
                </div>
              </div>
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="text-xs text-nm-muted mt-1">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative flex-1 w-full sm:max-w-xs">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-nm-muted" />
          <input
            type="text"
            placeholder="Search by order ID or customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-nm-input border border-nm-border rounded-xl pl-9 pr-3 py-2 text-sm text-white placeholder:text-nm-muted focus:outline-none focus:border-[#AFE607]/40"
          />
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-nm-muted" />
            <select
              value={activeStatus || ''}
              onChange={(e) => setActiveStatus(e.target.value as OrderStatus || null)}
              className="bg-nm-input border border-nm-border rounded-xl pl-8 pr-8 py-2 text-sm text-white appearance-none focus:outline-none focus:border-[#AFE607]/40"
            >
              <option value="">All Status</option>
              {statusTabs.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-nm-muted pointer-events-none" />
          </div>
          <div className="relative">
            <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-nm-muted" />
            <input
              type="date"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-nm-input border border-nm-border rounded-xl pl-8 pr-3 py-2 text-sm text-white focus:outline-none focus:border-[#AFE607]/40"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-nm-card rounded-2xl border border-nm-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-nm-border">
                <th className="text-left text-nm-muted font-medium px-5 py-3">Order ID</th>
                <th className="text-left text-nm-muted font-medium px-5 py-3">Customer</th>
                <th className="text-center text-nm-muted font-medium px-5 py-3 hidden md:table-cell">Items</th>
                <th className="text-right text-nm-muted font-medium px-5 py-3">Total</th>
                <th className="text-left text-nm-muted font-medium px-5 py-3">Status</th>
                <th className="text-left text-nm-muted font-medium px-5 py-3 hidden lg:table-cell">Payment</th>
                <th className="text-left text-nm-muted font-medium px-5 py-3 hidden md:table-cell">Date</th>
                <th className="text-right text-nm-muted font-medium px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => {
                const actions = getActionButtons(order.status);
                return (
                  <tr key={order.id} className="border-b border-nm-border/50 hover:bg-nm-card-hover transition-colors">
                    <td className="px-5 py-3 text-white font-medium">{order.id}</td>
                    <td className="px-5 py-3 text-nm-text-dim">{order.customer}</td>
                    <td className="px-5 py-3 text-center text-nm-text-dim hidden md:table-cell">{order.items}</td>
                    <td className="px-5 py-3 text-right text-emerald-400 font-medium">₦{order.total.toLocaleString()}</td>
                    <td className="px-5 py-3">
                      <span className={`rounded-lg px-2.5 py-1 text-xs font-medium ${statusColorMap[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 hidden lg:table-cell">
                      <span className={`text-xs ${order.payment === 'Paid' ? 'text-emerald-400' : order.payment === 'Refunded' ? 'text-amber-400' : 'text-nm-text-dim'}`}>
                        {order.payment}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-nm-text-dim text-xs hidden md:table-cell">{order.date}</td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {actions.map((action) => {
                          const ActionIcon = action.icon;
                          return (
                            <button
                              key={action.label}
                              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                                action.primary
                                  ? 'bg-[#AFE607] text-black hover:bg-[#9dd006]'
                                  : 'text-nm-text-dim hover:text-white hover:bg-nm-card-hover'
                              }`}
                            >
                              <ActionIcon size={12} />
                              {action.label}
                            </button>
                          );
                        })}
                        <button className="text-nm-text-dim hover:text-white hover:bg-nm-card-hover rounded-lg px-3 py-1.5 text-xs transition-colors">
                          <Eye size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}