import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/services/workspaces",
        destination: "/workspaces",
        permanent: true,
      },
      {
        source: "/list-space",
        destination: "/workspaces/list-space",
        permanent: true,
      },
      {
        source: "/services",
        destination: "/solutions",
        permanent: true,
      },
      {
        source: "/business-registration",
        destination: "/solutions/business-registration",
        permanent: true,
      },
      {
        source: "/support-services",
        destination: "/solutions/support-services",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
