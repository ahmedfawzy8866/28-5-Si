'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '@/lib/I18nContext';
import InteractiveCrmMap from '@/components/ui/InteractiveCrmMap';
import LuxuryVirtualViewport from '@/components/ui/LuxuryVirtualViewport';
import MobileBottomNav from '@/components/ui/MobileBottomNav';
import Topbar from '@/components/ui/Topbar';
import { Search, MapPin, Home as HomeIcon, Briefcase } from 'lucide-react';

export default function SierraHomeConsole() {
  const { locale } = useI18n();
  const [activeTab, setActiveTab] = useState('explore');
  const [mounted, setMounted] = useState(false);
  const isAr = locale === 'ar';

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background text-foreground antialiased select-none font-sans overflow-x-hidden pb-16 lg:pb-0" dir={isAr ? 'rtl' : 'ltr'}>
      <Topbar onHomeClick={() => setActiveTab('explore')} onSignOut={() => {}} />

      {activeTab === 'explore' && (
        <>
          {/* 1. HERO SECTION WITH UNIT BACKGROUND & FILTERS */}
          <section className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden z-10 pt-20">
            {/* High-End Property Background Image */}
            <div className="absolute inset-0 w-full h-full">
              <img 
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80" 
                alt="Luxury Property" 
                className="w-full h-full object-cover scale-105 animate-slow-pan"
              />
              {/* Overlay gradient to ensure text readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/40 to-background/95" />
            </div>

            <div className="relative z-20 w-full max-w-[1200px] px-6 mx-auto flex flex-col items-center text-center mt-[-5vh]">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-surface backdrop-blur-md border border-white/20 rounded-full mb-6 shadow-xl">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary">
                  {isAr ? 'حياة فاخرة بذكاء اصطناعي' : 'AI-Powered Luxury Living'}
                </span>
              </div>
              
              <h1 className="font-serif text-5xl md:text-7xl leading-[1.1] tracking-tight text-white font-bold mb-6 drop-shadow-lg">
                {isAr ? (
                  <>استثمر في <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#E8D5A0] to-primary-muted font-normal italic">المستقبل</span></>
                ) : (
                  <>Invest in the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#E8D5A0] to-primary-muted font-normal italic">Future</span></>
                )}
              </h1>

              {/* HERO FILTER BAR */}
              <div className="w-full max-w-4xl mt-8 bg-surface/80 backdrop-blur-2xl border border-white/20 p-2 md:p-3 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-2">
                <div className="flex-1 flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 md:py-4">
                  <MapPin className="text-primary" size={20} />
                  <input type="text" placeholder={isAr ? "المنطقة (مثال: القاهرة الجديدة)" : "Location (e.g., New Cairo)"} className="bg-transparent text-white placeholder-white/50 text-sm w-full outline-none" />
                </div>
                <div className="flex-1 flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 md:py-4">
                  <HomeIcon className="text-primary" size={20} />
                  <select className="bg-transparent text-white/80 text-sm w-full outline-none appearance-none">
                    <option className="bg-navy">{isAr ? 'نوع العقار' : 'Property Type'}</option>
                    <option className="bg-navy">{isAr ? 'فيلا' : 'Villa'}</option>
                    <option className="bg-navy">{isAr ? 'شقة' : 'Apartment'}</option>
                  </select>
                </div>
                <button className="bg-primary hover:bg-primary-muted text-background font-bold text-sm px-8 py-3 md:py-4 rounded-xl transition-colors flex items-center justify-center gap-2">
                  <Search size={18} />
                  {isAr ? 'ابحث الآن' : 'Search Now'}
                </button>
              </div>
            </div>
          </section>

          {/* 2. REFINED MAP & EXPLORATION SECTION */}
          <section className="py-16 px-6 md:px-12 max-w-[1450px] mx-auto relative z-20">
            <div className="mb-10 text-center md:text-start">
              <h2 className="font-serif text-3xl font-bold text-foreground">
                {isAr ? 'اكتشف المواقع الاستراتيجية' : 'Explore Strategic Locations'}
              </h2>
              <p className="text-sm text-foreground/60 mt-2">
                {isAr ? 'تصفح العقارات المتاحة عبر خريطتنا التفاعلية الحية.' : 'Browse available assets via our live interactive map.'}
              </p>
            </div>
            <InteractiveCrmMap isArabic={isAr} />
          </section>

          {/* 3. WHAT COMES NEXT: VIRTUAL TOUR */}
          <section className="py-16 px-6 md:px-12 max-w-[1450px] mx-auto relative z-20 border-t border-border">
            <div className="mb-10 text-center">
              <span className="text-[10px] uppercase tracking-widest font-bold text-primary">
                {isAr ? 'الخطوة التالية' : 'What Comes Next'}
              </span>
              <h2 className="font-serif text-3xl font-bold text-foreground mt-2">
                {isAr ? 'جولات افتراضية غامرة' : 'Immersive Virtual Tours'}
              </h2>
            </div>
            <LuxuryVirtualViewport tourUrl="https://kuula.co/share/collection/7K_XG?logo=0&info=0&fs=1&vr=1&sd=1&thumbs=1" sbrCode="MVD-3F-110K" />
          </section>
        </>
      )}

      {/* 4. CAREERS / HIRING TAB */}
      {activeTab === 'careers' && (
        <section className="py-24 px-6 md:px-12 max-w-[800px] mx-auto min-h-screen relative z-20">
          <div className="text-center mb-12">
            <Briefcase size={40} className="text-primary mx-auto mb-4" />
            <h1 className="font-serif text-4xl font-bold text-foreground mb-4">
              {isAr ? 'انضم إلى فريق النخبة' : 'Join the Elite Team'}
            </h1>
            <p className="text-foreground/70 leading-relaxed">
              {isAr ? 'نحن نبحث دائماً عن مواهب استثنائية في مجالات المبيعات العقارية والتكنولوجيا.' : 'We are always looking for exceptional talent in Real Estate Sales and PropTech engineering.'}
            </p>
          </div>
          
          <div className="bg-surface border border-border p-8 rounded-3xl shadow-xl">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-foreground/60 uppercase mb-2">{isAr ? 'الاسم الكامل' : 'Full Name'}</label>
                  <input type="text" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:border-primary outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-foreground/60 uppercase mb-2">{isAr ? 'رقم الهاتف' : 'Phone Number'}</label>
                  <input type="tel" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:border-primary outline-none transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-foreground/60 uppercase mb-2">{isAr ? 'رابط السيرة الذاتية أو لينكد إن' : 'LinkedIn or Resume Link'}</label>
                <input type="url" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:border-primary outline-none transition-colors" />
              </div>
              <button className="w-full bg-primary hover:bg-primary-muted text-background font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl mt-4">
                {isAr ? 'تقديم الطلب' : 'Submit Application'}
              </button>
            </form>
          </div>
        </section>
      )}

      {/* TABS */}
      {activeTab === 'map' && <div className="pt-24 px-6 h-screen"><InteractiveCrmMap isArabic={isAr} /></div>}
      {activeTab === 'yields' && <div className="pt-32 text-center h-screen text-foreground/50">{isAr ? 'بيانات العوائد قريباً' : 'Yield Data Coming Soon'}</div>}
      {activeTab === 'console' && <div className="pt-32 text-center h-screen text-foreground/50">{isAr ? 'يرجى تسجيل الدخول' : 'Please Login to Console'}</div>}

      <MobileBottomNav currentTab={activeTab} setTab={setActiveTab} isArabic={isAr} />
    </div>
  );
}
