import React from 'react';
import { Compass, Map, Activity, LayoutDashboard } from 'lucide-react';

export default function MobileBottomNav() {
  return (
    <div className="fixed bottom-0 w-full bg-branding-navy/95 backdrop-blur-md text-canvas-ivory pb-safe z-50">
      <div className="flex justify-around items-center h-16">
        <button className="flex flex-col items-center justify-center w-full h-full space-y-1 hover:text-luxury-gold-start transition-colors">
          <Compass size={20} />
          <span className="text-xs">Explore</span>
        </button>
        <button className="flex flex-col items-center justify-center w-full h-full space-y-1 hover:text-luxury-gold-start transition-colors">
          <Map size={20} />
          <span className="text-xs">Map</span>
        </button>
        <button className="flex flex-col items-center justify-center w-full h-full space-y-1 hover:text-luxury-gold-start transition-colors">
          <Activity size={20} />
          <span className="text-xs">AI Yields</span>
        </button>
        <button className="flex flex-col items-center justify-center w-full h-full space-y-1 hover:text-luxury-gold-start transition-colors">
          <LayoutDashboard size={20} />
          <span className="text-xs">Console</span>
        </button>
      </div>
    </div>
  );
}
