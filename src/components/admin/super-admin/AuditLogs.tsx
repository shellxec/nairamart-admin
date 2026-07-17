'use client';

import { useState } from 'react';
import { auditLogs } from '@/data/admin-data';
import type { AuditLogEntry } from '@/store/admin-store';
import { Search, ChevronLeft, ChevronRight, Download } from 'lucide-react';

const getActionColor = (action: string): string => {
  const a = action.toLowerCase();
  if (a.startsWith('approve') || a.startsWith('create')) return 'bg-emerald-500/10 text-emerald-400';
  if (a.startsWith('delete') || a.startsWith('ban') || a.startsWith('reject')) return 'bg-red-500/10 text-red-400';
  if (a.startsWith('edit') || a.startsWith('update')) return 'bg-blue-500/10 text-blue-400';
  if (a.startsWith('view')) return 'bg-gray-500/10 text-gray-400';
  return 'bg-gray-500/10 text-gray-400';
};

const getRoleBadge = (role: string): string => {
  const r = role.toLowerCase();
  if (r.includes('super')) return 'bg-[#AFE607]/10 text-[#AFE607]';
  if (r.includes('finance')) return 'bg-amber-500/10 text-amber-400';
  if (r.includes('support')) return 'bg-blue-500/10 text-blue-400';
  if (r.includes('marketing')) return 'bg-violet-500/10 text-violet-400';
  if (r.includes('moderation')) return 'bg-rose-500/10 text-rose-400';
  return 'bg-gray-500/10 text-gray-400';
};

const modules = [...new Set(auditLogs.map((l) => l.module))];
const users = [...new Set(auditLogs.map((l) => l.user))];

export default function AuditLogs() {
  const [search, setSearch] = useState('');
  const [moduleFilter, setModuleFilter] = useState('all');
  const [userFilter, setUserFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [page, setPage] = useState(1);
  const perPage = 25;

  const filtered = auditLogs.filter((log) => {
    const matchSearch =
      !search ||
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.target.toLowerCase().includes(search.toLowerCase()) ||
      log.user.toLowerCase().includes(search.toLowerCase());
    const matchModule = moduleFilter === 'all' || log.module === moduleFilter;
    const matchUser = userFilter === 'all' || log.user === userFilter;
    let matchDate = true;
    if (dateFilter === 'today') {
      const today = new Date().toDateString();
      matchDate = new Date(log.timestamp).toDateString() === today;
    } else if (dateFilter === '7d') {
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - 7);
      matchDate = new Date(log.timestamp) >= cutoff;
    } else if (dateFilter === '30d') {
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - 30);
      matchDate = new Date(log.timestamp) >= cutoff;
    }
    return matchSearch && matchModule && matchUser && matchDate;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-white text-2xl font-semibold">Audit Logs</h1>
          <p className="text-nm-muted text-sm mt-1">Track all system actions and administrative activities</p>
        </div>
        <button className="flex items-center gap-2 border border-nm-border text-nm-text-dim hover:text-white hover:border-nm-border-light rounded-xl px-4 py-2 text-sm transition-colors">
          <Download size={14} />
          Export Logs
        </button>
      </div>

      {/* Filters */}
      <div className="bg-nm-card rounded-2xl border border-nm-border p-4">
        <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-nm-muted" />
            <input
              type="text"
              placeholder="Search logs..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full bg-nm-input border border-nm-border rounded-xl pl-9 pr-3 py-2 text-sm text-white placeholder:text-nm-muted focus:outline-none focus:border-nm-border-light"
            />
          </div>
          <select
            value={moduleFilter}
            onChange={(e) => { setModuleFilter(e.target.value); setPage(1); }}
            className="bg-nm-input border border-nm-border rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-nm-border-light"
          >
            <option value="all">All Modules</option>
            {modules.map((m) => (
              <option key={m} value={m} className="capitalize">{m}</option>
            ))}
          </select>
          <select
            value={userFilter}
            onChange={(e) => { setUserFilter(e.target.value); setPage(1); }}
            className="bg-nm-input border border-nm-border rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-nm-border-light"
          >
            <option value="all">All Users</option>
            {users.map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
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
        </div>
      </div>

      {/* Table */}
      <div className="bg-nm-card rounded-2xl border border-nm-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-nm-border text-left">
                <th className="p-4 text-nm-muted font-medium">Timestamp</th>
                <th className="p-4 text-nm-muted font-medium">User</th>
                <th className="p-4 text-nm-muted font-medium hidden lg:table-cell">Role</th>
                <th className="p-4 text-nm-muted font-medium hidden xl:table-cell">Module</th>
                <th className="p-4 text-nm-muted font-medium">Action</th>
                <th className="p-4 text-nm-muted font-medium hidden md:table-cell">Target</th>
                <th className="p-4 text-nm-muted font-medium hidden xl:table-cell">IP</th>
                <th className="p-4 text-nm-muted font-medium hidden xl:table-cell">Device</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((log: AuditLogEntry) => (
                <tr key={log.id} className="border-b border-nm-border hover:bg-nm-card-hover transition-colors">
                  <td className="p-4 text-nm-text-dim whitespace-nowrap text-xs">
                    {new Date(log.timestamp).toLocaleDateString('en-NG', {
                      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
                    })}
                  </td>
                  <td className="p-4 text-white font-medium">{log.user}</td>
                  <td className="p-4 hidden lg:table-cell">
                    <span className={`rounded-lg px-2.5 py-1 text-xs font-medium ${getRoleBadge(log.role)}`}>
                      {log.role}
                    </span>
                  </td>
                  <td className="p-4 text-nm-text-dim capitalize hidden xl:table-cell">{log.module}</td>
                  <td className="p-4">
                    <span className={`rounded-lg px-2.5 py-1 text-xs font-medium ${getActionColor(log.action)}`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="p-4 text-nm-text-dim max-w-[180px] hidden md:table-cell">
                    <span className="line-clamp-1">{log.target}</span>
                  </td>
                  <td className="p-4 text-nm-muted font-mono text-xs hidden xl:table-cell">{log.ip}</td>
                  <td className="p-4 text-nm-muted text-xs hidden xl:table-cell">{log.device}</td>
                </tr>
              ))}
              {paged.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-12 text-center text-nm-muted">No audit logs found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-nm-border">
          <span className="text-sm text-nm-muted">
            {filtered.length > 0
              ? `Showing ${(page - 1) * perPage + 1}\u2013${Math.min(page * perPage, filtered.length)} of ${filtered.length}`
              : `No entries found`}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="text-nm-muted hover:text-white disabled:opacity-40 p-1 rounded-lg hover:bg-nm-card-hover transition-colors"
            >
              <ChevronLeft size={16} />
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
              className="text-nm-muted hover:text-white disabled:opacity-40 p-1 rounded-lg hover:bg-nm-card-hover transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}