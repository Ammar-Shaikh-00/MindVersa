import { z } from "zod";

export const ContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  company: z.string().min(1, "Company name is required"),
  email: z.email("Invalid email address"),
  phone: z.string().optional().or(z.literal("")),
  industry: z.string().min(1, "Please select your industry"),
  projectType: z.string().min(1, "Please select a project type"),
  budget: z.string().min(1, "Please select a budget range"),
  message: z.string().min(20, "Tell us a little more (20+ characters)"),
});
export type ContactInput = z.infer<typeof ContactSchema>;

export const AuditSchema = z.object({
  email: z.email("Invalid email address"),
});
export type AuditInput = z.infer<typeof AuditSchema>;
