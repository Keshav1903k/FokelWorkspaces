import { ServicesHero } from "@/components/sections/ServicesHero";
import { PremiumServices } from "@/components/sections/PremiumServices";
import { FeaturedOfficeSpaces } from "@/components/sections/FeaturedOfficeSpaces";
import { WorkspaceGallery } from "@/components/sections/WorkspaceGallery";
import { CtaBanner } from "@/components/sections/CtaBanner";

export default function ServicesPage() {
  return (
    <div className="flex flex-col">
      <ServicesHero />
      <PremiumServices />
      <FeaturedOfficeSpaces />
      <WorkspaceGallery />
      <CtaBanner />
    </div>
  );
}
