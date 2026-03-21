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
} from "lucide-react";
import { getProjectById } from "@/lib/projects";
import ImageCarousel from "@/components/Carousel";
import { DEFAULT_LOCALE, getTranslations, isLocale } from "@/lib/i18n";

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

  const accent = "#08818d";
  const heroImage = project.images[0];
  const galleryImages = project.images.slice(1); // images[1…] for carousel

  return (
    <div className="min-h-screen bg-[#1C1C1E]">
      {/* ── HERO ── */}
      <div
        className="relative w-full overflow-hidden"
        style={{ minHeight: "480px" }}
      >
        {/* Background image */}
        <Image
          src={heroImage}
          alt={project.name}
          fill
          quality={90}
          sizes="100vw"
          className="object-cover"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/55" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              repeating-linear-gradient(90deg, rgba(255,255,255,0.15) 0px, rgba(255,255,255,0.15) 1px, transparent 1px, transparent 32px),
              repeating-linear-gradient(0deg, rgba(255,255,255,0.15) 0px, rgba(255,255,255,0.15) 1px, transparent 1px, transparent 32px)
            `,
          }}
        />
        <div
          className="pointer-events-none absolute -top-20 -right-20 h-96 w-96 rounded-full blur-[120px] opacity-20"
          style={{ backgroundColor: accent }}
        />

        <div className="relative z-10 container mx-auto px-6 pt-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-xs uppercase tracking-[4px] font-bold"
          >
            <ArrowLeft size={13} /> {t.projectDetail.back}
          </Link>
        </div>

        <div className="relative z-10 container mx-auto px-6 pb-16 pt-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <span
                className="inline-block px-3 py-1 text-[10px] uppercase tracking-[4px] font-bold text-white mb-4"
                style={{ backgroundColor: accent }}
              >
                {typeLabel[project.type]}
              </span>
              <h1
                className="text-5xl md:text-8xl font-black uppercase tracking-wider text-white leading-none mb-4"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {project.name}
              </h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-white/40 text-xs uppercase tracking-widest">
                <span className="flex items-center gap-1.5">
                  <MapPin size={11} /> {project.location}
                </span>
                <span className="text-white/20">·</span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={11} /> {project.year}
                </span>
                {project.client && (
                  <>
                    <span className="text-white/20">·</span>
                    <span>{project.client}</span>
                  </>
                )}
              </div>
            </div>

            <div className="flex gap-6 shrink-0">
              {[
                {
                  label: t.projectDetail.area,
                  value: project.sqft,
                  icon: <Ruler size={14} />,
                },
                {
                  label: t.projectDetail.duration,
                  value: project.duration,
                  icon: <Clock size={14} />,
                },
                {
                  label: t.projectDetail.completed,
                  value: String(project.year),
                  icon: <Calendar size={14} />,
                },
              ].map(({ label, value, icon }) => (
                <div
                  key={label}
                  className="flex flex-col items-center text-center border border-white/10 px-5 py-4 backdrop-blur-sm bg-white/5"
                  style={{
                    clipPath:
                      "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                  }}
                >
                  <span className="text-white/30 mb-2">{icon}</span>
                  <span
                    className="text-2xl font-black text-white tracking-wider"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {value}
                  </span>
                  <span className="text-[9px] uppercase tracking-[3px] text-white/30 mt-1">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── TAGS STRIP ── */}
      <div className="bg-[#1C1C1E] border-b border-white/5">
        <div className="container mx-auto px-6 py-4 flex items-center gap-3 flex-wrap">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-[10px] uppercase tracking-[3px] font-bold text-white/40 border border-white/10"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-[#f8fffe]">
          {/* Main column */}
          <div className="lg:col-span-2 bg-[#f8fffe] pr-0 lg:pr-12 p-8 lg:p-12 space-y-12">
            <section>
              <p
                className="text-[14px] uppercase tracking-[5px] mb-3 font-bold"
                style={{ color: accent }}
              >
                {t.projectDetail.overview}
              </p>
              <p className="text-base text-[#f8fffe] leading-relaxed">
                {project.description}
              </p>
            </section>

            {project.challenge && (
              <section className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#f8fffe]">
                <div className="bg-white p-6">
                  <p
                    className="text-[12px] uppercase tracking-[4px] font-bold mb-3"
                    style={{ color: accent }}
                  >
                    {t.projectDetail.challenge}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {project.challenge}
                  </p>
                </div>
                <div className="bg-white p-6">
                  <p
                    className="text-[12px] uppercase tracking-[4px] font-bold mb-3"
                    style={{ color: accent }}
                  >
                    {t.projectDetail.solution}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </section>
            )}

            {project.highlights && (
              <section>
                <p
                  className="text-[14px] uppercase tracking-[5px] mb-5 font-bold"
                  style={{ color: accent }}
                >
                  {t.projectDetail.highlights}
                </p>
                <ul className="space-y-px">
                  {project.highlights.map((hl, i) => (
                    <li key={i} className="flex items-start gap-4 bg-white p-4">
                      <span
                        className="shrink-0 mt-0.5 w-5 h-5 flex items-center justify-center text-[10px] font-black text-white"
                        style={{ backgroundColor: accent }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm text-gray-700">{hl}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="bg-white p-8 lg:p-10 space-y-8 rounded-xl">
            <div>
              <p
                className="text-[9px] uppercase tracking-[5px] font-bold mb-5"
                style={{ color: accent }}
              >
                {t.projectDetail.info}
              </p>
              <dl className="space-y-px">
                {[
                  {
                    label: t.projectDetail.client,
                    value: project.client ?? t.projectDetail.confidential,
                  },
                  {
                    label: t.projectDetail.type,
                    value: typeLabel[project.type],
                  },
                  { label: t.projectDetail.location, value: project.location },
                  { label: t.projectDetail.year, value: String(project.year) },
                  { label: t.projectDetail.size, value: project.sqft },
                  { label: t.projectDetail.duration, value: project.duration },
                ].map(({ label, value }) => (
                  <div key={label} className="flex bg-[#f5f0ea]">
                    <dt className="w-28 shrink-0 px-3 py-2.5 text-[9px] uppercase tracking-[3px] text-gray-400 font-bold border-r border-[#ddd8d0]">
                      {label}
                    </dt>
                    <dd className="flex-1 px-3 py-2.5 text-xs text-gray-700 font-medium">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="border-t border-[#ddd8d0] pt-8">
              <p className="text-xs text-gray-500 leading-relaxed mb-5">
                {t.projectDetail.sidebarText}
              </p>
              <Link
                href="/contact"
                className="flex items-center justify-between w-full px-5 py-3.5 text-xs font-bold uppercase tracking-[3px] text-white transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: accent,
                  clipPath:
                    "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                }}
              >
                {t.projectDetail.similarProject}
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
        {/* ── GALLERY CAROUSEL (images[1…]) ── */}
        {galleryImages.length > 0 && (
          <ImageCarousel images={galleryImages} name={project.name} />
        )}
      </div>

      {/* ── FOOTER CTA ── */}
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
          <p
            className="text-xs uppercase tracking-[5px] font-semibold"
            style={{ color: accent }}
          >
            {t.projectDetail.startProject}
          </p>
          <h2
            className="text-4xl md:text-6xl font-black uppercase tracking-wider text-white leading-none"
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
            className="mt-2 text-white px-12 py-4 text-xs font-bold uppercase tracking-[4px] transition-all duration-200 hover:opacity-90 hover:-translate-y-px"
            style={{
              backgroundColor: accent,
              clipPath:
                "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
            }}
          >
            {t.projectDetail.ctaButton}
          </Link>
        </div>
      </div>
    </div>
  );
}
