/**
 * Non-blocking Notification Service for Officera
 * Handles transactional emails for admin notifications and user alerts.
 * Uses Resend API if configured, with graceful fallback to console logging.
 */

interface SendEmailParams {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
}

export const OFFICIAL_EMAIL = "officera.spaces@gmail.com";
const RESEND_API_KEY = process.env.EMAIL_API_KEY || process.env.RESEND_API_KEY;
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || OFFICIAL_EMAIL;
const FROM_EMAIL = process.env.FROM_EMAIL || `Officera Spaces <${OFFICIAL_EMAIL}>`;

/**
 * Low-level non-blocking email dispatcher.
 * Never throws an uncaught error to prevent breaking user requests.
 */
export async function sendEmailSafely(params: SendEmailParams): Promise<boolean> {
  const recipients = Array.isArray(params.to) ? params.to : [params.to];

  // If no email API key is configured, log for local development/staging
  if (!RESEND_API_KEY || RESEND_API_KEY.startsWith("test_")) {
    console.log(
      `[MOCK EMAIL NOTIFICATION]\nTo: ${recipients.join(", ")}\nSubject: ${params.subject}\nContent: ${params.text || params.html.substring(0, 100)}...`
    );
    return true;
  }

  // Non-blocking asynchronous dispatch
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: recipients,
        subject: params.subject,
        html: params.html,
        text: params.text,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn(`[EMAIL WARNING] Resend API returned error ${response.status}:`, errText);
      return false;
    }

    return true;
  } catch (err) {
    console.error("[EMAIL ERROR] Failed to dispatch email notification:", err);
    return false;
  }
}

// 1. New Listing Submission Notification (To Admin Team)
export function notifyTeamNewListing(data: {
  listingId: string;
  title: string;
  city: string;
  partnerEmail?: string;
}) {
  sendEmailSafely({
    to: NOTIFY_EMAIL,
    subject: `[New Listing Review] ${data.title} (${data.city})`,
    html: `
      <h2>A new listing was submitted for review</h2>
      <p><strong>Title:</strong> ${data.title}</p>
      <p><strong>City:</strong> ${data.city}</p>
      <p><strong>Partner:</strong> ${data.partnerEmail || "N/A"}</p>
      <p><a href="${process.env.NEXTAUTH_URL || "http://localhost:3000"}/admin/listings/${data.listingId}">Click here to review this listing in Admin Dashboard</a></p>
    `,
  }).catch((e) => console.error(e));
}

// 2. Listing Approved Notification (To Partner)
export function notifyPartnerListingApproved(data: {
  partnerEmail: string;
  title: string;
  slug: string;
}) {
  sendEmailSafely({
    to: data.partnerEmail,
    subject: `🎉 Your listing "${data.title}" has been approved!`,
    html: `
      <h2>Congratulations! Your listing is now live on Officera.</h2>
      <p>Our review team has verified and published your workspace listing <strong>${data.title}</strong>.</p>
      <p><a href="${process.env.NEXTAUTH_URL || "http://localhost:3000"}/workspaces/${data.slug}">View your live listing on Officera</a></p>
    `,
  }).catch((e) => console.error(e));
}

// 3. Listing Rejected Notification (To Partner)
export function notifyPartnerListingRejected(data: {
  partnerEmail: string;
  title: string;
  reason: string;
  listingId: string;
}) {
  sendEmailSafely({
    to: data.partnerEmail,
    subject: `Update regarding your listing "${data.title}"`,
    html: `
      <h2>Listing Review Feedback</h2>
      <p>Thank you for submitting your workspace listing <strong>${data.title}</strong> to Officera.</p>
      <p>Before we can publish this listing, our curation team has requested the following revisions:</p>
      <blockquote style="padding: 10px; background: #f4f4f5; border-left: 4px solid #f97316;">${data.reason}</blockquote>
      <p>You can update your listing details or upload refreshed photos and resubmit anytime.</p>
    `,
  }).catch((e) => console.error(e));
}

