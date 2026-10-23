import { db } from "../db";
import {
  InquiryInput,
  ServiceRequestInput,
  NewsletterInput,
} from "@/lib/validations/inquiry.schema";

export async function createInquiry(input: InquiryInput, userId?: string) {
  // 1. Save to PostgreSQL Database
  const inquiry = await db.inquiry.create({
    data: {
      userId: userId || null,
      type: input.type || "GENERAL",
      name: input.name,
      email: input.email,
      phone: input.phone,
      interest: input.interest,
      teamSize: input.teamSize,
      city: input.city,
      details: input.details,
      sourceUrl: input.sourceUrl,
      status: "NEW",
    },
  });

  // 2. Asynchronously forward to Google Sheet Webhook if configured
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (webhookUrl && webhookUrl.trim() !== "") {
    const payload = {
      createdAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      type: input.type || "LEAD",
      name: input.name,
      email: input.email,
      phone: input.phone,
      interest: input.interest || input.details || "",
      teamSize: input.teamSize || "",
      city: input.city || "",
      details: input.details || "",
      sourceUrl: input.sourceUrl || "",
    };

    fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch((err) => {
      console.error("[Webhook Error]: Failed forwarding lead to Google Sheet:", err);
    });
  }

  return inquiry;
}

export async function createServiceRequest(input: ServiceRequestInput, userId?: string) {
  return db.serviceRequest.create({
    data: {
      userId: userId || null,
      serviceType: input.serviceType,
      companyName: input.companyName,
      contactName: input.contactName,
      email: input.email,
      phone: input.phone,
      notes: input.notes,
      status: "PENDING",
    },
  });
}

export async function subscribeNewsletter(input: NewsletterInput) {
  return db.newsletterSubscriber.upsert({
    where: { email: input.email.toLowerCase().trim() },
    update: { isActive: true },
    create: {
      email: input.email.toLowerCase().trim(),
      isActive: true,
    },
  });
}
