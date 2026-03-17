"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#2ABFCC]/20 bg-[#041517] shadow-lg shadow-black/30">
      <div className="container flex h-16 items-center">
        {/* ── LOGO ── */}
        <div className="mr-4 ml-4 flex">
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
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium ml-auto">
          {[{ href: "/projects", label: "Our Projects" }].map(
            ({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="px-4 py-2 text-[#2ABFCC]/70 tracking-wide uppercase text-xs font-semibold transition-all duration-200 hover:text-[#2ABFCC] hover:bg-[#2ABFCC]/10"
              >
                {label}
              </Link>
            ),
          )}

          {/* Contact CTA — uses the logo's accent color */}
          <Link
            href="/contact"
            className="ml-4 px-5 py-2 bg-[#2ABFCC] text-[#0D3D40] text-xs font-bold uppercase tracking-widest transition-all duration-200 hover:bg-[#3DD0DC] hover:-translate-y-px active:translate-y-0"
            style={{
              clipPath:
                "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
            }}
          >
            Contact Us
          </Link>
        </nav>

        {/* ── MOBILE MENU TRIGGER ── */}
        <button
          className="ml-auto md:hidden p-2 text-[#2ABFCC]/80 hover:text-[#2ABFCC] transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ── MOBILE DROPDOWN ── */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#2ABFCC]/20 bg-[#0A2E31] px-6 py-4 flex flex-col gap-1">
          {[
            { href: "/projects", label: "Our Projects" },
            { href: "/contact", label: "Contact Us" },
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
        </div>
      )}
    </header>
  );
};

export default Header;