// 4. Tour Booking Requested (To Team & User)
export function notifyBookingCreated(data: {
  bookingId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  workspaceTitle: string;
  visitDate: Date;
}) {
  const formattedDate = new Date(data.visitDate).toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // To User
  sendEmailSafely({
    to: data.userEmail,
    subject: `Tour Request Received: ${data.workspaceTitle}`,
    html: `
      <h2>Your tour request has been received</h2>
      <p>Hi ${data.userName},</p>
      <p>We've received your request to tour <strong>${data.workspaceTitle}</strong> on <strong>${formattedDate}</strong>.</p>
      <p>Our workspace concierge will confirm your schedule shortly.</p>
    `,
  }).catch((e) => console.error(e));

  // To Team
  sendEmailSafely({
    to: NOTIFY_EMAIL,
    subject: `[New Tour Request] ${data.workspaceTitle} - ${data.userName}`,
    html: `
      <h2>New Workspace Tour Scheduled</h2>
      <p><strong>Workspace:</strong> ${data.workspaceTitle}</p>
      <p><strong>Client:</strong> ${data.userName} (${data.userEmail}, ${data.userPhone})</p>
      <p><strong>Requested Date:</strong> ${formattedDate}</p>
    `,
  }).catch((e) => console.error(e));
}

// 5. Booking Status Changed (To User)
export function notifyBookingStatusUpdated(data: {
  userEmail: string;
  userName: string;
  workspaceTitle: string;
  status: string;
  rescheduledTo?: Date | null;
}) {
  let message = `Your tour booking status is now: <strong>${data.status}</strong>.`;
  if (data.status === "CONFIRMED") {
    message = `Good news! Your tour for <strong>${data.workspaceTitle}</strong> has been confirmed. Our team looks forward to hosting you.`;
  } else if (data.status === "RESCHEDULED" && data.rescheduledTo) {
    const newDate = new Date(data.rescheduledTo).toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    message = `Your tour has been rescheduled to <strong>${newDate}</strong>.`;
  }

  sendEmailSafely({
    to: data.userEmail,
    subject: `Update on your tour for ${data.workspaceTitle}`,
    html: `
      <h2>Tour Status Update</h2>
      <p>Hi ${data.userName},</p>
      <p>${message}</p>
    `,
  }).catch((e) => console.error(e));
}

// 6. Callback Request Notification (To Team)
export function notifyTeamCallbackRequest(data: {
  name: string;
  phone: string;
  preferredTime?: string | null;
  workspaceTitle?: string | null;
}) {
  sendEmailSafely({
    to: NOTIFY_EMAIL,
    subject: `[Callback Request] ${data.name} (${data.phone})`,
    html: `
      <h2>New Callback Request</h2>
      <p><strong>Client:</strong> ${data.name}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Preferred Time:</strong> ${data.preferredTime || "Anytime"}</p>
      <p><strong>Interested In:</strong> ${data.workspaceTitle || "General Inquiry"}</p>
    `,
  }).catch((e) => console.error(e));
}

