import { NextResponse } from "next/server";
import { createInquiry } from "@/server/services/inquiry.service";
import { inquirySchema } from "@/lib/validations/inquiry.schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const parsed = inquirySchema.safeParse({
      type: body.type || "LEAD",
      name: body.name || "Inquirer",
      email: body.email,
      phone: body.phone,
      interest: body.interest || body.details,
      teamSize: body.teamSize,
      city: body.city,
      details: body.details,
      sourceUrl: body.sourceUrl,
    });

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const inquiry = await createInquiry(parsed.data);

    return NextResponse.json({
      success: true,
      message: "Lead recorded successfully in database & synced to sheet",
      data: inquiry,
    });
  } catch (error: any) {
    console.error("[Officera Lead Error]:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process lead" },
      { status: 500 }
    );
  }
}
