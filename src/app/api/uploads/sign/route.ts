import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { createSignedUploadUrl } from "@/server/services/storage.service";
import { z } from "zod";

const uploadSignSchema = z.object({
  listingId: z.string().min(1, "Listing ID is required"),
  fileType: z.enum(["image/jpeg", "image/png", "image/webp"], {
    message: "Only JPEG, PNG, or WebP images are allowed",
  }),
  fileSize: z.number().max(10 * 1024 * 1024, "Image must be under 10MB"),
  currentImageCount: z.number().max(15, "Maximum 15 images allowed per listing").default(0),
});

export async function POST(req: Request) {
  try {
    const session = await auth();
    const userRole = (session?.user as any)?.role;

    if (!session?.user?.id || (userRole !== "PARTNER" && userRole !== "ADMIN")) {
      return NextResponse.json(
        { error: "Unauthorized: Partner or Admin access required to upload images" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const parsed = uploadSignSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { listingId, fileType } = parsed.data;
    const extension = fileType === "image/jpeg" ? "jpg" : fileType === "image/png" ? "png" : "webp";

    const signedData = await createSignedUploadUrl(listingId, extension);

    return NextResponse.json({
      success: true,
      ...signedData,
    });
  } catch (error: any) {
    console.error("[Upload Sign Error]:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate upload signed URL" },
      { status: 500 }
    );
  }
}
