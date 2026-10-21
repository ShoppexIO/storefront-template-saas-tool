# Change subscription plan periods

By default each tool offers **1 day / 7 days / 30 days** plans. Common alternatives: weekly/monthly/yearly, single-tier "lifetime", or a mix.

## Where to edit

`src/config/storefront.config.ts` → each tool's `plans` array.

```ts
// Before — 3 day-based plans
plans: [
  { id: "1d", label: "1 Day", durationDays: 1, price: 7.5 },
  { id: "7d", label: "7 Days", durationDays: 7, price: 17.5 },
  { id: "30d", label: "30 Days", durationDays: 30, price: 34.99, popular: true },
],

// After — Weekly / Monthly / Annual
plans: [
  { id: "week", label: "Weekly", durationDays: 7, price: 9.99 },
  { id: "month", label: "Monthly", durationDays: 30, price: 29.99, popular: true },
  { id: "year", label: "Annual", durationDays: 365, price: 199 },
],
```

## Two-tier or single-tier plans

The plan selector grid is `grid-template-columns: repeat(3, 1fr)` — it works with **1, 2, or 3** plans, but with 4+ plans it gets cramped.

If you want a single tier ("Lifetime $199"), pass one plan and the grid will collapse cleanly.

## Mark "Most Popular"

Set `popular: true` on **at most one** plan per tool. The badge sits above the card and the price uses the accent color. If multiple plans have `popular: true`, only the first one is highlighted (rest silently ignored).

## Verify

After editing, the **Detail** page (`/products/<slug>`) should show the new plans. If you change the default plan id, you may need to update `popularPlanId` resolution in `product-detail.tsx` — but typically it auto-resolves.

## Common mistakes

- **Renaming `id`** without updating any places that reference it. The id is just used internally for selection state, but if you wire up live checkout, you may pass it as a variant id to Shoppex.
- **Pricing as string.** Use a number: `price: 9.99`, not `"9.99"`.
