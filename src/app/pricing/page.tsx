import { PricingComparison } from "@/components/sections/Pricing";
import { CtaBanner } from "@/components/sections/CtaBanner";

export default function PricingPage() {
  return (
    <div className="flex flex-col">
      <PricingComparison />
      <CtaBanner />
    </div>
  );
}
