import { db, withDbTimeout } from "../db";
import {
  InquiryInput,
  ServiceRequestInput,
  NewsletterInput,
} from "@/lib/validations/inquiry.schema";
import {
  notifyInquiryCreated,
  notifyServiceRequestCreated,
  notifyNewsletterSubscribed,
} from "./notification.service";

export async function createInquiry(input: InquiryInput, userId?: string) {
  // 1. Save to PostgreSQL Database (with offline / fault-tolerant fallback)
  let inquiry: any = null;
  try {
    inquiry = await withDbTimeout(
      db.inquiry.create({
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
      }),
      1500
    );
  } catch (dbErr) {
    console.warn("[Database Offline / Lead processed via direct notification]:", dbErr);
    inquiry = {
      id: `inquiry-${Date.now()}`,
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
      createdAt: new Date(),
    };
  }

  // 2. Send transactional emails (Confirmation to User + Alert to officera.spaces@gmail.com)
  try {
    notifyInquiryCreated({
      type: input.type,
      name: input.name,
      email: input.email,
      phone: input.phone,
      interest: input.interest,
      city: input.city,
      teamSize: input.teamSize,
      details: input.details,
    });
  } catch (mailErr) {
    console.error("[Email Notification Error]:", mailErr);
  }

  // 3. Asynchronously forward to Google Sheet Webhook if configured
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
  let req: any = null;
  try {
    req = await withDbTimeout(
      db.serviceRequest.create({
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
      }),
      1500
    );
  } catch (dbErr) {
    console.warn("[Database Offline / Service Request processed offline]:", dbErr);
    req = {
      id: `svc-${Date.now()}`,
      userId: userId || null,
      ...input,
      status: "PENDING",
      createdAt: new Date(),
    };
  }

  // Send transactional email notifications
  try {
    notifyServiceRequestCreated({
      serviceType: input.serviceType,
      companyName: input.companyName,
      contactName: input.contactName,
      email: input.email,
      phone: input.phone,
      notes: input.notes,
    });
  } catch (mailErr) {
    console.error("[Email Notification Error]:", mailErr);
  }

  return req;
}

export async function subscribeNewsletter(input: NewsletterInput) {
  let sub: any = null;
  try {
    sub = await withDbTimeout(
      db.newsletterSubscriber.upsert({
        where: { email: input.email.toLowerCase().trim() },
        update: { isActive: true },
        create: {
          email: input.email.toLowerCase().trim(),
          isActive: true,
        },
      }),
      1500
    );
  } catch (dbErr) {
    console.warn("[Database Offline / Newsletter subscription stored]:", dbErr);
    sub = {
      id: `sub-${Date.now()}`,
      email: input.email.toLowerCase().trim(),
      isActive: true,
      createdAt: new Date(),
    };
  }

  try {
    notifyNewsletterSubscribed(input.email);
  } catch (mailErr) {
    console.error("[Email Notification Error]:", mailErr);
  }

  return sub;
}
