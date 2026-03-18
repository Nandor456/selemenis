"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowUpRight } from "lucide-react";
import { PROJECTS, FILTERS } from "@/lib/projects";
import type { Filter } from "@/lib/projects";

// ── COMPONENT ─────────────────────────────────────────────
export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const filtered =
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.type === activeFilter);

  const featured = PROJECTS.find((p) => p.featured);

  return (
    <div className="min-h-screen bg-[#f5f0ea]">
      {/* ── HERO BANNER ── */}
      <div className="relative bg-[#08818d] overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              rgba(255,255,255,0.3) 0px, rgba(255,255,255,0.3) 1px,
              transparent 1px, transparent 36px
            )`,
          }}
        />
        <div className="pointer-events-none absolute -bottom-10 -right-10 h-72 w-72 rounded-full bg-white/10 blur-[80px]" />
        <div className="relative z-10 container mx-auto px-6 py-20 md:py-28">
          <p className="text-xs uppercase tracking-[5px] text-white/50 mb-3 font-semibold">
            Portfolio
          </p>
          <h1
            className="text-5xl md:text-7xl font-black uppercase tracking-wider text-white leading-none mb-4"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Our Projects
            <br />
            <span className="text-white/25">Built With Pride</span>
          </h1>
          <p className="text-white/60 text-sm tracking-widest uppercase max-w-md">
            {PROJECTS.length} completed projects across residential, commercial,
            and infrastructure.
          </p>
        </div>
      </div>

      {/* ── FEATURED PROJECT ── */}
      {featured && (
        <Link
          href={`/projects/${featured.id}`}
          className="relative w-full overflow-hidden cursor-pointer group block"
          style={{ minHeight: "340px" }}
        >
          {/* Hero image */}
          <Image
            src={featured.images[0]}
            alt={featured.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/55" />
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                repeating-linear-gradient(90deg, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 1px, transparent 1px, transparent 32px),
                repeating-linear-gradient(0deg, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 1px, transparent 1px, transparent 32px)
              `,
            }}
          />
          <div className="relative z-10 container mx-auto px-6 py-16 flex flex-col md:flex-row items-start md:items-center gap-10 justify-between">
            <div>
              <p className="text-xs uppercase tracking-[5px] text-[#08818d] mb-3 font-bold">
                ★ Featured Project
              </p>
              <h2
                className="text-4xl md:text-6xl font-black uppercase tracking-wider text-white leading-none mb-3"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {featured.name}
              </h2>
              <div className="flex items-center gap-2 text-white/40 text-xs uppercase tracking-widest mb-4">
                <MapPin size={12} />
                {featured.location}
                <span className="mx-2">·</span>
                {featured.type}
                <span className="mx-2">·</span>
                {featured.year}
              </div>
              <p className="text-white/60 text-sm max-w-xl leading-relaxed">
                {featured.description}
              </p>
            </div>
            {/* Stats */}
            <div className="flex gap-8 shrink-0">
              {[
                { label: "Area", value: featured.sqft },
                { label: "Duration", value: featured.duration },
                { label: "Year", value: String(featured.year) },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col items-center">
                  <span
                    className="text-3xl font-black text-white tracking-wider"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {value}
                  </span>
                  <span className="text-[10px] uppercase tracking-[3px] text-white/30 mt-1">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* Hover CTA */}
          <div className="absolute bottom-6 right-8 flex items-center gap-2 text-white/30 group-hover:text-[#08818d] transition-colors text-xs uppercase tracking-widest font-bold">
            View Details <ArrowUpRight size={14} />
          </div>
        </Link>
      )}

      {/* ── FILTER BAR ── */}
      <div className="sticky top-16 z-40 bg-[#1C1C1E] border-b border-white/5 shadow-md">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-none">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`shrink-0 px-5 py-2 text-xs font-bold uppercase tracking-[3px] transition-all duration-200 ${
                  activeFilter === f
                    ? "bg-[#08818d] text-white"
                    : "text-white/40 hover:text-white hover:bg-white/5"
                }`}
                style={
                  activeFilter === f
                    ? {
                        clipPath:
                          "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
                      }
                    : {}
                }
              >
                {f}
              </button>
            ))}
            <span className="ml-auto shrink-0 text-xs text-white/20 tracking-widest uppercase">
              {filtered.length} project{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>

      {/* ── PROJECTS GRID ── */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#ddd8d0]">
          {filtered.map((project, i) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className={`group relative cursor-pointer overflow-hidden bg-white block ${
                i === 0 && activeFilter === "All" ? "sm:col-span-2" : ""
              }`}
              style={{
                height: i === 0 && activeFilter === "All" ? "380px" : "260px",
              }}
            >
              {/* Project image */}
              <Image
                src={project.images[0]}
                alt={project.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Subtle dark base so text is always legible */}
              <div className="absolute inset-0 bg-black/20" />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#08818d]/90 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-xs uppercase tracking-[4px] text-white/60 mb-1">
                  {project.type} · {project.year}
                </p>
                <h3
                  className="text-2xl font-black uppercase tracking-wider text-white mb-1"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {project.name}
                </h3>
                <div className="flex items-center gap-1 text-white/60 text-xs mb-3">
                  <MapPin size={11} /> {project.location}
                </div>
                <div className="flex gap-2 flex-wrap">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-white/15 text-white text-[10px] uppercase tracking-widest"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-1 text-white font-bold text-xs uppercase tracking-widest">
                  View Details <ArrowUpRight size={13} />
                </div>
              </div>

              {/* Bottom label (visible when not hovered) */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 group-hover:opacity-0 transition-opacity duration-200">
                <p className="text-[10px] uppercase tracking-[3px] text-white/50">
                  {project.type}
                </p>
                <p
                  className="text-lg font-black uppercase tracking-wide text-white"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {project.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── CTA BANNER ── */}
      <div className="relative bg-[#1C1C1E] overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-5"
          aria-hidden
        >
          <span
            className="text-[200px] font-black uppercase tracking-widest text-white whitespace-nowrap"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            BUILD
          </span>
        </div>
        <div className="relative z-10 container mx-auto px-6 py-20 flex flex-col items-center text-center gap-6">
          <p className="text-xs uppercase tracking-[5px] text-[#08818d] font-semibold">
            Start Your Project
          </p>
          <h2
            className="text-4xl md:text-6xl font-black uppercase tracking-wider text-white leading-none"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Have a Project
            <br />
            <span className="text-white/25">In Mind?</span>
          </h2>
          <p className="text-white/40 text-sm tracking-widest uppercase max-w-sm">
            Let&apos;s build something you&apos;ll be proud of. We respond
            within 24 hours.
          </p>
          <Link
            href="/contact"
            className="mt-2 bg-[#08818d] text-white px-12 py-4 text-xs font-bold uppercase tracking-[4px] transition-all duration-200 hover:bg-[#067580] hover:-translate-y-px"
            style={{
              clipPath:
                "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
            }}
          >
            Contact Us Today
          </Link>
        </div>
      </div>
    </div>
  );
}
