import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";
import { contactSchema } from "@/lib/validation";

type ContactPayload = {
  fullName: string;
  companyName: string;
  email: string;
  phone?: string;
  country: string;
  service: string;
  budget: string;
  description: string;
};

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function POST(request: Request) {
  try {
    const raw = await request.json();
    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid request" }, { status: 400 });
    }

    const data: ContactPayload = parsed.data;
    const supabase = getSupabaseClient();
    if (!supabase) {
      return NextResponse.json(
        { error: "Form is not configured yet. Please email hello@nexorai.io directly." },
        { status: 503 },
      );
    }
    const { error: dbError } = await supabase.from("leads").insert({
      ...data,
      source: "contact_form",
      created_at: new Date().toISOString(),
    });

    if (dbError) {
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      await resend.emails.send({
        from: "NexorAI <onboarding@resend.dev>",
        to: ["hello@nexorai.io"],
        subject: `New Lead: ${data.companyName}`,
        html: `
          <h2>New Contact Lead</h2>
          <p><strong>Name:</strong> ${data.fullName}</p>
          <p><strong>Company:</strong> ${data.companyName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone ?? "-"}</p>
          <p><strong>Country:</strong> ${data.country}</p>
          <p><strong>Service:</strong> ${data.service}</p>
          <p><strong>Budget:</strong> ${data.budget}</p>
          <p><strong>Description:</strong> ${data.description}</p>
        `,
      });

      await resend.emails.send({
        from: "NexorAI <onboarding@resend.dev>",
        to: [data.email],
        subject: "We received your request",
        html: `
          <h2>Thanks for reaching out to NexorAI</h2>
          <p>We received your request and will get back to you within 2 hours.</p>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
