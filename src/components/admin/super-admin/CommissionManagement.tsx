'use client';

import { useState } from 'react';
import { Save, Pencil, Plus, Calendar, Percent } from 'lucide-react';

interface CategoryRate {
  id: string;
  category: string;
  rate: number;
  status: 'active' | 'inactive';
}

interface SellerOverride {
  sellerId: string;
  sellerName: string;
  store: string;
  category: string;
  defaultRate: number;
  customRate: number;
}

interface HolidayRate {
  id: string;
  name: string;
  rate: number;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'active';
}

export default function CommissionManagement() {
  const [defaultRate, setDefaultRate] = useState(5);
  const [editingDefault, setEditingDefault] = useState(false);
  const [savedDefault, setSavedDefault] = useState(true);

  const [categoryRates, setCategoryRates] = useState<CategoryRate[]>([
    { id: 'cr-1', category: 'Electronics', rate: 8, status: 'active' },
    { id: 'cr-2', category: 'Phones & Tablets', rate: 6, status: 'active' },
    { id: 'cr-3', category: 'Fashion', rate: 10, status: 'active' },
    { id: 'cr-4', category: 'Home & Kitchen', rate: 7, status: 'active' },
    { id: 'cr-5', category: 'Fresh Fruits', rate: 5, status: 'active' },
    { id: 'cr-6', category: 'Gym & Sports', rate: 8, status: 'active' },
    { id: 'cr-7', category: 'Baby Products', rate: 10, status: 'active' },
    { id: 'cr-8', category: 'Auto Parts', rate: 6, status: 'inactive' },
    { id: 'cr-9', category: 'Beauty & Health', rate: 12, status: 'active' },
    { id: 'cr-10', category: 'Gaming', rate: 9, status: 'active' },
    { id: 'cr-11', category: 'Computers', rate: 7, status: 'active' },
  ]);

  const [sellerOverrides, setSellerOverrides] = useState<SellerOverride[]>([
    { sellerId: 'SEL-001', sellerName: 'Chukwuma Okafor', store: 'TechZone Nigeria', category: 'Electronics', defaultRate: 8, customRate: 6 },
    { sellerId: 'SEL-002', sellerName: 'Aminat Ibrahim', store: 'FashionSpot Hub', category: 'Fashion', defaultRate: 10, customRate: 8 },
    { sellerId: 'SEL-003', sellerName: 'Fatima Bello', store: 'Beauty Corner NG', category: 'Beauty & Health', defaultRate: 12, customRate: 9 },
  ]);

  const [holidayRates, setHolidayRates] = useState<HolidayRate[]>([
    { id: 'hr-1', name: 'Easter Weekend Sale', rate: 4, startDate: '2026-04-03', endDate: '2026-04-06', status: 'upcoming' },
    { id: 'hr-2', name: 'Independence Day Promo', rate: 5, startDate: '2026-10-01', endDate: '2026-10-03', status: 'upcoming' },
    { id: 'hr-3', name: 'Black Friday Blitz', rate: 3, startDate: '2026-11-27', endDate: '2026-11-30', status: 'upcoming' },
  ]);

  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editingOverride, setEditingOverride] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, number>>({});

  const holidayStatusColors: Record<HolidayRate['status'], string> = {
    active: 'bg-emerald-500/10 text-emerald-400',
    upcoming: 'bg-blue-500/10 text-blue-400',
  };

  const categoryStatusColors: Record<CategoryRate['status'], string> = {
    active: 'bg-emerald-500/10 text-emerald-400',
    inactive: 'bg-gray-500/10 text-gray-400',
  };

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-white text-2xl font-semibold">Commission Management</h1>
        <p className="text-nm-muted text-sm mt-1">Configure marketplace commission rates and seller overrides</p>
      </div>

      {/* Default Commission Card */}
      <div className="bg-nm-card rounded-2xl border border-nm-border p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#AFE607]/10 flex items-center justify-center">
              <Percent size={22} className="text-[#AFE607]" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">Default Commission</h3>
              <p className="text-nm-muted text-sm">Applied to all categories without specific rates</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {editingDefault ? (
              <>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    value={defaultRate}
                    onChange={(e) => { setDefaultRate(Number(e.target.value)); setSavedDefault(false); }}
                    className="w-20 bg-nm-input border border-nm-border rounded-xl px-3 py-2 text-sm text-white text-center focus:outline-none focus:border-nm-border-light"
                    min={0}
                    max={50}
                    step={0.5}
                  />
                  <span className="text-nm-muted">%</span>
                </div>
                <button
                  onClick={() => { setEditingDefault(false); setSavedDefault(true); }}
                  className="flex items-center gap-1.5 bg-[#AFE607] text-black font-medium rounded-xl px-4 py-2 text-sm hover:bg-[#9ed006] transition-colors"
                >
                  <Save size={14} />
                  Save
                </button>
              </>
            ) : (
              <>
                <span className="text-3xl font-bold text-[#AFE607]">{defaultRate}%</span>
                <button
                  onClick={() => setEditingDefault(true)}
                  className="text-nm-text-dim hover:text-white p-2 rounded-lg hover:bg-nm-card-hover transition-colors"
                >
                  <Pencil size={16} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Category Commission Rates */}
      <div className="bg-nm-card rounded-2xl border border-nm-border overflow-hidden">
        <div className="p-5 border-b border-nm-border flex items-center justify-between">
          <div>
            <h3 className="text-white font-semibold">Category Commission Rates</h3>
            <p className="text-nm-muted text-xs mt-0.5">Override default commission for specific categories</p>
          </div>
          <button className="flex items-center gap-1.5 bg-[#AFE607] text-black font-medium rounded-xl px-4 py-2 text-sm hover:bg-[#9ed006] transition-colors">
            <Save size={14} />
            Save All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-nm-border text-left">
                <th className="p-4 text-nm-muted font-medium">Category</th>
                <th className="p-4 text-nm-muted font-medium">Rate (%)</th>
                <th className="p-4 text-nm-muted font-medium">Status</th>
                <th className="p-4 text-nm-muted font-medium w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categoryRates.map((cr) => (
                <tr key={cr.id} className="border-b border-nm-border hover:bg-nm-card-hover transition-colors">
                  <td className="p-4 text-white">{cr.category}</td>
                  <td className="p-4">
                    {editingCategory === cr.id ? (
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          value={editValues[cr.id] ?? cr.rate}
                          onChange={(e) => setEditValues({ ...editValues, [cr.id]: Number(e.target.value) })}
                          className="w-20 bg-nm-input border border-nm-border rounded-xl px-3 py-2 text-sm text-white text-center focus:outline-none focus:border-nm-border-light"
                          min={0}
                          max={50}
                          step={0.5}
                        />
                        <span className="text-nm-muted text-sm">%</span>
                      </div>
                    ) : (
                      <span className="text-[#AFE607] font-semibold">{cr.rate}%</span>
                    )}
                  </td>
                  <td className="p-4">
                    <span className={`rounded-lg px-2.5 py-1 text-xs font-medium capitalize ${categoryStatusColors[cr.status]}`}>
                      {cr.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => {
                        if (editingCategory === cr.id) {
                          setCategoryRates((prev) =>
                            prev.map((r) =>
                              r.id === cr.id ? { ...r, rate: editValues[cr.id] ?? r.rate } : r
                            )
                          );
                          setEditingCategory(null);
                        } else {
                          setEditingCategory(cr.id);
                          setEditValues({ ...editValues, [cr.id]: cr.rate });
                        }
                      }}
                      className="text-nm-text-dim hover:text-white p-1.5 rounded-lg hover:bg-nm-card-hover transition-colors"
                    >
                      {editingCategory === cr.id ? <Save size={14} /> : <Pencil size={14} />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Holiday Rates */}
      <div className="bg-nm-card rounded-2xl border border-nm-border overflow-hidden">
        <div className="p-5 border-b border-nm-border flex items-center justify-between">
          <div>
            <h3 className="text-white font-semibold">Holiday Rates</h3>
            <p className="text-nm-muted text-xs mt-0.5">Temporary commission adjustments for promotional periods</p>
          </div>
          <button className="flex items-center gap-1.5 bg-[#AFE607] text-black font-medium rounded-xl px-4 py-2 text-sm hover:bg-[#9ed006] transition-colors">
            <Save size={14} />
            Save
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-nm-border text-left">
                <th className="p-4 text-nm-muted font-medium">Period</th>
                <th className="p-4 text-nm-muted font-medium">Rate</th>
                <th className="p-4 text-nm-muted font-medium hidden sm:table-cell">Start</th>
                <th className="p-4 text-nm-muted font-medium hidden sm:table-cell">End</th>
                <th className="p-4 text-nm-muted font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {holidayRates.map((hr) => (
                <tr key={hr.id} className="border-b border-nm-border hover:bg-nm-card-hover transition-colors">
                  <td className="p-4 text-white font-medium">{hr.name}</td>
                  <td className="p-4">
                    <span className="text-[#AFE607] font-semibold">{hr.rate}%</span>
                  </td>
                  <td className="p-4 text-nm-text-dim hidden sm:table-cell">
                    {new Date(hr.startDate).toLocaleDateString('en-NG', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="p-4 text-nm-text-dim hidden sm:table-cell">
                    {new Date(hr.endDate).toLocaleDateString('en-NG', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="p-4">
                    <span className={`rounded-lg px-2.5 py-1 text-xs font-medium capitalize ${holidayStatusColors[hr.status]}`}>
                      {hr.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Seller Overrides */}
      <div className="bg-nm-card rounded-2xl border border-nm-border overflow-hidden">
        <div className="p-5 border-b border-nm-border flex items-center justify-between">
          <div>
            <h3 className="text-white font-semibold">Seller Overrides</h3>
            <p className="text-nm-muted text-xs mt-0.5">Custom commission rates for specific sellers</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 border border-nm-border text-nm-text-dim hover:text-white hover:border-nm-border-light rounded-xl px-3 py-2 text-sm transition-colors">
              <Plus size={14} />
              Add Override
            </button>
            <button className="flex items-center gap-1.5 bg-[#AFE607] text-black font-medium rounded-xl px-4 py-2 text-sm hover:bg-[#9ed006] transition-colors">
              <Save size={14} />
              Save
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-nm-border text-left">
                <th className="p-4 text-nm-muted font-medium">Seller</th>
                <th className="p-4 text-nm-muted font-medium hidden sm:table-cell">Store</th>
                <th className="p-4 text-nm-muted font-medium">Category</th>
                <th className="p-4 text-nm-muted font-medium hidden md:table-cell">Default</th>
                <th className="p-4 text-nm-muted font-medium">Custom Rate</th>
                <th className="p-4 text-nm-muted font-medium w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sellerOverrides.map((so) => (
                <tr key={so.sellerId} className="border-b border-nm-border hover:bg-nm-card-hover transition-colors">
                  <td className="p-4 text-white">{so.sellerName}</td>
                  <td className="p-4 text-nm-text-dim hidden sm:table-cell">{so.store}</td>
                  <td className="p-4 text-nm-text-dim">{so.category}</td>
                  <td className="p-4 text-nm-muted hidden md:table-cell">{so.defaultRate}%</td>
                  <td className="p-4">
                    {editingOverride === so.sellerId ? (
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          value={editValues[so.sellerId] ?? so.customRate}
                          onChange={(e) => setEditValues({ ...editValues, [so.sellerId]: Number(e.target.value) })}
                          className="w-20 bg-nm-input border border-nm-border rounded-xl px-3 py-2 text-sm text-white text-center focus:outline-none focus:border-nm-border-light"
                          min={0}
                          max={50}
                          step={0.5}
                        />
                        <span className="text-nm-muted text-sm">%</span>
                      </div>
                    ) : (
                      <span className="text-[#AFE607] font-semibold">{so.customRate}%</span>
                    )}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => {
                        if (editingOverride === so.sellerId) {
                          setSellerOverrides((prev) =>
                            prev.map((s) =>
                              s.sellerId === so.sellerId
                                ? { ...s, customRate: editValues[so.sellerId] ?? s.customRate }
                                : s
                            )
                          );
                          setEditingOverride(null);
                        } else {
                          setEditingOverride(so.sellerId);
                          setEditValues({ ...editValues, [so.sellerId]: so.customRate });
                        }
                      }}
                      className="text-nm-text-dim hover:text-white p-1.5 rounded-lg hover:bg-nm-card-hover transition-colors"
                    >
                      {editingOverride === so.sellerId ? <Save size={14} /> : <Pencil size={14} />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}