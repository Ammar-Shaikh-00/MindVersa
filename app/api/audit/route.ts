import { NextResponse } from "next/server";
import { z } from "zod";
import { AuditSchema } from "@/lib/validations";
import { getSupabase } from "@/lib/supabase";
import { FROM_HELLO, getResend } from "@/lib/resend";

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
    try {
      await resend.emails.send({
        from: FROM_HELLO,
        to: data.email,
        subject: "Your free NexorAI audit — next steps",
        html: `
          <p>Hi there,</p>
          <p>Thanks for requesting a free AI audit from <b>NexorAI</b>. We'll reply within 2 business hours with a short questionnaire to scope your project.</p>
          <p>Talk soon,<br/>NexorAI</p>
        `,
      });
    } catch (e) {
      console.error("[audit] resend failed:", (e as Error).message);
    }
  }

  return NextResponse.json({ success: true });
}
