'use client';

import { useState } from 'react';
import {
  Camera,
  CheckCircle,
  Shield,
  FileText,
  Save,
  Store,
  MapPin,
  FileSignature,
  Globe,
} from 'lucide-react';

export default function SellerStoreProfile() {
  const [storeName, setStoreName] = useState('TechZone Nigeria');
  const [description, setDescription] = useState('Your one-stop shop for premium electronics and gadgets. We offer the latest smartphones, laptops, audio equipment, and accessories at competitive prices with fast nationwide delivery.');
  const [businessHours, setBusinessHours] = useState('Mon - Sat: 8:00 AM - 8:00 PM');
  const [category, setCategory] = useState('Electronics');
  const [street, setStreet] = useState('15 Computer Village, Ikeja');
  const [city, setCity] = useState('Lagos');
  const [state, setState] = useState('Lagos');
  const [lga, setLga] = useState('Ikeja');
  const [returnPolicy, setReturnPolicy] = useState('We accept returns within 7 days of delivery for defective items. Products must be in original packaging with all accessories. Refunds are processed within 3-5 business days after receiving the returned item.');
  const [shippingPolicy, setShippingPolicy] = useState('Free shipping on orders above ₦50,000. Standard delivery (3-5 business days) costs ₦2,000. Express delivery (1-2 business days) costs ₦5,000. We ship nationwide via GIG Logistics and DHL.');
  const [instagram, setInstagram] = useState('@techzone_ng');
  const [twitter, setTwitter] = useState('@techzone_ng');
  const [facebook, setFacebook] = useState('TechZone Nigeria');
  const [website, setWebsite] = useState('https://techzone.com.ng');

  const categories = ['Electronics', 'Fashion', 'Home & Kitchen', 'Health & Beauty', 'Sports', 'Books', 'Automotive', 'Others'];

  const kycDocuments = [
    { name: 'BVN Verification', status: 'Verified', date: 'Dec 15, 2024' },
    { name: 'CAC Registration', status: 'Verified', date: 'Dec 15, 2024' },
    { name: 'Tax Identification', status: 'Verified', date: 'Dec 18, 2024' },
    { name: 'Utility Bill', status: 'Verified', date: 'Dec 20, 2024' },
  ];

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Store Profile</h1>
          <p className="text-sm text-nm-muted mt-1">Manage your store information and settings</p>
        </div>
        <button className="bg-[#AFE607] text-black font-medium rounded-xl px-4 py-2 text-sm flex items-center gap-2 hover:bg-[#9dd006] transition-colors">
          <Save size={16} />
          Save Changes
        </button>
      </div>

      {/* Store Info */}
      <div className="bg-nm-card rounded-2xl border border-nm-border p-5 space-y-5">
        <h2 className="text-base font-semibold text-white flex items-center gap-2">
          <Store size={18} className="text-[#AFE607]" />
          Store Information
        </h2>

        <div className="flex flex-col sm:flex-row items-start gap-6">
          {/* Logo Upload */}
          <div className="shrink-0">
            <div className="w-24 h-24 rounded-2xl bg-nm-input border border-nm-border flex flex-col items-center justify-center cursor-pointer hover:border-[#AFE607]/40 transition-colors group">
              <Camera size={20} className="text-nm-muted group-hover:text-[#AFE607] transition-colors" />
              <span className="text-[10px] text-nm-muted mt-1 group-hover:text-[#AFE607] transition-colors">Upload Logo</span>
            </div>
          </div>

          <div className="flex-1 space-y-4 w-full">
            <div>
              <label className="text-xs text-nm-muted mb-1.5 block">Store Name</label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full bg-nm-input border border-nm-border rounded-xl px-3 py-2 text-sm text-white placeholder:text-nm-muted focus:outline-none focus:border-[#AFE607]/40"
              />
            </div>
            <div>
              <label className="text-xs text-nm-muted mb-1.5 block">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full bg-nm-input border border-nm-border rounded-xl px-3 py-2 text-sm text-white placeholder:text-nm-muted focus:outline-none focus:border-[#AFE607]/40 resize-none"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-nm-muted mb-1.5 block">Business Hours</label>
            <input
              type="text"
              value={businessHours}
              onChange={(e) => setBusinessHours(e.target.value)}
              className="w-full bg-nm-input border border-nm-border rounded-xl px-3 py-2 text-sm text-white placeholder:text-nm-muted focus:outline-none focus:border-[#AFE607]/40"
            />
          </div>
          <div>
            <label className="text-xs text-nm-muted mb-1.5 block">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-nm-input border border-nm-border rounded-xl px-3 py-2 text-sm text-white appearance-none focus:outline-none focus:border-[#AFE607]/40"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="bg-nm-card rounded-2xl border border-nm-border p-5 space-y-4">
        <h2 className="text-base font-semibold text-white flex items-center gap-2">
          <MapPin size={18} className="text-[#AFE607]" />
          Address
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="text-xs text-nm-muted mb-1.5 block">Street Address</label>
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className="w-full bg-nm-input border border-nm-border rounded-xl px-3 py-2 text-sm text-white placeholder:text-nm-muted focus:outline-none focus:border-[#AFE607]/40"
            />
          </div>
          <div>
            <label className="text-xs text-nm-muted mb-1.5 block">City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full bg-nm-input border border-nm-border rounded-xl px-3 py-2 text-sm text-white placeholder:text-nm-muted focus:outline-none focus:border-[#AFE607]/40"
            />
          </div>
          <div>
            <label className="text-xs text-nm-muted mb-1.5 block">State</label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full bg-nm-input border border-nm-border rounded-xl px-3 py-2 text-sm text-white placeholder:text-nm-muted focus:outline-none focus:border-[#AFE607]/40"
            />
          </div>
          <div>
            <label className="text-xs text-nm-muted mb-1.5 block">LGA</label>
            <input
              type="text"
              value={lga}
              onChange={(e) => setLga(e.target.value)}
              className="w-full bg-nm-input border border-nm-border rounded-xl px-3 py-2 text-sm text-white placeholder:text-nm-muted focus:outline-none focus:border-[#AFE607]/40"
            />
          </div>
        </div>
      </div>

      {/* Policies */}
      <div className="bg-nm-card rounded-2xl border border-nm-border p-5 space-y-4">
        <h2 className="text-base font-semibold text-white flex items-center gap-2">
          <FileSignature size={18} className="text-[#AFE607]" />
          Policies
        </h2>
        <div>
          <label className="text-xs text-nm-muted mb-1.5 block">Return Policy</label>
          <textarea
            value={returnPolicy}
            onChange={(e) => setReturnPolicy(e.target.value)}
            rows={3}
            className="w-full bg-nm-input border border-nm-border rounded-xl px-3 py-2 text-sm text-white placeholder:text-nm-muted focus:outline-none focus:border-[#AFE607]/40 resize-none"
          />
        </div>
        <div>
          <label className="text-xs text-nm-muted mb-1.5 block">Shipping Policy</label>
          <textarea
            value={shippingPolicy}
            onChange={(e) => setShippingPolicy(e.target.value)}
            rows={3}
            className="w-full bg-nm-input border border-nm-border rounded-xl px-3 py-2 text-sm text-white placeholder:text-nm-muted focus:outline-none focus:border-[#AFE607]/40 resize-none"
          />
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-nm-card rounded-2xl border border-nm-border p-5 space-y-4">
        <h2 className="text-base font-semibold text-white flex items-center gap-2">
          <Globe size={18} className="text-[#AFE607]" />
          Social Links
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-nm-muted mb-1.5 block">Instagram</label>
            <input
              type="text"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              className="w-full bg-nm-input border border-nm-border rounded-xl px-3 py-2 text-sm text-white placeholder:text-nm-muted focus:outline-none focus:border-[#AFE607]/40"
            />
          </div>
          <div>
            <label className="text-xs text-nm-muted mb-1.5 block">Twitter / X</label>
            <input
              type="text"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
              className="w-full bg-nm-input border border-nm-border rounded-xl px-3 py-2 text-sm text-white placeholder:text-nm-muted focus:outline-none focus:border-[#AFE607]/40"
            />
          </div>
          <div>
            <label className="text-xs text-nm-muted mb-1.5 block">Facebook</label>
            <input
              type="text"
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
              className="w-full bg-nm-input border border-nm-border rounded-xl px-3 py-2 text-sm text-white placeholder:text-nm-muted focus:outline-none focus:border-[#AFE607]/40"
            />
          </div>
          <div>
            <label className="text-xs text-nm-muted mb-1.5 block">Website</label>
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="w-full bg-nm-input border border-nm-border rounded-xl px-3 py-2 text-sm text-white placeholder:text-nm-muted focus:outline-none focus:border-[#AFE607]/40"
            />
          </div>
        </div>
      </div>

      {/* Verification */}
      <div className="bg-nm-card rounded-2xl border border-nm-border p-5 space-y-4">
        <h2 className="text-base font-semibold text-white flex items-center gap-2">
          <Shield size={18} className="text-[#AFE607]" />
          Verification
        </h2>
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-emerald-500/10 text-emerald-400 rounded-lg px-3 py-1.5 text-sm font-medium flex items-center gap-2">
            <CheckCircle size={14} />
            Verified Seller
          </span>
          <span className="text-xs text-nm-muted">All verification documents approved</span>
        </div>
        <div className="space-y-3">
          {kycDocuments.map((doc) => (
            <div key={doc.name} className="flex items-center justify-between py-2 border-b border-nm-border/50 last:border-0">
              <div className="flex items-center gap-3">
                <FileText size={14} className="text-nm-muted" />
                <span className="text-sm text-white">{doc.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-nm-text-dim">{doc.date}</span>
                <span className="bg-emerald-500/10 text-emerald-400 rounded-lg px-2.5 py-1 text-xs font-medium">
                  {doc.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}