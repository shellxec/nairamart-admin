'use client';

import { useState } from 'react';
import { orders } from '@/data/admin-data';
import type { OrderItem } from '@/store/admin-store';
import {
  Search,
  Download,
  Eye,
  XCircle,
  RotateCcw,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
} from 'lucide-react';

const orderStatusColors: Record<OrderItem['status'], string> = {
  pending: 'bg-amber-500/10 text-amber-400',
  processing: 'bg-blue-500/10 text-blue-400',
  shipped: 'bg-violet-500/10 text-violet-400',
  delivered: 'bg-emerald-500/10 text-emerald-400',
  cancelled: 'bg-red-500/10 text-red-400',
  refunded: 'bg-orange-500/10 text-orange-400',
};

const paymentColors: Record<OrderItem['payment'], string> = {
  paid: 'bg-emerald-500/10 text-emerald-400',
  pending: 'bg-amber-500/10 text-amber-400',
  failed: 'bg-red-500/10 text-red-400',
  refunded: 'bg-orange-500/10 text-orange-400',
};

const sellers = [...new Set(orders.map((o) => o.seller))];

export default function OrderManagement() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [sellerFilter, setSellerFilter] = useState('all');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const perPage = 10;

  const todayOrders = orders.filter((o) => o.status === 'pending' || o.status === 'processing').length;
  const pendingCount = orders.filter((o) => o.status === 'pending').length;
  const processingCount = orders.filter((o) => o.status === 'processing').length;
  const shippedCount = orders.filter((o) => o.status === 'shipped').length;
  const deliveredCount = orders.filter((o) => o.status === 'delivered').length;
  const cancelledCount = orders.filter((o) => o.status === 'cancelled').length;

  const filtered = orders.filter((o) => {
    const matchSearch =
      !search ||
      o.orderId.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.seller.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || o.status === statusFilter;
    const matchPayment = paymentFilter === 'all' || o.payment === paymentFilter;
    const matchSeller = sellerFilter === 'all' || o.seller === sellerFilter;
    let matchDate = dateFilter === 'all';
    if (!matchDate && dateFilter !== 'all') {
      try {
        const orderDate = new Date(o.date);
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        if (dateFilter === 'today') {
          matchDate = orderDate >= today;
        } else if (dateFilter === '7d') {
          const weekAgo = new Date(today); weekAgo.setDate(weekAgo.getDate() - 7);
          matchDate = orderDate >= weekAgo;
        } else if (dateFilter === '30d') {
          const monthAgo = new Date(today); monthAgo.setDate(monthAgo.getDate() - 30);
          matchDate = orderDate >= monthAgo;
        }
      } catch { matchDate = false; }
    }
    return matchSearch && matchStatus && matchPayment && matchSeller && matchDate;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  const toggleAll = () => {
    if (selected.size === paged.length) setSelected(new Set());
    else setSelected(new Set(paged.map((o) => o.id)));
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-white text-2xl font-semibold">Order Management</h1>
        <p className="text-nm-muted text-sm mt-1">Track and manage all marketplace orders</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: 'Orders Today', value: todayOrders, color: 'text-white' },
          { label: 'Pending', value: pendingCount, color: 'text-amber-500' },
          { label: 'Processing', value: processingCount, color: 'text-blue-500' },
          { label: 'Shipped', value: shippedCount, color: 'text-violet-500' },
          { label: 'Delivered', value: deliveredCount, color: 'text-emerald-500' },
          { label: 'Cancelled', value: cancelledCount, color: 'text-red-500' },
        ].map((stat) => (
          <div key={stat.label} className="bg-nm-card border border-nm-border rounded-2xl p-4">
            <p className="text-nm-muted text-xs font-medium">{stat.label}</p>
            <p className={`text-2xl font-semibold mt-1 ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-nm-card border border-nm-border rounded-2xl p-4">
        <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-nm-muted" />
            <input
              type="text"
              placeholder="Search orders..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full bg-nm-input border border-nm-border rounded-xl pl-9 pr-3 py-2 text-sm text-white placeholder:text-nm-muted focus:outline-none focus:border-nm-border-light"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="bg-nm-input border border-nm-border rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-nm-border-light"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
            <option value="refunded">Refunded</option>
          </select>
          <select
            value={paymentFilter}
            onChange={(e) => { setPaymentFilter(e.target.value); setPage(1); }}
            className="bg-nm-input border border-nm-border rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-nm-border-light"
          >
            <option value="all">All Payment</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>
          <select
            value={dateFilter}
            onChange={(e) => { setDateFilter(e.target.value); setPage(1); }}
            className="bg-nm-input border border-nm-border rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-nm-border-light"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
          <select
            value={sellerFilter}
            onChange={(e) => { setSellerFilter(e.target.value); setPage(1); }}
            className="bg-nm-input border border-nm-border rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-nm-border-light"
          >
            <option value="all">All Sellers</option>
            {sellers.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Bulk Actions */}
      {selected.size > 0 && (
        <div className="bg-nm-card border border-nm-border rounded-2xl p-3 flex items-center gap-4 animate-fade-in">
          <span className="text-sm text-nm-muted">{selected.size} selected</span>
          <button className="text-sm text-red-500 hover:text-red-400 font-medium px-3 py-1.5 rounded-lg hover:bg-red-500/10 transition-colors">
            Cancel Selected
          </button>
          <button className="text-sm text-nm-text-dim hover:text-white font-medium px-3 py-1.5 rounded-lg hover:bg-nm-card-hover transition-colors">
            Export Selected
          </button>
        </div>
      )}

      {/* Table */}
      <div className="bg-nm-card border border-nm-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-nm-border text-left">
                <th className="p-4 w-10">
                  <input
                    type="checkbox"
                    checked={paged.length > 0 && selected.size === paged.length}
                    onChange={toggleAll}
                    className="rounded border-nm-border bg-nm-input accent-[#AFE607]"
                  />
                </th>
                <th className="p-4 text-nm-muted font-medium">Order ID</th>
                <th className="p-4 text-nm-muted font-medium">Customer</th>
                <th className="p-4 text-nm-muted font-medium hidden md:table-cell">Seller</th>
                <th className="p-4 text-nm-muted font-medium hidden lg:table-cell">Items</th>
                <th className="p-4 text-nm-muted font-medium">Total</th>
                <th className="p-4 text-nm-muted font-medium hidden md:table-cell">Payment</th>
                <th className="p-4 text-nm-muted font-medium">Status</th>
                <th className="p-4 text-nm-muted font-medium hidden lg:table-cell">Date</th>
                <th className="p-4 text-nm-muted font-medium hidden xl:table-cell">Tracking #</th>
                <th className="p-4 text-nm-muted font-medium w-12">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-nm-border hover:bg-nm-card-hover transition-colors"
                >
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selected.has(order.id)}
                      onChange={() => toggleSelect(order.id)}
                      className="rounded border-nm-border bg-nm-input accent-[#AFE607]"
                    />
                  </td>
                  <td className="p-4 text-white font-medium">{order.orderId}</td>
                  <td className="p-4 text-nm-text-dim">{order.customer}</td>
                  <td className="p-4 text-nm-text-dim hidden md:table-cell">{order.seller}</td>
                  <td className="p-4 text-nm-text-dim hidden lg:table-cell">{order.products}</td>
                  <td className="p-4 text-white font-medium">₦{order.total.toLocaleString()}</td>
                  <td className="p-4 hidden md:table-cell">
                    <span className={`rounded-lg px-2.5 py-1 text-xs font-medium capitalize ${paymentColors[order.payment]}`}>
                      {order.payment}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`rounded-lg px-2.5 py-1 text-xs font-medium capitalize ${orderStatusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-nm-text-dim hidden lg:table-cell">
                    {new Date(order.date).toLocaleDateString('en-NG', { month: 'short', day: 'numeric' })}
                  </td>
                  <td className="p-4 text-nm-text-dim hidden xl:table-cell font-mono text-xs">
                    {order.tracking || '—'}
                  </td>
                  <td className="p-4 relative">
                    <button
                      onClick={() => setOpenMenu(openMenu === order.id ? null : order.id)}
                      className="text-nm-muted hover:text-white p-1 rounded-lg hover:bg-nm-card-hover transition-colors"
                    >
                      <MoreVertical size={16} />
                    </button>
                    {openMenu === order.id && (
                      <div className="absolute right-0 top-10 z-50 w-44 bg-nm-card border border-nm-border rounded-xl py-1 shadow-xl animate-fade-in">
                        {[
                          { icon: Eye, label: 'View Order', color: 'text-white' },
                          { icon: XCircle, label: 'Cancel', color: 'text-red-500' },
                          { icon: RotateCcw, label: 'Refund', color: 'text-orange-500' },
                          { icon: AlertTriangle, label: 'Escalate', color: 'text-amber-500' },
                        ].map((item) => (
                          <button
                            key={item.label}
                            onClick={() => setOpenMenu(null)}
                            className="w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-nm-card-hover transition-colors"
                          >
                            <item.icon size={14} className={item.color} />
                            <span className={item.color}>{item.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {paged.length === 0 && (
                <tr>
                  <td colSpan={11} className="p-12 text-center text-nm-muted">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-nm-border">
          <span className="text-sm text-nm-muted">
            {filtered.length > 0
              ? `Showing ${(page - 1) * perPage + 1}\u2013${Math.min(page * perPage, filtered.length)} of ${filtered.length} orders`
              : `No orders found`}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="flex items-center gap-1 text-nm-muted hover:text-white disabled:opacity-40 disabled:cursor-not-allowed px-3 py-1.5 rounded-lg hover:bg-nm-card-hover transition-colors text-sm"
            >
              <ChevronLeft size={14} />
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                  p === page ? 'bg-[#AFE607] text-black' : 'text-nm-muted hover:text-white hover:bg-nm-card-hover'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="flex items-center gap-1 text-nm-muted hover:text-white disabled:opacity-40 disabled:cursor-not-allowed px-3 py-1.5 rounded-lg hover:bg-nm-card-hover transition-colors text-sm"
            >
              Next
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}