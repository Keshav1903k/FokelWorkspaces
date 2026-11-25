import { NextResponse } from "next/server";
import { db, withDbTimeout } from "@/server/db";
import { findStoredUserByEmail } from "@/server/user-store";
import { createAndSendPasswordResetOtp } from "@/server/services/otp.service";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = body.email ? String(body.email).toLowerCase().trim() : "";

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // 1. Check if user exists in Database
    let existingUser: any = null;
    try {
      existingUser = await withDbTimeout(
        db.user.findUnique({
          where: { email },
          select: { id: true, name: true, email: true },
        }),
        1500
      );
    } catch (e) {
      console.warn("[Forgot Password] Database lookup timed out / skipped:", e);
    }

    // 2. Check local fallback store
    if (!existingUser) {
      existingUser = findStoredUserByEmail(email);
    }

    // Built-in accounts check
    if (!existingUser && (email === "user@officera.in" || email === "admin@officera.in" || email === "officera.spaces@gmail.com")) {
      existingUser = { name: "User", email };
    }

    if (!existingUser) {
      return NextResponse.json(
        { error: "No account found with this email address. Please verify your email or create an account." },
        { status: 404 }
      );
    }

    // 3. Generate and send OTP
    await createAndSendPasswordResetOtp(email, existingUser.name);

    return NextResponse.json(
      { message: "Verification code sent to your email address. It will expire in 10 minutes." },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[Forgot Password Error]:", error);
    return NextResponse.json(
      { error: "Failed to send verification code. Please try again." },
      { status: 500 }
    );
  }
}
