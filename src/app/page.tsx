import { ChevronDown } from "lucide-react";
import { FaqSection } from "@/components/faq-section";
import { FeaturesGrid } from "@/components/features-grid";
import { Hero } from "@/components/hero";
import { OtherProductsCta } from "@/components/other-products-cta";
import { PaymentMethods } from "@/components/payment-methods";
import { ProductsCarousel } from "@/components/products-carousel";
import { ReviewsWall } from "@/components/reviews-wall";
import { tools } from "@/config/storefront.config";

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="container section">
        <div className="section-heading">
          <h2>Our Products</h2>
          <p>Click on any tool below to explore available features.</p>
          <div className="section-heading__arrow" aria-hidden>
            <ChevronDown size={28} />
          </div>
        </div>
        <ProductsCarousel tools={tools} />
      </section>

      <FeaturesGrid />

      <ReviewsWall />

      <FaqSection />

      <OtherProductsCta />

      <PaymentMethods />
    </>
  );
}
