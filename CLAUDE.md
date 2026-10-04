# CLAUDE.md

This file is for AI agents (Claude, Codex, Cursor, etc.) opening this repository for the first time. Read it before suggesting any code changes.

## What this is

A forkable, production-ready Next.js storefront template for selling **subscription-based digital tools** (cheats, automation tools, license-based software, Discord-bot SaaS). It uses [Shoppex](https://shoppex.io) as the commerce backend (catalog, payments, license delivery, webhooks) and ships with these surfaces out of the box:

- Floating-pill navigation
- Hero + featured products + features-grid + reviews wall (home)
- Searchable products grid with status badges (`/products`)
- Product detail page with video showcase, system requirements, 3-card subscription plan selector, modal checkout (`/products/[slug]`)
- Real-time-style product status page (`/status`)
- Free-tool / spoofer landing (`/tool`)
- Careers page (`/jobs`)

The template is **opinionated, not generic**. If a forker needs a different vertical (Shopify-style fashion, marketplace, etc.) they should fork the sibling **engine starter** (`apps/storefront-starter`) instead.

## Stack

- Next.js 16 (App Router, RSC)
- TypeScript
- Tailwind CSS v4
- Radix UI primitives + shadcn-style components
- `@shoppexio/storefront` for catalog reads + checkout redirect
- Hand-rolled CSS in `src/app/globals.css` — no Tailwind utility soup, every interactive surface uses BEM-style class names.

## Two customization surfaces (this is the main thing)

**80% of customizations** live in two files. Touch these first, only edit components if these two don't cover the change.

1. **`theme.config.ts`** (repo root) — brand identity, colors, hero copy, footer, social links.
2. **`src/config/storefront.config.ts`** — tools/products, subscription plans, status reports, reviews, features, jobs, free-tool page content.

Every component in `src/components/` reads from these two files. Search for `// CUSTOMIZE:` comments in the codebase to find the editable surfaces.

## Recipes (always check these first)

Before suggesting an edit, see if a recipe already covers the request:

- [`docs/recipes/change-brand-color.md`](docs/recipes/change-brand-color.md) — recolor the entire site
- [`docs/recipes/change-plan-periods.md`](docs/recipes/change-plan-periods.md) — switch between weekly/monthly/yearly etc.
- [`docs/recipes/add-product-category.md`](docs/recipes/add-product-category.md) — add a new tool/category
- [`docs/recipes/customize-status-vocab.md`](docs/recipes/customize-status-vocab.md) — change "Detected/Undetected" labels
- [`docs/recipes/toggle-reviews.md`](docs/recipes/toggle-reviews.md) — show/hide review sections
- [`docs/recipes/change-hero-text.md`](docs/recipes/change-hero-text.md) — rewrite the home headline
- [`docs/recipes/customize-checkout-fields.md`](docs/recipes/customize-checkout-fields.md) — add/remove fields in the modal
- [`docs/recipes/connect-shoppex-checkout.md`](docs/recipes/connect-shoppex-checkout.md) — wire the demo modal up to a live Shoppex shop

## Architecture map

```
apps/storefront-template-saas-tool/
├── theme.config.ts                     # CUSTOMIZE: brand identity
├── src/
│   ├── app/
│   │   ├── globals.css                 # Token system + every component CSS class
│   │   ├── layout.tsx                  # Root layout, applies theme.config tokens
│   │   ├── page.tsx                    # Home: Hero + featured grid + features + reviews
│   │   ├── products/
│   │   │   ├── page.tsx                # Products grid with search + sort
│   │   │   └── [slug]/page.tsx         # Detail page with 3-plan selector + modal checkout
│   │   ├── status/page.tsx             # Per-tool detection + version status
│   │   ├── tool/page.tsx               # Free-tool landing
│   │   └── jobs/page.tsx               # Careers
│   ├── components/
│   │   ├── floating-pill-nav.tsx       # Top nav, sticky pill style
│   │   ├── hero.tsx                    # Home hero
│   │   ├── tool-card.tsx               # Card used on home + /products
│   │   ├── product-detail.tsx          # Right column on detail page
│   │   ├── checkout-modal.tsx          # Inline modal triggered by Purchase Now
│   │   ├── products-browser.tsx        # /products client component
│   │   ├── reviews-wall.tsx
│   │   ├── features-grid.tsx
│   │   ├── site-footer.tsx
│   │   └── ui/                         # shadcn primitives (button, dialog, sheet, input...)
│   ├── config/
│   │   └── storefront.config.ts        # CUSTOMIZE: catalog, plans, status, reviews, jobs
│   └── lib/                            # @shoppexio/storefront helpers (live mode)
└── docs/
    ├── recipes/                        # Step-by-step prompt-to-diff examples
    └── prompts/                        # Reusable customizing prompt templates
```

## Rules for code changes

1. **Prefer config edits over component edits.** Always look at `theme.config.ts` and `src/config/storefront.config.ts` before reaching for a `.tsx` file.
2. **Tokens, not hardcoded values.** Colors, spacing, radius — they all flow from CSS variables in `globals.css`. Never hardcode `#00d9ff` or `12px` in a component.
3. **One depth strategy: borders.** Cards, inputs, popovers — all use `1px solid var(--border)`. Never add `box-shadow` for elevation.
4. **One radius scale.** `--radius-sm` (6px), `--radius` (8px), `--radius-lg` (12px), `--radius-pill` (999px). No other radii.
5. **4px spacing grid.** Use `--space-1` through `--space-20`. Never write `padding: 13px`.
6. **Color carries meaning only.** Use `--accent` only for actual brand moments. Use `--success`, `--danger`, `--warning` for status. Plain content stays `--foreground` / `--muted`.
7. **Server components by default.** Add `"use client"` only when the component needs state, effects, or browser APIs. The home page, status page, tool page, and jobs page are all RSCs.
8. **Don't introduce new UI libraries.** The stack is fixed: Tailwind v4 + Radix UI primitives + Lucide icons. Don't add Headless UI, Mantine, etc.

## Live mode vs. demo mode

In demo mode (default — `NEXT_PUBLIC_SHOPPEX_USE_SAMPLE_DATA=true`), `src/config/storefront.config.ts` is the source of truth and the modal checkout is a stub. To go live:

1. Set `NEXT_PUBLIC_SHOPPEX_SHOP_SLUG=<your-shop>`.
2. Set `NEXT_PUBLIC_SHOPPEX_USE_SAMPLE_DATA=false`.
3. Wire the modal checkout's `submit()` to `getShoppexClient().checkout({...})` — see `docs/recipes/connect-shoppex-checkout.md`.

Status, plans, jobs, reviews stay config-driven. Shoppex doesn't host these surfaces — they're part of the merchant's brand story.

## Don'ts

- **Don't** delete `// CUSTOMIZE:` comments. They are LLM anchors.
- **Don't** add a Theme Builder UI inside the storefront. This is code-first by design — that's the whole reason it's forkable.
- **Don't** introduce a server-side cart. Each product has its own modal checkout. Cart UX is a different template.
- **Don't** build a new auth surface. Authentication for end users happens via the Shoppex customer portal (`themeConfig.socials.dashboard`).
- **Don't** rename `theme.config.ts` or `src/config/storefront.config.ts`. The CLI scaffolder (`packages/create-storefront`) and the export script depend on these paths.

## When unsure

- For an edit you can't find a recipe for: ask the human first, don't invent a pattern.
- For a question about how Shoppex works: see `apps/docs/headless/` in the parent monorepo, or [docs.shoppex.io](https://docs.shoppex.io).
