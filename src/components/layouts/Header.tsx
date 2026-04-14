"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Globe, Check, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getTranslations } from "@/lib/i18n";

const NAV = [{ href: "/projects", labelKey: "projects" as const }];

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { locale, setLocale, locales, t } = useLanguage();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langBoxRef = useRef<HTMLDivElement>(null);

  // Scroll-aware header (rAF-gated passive listener)
  useEffect(() => {
    let raf = 0;
    const update = () => {
      setScrolled(window.scrollY > 16);
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Lock body scroll when mobile drawer open
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  // Close language popover on outside click / Escape
  useEffect(() => {
    if (!langOpen) return;
    const onDown = (e: MouseEvent) => {
      if (langBoxRef.current && !langBoxRef.current.contains(e.target as Node))
        setLangOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLangOpen(false);
    };
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [langOpen]);

  const handleLocaleChange = (value: (typeof locales)[number]) => {
    if (value === locale) return;
    setLocale(value);
    setLangOpen(false);
    router.refresh();
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const contactCta =
    "relative items-center gap-2 bg-[#2ABFCC] text-[#0D3D40] text-[10px] font-bold uppercase tracking-[3px] transition-all duration-300 hover:bg-[#3DD0DC] hover:-translate-y-px active:translate-y-0";

  return (
    <header
      className={`sticky top-0 z-50 -mb-16 w-full transition-[background-color,backdrop-filter,border-color,box-shadow] duration-500 ease-out ${
        scrolled
          ? "bg-[#041517]/85 backdrop-blur-xl border-b border-[#2ABFCC]/20 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      {!scrolled && (
        <div
          aria-hidden
          className="pointer-events-none fixed inset-x-0 top-0 z-60 h-0.5 bg-[#041517]"
        />
      )}

      {scrolled && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-70"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(42,191,204,0.5), transparent)",
          }}
        />
      )}

      <div className="mx-auto flex h-16 max-w-350 items-center justify-between px-4 md:px-10">
        {/* ── LOGO ── */}
        <Link href="/" className="group relative flex items-center select-none">
          <span
            aria-hidden
            className="absolute inset-0 -m-3 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: "rgba(42,191,204,0.25)" }}
          />
          <Image
            src="/sel_logo.png"
            alt="Company Logo"
            width={120}
            height={40}
            priority
            className="relative transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </Link>

        <div className="flex items-center gap-2 md:gap-3">
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map(({ href, labelKey }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`group relative px-5 py-2 text-[11px] font-semibold uppercase tracking-[3px] transition-colors duration-200 ${
                    active
                      ? "text-[#2ABFCC]"
                      : "text-[#2ABFCC]/60 hover:text-[#2ABFCC]"
                  }`}
                >
                  <span className="relative z-10">{t.header[labelKey]}</span>
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute left-5 right-5 bottom-1 h-px origin-left bg-[#2ABFCC] transition-transform duration-300 ease-out ${
                      active
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>
          {/* ── LANGUAGE SWITCHER ── */}
          <div ref={langBoxRef} className="relative hidden md:block">
            <button
              type="button"
              onClick={() => setLangOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={langOpen}
              aria-label={t.common.language}
              className={`flex items-center gap-2 border px-3 py-2 text-[10px] font-semibold uppercase tracking-[3px] transition-all duration-200 ${
                langOpen
                  ? "border-[#2ABFCC]/60 bg-[#0A2E31] text-[#2ABFCC]"
                  : "border-[#2ABFCC]/20 bg-[#0A2E31]/40 text-[#2ABFCC]/70 hover:border-[#2ABFCC]/40 hover:text-[#2ABFCC]"
              }`}
            >
              <Globe size={12} aria-hidden />
              <span>{locale.toUpperCase()}</span>
            </button>

            <div
              role="menu"
              className={`absolute right-0 top-[calc(100%+8px)] min-w-45 origin-top-right border border-[#2ABFCC]/20 bg-[#041517]/95 shadow-2xl shadow-black/60 backdrop-blur-xl transition-all duration-200 ${
                langOpen
                  ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
                  : "pointer-events-none -translate-y-1 scale-95 opacity-0"
              }`}
            >
              {locales.map((item) => {
                const selected = item === locale;
                return (
                  <button
                    key={item}
                    type="button"
                    role="menuitemradio"
                    aria-checked={selected}
                    onClick={() => handleLocaleChange(item)}
                    className={`flex w-full items-center justify-between px-4 py-3 text-left text-[11px] uppercase tracking-[3px] transition-colors duration-150 ${
                      selected
                        ? "bg-[#2ABFCC]/10 text-[#2ABFCC]"
                        : "text-[#2ABFCC]/60 hover:bg-[#2ABFCC]/5 hover:text-[#2ABFCC]"
                    }`}
                  >
                    <span>{getTranslations(item).languageName}</span>
                    {selected && <Check size={12} aria-hidden />}
                  </button>
                );
              })}
            </div>
          </div>
          {/* ── DESKTOP CTA ── */}
          <Link
            href="/contact"
            className={`hidden md:inline-flex px-5 py-2 shadow-[0_0_25px_rgba(42,191,204,0.18)] hover:shadow-[0_0_35px_rgba(42,191,204,0.4)] ${contactCta}`}
            style={{
              clipPath:
                "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
            }}
          >
            <span>{t.header.contact}</span>
            <ArrowUpRight size={12} aria-hidden />
          </Link>

          {/* ── MOBILE TOGGLE ── */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={t.header.toggleMenu}
            aria-expanded={mobileOpen}
            className="relative flex h-10 w-10 items-center justify-center border border-[#2ABFCC]/20 text-[#2ABFCC]/80 transition-colors hover:border-[#2ABFCC]/50 hover:text-[#2ABFCC] md:hidden"
          >
            <Menu
              size={18}
              className={`absolute transition-all duration-300 ${
                mobileOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
              }`}
              aria-hidden
            />
            <X
              size={18}
              className={`absolute transition-all duration-300 ${
                mobileOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
              }`}
              aria-hidden
            />
          </button>
        </div>
      </div>

      {/* ── MOBILE DRAWER ── */}
      <div
        className={`fixed inset-x-0 top-16 bottom-0 z-40 md:hidden transition-[opacity,visibility] duration-300 ${
          mobileOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div
          onClick={() => setMobileOpen(false)}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          aria-hidden
        />
        <div
          className={`absolute inset-x-0 top-0 border-b border-[#2ABFCC]/20 bg-[#041517] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            mobileOpen ? "translate-y-0" : "-translate-y-2"
          }`}
        >
          <nav className="flex flex-col px-6 py-5">
            {NAV.map(({ href, labelKey }, i) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`group flex items-center justify-between border-b border-[#2ABFCC]/10 py-4 text-sm font-bold uppercase tracking-[4px] transition-all duration-500 ${
                    active
                      ? "text-[#2ABFCC]"
                      : "text-[#2ABFCC]/60 hover:text-[#2ABFCC]"
                  } ${mobileOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}`}
                  style={{
                    transitionDelay: mobileOpen ? `${120 + i * 70}ms` : "0ms",
                  }}
                >
                  <span>{t.header[labelKey]}</span>
                  <ArrowUpRight
                    size={16}
                    className={`transition-all duration-300 ${
                      active
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                    }`}
                    aria-hidden
                  />
                </Link>
              );
            })}

            <div
              className={`pt-6 transition-all duration-500 ${
                mobileOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-2 opacity-0"
              }`}
              style={{ transitionDelay: mobileOpen ? "260ms" : "0ms" }}
            >
              <div className="mb-3 flex items-center gap-3">
                <Globe size={12} className="text-[#2ABFCC]/60" aria-hidden />
                <span className="text-[10px] uppercase tracking-[4px] text-[#2ABFCC]/60">
                  {t.common.language}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {locales.map((item) => {
                  const selected = item === locale;
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleLocaleChange(item)}
                      className={`py-2.5 text-[10px] font-bold uppercase tracking-[3px] border transition-all duration-200 ${
                        selected
                          ? "border-[#2ABFCC] bg-[#2ABFCC] text-[#041517]"
                          : "border-[#2ABFCC]/20 bg-transparent text-[#2ABFCC]/60 hover:border-[#2ABFCC]/50 hover:text-[#2ABFCC]"
                      }`}
                    >
                      {item.toUpperCase()}
                    </button>
                  );
                })}
              </div>
            </div>

            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className={`mt-6 inline-flex items-center justify-center gap-2 bg-[#2ABFCC] py-4 text-xs font-bold uppercase tracking-[4px] text-[#0D3D40] transition-all duration-500 hover:bg-[#3DD0DC] ${
                mobileOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-2 opacity-0"
              }`}
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                transitionDelay: mobileOpen ? "340ms" : "0ms",
              }}
            >
              <span>{t.header.contact}</span>
              <ArrowUpRight size={14} aria-hidden />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
