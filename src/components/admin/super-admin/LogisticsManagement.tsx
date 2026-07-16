'use client';

import { Plus, Pencil, Trash2, MapPin, Truck, Clock } from 'lucide-react';

interface ShippingPartner {
  id: string;
  name: string;
  zones: string;
  baseRate: number;
  perKgRate: number;
  status: 'active' | 'inactive';
  ordersHandled: number;
}

interface DeliveryZone {
  name: string;
  states: number;
  deliveryDays: string;
  baseRate: number;
  perKgRate: number;
  gradient: string;
}

const partners: ShippingPartner[] = [
  { id: 'SP-001', name: 'GIG Logistics', zones: 'Lagos, Abuja, PH, Kano, SW', baseRate: 1500, perKgRate: 300, status: 'active', ordersHandled: 45230 },
  { id: 'SP-002', name: 'Fedex Nigeria', zones: 'Lagos, Abuja, Port Harcourt', baseRate: 3500, perKgRate: 800, status: 'active', ordersHandled: 8920 },
  { id: 'SP-003', name: 'DHL Express', zones: 'Lagos, Abuja, All States', baseRate: 5000, perKgRate: 1200, status: 'active', ordersHandled: 6780 },
  { id: 'SP-004', name: 'NIPOST', zones: 'All 36 States', baseRate: 1000, perKgRate: 150, status: 'active', ordersHandled: 23450 },
  { id: 'SP-005', name: 'RedStar Express', zones: 'Lagos, Abuja, PH, SE, SS', baseRate: 2000, perKgRate: 450, status: 'active', ordersHandled: 15670 },
  { id: 'SP-006', name: 'ABC Transport', zones: 'Lagos, Abuja, SE, SS, SW', baseRate: 1200, perKgRate: 200, status: 'inactive', ordersHandled: 5120 },
];

const zones: DeliveryZone[] = [
  { name: 'Lagos', states: 1, deliveryDays: '1-2 days', baseRate: 1500, perKgRate: 300, gradient: 'from-emerald-600/30 to-emerald-900/20' },
  { name: 'Abuja', states: 1, deliveryDays: '2-3 days', baseRate: 2500, perKgRate: 500, gradient: 'from-blue-600/30 to-blue-900/20' },
  { name: 'Port Harcourt', states: 1, deliveryDays: '2-4 days', baseRate: 3000, perKgRate: 600, gradient: 'from-amber-600/30 to-amber-900/20' },
  { name: 'Kano', states: 1, deliveryDays: '3-5 days', baseRate: 3500, perKgRate: 700, gradient: 'from-violet-600/30 to-violet-900/20' },
  { name: 'Other States', states: 32, deliveryDays: '3-7 days', baseRate: 4000, perKgRate: 800, gradient: 'from-rose-600/30 to-rose-900/20' },
];

export default function LogisticsManagement() {
  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-white text-2xl font-semibold">Logistics Management</h1>
          <p className="text-nm-muted text-sm mt-1">Shipping partners, rates, and delivery zones</p>
        </div>
        <button className="flex items-center gap-2 bg-[#AFE607] text-black font-medium rounded-xl px-4 py-2 text-sm hover:bg-[#9ed006] transition-colors">
          <Plus size={16} />
          Add Partner
        </button>
      </div>

      {/* Shipping Partners Table */}
      <div className="bg-nm-card rounded-2xl border border-nm-border p-5">
        <h3 className="text-white font-semibold mb-4">Shipping Partners</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-nm-border text-left">
                <th className="pb-3 text-nm-muted font-medium">Company</th>
                <th className="pb-3 text-nm-muted font-medium hidden md:table-cell">Zones Covered</th>
                <th className="pb-3 text-nm-muted font-medium text-right">Base Rate(₦)</th>
                <th className="pb-3 text-nm-muted font-medium text-right">Per KG Rate(₦)</th>
                <th className="pb-3 text-nm-muted font-medium">Status</th>
                <th className="pb-3 text-nm-muted font-medium text-right hidden lg:table-cell">Orders Handled</th>
                <th className="pb-3 text-nm-muted font-medium w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              {partners.map((p) => (
                <tr key={p.id} className="border-b border-nm-border hover:bg-nm-card-hover transition-colors">
                  <td className="py-3.5 pr-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-nm-card-hover border border-nm-border flex items-center justify-center shrink-0">
                        <Truck size={16} className="text-nm-text-dim" />
                      </div>
                      <span className="text-white font-medium whitespace-nowrap">{p.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 pr-4 text-nm-text-dim hidden md:table-cell max-w-[180px]">
                    <span className="line-clamp-1">{p.zones}</span>
                  </td>
                  <td className="py-3.5 pr-4 text-white text-right font-medium">₦{p.baseRate.toLocaleString()}</td>
                  <td className="py-3.5 pr-4 text-white text-right">₦{p.perKgRate.toLocaleString()}</td>
                  <td className="py-3.5 pr-4">
                    <span className={`rounded-lg px-2.5 py-1 text-xs font-medium ${
                      p.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-gray-500/10 text-gray-400'
                    }`}>
                      {p.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-3.5 pr-4 text-nm-text-dim text-right hidden lg:table-cell">{p.ordersHandled.toLocaleString()}</td>
                  <td className="py-3.5">
                    <div className="flex items-center gap-1">
                      <button className="text-nm-text-dim hover:text-white hover:bg-nm-card-hover rounded-lg px-3 py-2 text-sm transition-colors">
                        <Pencil size={14} />
                      </button>
                      <button className="text-nm-text-dim hover:text-red-400 hover:bg-red-500/10 rounded-lg px-3 py-2 text-sm transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delivery Zones */}
      <div>
        <h3 className="text-white font-semibold mb-4">Delivery Zones</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {zones.map((z) => (
            <div
              key={z.name}
              className="bg-nm-card rounded-2xl border border-nm-border p-5 hover:border-nm-border-light transition-colors"
            >
              <div className={`w-full h-20 rounded-xl bg-gradient-to-br ${z.gradient} flex items-center justify-center mb-4`}>
                <MapPin size={24} className="text-white/70" />
              </div>
              <h4 className="text-white font-semibold">{z.name}</h4>
              <p className="text-nm-muted text-xs mt-0.5">{z.states > 1 ? `${z.states} states` : 'Metro Area'}</p>
              <div className="mt-3 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-nm-text-dim flex items-center gap-1"><Clock size={11} />Delivery</span>
                  <span className="text-white font-medium">{z.deliveryDays}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-nm-text-dim">Base Rate</span>
                  <span className="text-white font-medium">₦{z.baseRate.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-nm-text-dim">Per KG</span>
                  <span className="text-white font-medium">₦{z.perKgRate.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}