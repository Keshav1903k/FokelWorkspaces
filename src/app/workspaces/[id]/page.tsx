import { WorkspaceDetailView } from "@/components/workspaces/WorkspaceDetailView";

export default async function WorkspaceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <WorkspaceDetailView idOrSlug={id} />;
}
