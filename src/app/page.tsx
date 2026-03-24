"use client";

import HeroLogo from "@/components/3d/HeroLogo";
import ScrollSection from "@/components/AboutFirm";
import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";

const Home = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#1C1C1E] flex flex-col items-center justify-center">
      {/* ── Background texture grid ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              rgba(255,255,255,0.015) 0px,
              rgba(255,255,255,0.015) 1px,
              transparent 1px,
              transparent 40px
            )
          `,
        }}
      />
      {/* ── Building silhouettes ── */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 flex items-end justify-around px-12">
        <div className="h-32 w-28 bg-white/[0.03] border-t border-white/[0.05]" />
        <div className="h-44 w-16 bg-white/[0.03] border-t border-white/[0.05]" />
        <div className="h-24 w-36 bg-white/[0.03] border-t border-white/[0.05]" />
        <div className="h-52 w-12 bg-white/[0.03] border-t border-white/[0.05]" />
        <div className="h-36 w-24 bg-white/[0.03] border-t border-white/[0.05]" />
        <div className="h-28 w-20 bg-white/[0.03] border-t border-white/[0.05]" />
      </div>
      {/* ── Main content ── */}
      <div
        className={`relative z-10 flex flex-col items-center gap-8 pt-5 text-center`}
      >
        {/* 3D Logo */}
        <HeroLogo />

        {/* Tagline */}
        <div className="flex flex-col items-center gap-4">
          <p className="font-mono text-xs md:text-xl lg:text-2xl uppercase tracking-[6px] text-[#08818d]">
            {t.home.eyebrow}
          </p>

          <h1
            className="text-5xl font-black uppercase leading-none text-white md:text-8xl lg:text-9xl"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {t.home.titleTop}
            <br />
            <span className="text-[#08818d]">{t.home.titleAccent}</span>
          </h1>

          <p className="text-xs md:text-xl font-light tracking-[2px] uppercase text-white/40">
            {t.home.subtitle}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link href="/projects">
            <button
              className="bg-[#08818d] px-3 md:px-12 py-4 text-sm md:text-xl font-bold uppercase tracking-[3px] text-white transition-all duration-200 hover:-translate-y-1 hover:bg-[#0a9c9f] active:translate-y-0"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
              }}
            >
              {t.home.explore}
            </button>
          </Link>
        </div>

        {/* Trust pills */}
        <div className="flex flex-wrap justify-center gap-6 pt-4 text-center">
          {[
            { num: "20+", label: t.home.years },
            { num: "500+", label: t.home.projects },
            { num: "100%", label: t.home.satisfaction },
          ].map(({ num, label }) => (
            <div key={label} className="flex flex-col items-center">
              <span
                className="text-2xl md:text-3xl font-black text-[#08818d]"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {num}
              </span>
              <span className="text-xs md:text-xl uppercase tracking-[3px] text-white/30">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* ── Scroll hint ── */}
      <div className="flex flex-col items-center pt-5.5">
        <span className="text-[10px] uppercase tracking-[4px] text-white/20">
          {t.home.scroll}
        </span>
        <div className="mt-5 h-10 w-[1px] bg-gradient-to-b from-[#08818d] to-transparent animate-bounce" />
      </div>
      <ScrollSection />
    </section>
  );
};

export default Home;
