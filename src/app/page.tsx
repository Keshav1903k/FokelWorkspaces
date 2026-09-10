import { Hero } from "@/components/sections/Hero";
import { FeaturedOfficeSpaces } from "@/components/sections/FeaturedOfficeSpaces";
import { WorkspaceTypes } from "@/components/sections/WorkspaceTypes";
import { CityExplorer } from "@/components/sections/CityExplorer";
import { ComparisonPanel } from "@/components/sections/ComparisonPanel";
import { ForBusinesses } from "@/components/sections/ForBusinesses";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Testimonials } from "@/components/sections/Testimonials";
import { FaqAndNewsletter } from "@/components/sections/FaqAndNewsletter";

export default function Home() {
  return (
    <div className="flex flex-col bg-[#FAF8F5]">
      <Hero />
      <FeaturedOfficeSpaces />
      <WorkspaceTypes />
      <CityExplorer />
      <ComparisonPanel />
      <ForBusinesses />
      <CtaBanner />
      <Testimonials />
      <FaqAndNewsletter />
    </div>
  );
}
