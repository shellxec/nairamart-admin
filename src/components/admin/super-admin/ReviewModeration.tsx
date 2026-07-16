'use client';

import { useState } from 'react';
import {
  Star,
  CheckCircle,
  Trash2,
  Flag,
} from 'lucide-react';

interface Review {
  id: string;
  product: string;
  reviewer: string;
  rating: number;
  comment: string;
  status: 'Pending' | 'Approved' | 'Removed';
  date: string;
  flags: string[];
}

const reviews: Review[] = [
  { id: 'REV-001', product: 'Samsung Galaxy S24 Ultra', reviewer: 'Patricia Ogunleye', rating: 5, comment: 'Absolutely love this phone! The camera quality is outstanding and battery life is incredible.', status: 'Approved', date: '2024-12-07', flags: [] },
  { id: 'REV-002', product: 'Nike Air Max 90', reviewer: 'Emeka Obi', rating: 4, comment: 'Great shoes, very comfortable. Sizing is a bit off - had to order half a size up.', status: 'Approved', date: '2024-12-07', flags: [] },
  { id: 'REV-003', product: 'HP Pavilion Laptop 15', reviewer: 'Aisha Mohammed', rating: 2, comment: 'Laptop keeps overheating after 30 minutes of use. Very disappointed with this purchase.', status: 'Pending', date: '2024-12-06', flags: ['inappropriate'] },
  { id: 'REV-004', product: 'JBL Flip 6 Speaker', reviewer: 'Samuel Adekunle', rating: 5, comment: 'Amazing sound quality for its size. Waterproof feature is a huge plus.', status: 'Approved', date: '2024-12-06', flags: [] },
  { id: 'REV-005', product: 'Tecno Camon 20 Pro', reviewer: 'Halima Bello', rating: 1, comment: 'This is FAKE! Not original Tecno. Screen is different from what was advertised.', status: 'Pending', date: '2024-12-06', flags: ['spam', 'fake-claim'] },
  { id: 'REV-006', product: 'Adidas Ultraboost 23', reviewer: 'Blessing Eze', rating: 4, comment: 'Super comfortable running shoes. The boost technology really makes a difference on long runs.', status: 'Approved', date: '2024-12-05', flags: [] },
  { id: 'REV-007', product: 'Sony WH-1000XM5', reviewer: 'Chukwuma Okafor', rating: 5, comment: 'Best noise cancelling headphones. Sound quality is phenomenal and the comfort is unmatched.', status: 'Approved', date: '2024-12-05', flags: [] },
  { id: 'REV-008', product: 'Samsung 55" Crystal UHD TV', reviewer: 'Fatima Musa', rating: 3, comment: 'Decent TV for the price. Picture quality is good but not great. Sound could be better.', status: 'Pending', date: '2024-12-05', flags: [] },
  { id: 'REV-009', product: 'Infinix Note 40 Pro', reviewer: 'Obinna Eze', rating: 5, comment: 'Best mid-range phone in the market right now. Wireless charging at this price is unbeatable!', status: 'Approved', date: '2024-12-04', flags: [] },
  { id: 'REV-010', product: 'Kitchen Stand Mixer 5.5L', reviewer: 'Chioma Nwosu', rating: 4, comment: 'Great mixer for home baking. Powerful motor handles dough easily. Only downside is it\'s quite heavy.', status: 'Pending', date: '2024-12-04', flags: [] },
];

const statusColors: Record<string, string> = {
  Approved: 'bg-emerald-500/10 text-emerald-400',
  Pending: 'bg-amber-500/10 text-amber-400',
  Removed: 'bg-gray-500/10 text-gray-400',
};

export default function ReviewModeration() {
  const [ratingFilter, setRatingFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = reviews.filter((r) => {
    const matchRating = ratingFilter === 'all' || r.rating === Number(ratingFilter);
    const matchStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchRating && matchStatus;
  });

  const renderStars = (rating: number) => (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={12}
          className={i <= rating ? 'fill-amber-400 text-amber-400' : 'text-nm-muted'}
        />
      ))}
    </div>
  );

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-white text-2xl font-semibold">Review Moderation</h1>
        <p className="text-nm-muted text-sm mt-1">Moderate product reviews and maintain quality</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Reviews', value: '12,450', color: 'text-white' },
          { label: 'Pending', value: '23', color: 'text-amber-400' },
          { label: 'Flagged', value: '8', color: 'text-red-400' },
          { label: 'Removed Today', value: '2', color: 'text-gray-400' },
        ].map((stat) => (
          <div key={stat.label} className="bg-nm-card rounded-2xl border border-nm-border p-5">
            <p className="text-nm-muted text-xs font-medium">{stat.label}</p>
            <p className={`text-2xl font-semibold mt-1 ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-nm-card rounded-2xl border border-nm-border p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="bg-nm-input border border-nm-border rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-nm-border-light"
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-nm-input border border-nm-border rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-nm-border-light"
          >
            <option value="all">All Status</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Removed">Removed</option>
          </select>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="bg-nm-card rounded-2xl border border-nm-border p-5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-nm-border text-left">
                <th className="pb-3 text-nm-muted font-medium">Product</th>
                <th className="pb-3 text-nm-muted font-medium hidden md:table-cell">Reviewer</th>
                <th className="pb-3 text-nm-muted font-medium">Rating</th>
                <th className="pb-3 text-nm-muted font-medium hidden lg:table-cell">Comment</th>
                <th className="pb-3 text-nm-muted font-medium">Status</th>
                <th className="pb-3 text-nm-muted font-medium hidden xl:table-cell">Date</th>
                <th className="pb-3 text-nm-muted font-medium hidden lg:table-cell">Flags</th>
                <th className="pb-3 text-nm-muted font-medium w-28">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-b border-nm-border hover:bg-nm-card-hover transition-colors">
                  <td className="py-3.5 pr-4 text-white font-medium max-w-[160px]">
                    <span className="line-clamp-1">{r.product}</span>
                  </td>
                  <td className="py-3.5 pr-4 text-nm-text-dim hidden md:table-cell">{r.reviewer}</td>
                  <td className="py-3.5 pr-4">{renderStars(r.rating)}</td>
                  <td className="py-3.5 pr-4 text-nm-text-dim max-w-[220px] hidden lg:table-cell">
                    <span className="line-clamp-1">{r.comment}</span>
                  </td>
                  <td className="py-3.5 pr-4">
                    <span className={`rounded-lg px-2.5 py-1 text-xs font-medium ${statusColors[r.status]}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="py-3.5 pr-4 text-nm-text-dim hidden xl:table-cell">
                    {new Date(r.date).toLocaleDateString('en-NG', { month: 'short', day: 'numeric' })}
                  </td>
                  <td className="py-3.5 pr-4 hidden lg:table-cell">
                    {r.flags.length > 0 ? (
                      <div className="flex gap-1 flex-wrap">
                        {r.flags.map((f) => (
                          <span key={f} className="flex items-center gap-0.5 bg-red-500/10 text-red-400 rounded-lg px-1.5 py-0.5 text-[10px]">
                            <Flag size={8} />
                            {f}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-nm-muted">—</span>
                    )}
                  </td>
                  <td className="py-3.5">
                    <div className="flex items-center gap-1">
                      <button className="text-emerald-400 hover:bg-emerald-500/10 p-1.5 rounded-lg transition-colors" title="Approve">
                        <CheckCircle size={14} />
                      </button>
                      <button className="text-red-400 hover:bg-red-500/10 p-1.5 rounded-lg transition-colors" title="Remove">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-nm-muted">No reviews found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}