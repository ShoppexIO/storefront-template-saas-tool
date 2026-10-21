# Prompt: Wire up live Shoppex checkout

Copy this into your AI agent after rebranding and replacing the catalog:

---

I'm ready to go from demo mode to live Shoppex checkout. I have:

- A Shoppex shop with slug `<your-shop-slug>`
- API URL: `https://api.shoppex.io` (default — change only if pointing at staging)
- Checkout URL: `https://checkout.shoppex.io` (default)

Do the following:

1. Update `.env.local` to set `NEXT_PUBLIC_SHOPPEX_SHOP_SLUG=<your-shop-slug>` and `NEXT_PUBLIC_SHOPPEX_USE_SAMPLE_DATA=false`. If the file doesn't exist, create it with the keys from `.env.local.example`.
2. Wire `src/components/checkout-modal.tsx` to call the real Shoppex SDK. Use the recipe at `docs/recipes/connect-shoppex-checkout.md` — replace the `submit()` stub.
3. Verify each tool slug and plan id in `src/config/storefront.config.ts` matches a real product and price variant in my Shoppex dashboard. If you see mismatches, list them and stop — don't guess.
4. Run `bun run typecheck && bun run lint && bun run build` and report any failures.

Don't change `theme.config.ts` or any other config — only the modal wiring and `.env.local`.

---
