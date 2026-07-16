'use client';

import { useState } from 'react';
import {
  Star,
  MessageSquare,
  Flag,
  Send,
  ThumbsUp,
  TrendingUp,
} from 'lucide-react';

// ─── Mock Data ────────────────────────────────────────────────────
const stats = [
  { label: 'Total Reviews', value: '856', icon: MessageSquare, color: 'emerald' },
  { label: 'Average Rating', value: '4.7', icon: Star, color: 'amber' },
  { label: '5-Star Reviews', value: '62%', icon: ThumbsUp, color: 'emerald' },
  { label: 'This Month', value: '34', icon: TrendingUp, color: 'blue' },
];

const ratingDistribution = [
  { stars: 5, count: 531, percentage: 62 },
  { stars: 4, count: 214, percentage: 25 },
  { stars: 3, count: 68, percentage: 8 },
  { stars: 2, count: 26, percentage: 3 },
  { stars: 1, count: 17, percentage: 2 },
];

interface Review {
  id: string;
  customer: string;
  product: string;
  rating: number;
  comment: string;
  date: string;
  replied: boolean;
}

const reviews: Review[] = [
  { id: '1', customer: 'Chidi Okonkwo', product: 'iPhone 14 Pro Max 256GB', rating: 5, comment: 'Excellent phone! Fast delivery and well packaged. The camera quality is outstanding. Highly recommend this seller.', date: 'Jan 15, 2025', replied: false },
  { id: '2', customer: 'Amina Bello', product: 'AirPods Pro 2nd Gen', rating: 5, comment: 'Best earbuds I\'ve ever used. The noise cancellation is amazing and the sound quality is crystal clear.', date: 'Jan 14, 2025', replied: true },
  { id: '3', customer: 'Emeka Nwosu', product: 'Samsung Galaxy S23 Ultra', rating: 4, comment: 'Great phone with a stunning display. Battery life could be better but overall very satisfied with the purchase.', date: 'Jan 13, 2025', replied: false },
  { id: '4', customer: 'Fatima Yusuf', product: 'MacBook Air M2 13"', rating: 5, comment: 'Perfect for my work. Lightweight, fast, and the battery lasts all day. Seller was very responsive to my questions.', date: 'Jan 12, 2025', replied: false },
  { id: '5', customer: 'Tobi Adeyemi', product: 'Apple Watch Series 9', rating: 4, comment: 'Love the health features and the design. The only downside is the band size options could be better.', date: 'Jan 11, 2025', replied: true },
  { id: '6', customer: 'Chioma Eze', product: 'Dell XPS 15', rating: 3, comment: 'Good laptop but the shipping took longer than expected. The product itself is great but customer service needs improvement.', date: 'Jan 10, 2025', replied: false },
  { id: '7', customer: 'Ibrahim Danjuma', product: 'iPhone 14 Pro Max 256GB', rating: 5, comment: 'Bought this as a gift and the recipient loved it. Authentic product with warranty. Will buy again.', date: 'Jan 9, 2025', replied: false },
  { id: '8', customer: 'Ngozi Obi', product: 'Samsung Galaxy S23 Ultra', rating: 2, comment: 'Phone is good but received it with a minor scratch on the screen. Seller needs to improve packaging.', date: 'Jan 8, 2025', replied: true },
];

