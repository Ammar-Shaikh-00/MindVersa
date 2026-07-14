import { NextResponse } from "next/server";
import { z } from "zod";
import { AuditSchema } from "@/lib/validations";
import { getSupabase } from "@/lib/supabase";
import { FROM_HELLO, TO_AGENCY, getResend } from "@/lib/resend";

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
    data = AuditSchema.parse(body);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Validation failed" }, { status: 400 });
  }

  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase
      .from("audit_leads")
      .insert({ email: data.email, source: "cta_banner" });
    if (error && !/duplicate/i.test(error.message)) {
      console.error("[audit] supabase insert failed:", error.message);
    }
  }

  const resend = getResend();
  if (resend) {
    // Notify agency always
    const notify = await resend.emails.send({
      from: FROM_HELLO,
      to: TO_AGENCY,
      subject: `New audit request: ${data.email}`,
      html: `<p>New free-audit signup: <b>${escapeHtml(data.email)}</b></p>`,
    });
    if (notify.error) {
      console.error("[audit] notify email failed:", notify.error.message);
    } else {
      console.log("[audit] notify email sent:", notify.data?.id);
    }

    // Visitor welcome only if allowed without a verified domain
    const canEmailVisitor =
      data.email.toLowerCase() === TO_AGENCY.toLowerCase() ||
      !FROM_HELLO.includes("onboarding@resend.dev");

    if (canEmailVisitor) {
      const welcome = await resend.emails.send({
        from: FROM_HELLO,
        to: data.email,
        subject: "Your free MindVersa audit — next steps",
        html: `
          <p>Hi there,</p>
          <p>Thanks for requesting a free AI audit from <b>MindVersa</b>. We'll reply within 2 business hours with a short questionnaire to scope your project.</p>
          <p>Talk soon,<br/>MindVersa</p>
        `,
      });
      if (welcome.error) {
        console.error("[audit] welcome email failed:", welcome.error.message);
      }
    } else {
      console.log(
        "[audit] skipped visitor welcome (verify your domain in Resend to enable)",
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
