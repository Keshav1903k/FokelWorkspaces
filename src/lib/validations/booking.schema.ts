import { z } from "zod";

export const createBookingSchema = z.object({
  workspaceId: z.string().min(1, "Workspace ID is required"),
  guestName: z.string().min(2, "Name must be at least 2 characters"),
  guestEmail: z.string().email("Invalid email address"),
  guestPhone: z.string().min(10, "Please provide a valid phone number"),
  teamSize: z.string().optional().default("1-5"),
  visitDate: z.string().or(z.date()).transform((val) => new Date(val)),
  timeSlot: z.string().min(1, "Please select a time slot"),
  notes: z.string().optional(),
  _hp: z.string().optional(), // Honeypot field
});

export const updateBookingStatusSchema = z.object({
  status: z.enum(["PENDING", "REQUESTED", "CONFIRMED", "RESCHEDULED", "CANCELLED", "COMPLETED"]),
  rescheduledTo: z
    .string()
    .or(z.date())
    .optional()
    .transform((val) => (val ? new Date(val) : undefined)),
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>;
export type UpdateBookingStatusInput = z.infer<typeof updateBookingStatusSchema>;
