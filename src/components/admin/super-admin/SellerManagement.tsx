'use client';

import { useState } from 'react';
import { sellers } from '@/data/admin-data';
import type { Seller } from '@/store/admin-store';
import {
  Search,
  Download,
  MoreVertical,
  Eye,
  Ban,
  UserX,
  CheckCircle,
  XCircle,
  ShieldCheck,
  AlertTriangle,
  KeyRound,
  FileText,
  Star,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const statusColors: Record<Seller['status'], string> = {
  active: 'bg-emerald-500/10 text-emerald-400',
  suspended: 'bg-amber-500/10 text-amber-400',
  banned: 'bg-red-500/10 text-red-400',
  pending: 'bg-blue-500/10 text-blue-400',
  rejected: 'bg-gray-500/10 text-gray-400',
};

const cities = [...new Set(sellers.map((s) => s.city))];

export default function SellerManagement() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [cityFilter, setCityFilter] = useState<string>('all');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const perPage = 10;

  const filtered = sellers.filter((s) => {
    const matchSearch =
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.store.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || s.status === statusFilter;
    const matchCity = cityFilter === 'all' || s.city === cityFilter;
    return matchSearch && matchStatus && matchCity;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  const toggleAll = () => {
    if (selected.size === paged.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(paged.map((s) => s.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={12}
            className={i <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-nm-muted'}
          />
        ))}
        <span className="ml-1 text-xs text-nm-muted">{rating}</span>
      </div>
    );
  };

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-white text-2xl font-semibold">Seller Management</h1>
          <p className="text-nm-muted text-sm mt-1">
            Manage all marketplace sellers, applications, and compliance
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-nm-card border border-nm-border rounded-lg px-3 py-1.5 text-sm text-nm-text-dim">
            {sellers.length} total sellers
          </span>
          <button className="flex items-center gap-2 bg-[#AFE607] text-black font-medium px-4 py-2 rounded-xl hover:bg-[#9ed006] transition-colors">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-nm-card border border-nm-border rounded-2xl p-5">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-nm-muted" />
            <input
              type="text"
              placeholder="Search sellers by name, store, email..."
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
            <option value="banned">Banned</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
          <select
            value={cityFilter}
            onChange={(e) => { setCityFilter(e.target.value); setPage(1); }}
            className="bg-nm-input border border-nm-border rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-nm-border-light"
          >
            <option value="all">All Cities</option>
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Bulk Actions */}
      {selected.size > 0 && (
        <div className="bg-nm-card border border-nm-border rounded-2xl p-3 flex items-center gap-4 animate-fade-in">
          <span className="text-sm text-nm-muted">{selected.size} selected</span>
          <button className="text-sm text-amber-500 hover:text-amber-400 font-medium px-3 py-1.5 rounded-lg hover:bg-amber-500/10 transition-colors">
            Suspend Selected
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
                <th className="p-4 text-nm-muted font-medium">Seller</th>
                <th className="p-4 text-nm-muted font-medium">Email</th>
                <th className="p-4 text-nm-muted font-medium hidden md:table-cell">Phone</th>
                <th className="p-4 text-nm-muted font-medium hidden lg:table-cell">City</th>
                <th className="p-4 text-nm-muted font-medium">Status</th>
                <th className="p-4 text-nm-muted font-medium hidden lg:table-cell">Products</th>
                <th className="p-4 text-nm-muted font-medium hidden lg:table-cell">Revenue</th>
                <th className="p-4 text-nm-muted font-medium hidden xl:table-cell">Rating</th>
                <th className="p-4 text-nm-muted font-medium hidden xl:table-cell">Orders</th>
                <th className="p-4 text-nm-muted font-medium hidden lg:table-cell">Joined</th>
                <th className="p-4 text-nm-muted font-medium w-12">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((seller) => (
                <tr
                  key={seller.id}
                  className="border-b border-nm-border hover:bg-nm-card-hover transition-colors"
                >
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selected.has(seller.id)}
                      onChange={() => toggleSelect(seller.id)}
                      className="rounded border-nm-border bg-nm-input accent-[#AFE607]"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={seller.avatar}
                        alt={seller.name}
                        className="w-8 h-8 rounded-lg object-cover"
                      />
                      <div>
                        <p className="text-white font-medium">{seller.name}</p>
                        <p className="text-nm-muted text-xs">{seller.store}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-nm-text-dim">{seller.email}</td>
                  <td className="p-4 text-nm-text-dim hidden md:table-cell">{seller.phone}</td>
                  <td className="p-4 text-nm-text-dim hidden lg:table-cell">{seller.city}</td>
                  <td className="p-4">
                    <span className={`rounded-lg px-2.5 py-1 text-xs font-medium capitalize ${statusColors[seller.status]}`}>
                      {seller.status}
                    </span>
                  </td>
                  <td className="p-4 text-nm-text-dim hidden lg:table-cell">{seller.products}</td>
                  <td className="p-4 text-nm-text-dim hidden lg:table-cell">₦{(seller.revenue / 1000000).toFixed(1)}M</td>
                  <td className="p-4 hidden xl:table-cell">{renderStars(seller.rating)}</td>
                  <td className="p-4 text-nm-text-dim hidden xl:table-cell">{seller.orders.toLocaleString()}</td>
                  <td className="p-4 text-nm-text-dim hidden lg:table-cell">
                    {new Date(seller.joined).toLocaleDateString('en-NG', { month: 'short', year: 'numeric' })}
                  </td>
                  <td className="p-4 relative">
                    <button
                      onClick={() => setOpenMenu(openMenu === seller.id ? null : seller.id)}
                      className="text-nm-muted hover:text-white p-1 rounded-lg hover:bg-nm-card-hover transition-colors"
                    >
                      <MoreVertical size={16} />
                    </button>
                    {openMenu === seller.id && (
                      <div className="absolute right-0 top-10 z-50 w-52 bg-nm-card border border-nm-border rounded-xl py-1 shadow-xl animate-fade-in">
                        {[
                          { icon: Eye, label: 'View Profile', color: 'text-white' },
                          { icon: UserX, label: 'Suspend', color: 'text-amber-500' },
                          { icon: Ban, label: 'Ban', color: 'text-red-500' },
                          { icon: CheckCircle, label: 'Approve', color: 'text-emerald-500' },
                          { icon: XCircle, label: 'Reject', color: 'text-red-500' },
                          { icon: ShieldCheck, label: 'Verify KYC', color: 'text-blue-500' },
                          { icon: AlertTriangle, label: 'Send Warning', color: 'text-amber-500' },
                          { icon: KeyRound, label: 'Reset Password', color: 'text-nm-text-dim' },
                          { icon: FileText, label: 'View Logs', color: 'text-nm-text-dim' },
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
                  <td colSpan={12} className="p-12 text-center text-nm-muted">
                    No sellers found matching your filters
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
              ? `Showing ${(page - 1) * perPage + 1}\u2013${Math.min(page * perPage, filtered.length)} of ${filtered.length} sellers`
              : `No sellers found`}
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