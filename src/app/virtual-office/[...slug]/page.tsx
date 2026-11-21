import { WorkspaceDetailView } from '@/components/workspaces/WorkspaceDetailView';

export default async function DetailPage({
  params,
}: {
  params: Promise<{ slug: string[] | string }>;
}) {
  const { slug } = await params;
  const slugParam = Array.isArray(slug) ? slug[slug.length - 1] : slug;
  return <WorkspaceDetailView idOrSlug={slugParam} />;
}
