'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const banners = [
  {
    title: 'FLASH SALE – UP TO 70% OFF',
    subtitle: 'Deals on Electronics, Fashion & More',
    emoji: '⚡',
    gradient: 'from-[#1a2a00] via-[#0E0E0B] to-[#0E0E0B]',
  },
  {
    title: 'FREE DELIVERY IN LAGOS',
    subtitle: 'Orders above ₦5,000 – No minimum on first order!',
    emoji: '🚚',
    gradient: 'from-[#002a1a] via-[#0E0E0B] to-[#0E0E0B]',
  },
  {
    title: 'NEW ARRIVALS – GAMING & TECH',
    subtitle: 'PS5, Nintendo Switch, and more at lowest prices',
    emoji: '🎮',
    gradient: 'from-[#2a1a00] via-[#0E0E0B] to-[#0E0E0B]',
  },
];

export function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Set countdown to a random time between 2-6 hours from now
    const target = new Date().getTime() + (2 + Math.random() * 4) * 60 * 60 * 1000;
    const saved = sessionStorage.getItem('nm-flash-target');
    const flashTarget = saved ? parseInt(saved) : target;

    if (!saved) sessionStorage.setItem('nm-flash-target', String(flashTarget));

    function updateCountdown() {
      const now = new Date().getTime();
      const diff = Math.max(0, flashTarget - now);
      setTimeLeft({
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="relative overflow-hidden">
      <div className="relative h-[220px] sm:h-[280px] md:h-[320px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className={`absolute inset-0 bg-gradient-to-r ${banners[current].gradient} flex items-center`}
          >
            {/* Decorative elements */}
            <div className="absolute right-10 top-1/2 -translate-y-1/2 text-7xl sm:text-8xl md:text-9xl opacity-10 select-none">
              {banners[current].emoji}
            </div>
            <div className="absolute left-1/4 bottom-0 text-5xl opacity-5 select-none rotate-12">
              {banners[current].emoji}
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
              <div className="max-w-lg">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
                  {banners[current].title}
                </h2>
                <p className="mt-2 text-[#B0B0B0] text-sm sm:text-base">
                  {banners[current].subtitle}
                </p>

                {/* Countdown */}
                {current === 0 && (
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-xs text-[#B0B0B0]">Ends in:</span>
                    <div className="flex items-center gap-1">
                      {[
                        { value: pad(timeLeft.hours), label: 'HRS' },
                        { value: pad(timeLeft.minutes), label: 'MIN' },
                        { value: pad(timeLeft.seconds), label: 'SEC' },
                      ].map((item, i) => (
                        <div key={item.label} className="flex items-center gap-1">
                          <div className="bg-[#AFE607] text-black font-bold text-sm sm:text-base px-2 py-1 rounded-md min-w-[40px] text-center">
                            {item.value}
                          </div>
                          {i < 2 && (
                            <span className="text-[#AFE607] font-bold">:</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button className="mt-4 bg-[#AFE607] text-black font-bold text-sm sm:text-base px-6 py-2.5 rounded-full hover:shadow-[0_0_20px_rgba(175,230,7,0.4)] transition-shadow">
                  Shop Now
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={() => setCurrent((prev) => (prev - 1 + banners.length) % banners.length)}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-colors"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          onClick={() => setCurrent((prev) => (prev + 1) % banners.length)}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-colors"
        >
          <ChevronRight className="size-5" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === current ? 'w-6 bg-[#AFE607]' : 'w-1.5 bg-[#B0B0B0]/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}