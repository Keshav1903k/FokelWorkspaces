import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db, withDbTimeout } from "./server/db";
import { loginSchema } from "./lib/validations/auth.schema";
import { authConfig } from "./auth.config";
import { findStoredUserByEmail } from "./server/user-store";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const email = parsed.data.email.toLowerCase().trim();
        const password = parsed.data.password;

        // Built-in Demo & Admin Credentials Fallback (works offline or when DB is disconnected)
        if (
          (email === "admin@officera.in" || email === "officera.spaces@gmail.com") &&
          (password === "Admin@Officera2025!" || password === "admin123")
        ) {
          return {
            id: "admin-system-id",
            name: "Super Admin",
            email: "officera.spaces@gmail.com",
            role: "ADMIN",
            image: null,
          };
        }

        if (
          email === "partner@officera.in" &&
          (password === "Partner@Officera2025!" || password === "partner123")
        ) {
          return {
            id: "partner-system-id",
            name: "Workspace Partner",
            email: "partner@officera.in",
            role: "PARTNER",
            image: null,
          };
        }

        if (
          email === "user@officera.in" &&
          (password === "User@Officera2025!" || password === "user123")
        ) {
          return {
            id: "user-system-id",
            name: "Registered User",
            email: "user@officera.in",
            role: "USER",
            image: null,
          };
        }

        // 1. Try PostgreSQL via Prisma with timeout
        let user: any = null;
        try {
          user = await withDbTimeout(
            db.user.findUnique({
              where: { email },
            }),
            1500
          );
        } catch (dbErr) {
          console.warn("[Auth] Database query timed out / offline, trying local store");
        }

        // 2. Fallback to local stored user if DB was offline or user not found in DB
        if (!user || !user.passwordHash) {
          const storedUser = findStoredUserByEmail(email);
          if (storedUser) {
            user = storedUser;
          }
        }

        if (!user || !user.passwordHash) return null;

        const isValid = await bcrypt.compare(password, user.passwordHash);
        if (!isValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image || null,
        };
      },
    }),
  ],
});
