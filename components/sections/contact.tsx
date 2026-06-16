"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ContactSchema, type ContactInput } from "@/lib/validations";

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
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[40fr_60fr] lg:gap-10">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="section-header section-header--left rounded-3xl border p-7 md:p-9"
            style={{
              borderColor: "rgba(255,255,255,0.08)",
              background: "linear-gradient(180deg, rgba(15,19,32,0.82), rgba(15,19,32,0.55))",
            }}
          >
            <span className="label-eyebrow">CONTACT</span>
            <h2 className="h2-section">Let's Talk About Your Data</h2>
            <p className="section-subtitle" style={{ maxWidth: 440 }}>
              Tell us your problem. We'll tell you if AI can solve it — and exactly how we'd build it.
            </p>

            <div className="mt-8 flex items-center gap-2 text-[14px]">
              <span className="pulse-dot inline-block h-2 w-2 rounded-full" style={{ background: "var(--accent-green)" }} />
              <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>
                Reply within 2 hours on business days
              </span>
            </div>
            <p className="mt-2 text-[13px]" style={{ color: "var(--text-secondary)" }}>
              Available US · UK · EU · AUS · ME
            </p>

            <div className="mt-7 space-y-3 text-[15px]">
              <a
                href="mailto:hello@nexorai.io"
                className="block transition-colors hover:text-accent-cyan"
                style={{ color: "var(--text-primary)", fontWeight: 500 }}
              >
                ✉  hello@nexorai.io
              </a>
              <a
                href="https://calendly.com/"
                target="_blank"
                rel="noreferrer noopener"
                className="block text-accent-cyan transition-opacity hover:opacity-80"
              >
                Book a technical call directly →
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-2.5">
              {["LinkedIn", "GitHub", "Twitter / X", "Upwork"].map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  className="rounded-full px-4 py-2 text-[12px] transition-all duration-200 hover:border-accent-cyan hover:text-accent-cyan"
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border-subtle)",
                    color: "var(--text-secondary)",
                    fontWeight: 500,
                  }}
                >
                  {s}
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
            className="space-y-4 rounded-3xl border p-6 md:p-8"
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
              {state === "success" && "Message sent! We'll reply within 2 hours ✓"}
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
