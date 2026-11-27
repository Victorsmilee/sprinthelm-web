import { Nav }          from "@/components/layout/nav";
import { Footer }       from "@/components/layout/footer";
import { JsonLd }       from "@/components/seo/JsonLd";
import { softwareApplicationSchema, faqPageSchema } from "@/lib/seo/structured-data";
import { Hero }         from "@/components/sections/hero";
import { SocialProof }  from "@/components/sections/social-proof";
import { Problem }      from "@/components/sections/problem";
import { Portfolio }    from "@/components/sections/portfolio";
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
      {/* Homepage structured data: the product (with pricing offers) and the
          FAQ (eligible for FAQ rich results, built from the same source the
          visible accordion uses). */}
      <JsonLd data={[softwareApplicationSchema(), faqPageSchema()]} />
      <Nav />
      <main>
        <Hero />
        <SocialProof />
        <Problem />
        <Portfolio />
        <HowItWorks />
        <Features />
        <Demo />
        <Pricing />
        <Testimonials />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
