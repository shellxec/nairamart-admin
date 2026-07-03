'use client';

import Image from 'next/image';
import { Star, Minus, Plus, Truck, Heart, ShoppingCart } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useNairamartStore, type Product } from '@/store/use-nairamart-store';
import { products } from '@/data/products';
import { useState, useMemo } from 'react';

export function ProductDetail() {
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart,
    addToRecentlyViewed,
    toggleWishlist,
    isInWishlist,
  } = useNairamartStore();
  const [quantity, setQuantity] = useState(1);

  const similarProducts = useMemo(() => {
    if (!selectedProduct) return [];
    const sameCategory = products
      .filter((p) => p.category === selectedProduct.category && p.id !== selectedProduct.id);
    const shuffled = sameCategory.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  }, [selectedProduct]);

  if (!selectedProduct) {
    return (
      <Dialog open={false} onOpenChange={() => {}}>
        <DialogContent />
      </Dialog>
    );
  }

  const product = selectedProduct;
  const wishlisted = isInWishlist(product.id);
  const installmentPrice = Math.ceil(product.price_ngn / 3);

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Star
        key={i}
        className={`size-4 ${
          i <= Math.round(product.rating)
            ? 'fill-[#AFE607] text-[#AFE607]'
            : 'text-[#2a2a22]'
        }`}
      />
    );
  }

  function handleAddToCart() {
    addToCart(product, quantity);
  }

  function handleClose() {
    setSelectedProduct(null);
    setQuantity(1);
  }

  function handleSimilarClick(p: Product) {
    addToRecentlyViewed(p);
    setSelectedProduct(p);
    setQuantity(1);
  }

  return (
    <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent
        className="bg-[#161612] border-[#2a2a22] text-white sm:max-w-2xl max-h-[90vh] overflow-y-auto p-0"
      >
        <div className="relative aspect-[16/9] w-full bg-[#0E0E0B] rounded-t-lg overflow-hidden">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            unoptimized
            className="object-cover"
          />
          {product.badge && (
            <div className="absolute top-3 left-0 bg-[#AFE607] text-black text-xs font-bold px-3 py-1 rounded-r-full">
              {product.badge}
            </div>
          )}
        </div>

        <div className="p-5 flex flex-col gap-4">
          <DialogHeader className="space-y-0">
            <DialogTitle className="text-lg text-white leading-snug">
              {product.name}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Product details for {product.name}
            </DialogDescription>
          </DialogHeader>

          {/* Price */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-2xl font-bold text-white">
              ₦{product.price_ngn.toLocaleString()}
            </span>
            {product.original_price_ngn > product.price_ngn && (
              <>
                <span className="text-sm text-[#888888] line-through">
                  ₦{product.original_price_ngn.toLocaleString()}
                </span>
                <span className="text-xs font-bold bg-[#AFE607] text-black px-2 py-0.5 rounded">
                  -{product.discount_percent}%
                </span>
              </>
            )}
          </div>

          {/* Installment */}
          <p className="text-sm text-[#B0B0B0]">
            or 3 payments of <span className="text-[#AFE607] font-semibold">₦{installmentPrice.toLocaleString()}</span> with PayLater
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">{stars}</div>
            <span className="text-sm text-[#888888]">({product.reviews_count} reviews)</span>
          </div>

          {/* Stock */}
          {product.stock_quantity < 10 ? (
            <p className="text-sm text-red-500 font-medium">
              Only {product.stock_quantity} left in stock!
            </p>
          ) : (
            <p className="text-sm text-green-500 font-medium">In Stock</p>
          )}

          {/* Delivery */}
          <div className="flex items-center gap-2 text-sm text-[#B0B0B0]">
            <Truck className="size-4 text-[#AFE607]" />
            Free delivery in Lagos – 2–4 days
          </div>

          {/* Social proof */}
          <p className="text-xs text-[#888888]">
            {product.bought_recently.toLocaleString()} people bought this recently
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-[#B0B0B0]">Quantity:</span>
            <div className="flex items-center border border-[#2a2a22] rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                className="p-2 hover:bg-[#1a1a16] transition-colors disabled:opacity-40"
              >
                <Minus className="size-4" />
              </button>
              <span className="px-4 py-2 text-sm font-bold min-w-[40px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                disabled={quantity >= product.stock_quantity}
                className="p-2 hover:bg-[#1a1a16] transition-colors disabled:opacity-40"
              >
                <Plus className="size-4" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-[#AFE607] text-black font-bold text-sm py-3 rounded-lg hover:shadow-[0_0_20px_rgba(175,230,7,0.4)] transition-shadow flex items-center justify-center gap-2"
            >
              <ShoppingCart className="size-4" />
              Add to Cart
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              className="p-3 border border-[#2a2a22] rounded-lg hover:border-[#AFE607]/50 transition-colors"
            >
              <Heart
                className={`size-4 ${
                  wishlisted ? 'fill-red-500 text-red-500' : 'text-[#B0B0B0]'
                }`}
              />
            </button>
          </div>

          {/* People Also Bought */}
          {similarProducts.length > 0 && (
            <div className="pt-4 border-t border-[#2a2a22]">
              <h4 className="text-sm font-bold text-white mb-3">People also bought</h4>
              <div className="grid grid-cols-4 gap-2">
                {similarProducts.map((sp) => (
                  <button
                    key={sp.id}
                    onClick={() => handleSimilarClick(sp)}
                    className="group/similar bg-[#0E0E0B] rounded-lg overflow-hidden border border-[#2a2a22] hover:border-[#AFE607]/30 transition-all text-left"
                  >
                    <div className="relative aspect-square bg-[#0E0E0B]">
                      <Image
                        src={sp.image_url}
                        alt={sp.name}
                        fill
                        unoptimized
                        className="object-cover group-hover/similar:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-1.5">
                      <p className="text-[10px] text-white line-clamp-2 leading-tight">
                        {sp.name}
                      </p>
                      <p className="text-[11px] font-bold text-[#AFE607] mt-0.5">
                        ₦{sp.price_ngn.toLocaleString()}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}