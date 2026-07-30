import { Hero } from "@/components/sections/Hero";
import { LogoCloud } from "@/components/sections/LogoCloud";
import { HomepageServices } from "@/components/sections/HomepageServices";
import { Statistics } from "@/components/sections/Statistics";
import { Testimonials } from "@/components/sections/Testimonials";
import { FaqAndNewsletter } from "@/components/sections/FaqAndNewsletter";
import { ContactForm } from "@/components/sections/ContactForm";
import { CtaBanner } from "@/components/sections/CtaBanner";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Statistics />
      <LogoCloud />
      <HomepageServices />
      <Testimonials />
      <FaqAndNewsletter />
      <ContactForm />
      <CtaBanner />
    </div>
  );
}
