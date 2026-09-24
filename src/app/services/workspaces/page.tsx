import { redirect } from "next/navigation";

export default function LegacyWorkspacesPageRedirect() {
  redirect("/workspaces");
}
