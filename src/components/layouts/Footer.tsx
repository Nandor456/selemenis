"use client";

import Link from "next/link";
import Image from "next/image";
import companyData from "@/lib/companyData";
import { useLanguage } from "@/components/providers/LanguageProvider";

const services = [
  "Commercial Construction",
  "Industrial Projects",
  "Structural Engineering",
  "Site Development",
  "Renovation & Retrofit",
  "Project Management",
];

const certifications = [
  "ISO 9001",
  "OSHA Certified",
  "LEED Partner",
  "AGC Member",
];

export default function Footer() {
  const year = new Date().getFullYear();
  const { t } = useLanguage();
  const company = [
    { label: t.common.projects, href: "/projects" },
    { label: t.common.contact, href: "/contact" },
  ];

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#041517",
        color: "#a8c5c8",
        fontFamily: "'Lora', Georgia, serif",
      }}
    >
      {/* Top gradient accent bar */}
      <div
        className="h-1 w-full"
        style={{
          background:
            "linear-gradient(90deg, #041517 0%, #08818d 35%, #0aabb9 65%, #041517 100%)",
        }}
      />

      {/* Subtle grid texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 44px), repeating-linear-gradient(90deg, #fff 0px, #fff 1px, transparent 1px, transparent 44px)",
        }}
      />

      {/* Main content */}
      <div className="relative mx-auto max-w-7xl px-8 pt-16">
        {/* Top grid */}
        <div
          className="grid gap-12 pb-14"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          }}
        >
          {/* ── Brand Column ── */}
          <div style={{ gridColumn: "span 2" }}>
            {/* Logo mark */}
            <div className="mb-8 flex items-center gap-4">
              <Image
                src="/sel_logo.png"
                alt="Company Logo"
                width={300}
                height={40}
                priority
              />
            </div>

            <p
              className="mb-8 text-sm leading-relaxed"
              style={{ color: "#7aa5a9", maxWidth: "300px" }}
            >
              {t.footer.brandText}
            </p>

            {/* Certification badges */}
            <div className="flex flex-wrap gap-2">
              {certifications.map((cert) => (
                <span
                  key={cert}
                  className="border px-3 py-1 text-[9px] font-bold uppercase"
                  style={{
                    borderColor: "#08818d55",
                    color: "#08818d",
                    letterSpacing: "0.15em",
                    fontFamily: "Arial, sans-serif",
                  }}
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* ── Services Column ── */}
          <div>
            <h4
              className="mb-6 text-[10px] font-bold uppercase text-white"
              style={{
                letterSpacing: "0.35em",
                fontFamily: "Arial, sans-serif",
              }}
            >
              {t.footer.services}
            </h4>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s}>
                  <Link
                    href="/services"
                    className="group flex items-center gap-2 text-sm transition-colors duration-200"
                    style={{ color: "#7aa5a9" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#ffffff")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#7aa5a9")
                    }
                  >
                    <span
                      className="inline-block h-px flex-shrink-0 transition-all duration-300 group-hover:w-6"
                      style={{ width: "16px", backgroundColor: "#08818d" }}
                    />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Company Column ── */}
          <div>
            <h4
              className="mb-6 text-[10px] font-bold uppercase text-white"
              style={{
                letterSpacing: "0.35em",
                fontFamily: "Arial, sans-serif",
              }}
            >
              {t.footer.company}
            </h4>
            <ul className="space-y-3">
              {company.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="group flex items-center gap-2 text-sm transition-colors duration-200"
                    style={{ color: "#7aa5a9" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#ffffff")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#7aa5a9")
                    }
                  >
                    <span
                      className="inline-block h-px flex-shrink-0 transition-all duration-300 group-hover:w-6"
                      style={{ width: "16px", backgroundColor: "#08818d" }}
                    />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact Column ── */}
          <div>
            <h4
              className="mb-6 text-[10px] font-bold uppercase text-white"
              style={{
                letterSpacing: "0.35em",
                fontFamily: "Arial, sans-serif",
              }}
            >
              {t.footer.contactUs}
            </h4>

            <div className="space-y-5">
              {/* Address */}
              <div className="flex gap-3">
                <div
                  className="mt-1 h-4 w-4 flex-shrink-0"
                  style={{
                    borderLeft: "2px solid #08818d",
                    borderBottom: "2px solid #08818d",
                  }}
                />
                <address
                  className="not-italic text-sm leading-relaxed"
                  style={{ color: "#7aa5a9" }}
                >
                  {companyData.address}
                  <br />
                  Houston, TX 77002
                </address>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">
                <div
                  className="h-4 w-4 flex-shrink-0 rounded-full border-2"
                  style={{ borderColor: "#08818d" }}
                />
                <a
                  href={`tel:${companyData.phone}`}
                  className="text-sm transition-colors duration-200"
                  style={{ color: "#7aa5a9" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#7aa5a9")
                  }
                >
                  {companyData.phone}
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <div
                  className="h-px w-4 flex-shrink-0"
                  style={{ backgroundColor: "#08818d" }}
                />
                <a
                  href={`mailto:${companyData.email}`}
                  className="text-sm transition-colors duration-200"
                  style={{ color: "#7aa5a9" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#7aa5a9")
                  }
                >
                  {companyData.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div
          className="flex flex-col items-start justify-between gap-4 border-t py-6 md:flex-row md:items-center"
          style={{ borderColor: "#08818d22" }}
        >
          <p
            className="text-xs"
            style={{ color: "#4a7a7f", fontFamily: "Arial, sans-serif" }}
          >
            © {year} {companyData.name}. {t.footer.rightsReserved}
          </p>

          <div
            className="flex gap-6 text-xs"
            style={{ color: "#4a7a7f", fontFamily: "Arial, sans-serif" }}
          >
            {[
              { label: t.footer.privacy, href: "/privacy" },
              { label: t.footer.terms, href: "/terms" },
              { label: t.footer.sitemap, href: "/sitemap" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="transition-colors duration-200"
                style={{ color: "#4a7a7f" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#4a7a7f")}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Live indicator */}
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{
                backgroundColor: "#08818d",
                animation: "pulse 2s infinite",
              }}
            />
            <span
              className="text-[10px] uppercase"
              style={{
                color: "#4a7a7f",
                letterSpacing: "0.2em",
                fontFamily: "Arial, sans-serif",
              }}
            >
              {t.footer.licensedInsured}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
