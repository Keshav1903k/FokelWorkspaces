import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db, withDbTimeout } from "@/server/db";
import { findStoredUserByEmail, saveStoredUser } from "@/server/user-store";
import { verifyAndConsumeOtp } from "@/server/services/otp.service";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = body.email ? String(body.email).toLowerCase().trim() : "";
    const otp = body.otp ? String(body.otp).trim() : "";
    const newPassword = body.newPassword || body.password || "";
    const confirmPassword = body.confirmPassword || "";

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email address and 6-digit verification code are required." },
        { status: 400 }
      );
    }

    if (!newPassword || newPassword.length < 8) {
      return NextResponse.json(
        { error: "New password must be at least 8 characters long." },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { error: "New password and confirm password do not match." },
        { status: 400 }
      );
    }

    // 1. Verify OTP
    const verification = verifyAndConsumeOtp(email, otp);
    if (!verification.valid) {
      return NextResponse.json(
        { error: verification.error || "Invalid or expired verification code." },
        { status: 400 }
      );
    }

    // 2. Hash new password
    const passwordHash = await bcrypt.hash(newPassword, 12);

    // 3. Update in Database
    let updatedDbUser = null;
    try {
      updatedDbUser = await withDbTimeout(
        db.user.update({
          where: { email },
          data: { passwordHash },
          select: { id: true, name: true, email: true, role: true },
        }),
        1500
      );
    } catch (e) {
      console.warn("[Reset Password] Database update skipped / timed out:", e);
    }

    // 4. Update in local store
    const localUser = findStoredUserByEmail(email);
    if (localUser) {
      saveStoredUser({
        ...localUser,
        passwordHash,
      });
    } else {
      saveStoredUser({
        id: updatedDbUser?.id || `user-${Date.now()}`,
        name: updatedDbUser?.name || email.split("@")[0],
        email,
        passwordHash,
        role: updatedDbUser?.role || "USER",
        createdAt: new Date().toISOString(),
      });
    }

    return NextResponse.json(
      { message: "Password updated successfully. You can now sign in with your new password." },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[Reset Password Error]:", error);
    return NextResponse.json(
      { error: "Failed to reset password. Please try again." },
      { status: 500 }
    );
  }
}
