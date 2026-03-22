import { Nav }          from "@/components/layout/nav";
import { Footer }       from "@/components/layout/footer";
import { Hero }         from "@/components/sections/hero";
import { SocialProof }  from "@/components/sections/social-proof";
import { Problem }      from "@/components/sections/problem";
import { HowItWorks }   from "@/components/sections/how-it-works";
import { Features }     from "@/components/sections/features";
import { Demo }         from "@/components/sections/demo";
import { Pricing }      from "@/components/sections/pricing";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq }          from "@/components/sections/faq";
import { Cta }          from "@/components/sections/cta";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <SocialProof />
        <Problem />
        <HowItWorks />
        <Features />
        <Demo />
        <Pricing />
        <Testimonials />
        <Cta />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
