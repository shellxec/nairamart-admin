'use client';

import { useAdminStore, SYSTEM_ROLES, type PortalRole } from '@/store/admin-store';
import { Shield, Store, UserCheck, ArrowRight } from 'lucide-react';

export function LoginPage() {
  const { setRole } = useAdminStore();

  const portals: { role: PortalRole; subRole?: string; title: string; desc: string; icon: React.ReactNode; color: string; count?: string }[] = [
    { role: 'super-admin', title: 'Super Admin', desc: 'Full unrestricted access to all marketplace modules', icon: <Shield className="size-6" />, color: 'from-[#AFE607]/20 to-[#AFE607]/5 border-[#AFE607]/20 hover:border-[#AFE607]/50' },
    { role: 'sub-admin', subRole: 'support-staff', title: 'Customer Support', desc: 'Handle complaints, orders, and customer issues', icon: <UserCheck className="size-6" />, color: 'from-blue-500/20 to-blue-500/5 border-blue-500/20 hover:border-blue-500/50' },
    { role: 'sub-admin', subRole: 'marketing-staff', title: 'Marketing Staff', desc: 'Manage campaigns, coupons, and CMS content', icon: <Store className="size-6" />, color: 'from-purple-500/20 to-purple-500/5 border-purple-500/20 hover:border-purple-500/50' },
    { role: 'sub-admin', subRole: 'moderation-staff', title: 'Content Moderator', desc: 'Approve/reject products and moderate reviews', icon: <Shield className="size-6" />, color: 'from-amber-500/20 to-amber-500/5 border-amber-500/20 hover:border-amber-500/50' },
    { role: 'sub-admin', subRole: 'finance-staff', title: 'Finance Staff', desc: 'Manage payouts, transactions, and financial reports', icon: <Store className="size-6" />, color: 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/20 hover:border-emerald-500/50' },
    { role: 'seller', title: 'Seller Portal', desc: 'Manage your store, products, orders, and analytics', icon: <Store className="size-6" />, color: 'from-[#AFE607]/20 to-[#AFE607]/5 border-[#AFE607]/20 hover:border-[#AFE607]/50' },
  ];

  return (
    <div className="min-h-screen bg-nm-dark flex items-center justify-center p-6">
      <div className="w-full max-w-4xl animate-fade-in">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-[#AFE607] flex items-center justify-center">
              <span className="text-black font-extrabold text-xl">N</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Nairamart</h1>
          </div>
          <p className="text-nm-muted text-lg">Marketplace Administration Portal</p>
          <p className="text-nm-muted/60 text-sm mt-1">Select your portal to continue</p>
        </div>

        {/* Portal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {portals.map((portal) => (
            <button
              key={portal.title}
              onClick={() => setRole(portal.role, portal.subRole)}
              className={`group relative bg-gradient-to-br ${portal.color} rounded-2xl p-6 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-white/5 text-white/80`}>
                  {portal.icon}
                </div>
                <ArrowRight className="size-5 text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="text-white font-bold text-base mb-1">{portal.title}</h3>
              <p className="text-white/50 text-xs leading-relaxed">{portal.desc}</p>
              {portal.role === 'sub-admin' && (
                <div className="mt-3 inline-block px-2 py-0.5 rounded-md bg-white/5 text-[10px] text-white/40 font-medium uppercase tracking-wider">
                  Sub Admin
                </div>
              )}
              {portal.role === 'super-admin' && (
                <div className="mt-3 inline-block px-2 py-0.5 rounded-md bg-[#AFE607]/10 text-[10px] text-[#AFE607] font-medium uppercase tracking-wider">
                  Full Access
                </div>
              )}
              {portal.role === 'seller' && (
                <div className="mt-3 inline-block px-2 py-0.5 rounded-md bg-[#AFE607]/10 text-[10px] text-[#AFE607] font-medium uppercase tracking-wider">
                  Merchant
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-10 text-nm-muted/40 text-xs">
          © 2026 Nairamart – Enterprise Marketplace Platform
        </div>
      </div>
    </div>
  );
}