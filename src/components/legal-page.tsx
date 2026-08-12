import type { ReactNode } from "react";
import { themeConfig } from "@/lib/theme-config";

type LegalPageProps = {
  eyebrow: string;
  title: string;
  children: ReactNode;
};

export function LegalPage({ eyebrow, title, children }: LegalPageProps) {
  return (
    <main className="container section--tight section--dotted">
      <div className="section-heading">
        <span className="section-heading__eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>
          Default legal copy for {themeConfig.brandName}. Replace this text before going live.
        </p>
      </div>

      <article className="legal-page">
        {children}
      </article>
    </main>
  );
}
