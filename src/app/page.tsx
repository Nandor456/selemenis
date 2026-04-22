"use client";

import HeroLogo from "@/components/3d/HeroLogo";
import ScrollSection from "@/components/AboutFirm";
import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";
import ShinyText from "@/components/ShinyText";
import { useEffect, useState } from "react";
import { HexagonBackground } from "@/components/ui/hexagon";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fadeUp: any = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.13,
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const Home = () => {
  const { t } = useLanguage();

  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const checkSize = () => setIsSmall(window.innerWidth < 640);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  return (
    <>
      <section className="relative min-h-[100svh] w-full overflow-hidden bg-[#1C1C1E] flex flex-col items-center justify-center py-6 md:py-0">
        {/* ── Background texture grid ── */}
        <div className="hero-fade-in absolute inset-0 z-0">
          <HexagonBackground
            glowColor="rgba(8,129,141,0.55)"
            borderColor="rgba(8,129,141,0.12)"
          />
        </div>

        {/* ── Ambient central glow ── */}
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 48%, rgba(8,129,141,0.07) 0%, transparent 70%)",
          }}
        />

        {/* ── Main content ── */}
        <div className="pointer-events-none relative z-10 flex w-full max-w-5xl flex-col items-center gap-5 px-4 md:gap-8 md:px-6 pt-2 md:pt-5 text-center">
          {/* 3D Logo */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <HeroLogo />
          </motion.div>

          {/* Tagline */}
          <div className="flex w-full flex-col items-center gap-3 md:gap-4 px-2">
            {/* Eyebrow badge */}
            <motion.div
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              <div className="inline-flex items-center gap-2.5 rounded-full border border-[#08818d]/30 bg-[#08818d]/8 px-3.5 py-1.5 backdrop-blur-sm">
                <span className="relative flex h-1.5 w-1.5 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#08818d] opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#08818d]" />
                </span>
                <p className="font-mono text-[10px] sm:text-xs md:text-[13px] uppercase tracking-[3px] md:tracking-[5px] text-[#08818d]">
                  {t.home.eyebrow}
                </p>
              </div>
            </motion.div>

            <motion.h1
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex flex-col gap-1 md:gap-2 text-4xl sm:text-5xl md:text-8xl font-black uppercase leading-[0.95] md:leading-none tracking-wider text-white"
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
            </motion.h1>

            <motion.p
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="max-w-xs md:max-w-none text-[10px] sm:text-xs md:text-xl font-light tracking-[1.5px] md:tracking-[2px] uppercase text-white/40"
            >
              {t.home.subtitle}
            </motion.p>
          </div>

          {/* CTA Buttons */}
          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="pointer-events-auto flex flex-wrap items-center justify-center gap-4 pt-1 md:pt-2"
          >
            <Link href="/projects">
              <button
                className="group/btn relative overflow-hidden px-8 md:px-12 py-3 md:py-4 text-xs md:text-xl font-bold uppercase tracking-[2px] md:tracking-[3px] text-white transition-all duration-300 hover:-translate-y-1 active:translate-y-0 cursor-pointer"
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
          </motion.div>
        </div>

        {/* ── Scroll indicator ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5"
        >
          <span className="font-mono text-[9px] uppercase tracking-[4px] text-white/20">
            {t.home.scroll}
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-4 w-4 text-[#08818d]/50" />
          </motion.div>
        </motion.div>
      </section>
      <ScrollSection />
    </>
  );
};

export default Home;
