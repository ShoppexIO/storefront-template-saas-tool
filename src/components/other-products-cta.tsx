import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function OtherProductsCta() {
  return (
    <section className="container section">
      <div className="cta-banner">
        <div className="cta-banner__bg" aria-hidden />
        <div className="cta-banner__content">
          <div>
            <h2 className="cta-banner__title">We have so many other products!</h2>
            <p className="cta-banner__subtitle">Take a look at our full list of tools.</p>
          </div>
          <Link className="cta-banner__cta" href="/products">
            See all products
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
