"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUpRight,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import companyData from "@/lib/companyData";
import { useLanguage } from "@/components/providers/LanguageProvider";

type FormInput = {
  name: string;
  email: string;
  phone: string;
  type: string;
  message: string;
};

const ACCENT = "#08818d";

async function sendEmail(formData: FormInput) {
  const response = await fetch("/api/email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  if (!response.ok) throw new Error("Failed to send email");
  return response.json();
}

function ContactPage() {
  const { t } = useLanguage();

  const mutation = useMutation({
    mutationFn: sendEmail,
    onSuccess: (data) => {
      console.log("Success!", data);
    },
    onError: (error) => {
      console.error("Error submitting form:", error);
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as unknown as FormInput;
    mutation.mutate(data, {
      onSuccess: () => {
        (e.target as HTMLFormElement).reset();
      },
    });
  }

  const inputClasses =
    "mt-2 w-full rounded-none border border-white/10 bg-white/3 px-4 py-3 text-sm text-white placeholder:text-white/30 transition-colors duration-300 focus:outline-none focus:border-[#08818d] focus:bg-white/5";

  const labelClasses =
    "text-[10px] uppercase tracking-[3px] text-white/50 font-bold";

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        {/* Accent glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-40 h-125 w-125 rounded-full blur-[140px] opacity-25"
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

        <div className="relative z-10 container mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-24">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-[#08818d]" />
            <p className="text-[10px] md:text-[11px] uppercase tracking-[5px] md:tracking-[6px] font-bold text-[#08818d]">
              {t.contactPage.eyebrow}
            </p>
          </div>

          <h1
            className="text-5xl md:text-8xl lg:text-9xl font-black uppercase tracking-wider text-white leading-[0.9]"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {t.contactPage.titleTop}
            <br />
            <span className="text-white/25">{t.contactPage.titleAccent}</span>
          </h1>

          <p className="mt-8 text-white/50 text-xs md:text-sm tracking-[4px] uppercase max-w-xl">
            {t.contactPage.subtitle}
          </p>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <div className="relative container mx-auto px-6 pb-20 md:pb-28">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-10 items-start max-w-7xl mx-auto">
          {/* ── LEFT: Info panel ── */}
          <aside className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-4 mb-2">
              <span className="font-mono text-[10px] tracking-[4px] text-[#08818d]/60">
                01
              </span>
              <span className="text-[11px] uppercase tracking-[5px] font-bold text-[#08818d]">
                {t.contactPage.contactInfo}
              </span>
              <span className="flex-1 h-px bg-linear-to-r from-[#08818d]/40 to-transparent" />
            </div>

            {[
              {
                icon: <MapPin size={16} aria-hidden />,
                label: t.contactPage.office,
                value: companyData.address,
                href: null,
              },
              {
                icon: <Phone size={16} aria-hidden />,
                label: t.contactPage.callUs,
                value: companyData.phone,
                href: `tel:${companyData.phone}`,
              },
              {
                icon: <Mail size={16} aria-hidden />,
                label: t.contactPage.emailUs,
                value: companyData.email,
                href: `mailto:${companyData.email}`,
              },
              {
                icon: <Clock size={16} aria-hidden />,
                label: t.contactPage.workingHours,
                value: companyData.workingHours,
                href: null,
              },
            ].map(({ icon, label, value, href }) => {
              const inner = (
                <>
                  <div
                    aria-hidden
                    className="absolute left-0 top-0 w-px h-full bg-[#08818d] scale-y-0 origin-top group-hover:scale-y-100 transition-transform duration-500"
                  />
                  <div className="flex items-center justify-center w-10 h-10 shrink-0 bg-[#08818d]/15 border border-[#08818d]/30 text-[#08818d] group-hover:bg-[#08818d]/25 group-hover:text-[#2dd4bf] transition-colors duration-300">
                    {icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-[9px] uppercase tracking-[3px] text-white/40 font-bold mb-1">
                      {label}
                    </p>
                    <p className="text-sm text-white/85 leading-relaxed whitespace-pre-line">
                      {value}
                    </p>
                  </div>
                  {href && (
                    <ArrowUpRight
                      size={14}
                      className="shrink-0 text-white/20 group-hover:text-[#2dd4bf] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                      aria-hidden
                    />
                  )}
                </>
              );

              const commonClasses =
                "group relative overflow-hidden flex items-center gap-4 p-5 backdrop-blur-xl bg-white/3 border border-white/10 hover:bg-white/6 hover:border-[#08818d]/30 transition-all duration-300";

              return href ? (
                <a key={label} href={href} className={commonClasses}>
                  {inner}
                </a>
              ) : (
                <div key={label} className={commonClasses}>
                  {inner}
                </div>
              );
            })}

            {/* Response time block */}
            <div
              className="relative overflow-hidden mt-2 p-6 md:p-7 border border-[#08818d]/30"
              style={{
                background: `linear-gradient(135deg, ${ACCENT}, #0aa3b0)`,
                clipPath:
                  "polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 18px 100%, 0 calc(100% - 18px))",
                boxShadow: "0 0 40px rgba(8,129,141,0.2)",
              }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full blur-[60px] opacity-50 bg-white"
              />
              <p className="relative text-[10px] uppercase tracking-[4px] text-white/70 font-bold mb-2">
                {t.contactPage.responseTime}
              </p>
              <p
                className="relative text-5xl font-black tracking-wider text-white"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {t.contactPage.within24}
              </p>
              <p className="relative text-sm text-white/75 mt-2 leading-relaxed">
                {t.contactPage.responseText}
              </p>
            </div>
          </aside>

          {/* ── RIGHT: Form ── */}
          <div className="lg:col-span-3">
            <div
              className="relative overflow-hidden backdrop-blur-xl bg-white/3 border border-white/10"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 18px 100%, 0 calc(100% - 18px))",
              }}
            >
              {/* Accent halo */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full blur-[80px] opacity-30"
                style={{ backgroundColor: ACCENT }}
              />

              {/* Card header */}
              <div className="relative border-b border-white/10 px-7 md:px-10 py-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-[10px] tracking-[4px] text-[#08818d]/60">
                    02
                  </span>
                  <span className="text-[11px] uppercase tracking-[5px] font-bold text-[#08818d]">
                    {t.contactPage.sendRequest}
                  </span>
                </div>
                <h2
                  className="text-3xl md:text-4xl font-black uppercase tracking-wider text-white leading-none"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {t.contactPage.fillDetails}
                </h2>
              </div>

              <form
                className="relative px-7 md:px-10 py-8"
                onSubmit={handleSubmit}
              >
                <FieldGroup>
                  {/* Name + Email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field>
                      <FieldLabel
                        htmlFor="form-name"
                        className={labelClasses}
                      >
                        {t.contactPage.fullName}
                      </FieldLabel>
                      <Input
                        id="form-name"
                        name="name"
                        type="text"
                        placeholder={t.contactPage.placeholderName}
                        required
                        className={inputClasses}
                      />
                    </Field>
                    <Field>
                      <FieldLabel
                        htmlFor="form-email"
                        className={labelClasses}
                      >
                        {t.contactPage.emailAddress}
                      </FieldLabel>
                      <Input
                        id="form-email"
                        name="email"
                        type="email"
                        placeholder={t.contactPage.placeholderEmail}
                        className={inputClasses}
                      />
                    </Field>
                  </div>

                  {/* Phone + Project Type row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
                    <Field>
                      <FieldLabel
                        htmlFor="form-phone"
                        className={labelClasses}
                      >
                        {t.contactPage.phoneNumber}
                      </FieldLabel>
                      <Input
                        id="form-phone"
                        name="phone"
                        type="tel"
                        placeholder={t.contactPage.placeholderPhone}
                        className={inputClasses}
                      />
                    </Field>
                    <Field>
                      <FieldLabel
                        htmlFor="form-type"
                        className={labelClasses}
                      >
                        {t.contactPage.projectType}
                      </FieldLabel>
                      <select
                        id="form-type"
                        name="type"
                        className={`${inputClasses} appearance-none cursor-pointer`}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2308818d' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 12px center",
                          backgroundSize: "16px",
                          paddingRight: "40px",
                        }}
                      >
                        <option
                          className="bg-[#0a0a0b] text-white"
                          value={t.contactPage.typeRenovation}
                        >
                          {t.contactPage.typeRenovation}
                        </option>
                        <option
                          className="bg-[#0a0a0b] text-white"
                          value={t.contactPage.typeNewBuild}
                        >
                          {t.contactPage.typeNewBuild}
                        </option>
                        <option
                          className="bg-[#0a0a0b] text-white"
                          value={t.contactPage.typeCommercial}
                        >
                          {t.contactPage.typeCommercial}
                        </option>
                        <option
                          className="bg-[#0a0a0b] text-white"
                          value={t.contactPage.typeSmallRepair}
                        >
                          {t.contactPage.typeSmallRepair}
                        </option>
                      </select>
                    </Field>
                  </div>

                  {/* Message */}
                  <Field className="mt-5">
                    <FieldLabel
                      htmlFor="form-message"
                      className={labelClasses}
                    >
                      {t.contactPage.projectDetails}
                    </FieldLabel>
                    <textarea
                      id="form-message"
                      name="message"
                      className={`${inputClasses} min-h-36 resize-none`}
                      placeholder={t.contactPage.placeholderMessage}
                    />
                  </Field>

                  {/* Submit row */}
                  <div className="flex flex-col sm:flex-row sm:justify-end sm:items-center gap-4 pt-7 mt-5 border-t border-white/10">
                    {mutation.isSuccess && (
                      <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[3px] text-[#2dd4bf] font-bold">
                        <CheckCircle2 size={14} aria-hidden />
                        {t.contactPage.success}
                      </span>
                    )}
                    {mutation.isError && (
                      <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[3px] text-red-400 font-bold">
                        <AlertCircle size={14} aria-hidden />
                        {t.contactPage.error}
                      </span>
                    )}
                    <Button
                      type="submit"
                      disabled={mutation.isPending}
                      className="group relative rounded-none px-10 py-5 text-[11px] font-bold uppercase tracking-[4px] text-white overflow-hidden transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
                      style={{
                        background: `linear-gradient(135deg, ${ACCENT}, #0aa3b0)`,
                        clipPath:
                          "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
                        boxShadow: "0 0 25px rgba(8,129,141,0.3)",
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
                      <span className="relative inline-flex items-center gap-2">
                        {mutation.isPending
                          ? t.contactPage.sending
                          : t.contactPage.send}
                        <Send
                          size={12}
                          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          aria-hidden
                        />
                      </span>
                    </Button>
                  </div>
                </FieldGroup>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
