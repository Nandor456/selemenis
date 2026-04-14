"use client";

import HeroLogo from "@/components/3d/HeroLogo";
import ScrollSection from "@/components/AboutFirm";
import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";
import Beams from "@/components/Beams";
import ShinyText from "@/components/ShinyText";
import { useEffect, useState } from "react";

const Home = () => {
  const { t } = useLanguage();

  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const checkSize = () => setIsSmall(window.innerWidth < 640); // Tailwind sm breakpoint
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#1C1C1E] flex flex-col items-center justify-center py-6 md:py-0">
      {/* ── Background texture grid ── */}
      <div className="hero-fade-in absolute inset-0 z-0">
        <Beams
          beamWidth={isSmall ? 0.2 : 0.5}
          beamHeight={15}
          beamNumber={12}
          lightColor="#08818d"
          speed={1}
          noiseIntensity={1}
          scale={0.2}
          rotation={0}
        />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center gap-5 px-4 md:gap-8 md:px-6 pt-2 md:pt-5 text-center">
        {/* 3D Logo */}
        <HeroLogo />

        {/* Tagline */}
        <div className="flex w-full flex-col items-center gap-3 md:gap-4 px-2">
          <p className="font-mono text-[10px] sm:text-xs md:text-xl lg:text-2xl uppercase tracking-[3px] md:tracking-[6px] text-[#08818d]">
            {t.home.eyebrow}
          </p>

          <h1
            className="flex flex-col gap-1 md:gap-2 text-4xl sm:text-5xl md:text-8xl lg:text-9xl font-black uppercase leading-[0.95] md:leading-none tracking-wider text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {t.home.titleTop}
            <ShinyText
              text={t.home.titleAccent}
              speed={4}
              delay={0}
              color="#08818d"
              shineColor="#ffffff"
              spread={20}
              direction="left"
              yoyo={false}
              pauseOnHover={false}
              disabled={false}
            />
          </h1>

          <p className="max-w-xs md:max-w-none text-[10px] sm:text-xs md:text-xl font-light tracking-[1.5px] md:tracking-[2px] uppercase text-white/40">
            {t.home.subtitle}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-1 md:pt-2">
          <Link href="/projects">
            <button
              className="group/btn relative overflow-hidden px-8 md:px-12 py-3 md:py-4 text-xs md:text-xl font-bold uppercase tracking-[2px] md:tracking-[3px] text-white transition-all duration-300 hover:-translate-y-1 active:translate-y-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(8,129,141,0.25) 0%, rgba(10,163,176,0.15) 100%)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(8,129,141,0.35)",
                boxShadow:
                  "0 0 20px rgba(8,129,141,0.15), inset 0 1px 0 rgba(255,255,255,0.08)",
                clipPath:
                  "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
              }}
            >
              {/* Shimmer sweep on hover */}
              <div
                className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.14) 50%, transparent 70%)",
                }}
              />
              {/* Top edge highlight */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-[1px]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
                }}
              />
              <span className="relative z-10 drop-shadow-[0_0_8px_rgba(8,129,141,0.5)]">
                {t.home.explore}
              </span>
            </button>
          </Link>
        </div>
      </div>
      <div className="w-full my-4 md:my-8" />
      <ScrollSection />
    </section>
  );
};

export default Home;
