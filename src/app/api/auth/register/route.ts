import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db, withDbTimeout } from "@/server/db";
import { registerSchema } from "@/lib/validations/auth.schema";
import { Role } from "@prisma/client";
import { findStoredUserByEmail, saveStoredUser } from "@/server/user-store";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = registerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, password, role } = result.data;
    const normalizedEmail = email.toLowerCase().trim();

    // Check if user already exists in DB or fallback store
    let existingUser = null;
    try {
      existingUser = await withDbTimeout(
        db.user.findUnique({
          where: { email: normalizedEmail },
        }),
        1500
      );
    } catch (dbErr) {
      console.warn("[Database Offline / User check skipped in DB]:", dbErr);
    }

    if (!existingUser) {
      existingUser = findStoredUserByEmail(normalizedEmail);
    }

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    // Hash password securely
    const passwordHash = await bcrypt.hash(password, 12);
    const userId = `user-${Date.now()}`;
    const userRole = (role as Role) || Role.USER;

    let user: any = null;
    try {
      user = await withDbTimeout(
        db.user.create({
          data: {
            name,
            email: normalizedEmail,
            passwordHash,
            role: userRole,
          },
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
          },
        }),
        1500
      );
    } catch (dbErr) {
      console.warn("[Database Offline / Registration saved to local store]:", dbErr);
      user = {
        id: userId,
        name,
        email: normalizedEmail,
        role: userRole,
        createdAt: new Date(),
      };
    }

    // Always guarantee user is also persisted in local store for seamless authentication
    saveStoredUser({
      id: user.id || userId,
      name,
      email: normalizedEmail,
      passwordHash,
      role: String(userRole),
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json(
      { message: "Account created successfully", user },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Register Error]:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
