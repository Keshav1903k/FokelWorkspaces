export function getWorkspaceUrl(space: { id: string; slug?: string; type?: string; url?: string; shortId?: string }): string {
  if (space.url) {
    return space.url;
  }
  const slug = space.shortId?.toLowerCase() || space.slug || space.id;
  const t = (space.type || "").toLowerCase();

  if (t.includes("virtual")) {
    return `/virtual-office/${slug}`;
  }
  if (t.includes("coworking")) {
    return `/coworking/${slug}`;
  }
  if (t.includes("managed")) {
    return `/managed-office/${slug}`;
  }
  if (t.includes("commercial") || t.includes("office")) {
    return `/office-space/${slug}`;
  }
  return `/workspaces/${slug}`;
}
