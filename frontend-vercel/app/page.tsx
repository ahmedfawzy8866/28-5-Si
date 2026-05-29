'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useI18n } from '@/lib/I18nContext';
import { useTheme } from 'next-themes';
import InteractiveCrmMap from '@/components/ui/InteractiveCrmMap';
import LuxuryVirtualViewport from '@/components/ui/LuxuryVirtualViewport';
import MobileBottomNav from '@/components/ui/MobileBottomNav';
import Topbar from '@/components/ui/Topbar';

function PrecisionShieldLogo() {
  return (
    <svg width="34" height="40" viewBox="0 0 120 138" fill="none" className="shrink-0 drop-shadow-[0_2px_10px_rgba(200,150,26,0.2)]">
      <defs>
        <linearGradient id="gold-grad-metallic" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F5E070"/><stop offset="50%" stopColor="#C8961A"/><stop offset="100%" stopColor="#987734"/>
        </linearGradient>
      </defs>
      <path d="M60 2L112 21V79Q112 122 60 138Q8 122 8 79V21Z" fill="url(#gold-grad-metallic)"/>
      <path d="M60 8L106 25V78Q106 114 60 130Q14 114 14 78V25Z" fill="currentColor" className="text-background"/>
      <path d="M14 100 Q35 84 58 72 Q80 58 108 46" stroke="url(#gold-grad-metallic)" strokeWidth="7" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

function GoldenStardustCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    let W = (canvas.width = canvas.offsetWidth); let H = (canvas.height = canvas.offsetHeight);
    const pool = Array.from({ length: 30 }, () => ({
      x: Math.random() * W, y: H + Math.random() * H,
      r: Math.random() * 1.2 + 0.4, vy: -Math.random() * 0.3 - 0.1, alpha: Math.random() * 0.5 + 0.1
    }));
    let id: number;
    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      pool.forEach((p) => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(200, 150, 26, ${p.alpha})`; ctx.fill();
        p.y += p.vy; if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
      });
      id = requestAnimationFrame(loop);
    };
    loop(); return () => cancelAnimationFrame(id);
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />;
}

export default function SierraJuneMasterConsole() {
  const { locale } = useI18n();
  const [activeTab, setActiveTab] = useState('explore');
  const [mounted, setMounted] = useState(false);
  const isAr = locale === 'ar';

  useEffect(() => { setMounted(true); }, []);

  const heroRef = useRef<HTMLDivElement>(null);
  const mX = useMotionValue(0); const mY = useMotionValue(0);
  const sX = useSpring(mX, { stiffness: 45, damping: 18 });
  const sY = useSpring(mY, { stiffness: 45, damping: 18 });
  const rotateX = useTransform(sY, [-300, 300], [5, -5]);
  const rotateY = useTransform(sX, [-300, 300], [-5, 5]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background text-foreground antialiased select-none font-sans overflow-x-hidden pb-16 lg:pb-0" dir={isAr ? 'rtl' : 'ltr'}>
      <Topbar onHomeClick={() => {}} onSignOut={() => {}} />

      <section 
        ref={heroRef} onMouseMove={(e) => { if (!heroRef.current) return; const r = heroRef.current.getBoundingClientRect(); mX.set(e.clientX - (r.left + r.width / 2)); mY.set(e.clientY - (r.top + r.height / 2)); }} onMouseLeave={() => { mX.set(0); mY.set(0); }}
        className="relative min-h-screen w-full flex items-center justify-center pt-24 px-6 md:px-12 max-w-[1500px] mx-auto overflow-hidden z-10"
      >
        <GoldenStardustCanvas />
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-12 relative z-20">
          <div className="w-full lg:w-[55%] flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface border border-border rounded-full w-max mb-5 shadow-sm">
              <span className="text-[10px] uppercase tracking-widest font-bold text-primary">{isAr ? 'إدارة الأصول العقارية بأحدث النظم السحابية' : 'SaaS Engine Platform OS'}</span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-[4.2rem] leading-[1.08] tracking-tight text-foreground font-bold mb-6">
              {isAr ? (
                <>قرارات <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5E070] via-[#C8961A] to-[#987734] font-normal italic">أقوى.</span><br />مدعومة بمخططات الحقيقة البيانية.</>
              ) : (
                <>Smarter <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5E070] via-[#C8961A] to-[#987734] font-normal italic">Decisions.</span><br />Driven by Asset Intelligence.</>
              )}
            </h1>
            <p className="text-sm text-foreground/70 font-light max-w-xl mb-8 leading-relaxed">
              {isAr ? 'استكشف محافظ عقارية فاخرة تم التحقق منها وفهرستها عبر خوارزمية تشفيرSHA256 الردعية لتصفية عروض السماسرة وتأمين رحلتك الاستثمارية بالقاهرة الجديدة.' : 'Curated inventory listings directly bound to live transactional records on the Firestore Spark layer. Fully integrated with official Property Finder gateways under absolute styling tokens compliance.'}
            </p>
          </div>
          <div className="w-full lg:w-[45%] h-[450px] perspective-[1500px] md:h-[500px]">
            <motion.div style={{ rotateX, rotateY }} className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-border bg-surface">
              <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200" alt="Sierra Render Frame View" className="absolute inset-0 w-full h-full object-cover scale-101" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 px-6 md:px-12 max-w-[1450px] mx-auto relative z-30">
        <InteractiveCrmMap isArabic={isAr} />
      </section>

      <section className="py-12 px-6 md:px-12 max-w-[1450px] mx-auto relative z-30">
        <LuxuryVirtualViewport tourUrl="https://kuula.co/share/collection/7K_XG?logo=0&info=0&fs=1&vr=1&sd=1&thumbs=1" sbrCode="MVD-3F-110K" />
      </section>

      <MobileBottomNav currentTab={activeTab} setTab={setActiveTab} isArabic={isAr} />
    </div>
  );
}