const colorMap: Record<string, string> = {
  emerald: 'bg-emerald-500/15 text-emerald-400',
  amber: 'bg-amber-500/15 text-amber-400',
  blue: 'bg-blue-500/15 text-blue-400',
};

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`${star <= Math.round(rating) ? 'text-amber-400' : 'text-nm-border'}`}
          width={size}
          height={size}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function SellerReviews() {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Reviews</h1>
        <p className="text-sm text-nm-muted mt-1">Monitor and respond to customer reviews</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-nm-card rounded-2xl border border-nm-border p-5">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorMap[s.color]} mb-3`}>
                <Icon size={18} />
              </div>
              <p className="text-xs text-nm-muted mb-1">{s.label}</p>
              <p className="text-2xl font-bold text-white">{s.value}</p>
            </div>
          );
        })}
      </div>

      {/* Rating Distribution */}
      <div className="bg-nm-card rounded-2xl border border-nm-border p-5">
        <h2 className="text-base font-semibold text-white mb-4">Rating Distribution</h2>
        <div className="space-y-3">
          {ratingDistribution.map((r) => (
            <div key={r.stars} className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 w-16 shrink-0">
                <span className="text-sm text-nm-text-dim">{r.stars}</span>
                <svg className="text-amber-400" width={14} height={14} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div className="flex-1 h-2.5 bg-nm-input rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all duration-500"
                  style={{ width: `${r.percentage}%` }}
                />
              </div>
              <span className="text-xs text-nm-text-dim w-12 text-right">{r.percentage}%</span>
              <span className="text-xs text-nm-muted w-10 text-right">({r.count})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Table */}
      <div className="bg-nm-card rounded-2xl border border-nm-border overflow-hidden">
        <div className="px-5 py-4 border-b border-nm-border">
          <h2 className="text-base font-semibold text-white">All Reviews</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-nm-border">
                <th className="text-left text-nm-muted font-medium px-5 py-3">Customer</th>
                <th className="text-left text-nm-muted font-medium px-5 py-3 hidden md:table-cell">Product</th>
                <th className="text-left text-nm-muted font-medium px-5 py-3">Rating</th>
                <th className="text-left text-nm-muted font-medium px-5 py-3">Comment</th>
                <th className="text-left text-nm-muted font-medium px-5 py-3 hidden lg:table-cell">Date</th>
                <th className="text-right text-nm-muted font-medium px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review.id} className="border-b border-nm-border/50 hover:bg-nm-card-hover transition-colors">
                  <td className="px-5 py-3">
                    <div>
                      <p className="text-white font-medium">{review.customer}</p>
                      {review.replied && (
                        <p className="text-[10px] text-emerald-400 mt-0.5">Replied ✓</p>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-3 text-nm-text-dim hidden md:table-cell max-w-[160px] truncate">{review.product}</td>
                  <td className="px-5 py-3">
                    <StarRating rating={review.rating} size={12} />
                  </td>
                  <td className="px-5 py-3 text-nm-text-dim max-w-[240px]">
                    <p className="line-clamp-2">{review.comment}</p>
                  </td>
                  <td className="px-5 py-3 text-nm-muted text-xs hidden lg:table-cell">{review.date}</td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setReplyingTo(reply.id)}
                        className="text-nm-text-dim hover:text-white hover:bg-nm-card-hover rounded-lg px-3 py-1.5 text-xs flex items-center gap-1.5 transition-colors"
                      >
                        <MessageSquare size={12} />
                        Reply
                      </button>
                      <button className="text-red-400 hover:bg-red-500/10 rounded-lg px-3 py-1.5 text-xs flex items-center gap-1.5 transition-colors">
                        <Flag size={12} />
                        Report
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Inline Reply */}
        {replyingTo && (
          <div className="px-5 py-4 border-t border-nm-border bg-nm-card-hover animate-fade-in">
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write your reply..."
                  rows={2}
                  className="w-full bg-nm-input border border-nm-border rounded-xl px-3 py-2 text-sm text-white placeholder:text-nm-muted focus:outline-none focus:border-[#AFE607]/40 resize-none"
                />
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => {
                    setReplyingTo(null);
                    setReplyText('');
                  }}
                  className="text-nm-text-dim hover:text-white hover:bg-nm-card-hover rounded-lg px-3 py-2 text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setReplyingTo(null);
                    setReplyText('');
                  }}
                  className="bg-[#AFE607] text-black font-medium rounded-lg px-3 py-2 text-sm flex items-center gap-1.5 hover:bg-[#9dd006] transition-colors"
                >
                  <Send size={12} />
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}