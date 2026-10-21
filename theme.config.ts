/**
 * Brand and visual configuration for the saas-tool storefront template.
 *
 * This is the primary CUSTOMIZE surface. Change values here to rebrand the
 * storefront without touching any component code. All tokens here flow into
 * src/app/globals.css via the RootLayout style attribute.
 *
 * For LLM agents: see CLAUDE.md → "Customizing the brand" for recipes.
 */

export const themeConfig = {
  // CUSTOMIZE: Brand identity ---------------------------------------------
  brandName: "Vector",
  brandTaglineShort: "next-gen tools",
  tagline: "The premium experience.",
  description:
    "License-based software with subscription plans, instant delivery, and a forkable storefront.",
  announcement: "New release — try the free spoofer",

  // CUSTOMIZE: Brand colors -----------------------------------------------
  // Pick ONE accent that means something. Cyan = tech, next-gen.
  // Pair tokens (background, surface, border) should stay close to neutral
  // dark — the accent is what people remember.
  colors: {
    // Surface scale (dark mode first)
    background: "#05070a",
    foreground: "#f1f5f9",
    muted: "#7c8696",
    surface: "#0c1015",
    surfaceStrong: "#141a22",
    border: "#1e2530",
    borderStrong: "#2d3645",

    // Accent — Electric cyan
    accent: "#00d9ff",
    accentStrong: "#00b3d4",
    accentSoft: "rgba(0, 217, 255, 0.12)",
    accentForeground: "#001218",

    // Semantic
    success: "#22e58e",
    successSoft: "rgba(34, 229, 142, 0.12)",
    danger: "#ff5470",
    dangerSoft: "rgba(255, 84, 112, 0.12)",
    warning: "#f5b14a",
    warningSoft: "rgba(245, 177, 74, 0.12)",
  },

  // CUSTOMIZE: Social ------------------------------------------------------
  socials: {
    discord: "https://discord.gg/example",
    dashboard: "/dashboard",
  },

  // CUSTOMIZE: Hero --------------------------------------------------------
  hero: {
    eyebrow: "Premium tools",
    badgeNew: "New",
    badgeText: "Free spoofer is live",
    headline: "Vector",
    subheadline: "The premium tools experience.",
    cta: "Start using it",
    // Optional: a path to a full-bleed hero background image (in /public).
    // The image is rendered behind the headline at object-cover. Compose
    // your art with the focal point on the right and dark negative space
    // on the left so the headline sits cleanly above it. Recommended:
    // 1920x1200, dark base, with brand-accent rim light on the subject.
    // Leave null for the gradient-only variant.
    backgroundImage: "/hero/hero-character.png" as string | null,
  },

  // CUSTOMIZE: Footer ------------------------------------------------------
  footer: {
    rightsHolder: "Vector",
    tagline:
      "The premium tool experience. License-based software with subscription plans and instant delivery.",
    columns: [
      {
        title: "Product",
        links: [
          { label: "Tools", href: "/products" },
          { label: "Status", href: "/status" },
          { label: "Free spoofer", href: "/tool" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "Careers", href: "/jobs" },
          { label: "Contact", href: "mailto:hello@example.com" },
        ],
      },
    ],
    legalLinks: [
      { label: "Terms", href: "/terms" },
      { label: "Privacy", href: "/privacy" },
      { label: "Refunds", href: "/refunds" },
    ],
  },
};
