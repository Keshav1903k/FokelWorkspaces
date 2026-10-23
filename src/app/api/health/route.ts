import { NextResponse } from "next/server";
import { db } from "@/server/db";

export async function GET() {
  try {
    // Health check pinging database
    await db.$queryRaw`SELECT 1`;

    return NextResponse.json({
      status: "healthy",
      database: "connected",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  } catch (error: any) {
    console.error("[Health Check Failed]:", error);
    return NextResponse.json(
      {
        status: "unhealthy",
        database: "disconnected",
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}
