import { z } from "zod";

export const inquirySchema = z.object({
  type: z.string().default("GENERAL"), // LEAD, CONSULTATION, VIRTUAL_OFFICE, ENTERPRISE
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  interest: z.string().optional(),
  teamSize: z.string().optional(),
  city: z.string().optional(),
  details: z.string().optional(),
  sourceUrl: z.string().optional(),
});

export const serviceRequestSchema = z.object({
  serviceType: z.string().min(1, "Service type is required"), // GST, COMPANY_INCORPORATION, TRADEMARK, LEGAL
  companyName: z.string().optional(),
  contactName: z.string().min(2, "Contact name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  notes: z.string().optional(),
});

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
export type ServiceRequestInput = z.infer<typeof serviceRequestSchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;
