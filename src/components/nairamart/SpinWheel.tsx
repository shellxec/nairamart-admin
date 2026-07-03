'use client';

import { useState } from 'react';
import { useNairamartStore } from '@/store/use-nairamart-store';

const segments = [
  { label: '5% OFF', value: 5, color: '#1a2a00' },
  { label: '10% OFF', value: 10, color: '#002a1a' },
  { label: '15% OFF', value: 15, color: '#1a2a00' },
  { label: '20% OFF', value: 20, color: '#002a1a' },
  { label: '10% OFF', value: 10, color: '#1a2a00' },
  { label: '5% OFF', value: 5, color: '#002a1a' },
];

export function SpinWheel() {
  const { spinWheelOpen, setSpinWheelOpen, setSpinDiscount } = useNairamartStore();
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<number | null>(null);

  if (!spinWheelOpen) return null;

  function handleSpin() {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    // Pick a random segment
    const randomIndex = Math.floor(Math.random() * segments.length);
    const selectedSegment = segments[randomIndex];

    // Spin for 4 seconds, then show result
    setTimeout(() => {
      setSpinning(false);
      setResult(selectedSegment.value);
      setSpinDiscount(selectedSegment.value);
    }, 4000);
  }

  function handleGotIt() {
    setSpinWheelOpen(false);
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="bg-[#161612] border border-[#2a2a22] rounded-2xl p-6 max-w-sm w-full text-center relative">
        {/* Close X */}
        {!spinning && result === null && (
          <button
            onClick={handleGotIt}
            className="absolute top-3 right-3 text-[#B0B0B0] hover:text-white text-lg font-bold"
          >
            ✕
          </button>
        )}

        {result === null ? (
          <>
            <h2 className="text-xl font-bold text-[#AFE607] mb-1">🎉 Spin to Win!</h2>
            <p className="text-sm text-[#B0B0B0] mb-5">
              Spin the wheel for an exclusive discount on your first order!
            </p>

            {/* Wheel */}
            <div className="relative w-56 h-56 mx-auto mb-5">
              <div
                className={`w-full h-full rounded-full border-4 border-[#AFE607] overflow-hidden ${
                  spinning ? 'spin-animation' : ''
                }`}
              >
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  {segments.map((seg, i) => {
                    const startAngle = i * 60;
                    const endAngle = (i + 1) * 60;
                    const startRad = (startAngle * Math.PI) / 180;
                    const endRad = (endAngle * Math.PI) / 180;
                    const x1 = 100 + 100 * Math.cos(startRad);
                    const y1 = 100 + 100 * Math.sin(startRad);
                    const x2 = 100 + 100 * Math.cos(endRad);
                    const y2 = 100 + 100 * Math.sin(endRad);
                    const midAngle = ((startAngle + endAngle) / 2) * (Math.PI / 180);
                    const textX = 100 + 60 * Math.cos(midAngle);
                    const textY = 100 + 60 * Math.sin(midAngle);
                    const rotation = ((startAngle + endAngle) / 2) * (180 / Math.PI);

                    return (
                      <g key={i}>
                        <path
                          d={`M100,100 L${x1},${y1} A100,100 0 0,1 ${x2},${y2} Z`}
                          fill={seg.color}
                          stroke="#AFE607"
                          strokeWidth="1"
                        />
                        <text
                          x={textX}
                          y={textY}
                          fill="#AFE607"
                          fontSize="14"
                          fontWeight="bold"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          transform={`rotate(${rotation}, ${textX}, ${textY})`}
                        >
                          {seg.label}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
              {/* Pointer */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 z-10">
                <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[16px] border-l-transparent border-r-transparent border-t-[#AFE607]" />
              </div>
            </div>

            <button
              onClick={handleSpin}
              disabled={spinning}
              className="bg-[#AFE607] text-black font-bold text-base px-8 py-3 rounded-full hover:shadow-[0_0_20px_rgba(175,230,7,0.4)] transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {spinning ? 'Spinning...' : 'SPIN'}
            </button>
          </>
        ) : (
          <>
            <div className="text-5xl mb-3">🎊</div>
            <h2 className="text-2xl font-bold text-[#AFE607] mb-2">
              You got {result}% OFF!
            </h2>
            <p className="text-sm text-[#B0B0B0] mb-5">
              Discount applied to your first order. Start shopping now!
            </p>
            <button
              onClick={handleGotIt}
              className="bg-[#AFE607] text-black font-bold text-base px-8 py-3 rounded-full hover:shadow-[0_0_20px_rgba(175,230,7,0.4)] transition-shadow"
            >
              Got it!
            </button>
          </>
        )}
      </div>
    </div>
  );
}