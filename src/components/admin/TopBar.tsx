'use client';

import { useAdminStore, SYSTEM_ROLES } from '@/store/admin-store';
import { Bell, Search, ChevronDown, User, LogOut, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export function TopBar() {
  const { globalSearch, setGlobalSearch, notifications, markNotificationRead, unreadCount, currentRole, subAdminRole, logout, sidebarCollapsed } = useAdminStore();
  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotifs(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setShowProfile(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const roleLabel = currentRole === 'super-admin' ? 'Super Admin'
    : currentRole === 'seller' ? 'Seller'
    : subAdminRole ? SYSTEM_ROLES.find(r => r.id === subAdminRole)?.name || 'Sub Admin'
    : 'Admin';

  const initials = roleLabel.split(' ').map(w => w[0]).join('').substring(0, 2);

  return (
    <header className="sticky top-0 z-30 bg-nm-dark/80 backdrop-blur-xl border-b border-nm-border">
      <div className="flex items-center justify-between h-14 px-4 lg:px-6">
        {/* Left: Spacer for mobile menu button + search */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="w-10 lg:hidden" />
          <div className="relative max-w-md flex-1 hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-nm-muted" />
            <input
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              placeholder="Search anything..."
              className="w-full bg-nm-input border border-nm-border rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder:text-nm-muted focus:outline-none focus:border-[#AFE607]/40 transition-colors"
            />
          </div>
        </div>

        {/* Right: Notifications + Profile */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <div ref={notifRef} className="relative">
            <button
              onClick={() => { setShowNotifs(!showNotifs); setShowProfile(false); }}
              className="relative p-2 rounded-xl hover:bg-nm-card-hover text-nm-muted hover:text-white transition-colors"
            >
              <Bell className="size-5" />
              {unreadCount() > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#AFE607] text-black text-[9px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount() > 9 ? '9+' : unreadCount()}
                </span>
              )}
            </button>
            {showNotifs && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-nm-card border border-nm-border rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
                <div className="flex items-center justify-between p-4 border-b border-nm-border">
                  <h3 className="text-sm font-semibold text-white">Notifications</h3>
                  <button onClick={() => notifications.forEach(n => !n.read && markNotificationRead(n.id))} className="text-[11px] text-[#AFE607] hover:underline">
                    Mark all read
                  </button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <p className="p-6 text-center text-nm-muted text-sm">No notifications</p>
                  ) : (
                    notifications.map(n => (
                      <button
                        key={n.id}
                        onClick={() => markNotificationRead(n.id)}
                        className={`w-full text-left p-4 border-b border-nm-border hover:bg-nm-card-hover transition-colors ${!n.read ? 'bg-white/[0.02]' : ''}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                            n.type === 'error' ? 'bg-red-500' : n.type === 'warning' ? 'bg-amber-500' : n.type === 'success' ? 'bg-emerald-500' : 'bg-blue-500'
                          }`} />
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-white">{n.title}</p>
                            <p className="text-[11px] text-nm-muted mt-0.5 line-clamp-2">{n.message}</p>
                            <p className="text-[10px] text-nm-muted/60 mt-1">{n.timestamp}</p>
                          </div>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => { setShowProfile(!showProfile); setShowNotifs(false); }}
              className="flex items-center gap-2.5 pl-3 pr-2 py-1.5 rounded-xl hover:bg-nm-card-hover transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#AFE607] to-[#7BC043] flex items-center justify-center">
                <span className="text-black text-[11px] font-bold">{initials}</span>
              </div>
              <span className="text-sm font-medium text-white hidden md:block">{roleLabel}</span>
              <ChevronDown className="size-3.5 text-nm-muted hidden md:block" />
            </button>
            {showProfile && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-nm-card border border-nm-border rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
                <div className="p-4 border-b border-nm-border">
                  <p className="text-sm font-semibold text-white">{roleLabel}</p>
                  <p className="text-xs text-nm-muted mt-0.5">admin@nairamart.ng</p>
                </div>
                <div className="p-2">
                  <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-nm-text-dim hover:bg-nm-card-hover hover:text-white transition-colors">
                    <User className="size-4" /> Profile Settings
                  </button>
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut className="size-4" /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}