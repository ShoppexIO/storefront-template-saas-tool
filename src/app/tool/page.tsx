import Link from "next/link";
import { ArrowRight, RotateCcw, TriangleAlert } from "lucide-react";
import { ToolStepIcon } from "@/components/tool-step-icon";
import { toolPage } from "@/config/storefront.config";

export default function ToolPage() {
  return (
    <main className="container section--tight section--dotted">
      <section className="tool-hero">
        <span className="section-heading__eyebrow tool-hero__eyebrow">Free tool</span>
        <h1 className="tool-hero__title">{toolPage.title}</h1>
        <p className="tool-hero__subtitle">{toolPage.subtitle}</p>
        <Link className="btn-primary btn-primary--lg" href={toolPage.ctaHref}>
          {toolPage.ctaLabel}
          <ArrowRight size={16} />
        </Link>
        <p className="tool-hero__hint">
          <RotateCcw size={12} />
          Temporary — your HWID resets after a restart
        </p>
      </section>

      <div className="tool-warning">
        <span className="tool-warning__icon">
          <TriangleAlert size={18} />
        </span>
        <div>
          <p className="tool-warning__title">{toolPage.warning.title}</p>
          <p className="tool-warning__body">{toolPage.warning.body}</p>
        </div>
      </div>

      <div className="tool-steps">
        {toolPage.steps.map((step) => (
          <article className="tool-step" key={step.number}>
            <span className="tool-step__icon">
              <ToolStepIcon name={step.icon} />
            </span>
            <h3 className="tool-step__title">
              {step.number}. {step.title}
            </h3>
            <p className="tool-step__description">{step.description}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
