"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getTranslations } from "@/lib/i18n";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { locale, setLocale, locales, t } = useLanguage();
  const router = useRouter();

  const handleLocaleChange = (value: string) => {
    const nextLocale = value as (typeof locales)[number];
    setLocale(nextLocale);
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#2ABFCC]/20 bg-[#041517] shadow-lg shadow-black/30">
      <div className="flex justify-between h-16 items-center">
        {/* ── LOGO ── */}
        <div className="ml-10 flex">
          <Link
            href="/"
            className="flex items-center space-x-2 cursor-pointer select-none"
          >
            <Image
              src="/sel_logo.png"
              alt="Company Logo"
              width={120}
              height={40}
              priority
            />
          </Link>
        </div>

        {/* ── DESKTOP NAV ── */}
        <nav className="hidden md:flex items-center gap-3 text-sm font-medium ml-auto">
          <select
            value={locale}
            onChange={(e) => handleLocaleChange(e.target.value)}
            className="bg-[#0A2E31] border border-[#2ABFCC]/30 text-[#2ABFCC] text-xs uppercase tracking-[2px] outline-none"
            aria-label={t.common.language}
          >
            {locales.map((item) => (
              <option key={item} value={item}>
                {getTranslations(item).languageName}
              </option>
            ))}
          </select>
          <Link
            href="/projects"
            className="px-4 py-2 text-[#2ABFCC]/70 tracking-wide uppercase text-xs font-semibold transition-all duration-200 hover:text-[#2ABFCC] hover:bg-[#2ABFCC]/10"
          >
            {t.header.projects}
          </Link>

          <Link
            href="/contact"
            className="mr-10 px-5 py-2 bg-[#2ABFCC] text-[#0D3D40] text-xs font-bold uppercase tracking-widest transition-all duration-200 hover:bg-[#3DD0DC] hover:-translate-y-px active:translate-y-0"
            style={{
              clipPath:
                "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
            }}
          >
            {t.header.contact}
          </Link>
        </nav>

        {/* ── MOBILE MENU TRIGGER ── */}
        <button
          className="ml-auto md:hidden p-2 text-[#2ABFCC]/80 hover:text-[#2ABFCC] transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={t.header.toggleMenu}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ── MOBILE DROPDOWN ── */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#2ABFCC]/20 bg-[#0A2E31] px-6 py-4 flex flex-col gap-1">
          {[
            { href: "/projects", label: t.header.projects },
            { href: "/contact", label: t.header.contact },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="py-3 text-sm font-semibold uppercase tracking-widest text-[#2ABFCC]/60 border-b border-[#2ABFCC]/10 last:border-0 hover:text-[#2ABFCC] transition-colors"
            >
              {label}
            </Link>
          ))}

          <div className="pt-2">
            <label className="block py-2 text-xs font-semibold uppercase tracking-widest text-[#2ABFCC]/60">
              {t.common.language}
            </label>
            <select
              value={locale}
              onChange={(e) => handleLocaleChange(e.target.value)}
              className="w-full bg-[#041517] border border-[#2ABFCC]/30 text-[#2ABFCC] text-xs uppercase tracking-[2px] px-3 py-2 outline-none"
              aria-label={t.common.language}
            >
              {locales.map((item) => (
                <option key={item} value={item}>
                  {getTranslations(item).languageName}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
