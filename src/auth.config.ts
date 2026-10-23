import type { NextAuthConfig } from "next-auth";

export const authConfig = {
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
