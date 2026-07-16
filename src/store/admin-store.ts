import { create } from 'zustand';

// ─── Types ────────────────────────────────────────────────────────
export type PortalRole = 'super-admin' | 'sub-admin' | 'seller';

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  badge?: number;
  children?: NavItem[];
}

export interface KPIData {
  label: string;
  value: string;
  change: number;
  prefix?: string;
  icon: string;
  color: string;
}

export interface Seller {
  id: string;
  name: string;
  email: string;
  store: string;
  status: 'active' | 'suspended' | 'banned' | 'pending' | 'rejected';
  products: number;
  revenue: number;
  rating: number;
  orders: number;
  joined: string;
  kyc: boolean;
  avatar: string;
  phone: string;
  city: string;
  category: string;
}

export interface ProductModeration {
  id: string;
  name: string;
  seller: string;
  sellerId: string;
  category: string;
  price: number;
  status: 'pending' | 'approved' | 'rejected' | 'revision' | 'hidden' | 'removed';
  images: string[];
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  reason?: string;
  flags: string[];
}

export interface OrderItem {
  id: string;
  orderId: string;
  customer: string;
  seller: string;
  products: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  payment: 'paid' | 'pending' | 'failed' | 'refunded';
  date: string;
  tracking?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  spent: number;
  joined: string;
  status: 'active' | 'suspended' | 'blacklisted';
  city: string;
  complaints: number;
}

export interface AuditLogEntry {
  id: string;
  user: string;
  role: string;
  action: string;
  module: string;
  target: string;
  previousValue?: string;
  newValue?: string;
  ip: string;
  device: string;
  timestamp: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  timestamp: string;
  module: string;
}

// ─── Permission System ────────────────────────────────────────────
export type Permission = 'view' | 'create' | 'edit' | 'delete' | 'approve' | 'export' | 'manage';

export interface ModulePermission {
  module: string;
  permissions: Permission[];
}

export interface RoleDefinition {
  id: string;
  name: string;
  description: string;
  isSystem: boolean;
  modulePermissions: ModulePermission[];
}

const SUPER_ADMIN_PERMISSIONS: ModulePermission[] = [
  { module: 'dashboard', permissions: ['view'] },
  { module: 'sellers', permissions: ['view', 'create', 'edit', 'delete', 'approve', 'export', 'manage'] },
  { module: 'products', permissions: ['view', 'create', 'edit', 'delete', 'approve', 'export', 'manage'] },
  { module: 'categories', permissions: ['view', 'create', 'edit', 'delete', 'manage'] },
  { module: 'brands', permissions: ['view', 'create', 'edit', 'delete', 'manage'] },
  { module: 'orders', permissions: ['view', 'create', 'edit', 'delete', 'approve', 'export', 'manage'] },
  { module: 'customers', permissions: ['view', 'create', 'edit', 'delete', 'export', 'manage'] },
  { module: 'coupons', permissions: ['view', 'create', 'edit', 'delete', 'manage'] },
  { module: 'commission', permissions: ['view', 'create', 'edit', 'manage'] },
  { module: 'finance', permissions: ['view', 'create', 'edit', 'approve', 'export', 'manage'] },
  { module: 'payments', permissions: ['view', 'create', 'edit', 'approve', 'export', 'manage'] },
  { module: 'logistics', permissions: ['view', 'create', 'edit', 'delete', 'manage'] },
  { module: 'notifications', permissions: ['view', 'create', 'edit', 'delete', 'manage'] },
  { module: 'cms', permissions: ['view', 'create', 'edit', 'delete', 'manage'] },
  { module: 'reviews', permissions: ['view', 'create', 'edit', 'delete', 'approve', 'manage'] },
  { module: 'reports', permissions: ['view', 'export', 'manage'] },
  { module: 'audit-logs', permissions: ['view', 'export'] },
  { module: 'roles', permissions: ['view', 'create', 'edit', 'delete', 'manage'] },
];

const SUPPORT_STAFF_PERMISSIONS: ModulePermission[] = [
  { module: 'dashboard', permissions: ['view'] },
  { module: 'orders', permissions: ['view', 'edit', 'approve'] },
  { module: 'customers', permissions: ['view', 'edit'] },
  { module: 'reviews', permissions: ['view', 'edit', 'delete'] },
  { module: 'notifications', permissions: ['view', 'create'] },
];

