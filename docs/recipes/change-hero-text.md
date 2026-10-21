# Rewrite the hero copy

The home hero has four editable surfaces:

- A **pill** at the top (`Hero badge` — link + tag)
- A **headline** (the giant gradient title)
- A **subheadline** (the supporting line below)
- A **CTA** label

All four are configured in `theme.config.ts`.

## Steps

```ts
// theme.config.ts → hero block

hero: {
  eyebrow: "Premium tools",
  badgeNew: "New",                          // The little colored tag inside the pill
  badgeText: "Free spoofer is live",        // The pill text
  headline: "Vector",                       // The giant title
  subheadline: "The premium tools experience.",
  cta: "Start using it",                    // Button label
  sideImage: null,                          // Path to a hero side image (under /public)
},
```

## Style notes

- **Headline** uses a vertical gradient (`var(--foreground)` to translucent). Long headlines (3+ words) work; very long ones wrap awkwardly. Keep it punchy.
- **Subheadline** is centered and capped at 520px wide. ≤90 characters reads best.
- **CTA** points to `/products` by default. Change the link in `src/components/hero.tsx` if you want a different destination.

## Add a brand asset alongside the hero

`themeConfig.hero.sideImage` is wired in but not yet rendered (the default hero is centered, no side art — Ambani's character is *not* part of this template by default).

To render a side image:

1. Put the asset in `public/hero-side.png` (recommended size 720×900, transparent PNG or WebP).
2. Set `themeConfig.hero.sideImage = "/hero-side.png"`.
3. Edit `src/components/hero.tsx` to render the image and switch the layout from centered text to grid:

```tsx
// src/components/hero.tsx — see existing component for context
<div className="hero" style={{
  display: "grid",
  gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)",
  alignItems: "center",
  textAlign: "left",
}}>
  <div>{/* existing hero content */}</div>
  {themeConfig.hero.sideImage ? (
    <img src={themeConfig.hero.sideImage} alt="" aria-hidden="true" />
  ) : null}
</div>
```

Mobile responsive: collapse the grid to 1fr below 720px.

## Verify

Refresh `/`. The headline should change, the subheadline matches, the CTA label is updated, and the pill at the top reflects `badgeNew` + `badgeText`.
