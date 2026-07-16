'use client';

import { useState } from 'react';
import {
  User,
  Shield,
  Bell,
  Landmark,
  FileText,
  Building,
  AlertTriangle,
  Save,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
} from 'lucide-react';

export default function SellerSettings() {
  // Account
  const [email, setEmail] = useState('admin@techzone.com.ng');
  const [phone, setPhone] = useState('+234 801 234 5678');

  // Security
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [twoFA, setTwoFA] = useState(false);

  // Notifications
  const [notifications, setNotifications] = useState({
    orders: true,
    messages: true,
    marketing: false,
    reviews: true,
    payments: true,
  });

  // Bank
  const [bankName, setBankName] = useState('Guaranty Trust Bank');
  const [accountNumber, setAccountNumber] = useState('0123456789');
  const [accountName, setAccountName] = useState('TechZone Nigeria Ltd');

  // Tax
  const [tin, setTin] = useState('12345678-0001');
  const [vatRegistered, setVatRegistered] = useState(true);

  // Business
  const [rcNumber, setRcNumber] = useState('1234567');
  const [businessType, setBusinessType] = useState('Limited Liability Company');
  const [businessAddress, setBusinessAddress] = useState('15 Computer Village, Ikeja, Lagos');

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-sm text-nm-muted mt-1">Manage your account and store settings</p>
      </div>

      {/* Account Settings */}
      <div className="bg-nm-card rounded-2xl border border-nm-border p-5 space-y-4">
        <h2 className="text-base font-semibold text-white flex items-center gap-2">
          <User size={18} className="text-[#AFE607]" />
          Account
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-nm-muted mb-1.5 block">Email Address</label>
            <div className="relative">
              <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-nm-muted" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-nm-input border border-nm-border rounded-xl pl-8 pr-3 py-2 text-sm text-white placeholder:text-nm-muted focus:outline-none focus:border-[#AFE607]/40"
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-nm-muted mb-1.5 block">Phone Number</label>
            <div className="relative">
              <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-nm-muted" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-nm-input border border-nm-border rounded-xl pl-8 pr-3 py-2 text-sm text-white placeholder:text-nm-muted focus:outline-none focus:border-[#AFE607]/40"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="bg-nm-card rounded-2xl border border-nm-border p-5 space-y-4">
        <h2 className="text-base font-semibold text-white flex items-center gap-2">
          <Shield size={18} className="text-[#AFE607]" />
          Security
        </h2>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-nm-muted mb-1.5 block">Current Password</label>
            <div className="relative">
              <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-nm-muted" />
              <input
                type={showCurrent ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="w-full bg-nm-input border border-nm-border rounded-xl pl-8 pr-10 py-2 text-sm text-white placeholder:text-nm-muted focus:outline-none focus:border-[#AFE607]/40"
              />
              <button
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-nm-muted hover:text-white transition-colors"
              >
                {showCurrent ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-nm-muted mb-1.5 block">New Password</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-nm-muted" />
                <input
                  type={showNew ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full bg-nm-input border border-nm-border rounded-xl pl-8 pr-10 py-2 text-sm text-white placeholder:text-nm-muted focus:outline-none focus:border-[#AFE607]/40"
                />
                <button
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-nm-muted hover:text-white transition-colors"
                >
                  {showNew ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>
            <div>
              <label className="text-xs text-nm-muted mb-1.5 block">Confirm New Password</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-nm-muted" />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full bg-nm-input border border-nm-border rounded-xl pl-8 pr-10 py-2 text-sm text-white placeholder:text-nm-muted focus:outline-none focus:border-[#AFE607]/40"
                />
                <button
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-nm-muted hover:text-white transition-colors"
                >
                  {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>
          </div>
          <button className="text-nm-text-dim hover:text-white hover:bg-nm-card-hover rounded-xl px-4 py-2 text-sm border border-nm-border transition-colors">
            Update Password
          </button>
        </div>

        {/* 2FA Toggle */}
        <div className="flex items-center justify-between pt-3 border-t border-nm-border">
          <div>
            <p className="text-sm font-medium text-white">Two-Factor Authentication</p>
            <p className="text-xs text-nm-muted mt-0.5">Add an extra layer of security to your account</p>
          </div>
          <button
            onClick={() => setTwoFA(!twoFA)}
            className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
              twoFA ? 'bg-[#AFE607]' : 'bg-nm-input border border-nm-border'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
                twoFA ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-nm-card rounded-2xl border border-nm-border p-5 space-y-4">
        <h2 className="text-base font-semibold text-white flex items-center gap-2">
          <Bell size={18} className="text-[#AFE607]" />
          Notification Preferences
        </h2>
        <div className="space-y-4">
          {[
            { key: 'orders' as const, label: 'Order Updates', desc: 'Get notified when orders are placed, shipped, or delivered' },
            { key: 'messages' as const, label: 'Messages', desc: 'Receive notifications for new customer messages' },
            { key: 'marketing' as const, label: 'Marketing & Promotions', desc: 'Updates about marketing campaigns and promotions' },
            { key: 'reviews' as const, label: 'Reviews', desc: 'Get notified when customers leave reviews' },
            { key: 'payments' as const, label: 'Payments & Payouts', desc: 'Notifications about payouts, commissions, and earnings' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">{item.label}</p>
                <p className="text-xs text-nm-muted mt-0.5">{item.desc}</p>
              </div>
              <button
                onClick={() => setNotifications((prev) => ({ ...prev, [item.key]: !prev[item.key] }))}
                className={`relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0 ml-4 ${
                  notifications[item.key] ? 'bg-[#AFE607]' : 'bg-nm-input border border-nm-border'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
                    notifications[item.key] ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Bank Account */}
      <div className="bg-nm-card rounded-2xl border border-nm-border p-5 space-y-4">
        <h2 className="text-base font-semibold text-white flex items-center gap-2">
          <Landmark size={18} className="text-[#AFE607]" />
          Bank Account
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="text-xs text-nm-muted mb-1.5 block">Bank Name</label>
            <input
              type="text"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="w-full bg-nm-input border border-nm-border rounded-xl px-3 py-2 text-sm text-white placeholder:text-nm-muted focus:outline-none focus:border-[#AFE607]/40"
            />
          </div>
          <div>
            <label className="text-xs text-nm-muted mb-1.5 block">Account Number</label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="w-full bg-nm-input border border-nm-border rounded-xl px-3 py-2 text-sm text-white placeholder:text-nm-muted focus:outline-none focus:border-[#AFE607]/40"
            />
          </div>
          <div>
            <label className="text-xs text-nm-muted mb-1.5 block">Account Name</label>
            <input
              type="text"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              className="w-full bg-nm-input border border-nm-border rounded-xl px-3 py-2 text-sm text-white placeholder:text-nm-muted focus:outline-none focus:border-[#AFE607]/40"
            />
          </div>
        </div>
        <button className="bg-[#AFE607] text-black font-medium rounded-xl px-4 py-2 text-sm flex items-center gap-2 hover:bg-[#9dd006] transition-colors">
          <Save size={16} />
          Save Bank Details
        </button>
      </div>

      {/* Tax Information */}
      <div className="bg-nm-card rounded-2xl border border-nm-border p-5 space-y-4">
        <h2 className="text-base font-semibold text-white flex items-center gap-2">
          <FileText size={18} className="text-[#AFE607]" />
          Tax Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-nm-muted mb-1.5 block">Tax Identification Number (TIN)</label>
            <input
              type="text"
              value={tin}
              onChange={(e) => setTin(e.target.value)}
              className="w-full bg-nm-input border border-nm-border rounded-xl px-3 py-2 text-sm text-white placeholder:text-nm-muted focus:outline-none focus:border-[#AFE607]/40"
            />
          </div>
          <div className="flex items-end pb-1">
            <div className="flex items-center justify-between w-full">
              <div>
                <p className="text-sm font-medium text-white">VAT Registration</p>
                <p className="text-xs text-nm-muted mt-0.5">Registered for Value Added Tax</p>
              </div>
              <button
                onClick={() => setVatRegistered(!vatRegistered)}
                className={`relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0 ${
                  vatRegistered ? 'bg-[#AFE607]' : 'bg-nm-input border border-nm-border'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
                    vatRegistered ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Business Info */}
      <div className="bg-nm-card rounded-2xl border border-nm-border p-5 space-y-4">
        <h2 className="text-base font-semibold text-white flex items-center gap-2">
          <Building size={18} className="text-[#AFE607]" />
          Business Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-nm-muted mb-1.5 block">RC Number</label>
            <input
              type="text"
              value={rcNumber}
              onChange={(e) => setRcNumber(e.target.value)}
              className="w-full bg-nm-input border border-nm-border rounded-xl px-3 py-2 text-sm text-white placeholder:text-nm-muted focus:outline-none focus:border-[#AFE607]/40"
            />
          </div>
          <div>
            <label className="text-xs text-nm-muted mb-1.5 block">Business Type</label>
            <input
              type="text"
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              className="w-full bg-nm-input border border-nm-border rounded-xl px-3 py-2 text-sm text-white placeholder:text-nm-muted focus:outline-none focus:border-[#AFE607]/40"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs text-nm-muted mb-1.5 block">Business Address</label>
            <textarea
              value={businessAddress}
              onChange={(e) => setBusinessAddress(e.target.value)}
              rows={2}
              className="w-full bg-nm-input border border-nm-border rounded-xl px-3 py-2 text-sm text-white placeholder:text-nm-muted focus:outline-none focus:border-[#AFE607]/40 resize-none"
            />
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-nm-card rounded-2xl border border-red-500/20 p-5 space-y-4">
        <h2 className="text-base font-semibold text-red-400 flex items-center gap-2">
          <AlertTriangle size={18} />
          Danger Zone
        </h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-white">Deactivate Store</p>
            <p className="text-xs text-nm-muted mt-0.5">This will temporarily hide your store and all products from customers</p>
          </div>
          <button className="text-red-400 hover:bg-red-500/10 rounded-xl px-4 py-2 text-sm border border-red-500/20 font-medium transition-colors">
            Deactivate Store
          </button>
        </div>
      </div>
    </div>
  );
}