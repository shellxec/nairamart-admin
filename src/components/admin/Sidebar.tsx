'use client';

import { useAdminStore, SYSTEM_ROLES } from '@/store/admin-store';
import {
  LayoutDashboard, Store, Package, ShoppingCart, Users, FolderTree, Tag,
  Ticket, Percent, Wallet, CreditCard, Truck, Bell, FileText, Star,
  BarChart3, ScrollText, Shield, Settings, MessageSquare, Warehouse,
  Megaphone, ChevronLeft, ChevronRight, LogOut, Search, Moon, Sun,
  Menu, X
} from 'lucide-react';
import { useState } from 'react';

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard, Store, Package, ShoppingCart, Users, FolderTree, Tag,
  Ticket, Percent, Wallet, CreditCard, Truck, Bell, FileText, Star,
  BarChart3, ScrollText, Shield, Settings, MessageSquare, Warehouse,
  Megaphone,
};

export function Sidebar() {
  const { activePage, setActivePage, sidebarCollapsed, toggleSidebar, currentRole, subAdminRole, getVisibleNav, logout, notifications, theme, toggleTheme } = useAdminStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const navItems = getVisibleNav();

  const filteredNav = searchQuery
    ? navItems.filter(item => item.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : navItems;

  const handleNavClick = (pageId: string) => {
    setActivePage(pageId);
    setMobileOpen(false);
  };

  const roleLabel = currentRole === 'super-admin' ? 'Super Admin'
    : currentRole === 'seller' ? 'Seller Portal'
    : subAdminRole ? SYSTEM_ROLES.find(r => r.id === subAdminRole)?.name || 'Sub Admin'
    : 'Admin';

  const unreadNotifs = notifications.filter(n => !n.read).length;

  const navContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 flex items-center justify-between border-b border-nm-border shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-[#AFE607] flex items-center justify-center shrink-0">
            <span className="text-black font-extrabold text-sm">N</span>
          </div>
          {!sidebarCollapsed && (
            <div className="min-w-0">
              <h1 className="text-white font-bold text-sm truncate">Nairamart</h1>
              <p className="text-[10px] text-nm-muted truncate">{roleLabel}</p>
            </div>
          )}
        </div>
        <button onClick={toggleSidebar} className="p-1.5 rounded-lg hover:bg-nm-card-hover text-nm-muted hover:text-white transition-colors hidden lg:flex">
          {sidebarCollapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
        </button>
        <button onClick={() => setMobileOpen(false)} className="p-1.5 rounded-lg hover:bg-nm-card-hover text-nm-muted hover:text-white transition-colors lg:hidden">
          <X className="size-4" />
        </button>
      </div>

      {/* Search */}
      {!sidebarCollapsed && (
        <div className="p-3 shrink-0">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-nm-muted" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search modules..."
              className="w-full bg-nm-input border border-nm-border rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder:text-nm-muted focus:outline-none focus:border-[#AFE607]/40 transition-colors"
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-0.5">
        {filteredNav.map((item) => {
          const Icon = ICONS[item.icon] || LayoutDashboard;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-[13px] font-medium transition-all duration-200 group relative
                ${isActive
                  ? 'bg-[#AFE607]/10 text-[#AFE607] nav-active'
                  : 'text-nm-text-dim hover:bg-nm-card-hover hover:text-white'
                }
                ${sidebarCollapsed ? 'justify-center' : ''}
              `}
              title={sidebarCollapsed ? item.label : undefined}
            >
              <Icon className={`size-[18px] shrink-0 ${isActive ? 'text-[#AFE607]' : 'text-nm-muted group-hover:text-white'}`} />
              {!sidebarCollapsed && (
                <>
                  <span className="flex-1 truncate">{item.label}</span>
                  {item.badge && item.badge > 0 && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center
                      ${isActive ? 'bg-[#AFE607] text-black' : 'bg-nm-card-hover text-nm-text-dim'}`}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
              {sidebarCollapsed && item.badge && item.badge > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#AFE607] text-black text-[9px] font-bold rounded-full flex items-center justify-center">
                  {item.badge > 9 ? '9+' : item.badge}
                </span>
              )}
            </button>
          );
        })}
        {filteredNav.length === 0 && (
          <p className="text-nm-muted text-xs text-center py-8">No modules found</p>
        )}
      </nav>

      {/* Bottom section */}
      <div className="border-t border-nm-border p-3 space-y-1 shrink-0">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] text-nm-text-dim hover:bg-nm-card-hover hover:text-white transition-colors"
        >
          {theme === 'dark' ? <Sun className="size-[18px] text-nm-muted" /> : <Moon className="size-[18px] text-nm-muted" />}
          {!sidebarCollapsed && <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="size-[18px]" />
          {!sidebarCollapsed && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-[60] p-2 rounded-xl bg-nm-card border border-nm-border lg:hidden"
      >
        <Menu className="size-5 text-white" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/60 z-[70] lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Mobile sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-[80] w-72 bg-nm-sidebar border-r border-nm-border transform transition-transform duration-300 lg:hidden
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {navContent}
      </aside>

      {/* Desktop sidebar */}
      <aside className={`hidden lg:flex flex-col fixed inset-y-0 left-0 z-40 bg-nm-sidebar border-r border-nm-border transition-all duration-300
        ${sidebarCollapsed ? 'w-[72px]' : 'w-64'}`}>
        {navContent}
      </aside>
    </>
  );
}