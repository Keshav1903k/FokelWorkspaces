import { PremiumServices } from "@/components/sections/PremiumServices";
import { FeaturedOfficeSpaces } from "@/components/sections/FeaturedOfficeSpaces";
import { WorkspaceGallery } from "@/components/sections/WorkspaceGallery";
import { CtaBanner } from "@/components/sections/CtaBanner";

export default function SolutionsPage() {
  return (
    <div className="flex flex-col">
      <PremiumServices />
      <FeaturedOfficeSpaces />
      <WorkspaceGallery />
      <CtaBanner />
    </div>
  );
}