const MARKETING_STAFF_PERMISSIONS: ModulePermission[] = [
  { module: 'dashboard', permissions: ['view'] },
  { module: 'coupons', permissions: ['view', 'create', 'edit', 'manage'] },
  { module: 'cms', permissions: ['view', 'create', 'edit', 'manage'] },
  { module: 'notifications', permissions: ['view', 'create', 'manage'] },
  { module: 'reports', permissions: ['view', 'export'] },
];

const MODERATION_STAFF_PERMISSIONS: ModulePermission[] = [
  { module: 'dashboard', permissions: ['view'] },
  { module: 'products', permissions: ['view', 'edit', 'approve'] },
  { module: 'reviews', permissions: ['view', 'edit', 'delete', 'approve'] },
  { module: 'sellers', permissions: ['view'] },
];

const FINANCE_STAFF_PERMISSIONS: ModulePermission[] = [
  { module: 'dashboard', permissions: ['view'] },
  { module: 'finance', permissions: ['view', 'approve', 'export'] },
  { module: 'payments', permissions: ['view', 'approve', 'export'] },
  { module: 'commission', permissions: ['view', 'edit'] },
  { module: 'reports', permissions: ['view', 'export'] },
];

export const SYSTEM_ROLES: RoleDefinition[] = [
  { id: 'super-admin', name: 'Super Admin', description: 'Full unrestricted access to all modules', isSystem: true, modulePermissions: SUPER_ADMIN_PERMISSIONS },
  { id: 'support-staff', name: 'Customer Support', description: 'Handle complaints, orders, and customer issues', isSystem: true, modulePermissions: SUPPORT_STAFF_PERMISSIONS },
  { id: 'marketing-staff', name: 'Marketing Staff', description: 'Manage campaigns, coupons, and CMS content', isSystem: true, modulePermissions: MARKETING_STAFF_PERMISSIONS },
  { id: 'moderation-staff', name: 'Content Moderator', description: 'Approve/reject products and moderate reviews', isSystem: true, modulePermissions: MODERATION_STAFF_PERMISSIONS },
  { id: 'finance-staff', name: 'Finance Staff', description: 'Manage payouts, transactions, and financial reports', isSystem: true, modulePermissions: FINANCE_STAFF_PERMISSIONS },
];

// ─── Navigation Config ────────────────────────────────────────────
export const SUPER_ADMIN_NAV: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { id: 'sellers', label: 'Sellers', icon: 'Store', badge: 12 },
  { id: 'products', label: 'Product Moderation', icon: 'Package', badge: 47 },
  { id: 'orders', label: 'Orders', icon: 'ShoppingCart', badge: 8 },
  { id: 'customers', label: 'Customers', icon: 'Users' },
  { id: 'categories', label: 'Categories', icon: 'FolderTree' },
  { id: 'brands', label: 'Brands', icon: 'Tag' },
  { id: 'coupons', label: 'Coupons', icon: 'Ticket' },
  { id: 'commission', label: 'Commission', icon: 'Percent' },
  { id: 'finance', label: 'Finance', icon: 'Wallet', badge: 3 },
  { id: 'payments', label: 'Payments', icon: 'CreditCard' },
  { id: 'logistics', label: 'Logistics', icon: 'Truck' },
  { id: 'notifications', label: 'Notifications', icon: 'Bell', badge: 5 },
  { id: 'cms', label: 'CMS', icon: 'FileText' },
  { id: 'reviews', label: 'Reviews', icon: 'Star', badge: 23 },
  { id: 'reports', label: 'Reports', icon: 'BarChart3' },
  { id: 'audit-logs', label: 'Audit Logs', icon: 'ScrollText' },
  { id: 'roles', label: 'Roles & Permissions', icon: 'Shield' },
];

