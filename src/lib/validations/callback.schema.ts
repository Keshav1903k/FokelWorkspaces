import { z } from "zod";

export const callbackRequestSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  phone: z.string().min(10, "Please provide a valid 10-digit phone number").max(15),
  preferredTime: z.string().max(100).optional(),
  workspaceId: z.string().optional(),
  _hp: z.string().optional(), // Honeypot field for bot protection
});

export type CallbackRequestInput = z.infer<typeof callbackRequestSchema>;

export const callbackUpdateSchema = z.object({
  status: z.enum(["NEW", "CONTACTED", "CLOSED"]),
  notes: z.string().max(500).optional(),
});
