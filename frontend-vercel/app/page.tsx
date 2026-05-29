"use client";

import React, { useState } from "react";
import HeroFilter from "@/components/HeroFilter";
import { formatPrice } from "@/lib/business-rules";

// ═══════════════════════════════════════════════════════════
//  SIERRA ESTATES — Landing Page
//  i:Sierra 2027 | Quiet Luxury | New Cairo Properties
// ═══════════════════════════════════════════════════════════

interface FilterState {
  propertyType: string;
  viewPreference: string;
  priceTier: string;
  furnishing: string;
}

export default function HomePage() {
  const [activeFilters, setActiveFilters] = useState<FilterState | null>(null);

  return (
    <main className="min-h-screen bg-[#0A1628]">
      {/* ── Navbar ────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#0A1628]/90 border-b border-[#C9A24D]/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C9A24D] to-[#B8912F] flex items-center justify-center">
              <span className="text-[#0A1628] font-bold text-sm" style={{ fontFamily: "Inter" }}>
                SE
              </span>
            </div>
            <div>
              <h1
                className="text-lg font-medium text-[#F4F0E8] tracking-wide"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Sierra Estates
              </h1>
              <p className="text-[9px] text-[#C9A24D]/60 uppercase tracking-[0.3em]"
                 style={{ fontFamily: "Inter" }}>
                Best-in-Class Design
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <a href="#properties" className="text-xs text-[#F4F0E8]/60 hover:text-[#C9A24D] transition-colors"
               style={{ fontFamily: "Inter" }}>
              Properties
            </a>
            <a href="#about" className="text-xs text-[#F4F0E8]/60 hover:text-[#C9A24D] transition-colors"
               style={{ fontFamily: "Inter" }}>
              About
            </a>
            <a href="#contact" className="text-xs text-[#F4F0E8]/60 hover:text-[#C9A24D] transition-colors"
               style={{ fontFamily: "Inter" }}>
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ──────────────────────────────────────── */}
      <section className="pt-28 pb-12 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[#C9A24D] text-xs font-semibold uppercase tracking-[0.35em] mb-4"
             style={{ fontFamily: "Inter" }}>
            Exclusive Collection
          </p>
          <h2
            className="text-4xl md:text-6xl font-light text-[#F4F0E8] leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            The First Exclusive Destination
            <br />
            for <span className="text-[#C9A24D] font-medium">New Cairo Properties</span>
          </h2>
          <p className="text-sm text-[#F4F0E8]/40 mt-4 max-w-xl mx-auto" style={{ fontFamily: "Inter" }}>
            Rent &amp; Resale &middot; AI-Driven Excellence &middot; 1,500+ Elite Brokers
          </p>
        </div>
      </section>

      {/* ── Hero Filter ───────────────────────────────── */}
      <section className="px-6 pb-16">
        <HeroFilter
          onFilter={(filters) => {
            setActiveFilters(filters);
            console.log("[Sierra Estates] Filters applied:", filters);
          }}
          onAIMatch={(filters) => {
            setActiveFilters(filters);
            console.log("[Sierra Estates] AI Match requested:", filters);
          }}
        />
      </section>

      {/* ── Properties Grid Placeholder ───────────────── */}
      <section id="properties" className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3
                className="text-2xl font-light text-[#F4F0E8]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Featured Properties
              </h3>
              <p className="text-xs text-[#F4F0E8]/40 mt-1" style={{ fontFamily: "Inter" }}>
                {activeFilters
                  ? `Filtered: ${activeFilters.propertyType} · ${activeFilters.priceTier}`
                  : "Curated from our exclusive network"}
              </p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-xs bg-[#C9A24D] text-[#0A1628] font-semibold rounded-lg"
                      style={{ fontFamily: "Inter" }}>
                Rent
              </button>
              <button className="px-4 py-2 text-xs bg-white/[0.04] text-[#F4F0E8]/60 border border-white/[0.06] rounded-lg hover:bg-white/[0.08] transition-colors"
                      style={{ fontFamily: "Inter" }}>
                Resale
              </button>
            </div>
          </div>

          {/* Property cards — will be populated from Firestore */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="group bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden hover:border-[#C9A24D]/20 transition-all duration-300"
              >
                <div className="h-48 bg-gradient-to-br from-[#0E1D35] to-[#162A45] flex items-center justify-center">
                  <span className="text-[#F4F0E8]/20 text-sm" style={{ fontFamily: "Inter" }}>
                    Property Image
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[9px] font-mono text-[#C9A24D]/60">
                      MIV-{i}F-1.{i}K
                    </span>
                    {i === 1 && <span className="value-badge">HIGH VALUE</span>}
                  </div>
                  <h4 className="text-sm font-medium text-[#F4F0E8]/90" style={{ fontFamily: "Inter" }}>
                    {i}-Bedroom Apartment, Mivida
                  </h4>
                  <p className="text-xs text-[#F4F0E8]/40 mt-1" style={{ fontFamily: "Inter" }}>
                    Golf View &middot; Furnished &middot; 150m&sup2;
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-lg font-semibold text-[#C9A24D]" style={{ fontFamily: "Inter" }}>
                      {formatPrice(1600 * i)}
                    </span>
                    <span className="text-[10px] text-[#F4F0E8]/30" style={{ fontFamily: "Inter" }}>
                      /month
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ─────────────────────────────────────── */}
      <section id="about" className="px-6 py-20 border-t border-white/[0.04]">
        <div className="max-w-3xl mx-auto text-center">
          <h3
            className="text-2xl font-light text-[#F4F0E8] mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            About <span className="text-[#C9A24D]">Sierra Estates</span>
          </h3>
          <p className="text-sm text-[#F4F0E8]/60 leading-relaxed" style={{ fontFamily: "Inter" }}>
            We curate the finest opportunities across the New Cairo market. By combining
            advanced AI intelligence with an exclusive network of over 1,500 elite brokers
            and agencies across New Cairo, Madinaty, and El Shorouk, we deliver unmatched
            value tailored precisely to your needs. Smarter decisions, powered by intelligence.
          </p>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────── */}
      <footer id="contact" className="px-6 py-12 bg-[#060E1A] border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-xs text-[#F4F0E8]/60" style={{ fontFamily: "Inter" }}>
              &copy; {new Date().getFullYear()} Sierra Estates. All rights reserved.
            </p>
            <p className="text-[10px] text-[#F4F0E8]/30 mt-1" style={{ fontFamily: "Inter" }}>
              Best-in-Class Design. AI-Driven Excellence.
            </p>
          </div>
          <div className="flex gap-6">
            <a href="https://wa.me/201061399688" target="_blank" rel="noopener noreferrer"
               className="text-xs text-[#F4F0E8]/40 hover:text-[#C9A24D] transition-colors"
               style={{ fontFamily: "Inter" }}>
              WhatsApp
            </a>
            <a href="https://t.me/Sierrablurealtybot" target="_blank" rel="noopener noreferrer"
               className="text-xs text-[#F4F0E8]/40 hover:text-[#C9A24D] transition-colors"
               style={{ fontFamily: "Inter" }}>
              Telegram
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
