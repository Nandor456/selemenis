import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Calendar,
  Ruler,
  ArrowLeft,
  ArrowUpRight,
  Clock,
  Target,
  Lightbulb,
} from "lucide-react";
import { getProjectById } from "@/lib/projects";
import ImageCarousel from "@/components/Carousel";
import { DEFAULT_LOCALE, getTranslations, isLocale } from "@/lib/i18n";

const ACCENT = "#08818d";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("locale")?.value;
  const locale =
    localeCookie && isLocale(localeCookie) ? localeCookie : DEFAULT_LOCALE;
  const t = getTranslations(locale);

  const typeLabel = {
    Residential: t.projectsPage.typeResidential,
    Commercial: t.projectsPage.typeCommercial,
    Renovation: t.projectsPage.typeRenovation,
    Infrastructure: t.projectsPage.typeInfrastructure,
  };

  const project = getProjectById(Number((await params).id));
  if (!project) notFound();

  const heroImage = project.images[0];
  const galleryImages = project.images.slice(1);

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      {/* ── HERO ── */}
      <section className="relative w-full overflow-hidden min-h-[92vh] flex flex-col">
        <Image
          src={heroImage}
          alt={project.name}
          fill
          quality={90}
          sizes="100vw"
          className="object-cover"
          priority
        />

        {/* Dark gradient: deeper at edges, fade into page at bottom */}
        <div className="absolute inset-0 bg-linear-to-b from-[#0a0a0b]/70 via-[#0a0a0b]/55 to-[#0a0a0b]" />
        <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0b]/80 via-transparent to-transparent" />

        {/* Accent glow top-right */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-40 h-125 w-125 rounded-full blur-[140px] opacity-30"
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

        {/* Breadcrumb */}
        <div className="relative z-10 container mx-auto px-6 pt-8 md:pt-18">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-[4px] text-white/60 backdrop-blur-md bg-white/5 border border-white/10 hover:border-[#08818d]/60 hover:text-white hover:bg-white/10 transition-all duration-300"
            style={{
              clipPath:
                "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
            }}
          >
            <ArrowLeft
              size={12}
              className="transition-transform duration-300 group-hover:-translate-x-0.5"
              aria-hidden
            />
            {t.projectDetail.back}
          </Link>
        </div>

        {/* Main hero content, pushed to bottom */}
        <div className="relative z-10 container mx-auto px-6 pb-12 md:pb-20 pt-10 md:pt-16 mt-auto">
          <div className="flex flex-col gap-8 md:gap-12">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-10 bg-[#08818d]" />
                <span className="px-3 py-1.5 text-[10px] md:text-[11px] uppercase tracking-[5px] md:tracking-[6px] font-bold backdrop-blur-md bg-[#08818d]/15 border border-[#08818d]/40 text-[#2dd4bf]">
                  {typeLabel[project.type]}
                </span>
              </div>

              <h1
                className="text-5xl md:text-8xl lg:text-9xl font-black uppercase tracking-wider text-white leading-[0.9]"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {project.name}
              </h1>

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-white/50 text-[10px] md:text-[11px] uppercase tracking-[3px]">
                <span className="flex items-center gap-1.5">
                  <MapPin size={12} className="text-[#08818d]" aria-hidden />
                  {project.location}
                </span>
                <span className="text-white/20">·</span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={12} className="text-[#08818d]" aria-hidden />
                  {project.year}
                </span>
                {project.client && (
                  <>
                    <span className="text-white/20">·</span>
                    <span>{project.client}</span>
                  </>
                )}
              </div>
            </div>

            {/* Glass stat cards */}
            <div className="grid grid-cols-3 gap-3 md:gap-5 md:max-w-2xl md:ml-auto w-full">
              {[
                {
                  label: t.projectDetail.area,
                  value: project.sqft,
                  icon: <Ruler size={14} aria-hidden />,
                },
                {
                  label: t.projectDetail.duration,
                  value: project.duration,
                  icon: <Clock size={14} aria-hidden />,
                },
                {
                  label: t.projectDetail.completed,
                  value: String(project.year),
                  icon: <Calendar size={14} aria-hidden />,
                },
              ].map(({ label, value, icon }) => (
                <div
                  key={label}
                  className="group relative overflow-hidden backdrop-blur-xl bg-white/4 border border-white/10 px-3 md:px-6 py-4 md:py-5 transition-all duration-500 hover:bg-white/8 hover:border-[#08818d]/40"
                  style={{
                    clipPath:
                      "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
                  }}
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 110%, rgba(8,129,141,0.35), transparent 70%)",
                    }}
                  />
                  <div className="relative flex items-center gap-2 mb-2 text-[#08818d]">
                    {icon}
                    <span className="text-[8px] md:text-[9px] uppercase tracking-[2px] md:tracking-[3px] text-white/50">
                      {label}
                    </span>
                  </div>
                  <p
                    className="relative text-xl md:text-3xl font-black text-white tracking-wider"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          aria-hidden
          className="absolute bottom-5 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        >
          <span className="w-px h-10 bg-linear-to-b from-[#08818d] to-transparent animate-pulse" />
        </div>
      </section>

      {/* ── TAGS STRIP ── */}
      <div className="relative border-y border-white/5 bg-[#0d0d0f]/60 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-5 flex items-center gap-2 flex-wrap">
          <span className="h-px w-5 bg-[#08818d] mr-1" />
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 text-[10px] uppercase tracking-[3px] font-bold text-white/50 border border-white/10 bg-white/2 hover:border-[#08818d]/40 hover:text-white transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="relative container mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-14 md:space-y-20">
            {/* Overview */}
            <section>
              <div className="flex items-center gap-4 mb-6">
                <span className="font-mono text-[10px] tracking-[4px] text-[#08818d]/60">
                  01
                </span>
                <span className="text-[11px] uppercase tracking-[5px] font-bold text-[#08818d]">
                  {t.projectDetail.overview}
                </span>
                <span className="flex-1 h-px bg-linear-to-r from-[#08818d]/40 to-transparent" />
              </div>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light">
                {project.description}
              </p>
            </section>

            {/* Challenge + Solution */}
            {project.challenge && (
              <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div
                  className="group relative overflow-hidden backdrop-blur-xl bg-white/3 border border-white/10 p-6 md:p-8 transition-all duration-500 hover:bg-white/6 hover:border-[#08818d]/30"
                  style={{
                    clipPath:
                      "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
                  }}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex items-center justify-center w-10 h-10 bg-[#08818d]/15 border border-[#08818d]/30">
                      <Target
                        size={16}
                        className="text-[#08818d]"
                        aria-hidden
                      />
                    </div>
                    <div>
                      <p className="font-mono text-[9px] tracking-[3px] text-[#08818d]/60">
                        02
                      </p>
                      <p className="text-[11px] uppercase tracking-[4px] font-bold text-[#08818d]">
                        {t.projectDetail.challenge}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {project.challenge}
                  </p>
                </div>

                <div
                  className="group relative overflow-hidden backdrop-blur-xl bg-[#08818d]/10 border border-[#08818d]/25 p-6 md:p-8 transition-all duration-500 hover:bg-[#08818d]/15 hover:border-[#08818d]/45"
                  style={{
                    clipPath:
                      "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
                  }}
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -top-16 -right-16 h-32 w-32 rounded-full blur-[60px] opacity-50"
                    style={{ backgroundColor: ACCENT }}
                  />
                  <div className="relative flex items-center gap-3 mb-5">
                    <div className="flex items-center justify-center w-10 h-10 bg-[#08818d]/30 border border-[#08818d]/50">
                      <Lightbulb
                        size={16}
                        className="text-[#2dd4bf]"
                        aria-hidden
                      />
                    </div>
                    <div>
                      <p className="font-mono text-[9px] tracking-[3px] text-[#08818d]/80">
                        03
                      </p>
                      <p className="text-[11px] uppercase tracking-[4px] font-bold text-[#2dd4bf]">
                        {t.projectDetail.solution}
                      </p>
                    </div>
                  </div>
                  <p className="relative text-sm text-white/80 leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </section>
            )}

            {/* Highlights */}
            {project.highlights && (
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-mono text-[10px] tracking-[4px] text-[#08818d]/60">
                    04
                  </span>
                  <span className="text-[11px] uppercase tracking-[5px] font-bold text-[#08818d]">
                    {t.projectDetail.highlights}
                  </span>
                  <span className="flex-1 h-px bg-linear-to-r from-[#08818d]/40 to-transparent" />
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.highlights.map((hl, i) => (
                    <li
                      key={i}
                      className="group relative overflow-hidden backdrop-blur-sm bg-white/2 border border-white/10 p-4 md:p-5 flex items-start gap-4 hover:bg-white/5 hover:border-[#08818d]/30 transition-all duration-300"
                    >
                      <span className="shrink-0 mt-0.5 w-8 h-8 flex items-center justify-center text-[11px] font-black font-mono text-[#08818d] bg-[#08818d]/15 border border-[#08818d]/30">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm text-white/75 leading-relaxed pt-1">
                        {hl}
                      </span>
                      <span
                        aria-hidden
                        className="absolute left-0 top-0 w-px h-full bg-[#08818d] scale-y-0 origin-top group-hover:scale-y-100 transition-transform duration-500"
                      />
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div
              className="relative overflow-hidden backdrop-blur-xl bg-white/3 border border-white/10"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 18px 100%, 0 calc(100% - 18px))",
              }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full blur-[60px] opacity-40"
                style={{ backgroundColor: ACCENT }}
              />

              <div className="relative p-7 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-px w-6 bg-[#08818d]" />
                  <p className="text-[10px] uppercase tracking-[5px] font-bold text-[#08818d]">
                    {t.projectDetail.info}
                  </p>
                </div>

                <dl className="space-y-0">
                  {[
                    {
                      label: t.projectDetail.client,
                      value: project.client ?? t.projectDetail.confidential,
                    },
                    {
                      label: t.projectDetail.type,
                      value: typeLabel[project.type],
                    },
                    {
                      label: t.projectDetail.location,
                      value: project.location,
                    },
                    {
                      label: t.projectDetail.year,
                      value: String(project.year),
                    },
                    { label: t.projectDetail.size, value: project.sqft },
                    {
                      label: t.projectDetail.duration,
                      value: project.duration,
                    },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="flex items-center justify-between gap-4 py-3 border-b border-white/5 last:border-b-0"
                    >
                      <dt className="text-[9px] uppercase tracking-[3px] text-white/40 font-bold">
                        {label}
                      </dt>
                      <dd className="text-[11px] text-white/85 font-medium text-right">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="relative px-7 md:px-8 pb-7 md:pb-8">
                <p className="text-[11px] text-white/50 leading-relaxed mb-6">
                  {t.projectDetail.sidebarText}
                </p>
                <Link
                  href="/contact"
                  className="group relative flex items-center justify-between w-full px-5 py-4 text-[11px] font-bold uppercase tracking-[3px] text-white overflow-hidden transition-transform duration-300 hover:-translate-y-px"
                  style={{
                    background: `linear-gradient(135deg, ${ACCENT}, #0aa3b0)`,
                    clipPath:
                      "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
                    boxShadow: "0 0 25px rgba(8,129,141,0.25)",
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
                  <span className="relative">
                    {t.projectDetail.similarProject}
                  </span>
                  <ArrowUpRight
                    size={14}
                    className="relative transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* ── GALLERY CAROUSEL ── */}
        {galleryImages.length > 0 && (
          <div className="mt-16 md:mt-24">
            <div className="flex items-center gap-4 mb-8">
              <span className="font-mono text-[10px] tracking-[4px] text-[#08818d]/60">
                05
              </span>
              <span className="flex-1 h-px bg-linear-to-r from-[#08818d]/40 to-transparent" />
            </div>
            <ImageCarousel images={galleryImages} name={project.name} />
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
              {t.projectDetail.startProject}
            </p>
            <span className="h-px w-10 bg-[#08818d]" />
          </div>

          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-wider text-white leading-[0.9]"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {t.projectDetail.haveProject}
            <br />
            <span className="text-white/25">{t.projectDetail.inMind}</span>
          </h2>

          <p className="text-white/40 text-sm tracking-widest uppercase max-w-sm">
            {t.projectDetail.ctaDescription}
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
            <span className="relative">{t.projectDetail.ctaButton}</span>
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
