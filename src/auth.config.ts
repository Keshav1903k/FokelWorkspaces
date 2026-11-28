import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  trustHost: true,
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "7a8e2b9c3f1d4a6e5b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a",
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const userRole = (auth?.user as any)?.role;
      const { pathname } = nextUrl;

      // Protect Admin routes
      if (pathname.startsWith("/admin")) {
        return isLoggedIn && userRole === "ADMIN";
      }

      // Protect Partner routes
      if (pathname.startsWith("/partner") && !pathname.startsWith("/partner/join")) {
        return isLoggedIn && (userRole === "PARTNER" || userRole === "ADMIN");
      }

      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  providers: [], // Will be augmented with Credentials provider in auth.ts (Node.js runtime)
} satisfies NextAuthConfig;
