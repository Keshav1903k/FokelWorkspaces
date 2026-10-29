import { NextResponse } from "next/server";
import { verifyAdminSession, updateAdminCallbackStatus } from "@/server/services/admin.service";
import { callbackUpdateSchema } from "@/lib/validations/callback.schema";
import { CallbackStatus } from "@prisma/client";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await verifyAdminSession();
    const { id } = await params;
    const body = await req.json();

    const parsed = callbackUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const updated = await updateAdminCallbackStatus({
      callbackId: id,
      status: parsed.data.status as CallbackStatus,
      notes: parsed.data.notes,
      adminUserId: admin.id,
    });

    return NextResponse.json({
      success: true,
      message: `Callback updated to ${parsed.data.status}`,
      data: updated,
    });
  } catch (error: any) {
    console.error("[Admin Callback Update Error]:", error);
    const status = error.message?.includes("UNAUTHORIZED") ? 403 : 500;
    return NextResponse.json(
      { error: error.message || "Action failed" },
      { status }
    );
  }
}
