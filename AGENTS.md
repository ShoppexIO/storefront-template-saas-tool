# AGENTS.md

Operating manual for AI coding agents working on a fork of this template. Pair this with [`CLAUDE.md`](CLAUDE.md).

## Safe-to-edit files (touch freely)

- `theme.config.ts`
- `src/config/storefront.config.ts`
- `src/app/page.tsx` and other route entries (rearrange sections)
- `public/*` (replace logos, hero art, OG images)
- Anything in `docs/`

## Edit-with-care files

These hold structural code shared across the template. Edit only if a config-level change can't accomplish the goal.

- `src/components/floating-pill-nav.tsx` — touch only to add/remove top-nav links
- `src/components/checkout-modal.tsx` — touch only when adding/removing checkout fields, or to wire up live Shoppex checkout
- `src/components/product-detail.tsx` — touch only to change the detail-page layout (e.g. swap video for image gallery)
- `src/app/globals.css` — extend for new components, but never override the token values directly (use `theme.config.ts`)

## Don't-touch files (build/config plumbing)

- `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `vitest.config.ts`, `biome.json`, `components.json` — touch only on deliberate stack upgrades
- `src/components/ui/*.tsx` — these are shadcn primitives; replace via shadcn CLI if needed, don't hand-edit
- `src/lib/shoppex-client.ts`, `src/lib/storefront-data.ts`, `src/lib/product-utils.ts`, `src/lib/sample-storefront.ts` — Shoppex SDK plumbing; only touch when going live

## Common change requests → preferred approach

| Request | Preferred edit |
|---|---|
| "Change the brand color to blue" | `theme.config.ts` → `colors.accent` (one line) |
| "Add a new game / tool" | `src/config/storefront.config.ts` → `tools` array |
| "Different subscription periods" | `src/config/storefront.config.ts` → each `tool.plans` |
| "Hide reviews" | Remove `<ReviewsWall />` from `src/app/page.tsx` |
| "Change 'Detected' to 'Banned'" | `src/components/tool-card.tsx` and `src/app/status/page.tsx` (search for the literal) |
| "Add a navigation link" | `src/components/floating-pill-nav.tsx` → `NAV_LINKS` |
| "Add a new page" | `src/app/<route>/page.tsx`, then add to `NAV_LINKS` |
| "Replace the spoofer page with something else" | Rename `src/app/tool/page.tsx`, update `NAV_LINKS`, update hero badge link |

## Build verification before claiming a task is done

Always run from the app folder:

```bash
bun run typecheck
bun run lint
bun run build
```

Don't claim "done" until all three pass. If only `typecheck` passes, say so explicitly.

## Style invariants

These rules are enforced by review (no automated checker):

1. Components use existing CSS classes from `globals.css` whenever possible. Tailwind utility usage is limited to layout helpers (`flex`, `grid`, `gap-*`).
2. Numbers in product cards, prices, plan amounts, response times, dates → wrap in `font-variant-numeric: tabular-nums` (already on the price classes).
3. Every interactive element has a hover state that *increases* visual weight (border darkens, background fills) — never just `opacity: 0.7`.
4. Every list/grid has an empty state. Don't render `<div></div>` if the source array is empty.
5. Use `Intl.NumberFormat` / `Intl.DateTimeFormat` for any user-facing numbers/dates that aren't simple USD prices already formatted in the config.
