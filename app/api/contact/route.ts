import { NextResponse } from "next/server";
import { z } from "zod";
import { ContactSchema } from "@/lib/validations";
import { getSupabase } from "@/lib/supabase";
import { FROM_HELLO, FROM_NOTIFY, TO_AGENCY, getResend } from "@/lib/resend";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  let data;
  try {
    data = ContactSchema.parse(body);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Validation failed" }, { status: 400 });
  }

  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase.from("leads").insert({
      name: data.name,
      company: data.company,
      email: data.email,
      phone: data.phone ?? null,
      industry: data.industry,
      project_type: data.projectType,
      budget: data.budget,
      message: data.message,
      source: "contact_form",
    });
    if (error) {
      console.error("[contact] supabase insert failed:", error.message);
    }
  }

  const resend = getResend();
  if (resend) {
    const summaryHtml = `
      <h2>New Lead — ${escapeHtml(data.name)} (${escapeHtml(data.company)})</h2>
      <ul>
        <li><b>Email:</b> ${escapeHtml(data.email)}</li>
        <li><b>Phone:</b> ${escapeHtml(data.phone ?? "—")}</li>
        <li><b>Industry:</b> ${escapeHtml(data.industry)}</li>
        <li><b>Project type:</b> ${escapeHtml(data.projectType)}</li>
        <li><b>Budget:</b> ${escapeHtml(data.budget)}</li>
      </ul>
      <p><b>Message:</b></p>
      <p>${escapeHtml(data.message).replace(/\n/g, "<br/>")}</p>
    `;

    const notify = await resend.emails.send({
      from: FROM_NOTIFY,
      to: TO_AGENCY,
      subject: `New Lead: ${data.name} — ${data.company}`,
      html: summaryHtml,
      replyTo: data.email,
    });
    if (notify.error) {
      console.error("[contact] notify email failed:", notify.error.message);
    } else {
      console.log("[contact] notify email sent:", notify.data?.id);
    }

    // Without a verified domain, Resend only allows sending to your own account email.
    const canConfirmVisitor =
      data.email.toLowerCase() === TO_AGENCY.toLowerCase() ||
      !FROM_HELLO.includes("onboarding@resend.dev");

    if (canConfirmVisitor) {
      const confirm = await resend.emails.send({
        from: FROM_HELLO,
        to: data.email,
        subject: "We received your message — talk soon!",
        html: `
          <p>Hi ${escapeHtml(data.name.split(" ")[0] ?? data.name)},</p>
          <p>Thanks for reaching out to <b>MindVersa</b>. We've received your message and will reply within 1 business day.</p>
          <p>— The MindVersa team</p>
        `,
      });
      if (confirm.error) {
        console.error("[contact] confirm email failed:", confirm.error.message);
      }
    } else {
      console.log(
        "[contact] skipped visitor confirmation (verify your domain in Resend to enable)",
      );
    }
  }

  return NextResponse.json({ success: true });
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    c === "&" ? "&amp;" : c === "<" ? "&lt;" : c === ">" ? "&gt;" : c === '"' ? "&quot;" : "&#39;",
  );
}
