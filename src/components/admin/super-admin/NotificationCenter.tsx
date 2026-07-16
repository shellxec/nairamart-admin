'use client';

import { useState } from 'react';
import { Plus, Pencil, Trash2, Clock, Megaphone, Smartphone, Mail, Bell } from 'lucide-react';

type Tab = 'announcements' | 'campaigns';

interface Announcement {
  id: string;
  title: string;
  message: string;
  target: string;
  status: 'Active' | 'Draft' | 'Scheduled';
  date: string;
}

interface Campaign {
  id: string;
  title: string;
  type: 'SMS' | 'Email' | 'Push';
  recipients: number;
  status: 'Sent' | 'Draft' | 'Scheduled';
  date: string;
}

const announcements: Announcement[] = [
  { id: 'ANN-001', title: 'Holiday Season Shipping Update', message: 'Extended delivery timelines during the festive season. Please manage customer expectations and plan inventory accordingly for the December rush.', target: 'All Sellers', status: 'Active', date: '2024-12-06' },
  { id: 'ANN-002', title: 'New Buyer Protection Policy', message: 'We have strengthened our buyer protection program. All purchases now come with extended refund windows and improved dispute resolution process.', target: 'All Customers', status: 'Active', date: '2024-12-05' },
  { id: 'ANN-003', title: 'Welcome to Nairamart!', message: 'Welcome aboard! Complete your profile, explore millions of products, and enjoy exclusive first-order discounts. Start shopping now.', target: 'New Users', status: 'Active', date: '2024-12-04' },
  { id: 'ANN-004', title: 'Platform Maintenance Notice', message: 'Scheduled maintenance window: Dec 15, 2AM-4AM WAT. Some features may be temporarily unavailable during this period.', target: 'All Sellers', status: 'Scheduled', date: '2024-12-15' },
  { id: 'ANN-005', title: 'December Flash Sale Guidelines', message: 'Prepare your inventory for the upcoming flash sale event. Review the participation rules, discount requirements, and marketing materials.', target: 'All Sellers', status: 'Draft', date: '2024-12-10' },
];

const campaigns: Campaign[] = [
  { id: 'CMP-001', title: 'Abandoned Cart Recovery', type: 'Email', recipients: 8920, status: 'Sent', date: '2024-12-07' },
  { id: 'CMP-002', title: 'Flash Sale Reminder', type: 'Push', recipients: 45200, status: 'Sent', date: '2024-12-06' },
  { id: 'CMP-003', title: 'Order Delivery Update', type: 'SMS', recipients: 12400, status: 'Scheduled', date: '2024-12-08' },
];

const targetColors: Record<string, string> = {
  'All Sellers': 'bg-blue-500/10 text-blue-400',
  'All Customers': 'bg-emerald-500/10 text-emerald-400',
  'New Users': 'bg-violet-500/10 text-violet-400',
};

const statusColors: Record<string, string> = {
  Active: 'bg-emerald-500/10 text-emerald-400',
  Draft: 'bg-gray-500/10 text-gray-400',
  Scheduled: 'bg-blue-500/10 text-blue-400',
  Sent: 'bg-emerald-500/10 text-emerald-400',
};

const typeColors: Record<string, string> = {
  SMS: 'bg-amber-500/10 text-amber-400',
  Email: 'bg-blue-500/10 text-blue-400',
  Push: 'bg-violet-500/10 text-violet-400',
};

const typeIcons: Record<string, typeof Bell> = {
  SMS: Smartphone,
  Email: Mail,
  Push: Bell,
};

export default function NotificationCenter() {
  const [activeTab, setActiveTab] = useState<Tab>('announcements');

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-white text-2xl font-semibold">Notification Center</h1>
          <p className="text-nm-muted text-sm mt-1">Announcements, campaigns, and communication management</p>
        </div>
        {activeTab === 'announcements' ? (
          <button className="flex items-center gap-2 bg-[#AFE607] text-black font-medium rounded-xl px-4 py-2 text-sm hover:bg-[#9ed006] transition-colors">
            <Plus size={16} />
            Create Announcement
          </button>
        ) : (
          <button className="flex items-center gap-2 bg-[#AFE607] text-black font-medium rounded-xl px-4 py-2 text-sm hover:bg-[#9ed006] transition-colors">
            <Plus size={16} />
            New Campaign
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1">
        <button
          onClick={() => setActiveTab('announcements')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            activeTab === 'announcements'
              ? 'bg-[#AFE607] text-black'
              : 'text-nm-muted hover:text-white hover:bg-nm-card-hover'
          }`}
        >
          <Megaphone size={14} />
          Announcements
        </button>
        <button
          onClick={() => setActiveTab('campaigns')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            activeTab === 'campaigns'
              ? 'bg-[#AFE607] text-black'
              : 'text-nm-muted hover:text-white hover:bg-nm-card-hover'
          }`}
        >
          <Mail size={14} />
          Campaigns
        </button>
      </div>

      {/* Announcements Tab */}
      {activeTab === 'announcements' && (
        <div className="space-y-3">
          {announcements.map((ann) => (
            <div
              key={ann.id}
              className="bg-nm-card rounded-2xl border border-nm-border p-5 hover:border-nm-border-light transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <h3 className="text-white font-semibold">{ann.title}</h3>
                    <span className={`rounded-lg px-2.5 py-1 text-xs font-medium ${statusColors[ann.status]}`}>
                      {ann.status}
                    </span>
                    <span className={`rounded-lg px-2.5 py-1 text-xs font-medium ${targetColors[ann.target]}`}>
                      {ann.target}
                    </span>
                  </div>
                  <p className="text-nm-text-dim text-sm line-clamp-2">{ann.message}</p>
                  <div className="flex items-center gap-1.5 mt-3 text-xs text-nm-muted">
                    <Clock size={12} />
                    {new Date(ann.date).toLocaleDateString('en-NG', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button className="text-nm-text-dim hover:text-white hover:bg-nm-card-hover rounded-lg px-3 py-2 text-sm transition-colors">
                    <Pencil size={14} />
                  </button>
                  <button className="text-nm-text-dim hover:text-red-400 hover:bg-red-500/10 rounded-lg px-3 py-2 text-sm transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Campaigns Tab */}
      {activeTab === 'campaigns' && (
        <div className="space-y-3">
          {campaigns.map((c) => {
            const TypeIcon = typeIcons[c.type];
            return (
              <div
                key={c.id}
                className="bg-nm-card rounded-2xl border border-nm-border p-5 hover:border-nm-border-light transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${typeColors[c.type]}`}>
                      <TypeIcon size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="text-white font-semibold">{c.title}</h3>
                        <span className={`rounded-lg px-2.5 py-1 text-xs font-medium ${typeColors[c.type]}`}>
                          {c.type}
                        </span>
                        <span className={`rounded-lg px-2.5 py-1 text-xs font-medium ${statusColors[c.status]}`}>
                          {c.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-xs text-nm-text-dim">
                        <span>{c.recipients.toLocaleString()} recipients</span>
                        <span className="text-nm-muted">{new Date(c.date).toLocaleDateString('en-NG', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button className="text-nm-text-dim hover:text-white hover:bg-nm-card-hover rounded-lg px-3 py-2 text-sm transition-colors">
                      <Pencil size={14} />
                    </button>
                    <button className="text-nm-text-dim hover:text-red-400 hover:bg-red-500/10 rounded-lg px-3 py-2 text-sm transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}