"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { AuditInput } from "@/lib/validation";
import { auditSchema } from "@/lib/validation";

export function AuditForm() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AuditInput>({
    resolver: zodResolver(auditSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    setError("");
    const response = await fetch("/api/audit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      const body: { error?: string } = await response.json();
      setError(body.error ?? "Unable to submit. Please retry.");
      return;
    }
    setSuccess(true);
    reset();
  });

  return (
    <div className="mx-auto mt-8 max-w-xl">
      <form onSubmit={onSubmit} className="flex flex-col gap-3 md:flex-row">
        <input
          type="email"
          placeholder="Enter your work email"
          {...register("email")}
          className="input h-12 flex-1"
          autoComplete="email"
          required
        />
        <button type="submit" className="btn-primary h-12 shrink-0 px-6" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="mx-auto h-4 w-4 animate-spin" /> : "Book Free Call"}
        </button>
      </form>
      {errors.email?.message ? <p className="mt-2 text-sm text-red-400">{errors.email.message}</p> : null}
      {error ? <p className="mt-2 text-sm text-red-400">{error}</p> : null}
      {success ? (
        <p className="mt-3 inline-flex items-center gap-2 text-sm text-emerald-400">
          <CheckCircle2 className="h-4 w-4" />
          We&apos;ll reach out within 2 hours.
        </p>
      ) : null}
      <p className="mt-2 text-xs text-slate-400">Join 50+ businesses already automating with NexorAI</p>
    </div>
  );
}
