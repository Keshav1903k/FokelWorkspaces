import { NextResponse } from "next/server";
import { subscribeNewsletter } from "@/server/services/inquiry.service";
import { newsletterSchema } from "@/lib/validations/inquiry.schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = newsletterSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    const subscriber = await subscribeNewsletter(parsed.data);
    return NextResponse.json({ success: true, subscriber });
  } catch (error) {
    console.error("[Newsletter API Error]:", error);
    return NextResponse.json(
      { error: "Failed to subscribe to newsletter" },
      { status: 500 }
    );
  }
}
