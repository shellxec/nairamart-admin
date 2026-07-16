'use client';

import { useState } from 'react';
import {
  Pencil,
  Trash2,
  Plus,
  ImageIcon,
  FileText,
  HelpCircle,
  ScrollText,
} from 'lucide-react';

type Tab = 'banners' | 'pages' | 'faqs' | 'policies';

interface Banner {
  id: string;
  title: string;
  position: string;
  status: 'Active' | 'Inactive';
  gradient: string;
}

interface Page {
  id: string;
  title: string;
  slug: string;
  lastUpdated: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface Policy {
  id: string;
  title: string;
  version: string;
  lastUpdated: string;
}

const banners: Banner[] = [
  { id: 'BN-001', title: 'December Mega Sale', position: 'Homepage', status: 'Active', gradient: 'from-[#AFE607]/40 to-emerald-600/30' },
  { id: 'BN-002', title: 'Electronics Deals', position: 'Category', status: 'Active', gradient: 'from-blue-500/40 to-violet-600/30' },
  { id: 'BN-003', title: 'New Arrivals - Fashion', position: 'Homepage', status: 'Inactive', gradient: 'from-pink-500/40 to-rose-600/30' },
  { id: 'BN-004', title: 'Flash Sale Countdown', position: 'Product', status: 'Active', gradient: 'from-amber-500/40 to-orange-600/30' },
];

const pages: Page[] = [
  { id: 'PG-001', title: 'About Us', slug: '/about', lastUpdated: '2024-11-15' },
  { id: 'PG-002', title: 'Contact', slug: '/contact', lastUpdated: '2024-12-01' },
  { id: 'PG-003', title: 'Terms of Service', slug: '/terms', lastUpdated: '2024-11-20' },
  { id: 'PG-004', title: 'Privacy Policy', slug: '/privacy', lastUpdated: '2024-11-20' },
  { id: 'PG-005', title: 'Return Policy', slug: '/returns', lastUpdated: '2024-12-05' },
];

const faqs: FAQ[] = [
  { id: 'FAQ-001', question: 'How do I become a seller on Nairamart?', answer: 'To become a seller, click on "Become a Seller" in the footer, fill out the application form with your business details, upload required documents (ID, business registration, bank details), and submit for review. Approval typically takes 24-48 hours.' },
  { id: 'FAQ-002', question: 'What is the return policy?', answer: 'We offer a 14-day return window for most product categories. Items must be in their original condition with all packaging intact. Some categories like perishable goods and personalized items have specific return conditions.' },
  { id: 'FAQ-003', question: 'How does buyer protection work?', answer: 'All purchases on Nairamart are covered by our Buyer Protection program. If an item doesn\'t match the description, arrives damaged, or isn\'t delivered, you can request a full refund. Funds are held in escrow until you confirm receipt.' },
  { id: 'FAQ-004', question: 'What payment methods are accepted?', answer: 'We accept Paystack, Flutterwave, bank transfers, and USSD payments. All major debit cards (Visa, Mastercard, Verve) are supported. Wallet balance and coupons can also be applied at checkout.' },
  { id: 'FAQ-005', question: 'How are shipping costs calculated?', answer: 'Shipping costs depend on the delivery zone, package weight, and selected courier. Rates start from ₦1,500 for Lagos deliveries. Free shipping is available on orders above ₦10,000 during promotional periods.' },
];

const policies: Policy[] = [
  { id: 'POL-001', title: 'Seller Code of Conduct', version: 'v2.3', lastUpdated: '2024-11-20' },
  { id: 'POL-002', title: 'Prohibited Items Policy', version: 'v1.8', lastUpdated: '2024-10-15' },
  { id: 'POL-003', title: 'Data Protection Policy', version: 'v3.1', lastUpdated: '2024-12-01' },
];

const tabs: { key: Tab; label: string; icon: typeof ImageIcon }[] = [
  { key: 'banners', label: 'Banners', icon: ImageIcon },
  { key: 'pages', label: 'Pages', icon: FileText },
  { key: 'faqs', label: 'FAQs', icon: HelpCircle },
  { key: 'policies', label: 'Policies', icon: ScrollText },
];

export default function CMSManagement() {
  const [activeTab, setActiveTab] = useState<Tab>('banners');

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-white text-2xl font-semibold">CMS Management</h1>
          <p className="text-nm-muted text-sm mt-1">Manage banners, pages, FAQs, and policies</p>
        </div>
        <button className="flex items-center gap-2 bg-[#AFE607] text-black font-medium rounded-xl px-4 py-2 text-sm hover:bg-[#9ed006] transition-colors">
          <Plus size={16} />
          {activeTab === 'banners' ? 'Add Banner' : activeTab === 'pages' ? 'Add Page' : activeTab === 'faqs' ? 'Add FAQ' : 'Add Policy'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto hide-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.key
                ? 'bg-[#AFE607] text-black'
                : 'text-nm-muted hover:text-white hover:bg-nm-card-hover'
            }`}
          >
            <tab.icon size={14} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Banners Tab */}
      {activeTab === 'banners' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {banners.map((b) => (
            <div
              key={b.id}
              className="bg-nm-card rounded-2xl border border-nm-border overflow-hidden hover:border-nm-border-light transition-colors"
            >
              {/* Gradient Banner Preview */}
              <div className={`h-36 bg-gradient-to-br ${b.gradient} flex items-center justify-center`}>
                <ImageIcon size={32} className="text-white/40" />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">{b.title}</h3>
                    <p className="text-nm-muted text-xs mt-0.5">{b.position}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`rounded-lg px-2.5 py-1 text-xs font-medium ${
                      b.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-gray-500/10 text-gray-400'
                    }`}>
                      {b.status}
                    </span>
                    <button className="text-nm-text-dim hover:text-white hover:bg-nm-card-hover rounded-lg p-1.5 transition-colors">
                      <Pencil size={14} />
                    </button>
                    <button className="text-nm-text-dim hover:text-red-400 hover:bg-red-500/10 rounded-lg p-1.5 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pages Tab */}
      {activeTab === 'pages' && (
        <div className="bg-nm-card rounded-2xl border border-nm-border p-5">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-nm-border text-left">
                  <th className="pb-3 text-nm-muted font-medium">Page Title</th>
                  <th className="pb-3 text-nm-muted font-medium hidden sm:table-cell">URL</th>
                  <th className="pb-3 text-nm-muted font-medium hidden md:table-cell">Last Updated</th>
                  <th className="pb-3 text-nm-muted font-medium w-24">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pages.map((pg) => (
                  <tr key={pg.id} className="border-b border-nm-border hover:bg-nm-card-hover transition-colors">
                    <td className="py-3.5 text-white font-medium">{pg.title}</td>
                    <td className="py-3.5 text-nm-text-dim font-mono text-xs hidden sm:table-cell">{pg.slug}</td>
                    <td className="py-3.5 text-nm-text-dim hidden md:table-cell">
                      {new Date(pg.lastUpdated).toLocaleDateString('en-NG', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="py-3.5">
                      <button className="text-nm-text-dim hover:text-white hover:bg-nm-card-hover rounded-lg px-3 py-2 text-sm transition-colors">
                        <Pencil size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* FAQs Tab */}
      {activeTab === 'faqs' && (
        <div className="bg-nm-card rounded-2xl border border-nm-border p-5 space-y-2">
          {faqs.map((faq) => (
            <details key={faq.id} className="group">
              <summary className="flex items-center justify-between cursor-pointer py-3 text-left text-white font-medium hover:text-[#AFE607] transition-colors list-none">
                {faq.question}
                <span className="text-nm-muted group-open:rotate-180 transition-transform shrink-0 ml-4">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </summary>
              <p className="text-nm-text-dim text-sm leading-relaxed pb-3 pl-0">{faq.answer}</p>
            </details>
          ))}
        </div>
      )}

      {/* Policies Tab */}
      {activeTab === 'policies' && (
        <div className="bg-nm-card rounded-2xl border border-nm-border p-5">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-nm-border text-left">
                  <th className="pb-3 text-nm-muted font-medium">Policy Title</th>
                  <th className="pb-3 text-nm-muted font-medium hidden sm:table-cell">Version</th>
                  <th className="pb-3 text-nm-muted font-medium hidden md:table-cell">Last Updated</th>
                  <th className="pb-3 text-nm-muted font-medium w-24">Actions</th>
                </tr>
              </thead>
              <tbody>
                {policies.map((pol) => (
                  <tr key={pol.id} className="border-b border-nm-border hover:bg-nm-card-hover transition-colors">
                    <td className="py-3.5 text-white font-medium">{pol.title}</td>
                    <td className="py-3.5 text-nm-text-dim hidden sm:table-cell">
                      <span className="bg-nm-card-hover rounded-lg px-2 py-0.5 text-xs">{pol.version}</span>
                    </td>
                    <td className="py-3.5 text-nm-text-dim hidden md:table-cell">
                      {new Date(pol.lastUpdated).toLocaleDateString('en-NG', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="py-3.5">
                      <button className="text-nm-text-dim hover:text-white hover:bg-nm-card-hover rounded-lg px-3 py-2 text-sm transition-colors">
                        <Pencil size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}