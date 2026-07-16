'use client';

import { useAdminStore } from '@/store/admin-store';
import { Sidebar } from '@/components/admin/Sidebar';
import { TopBar } from '@/components/admin/TopBar';
import { LoginPage } from '@/components/admin/LoginPage';

// Super Admin pages
import Dashboard from '@/components/admin/super-admin/Dashboard';
import SellerManagement from '@/components/admin/super-admin/SellerManagement';
import ProductModeration from '@/components/admin/super-admin/ProductModeration';
import OrderManagement from '@/components/admin/super-admin/OrderManagement';
import CustomerManagement from '@/components/admin/super-admin/CustomerManagement';
import CategoryManagement from '@/components/admin/super-admin/CategoryManagement';
import BrandManagement from '@/components/admin/super-admin/BrandManagement';
import CouponManagement from '@/components/admin/super-admin/CouponManagement';
import CommissionManagement from '@/components/admin/super-admin/CommissionManagement';
import FinanceDashboard from '@/components/admin/super-admin/FinanceDashboard';
import PaymentManagement from '@/components/admin/super-admin/PaymentManagement';
import LogisticsManagement from '@/components/admin/super-admin/LogisticsManagement';
import NotificationCenter from '@/components/admin/super-admin/NotificationCenter';
import CMSManagement from '@/components/admin/super-admin/CMSManagement';
import ReviewModeration from '@/components/admin/super-admin/ReviewModeration';
import ReportsAnalytics from '@/components/admin/super-admin/ReportsAnalytics';
import AuditLogs from '@/components/admin/super-admin/AuditLogs';
import RolesPermissions from '@/components/admin/super-admin/RolesPermissions';

// Seller pages
import SellerDashboard from '@/components/admin/seller/SellerDashboard';
import SellerProducts from '@/components/admin/seller/SellerProducts';
import SellerInventory from '@/components/admin/seller/SellerInventory';
import SellerOrders from '@/components/admin/seller/SellerOrders';
import SellerMessages from '@/components/admin/seller/SellerMessages';
import SellerStoreProfile from '@/components/admin/seller/SellerStoreProfile';
import SellerFinance from '@/components/admin/seller/SellerFinance';
import SellerMarketing from '@/components/admin/seller/SellerMarketing';
import SellerReviews from '@/components/admin/seller/SellerReviews';
import SellerAnalytics from '@/components/admin/seller/SellerAnalytics';
import SellerSettings from '@/components/admin/seller/SellerSettings';

const SUPER_ADMIN_PAGES: Record<string, React.ComponentType> = {
  'dashboard': Dashboard,
  'sellers': SellerManagement,
  'products': ProductModeration,
  'orders': OrderManagement,
  'customers': CustomerManagement,
  'categories': CategoryManagement,
  'brands': BrandManagement,
  'coupons': CouponManagement,
  'commission': CommissionManagement,
  'finance': FinanceDashboard,
  'payments': PaymentManagement,
  'logistics': LogisticsManagement,
  'notifications': NotificationCenter,
  'cms': CMSManagement,
  'reviews': ReviewModeration,
  'reports': ReportsAnalytics,
  'audit-logs': AuditLogs,
  'roles': RolesPermissions,
};

const SELLER_PAGES: Record<string, React.ComponentType> = {
  'seller-dashboard': SellerDashboard,
  'seller-products': SellerProducts,
  'seller-inventory': SellerInventory,
  'seller-orders': SellerOrders,
  'seller-messages': SellerMessages,
  'seller-store': SellerStoreProfile,
  'seller-finance': SellerFinance,
  'seller-marketing': SellerMarketing,
  'seller-reviews': SellerReviews,
  'seller-analytics': SellerAnalytics,
  'seller-settings': SellerSettings,
};

export default function AdminPage() {
  const { isAuthenticated, activePage, sidebarCollapsed } = useAdminStore();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const ALL_PAGES = { ...SUPER_ADMIN_PAGES, ...SELLER_PAGES };
  const ActiveComponent = ALL_PAGES[activePage];

  return (
    <div className="min-h-screen bg-nm-dark">
      <Sidebar />
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-[72px]' : 'lg:ml-64'}`}>
        <TopBar />
        <main className="p-4 lg:p-6 max-w-[1600px]">
          {ActiveComponent ? <ActiveComponent /> : (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <div className="w-16 h-16 rounded-2xl bg-nm-card flex items-center justify-center mb-4">
                <span className="text-2xl">📄</span>
              </div>
              <h2 className="text-lg font-semibold text-white mb-1">Module Not Found</h2>
              <p className="text-nm-muted text-sm">The requested module is not available for your role.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}