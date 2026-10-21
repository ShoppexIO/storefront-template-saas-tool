import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { themeConfig } from "@/lib/theme-config";

export function Hero() {
  const bg = themeConfig.hero.backgroundImage;

  return (
    <section className="hero">
      {bg ? (
        <img
          className="hero__background"
          src={bg}
          alt=""
          aria-hidden
          draggable={false}
        />
      ) : null}
      <div className="hero__bg" aria-hidden />
      <div className="container hero__inner">
        <Link className="hero__pill" href="/tool">
          <span className="hero__pill-tag">{themeConfig.hero.badgeNew}</span>
          <span>{themeConfig.hero.badgeText}</span>
          <ArrowRight size={12} />
        </Link>
        <h1 className="hero__title">
          <span className="hero__title-gradient">{themeConfig.hero.headline}</span>
        </h1>
        <p className="hero__subtitle">{themeConfig.hero.subheadline}</p>
        <div className="hero__actions">
          <Link className="btn-primary btn-primary--lg" href="/products">
            {themeConfig.hero.cta}
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
