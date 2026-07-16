'use client';

import { useState } from 'react';
import { Search, Send, ArrowLeft, Phone, ShoppingBag, ImageIcon } from 'lucide-react';

// ─── Mock Data ────────────────────────────────────────────────────
interface Conversation {
  id: string;
  customer: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  orderRef: string;
  online: boolean;
}

interface Message {
  id: string;
  text: string;
  sent: boolean;
  time: string;
}

const conversations: Conversation[] = [
  { id: '1', customer: 'Chidi Okonkwo', avatar: 'CO', lastMessage: 'When will my order arrive?', time: '2 min ago', unread: 2, orderRef: 'NM-28456', online: true },
  { id: '2', customer: 'Amina Bello', avatar: 'AB', lastMessage: 'Thanks for the tracking number!', time: '15 min ago', unread: 0, orderRef: 'NM-28455', online: true },
  { id: '3', customer: 'Emeka Nwosu', avatar: 'EN', lastMessage: 'Can I change the delivery address?', time: '1 hr ago', unread: 1, orderRef: 'NM-28454', online: false },
  { id: '4', customer: 'Fatima Yusuf', avatar: 'FY', lastMessage: 'Is the MacBook in stock?', time: '3 hrs ago', unread: 0, orderRef: 'NM-28453', online: false },
  { id: '5', customer: 'Tobi Adeyemi', avatar: 'TA', lastMessage: 'Received my order. Great quality!', time: '5 hrs ago', unread: 0, orderRef: 'NM-28452', online: true },
  { id: '6', customer: 'Chioma Eze', avatar: 'CE', lastMessage: 'Do you offer warranty?', time: 'Yesterday', unread: 0, orderRef: 'NM-28451', online: false },
];

const messagesData: Record<string, Message[]> = {
  '1': [
    { id: 'm1', text: 'Hello, I placed an order for the iPhone 14 Pro Max yesterday.', sent: false, time: '10:30 AM' },
    { id: 'm2', text: 'Hi Chidi! Yes, we received your order NM-28456. It\'s currently being processed.', sent: true, time: '10:32 AM' },
    { id: 'm3', text: 'That\'s great! When will it be shipped?', sent: false, time: '10:33 AM' },
    { id: 'm4', text: 'It should ship by tomorrow. We\'ll send you the tracking number once it\'s dispatched.', sent: true, time: '10:35 AM' },
    { id: 'm5', text: 'When will my order arrive?', sent: false, time: '10:40 AM' },
  ],
  '2': [
    { id: 'm1', text: 'Hi, my order NM-28455 has been shipped. Can I get the tracking number?', sent: false, time: '9:00 AM' },
    { id: 'm2', text: 'Of course! Your tracking number is GIG-2025-78945. You can track it on the GIG Logistics website.', sent: true, time: '9:05 AM' },
    { id: 'm3', text: 'Thanks for the tracking number!', sent: false, time: '9:06 AM' },
  ],
  '3': [
    { id: 'm1', text: 'Good morning. I need to change my delivery address for order NM-28454.', sent: false, time: '8:00 AM' },
    { id: 'm2', text: 'Good morning Emeka! Unfortunately, once an order is in processing, we can\'t change the address directly. However, you can contact the courier once you receive the tracking number.', sent: true, time: '8:15 AM' },
    { id: 'm3', text: 'Can I change the delivery address?', sent: false, time: '8:20 AM' },
  ],
  '4': [
    { id: 'm1', text: 'Hi, I want to order a MacBook Air M2 but I want to confirm stock availability first.', sent: false, time: 'Yesterday' },
    { id: 'm2', text: 'Hello Fatima! Yes, we currently have 8 units in stock. Would you like to place an order?', sent: true, time: 'Yesterday' },
    { id: 'm3', text: 'Is the MacBook in stock?', sent: false, time: 'Yesterday' },
  ],
  '5': [
    { id: 'm1', text: 'I just received my order and I\'m very impressed with the quality!', sent: false, time: 'Yesterday' },
    { id: 'm2', text: 'That\'s wonderful to hear, Tobi! We\'re glad you love it. Don\'t forget to leave us a review!', sent: true, time: 'Yesterday' },
    { id: 'm3', text: 'Received my order. Great quality!', sent: false, time: 'Yesterday' },
  ],
  '6': [
    { id: 'm1', text: 'Do you offer warranty on the Apple Watch Series 9?', sent: false, time: '2 days ago' },
    { id: 'm2', text: 'Yes, all our Apple products come with a 1-year official Apple warranty. We also offer an extended 2-year warranty for an additional fee.', sent: true, time: '2 days ago' },
  ],
};

