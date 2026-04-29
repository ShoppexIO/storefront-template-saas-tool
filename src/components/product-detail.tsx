"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { CheckoutModal } from "@/components/checkout-modal";
import { ProductReviewsRow } from "@/components/product-reviews-row";
import { RequirementIcon } from "@/components/requirement-icon";
import { ToolFeatureIcon } from "@/components/tool-feature-icon";
import { reviews, type ToolProduct } from "@/config/storefront.config";

type ProductDetailProps = {
  tool: ToolProduct;
};

export function ProductDetail({ tool }: ProductDetailProps) {
  const popularPlanId =
    tool.plans.find((plan) => plan.popular)?.id ?? tool.plans[tool.plans.length - 1]?.id;
  const [selectedPlanId, setSelectedPlanId] = useState(popularPlanId);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const selectedPlan = tool.plans.find((plan) => plan.id === selectedPlanId) ?? tool.plans[0];
  const productReviews = reviews.filter((review) => review.productLabel === tool.title);

  return (
    <>
      <section className="container section--tight">
        <div className="detail-grid">
          <div className="detail-media">
            {tool.videoId ? (
              <iframe
                src={`https://www.youtube.com/embed/${tool.videoId}`}
                title={`${tool.title} showcase`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : tool.coverImage ? (
              <img src={tool.coverImage} alt={tool.title} />
            ) : (
              <div className="detail-media__fallback">
                {tool.title.slice(0, 2).toUpperCase()}
              </div>
            )}
          </div>

          <div className="detail-content">
            <div>
              <h1 className="detail-title">{tool.title}</h1>
              <p className="detail-description">{tool.longDescription}</p>
            </div>

            <div className="requirements">
              <p className="requirements__label">System Requirements</p>
              <div className="requirements__grid">
                {tool.requirements.map((requirement) => (
                  <div className="requirements__item" key={requirement.label}>
                    <span className="requirements__item-icon">
                      <RequirementIcon name={requirement.icon} />
                    </span>
                    {requirement.label}
                  </div>
                ))}
              </div>
            </div>

            <div className="plan-selector">
              <header className="plan-selector__header">
                <span className="plan-selector__title">Select Your Plan</span>
                <span className="plan-selector__delivery">Instant Delivery</span>
              </header>
              <div className="plan-grid">
                {tool.plans.map((plan) => (
                  <button
                    type="button"
                    className="plan-card"
                    key={plan.id}
                    data-selected={plan.id === selectedPlanId}
                    onClick={() => setSelectedPlanId(plan.id)}
                    aria-pressed={plan.id === selectedPlanId}
                  >
                    {plan.popular ? (
                      <span className="plan-card__popular">Most Popular</span>
                    ) : null}
                    <span className="plan-card__label">{plan.label}</span>
                    <span className="plan-card__price">${plan.price}</span>
                  </button>
                ))}
              </div>
              <button
                className="btn-primary"
                type="button"
                onClick={() => setCheckoutOpen(true)}
                style={{ width: "100%" }}
              >
                Purchase Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {productReviews.length > 0 ? (
        <section className="container section section--dotted">
          <div className="section-heading section-heading--small">
            <span className="section-heading__eyebrow">Reviews</span>
            <h2>Customer reviews</h2>
          </div>
          <ProductReviewsRow reviews={productReviews} />
        </section>
      ) : null}

      {tool.features && tool.features.length > 0 ? (
        <section className="container section">
          <div className="section-heading section-heading--small">
            <span className="section-heading__eyebrow">Features</span>
            <h2>What you get</h2>
          </div>
          <div className="feature-list">
            {tool.features.map((feature) => (
              <article className="feature-row" key={feature.title}>
                <span className="feature-row__icon">
                  <ToolFeatureIcon name={feature.icon} />
                </span>
                <div className="feature-row__body">
                  <span className="feature-row__title">{feature.title}</span>
                  {feature.description ? (
                    <span className="feature-row__description">{feature.description}</span>
                  ) : null}
                </div>
                <span className="feature-row__count">{feature.count}</span>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {tool.faq && tool.faq.length > 0 ? (
        <section className="container section">
          <div className="section-heading section-heading--small">
            <span className="section-heading__eyebrow">FAQ</span>
            <h2>Frequently asked questions</h2>
          </div>
          <div className="faq">
            {tool.faq.map((item) => (
              <details className="faq__item" key={item.question}>
                <summary className="faq__question">
                  <span>{item.question}</span>
                  <Plus className="faq__icon" size={16} />
                </summary>
                <div className="faq__answer">
                  <p>{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </section>
      ) : null}

      <CheckoutModal
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        tool={tool}
        plan={selectedPlan}
      />
    </>
  );
}
