import { Hero } from "@/components/sections/Hero";
import { Authority } from "@/components/sections/Authority";
import { Services } from "@/components/sections/Services";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Transformation } from "@/components/sections/Transformation";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <Authority />
      <Services />
      <HowItWorks />
      <Transformation />
      <FinalCta />
    </>
  );
}
