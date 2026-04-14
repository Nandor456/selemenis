"use client";

import Link from "next/link";
import { useEffect, useRef, useState, RefObject } from "react";
import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface AboutFirmProps {
  title: string;
  description: string;
  image: string;
}

// ─── useIsDesktop ─────────────────────────────────────────────────────────────
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => setIsDesktop(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return isDesktop;
}

// ─── useInView ────────────────────────────────────────────────────────────────
function useInView(
  threshold = 0.2,
): [RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
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

// ─── useCounter ───────────────────────────────────────────────────────────────
function useCounter(target: number, active: boolean, duration = 1800) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const raf = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(raf);
      else setVal(target);
    };
    requestAnimationFrame(raf);
  }, [active, target, duration]);
  return val;
}

// ─── Stat pill ────────────────────────────────────────────────────────────────
const StatPill = ({
  num,
  suffix,
  label,
  active,
}: {
  num: number;
  suffix: string;
  label: string;
  active: boolean;
}) => {
  const val = useCounter(num, active, 2000);
  return (
    <div className="flex flex-col items-center gap-1">
      <span
        className="text-3xl md:text-4xl font-black tabular-nums"
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          color: "#0aa3b0",
          letterSpacing: "0.04em",
        }}
      >
        {val}
        {suffix}
      </span>
      <span className="text-[9px] md:text-[11px] uppercase tracking-[2px] md:tracking-[4px] text-white/25">
        {label}
      </span>
    </div>
  );
};

// ─── Section header ───────────────────────────────────────────────────────────
const SectionHeader = () => {
  const [ref, visible] = useInView(0.2);
  const { t } = useLanguage();
  return (
    <div
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "#0c0c0f" }}
    >
      {/* Corner accent brackets */}
      <div
        className="pointer-events-none absolute top-8 left-8 w-6 h-6 border-l border-t"
        style={{ borderColor: "rgba(8,129,141,0.4)" }}
      />
      <div
        className="pointer-events-none absolute top-8 right-8 w-6 h-6 border-r border-t"
        style={{ borderColor: "rgba(8,129,141,0.4)" }}
      />
      <div
        className="pointer-events-none absolute bottom-8 left-8 w-6 h-6 border-l border-b"
        style={{ borderColor: "rgba(8,129,141,0.4)" }}
      />
      <div
        className="pointer-events-none absolute bottom-8 right-8 w-6 h-6 border-r border-b"
        style={{ borderColor: "rgba(8,129,141,0.4)" }}
      />

      {/* Ghost BG text */}
      <div
        className="pointer-events-none select-none absolute inset-0 flex items-center justify-center overflow-hidden"
        style={{
          opacity: visible ? 0.035 : 0,
          transition: "opacity 1.2s ease",
        }}
      >
        <span
          className="whitespace-nowrap font-black uppercase"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(100px, 22vw, 240px)",
            color: "#08818d",
            lineHeight: 1,
          }}
        >
          {t.aboutFirm.titleTop}
        </span>
      </div>

      <div className="relative flex flex-col items-center overflow-hidden px-5 md:px-6 pt-14 md:pt-20 pb-10 md:pb-14 text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-12"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 35%, rgba(255,255,255,0) 100%)",
          }}
        />

        {/* Eyebrow */}
        <div
          className="mb-6 flex items-center gap-4"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
          }}
        >
          <div
            className="h-[1px] w-12"
            style={{
              background: "linear-gradient(to right, transparent, #08818d)",
            }}
          />
          <p className="font-mono text-[9px] md:text-sm uppercase tracking-[3px] md:tracking-[7px] text-[#08818d]">
            {t.aboutFirm.eyebrow}
          </p>
          <div
            className="h-[1px] w-12"
            style={{
              background: "linear-gradient(to left, transparent, #08818d)",
            }}
          />
        </div>

        {/* Title line 1 */}
        <h2
          className="mb-0 font-black uppercase text-white text-5xl sm:text-6xl md:text-8xl mb-5"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            lineHeight: 0.88,
            letterSpacing: "0.05em",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition:
              "opacity 0.8s ease 0.2s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s",
          }}
        >
          {t.aboutFirm.titleTop}
        </h2>

        {/* Title line 2 */}
        <h2
          className="mb-10 font-black uppercase text-5xl sm:text-6xl md:text-8xl"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            lineHeight: 0.88,
            letterSpacing: "0.05em",
            color: "#08818d",
            textShadow: "0 0 60px rgba(8,129,141,0.25)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition:
              "opacity 0.8s ease 0.32s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.32s",
          }}
        >
          {t.aboutFirm.titleAccent}
        </h2>

        {/* Stats */}
        <div
          className="flex flex-wrap items-center justify-center gap-6 md:gap-16 pt-6 md:pt-8 border-t w-full max-w-xl"
          style={{
            borderColor: "rgba(255,255,255,0.06)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s",
          }}
        >
          <StatPill
            num={20}
            suffix="+"
            label={t.aboutFirm.builtPrecision || "Years Active"}
            active={visible}
          />
          <div
            className="h-8 w-[1px]"
            style={{ background: "rgba(255,255,255,0.06)" }}
          />
          <StatPill num={500} suffix="+" label="Projects" active={visible} />
          <div
            className="h-8 w-[1px]"
            style={{ background: "rgba(255,255,255,0.06)" }}
          />
          <StatPill
            num={100}
            suffix="%"
            label="Satisfaction"
            active={visible}
          />
        </div>
      </div>
    </div>
  );
};

