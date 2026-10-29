import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { callbackRequestSchema } from "@/lib/validations/callback.schema";
import { notifyTeamCallbackRequest } from "@/server/services/notification.service";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const rateCheck = checkRateLimit(`callbacks_${ip}`, { limit: 10, interval: 60 });
    if (!rateCheck.isAllowed) {
      return NextResponse.json(
        { error: "Too many callback requests. Please try again shortly." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // 1. Honeypot check: If filled, bot trapped. Return silent success.
    if (body._hp || body.honeypot) {
      return NextResponse.json({
        success: true,
        message: "Callback request received. We will contact you shortly.",
      });
    }

    // 2. Validate input with Zod
    const parsed = callbackRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { name, phone, preferredTime, workspaceId } = parsed.data;

    let workspaceTitle: string | null = null;
    if (workspaceId) {
      const ws = await db.workspace.findUnique({
        where: { id: workspaceId },
        select: { title: true },
      });
      if (ws) workspaceTitle = ws.title;
    }

    // 3. Save callback request to database
    const callbackRequest = await db.callbackRequest.create({
      data: {
        name,
        phone,
        preferredTime: preferredTime || null,
        workspaceId: workspaceId || null,
        status: "NEW",
      },
    });

    // 4. Send non-blocking team notification
    notifyTeamCallbackRequest({
      name,
      phone,
      preferredTime,
      workspaceTitle,
    });

    return NextResponse.json({
      success: true,
      message: "Callback request received. Our workspace advisor will call you shortly.",
      data: callbackRequest,
    });
  } catch (error: any) {
    console.error("[Callback Request Error]:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to submit callback request" },
      { status: 500 }
    );
  }
}
