"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ContactSchema, type ContactInput } from "@/lib/validations";
import { CONTACT_EMAIL, CONTACT_MAILTO, SOCIAL_LINKS } from "@/lib/site";

type State = "idle" | "loading" | "success" | "error";

const INDUSTRIES = [
  "E-Commerce / Retail",
  "FinTech / Banking",
  "Healthcare",
  "Manufacturing",
  "SaaS",
  "Logistics",
  "Real Estate",
  "Marketing / Media",
  "Other",
];

const PROJECT_TYPES = [
  "ML Model Development",
  "Data Engineering / Pipeline",
  "NLP / LLM Application",
  "Computer Vision",
  "AI Automation / Workflow",
  "Full-Stack AI Application",
  "Data Analytics / Dashboard",
  "Not sure — need advice",
];

const BUDGETS = ["Under $1k", "$1k–$5k", "$5k–$20k", "$20k+"];

export function ContactSection() {
  const [state, setState] = useState<State>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(ContactSchema),
  });

  const onSubmit = async (data: ContactInput) => {
    setState("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setState("success");
      reset();
    } catch {
      setState("error");
    }
  };

  return (
    <section id="contact" className="section" style={{ background: "var(--bg-primary)" }}>
      <div className="container-x">
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[38fr_62fr] lg:gap-10">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="flex h-full min-h-0 flex-col rounded-3xl border p-5 sm:p-7 md:p-8"
            style={{
              borderColor: "rgba(255,255,255,0.08)",
              background: "linear-gradient(180deg, rgba(15,19,32,0.92), rgba(15,19,32,0.72))",
            }}
          >
            <span className="label-eyebrow">CONTACT</span>
            <h2
              className="font-display font-bold"
              style={{
                fontSize: "clamp(28px, 3.2vw, 40px)",
                lineHeight: 1.12,
                letterSpacing: "-1.2px",
                color: "var(--text-primary)",
                marginTop: 10,
                marginBottom: 14,
              }}
            >
              <span className="block">Let&apos;s Build Your</span>
              <span className="block">AI Solution</span>
            </h2>
            <p
              className="text-[15px] leading-[1.65]"
              style={{ color: "var(--text-secondary)", maxWidth: 420 }}
            >
              Tell us your problem. We&apos;ll tell you if AI can solve it — and exactly how we&apos;d build it.
            </p>

            <div
              className="mt-7 rounded-2xl border px-4 py-3.5"
              style={{
                borderColor: "rgba(255,255,255,0.06)",
                background: "rgba(5,7,15,0.35)",
              }}
            >
              <div className="flex items-center gap-2 text-[14px]">
                <span
                  className="pulse-dot inline-block h-2 w-2 shrink-0 rounded-full"
                  style={{ background: "var(--accent-green)" }}
                />
                <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>
                  Reply within 1 business day
                </span>
              </div>
              <p className="mt-1.5 pl-4 text-[13px]" style={{ color: "var(--text-secondary)" }}>
                Available US · UK · EU · AUS · ME
              </p>
            </div>

            <div className="mt-6 space-y-2.5 text-[15px]">
              <a
                href={CONTACT_MAILTO}
                className="inline-flex items-center gap-2 transition-opacity hover:opacity-80"
                style={{ color: "var(--accent-cyan)", fontWeight: 500 }}
              >
                <svg
                  aria-hidden
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
                {CONTACT_EMAIL}
              </a>
            </div>

            <div
              className="mt-8 space-y-3 text-[14px] leading-[1.55]"
              style={{ color: "var(--text-secondary)" }}
            >
              <p style={{ color: "var(--text-primary)", fontWeight: 600 }}>What happens next</p>
              <ol className="m-0 list-none space-y-2.5 p-0">
                {[
                  "We review your brief within 1 business day",
                  "You get a clear yes/no on AI feasibility",
                  "If it fits, we send a scoped next-step plan",
                ].map((step, i) => (
                  <li key={step} className="flex gap-3">
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold"
                      style={{
                        background: "rgba(0,229,255,0.1)",
                        color: "var(--accent-cyan)",
                      }}
                    >
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div
              className="mt-auto flex flex-wrap items-center justify-center gap-2.5 border-t pt-6"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={s.label}
                  className="rounded-full px-3.5 py-2 text-[12px] transition-all duration-200 hover:opacity-80"
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid rgba(0,229,255,0.35)",
                    color: "var(--accent-cyan)",
                    fontWeight: 500,
                  }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — form */}
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="flex h-full flex-col space-y-4 rounded-3xl border p-5 sm:p-6 md:p-8"
            style={{
              borderColor: "rgba(255,255,255,0.08)",
              background: "linear-gradient(180deg, rgba(15,19,32,0.9), rgba(10,13,26,0.82))",
            }}
          >
            <div className="mb-1">
              <p className="text-[12px] uppercase tracking-[2px]" style={{ color: "var(--text-muted)", fontWeight: 600 }}>
                Project Inquiry Form
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="field-label" htmlFor="name">Full Name</label>
                <input id="name" className={`input ${errors.name ? "shake" : ""}`} {...register("name")} placeholder="Jane Doe" />
                {errors.name && <p className="field-error">{errors.name.message}</p>}
              </div>
              <div>
                <label className="field-label" htmlFor="company">Company</label>
                <input id="company" className={`input ${errors.company ? "shake" : ""}`} {...register("company")} placeholder="Acme Inc." />
                {errors.company && <p className="field-error">{errors.company.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="field-label" htmlFor="email">Email</label>
                <input id="email" className={`input ${errors.email ? "shake" : ""}`} type="email" {...register("email")} placeholder="you@company.com" />
                {errors.email && <p className="field-error">{errors.email.message}</p>}
              </div>
              <div>
                <label className="field-label" htmlFor="phone">Phone (optional)</label>
                <input id="phone" className="input" {...register("phone")} placeholder="+1 555 123 4567" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="field-label" htmlFor="industry">Industry</label>
                <select id="industry" className={`select ${errors.industry ? "shake" : ""}`} defaultValue="" {...register("industry")}>
                  <option value="" disabled>Select industry</option>
                  {INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
                </select>
                {errors.industry && <p className="field-error">{errors.industry.message}</p>}
              </div>
              <div>
                <label className="field-label" htmlFor="projectType">Project Type</label>
                <select id="projectType" className={`select ${errors.projectType ? "shake" : ""}`} defaultValue="" {...register("projectType")}>
                  <option value="" disabled>Select project type</option>
                  {PROJECT_TYPES.map((i) => <option key={i} value={i}>{i}</option>)}
                </select>
                {errors.projectType && <p className="field-error">{errors.projectType.message}</p>}
              </div>
            </div>

            <div>
              <label className="field-label" htmlFor="budget">Budget</label>
              <select id="budget" className={`select ${errors.budget ? "shake" : ""}`} defaultValue="" {...register("budget")}>
                <option value="" disabled>Select budget</option>
                {BUDGETS.map((i) => <option key={i} value={i}>{i}</option>)}
              </select>
              {errors.budget && <p className="field-error">{errors.budget.message}</p>}
            </div>

            <div>
              <label className="field-label" htmlFor="message">
                Tell us about your data and the problem you want to solve
              </label>
              <textarea
                id="message"
                className={`textarea ${errors.message ? "shake" : ""}`}
                rows={5}
                {...register("message")}
                placeholder="We have 3 years of CRM data and want to predict churn…"
              />
              {errors.message && <p className="field-error">{errors.message.message}</p>}
            </div>

            <button
              type="submit"
              disabled={state === "loading"}
              className="btn-primary w-full"
              style={{
                height: 58,
                fontSize: 16,
                background:
                  state === "success"
                    ? "var(--accent-green)"
                    : state === "error"
                      ? "rgba(255,107,53,0.15)"
                      : undefined,
                color: state === "error" ? "var(--accent-orange)" : undefined,
                border: state === "error" ? "1px solid var(--accent-orange)" : undefined,
              }}
            >
              {state === "loading" && (
                <span
                  aria-hidden
                  className="mr-2 inline-block h-5 w-5 rounded-full"
                  style={{
                    border: "2px solid #05070F",
                    borderTopColor: "transparent",
                    animation: "spin 600ms linear infinite",
                  }}
                />
              )}
              {state === "idle" && "Send Message →"}
              {state === "loading" && "Sending…"}
              {state === "success" && "Message sent! We'll reply within 1 business day ✓"}
              {state === "error" && "Something went wrong — email us directly"}
            </button>

            <style jsx>{`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}</style>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
