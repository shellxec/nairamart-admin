'use client';

import { SpinWheel } from '@/components/nairamart/SpinWheel';
import { Header } from '@/components/nairamart/Header';
import { HeroBanner } from '@/components/nairamart/HeroBanner';
import { ReferralBanner } from '@/components/nairamart/ReferralBanner';
import { CategoryPills } from '@/components/nairamart/CategoryPills';
import { ProductGrid } from '@/components/nairamart/ProductGrid';
import { RecentlyViewed } from '@/components/nairamart/RecentlyViewed';
import { ProductDetail } from '@/components/nairamart/ProductDetail';
import { CartSidebar } from '@/components/nairamart/CartSidebar';
import { Footer } from '@/components/nairamart/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0E0E0B]">
      <SpinWheel />
      <Header />
      <main className="min-h-screen">
        <HeroBanner />
        <ReferralBanner />
        <CategoryPills />
        <ProductGrid />
        <RecentlyViewed />
      </main>
      <ProductDetail />
      <CartSidebar />
      <Footer />
    </div>
  );
}