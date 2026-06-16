import { Resend } from "resend";

let cached: Resend | null = null;

export function getResend(): Resend | null {
  if (cached) return cached;
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  cached = new Resend(key);
  return cached;
}

export const FROM_NOTIFY = "NexorAI Website <noreply@nexorai.io>";
export const FROM_HELLO = "NexorAI <hello@nexorai.io>";
export const TO_AGENCY = "hello@nexorai.io";
