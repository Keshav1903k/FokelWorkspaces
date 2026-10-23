import { z } from "zod";

export const workspaceFilterSchema = z.object({
  city: z.string().optional(),
  type: z.enum(["COWORKING", "MANAGED_OFFICE", "COMMERCIAL_OFFICE", "VIRTUAL_OFFICE"]).optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  capacity: z.coerce.number().optional(),
  search: z.string().optional(),
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(12),
  sortBy: z.enum(["price_asc", "price_desc", "rating_desc", "newest"]).default("newest"),
});

export const workspaceCreateSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().optional(),
  description: z.string().optional(),
  type: z.enum(["COWORKING", "MANAGED_OFFICE", "COMMERCIAL_OFFICE", "VIRTUAL_OFFICE"]),
  location: z.string().min(2, "Location is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().optional(),
  pincode: z.string().optional(),
  address: z.string().optional(),
  capacity: z.coerce.number().optional(),
  priceDisplay: z.string().min(1, "Price display string is required (e.g. ₹8,500/seat)"),
  priceMonthly: z.coerce.number().optional(),
  amenities: z.array(z.string()).default([]),
  images: z.array(z.string()).default([]),
  status: z.enum(["DRAFT", "PENDING_APPROVAL", "APPROVED", "REJECTED"]).default("PENDING_APPROVAL"),
});

export type WorkspaceFilterInput = z.infer<typeof workspaceFilterSchema>;
export type WorkspaceCreateInput = z.infer<typeof workspaceCreateSchema>;