export default function SellerMessages() {
  const [selectedConv, setSelectedConv] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [search, setSearch] = useState('');
  const [showMessages, setShowMessages] = useState(false);

  const filteredConv = conversations.filter((c) =>
    c.customer.toLowerCase().includes(search.toLowerCase())
  );

  const activeConv = conversations.find((c) => c.id === selectedConv);
  const activeMessages = selectedConv ? messagesData[selectedConv] || [] : [];

  const handleSend = () => {
    if (!messageText.trim()) return;
    setMessageText('');
  };

  return (
    <div className="animate-fade-in h-[calc(100vh-12rem)]">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-white">Messages</h1>
        <p className="text-sm text-nm-muted mt-1">Chat with your customers</p>
      </div>

      <div className="bg-nm-card rounded-2xl border border-nm-border overflow-hidden flex h-[calc(100%-4.5rem)]">
        {/* Conversation List */}
        <div
          className={`w-full md:w-80 border-r border-nm-border flex flex-col shrink-0 ${
            showMessages && selectedConv ? 'hidden md:flex' : 'flex'
          }`}
        >
          {/* Search */}
          <div className="p-4 border-b border-nm-border">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-nm-muted" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-nm-input border border-nm-border rounded-xl pl-9 pr-3 py-2 text-sm text-white placeholder:text-nm-muted focus:outline-none focus:border-[#AFE607]/40"
              />
            </div>
          </div>

          {/* Conversation Items */}
          <div className="flex-1 overflow-y-auto">
            {filteredConv.map((conv) => (
              <button
                key={conv.id}
                onClick={() => {
                  setSelectedConv(conv.id);
                  setShowMessages(true);
                }}
                className={`w-full text-left px-4 py-3 border-b border-nm-border/50 hover:bg-nm-card-hover transition-colors ${
                  selectedConv === conv.id ? 'bg-nm-card-hover' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative shrink-0">
                    <div className="w-10 h-10 rounded-full bg-[#AFE607]/15 text-[#AFE607] flex items-center justify-center text-sm font-bold">
                      {conv.avatar}
                    </div>
                    {conv.online && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-nm-card" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white">{conv.customer}</span>
                      <span className="text-xs text-nm-muted shrink-0 ml-2">{conv.time}</span>
                    </div>
                    <div className="flex items-center justify-between mt-0.5">
                      <p className="text-xs text-nm-text-dim truncate pr-2">{conv.lastMessage}</p>
                      {conv.unread > 0 && (
                        <span className="shrink-0 w-5 h-5 rounded-full bg-[#AFE607] text-black text-[10px] font-bold flex items-center justify-center">
                          {conv.unread}
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-nm-muted mt-0.5">{conv.orderRef}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Message View */}
        <div
          className={`flex-1 flex flex-col ${
            showMessages && selectedConv ? 'flex' : 'hidden md:flex'
          }`}
        >
          {selectedConv && activeConv ? (
            <>
              {/* Chat Header */}
              <div className="px-5 py-3 border-b border-nm-border flex items-center gap-3">
                <button
                  onClick={() => setShowMessages(false)}
                  className="md:hidden text-nm-text-dim hover:text-white transition-colors"
                >
                  <ArrowLeft size={18} />
                </button>
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-[#AFE607]/15 text-[#AFE607] flex items-center justify-center text-sm font-bold">
                    {activeConv.avatar}
                  </div>
                  {activeConv.online && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-nm-card" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{activeConv.customer}</p>
                  <p className="text-xs text-nm-muted flex items-center gap-1">
                    <ShoppingBag size={10} />
                    {activeConv.orderRef}
                  </p>
                </div>
                <button className="text-nm-text-dim hover:text-white hover:bg-nm-card-hover rounded-lg p-2 transition-colors">
                  <Phone size={16} />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {activeMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sent ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                        msg.sent
                          ? 'bg-[#AFE607] text-black rounded-br-md'
                          : 'bg-nm-card-hover text-nm-text rounded-bl-md'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p className={`text-[10px] mt-1 ${msg.sent ? 'text-black/50' : 'text-nm-muted'}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-nm-border">
                <div className="flex gap-3">
                  <textarea
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder="Type a message..."
                    rows={1}
                    className="flex-1 bg-nm-input border border-nm-border rounded-xl px-3 py-2 text-sm text-white placeholder:text-nm-muted focus:outline-none focus:border-[#AFE607]/40 resize-none"
                  />
                  <button
                    onClick={handleSend}
                    className="bg-[#AFE607] text-black rounded-xl px-4 py-2 hover:bg-[#9dd006] transition-colors flex items-center gap-2 shrink-0"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-nm-card-hover flex items-center justify-center mx-auto mb-4">
                  <ImageIcon size={24} className="text-nm-muted" />
                </div>
                <p className="text-nm-muted text-sm">Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}