// 7. Workspace Inquiry & Lead Notification (To User & Team)
export function notifyInquiryCreated(data: {
  type?: string;
  name: string;
  email: string;
  phone?: string;
  interest?: string;
  city?: string;
  teamSize?: string;
  details?: string;
}) {
  // Confirmation email to the User from officera.spaces@gmail.com
  sendEmailSafely({
    to: data.email,
    subject: `We've received your request - Officera Workspaces`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #BA431E; margin-top: 0;">Officera Workspaces</h2>
        <p>Hi ${data.name},</p>
        <p>Thank you for reaching out to us. We have received your inquiry for <strong>${data.interest || data.type || "Commercial Workspaces"}</strong>${data.city ? ` in <strong>${data.city}</strong>` : ""}.</p>
        <p>Our workspace advisory team is reviewing your requirements and will connect with you shortly with verified availability and tailored quotations.</p>
        <div style="margin: 20px 0; padding: 16px; background: #faf8f5; border-left: 4px solid #BA431E; border-radius: 4px;">
          <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: bold; color: #18191c;">Your Submission Summary:</p>
          <p style="margin: 0; font-size: 13px; line-height: 1.6; color: #475569;">
            <strong>Name:</strong> ${data.name}<br/>
            <strong>Email:</strong> ${data.email}<br/>
            ${data.phone ? `<strong>Phone:</strong> ${data.phone}<br/>` : ""}
            ${data.teamSize ? `<strong>Team Size:</strong> ${data.teamSize}<br/>` : ""}
            ${data.details ? `<strong>Notes:</strong> ${data.details}` : ""}
          </p>
        </div>
        <p style="font-size: 13px; color: #64748b; line-height: 1.5;">
          If you have any questions or additional requirements, you can reply directly to this email at <a href="mailto:${OFFICIAL_EMAIL}" style="color: #BA431E; font-weight: bold;">${OFFICIAL_EMAIL}</a>.
        </p>
        <p style="margin-top: 24px; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; pt: 16px;">
          Best regards,<br/><strong>Officera Workspaces Concierge</strong><br/>
          <a href="mailto:${OFFICIAL_EMAIL}" style="color: #94a3b8;">${OFFICIAL_EMAIL}</a>
        </p>
      </div>
    `,
  }).catch((e) => console.error(e));

  // Alert notification to the Officera Team at officera.spaces@gmail.com
  sendEmailSafely({
    to: NOTIFY_EMAIL,
    subject: `[New Inquiry] ${data.type || "Workspace Request"} - ${data.name}`,
    html: `
      <h2>New Customer Inquiry Received</h2>
      <p><strong>Type:</strong> ${data.type || "Lead"}</p>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone || "N/A"}</p>
      <p><strong>Interest:</strong> ${data.interest || "N/A"}</p>
      <p><strong>City:</strong> ${data.city || "N/A"}</p>
      <p><strong>Team Size:</strong> ${data.teamSize || "N/A"}</p>
      <p><strong>Details / Message:</strong> ${data.details || "N/A"}</p>
    `,
  }).catch((e) => console.error(e));
}

// 8. Service Request Notification (To User & Team)
export function notifyServiceRequestCreated(data: {
  serviceType: string;
  companyName?: string;
  contactName: string;
  email: string;
  phone: string;
  notes?: string;
}) {
  // To User
  sendEmailSafely({
    to: data.email,
    subject: `Service Request Received: ${data.serviceType} | Officera`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #BA431E; margin-top: 0;">Officera Workspaces</h2>
        <p>Hi ${data.contactName},</p>
        <p>Thank you for choosing Officera for <strong>${data.serviceType}</strong>${data.companyName ? ` for <strong>${data.companyName}</strong>` : ""}.</p>
        <p>Our corporate solutions team has logged your request and will contact you directly via phone or email to initiate the onboarding process.</p>
        <p style="font-size: 13px; color: #64748b;">For any immediate assistance, reach us at <a href="mailto:${OFFICIAL_EMAIL}" style="color: #BA431E;">${OFFICIAL_EMAIL}</a>.</p>
        <p style="margin-top: 24px; font-size: 12px; color: #94a3b8;">Best regards,<br/>The Officera Team</p>
      </div>
    `,
  }).catch((e) => console.error(e));

  // To Team
  sendEmailSafely({
    to: NOTIFY_EMAIL,
    subject: `[New Service Request] ${data.serviceType} - ${data.companyName || data.contactName}`,
    html: `
      <h2>New Enterprise / Business Service Request</h2>
      <p><strong>Service Type:</strong> ${data.serviceType}</p>
      <p><strong>Company Name:</strong> ${data.companyName || "N/A"}</p>
      <p><strong>Contact Person:</strong> ${data.contactName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Notes:</strong> ${data.notes || "None"}</p>
    `,
  }).catch((e) => console.error(e));
}

// 9. Newsletter Subscription Notification
export function notifyNewsletterSubscribed(subscriberEmail: string) {
  // Welcome email to subscriber
  sendEmailSafely({
    to: subscriberEmail,
    subject: `Welcome to Officera Workspace Insights`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #BA431E; margin-top: 0;">Officera Workspaces</h2>
        <p>Thank you for subscribing to Officera's monthly workspace insights.</p>
        <p>You'll receive curated updates on prime commercial office developments, pricing trends, and new premium hub launches across India.</p>
        <p style="font-size: 12px; color: #94a3b8; margin-top: 24px;">Sent by Officera (<a href="mailto:${OFFICIAL_EMAIL}">${OFFICIAL_EMAIL}</a>)</p>
      </div>
    `,
  }).catch((e) => console.error(e));

  // Notify team
  sendEmailSafely({
    to: NOTIFY_EMAIL,
    subject: `[Newsletter] New Subscriber: ${subscriberEmail}`,
    html: `<p>New subscriber registered for newsletter: <strong>${subscriberEmail}</strong></p>`,
  }).catch((e) => console.error(e));
}
