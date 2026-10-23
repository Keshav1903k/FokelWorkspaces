import { NextResponse } from "next/server";
import { getDistinctCities } from "@/server/services/workspace.service";

export async function GET() {
  try {
    const cities = await getDistinctCities();
    return NextResponse.json({ cities });
  } catch (error) {
    console.error("[Cities API Error]:", error);
    return NextResponse.json(
      { error: "Failed to fetch cities" },
      { status: 500 }
    );
  }
}
