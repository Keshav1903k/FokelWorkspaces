import { redirect } from "next/navigation";

export default function LegacyListSpaceRedirect() {
  redirect("/workspaces/list-space");
}
