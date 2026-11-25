import fs from "fs";
import path from "path";
import crypto from "crypto";
import { sendEmailSafely } from "./notification.service";

export interface PasswordResetEntry {
  email: string;
  otp: string;
  expiresAt: number; // timestamp in ms
  attempts: number;
}

const OTP_FILE = path.join(process.cwd(), "data", "password_otps.json");

function ensureDir(filePath: string) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
}

function loadOtpStore(): Record<string, PasswordResetEntry> {
  try {
    if (!fs.existsSync(OTP_FILE)) {
      return {};
    }
    const raw = fs.readFileSync(OTP_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (e) {
    return {};
  }
}

function saveOtpStore(store: Record<string, PasswordResetEntry>) {
  try {
    ensureDir(OTP_FILE);
    fs.writeFileSync(OTP_FILE, JSON.stringify(store, null, 2), "utf-8");
  } catch (e) {
    console.error("[OTP Service] Failed to save OTP store:", e);
  }
}

/**
 * Generates a 6-digit numeric OTP and emails it to the user.
 * Valid for 10 minutes.
 */
export async function createAndSendPasswordResetOtp(email: string, userName?: string): Promise<{ success: boolean; error?: string }> {
  const normalizedEmail = email.toLowerCase().trim();

  // Generate 6-digit random code
  const otp = crypto.randomInt(100000, 999999).toString();
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

  const store = loadOtpStore();
  store[normalizedEmail] = {
    email: normalizedEmail,
    otp,
    expiresAt,
    attempts: 0,
  };
  saveOtpStore(store);

  // Email subject and branded HTML body
  const subject = `Your Officera Password Reset Code: ${otp}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #E3DDD3; border-radius: 12px; background-color: #FAF8F5; color: #18191C;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h1 style="color: #B84A24; margin: 0; font-size: 26px; font-weight: bold;">Officera</h1>
        <p style="color: #5C5D61; font-size: 13px; margin: 4px 0 0 0;">Commercial Workspaces & Flexible Offices</p>
      </div>

      <div style="background-color: #ffffff; padding: 24px; border-radius: 8px; border: 1px solid #E3DDD3; margin-bottom: 20px;">
        <h2 style="font-size: 18px; margin-top: 0; color: #18191C;">Reset Your Account Password</h2>
        <p style="font-size: 14px; line-height: 1.6; color: #5C5D61;">
          Hello ${userName || "there"},<br/>
          We received a request to reset your password for your Officera account. Use the 6-digit verification code below to set a new password:
        </p>

        <div style="text-align: center; margin: 28px 0;">
          <div style="display: inline-block; padding: 14px 28px; background-color: #B84A24; color: #ffffff; font-size: 32px; font-weight: bold; letter-spacing: 6px; border-radius: 8px; font-family: monospace;">
            ${otp}
          </div>
          <p style="font-size: 12px; color: #8A8B8F; margin-top: 10px;">This code will expire in 10 minutes.</p>
        </div>

        <p style="font-size: 13px; line-height: 1.5; color: #5C5D61;">
          If you did not request a password reset, you can safely ignore this email. Your password will remain unchanged.
        </p>
      </div>

      <div style="text-align: center; font-size: 11px; color: #8A8B8F;">
        <p>© 2026 Officera. All rights reserved.<br/>India's Verified Commercial Workspace Platform</p>
      </div>
    </div>
  `;

  const text = `Your Officera password reset code is: ${otp}\nThis code will expire in 10 minutes.\nIf you did not request this, please ignore this email.`;

  const sent = await sendEmailSafely({
    to: normalizedEmail,
    subject,
    html,
    text,
  });

  return { success: true };
}

/**
 * Validates the OTP and, if valid, consumes it so it cannot be used again.
 */
export function verifyAndConsumeOtp(email: string, otp: string): { valid: boolean; error?: string } {
  const normalizedEmail = email.toLowerCase().trim();
  const store = loadOtpStore();
  const entry = store[normalizedEmail];

  if (!entry) {
    return { valid: false, error: "No verification code was requested for this email. Please request a new code." };
  }

  if (Date.now() > entry.expiresAt) {
    delete store[normalizedEmail];
    saveOtpStore(store);
    return { valid: false, error: "This verification code has expired. Please request a new one." };
  }

  if (entry.attempts >= 5) {
    delete store[normalizedEmail];
    saveOtpStore(store);
    return { valid: false, error: "Too many incorrect attempts. Please request a new verification code." };
  }

  if (entry.otp !== otp.trim()) {
    entry.attempts += 1;
    saveOtpStore(store);
    return { valid: false, error: "Invalid verification code. Please check the code sent to your email." };
  }

  // OTP is valid! Consume it
  delete store[normalizedEmail];
  saveOtpStore(store);

  return { valid: true };
}
