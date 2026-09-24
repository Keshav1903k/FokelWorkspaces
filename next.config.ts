import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
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
