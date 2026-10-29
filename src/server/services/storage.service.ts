import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

// Server-side privileged client (never exposed to browser)
export const supabaseAdmin =
  SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
    ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
        auth: { persistSession: false },
      })
    : null;

export const BUCKETS = {
  PENDING: "listing-pending", // Private: Partner uploads pending review
  PUBLIC: "listing-public",   // Public: Approved listing media
} as const;

export interface SignedUploadResult {
  path: string;
  signedUrl: string;
  token?: string;
  publicFallbackUrl?: string;
}

/**
 * Generates a signed upload URL for a partner to upload directly to listing-pending
 */
export async function createSignedUploadUrl(
  listingId: string,
  extension = "webp"
): Promise<SignedUploadResult> {
  const fileUuid = crypto.randomUUID();
  const path = `${listingId}/${fileUuid}.${extension}`;

  if (!supabaseAdmin) {
    // Development fallback if Supabase credentials are not yet configured
    return {
      path,
      signedUrl: `/api/uploads/mock?path=${encodeURIComponent(path)}`,
      publicFallbackUrl: `https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200`,
    };
  }

  const { data, error } = await supabaseAdmin.storage
    .from(BUCKETS.PENDING)
    .createSignedUploadUrl(path);

  if (error || !data) {
    throw new Error(`Failed to generate signed upload URL: ${error?.message}`);
  }

  return {
    path,
    signedUrl: data.signedUrl,
    token: data.token,
  };
}

/**
 * Generates a short-lived signed URL for admins to preview pending photos securely
 */
export async function getPendingImageSignedUrl(path: string, expiresIn = 3600): Promise<string> {
  if (!supabaseAdmin) {
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    return `https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200`;
  }

  if (path.startsWith("http://") || path.startsWith("https://")) return path;

  const { data, error } = await supabaseAdmin.storage
    .from(BUCKETS.PENDING)
    .createSignedUrl(path, expiresIn);

  if (error || !data) {
    console.error("Failed to generate signed preview URL:", error);
    return path;
  }

  return data.signedUrl;
}

/**
 * On approval: Moves photos from listing-pending to listing-public and returns public URLs
 */
export async function promoteListingImagesToPublic(
  imagePaths: string[]
): Promise<{ path: string; publicUrl: string }[]> {
  if (!supabaseAdmin) {
    return imagePaths.map((p) => ({
      path: p,
      publicUrl: p.startsWith("http")
        ? p
        : `https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200`,
    }));
  }

  const results: { path: string; publicUrl: string }[] = [];

  for (const path of imagePaths) {
    if (path.startsWith("http://") || path.startsWith("https://")) {
      results.push({ path, publicUrl: path });
      continue;
    }

    try {
      // 1. Download from pending
      const { data: fileData, error: downloadErr } = await supabaseAdmin.storage
        .from(BUCKETS.PENDING)
        .download(path);

      if (downloadErr || !fileData) {
        console.warn(`Could not download pending file ${path}:`, downloadErr);
        continue;
      }

      // 2. Upload to public
      const { error: uploadErr } = await supabaseAdmin.storage
        .from(BUCKETS.PUBLIC)
        .upload(path, fileData, {
          upsert: true,
          contentType: "image/webp",
        });

      if (uploadErr) {
        console.warn(`Could not upload to public bucket ${path}:`, uploadErr);
        continue;
      }

      // 3. Delete from pending
      await supabaseAdmin.storage.from(BUCKETS.PENDING).remove([path]);

      // 4. Get permanent public URL
      const { data: pubData } = supabaseAdmin.storage.from(BUCKETS.PUBLIC).getPublicUrl(path);

      results.push({
        path,
        publicUrl: pubData.publicUrl,
      });
    } catch (err) {
      console.error(`Error promoting image ${path}:`, err);
    }
  }

  return results;
}
