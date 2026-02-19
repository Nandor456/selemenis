"use client";
import { useState } from "react";
import { X, MapPin, Calendar, Ruler, ArrowUpRight } from "lucide-react";

// ── TYPES ──────────────────────────────────────────────────
type Project = {
  id: number;
  name: string;
  location: string;
  type: "Residential" | "Commercial" | "Renovation" | "Infrastructure";
  year: number;
  sqft: string;
  duration: string;
  description: string;
  tags: string[];
  featured?: boolean;
  // Placeholder gradient used instead of real images
  gradient: string;
};

// ── MOCK DATA ──────────────────────────────────────────────
const PROJECTS: Project[] = [
  {
    id: 1,
    name: "Greenfield Tower",
    location: "Downtown Metro",
    type: "Commercial",
    year: 2024,
    sqft: "42,000 sqft",
    duration: "18 months",
    description:
      "A landmark 14-story commercial tower in the heart of the city. Designed for mixed office and retail use, Greenfield Tower features floor-to-ceiling glazing, a rooftop terrace, and LEED Gold certification. Delivered on time and under budget.",
    tags: ["LEED Gold", "Mixed-Use", "14 Floors"],
    featured: true,
    gradient: "linear-gradient(135deg, #0a2a1a 0%, #1a4a2a 50%, #082010 100%)",
  },
  {
    id: 2,
    name: "Harborview Residences",
    location: "Eastside District",
    type: "Residential",
    year: 2023,
    sqft: "18,500 sqft",
    duration: "12 months",
    description:
      "A boutique residential complex of 24 luxury units overlooking the harbor. Each unit features custom millwork, heated floors, and private balconies. The project required intricate waterfront foundation work.",
    tags: ["Luxury", "24 Units", "Waterfront"],
    gradient: "linear-gradient(135deg, #0a1a2a 0%, #152535 50%, #05101a 100%)",
  },
  {
    id: 3,
    name: "Central Bridge Restoration",
    location: "City Center",
    type: "Infrastructure",
    year: 2023,
    sqft: "8,200 sqft",
    duration: "8 months",
    description:
      "Full structural restoration of the 1940s Central Bridge, including new concrete decking, updated railing systems, and waterproofing. A technically complex heritage project completed with zero traffic disruption.",
    tags: ["Heritage", "Structural", "Civil"],
    gradient: "linear-gradient(135deg, #1a1a2a 0%, #2a2040 50%, #0f0f1a 100%)",
  },
  {
    id: 4,
    name: "Oakwood Shopping Mall",
    location: "Northgate",
    type: "Commercial",
    year: 2022,
    sqft: "95,000 sqft",
    duration: "24 months",
    description:
      "A 95,000 sqft retail destination anchoring the Northgate development. Features an open-air atrium, food hall, and 60+ retail units. Designed for high foot traffic with sustainable energy systems throughout.",
    tags: ["Retail", "Atrium", "60+ Units"],
    gradient: "linear-gradient(135deg, #2a1a05 0%, #4a3015 50%, #1a0f02 100%)",
  },
  {
    id: 5,
    name: "The Maple Renovation",
    location: "Westwood",
    type: "Renovation",
    year: 2024,
    sqft: "3,400 sqft",
    duration: "4 months",
    description:
      "Complete gut renovation of a 1970s family home — new open-plan kitchen, two additional bathrooms, full rewire, and structural wall removal. Transformed into a modern family home while preserving original hardwood floors.",
    tags: ["Residential", "Full Gut", "Modern"],
    gradient: "linear-gradient(135deg, #1a0a0a 0%, #2a1510 50%, #0a0505 100%)",
  },
  {
    id: 6,
    name: "Riverside Office Park",
    location: "South End",
    type: "Commercial",
    year: 2022,
    sqft: "31,000 sqft",
    duration: "14 months",
    description:
      "Three interconnected low-rise office buildings set along the riverside, with shared amenities, underground parking, and extensive landscaping. A campus-style development built for a leading tech employer.",
    tags: ["Campus", "3 Buildings", "Landscaped"],
    gradient: "linear-gradient(135deg, #082a1a 0%, #0f3a25 50%, #041510 100%)",
  },
  {
    id: 7,
    name: "Sunridge Villas",
    location: "Hillcrest",
    type: "Residential",
    year: 2021,
    sqft: "22,000 sqft",
    duration: "16 months",
    description:
      "Eight custom villa homes on a hillside site with panoramic views. Each villa was individually designed with private pools, wine cellars, and smart home integration. Complex site logistics managed without delay.",
    tags: ["Custom", "8 Villas", "Smart Home"],
    gradient: "linear-gradient(135deg, #1a150a 0%, #2a2010 50%, #0f0a05 100%)",
  },
  {
    id: 8,
    name: "Metro Rail Station",
    location: "Transit Hub",
    type: "Infrastructure",
    year: 2023,
    sqft: "14,000 sqft",
    duration: "20 months",
    description:
      "Design-build of a new metro rail station serving 40,000 daily commuters. Includes underground concourses, platform shelters, accessibility ramps, and integrated retail kiosks. A flagship public infrastructure project.",
    tags: ["Public", "Transit", "40K Daily"],
    gradient: "linear-gradient(135deg, #0a0a1a 0%, #15152a 50%, #050510 100%)",
  },
];

