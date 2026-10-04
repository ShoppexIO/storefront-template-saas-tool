# Show or hide the reviews wall

By default the reviews wall renders at the bottom of the home page. Hiding or replacing it is one edit.

## Hide reviews

In `src/app/page.tsx`, remove the `<ReviewsWall />` component:

```tsx
// Before
<FeaturesGrid />
<ReviewsWall />

// After
<FeaturesGrid />
```

You can also delete `src/components/reviews-wall.tsx` and the `reviews` array in `src/config/storefront.config.ts` if you're sure you'll never use them.

## Replace with a single testimonial

Quicker than rebuilding the wall — pick one review and render it as a hero quote.

```tsx
// src/app/page.tsx
import { reviews } from "@/config/storefront.config";

<section className="container section">
  <blockquote
    style={{
      maxWidth: 720,
      margin: "0 auto",
      textAlign: "center",
      fontSize: 24,
      lineHeight: 1.4,
      fontWeight: 500,
    }}
  >
    <span className="review__stars" style={{ display: "block", marginBottom: 16 }}>
      {"★".repeat(reviews[0].rating)}
    </span>
    "{reviews[0].body}"
    <footer
      style={{
        marginTop: 16,
        color: "var(--muted)",
        fontSize: 14,
      }}
    >
      — {reviews[0].username} · {reviews[0].productLabel}
    </footer>
  </blockquote>
</section>
```

## Edit the existing reviews

`src/config/storefront.config.ts` → `reviews` array. Each entry has `username`, `productLabel`, `body`, `rating` (1–5).

## Verify

- Refresh `/` — the wall should be gone or replaced
- The `<FeaturesGrid />` should still render normally (no broken layout)
