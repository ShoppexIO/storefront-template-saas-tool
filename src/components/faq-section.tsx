import { Plus } from "lucide-react";
import { faq } from "@/config/storefront.config";

export function FaqSection() {
  return (
    <section className="container section">
      <div className="section-heading section-heading--small">
        <span className="section-heading__eyebrow">Frequently asked questions</span>
      </div>
      <div className="faq">
        {faq.map((item) => (
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
  );
}
