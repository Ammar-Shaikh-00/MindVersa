import { Resend } from "resend";

let cached: Resend | null = null;

export function getResend(): Resend | null {
  if (cached) return cached;
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  cached = new Resend(key);
  return cached;
}

/** Use onboarding@resend.dev until your domain is verified in Resend. */
const fromAddress =
  process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

export const FROM_NOTIFY = `MindVersa Website <${fromAddress}>`;
export const FROM_HELLO = `MindVersa <${fromAddress}>`;

/** Must be your Resend account email while using onboarding@resend.dev */
export const TO_AGENCY =
  process.env.CONTACT_TO_EMAIL ?? "versamind003@gmail.com";
