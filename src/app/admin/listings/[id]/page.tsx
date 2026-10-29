import { getAdminListingDetail } from "@/server/services/admin.service";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  ChevronLeft,
  MapPin,
  Tag,
  User,
  Mail,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import ListingReviewActions from "./ListingReviewActions";

export const dynamic = "force-dynamic";

interface ListingDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminListingDetailPage({ params }: ListingDetailPageProps) {
  const { id } = await params;
  const listing = await getAdminListingDetail(id);

  if (!listing) {
    notFound();
  }

  const isPublished = listing.status === "PUBLISHED" || listing.status === "APPROVED";

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Back button & top status bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/listings"
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                {listing.title}
              </h1>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
                  isPublished
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                    : listing.status === "REJECTED"
                    ? "bg-rose-500/10 text-rose-400 border-rose-500/30"
                    : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                }`}
              >
                {listing.status}
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-zinc-500" />
              {listing.location}, {listing.city}
            </p>
          </div>
        </div>

        {/* Live link if published */}
        {isPublished && (
          <Link
            href={`/workspaces/${listing.slug}`}
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-800 text-xs font-medium text-zinc-300 hover:text-white border border-zinc-700 hover:border-zinc-600 transition-colors"
          >
            View Live Listing <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>

      {/* Review Notes Callout if rejected */}
      {listing.reviewNotes && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm space-y-1">
          <div className="flex items-center gap-2 font-semibold">
            <AlertCircle className="w-4 h-4 text-amber-400" />
            Previous Review Feedback:
          </div>
          <p className="text-xs text-amber-200/90 pl-6">{listing.reviewNotes}</p>
        </div>
      )}

      {/* Action Decision Card */}
      <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-orange-500" />
            Review Decision Panel
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Approve to publish immediately to public catalog and promote images to public bucket, or reject with feedback.
          </p>
        </div>

        <ListingReviewActions
          listingId={listing.id}
          listingTitle={listing.title}
          currentStatus={listing.status}
          partnerEmail={listing.partner?.email}
        />
      </div>

      {/* Main Grid: Details + Images Gallery */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Details & Operator Info */}
        <div className="space-y-6 lg:col-span-1">
          {/* Operator / Broker Info */}
          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4 text-orange-400" />
              Owner / Broker Details
            </h3>

            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-500">Contact Name</span>
                <span className="font-medium text-zinc-200">
                  {listing.partner?.name || "Direct Submitter"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-500">Email</span>
                <span className="font-medium text-zinc-200 text-xs">
                  {listing.partner?.email || "N/A"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-500">Submitted On</span>
                <span className="text-xs text-zinc-300">
                  {new Date(listing.createdAt).toLocaleDateString("en-IN", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              {listing.reviewedBy && (
                <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
                  <span className="text-xs text-zinc-500">Reviewed By</span>
                  <span className="text-xs text-zinc-300">
                    {listing.reviewedBy.name || listing.reviewedBy.email}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Pricing & Specifications */}
          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
              <Tag className="w-4 h-4 text-emerald-400" />
              Workspace Specifications
            </h3>

            <div className="space-y-2.5 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-500">Display Price</span>
                <span className="font-bold text-emerald-400">{listing.priceDisplay}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-500">Type</span>
                <span className="text-xs text-zinc-200 font-medium">{listing.type}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-500">Capacity</span>
                <span className="text-xs text-zinc-200">
                  {listing.capacity ? `${listing.capacity} Desks` : "Flexible"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-500">City / State</span>
                <span className="text-xs text-zinc-200">
                  {listing.city} {listing.state ? `, ${listing.state}` : ""}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-500">Pincode</span>
                <span className="text-xs text-zinc-200">{listing.pincode || "N/A"}</span>
              </div>
            </div>
          </div>

          {/* Amenities Checklist */}
          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Verified Amenities ({listing.amenities.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {listing.amenities.map((am) => (
                <span
                  key={am.amenityId || am.amenity.id}
                  className="px-2.5 py-1 rounded-lg bg-zinc-800 border border-zinc-700/60 text-xs text-zinc-300"
                >
                  {am.amenity.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Image Gallery & Description */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
            <h3 className="text-sm font-bold text-white">About the Space</h3>
            <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-line">
              {listing.description || "No description provided."}
            </p>
          </div>

          {/* Image Gallery */}
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">
                Submitted Photos ({listing.images.length})
              </h3>
              <span className="text-xs text-zinc-500">
                {isPublished ? "Public Bucket" : "Pending Bucket (Secure Preview)"}
              </span>
            </div>

            {listing.images.length === 0 ? (
              <div className="p-8 text-center text-xs text-zinc-500 border border-dashed border-zinc-800 rounded-xl">
                No images submitted for this workspace.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {listing.images.map((img, idx) => (
                  <div
                    key={img.id}
                    className="relative aspect-video rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 group"
                  >
                    <Image
                      src={img.previewUrl || img.url}
                      alt={img.altText || `Photo ${idx + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-medium text-white">
                      {img.isPrimary ? "Primary Photo" : `Photo ${idx + 1}`}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
