import type { MetadataRoute } from "next";
import { WORKSPACES } from "@/constants/data";
import { getWorkspaceUrl } from "@/lib/workspace-url";

const BASE_URL = "https://officera.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  // Core public static page routes
  const publicStaticRoutes: {
    path: string;
    priority: number;
    changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  }[] = [
    { path: "", priority: 1.0, changeFrequency: "daily" }, // Home (https://officera.in)
    { path: "/workspaces", priority: 0.9, changeFrequency: "daily" },
    { path: "/coworking-spaces", priority: 0.9, changeFrequency: "daily" },
    { path: "/virtual-offices", priority: 0.9, changeFrequency: "daily" },
    { path: "/solutions", priority: 0.8, changeFrequency: "weekly" },
    { path: "/solutions/business-registration", priority: 0.8, changeFrequency: "weekly" },
    { path: "/solutions/support-services", priority: 0.8, changeFrequency: "weekly" },
    { path: "/pricing", priority: 0.8, changeFrequency: "weekly" },
    { path: "/about-us", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
    { path: "/workspaces/list-space", priority: 0.7, changeFrequency: "monthly" },
  ];

  const staticEntries: MetadataRoute.Sitemap = publicStaticRoutes.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: currentDate,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Dynamic workspace detail page routes generated from data
  const seenUrls = new Set<string>();
  const workspaceEntries: MetadataRoute.Sitemap = [];

  for (const space of WORKSPACES) {
    const relativeUrl = getWorkspaceUrl(space);
    if (relativeUrl && !seenUrls.has(relativeUrl)) {
      seenUrls.add(relativeUrl);
      workspaceEntries.push({
        url: `${BASE_URL}${relativeUrl}`,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  }

  return [...staticEntries, ...workspaceEntries];
}
