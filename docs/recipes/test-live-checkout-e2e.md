# Test the live checkout end-to-end

The checkout modal is fully wired to `@shoppexio/storefront`. To verify
that a click on "Continue to payment" creates a real invoice and
redirects to hosted checkout, you need:

- A Shoppex shop with at least one product in stock
- The phantom-demo plan mapping in `storefront.config.ts`, or your own

## Option A — local Shoppex backend (recommended)

This is the safest path — it runs against a freshly seeded local DB
that you fully control.

### One-time setup

1. **Postgres with pgvector**

   The backend needs the `vector` extension enabled. On Windows with
   Postgres 16, follow [pgvector install docs](https://github.com/pgvector/pgvector?tab=readme-ov-file#windows)
   or use Docker:

   ```bash
   docker run -d --name shoppex-pg \
     -e POSTGRES_PASSWORD=dev \
     -p 5432:5432 \
     pgvector/pgvector:pg16
   ```

2. **Migrate**

   ```bash
   bun --filter=@shoppex/backend run db:migrate
   ```

3. **Seed phantom-demo**

   ```bash
   bun --filter=@shoppex/backend run seed:phantom-demo
   ```

   This creates 8 products with subscription variants. Stock is set per
   variant (e.g. Arc Raiders = 30, Rust = 60, FiveM = 80).

4. **Start backend**

   ```bash
   bun --filter=@shoppex/backend-elysia run dev
   ```

   Backend listens on `:3001` (HTTP) and `:3002` (dev API).

### Wire the storefront to local backend

In `apps/storefront-template-saas-tool/.env.local`:

```
NEXT_PUBLIC_SHOPPEX_SHOP_SLUG=phantom-demo
NEXT_PUBLIC_SHOPPEX_USE_SAMPLE_DATA=false
NEXT_PUBLIC_SHOPPEX_API_URL=http://localhost:3001
NEXT_PUBLIC_SHOPPEX_CHECKOUT_URL=http://localhost:3000
```

(Adjust the checkout URL if your local checkout app runs on a
different port.)

### Run the test

```bash
bun --filter=@shoppex/storefront-template-saas-tool run dev
```

Open `http://localhost:3013/products/survival-pro`, click "Purchase
Now", fill in your email, accept terms, click "Continue to payment".
The browser redirects to `localhost:3000/invoice/<id>`.

## Option B — production phantom-demo (read-only check)

You cannot complete a real checkout against production without
restocking phantom-demo, but you can verify the request shape:

1. Set `.env.local`:
   ```
   NEXT_PUBLIC_SHOPPEX_SHOP_SLUG=phantom-demo
   NEXT_PUBLIC_SHOPPEX_USE_SAMPLE_DATA=false
   NEXT_PUBLIC_SHOPPEX_API_URL=https://api.shoppex.io
   ```
2. Open Chrome DevTools, Network tab
3. Click Purchase Now and continue
4. Inspect the `POST /v1/storefront/invoices/from-cart` request

Expected response: `400 Insufficient stock` — proves wiring is
correct, but no invoice is created.

## Option C — your own Shoppex shop

In your Shoppex dashboard:

1. Create products that match the 4 tools in `storefront.config.ts`
2. Add price variants for each plan
3. Update `productId` and `variantId` in
   `src/config/storefront.config.ts` for every plan
4. Switch `.env.local` to your shop slug and run as in Option A

## What to look for in a successful test

- ✅ `POST /v1/storefront/invoices/from-cart` returns 200
- ✅ Response body has `invoiceId` and `checkoutUrl` (or `uniqid`/`url`)
- ✅ Browser navigates to `${checkoutBaseUrl}/invoice/<id>`
- ✅ Hosted checkout shows your product, plan, and price
- ✅ After payment, Shoppex emits an `order:paid` webhook (configure
  fulfillment separately — see `connect-shoppex-checkout.md`)

## Troubleshooting

- **`Insufficient stock`** — the variant has `stock = 0`. Reseed
  locally or restock in the dashboard.
- **`product not found`** — `productId` does not match a real product.
- **`selected product option not found`** — `variantId` does not match
  a variant on that product.
- **Stays in demo mode** — restart `bun run dev`. Next.js caches
  `NEXT_PUBLIC_*` values at build time.
- **CORS error against production** — verify `Origin` is allowed by
  the Shoppex API. For local dev `http://localhost:3013` is allowed by
  default.