// ─── Divider ─────────────────────────────────────────────────────────────────
interface DividerProps {
  index: number;
  total: number;
}
const Divider = ({ index, total }: DividerProps) => (
  <div
    className="relative z-10 flex items-center overflow-hidden"
    style={{ background: "#0c0c0f", height: "48px" }}
  >
    <div
      className="flex-1 h-[1px]"
      style={{
        background:
          "linear-gradient(to right, transparent, rgba(255,255,255,0.07))",
      }}
    />
    <div className="flex items-center gap-3 px-5 shrink-0">
      <div className="h-[1px] w-4" style={{ background: "#08818d" }} />
      <span
        className="font-mono text-[9px] tracking-[4px] uppercase"
        style={{ color: "rgba(8,129,141,0.7)" }}
      >
        {String(index + 1).padStart(2, "0")}&nbsp;·&nbsp;
        {String(total).padStart(2, "0")}
      </span>
      <div
        className="h-2 w-2 rotate-45 shrink-0"
        style={{
          background: "rgba(8,129,141,0.4)",
          outline: "1px solid rgba(8,129,141,0.25)",
        }}
      />
      <span
        className="font-mono text-[9px] tracking-[4px] uppercase"
        style={{ color: "rgba(255,255,255,0.15)" }}
      >
        NEXT
      </span>
      <div
        className="h-[1px] w-4"
        style={{ background: "rgba(255,255,255,0.1)" }}
      />
    </div>
    <div
      className="flex-1 h-[1px]"
      style={{
        background:
          "linear-gradient(to left, transparent, rgba(255,255,255,0.07))",
      }}
    />
  </div>
);

// ─── About row ────────────────────────────────────────────────────────────────
interface AboutRowProps {
  item: AboutFirmProps;
  index: number;
  total: number;
}

