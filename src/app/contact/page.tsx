"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

type FormInput = {
  name: string;
  email: string;
  phone: string;
  type: string;
  message: string;
};

const contactPageBackground = "#f8fffe";

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
  const pageStyle: React.CSSProperties & { "--contact-page-bg": string } = {
    "--contact-page-bg": contactPageBackground,
  };

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

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden bg-[#1C1C1E]"
      style={pageStyle}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              rgba(255,255,255,0.015) 0px,
              rgba(255,255,255,0.015) 1px,
              transparent 1px,
              transparent 40px
            )
          `,
        }}
      />

      {/* ── HERO BANNER ── */}
      <div className="relative bg-[#08818d] overflow-hidden">
        {/* Background grid texture */}
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
        <div className="relative z-10 container mx-auto px-6 py-20 md:py-28">
          <p className="text-xs uppercase tracking-[5px] text-[#f8fffe]/50 mb-3 font-semibold">
            Get in Touch
          </p>
          <h1
            className="text-5xl md:text-7xl font-black uppercase tracking-wider text-[#f8fffe] leading-none mb-4"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Let&apos;s Build
            <br />
            <span className="text-[#f8fffe]/30">Something Great</span>
          </h1>
          <p className="text-[#f8fffe]/60 text-sm tracking-widest uppercase max-w-md">
            Tell us about your project and we&apos;ll get back to you within 24
            hours.
          </p>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="container mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-5 gap-12 items-start max-w-6xl mx-auto">
          {/* ── LEFT: Info panel ── */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <div>
              <h2
                className="text-3xl font-black uppercase tracking-wider text-[#08818d] mb-2"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Contact Info
              </h2>
              <div className="h-1 w-12 bg-[#08818d]" />
            </div>

            {/* Info cards */}
            {[
              {
                icon: <MapPin size={18} />,
                label: "Our Office",
                value: "123 Construction Ave,\nMetro City, MC 10001",
              },
              {
                icon: <Phone size={18} />,
                label: "Call Us",
                value: "+1 (555) 012-3456",
              },
              {
                icon: <Mail size={18} />,
                label: "Email Us",
                value: "hello@yourcompany.com",
              },
              {
                icon: <Clock size={18} />,
                label: "Working Hours",
                value: "Mon – Fri: 8:00 AM – 6:00 PM\nSat: 9:00 AM – 2:00 PM",
              },
            ].map(({ icon, label, value }) => (
              <div
                key={label}
                className="flex items-start gap-4 p-5 bg-(--contact-page-bg) border-l-4 border-[#08818d] shadow-sm"
              >
                <div className="mt-0.5 text-[#08818d] shrink-0">{icon}</div>
                <div>
                  <p className="text-[10px] uppercase tracking-[3px] text-gray-400 font-semibold mb-1">
                    {label}
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                    {value}
                  </p>
                </div>
              </div>
            ))}

            {/* Decorative block */}
            <div
              className="mt-2 bg-[#08818d] p-6 text-[#f8fffe]"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)",
              }}
            >
              <p className="text-xs uppercase tracking-[4px] text-[#f8fffe]/60 mb-2">
                Response Time
              </p>
              <p
                className="text-4xl font-black tracking-wider"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Within 24hrs
              </p>
              <p className="text-sm text-[#f8fffe]/60 mt-1">
                We take every inquiry seriously.
              </p>
            </div>
          </div>

          {/* ── RIGHT: Form ── */}
          <div className="md:col-span-3">
            <Card className="w-full border-0 shadow-xl rounded-none p-0 overflow-hidden bg-(--contact-page-bg)">
              {/* Card header bar */}
              <div className="bg-[#1C1C1E] px-8 py-5">
                <p
                  className="text-2xl font-black uppercase tracking-widest text-[#f8fffe]"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  Send Us a Request
                </p>
                <p className="text-xs text-[#f8fffe]/40 tracking-widest uppercase mt-1">
                  Fill in the details below
                </p>
              </div>

              <form
                className="p-8 bg-(--contact-page-bg)"
                onSubmit={handleSubmit}
              >
                <FieldGroup>
                  {/* Name + Email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field>
                      <FieldLabel
                        htmlFor="form-name"
                        className="text-[10px] uppercase tracking-[3px] text-gray-500 font-semibold"
                      >
                        Full Name *
                      </FieldLabel>
                      <Input
                        id="form-name"
                        name="name"
                        type="text"
                        placeholder="Jane Smith"
                        required
                        className="rounded-none border-gray-200 focus:border-[#08818d] focus:ring-[#08818d] mt-1"
                      />
                    </Field>
                    <Field>
                      <FieldLabel
                        htmlFor="form-email"
                        className="text-[10px] uppercase tracking-[3px] text-gray-500 font-semibold"
                      >
                        Email Address
                      </FieldLabel>
                      <Input
                        id="form-email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        className="rounded-none border-gray-200 focus:border-[#08818d] focus:ring-[#08818d] mt-1"
                      />
                    </Field>
                  </div>

                  {/* Phone + Project Type row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
                    <Field>
                      <FieldLabel
                        htmlFor="form-phone"
                        className="text-[10px] uppercase tracking-[3px] text-gray-500 font-semibold"
                      >
                        Phone Number
                      </FieldLabel>
                      <Input
                        id="form-phone"
                        name="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        className="rounded-none border-gray-200 focus:border-[#08818d] focus:ring-[#08818d] mt-1"
                      />
                    </Field>
                    <Field>
                      <FieldLabel
                        htmlFor="form-type"
                        className="text-[10px] uppercase tracking-[3px] text-gray-500 font-semibold"
                      >
                        Project Type
                      </FieldLabel>
                      <select
                        id="form-type"
                        name="type"
                        className="mt-1 w-full border border-gray-200 bg-(--contact-page-bg) px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#08818d] focus:ring-1 focus:ring-[#08818d] rounded-none"
                      >
                        <option>Renovation</option>
                        <option>New Build</option>
                        <option>Commercial</option>
                        <option>Small Repair</option>
                      </select>
                    </Field>
                  </div>

                  {/* Message */}
                  <Field className="mt-5">
                    <FieldLabel
                      htmlFor="form-message"
                      className="text-[10px] uppercase tracking-[3px] text-gray-500 font-semibold"
                    >
                      Project Details
                    </FieldLabel>
                    <textarea
                      id="form-message"
                      name="message"
                      className="mt-1 w-full border border-gray-200 bg-(--contact-page-bg) px-3 py-2 text-sm text-gray-700 min-h-32.5 focus:outline-none focus:border-[#08818d] focus:ring-1 focus:ring-[#08818d] rounded-none resize-none"
                      placeholder="We are looking to add a master bath, renovate the kitchen..."
                    />
                  </Field>

                  {/* Submit row */}
                  <div className="flex justify-end items-center gap-4 pt-6 mt-2 border-t border-gray-100">
                    {mutation.isSuccess && (
                      <span className="text-xs uppercase tracking-widest text-[#08818d] font-semibold">
                        ✓ Message Sent!
                      </span>
                    )}
                    {mutation.isError && (
                      <span className="text-xs uppercase tracking-widest text-red-500 font-semibold">
                        ✗ Something went wrong.
                      </span>
                    )}
                    <Button
                      type="submit"
                      disabled={mutation.isPending}
                      className="bg-[#08818d] text-[#f8fffe] hover:bg-[#067580] rounded-none px-10 py-3 text-xs font-bold uppercase tracking-[3px] transition-all duration-200 hover:-translate-y-px active:translate-y-0 disabled:opacity-60"
                      style={{
                        clipPath:
                          "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                      }}
                    >
                      {mutation.isPending ? "Sending..." : "Send Request"}
                    </Button>
                  </div>
                </FieldGroup>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
