"use client";

import { useEffect, useRef, useState, RefObject } from "react";

interface Project {
  title: string;
  description: string;
  image: string;
}

// ─── Hook: fires once when element enters viewport ───────────────────────────
function useInView(
  threshold = 0.25,
): [RefObject<HTMLDivElement | null>, boolean] {
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

        <h2
          className="mb-5 text-4xl md:text-5xl font-black uppercase leading-none tracking-widest text-white"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          {item.title}
        </h2>

        <p className="mb-8 max-w-sm text-sm leading-relaxed tracking-wide text-white/50">
          {item.description}
        </p>
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
        About our
        <br />
        <span className="text-[#08818d]">Company</span>
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
    title: "employee",
    description:
      "In an industry built on steel, concrete, and blueprints, it’s easy to focus only on the structures we leave behind. But at this firm, we know a fundamental truth: the most important part of any project isn’t the machinery or the materials—it’s the people.",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fswattsgroup.com%2Fwp-content%2Fuploads%2F2025%2F06%2FSWG-Intern-at-Horseshoe-Bay-March-2025-2.jpg&f=1&nofb=1&ipt=4731d0ed1d8e629cf37d9d682592e5f91549ca509488760bbb19863067f4d875", // ← replace with your image
  },
  {
    title: "Riverside Luxury Villas",
    description:
      "In an industry built on steel, concrete, and blueprints, it’s easy to focus only on the structures we leave behind. But at this firm, we know a fundamental truth: the most important part of any project isn’t the machinery or the materials—it’s the people.",
    image: "/images/project-2.jpg", // ← replace with your image
  },
  {
    title: "Central Bridge Overpass",
    description:
      "A 380-meter dual-carriageway bridge connecting two urban districts. Post-tensioned concrete construction with integrated pedestrian walkways and architectural night lighting.",
    image: "/images/project-3.jpg", // ← replace with your image
  },
  {
    title: "Harbor Logistics Hub",
    description:
      "A 60,000 sq ft warehouse and distribution complex with 12 loading docks, reinforced flooring rated at 10 tons per sqm, and a fully automated inventory rail system.",
    image: "/images/project-4.jpg", // ← replace with your image
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
