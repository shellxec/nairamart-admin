'use client';

import { useState } from 'react';
import { customers } from '@/data/admin-data';
import type { Customer } from '@/store/admin-store';
import { Search, MoreVertical, Eye, MessageSquare, Ban, ChevronLeft, ChevronRight, UserX } from 'lucide-react';

const statusColors: Record<Customer['status'], string> = {
  active: 'bg-emerald-500/10 text-emerald-400',
  suspended: 'bg-amber-500/10 text-amber-400',
  blacklisted: 'bg-red-500/10 text-red-400',
};

export default function CustomerManagement() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const perPage = 10;

  const totalCustomers = customers.length;
  const activeCount = customers.filter((c) => c.status === 'active').length;
  const suspendedCount = customers.filter((c) => c.status === 'suspended').length;
  const blacklistedCount = customers.filter((c) => c.status === 'blacklisted').length;
  const newThisMonth = 8;

  const filtered = customers.filter((c) => {
    const matchSearch =
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search);
    const matchStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-white text-2xl font-semibold">Customer Management</h1>
        <p className="text-nm-muted text-sm mt-1">Manage customer accounts, complaints, and blacklists</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
          { label: 'Total Customers', value: totalCustomers, color: 'text-white' },
          { label: 'Active', value: activeCount, color: 'text-emerald-500' },
          { label: 'Suspended', value: suspendedCount, color: 'text-amber-500' },
          { label: 'Blacklisted', value: blacklistedCount, color: 'text-red-500' },
          { label: 'New This Month', value: newThisMonth, color: 'text-blue-500' },
        ].map((stat) => (
          <div key={stat.label} className="bg-nm-card border border-nm-border rounded-2xl p-4">
            <p className="text-nm-muted text-xs font-medium">{stat.label}</p>
            <p className={`text-2xl font-semibold mt-1 ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-nm-card border border-nm-border rounded-2xl p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-nm-muted" />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
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
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="blacklisted">Blacklisted</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-nm-card border border-nm-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-nm-border text-left">
                <th className="p-4 text-nm-muted font-medium">Customer</th>
                <th className="p-4 text-nm-muted font-medium hidden md:table-cell">Email</th>
                <th className="p-4 text-nm-muted font-medium hidden lg:table-cell">Phone</th>
                <th className="p-4 text-nm-muted font-medium hidden lg:table-cell">City</th>
                <th className="p-4 text-nm-muted font-medium">Orders</th>
                <th className="p-4 text-nm-muted font-medium hidden md:table-cell">Total Spent</th>
                <th className="p-4 text-nm-muted font-medium">Status</th>
                <th className="p-4 text-nm-muted font-medium hidden lg:table-cell">Joined</th>
                <th className="p-4 text-nm-muted font-medium hidden xl:table-cell">Complaints</th>
                <th className="p-4 text-nm-muted font-medium w-12">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-b border-nm-border hover:bg-nm-card-hover transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-nm-card-hover flex items-center justify-center text-white text-sm font-medium">
                        {customer.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <span className="text-white font-medium">{customer.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-nm-text-dim hidden md:table-cell">{customer.email}</td>
                  <td className="p-4 text-nm-text-dim hidden lg:table-cell">{customer.phone}</td>
                  <td className="p-4 text-nm-text-dim hidden lg:table-cell">{customer.city}</td>
                  <td className="p-4 text-white">{customer.orders}</td>
                  <td className="p-4 text-white font-medium hidden md:table-cell">₦{customer.spent.toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`rounded-lg px-2.5 py-1 text-xs font-medium capitalize ${statusColors[customer.status]}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="p-4 text-nm-text-dim hidden lg:table-cell">
                    {new Date(customer.joined).toLocaleDateString('en-NG', { month: 'short', year: 'numeric' })}
                  </td>
                  <td className="p-4 hidden xl:table-cell">
                    {customer.complaints > 0 ? (
                      <span className={`text-sm font-medium ${customer.complaints >= 3 ? 'text-red-500' : 'text-amber-500'}`}>
                        {customer.complaints}
                      </span>
                    ) : (
                      <span className="text-nm-muted">0</span>
                    )}
                  </td>
                  <td className="p-4 relative">
                    <button
                      onClick={() => setOpenMenu(openMenu === customer.id ? null : customer.id)}
                      className="text-nm-muted hover:text-white p-1 rounded-lg hover:bg-nm-card-hover transition-colors"
                    >
                      <MoreVertical size={16} />
                    </button>
                    {openMenu === customer.id && (
                      <div className="absolute right-0 top-10 z-50 w-44 bg-nm-card border border-nm-border rounded-xl py-1 shadow-xl animate-fade-in">
                        {[
                          { icon: Eye, label: 'View Profile', color: 'text-white' },
                          { icon: MessageSquare, label: 'Message', color: 'text-blue-500' },
                          { icon: UserX, label: 'Suspend', color: 'text-amber-500' },
                          { icon: Ban, label: 'Blacklist', color: 'text-red-500' },
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
                  <td colSpan={10} className="p-12 text-center text-nm-muted">
                    No customers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-nm-border">
          <span className="text-sm text-nm-muted">
            Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, filtered.length)} of {filtered.length} customers
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
            {Array.from({ length: Math.max(1, totalPages) }, (_, i) => i + 1).map((p) => (
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
              onClick={() => setPage(Math.min(Math.max(1, totalPages), page + 1))}
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