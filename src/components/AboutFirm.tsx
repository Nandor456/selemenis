"use client";

import { useEffect, useRef, useState, RefObject } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Stat {
  value: string;
  label: string;
}

interface Project {
  category: string;
  title: string;
  description: string;
  image: string;
  stats?: Stat[];
}

// ─── Hook: fires once when element enters viewport ───────────────────────────
function useInView(threshold = 0.25): [RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible];
}

// ─── Single project row ───────────────────────────────────────────────────────
interface ProjectRowProps {
  item: Project;
  index: number;
}

const ProjectRow = ({ item, index }: ProjectRowProps) => {
  const isEven = index % 2 === 0;
  const [ref, visible] = useInView(0.2);

  return (
    <div
      ref={ref}
      className="relative flex flex-col md:flex-row items-stretch min-h-[480px] overflow-hidden"
      style={{ flexDirection: isEven ? "row" : "row-reverse" }}
    >
      {/* ── Image panel ── */}
      <div
        className="relative w-full md:w-1/2 min-h-[300px] md:min-h-0 overflow-hidden"
        style={{
          transform: visible
            ? "translateX(0)"
            : isEven
              ? "translateX(-80px)"
              : "translateX(80px)",
          opacity: visible ? 1 : 0,
          transition:
            "transform 0.85s cubic-bezier(0.16,1,0.3,1), opacity 0.85s ease",
        }}
      >
        {/* Replace src with your actual image */}
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover"
          style={{ minHeight: "300px" }}
        />

        {/* Diagonal overlay edge */}
        <div
          className="pointer-events-none absolute inset-y-0 hidden md:block"
          style={{
            [isEven ? "right" : "left"]: "-1px",
            width: "80px",
            background: isEven
              ? "linear-gradient(to right, transparent, #1C1C1E)"
              : "linear-gradient(to left, transparent, #1C1C1E)",
          }}
        />

        {/* Number badge */}
        <div
          className="absolute top-6 flex items-center justify-center"
          style={{ [isEven ? "right" : "left"]: "24px" }}
        >
          <span
            className="text-6xl font-black text-white/[0.06] select-none"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* ── Text panel ── */}
      <div
        className="relative w-full md:w-1/2 flex flex-col justify-center px-10 py-14 md:py-0 md:px-16 bg-[#1C1C1E]"
        style={{
          transform: visible
            ? "translateX(0)"
            : isEven
              ? "translateX(60px)"
              : "translateX(-60px)",
          opacity: visible ? 1 : 0,
          transition:
            "transform 0.85s cubic-bezier(0.16,1,0.3,1) 0.1s, opacity 0.85s ease 0.1s",
        }}
      >
        {/* Thin teal line accent */}
        <div className="mb-6 h-[2px] w-12 bg-[#08818d]" />

        <p className="mb-2 font-mono text-[10px] uppercase tracking-[5px] text-[#08818d]">
          {item.category}
        </p>

        <h2
          className="mb-5 text-4xl md:text-5xl font-black uppercase leading-none tracking-widest text-white"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          {item.title}
        </h2>

        <p className="mb-8 max-w-sm text-sm leading-relaxed tracking-wide text-white/50">
          {item.description}
        </p>

        {/* Stats row */}
        {item.stats && (
          <div className="flex gap-8 mb-8">
            {item.stats.map((s) => (
              <div key={s.label} className="flex flex-col">
                <span
                  className="text-2xl font-black text-[#08818d]"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {s.value}
                </span>
                <span className="text-[9px] uppercase tracking-[3px] text-white/30">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        )}

        <button
          className="self-start border border-white/20 px-8 py-3 text-xs font-bold uppercase tracking-[3px] text-white/60 transition-all duration-200 hover:-translate-y-1 hover:border-[#08818d] hover:text-[#08818d] active:translate-y-0"
          style={{
            clipPath:
              "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
          }}
        >
          View Project
        </button>

        {/* Background grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              rgba(255,255,255,0.012) 0px,
              rgba(255,255,255,0.012) 1px,
              transparent 1px,
              transparent 40px
            )`,
          }}
        />
      </div>
    </div>
  );
};

// ─── Section header ───────────────────────────────────────────────────────────
const SectionHeader = () => {
  const [ref, visible] = useInView(0.3);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center py-24 px-6 text-center"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      <p className="mb-4 font-mono text-[10px] uppercase tracking-[6px] text-[#08818d]">
        Our Portfolio
      </p>
      <h2
        className="mb-4 text-6xl md:text-8xl font-black uppercase leading-none tracking-widest text-white"
        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
      >
        Featured
        <br />
        <span className="text-[#08818d]">Projects</span>
      </h2>
      <div className="mt-4 flex items-center gap-4">
        <div className="h-[1px] w-16 bg-white/10" />
        <p className="text-xs uppercase tracking-[4px] text-white/30">
          Built with precision
        </p>
        <div className="h-[1px] w-16 bg-white/10" />
      </div>
    </div>
  );
};

// ─── Divider ─────────────────────────────────────────────────────────────────
const Divider = () => (
  <div className="flex items-center justify-center px-12 py-2">
    <div className="h-[1px] flex-1 bg-white/[0.04]" />
    <div className="mx-4 h-1 w-1 rotate-45 bg-[#08818d]/40" />
    <div className="h-[1px] flex-1 bg-white/[0.04]" />
  </div>
);

// ─── Sample data — swap `image` URLs with your actual photos ─────────────────
const PROJECTS: Project[] = [
  {
    category: "Commercial · 2023",
    title: "Skyline Office Tower",
    description:
      "A 24-story commercial complex designed for modern enterprise. Featuring floor-to-ceiling glazing, seismic-rated steel frame, and LEED Platinum certification. Completed 3 weeks ahead of schedule.",
    image: "/images/project-1.jpg", // ← replace with your image
    stats: [
      { value: "24", label: "Floors" },
      { value: "18mo", label: "Duration" },
      { value: "$42M", label: "Value" },
    ],
  },
  {
    category: "Residential · 2022",
    title: "Riverside Luxury Villas",
    description:
      "An exclusive gated community of 40 premium villas along the riverfront. Custom stone facades, heated floors, smart-home integration, and private docking for each unit.",
    image: "/images/project-2.jpg", // ← replace with your image
    stats: [
      { value: "40", label: "Units" },
      { value: "22mo", label: "Duration" },
      { value: "$28M", label: "Value" },
    ],
  },
  {
    category: "Infrastructure · 2023",
    title: "Central Bridge Overpass",
    description:
      "A 380-meter dual-carriageway bridge connecting two urban districts. Post-tensioned concrete construction with integrated pedestrian walkways and architectural night lighting.",
    image: "/images/project-3.jpg", // ← replace with your image
    stats: [
      { value: "380m", label: "Span" },
      { value: "14mo", label: "Duration" },
      { value: "$19M", label: "Value" },
    ],
  },
  {
    category: "Industrial · 2024",
    title: "Harbor Logistics Hub",
    description:
      "A 60,000 sq ft warehouse and distribution complex with 12 loading docks, reinforced flooring rated at 10 tons per sqm, and a fully automated inventory rail system.",
    image: "/images/project-4.jpg", // ← replace with your image
    stats: [
      { value: "60K", label: "Sq Ft" },
      { value: "10mo", label: "Duration" },
      { value: "$14M", label: "Value" },
    ],
  },
];

// ─── Bottom CTA ───────────────────────────────────────────────────────────────
const CtaBand = () => {
  const [ref, visible] = useInView(0.3);

  return (
    <div
      ref={ref}
      className="relative mt-8 flex flex-col items-center gap-6 overflow-hidden border-t border-white/[0.04] px-6 py-24 text-center"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
      }}
    >
      <p className="font-mono text-[10px] uppercase tracking-[6px] text-[#08818d]">
        Ready to Build?
      </p>
      <h3
        className="text-5xl md:text-7xl font-black uppercase leading-none tracking-widest text-white"
        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
      >
        Let's Start Your
        <br />
        <span className="text-[#08818d]">Next Project</span>
      </h3>
      <p className="max-w-md text-sm font-light tracking-[2px] uppercase text-white/30">
        Free consultation · On-site assessment · Detailed quote within 48 hours
      </p>
      <button
        className="mt-2 bg-[#08818d] px-12 py-5 text-sm font-bold uppercase tracking-[3px] text-white transition-all duration-200 hover:-translate-y-1 hover:bg-[#0a9c9f] active:translate-y-0"
        style={{
          clipPath:
            "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
        }}
      >
        Contact Us Today
      </button>
    </div>
  );
};

// ─── Main exported section ────────────────────────────────────────────────────
const ScrollSection = () => {
  return (
    <section className="bg-[#1C1C1E] w-full">
      <SectionHeader />

      {PROJECTS.map((item, i) => (
        <div key={item.title}>
          <ProjectRow item={item} index={i} />
          {i < PROJECTS.length - 1 && <Divider />}
        </div>
      ))}

      <CtaBand />
    </section>
  );
};

export default ScrollSection;