const AboutRow = ({ item, index, total }: AboutRowProps) => {
  const isEven = index % 2 === 0;
  const [ref, visible] = useInView(0.15);
  const isDesktop = useIsDesktop();
  const d = (s: number) => `${s}s`;

  return (
    <div
      ref={ref}
      className="group relative overflow-hidden md:min-h-135"
      style={{ background: "#0f0f12" }}
    >
      {/* Hover scan line */}
      <div
        className="pointer-events-none absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: isEven
            ? "linear-gradient(90deg, transparent, rgba(8,129,141,0.03) 50%, transparent)"
            : "linear-gradient(270deg, transparent, rgba(8,129,141,0.03) 50%, transparent)",
        }}
      />

      <div
        className={`relative flex flex-col md:flex-row items-stretch md:min-h-135 ${isEven ? "" : "md:flex-row-reverse"}`}
      >
        {/* ── Image ── */}
        <div
          className="relative w-full md:w-[57%] overflow-hidden min-h-60 md:min-h-0"
          style={{
            clipPath: isDesktop
              ? isEven
                ? "polygon(0 0, 100% 0, 91% 100%, 0 100%)"
                : "polygon(9% 0, 100% 0, 100% 100%, 0 100%)"
              : "none",
            opacity: visible ? 1 : 0,
            transform: visible ? "scale(1)" : "scale(1.07)",
            transition:
              "opacity 1.1s ease, transform 1.4s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            loading={index === 0 ? "eager" : "lazy"}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <div
            className="absolute inset-0"
            style={{ background: "rgba(12,12,15,0.25)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: isEven
                ? "linear-gradient(to right, rgba(15,15,18,0) 40%, rgba(15,15,18,0.97) 100%)"
                : "linear-gradient(to left, rgba(15,15,18,0) 40%, rgba(15,15,18,0.97) 100%)",
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-1/3"
            style={{
              background:
                "linear-gradient(to top, rgba(15,15,18,0.7), transparent)",
            }}
          />

          {/* Teal bottom glow */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 group-hover:h-[2px] transition-all duration-700"
            style={{
              background:
                "linear-gradient(90deg, transparent, #08818d, transparent)",
            }}
          />

          {/* Index badge */}
          <div
            className="absolute top-6"
            style={{
              [isEven ? "left" : "right"]: "20px",
              opacity: visible ? 1 : 0,
              transition: `opacity 0.6s ease ${d(0.6)}`,
            }}
          >
            <span
              className="font-mono text-[10px] tracking-[4px] uppercase px-2 py-1"
              style={{
                color: "rgba(255,255,255,0.3)",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(12,12,15,0.6)",
                backdropFilter: "blur(8px)",
              }}
            >
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* ── Text ── */}
        <div
          className={`relative z-10 flex flex-col justify-center w-full md:w-[50%] px-6 md:px-16 py-10 md:py-24 ${isEven ? "md:-ml-[7%]" : "md:-mr-[7%]"}`}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible
              ? "translateX(0)"
              : isEven
                ? "translateX(50px)"
                : "translateX(-50px)",
            transition: `opacity 0.9s ease ${d(0.2)}, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${d(0.2)}`,
          }}
        >
          {/* Ghost number */}
          <div
            className="pointer-events-none select-none absolute"
            style={{
              [isEven ? "right" : "left"]: "-5px",
              top: "50%",
              transform: "translateY(-52%)",
              fontSize: "clamp(80px, 18vw, 200px)",
              fontFamily: "'Bebas Neue', sans-serif",
              lineHeight: 1,
              color: "transparent",
              WebkitTextStroke: "1px rgba(8,129,141,0.07)",
              fontWeight: 900,
              opacity: visible ? 1 : 0,
              transition: `opacity 1s ease ${d(0.4)}`,
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </div>

          {/* Animated accent line */}
          <div className="mb-7 flex items-center gap-3">
            <div
              style={{
                height: "2px",
                background: "linear-gradient(to right, #08818d, #0aa3b0)",
                width: visible ? "48px" : "0px",
                transition: `width 0.7s cubic-bezier(0.16,1,0.3,1) ${d(0.4)}`,
                boxShadow: "0 0 8px rgba(8,129,141,0.5)",
              }}
            />
            <span
              className="font-mono text-[9px] uppercase tracking-[5px]"
              style={{
                color: "#08818d",
                opacity: visible ? 1 : 0,
                transition: `opacity 0.5s ease ${d(0.5)}`,
              }}
            >
              {item.title.toUpperCase()}
            </span>
          </div>

          {/* Title */}
          <h2
            className="mb-5 font-black uppercase text-white"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(2.6rem, 5vw, 4.2rem)",
              lineHeight: 0.9,
              letterSpacing: "0.06em",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(22px)",
              transition: `opacity 0.7s ease ${d(0.3)}, transform 0.7s ease ${d(0.3)}`,
            }}
          >
            {item.title}
          </h2>

          {/* Description */}
          <p
            className="mb-10 leading-[1.95] text-sm max-w-[360px]"
            style={{
              color: "rgba(255,255,255,0.32)",
              letterSpacing: "0.02em",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(18px)",
              transition: `opacity 0.7s ease ${d(0.42)}, transform 0.7s ease ${d(0.42)}`,
            }}
          >
            {item.description}
          </p>

          {/* Tags */}
          <div
            className="flex flex-wrap gap-2"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(12px)",
              transition: `opacity 0.6s ease ${d(0.54)}, transform 0.6s ease ${d(0.54)}`,
            }}
          >
            {["Precision", "Quality", "Trust"].map((tag) => (
              <span
                key={tag}
                className="text-[9px] uppercase tracking-[3px] px-3 py-1.5 transition-colors duration-300"
                style={{
                  color: "rgba(255,255,255,0.2)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(8,129,141,0.04)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Bottom rule */}
          <div
            className="mt-10 pt-6 border-t"
            style={{
              borderColor: "rgba(255,255,255,0.05)",
              opacity: visible ? 1 : 0,
              transition: `opacity 0.6s ease ${d(0.62)}`,
            }}
          >
            <div
              className="flex items-center gap-2"
              style={{
                color: "rgba(255,255,255,0.12)",
                fontSize: "9px",
                letterSpacing: "3px",
                textTransform: "uppercase",
              }}
            >
              <div
                className="h-[1px] w-3"
                style={{ background: "rgba(8,129,141,0.5)" }}
              />
              <span>Since 2003 · Built to Last</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const About: AboutFirmProps[] = [
  {
    title: "Holder1",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est quos quas deleniti quae vel repudiandae et nemo earum eum repellat dolore magni sequi reiciendis numquam iure necessitatibus iusto qui officia facere illo, id error cum. Ut unde ex enim delectus!",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fswattsgroup.com%2Fwp-content%2Fuploads%2F2025%2F06%2FSWG-Intern-at-Horseshoe-Bay-March-2025-2.jpg&f=1&nofb=1&ipt=4731d0ed1d8e629cf37d9d682592e5f91549ca509488760bbb19863067f4d875",
  },
  {
    title: "Holder2",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est quos quas deleniti quae vel repudiandae et nemo earum eum repellat dolore magni sequi reiciendis numquam iure necessitatibus iusto qui officia facere illo, id error cum. Ut unde ex enim delectus!",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapers.com%2Fimages%2Ffeatured%2Flandscape-background-7qz3urxzjuhvnfcl.jpg&f=1&nofb=1&ipt=a35ad62a4b15aad14553fe67df7121e45e6a0c05d798776f28e47df524971b32",
  },
  {
    title: "Holder3",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est quos quas deleniti quae vel repudiandae et nemo earum eum repellat dolore magni sequi reiciendis numquam iure necessitatibus iusto qui officia facere illo, id error cum. Ut unde ex enim delectus!",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapers.com%2Fimages%2Ffeatured%2Flandscape-background-7qz3urxzjuhvnfcl.jpg&f=1&nofb=1&ipt=a35ad62a4b15aad14553fe67df7121e45e6a0c05d798776f28e47df524971b32",
  },
  {
    title: "Holder4",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est quos quas deleniti quae vel repudiandae et nemo earum eum repellat dolore magni sequi reiciendis numquam iure necessitatibus iusto qui officia facere illo, id error cum. Ut unde ex enim delectus!",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapers.com%2Fimages%2Ffeatured%2Flandscape-background-7qz3urxzjuhvnfcl.jpg&f=1&nofb=1&ipt=a35ad62a4b15aad14553fe67df7121e45e6a0c05d798776f28e47df524971b32",
  },
];

// ─── CTA Band ─────────────────────────────────────────────────────────────────
const CtaBand = () => {
  const [ref, visible] = useInView(0.25);
  const { t } = useLanguage();

  return (
    <div
      ref={ref}
      className="relative overflow-hidden flex flex-col items-center px-6 py-16 md:py-28 text-center"
      style={{ background: "#0c0c0f" }}
    >
      {/* Radial teal spotlight */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(8,129,141,0.12) 0%, transparent 70%)",
          opacity: visible ? 1 : 0,
          transition: "opacity 1.2s ease 0.3s",
        }}
      />

      {/* Top glow rule */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(8,129,141,0.35), transparent)",
        }}
      />

      {/* Corner brackets */}
      <div
        className="pointer-events-none absolute top-5 left-5 md:top-8 md:left-8 w-6 h-6 md:w-8 md:h-8 border-l-2 border-t-2"
        style={{ borderColor: "rgba(8,129,141,0.3)" }}
      />
      <div
        className="pointer-events-none absolute top-5 right-5 md:top-8 md:right-8 w-6 h-6 md:w-8 md:h-8 border-r-2 border-t-2"
        style={{ borderColor: "rgba(8,129,141,0.3)" }}
      />
      <div
        className="pointer-events-none absolute bottom-5 left-5 md:bottom-8 md:left-8 w-6 h-6 md:w-8 md:h-8 border-l-2 border-b-2"
        style={{ borderColor: "rgba(8,129,141,0.3)" }}
      />
      <div
        className="pointer-events-none absolute bottom-5 right-5 md:bottom-8 md:right-8 w-6 h-6 md:w-8 md:h-8 border-r-2 border-b-2"
        style={{ borderColor: "rgba(8,129,141,0.3)" }}
      />

      <div className="relative z-10 flex flex-col items-center gap-5">
        {/* Eyebrow */}
        <div
          className="flex items-center gap-4"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
          }}
        >
          <div className="h-[1px] w-8 bg-[#08818d]" />
          <p className="font-mono text-[9px] md:text-sm uppercase tracking-[3px] md:tracking-[7px] text-[#08818d]">
            {t.aboutFirm.ready}
          </p>
          <div className="h-[1px] w-8 bg-[#08818d]" />
        </div>

        {/* CTA title */}
        <h3
          className="font-black uppercase text-white"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(3rem, 10vw, 8rem)",
            lineHeight: 0.88,
            letterSpacing: "0.05em",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(28px)",
            transition:
              "opacity 0.8s ease 0.2s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s",
          }}
        >
          {t.aboutFirm.ctaTop}
        </h3>
        <h3
          className="font-black uppercase"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(3rem, 10vw, 8rem)",
            lineHeight: 0.88,
            letterSpacing: "0.05em",
            color: "#08818d",
            textShadow: "0 0 40px rgba(8,129,141,0.4)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(28px)",
            transition:
              "opacity 0.8s ease 0.3s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s",
          }}
        >
          {t.aboutFirm.ctaAccent}
        </h3>

        <p
          className="max-w-sm text-sm uppercase tracking-[3px]"
          style={{
            color: "rgba(255,255,255,0.25)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s",
          }}
        >
          {t.aboutFirm.ctaFooter}
        </p>

        {/* Glassy button */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s",
            marginTop: "12px",
          }}
        >
          <Link href="/contact">
            <button
              className="relative group/btn overflow-hidden px-8 md:px-16 py-4 md:py-5 text-xs md:text-sm font-bold uppercase tracking-[2px] md:tracking-[4px] text-white transition-all duration-300 hover:-translate-y-1 active:translate-y-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(8,129,141,0.22) 0%, rgba(10,163,176,0.12) 100%)",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                border: "1px solid rgba(8,129,141,0.35)",
                clipPath:
                  "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
                boxShadow:
                  "0 0 30px rgba(8,129,141,0.18), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
            >
              {/* Shimmer sweep on hover */}
              <div
                className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)",
                }}
              />
              {/* Top edge highlight */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-[1px]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                }}
              />
              {/* Bottom edge glow */}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[1px] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(8,129,141,0.6), transparent)",
                }}
              />
              <span className="relative z-10 drop-shadow-[0_0_8px_rgba(8,129,141,0.5)]">
                {t.aboutFirm.ctaButton}
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// ─── Main section ─────────────────────────────────────────────────────────────
const ScrollSection = () => (
  <section className="w-full" style={{ background: "#0c0c0f" }}>
    <SectionHeader />
    {About.map((item, i) => (
      <div key={item.title}>
        <AboutRow item={item} index={i} total={About.length} />
        {i < About.length - 1 && <Divider index={i} total={About.length} />}
      </div>
    ))}
    <CtaBand />
  </section>
);

export default ScrollSection;
