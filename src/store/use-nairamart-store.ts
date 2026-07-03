import { create } from 'zustand';

export interface Product {
  id: string;
  name: string;
  category: string;
  price_ngn: number;
  original_price_ngn: number;
  discount_percent: number;
  stock_quantity: number;
  rating: number;
  reviews_count: number;
  image_url: string;
  badge: string;
  bought_recently: number;
}

export interface CartItem extends Product {
  quantity: number;
}

interface NairamartState {
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Recently Viewed
  recentlyViewed: Product[];
  addToRecentlyViewed: (product: Product) => void;

  // UI State
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  spinWheelOpen: boolean;
  setSpinWheelOpen: (open: boolean) => void;
  spinDiscount: number | null;
  setSpinDiscount: (discount: number | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const MAX_RECENTLY_VIEWED = 12;

export const useNairamartStore = create<NairamartState>((set, get) => ({
  // Cart
  cart: typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('nm-cart') || '[]')
    : [],
  addToCart: (product, quantity = 1) => {
    const { cart } = get();
    const existing = cart.find(item => item.id === product.id);
    let newCart;
    if (existing) {
      newCart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock_quantity) }
          : item
      );
    } else {
      newCart = [...cart, { ...product, quantity: Math.min(quantity, product.stock_quantity) }];
    }
    set({ cart: newCart });
    localStorage.setItem('nm-cart', JSON.stringify(newCart));
  },
  removeFromCart: (productId) => {
    const newCart = get().cart.filter(item => item.id !== productId);
    set({ cart: newCart });
    localStorage.setItem('nm-cart', JSON.stringify(newCart));
  },
  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
      return;
    }
    const newCart = get().cart.map(item =>
      item.id === productId ? { ...item, quantity } : item
    );
    set({ cart: newCart });
    localStorage.setItem('nm-cart', JSON.stringify(newCart));
  },
  clearCart: () => {
    set({ cart: [] });
    localStorage.setItem('nm-cart', '[]');
  },
  getCartTotal: () => get().cart.reduce((sum, item) => sum + item.price_ngn * item.quantity, 0),
  getCartCount: () => get().cart.reduce((sum, item) => sum + item.quantity, 0),

  // Wishlist
  wishlist: typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('nm-wishlist') || '[]')
    : [],
  toggleWishlist: (productId) => {
    const { wishlist } = get();
    const newWishlist = wishlist.includes(productId)
      ? wishlist.filter(id => id !== productId)
      : [...wishlist, productId];
    set({ wishlist: newWishlist });
    localStorage.setItem('nm-wishlist', JSON.stringify(newWishlist));
  },
  isInWishlist: (productId) => get().wishlist.includes(productId),

  // Recently Viewed
  recentlyViewed: typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('nm-recently') || '[]')
    : [],
  addToRecentlyViewed: (product) => {
    const { recentlyViewed } = get();
    const filtered = recentlyViewed.filter(p => p.id !== product.id);
    const newRecent = [product, ...filtered].slice(0, MAX_RECENTLY_VIEWED);
    set({ recentlyViewed: newRecent });
    localStorage.setItem('nm-recently', JSON.stringify(newRecent));
  },

  // UI State
  cartOpen: false,
  setCartOpen: (open) => set({ cartOpen: open }),
  selectedProduct: null,
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  spinWheelOpen: typeof window !== 'undefined'
    ? !localStorage.getItem('nm-spin-done')
    : false,
  setSpinWheelOpen: (open) => {
    if (!open) localStorage.setItem('nm-spin-done', '1');
    set({ spinWheelOpen: open });
  },
  spinDiscount: null,
  setSpinDiscount: (discount) => set({ spinDiscount: discount }),
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  selectedCategory: 'All',
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));