"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { AuditSchema, type AuditInput } from "@/lib/validations";

type State = "idle" | "loading" | "success" | "error";

export function CtaBannerSection() {
  const [state, setState] = useState<State>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuditInput>({
    resolver: zodResolver(AuditSchema),
  });

  const onSubmit = async (data: AuditInput) => {
    setState("loading");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setState("success");
      reset();
    } catch (e) {
      setState("error");
      setErrorMsg("Something went wrong. Try again or email hello@nexorai.io.");
    }
  };

  return (
    <section className="section relative overflow-hidden" style={{ background: "var(--bg-surface)" }}>
      <div
        aria-hidden
        className="cta-blob"
        style={{ width: 600, height: 600, top: "-10%", left: "-10%", background: "rgba(0,229,255,0.06)" }}
      />
      <div
        aria-hidden
        className="cta-blob"
        style={{ width: 500, height: 500, bottom: "-15%", right: "-10%", background: "rgba(123,97,255,0.05)", animationDelay: "4s" }}
      />
      <div
        aria-hidden
        className="cta-blob"
        style={{ width: 380, height: 380, top: "30%", left: "40%", background: "rgba(255,107,53,0.04)", animationDelay: "8s" }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black, transparent)",
          opacity: 0.5,
        }}
      />

      <div className="container-x relative z-10">
        <div
          className="mx-auto rounded-3xl border px-6 py-10 md:px-10 md:py-12"
          style={{
            maxWidth: 920,
            background: "linear-gradient(180deg, rgba(10,13,26,0.92), rgba(10,13,26,0.82))",
            borderColor: "rgba(255,255,255,0.08)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.45)",
          }}
        >
          <div className="section-header section-header--center !pt-0">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45 }}
              className="label-eyebrow"
            >
              FREE STRATEGY CALL
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="mx-auto font-display"
              style={{
                maxWidth: 760,
                fontSize: "clamp(34px, 4.2vw, 58px)",
                fontWeight: 800,
                letterSpacing: "-1.4px",
                lineHeight: 1.04,
              }}
            >
              Have a Problem AI Can Solve?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="section-subtitle"
              style={{ maxWidth: 620 }}
            >
              Book a free technical discovery call. We will tell you clearly what is feasible, what is not, and the fastest path to production.
            </motion.p>
          </div>

          {state === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mx-auto mt-8 max-w-[560px] rounded-xl px-5 py-4 text-[15px] text-center"
              style={{
                background: "rgba(16,185,129,0.08)",
                border: "1px solid rgba(16,185,129,0.3)",
                color: "var(--accent-green)",
                fontWeight: 500,
              }}
            >
              ✓ Request received. We will reach out within 2 business hours.
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-8 max-w-[680px]">
              <div
                className="flex flex-col gap-3 rounded-2xl border p-3 sm:flex-row sm:items-center"
                style={{
                  borderColor: errors.email ? "var(--accent-orange)" : "rgba(255,255,255,0.09)",
                  background: "rgba(5,7,15,0.55)",
                }}
              >
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Enter your work email"
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  className={`input flex-1 border-0 bg-transparent ${errors.email ? "shake" : ""}`}
                  style={errors.email ? { boxShadow: "none" } : { boxShadow: "none" }}
                />
                <button
                  type="submit"
                  disabled={state === "loading"}
                  className="btn-primary sm:min-w-[180px]"
                  style={{ padding: "13px 24px" }}
                >
                  {state === "loading" ? "Sending..." : "Book Free Call"}
                </button>
              </div>
            </form>
          )}

          {errorMsg && state === "error" && (
            <p className="mt-3 text-center text-[13px]" style={{ color: "var(--accent-orange)" }}>
              {errorMsg}
            </p>
          )}

          <div className="mt-7 flex flex-wrap items-center justify-center gap-2 text-[13px] md:text-[14px]">
            {["50+ projects", "8 industries", "4 countries"].map((item) => (
              <span
                key={item}
                className="rounded-full px-3 py-1.5"
                style={{
                  color: "var(--text-secondary)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
