'use client';

import Image from 'next/image';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { type Product, useNairamartStore } from '@/store/use-nairamart-store';
import { useState, useEffect } from 'react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, setSelectedProduct, addToRecentlyViewed, toggleWishlist, isInWishlist } =
    useNairamartStore();
  const wishlisted = isInWishlist(product.id);
  const [flashTime, setFlashTime] = useState({ h: 2, m: 0, s: 0 });

  // Flash sale countdown for cards with > 40% discount
  useEffect(() => {
    if (product.discount_percent <= 40) return;
    const target = Date.now() + (2 * 60 * 60 * 1000) + (Math.random() * 3 * 60 * 60 * 1000);
    const interval = setInterval(() => {
      const diff = Math.max(0, target - Date.now());
      setFlashTime({
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [product.discount_percent]);

  function handleCardClick(e: React.MouseEvent) {
    // Don't open detail if clicking button or heart
    if ((e.target as HTMLElement).closest('button')) return;
    addToRecentlyViewed(product);
    setSelectedProduct(product);
  }

  function handleAddToCart(e: React.MouseEvent) {
    e.stopPropagation();
    addToCart(product);
  }

  function handleWishlist(e: React.MouseEvent) {
    e.stopPropagation();
    toggleWishlist(product.id);
  }

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Star
        key={i}
        className={`size-3 ${
          i <= Math.round(product.rating)
            ? 'fill-[#AFE607] text-[#AFE607]'
            : 'text-[#2a2a22]'
        }`}
      />
    );
  }

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div
      onClick={handleCardClick}
      className="group bg-[#161612] rounded-xl overflow-hidden border border-[#2a2a22] hover:border-[#AFE607]/30 transition-all cursor-pointer"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#0E0E0B]">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          unoptimized
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badge Ribbon */}
        {product.badge && (
          <div className="absolute top-2 left-0 bg-[#AFE607] text-black text-[10px] font-bold px-2.5 py-1 rounded-r-full">
            {product.badge}
          </div>
        )}

        {/* Flash sale timer */}
        {product.discount_percent > 40 && (
          <div className="absolute bottom-2 left-2 bg-red-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <span>🔥</span>
            <span>{pad(flashTime.h)}:{pad(flashTime.m)}:{pad(flashTime.s)}</span>
          </div>
        )}

        {/* Wishlist Heart */}
        <button
          onClick={handleWishlist}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-black/40 hover:bg-black/60 transition-colors"
        >
          <Heart
            className={`size-4 ${
              wishlisted ? 'fill-red-500 text-red-500' : 'text-white'
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col gap-1.5">
        {/* Product Name */}
        <h3 className="text-sm text-white line-clamp-2 leading-snug min-h-[2.5rem]">
          {product.name}
        </h3>

        {/* Price Row */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-lg font-bold text-white">
            ₦{product.price_ngn.toLocaleString()}
          </span>
          {product.original_price_ngn > product.price_ngn && (
            <>
              <span className="text-xs text-[#888888] line-through">
                ₦{product.original_price_ngn.toLocaleString()}
              </span>
              <span className="text-[10px] font-bold bg-[#AFE607] text-black px-1.5 py-0.5 rounded">
                -{product.discount_percent}%
              </span>
            </>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-0.5">{stars}</div>
          <span className="text-xs text-[#888888]">({product.reviews_count})</span>
        </div>

        {/* Stock */}
        {product.stock_quantity < 10 ? (
          <p className="text-xs text-red-500 font-medium">
            Only {product.stock_quantity} left!
          </p>
        ) : (
          <p className="text-xs text-green-500">In Stock</p>
        )}

        {/* Social proof */}
        <p className="text-[11px] text-[#888888]">
          {product.bought_recently.toLocaleString()} people bought this recently
        </p>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full mt-1 bg-[#AFE607] text-black font-bold text-sm py-2.5 rounded-lg hover:shadow-[0_0_20px_rgba(175,230,7,0.4)] transition-shadow flex items-center justify-center gap-2"
        >
          <ShoppingCart className="size-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}