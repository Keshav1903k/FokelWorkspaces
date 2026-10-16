import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      type = "Consultation Request",
      name = "",
      email = "",
      phone = "",
      interest = "",
      teamSize = "",
      city = "",
      details = "",
      sourceUrl = ""
    } = body;

    const payload = {
      createdAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      type,
      name,
      email,
      phone,
      interest: interest || details,
      teamSize,
      city,
      details,
      sourceUrl
    };

    console.log("[Officera Lead Received]:", payload);

    // If Google Sheet Webhook URL is set in environment variables
    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;

    if (webhookUrl && webhookUrl.trim() !== "") {
      try {
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload),
          redirect: "follow"
        });

        if (!response.ok) {
          console.warn("[Officera Lead] Google Sheet responded with status:", response.status);
        } else {
          console.log("[Officera Lead] Successfully synced to Google Sheet!");
        }
      } catch (sheetError) {
        console.error("[Officera Lead] Error posting to Google Sheet webhook:", sheetError);
      }
    } else {
      console.info("[Officera Lead] Note: GOOGLE_SHEET_WEBHOOK_URL is not set in .env.local yet. Run setup to connect your sheet.");
    }

    return NextResponse.json({
      success: true,
      message: "Lead recorded successfully"
    });
  } catch (error: any) {
    console.error("[Officera Lead Error]:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process lead" },
      { status: 500 }
    );
  }
}