const FILTERS = [
  "All",
  "Residential",
  "Commercial",
  "Renovation",
  "Infrastructure",
] as const;
type Filter = (typeof FILTERS)[number];

// ── COMPONENT ─────────────────────────────────────────────
export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
        <div
          className="relative w-full overflow-hidden cursor-pointer group"
          style={{ background: featured.gradient, minHeight: "340px" }}
          onClick={() => setSelectedProject(featured)}
        >
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
        </div>
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
            <div
              key={project.id}
              className={`group relative cursor-pointer overflow-hidden bg-white ${
                i === 0 && activeFilter === "All" ? "sm:col-span-2" : ""
              }`}
              onClick={() => setSelectedProject(project)}
            >
              {/* Image placeholder */}
              <div
                className="w-full transition-transform duration-500 group-hover:scale-105"
                style={{
                  background: project.gradient,
                  height: i === 0 && activeFilter === "All" ? "380px" : "260px",
                }}
              >
                {/* Fake building grid */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `
                      repeating-linear-gradient(90deg, rgba(255,255,255,0.2) 0px, rgba(255,255,255,0.2) 1px, transparent 1px, transparent 24px),
                      repeating-linear-gradient(0deg, rgba(255,255,255,0.2) 0px, rgba(255,255,255,0.2) 1px, transparent 1px, transparent 24px)
                    `,
                  }}
                />
              </div>

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
            </div>
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
            Let's build something you'll be proud of. We respond within 24
            hours.
          </p>
          <a
            href="/contact"
            className="mt-2 bg-[#08818d] text-white px-12 py-4 text-xs font-bold uppercase tracking-[4px] transition-all duration-200 hover:bg-[#067580] hover:-translate-y-px"
            style={{
              clipPath:
                "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
            }}
          >
            Contact Us Today
          </a>
        </div>
      </div>

      {/* ── MODAL OVERLAY ── */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#f5f0ea] shadow-2xl"
            style={{
              clipPath:
                "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal image */}
            <div
              className="w-full h-56 relative"
              style={{ background: selectedProject.gradient }}
            >
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `
                    repeating-linear-gradient(90deg, rgba(255,255,255,0.2) 0px, rgba(255,255,255,0.2) 1px, transparent 1px, transparent 24px),
                    repeating-linear-gradient(0deg, rgba(255,255,255,0.2) 0px, rgba(255,255,255,0.2) 1px, transparent 1px, transparent 24px)
                  `,
                }}
              />
              {/* Type badge */}
              <div className="absolute top-4 left-4 px-3 py-1 bg-[#08818d] text-white text-[10px] uppercase tracking-[3px] font-bold">
                {selectedProject.type}
              </div>
              {/* Close button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-9 h-9 bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal content */}
            <div className="p-8">
              <h2
                className="text-4xl font-black uppercase tracking-wider text-[#1C1C1E] leading-none mb-2"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {selectedProject.name}
              </h2>
              <div className="flex items-center gap-1 text-[#08818d] text-xs uppercase tracking-widest mb-6">
                <MapPin size={12} /> {selectedProject.location}
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-px bg-[#ddd8d0] mb-6">
                {[
                  {
                    icon: <Ruler size={14} />,
                    label: "Area",
                    value: selectedProject.sqft,
                  },
                  {
                    icon: <Calendar size={14} />,
                    label: "Duration",
                    value: selectedProject.duration,
                  },
                  {
                    icon: <Calendar size={14} />,
                    label: "Year",
                    value: String(selectedProject.year),
                  },
                ].map(({ icon, label, value }) => (
                  <div
                    key={label}
                    className="bg-white p-4 flex flex-col items-center text-center"
                  >
                    <span className="text-[#08818d] mb-1">{icon}</span>
                    <span
                      className="text-xl font-black text-[#1C1C1E] tracking-wide"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      {value}
                    </span>
                    <span className="text-[10px] uppercase tracking-[3px] text-gray-400">
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                {selectedProject.description}
              </p>

              {/* Tags */}
              <div className="flex gap-2 flex-wrap mb-8">
                {selectedProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 border border-[#08818d] text-[#08818d] text-[10px] uppercase tracking-widest font-bold"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <a
                href="/contact"
                className="inline-block bg-[#08818d] text-white px-8 py-3 text-xs font-bold uppercase tracking-[3px] hover:bg-[#067580] transition-colors"
                style={{
                  clipPath:
                    "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                }}
              >
                Start a Similar Project
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
