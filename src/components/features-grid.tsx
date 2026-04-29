import { FeatureIcon } from "@/components/feature-icon";
import { features } from "@/config/storefront.config";

export function FeaturesGrid() {
  return (
    <section className="container section">
      <div className="section-heading section-heading--small">
        <span className="section-heading__eyebrow">Why choose us</span>
      </div>
      <div className="feature-grid">
        {features.map((feature) => (
          <article className="feature-card" key={feature.title}>
            <span className="feature-card__icon">
              <FeatureIcon name={feature.icon} />
            </span>
            <h3 className="feature-card__title">{feature.title}</h3>
            <p className="feature-card__description">{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
