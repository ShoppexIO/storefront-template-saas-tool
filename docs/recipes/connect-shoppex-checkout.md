# Connect the modal to live Shoppex checkout

The modal already knows how to talk to Shoppex. By default it runs in
**demo mode** (sample data + toast confirmation). To go live you only
need to flip a flag and map your plans to real Shoppex products.

## Step 1 — switch to live mode

In `.env.local`:

```
NEXT_PUBLIC_SHOPPEX_SHOP_SLUG=<your-shop-slug>
NEXT_PUBLIC_SHOPPEX_USE_SAMPLE_DATA=false
NEXT_PUBLIC_SHOPPEX_API_URL=https://api.shoppex.io
NEXT_PUBLIC_SHOPPEX_CHECKOUT_URL=https://checkout.shoppex.io
```

Once `NEXT_PUBLIC_SHOPPEX_USE_SAMPLE_DATA=false`, the modal stops
showing demo toasts and calls the real `@shoppexio/storefront` SDK.

## Step 2 — map plans to Shoppex products

In `src/config/storefront.config.ts`, every plan has two optional fields:

```ts
plans: [
  {
    id: "1d",
    label: "1 Day",
    durationDays: 1,
    price: 7.5,
    productId: "abc123",      // Shoppex product id
    variantId: "v_30d_basic",  // Shoppex variant id (or "default")
  },
  // ...
]
```

You can find product and variant ids in the Shoppex dashboard:

1. Open the product
2. Copy the product id from the URL or settings panel
3. Copy each variant id from the variants list

If a product has no variants, you can leave `variantId` unset — the SDK
defaults to `"default"`.

## Step 3 — webhook setup (optional but recommended)

After payment Shoppex emits a signed `order:paid` webhook. The template
itself does not host an API route for this — your existing backend or
the parent Shoppex shop handles it. If you need a custom webhook
handler in this template, add one at:

```
src/app/api/shoppex/webhook/route.ts
```

and verify the signature with `SHOPPEX_WEBHOOK_SECRET` from
`.env.local`. See the parent monorepo's `apps/storefront-starter` for
a reference implementation.

The webhook is what fulfills the order — license key generation,
Discord role assignment, email follow-up — so even though it is
optional for the basic flow, you almost always want one.

## Step 4 — verify

1. Restart the dev server: `bun run dev`
2. Open a product and click "Purchase Now"
3. Fill in your email, accept the terms, click "Continue to payment"
4. The browser should redirect to
   `https://checkout.shoppex.io/invoice/<id>`

If something is missing, the modal shows a clear error toast — no
silent fallthroughs.

## Common errors

- **"Plan is missing a productId in storefront.config.ts"** —
  You forgot Step 2 for that plan.
- **"product not found"** — `plan.productId` does not match any
  product in your Shoppex shop.
- **"selected product option not found"** — `plan.variantId` does
  not match a real variant on that product.
- **Stays in demo mode despite the env flag** — Restart `bun run dev`.
  Next.js caches `NEXT_PUBLIC_*` values at build time.

## What the SDK actually does

For each click on "Continue to payment", the modal:

1. Clears any leftover cart state from a previous session
2. Adds `productId` + `variantId` for the selected plan with quantity 1
3. Calls `shoppex.checkout({ email, coupon, affiliateCode, autoRedirect: true })`
4. The SDK creates an invoice via `/v1/storefront/invoices/from-cart`
   and redirects the browser to the hosted checkout URL

You never touch card data — Shoppex hosts the actual payment page.
