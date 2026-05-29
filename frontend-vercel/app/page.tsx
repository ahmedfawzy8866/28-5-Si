'use client';

import React, { useState } from 'react';
import MobileBottomNav from '@/components/ui/MobileBottomNav';

export default function Home() {
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr');

  const toggleDirection = () => {
    setDirection(direction === 'ltr' ? 'rtl' : 'ltr');
  };

  return (
    <main className="min-h-screen relative overflow-hidden" dir={direction}>
      {/* 60fps golden stardust canvas background (Peachworlds Engine stub) */}
      <div className="absolute inset-0 bg-canvas-ivory z-0">
        <div className="absolute inset-0 opacity-20 bg-luxury-gold-gradient" style={{ animation: 'spin 60s linear infinite' }}></div>
      </div>

      <div className="relative z-10 p-8 flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-5xl font-bold text-branding-navy mb-4">
          Sierra AI
        </h1>
        <p className="text-xl mb-8">
          Elite Full-Stack Integration Architect & Local DevOps Automation
        </p>
        
        <button 
          onClick={toggleDirection}
          className="px-6 py-2 bg-branding-navy text-canvas-ivory rounded-full shadow-lg hover:bg-map-blue transition-colors"
        >
          Toggle {direction === 'ltr' ? 'RTL' : 'LTR'}
        </button>
      </div>

      <MobileBottomNav />
    </main>
  );
}