export const SELLER_NAV: NavItem[] = [
  { id: 'seller-dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { id: 'seller-products', label: 'Products', icon: 'Package', badge: 3 },
  { id: 'seller-inventory', label: 'Inventory', icon: 'Warehouse' },
  { id: 'seller-orders', label: 'Orders', icon: 'ShoppingCart', badge: 5 },
  { id: 'seller-messages', label: 'Messages', icon: 'MessageSquare', badge: 2 },
  { id: 'seller-store', label: 'Store Profile', icon: 'Store' },
  { id: 'seller-finance', label: 'Finance', icon: 'Wallet' },
  { id: 'seller-marketing', label: 'Marketing', icon: 'Megaphone' },
  { id: 'seller-reviews', label: 'Reviews', icon: 'Star' },
  { id: 'seller-analytics', label: 'Analytics', icon: 'BarChart3' },
  { id: 'seller-settings', label: 'Settings', icon: 'Settings' },
];

// ─── Store ────────────────────────────────────────────────────────
interface AdminState {
  // Auth
  currentRole: PortalRole | null;
  subAdminRole: string | null;
  isAuthenticated: boolean;
  setRole: (role: PortalRole, subRole?: string) => void;
  logout: () => void;

  // Navigation
  activePage: string;
  setActivePage: (page: string) => void;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;

  // Notifications
  notifications: Notification[];
  markNotificationRead: (id: string) => void;
  unreadCount: () => number;

  // Search
  globalSearch: string;
  setGlobalSearch: (q: string) => void;

  // Theme
  theme: 'dark' | 'light';
  toggleTheme: () => void;

  // Permissions
  hasPermission: (module: string, permission: Permission) => boolean;
  getVisibleNav: () => NavItem[];
}

export const useAdminStore = create<AdminState>((set, get) => ({
  currentRole: null,
  subAdminRole: null,
  isAuthenticated: false,
  setRole: (role, subRole) => set({ currentRole: role, subAdminRole: subRole || null, isAuthenticated: true, activePage: role === 'seller' ? 'seller-dashboard' : 'dashboard' }),
  logout: () => set({ currentRole: null, subAdminRole: null, isAuthenticated: false, activePage: 'dashboard', notifications: [] }),

  activePage: 'dashboard',
  setActivePage: (page) => set({ activePage: page }),
  sidebarCollapsed: false,
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),

  notifications: [
    { id: '1', title: 'New Seller Application', message: 'Lagos Electronics Hub has applied to join the marketplace', type: 'info', read: false, timestamp: '2 min ago', module: 'sellers' },
    { id: '2', title: 'Product Flagged', message: '5 products flagged for review – potential counterfeit items', type: 'warning', read: false, timestamp: '15 min ago', module: 'products' },
    { id: '3', title: 'Withdrawal Request', message: 'TechZone Nigeria requested ₦2,450,000 payout', type: 'info', read: false, timestamp: '1 hour ago', module: 'finance' },
    { id: '4', title: 'High Refund Rate Alert', message: 'Seller "QuickBuy Deals" has 12% refund rate – above threshold', type: 'error', read: false, timestamp: '2 hours ago', module: 'sellers' },
    { id: '5', title: 'Flash Sale Success', message: 'Weekend flash sale generated ₦45M in revenue', type: 'success', read: false, timestamp: '3 hours ago', module: 'coupons' },
  ],
  markNotificationRead: (id) => set((s) => ({ notifications: s.notifications.map(n => n.id === id ? { ...n, read: true } : n) })),
  unreadCount: () => get().notifications.filter(n => !n.read).length,

  globalSearch: '',
  setGlobalSearch: (q) => set({ globalSearch: q }),

  theme: 'dark',
  toggleTheme: () => set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),

  hasPermission: (module, permission) => {
    const { currentRole, subAdminRole } = get();
    if (currentRole === 'super-admin') return true;
    if (currentRole === 'seller') return true;
    if (currentRole === 'sub-admin' && subAdminRole) {
      const role = SYSTEM_ROLES.find(r => r.id === subAdminRole);
      if (!role) return false;
      const mp = role.modulePermissions.find(m => m.module === module);
      return mp ? mp.permissions.includes(permission) : false;
    }
    return false;
  },
  getVisibleNav: () => {
    const { currentRole, subAdminRole } = get();
    if (currentRole === 'super-admin') return SUPER_ADMIN_NAV;
    if (currentRole === 'seller') return SELLER_NAV;
    if (currentRole === 'sub-admin' && subAdminRole) {
      const role = SYSTEM_ROLES.find(r => r.id === subAdminRole);
      if (!role) return [];
      const allowedModules = new Set(role.modulePermissions.map(m => m.module));
      return SUPER_ADMIN_NAV.filter(item => allowedModules.has(item.id));
    }
    return [];
  },
}));