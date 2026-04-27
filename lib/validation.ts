import { z } from "zod";

export const contactSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  companyName: z.string().min(2, "Company name is required"),
  email: z.email("Enter a valid email"),
  phone: z.string().optional(),
  country: z.string().min(2, "Country is required"),
  service: z.string().min(2, "Please select a service"),
  budget: z.string().min(2, "Please select a budget"),
  description: z.string().min(20, "Tell us more about your project"),
});

export const auditSchema = z.object({
  email: z.email("Enter a valid email"),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type AuditInput = z.infer<typeof auditSchema>;
