"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { ContactInput } from "@/lib/validation";
import { contactSchema } from "@/lib/validation";

const countries = ["🇺🇸 US", "🇬🇧 UK", "🇪🇺 Europe", "🇦🇪 UAE", "🇦🇺 Australia", "🇨🇦 Canada"];
const services = [
  "AI Chatbots & Voice Agents",
  "Workflow Automation",
  "Lead Generation & CRM",
  "Content & SEO Automation",
  "Custom AI Development",
];
const budgets = ["Under $500", "$500-$1k", "$1k-$5k", "$5k+"];

export function ContactForm() {
  const [serverError, setServerError] = useState("");
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      companyName: "",
      email: "",
      phone: "",
      country: "",
      service: "",
      budget: "",
      description: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setServerError("");
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      const data: { error?: string } = await response.json();
      setServerError(data.error ?? "Something went wrong. Please try again.");
      return;
    }

    reset();
    setDone(true);
  });

  if (done) {
    return (
      <div className="glass flex min-h-[400px] flex-col items-center justify-center rounded-3xl p-8 text-center">
        <CheckCircle2 className="mb-3 h-14 w-14 text-emerald-400" />
        <p className="text-xl font-semibold">We&apos;ll be in touch within 2 hours!</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="glass space-y-4 rounded-3xl p-6 md:p-8">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Full Name" error={errors.fullName?.message}>
          <input {...register("fullName")} className="input" />
        </Field>
        <Field label="Company Name" error={errors.companyName?.message}>
          <input {...register("companyName")} className="input" />
        </Field>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Email" error={errors.email?.message}>
          <input type="email" {...register("email")} className="input" />
        </Field>
        <Field label="WhatsApp/Phone" error={errors.phone?.message}>
          <input {...register("phone")} className="input" />
        </Field>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Field label="Country" error={errors.country?.message}>
          <select {...register("country")} className="input">
            <option value="">Select</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Service" error={errors.service?.message}>
          <select {...register("service")} className="input">
            <option value="">Select</option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Monthly budget" error={errors.budget?.message}>
          <select {...register("budget")} className="input">
            <option value="">Select</option>
            {budgets.map((budget) => (
              <option key={budget} value={budget}>
                {budget}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="Project description" error={errors.description?.message}>
        <textarea {...register("description")} rows={5} className="input resize-none" />
      </Field>
      {serverError ? <p className="text-sm text-red-400">{serverError}</p> : null}
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7B61FF] px-5 py-3 font-semibold text-[#04111a]"
      >
        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send Message"}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm text-slate-300">{label}</span>
      {children}
      {error ? <span className="mt-1 block text-xs text-red-400">{error}</span> : null}
    </label>
  );
}
