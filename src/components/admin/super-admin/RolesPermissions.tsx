'use client';

import { useState } from 'react';
import { SYSTEM_ROLES } from '@/store/admin-store';
import type { Permission } from '@/store/admin-store';
import { Plus, ChevronDown, ChevronUp, Shield, Check } from 'lucide-react';

const permissionLabels: Record<Permission, string> = {
  view: 'View',
  create: 'Create',
  edit: 'Edit',
  delete: 'Delete',
  approve: 'Approve',
  export: 'Export',
  manage: 'Manage',
};

const moduleLabels: Record<string, string> = {
  dashboard: 'Dashboard',
  sellers: 'Sellers',
  products: 'Products',
  categories: 'Categories',
  brands: 'Brands',
  orders: 'Orders',
  customers: 'Customers',
  coupons: 'Coupons',
  commission: 'Commission',
  finance: 'Finance',
  payments: 'Payments',
  logistics: 'Logistics',
  notifications: 'Notifications',
  cms: 'CMS',
  reviews: 'Reviews',
  reports: 'Reports',
  'audit-logs': 'Audit Logs',
  roles: 'Roles & Permissions',
};

export default function RolesPermissions() {
  const [expandedRole, setExpandedRole] = useState<string | null>(SYSTEM_ROLES[0]?.id || null);

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-white text-2xl font-semibold">Roles & Permissions</h1>
          <p className="text-nm-muted text-sm mt-1">Manage system roles and module-level permissions</p>
        </div>
        <button className="flex items-center gap-2 bg-[#AFE607] text-black font-medium rounded-xl px-4 py-2 text-sm hover:bg-[#9ed006] transition-colors">
          <Plus size={16} />
          Create New Role
        </button>
      </div>

      {/* Role Cards */}
      <div className="space-y-4">
        {SYSTEM_ROLES.map((role) => {
          const isExpanded = expandedRole === role.id;

          return (
            <div
              key={role.id}
              className="bg-nm-card rounded-2xl border border-nm-border overflow-hidden hover:border-nm-border-light transition-colors"
            >
              {/* Role Header - Clickable */}
              <button
                onClick={() => setExpandedRole(isExpanded ? null : role.id)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#AFE607]/10 flex items-center justify-center">
                    <Shield size={20} className="text-[#AFE607]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-white font-semibold text-lg">{role.name}</h3>
                      {role.isSystem && (
                        <span className="bg-nm-card-hover rounded-lg px-2 py-0.5 text-[10px] text-nm-text-dim font-medium">
                          SYSTEM
                        </span>
                      )}
                    </div>
                    <p className="text-nm-muted text-sm mt-0.5">{role.description}</p>
                    <p className="text-nm-text-dim text-xs mt-1">
                      {role.modulePermissions.length} modules configured
                    </p>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp size={18} className="text-nm-muted shrink-0" />
                ) : (
                  <ChevronDown size={18} className="text-nm-muted shrink-0" />
                )}
              </button>

              {/* Permissions Grid */}
              {isExpanded && (
                <div className="border-t border-nm-border p-5 animate-fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {role.modulePermissions.map((mp) => (
                      <div
                        key={mp.module}
                        className="bg-nm-input rounded-xl border border-nm-border p-4"
                      >
                        <h4 className="text-white font-medium text-sm mb-3">
                          {moduleLabels[mp.module] || mp.module}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {mp.permissions.map((perm: Permission) => (
                            <span
                              key={perm}
                              className="inline-flex items-center gap-1 rounded-lg bg-emerald-500/10 text-emerald-400 px-2.5 py-1 text-xs font-medium"
                            >
                              <Check size={10} />
                              {permissionLabels[perm]}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="mt-4 pt-4 border-t border-nm-border flex items-center justify-end gap-2">
                    <button className="text-nm-text-dim hover:text-white hover:bg-nm-card-hover rounded-lg px-3 py-2 text-sm transition-colors font-medium">
                      Edit Permissions
                    </button>
                    {!role.isSystem && (
                      <button className="text-red-400 hover:bg-red-500/10 rounded-lg px-3 py-2 text-sm transition-colors font-medium">
                        Delete Role
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}