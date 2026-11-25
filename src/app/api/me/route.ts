import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db, withDbTimeout } from "@/server/db";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id && !session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let user: any = null;
    try {
      if (session.user.id) {
        user = await withDbTimeout(
          db.user.findUnique({
            where: { id: session.user.id },
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
              role: true,
              createdAt: true,
              _count: {
                select: {
                  bookings: true,
                  inquiries: true,
                  reviews: true,
                },
              },
            },
          }),
          1500
        );
      }
    } catch (e) {
      console.warn("[Me API] Database lookup skipped/timed out:", e);
    }

    if (!user) {
      user = {
        id: session.user.id || `user-${Date.now()}`,
        name: session.user.name || session.user.email?.split("@")[0] || "User",
        email: session.user.email,
        role: (session.user as any)?.role || "USER",
        image: session.user.image || null,
        createdAt: new Date(),
      };
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("[Me API Error]:", error);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, image } = body;

    const updatedUser = await db.user.update({
      where: { id: session.user.id },
      data: {
        ...(name && { name }),
        ...(image && { image }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
      },
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("[Me Update Error]:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
