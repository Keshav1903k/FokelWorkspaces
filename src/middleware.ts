import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const user = req.auth?.user as { role?: string } | undefined;
  const userRole = user?.role;

  // Protect Admin routes
  if (pathname.startsWith("/admin")) {
    if (!userRole || userRole !== "ADMIN") {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Protect Partner routes
  if (pathname.startsWith("/partner") && !pathname.startsWith("/partner/join")) {
    if (!userRole || (userRole !== "PARTNER" && userRole !== "ADMIN")) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/admin/:path*",
    "/partner/:path*",
    "/api/admin/:path*",
  ],
};
