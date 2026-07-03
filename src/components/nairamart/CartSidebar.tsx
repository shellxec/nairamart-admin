'use client';

import Image from 'next/image';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { useNairamartStore } from '@/store/use-nairamart-store';
import { useMemo } from 'react';

export function CartSidebar() {
  const {
    cartOpen,
    setCartOpen,
    cart,
    updateQuantity,
    removeFromCart,
    getCartTotal,
    getCartCount,
  } = useNairamartStore();

  const cartTotal = getCartTotal();
  const cartCount = getCartCount();

  const deliveryFee = useMemo(() => {
    if (cartTotal === 0) return 0;
    if (cartTotal >= 15000) return 0; // Free delivery for big orders
    return 500 + ((cartTotal % 1500) * 1); // Simple calculation between 500-2000
  }, [cartTotal]);

  const finalTotal = cartTotal + deliveryFee;

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent
        side="right"
        className="bg-[#161612] border-[#2a2a22] text-white w-full sm:max-w-md flex flex-col p-0"
      >
        <SheetHeader className="p-4 border-b border-[#2a2a22] shrink-0">
          <SheetTitle className="text-white flex items-center gap-2">
            <ShoppingBag className="size-5 text-[#AFE607]" />
            Shopping Cart ({cartCount})
          </SheetTitle>
          <SheetDescription className="text-[#B0B0B0]">
            {cart.length} item{cart.length !== 1 ? 's' : ''} in your cart
          </SheetDescription>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 px-4">
            <div className="w-20 h-20 rounded-full bg-[#0E0E0B] flex items-center justify-center">
              <ShoppingBag className="size-10 text-[#2a2a22]" />
            </div>
            <h3 className="text-lg font-semibold text-white">Your cart is empty</h3>
            <p className="text-sm text-[#B0B0B0] text-center">
              Browse our products and add items to your cart
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 bg-[#0E0E0B] rounded-lg p-2.5 border border-[#2a2a22]"
                >
                  {/* Image */}
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-[#161612]">
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <p className="text-xs text-white line-clamp-2 leading-snug">
                      {item.name}
                    </p>
                    <p className="text-sm font-bold text-[#AFE607]">
                      ₦{item.price_ngn.toLocaleString()}
                    </p>
                  </div>

                  {/* Controls */}
                  <div className="flex flex-col items-end justify-between shrink-0">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 text-[#888888] hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                    <div className="flex items-center border border-[#2a2a22] rounded-md overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-[#1a1a16] transition-colors"
                      >
                        <Minus className="size-3" />
                      </button>
                      <span className="px-2 text-xs font-bold min-w-[24px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, Math.min(item.stock_quantity, item.quantity + 1))
                        }
                        className="p-1 hover:bg-[#1a1a16] transition-colors"
                      >
                        <Plus className="size-3" />
                      </button>
                    </div>
                    <span className="text-[10px] text-[#888888]">
                      ₦{(item.price_ngn * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <SheetFooter className="p-4 border-t border-[#2a2a22] shrink-0 gap-3">
              <div className="w-full space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#B0B0B0]">Subtotal</span>
                  <span className="text-white font-medium">₦{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#B0B0B0]">Delivery Fee</span>
                  <span className="text-white font-medium">
                    {deliveryFee === 0 ? (
                      <span className="text-green-500">FREE</span>
                    ) : (
                      `₦${deliveryFee.toLocaleString()}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold border-t border-[#2a2a22] pt-2">
                  <span className="text-white">Total</span>
                  <span className="text-[#AFE607]">₦{finalTotal.toLocaleString()}</span>
                </div>

                <button className="green-pulse w-full bg-[#AFE607] text-black font-bold text-sm py-3 rounded-lg mt-2">
                  Proceed to Checkout
                </button>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}