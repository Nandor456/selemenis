"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowUpRight, Star } from "lucide-react";
import { PROJECTS, FILTERS } from "@/lib/projects";
import type { Filter } from "@/lib/projects";
import { useLanguage } from "@/components/providers/LanguageProvider";

const ACCENT = "#08818d";

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const { t } = useLanguage();

  const filterLabel: Record<Filter, string> = {
    All: t.projectsPage.filterAll,
    Residential: t.projectsPage.filterResidential,
    Commercial: t.projectsPage.filterCommercial,
    Renovation: t.projectsPage.filterRenovation,
    Infrastructure: t.projectsPage.filterInfrastructure,
  };

  const typeLabel: Record<Exclude<Filter, "All">, string> = {
    Residential: t.projectsPage.typeResidential,
    Commercial: t.projectsPage.typeCommercial,
    Renovation: t.projectsPage.typeRenovation,
    Infrastructure: t.projectsPage.typeInfrastructure,
  };

  const filtered =
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.type === activeFilter);

  const featured = PROJECTS.find((p) => p.featured);

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        {/* Accent glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-40 h-125 w-125 rounded-full blur-[140px] opacity-25"
          style={{ backgroundColor: ACCENT }}
        />
        {/* Grid texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(90deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 80px),
              repeating-linear-gradient(0deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 80px)
            `,
          }}
        />

        <div className="relative z-10 container mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-24">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-[#08818d]" />
            <p className="text-[10px] md:text-[11px] uppercase tracking-[5px] md:tracking-[6px] font-bold text-[#08818d]">
              {t.projectsPage.portfolio}
            </p>
          </div>

          <h1
            className="text-5xl md:text-8xl lg:text-9xl font-black uppercase tracking-wider text-white leading-[0.9]"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {t.projectsPage.titleTop}
            <br />
            <span className="text-white/25">{t.projectsPage.titleAccent}</span>
          </h1>

          <div className="mt-8">
            <span
              className="inline-flex items-center px-4 py-2 text-[10px] md:text-[11px] uppercase tracking-[4px] font-bold backdrop-blur-md bg-white/5 border border-white/10 text-white/70"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
              }}
            >
              <span className="text-[#08818d] mr-2 font-black">
                {PROJECTS.length.toString().padStart(2, "0")}
              </span>
              {t.projectsPage.subtitle}
            </span>
          </div>
        </div>
      </section>

      {/* ── FEATURED PROJECT ── */}
      {featured && (
        <Link
          href={`/projects/${featured.id}`}
          className="relative block w-full overflow-hidden group"
          style={{ minHeight: "460px" }}
        >
          <Image
            src={featured.images[0]}
            alt={featured.name}
            fill
            sizes="100vw"
            quality={90}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />

          <div className="absolute inset-0 bg-linear-to-b from-[#0a0a0b]/50 via-[#0a0a0b]/70 to-[#0a0a0b]" />
          <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0b]/80 via-transparent to-transparent" />

          {/* Grid overlay */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `
                repeating-linear-gradient(90deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 60px),
                repeating-linear-gradient(0deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 60px)
              `,
            }}
          />

          {/* Accent glow bottom */}
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full blur-[120px] opacity-20"
            style={{ backgroundColor: ACCENT }}
          />

          <div className="relative z-10 container mx-auto px-6 py-16 md:py-20 flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-10 bg-[#08818d]" />
                <span className="inline-flex items-center gap-2 px-3 py-1.5 text-[10px] uppercase tracking-[4px] font-bold backdrop-blur-md bg-[#08818d]/15 border border-[#08818d]/40 text-[#2dd4bf]">
                  <Star
                    size={11}
                    className="fill-[#2dd4bf] text-[#2dd4bf]"
                    aria-hidden
                  />
                  {t.projectsPage.featured}
                </span>
              </div>
              <h2
                className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-wider text-white leading-[0.9] mb-5"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {featured.name}
              </h2>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-white/50 text-[10px] md:text-[11px] uppercase tracking-[3px] mb-5">
                <span className="flex items-center gap-1.5">
                  <MapPin size={12} className="text-[#08818d]" aria-hidden />
                  {featured.location}
                </span>
                <span className="text-white/20">·</span>
                <span>{typeLabel[featured.type]}</span>
                <span className="text-white/20">·</span>
                <span>{featured.year}</span>
              </div>
              <p className="text-white/60 text-sm md:text-base max-w-xl leading-relaxed">
                {featured.description}
              </p>
            </div>

            <div className="flex gap-3 md:gap-4">
              {[
                { label: t.projectsPage.area, value: featured.sqft },
                { label: t.projectsPage.duration, value: featured.duration },
                { label: t.projectsPage.year, value: String(featured.year) },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="relative overflow-hidden backdrop-blur-xl bg-white/5 border border-white/10 px-3 md:px-6 py-3 md:py-5 min-w-20 md:min-w-25 text-center"
                  style={{
                    clipPath:
                      "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                  }}
                >
                  <p
                    className="text-xl md:text-3xl font-black text-white tracking-wider"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {value}
                  </p>
                  <p className="text-[8px] md:text-[9px] uppercase tracking-[2px] md:tracking-[3px] text-white/40 mt-1">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Hover CTA */}
          <div className="absolute bottom-5 right-6 md:right-10 z-10 flex items-center gap-2 text-white/40 group-hover:text-[#2dd4bf] transition-colors text-[10px] uppercase tracking-[4px] font-bold">
            {t.projectsPage.viewDetails}
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </div>
        </Link>
      )}

      {/* ── FILTER BAR ── */}
      <div className="sticky top-16 z-40 bg-[#0d0d0f]/85 backdrop-blur-xl border-y border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-none">
            {FILTERS.map((f) => {
              const active = activeFilter === f;
              return (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`shrink-0 px-5 py-2.5 text-[10px] md:text-[11px] font-bold uppercase tracking-[3px] transition-all duration-300 border ${
                    active
                      ? "bg-[#08818d] text-white border-[#08818d] shadow-[0_0_25px_rgba(8,129,141,0.35)]"
                      : "text-white/50 hover:text-white bg-white/2 border-white/10 hover:bg-white/5 hover:border-[#08818d]/40"
                  }`}
                  style={{
                    clipPath:
                      "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
                  }}
                >
                  {filterLabel[f]}
                </button>
              );
            })}
            <span className="ml-auto shrink-0 text-[10px] text-white/30 tracking-[3px] uppercase font-bold">
              <span className="text-[#08818d] font-black">
                {filtered.length.toString().padStart(2, "0")}
              </span>{" "}
              {filtered.length !== 1
                ? t.projectsPage.projectCountPlural
                : t.projectsPage.projectCountSingular}
            </span>
          </div>
        </div>
      </div>

      {/* ── PROJECTS GRID ── */}
      <div className="container mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {filtered.map((project, i) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className={`group relative cursor-pointer overflow-hidden block border border-white/10 hover:border-[#08818d]/60 transition-all duration-500 bg-[#0d0d0f] ${
                i === 0 && activeFilter === "All" ? "sm:col-span-2" : ""
              }`}
              style={{
                height:
                  (i === 0 || i === 1) && activeFilter === "All"
                    ? "440px"
                    : "320px",
                clipPath:
                  "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
              }}
            >
              <Image
                src={project.images[0]}
                alt={project.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                quality={90}
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0b] via-[#0a0a0b]/55 to-transparent" />
              <div className="absolute inset-0 bg-[#08818d]/0 group-hover:bg-[#08818d]/15 transition-colors duration-500" />

              {/* Project number */}
              <div className="absolute top-5 left-5 z-10 flex items-center gap-2">
                <span className="font-mono text-[9px] tracking-[3px] text-[#08818d] font-bold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="h-px w-6 bg-[#08818d]/60" />
              </div>

              {/* Type badge */}
              <div className="absolute top-5 right-5 z-10">
                <span className="inline-flex px-2.5 py-1 text-[9px] uppercase tracking-[3px] font-bold backdrop-blur-md bg-white/5 border border-white/15 text-white/70 group-hover:bg-[#08818d]/20 group-hover:border-[#08818d]/40 group-hover:text-[#2dd4bf] transition-colors duration-500">
                  {typeLabel[project.type]}
                </span>
              </div>

              {/* Card content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-10">
                <h3
                  className="text-2xl md:text-3xl font-black uppercase tracking-wide text-white leading-[0.95] mb-2"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {project.name}
                </h3>
                <div className="flex items-center gap-1.5 text-white/50 text-[10px] uppercase tracking-[3px] mb-0 group-hover:mb-4 transition-[margin] duration-500">
                  <MapPin size={11} className="text-[#08818d]" aria-hidden />
                  {project.location}
                  <span className="text-white/20 mx-1">·</span>
                  {project.year}
                </div>

                {/* Hover-revealed details */}
                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                  <div className="overflow-hidden">
                    <div className="flex gap-1.5 flex-wrap mb-3">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-[9px] uppercase tracking-[2px] backdrop-blur-md bg-[#08818d]/20 border border-[#08818d]/30 text-[#2dd4bf] font-bold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="inline-flex items-center gap-2 text-[#2dd4bf] text-[10px] uppercase tracking-[3px] font-bold">
                      {t.projectsPage.viewDetails}
                      <ArrowUpRight
                        size={12}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Corner accent triangle */}
              <span
                aria-hidden
                className="absolute top-0 right-0 w-0 h-0 border-t-24 border-t-[#08818d] border-l-24 border-l-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <span className="font-mono text-[10px] tracking-[4px] text-[#08818d]/60 mb-3">
              00
            </span>
            <p className="text-white/40 text-sm uppercase tracking-[3px]">
              {t.projectsPage.projectCountPlural}
            </p>
          </div>
        )}
      </div>

      {/* ── FOOTER CTA ── */}
      <section className="relative bg-linear-to-b from-[#0a0a0b] to-[#0d0d0f] overflow-hidden border-t border-white/5">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.04] overflow-hidden"
        >
          <span
            className="font-black uppercase tracking-widest text-white whitespace-nowrap"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(160px, 30vw, 320px)",
              lineHeight: 1,
            }}
          >
            BUILD
          </span>
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 left-1/2 -translate-x-1/2 h-96 w-[60%] rounded-full blur-[120px] opacity-20"
          style={{ backgroundColor: ACCENT }}
        />

        <div className="relative z-10 container mx-auto px-6 py-20 md:py-28 flex flex-col items-center text-center gap-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="h-px w-10 bg-[#08818d]" />
            <p className="text-xs uppercase tracking-[5px] font-bold text-[#08818d]">
              {t.projectsPage.startProject}
            </p>
            <span className="h-px w-10 bg-[#08818d]" />
          </div>

          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-wider text-white leading-[0.9]"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {t.projectsPage.haveProject}
            <br />
            <span className="text-white/25">{t.projectsPage.inMind}</span>
          </h2>

          <p className="text-white/40 text-sm tracking-widest uppercase max-w-sm">
            {t.projectsPage.ctaDescription}
          </p>

          <Link
            href="/contact"
            className="group relative mt-4 inline-flex items-center gap-3 px-10 md:px-14 py-4 md:py-5 text-xs md:text-sm font-bold uppercase tracking-[4px] text-white overflow-hidden transition-transform duration-300 hover:-translate-y-1"
            style={{
              background: `linear-gradient(135deg, ${ACCENT}, #0aa3b0)`,
              clipPath:
                "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
              boxShadow: "0 0 40px rgba(8,129,141,0.25)",
            }}
          >
            <span
              aria-hidden
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background:
                  "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.25) 50%, transparent 65%)",
              }}
            />
            <span className="relative">{t.projectsPage.ctaButton}</span>
            <ArrowUpRight
              size={16}
              className="relative transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </Link>
        </div>
      </section>
    </div>
  );
}
