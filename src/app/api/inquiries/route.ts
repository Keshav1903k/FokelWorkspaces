import { NextResponse } from "next/server";
import { createInquiry } from "@/server/services/inquiry.service";
import { inquirySchema } from "@/lib/validations/inquiry.schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = inquirySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const inquiry = await createInquiry(parsed.data);
    return NextResponse.json({ success: true, inquiry }, { status: 201 });
  } catch (error: any) {
    console.error("[Inquiry API Error]:", error);
    return NextResponse.json(
      { error: error.message || "Failed to submit inquiry" },
      { status: 500 }
    );
  }
}
