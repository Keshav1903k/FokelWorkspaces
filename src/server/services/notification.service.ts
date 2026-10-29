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

const RESEND_API_KEY = process.env.EMAIL_API_KEY || process.env.RESEND_API_KEY;
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || "admin@officera.in";
const FROM_EMAIL = process.env.FROM_EMAIL || "Officera <notifications@officera.in>";

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
