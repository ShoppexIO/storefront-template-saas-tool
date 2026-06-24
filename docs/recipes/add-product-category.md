# Add a new tool / product

A tool is one entry in the `tools` array in `src/config/storefront.config.ts`. Add an entry, save, refresh — it will:

- Appear in the home featured grid (if among the first 3)
- Appear in the `/products` browseable grid
- Get a dedicated detail page at `/products/<slug>`
- Get a status row on `/status` (if you add a matching `statusReports` entry)

## Steps

```ts
// src/config/storefront.config.ts → tools array

{
  slug: "rust",                      // URL slug, must match getTool() lookups
  title: "Rust",
  shortDescription: "Wipe day domination, every day.",
  longDescription:
    "Aimbot tuned for Rust's recoil patterns, base ESP, sleeper finder, and a stash radar.",
  category: "Survival",
  videoId: null,                     // Optional YouTube video ID
  coverImage: null,                  // Optional path under /public
  requirements: [
    { icon: "cpu", label: "Intel/AMD" },
    { icon: "os", label: "Windows 10/11" },
    { icon: "platform", label: "Steam" },
    { icon: "shield", label: "EAC Bypass" },
  ],
  plans: [
    { id: "1d", label: "1 Day", durationDays: 1, price: 8 },
    { id: "7d", label: "7 Days", durationDays: 7, price: 22 },
    { id: "30d", label: "30 Days", durationDays: 30, price: 44.99, popular: true },
  ],
},
```

## Add a status row to match

```ts
// src/config/storefront.config.ts → statusReports array

{
  productSlug: "rust",
  detectionStatus: "undetected",
  detectionLabel: "Never detected",
  versionStatus: "up-to-date",
  detail: "Patched within 12h of every wipe.",
},
```

## Cover images

Drop a `.png` or `.webp` into `/public/` and reference it: `coverImage: "/rust-cover.webp"`. Recommended ratio: 16:10 (1280×800).

## Verify

- `/` → tool should be in the featured grid (if among first 3)
- `/products` → tool should appear in the grid and be searchable
- `/products/rust` → detail page renders without 404
- `/status` → status row appears

## Common mistakes

- **Slug with spaces or uppercase.** Use kebab-case: `rust` or `apex-legends`. The slug is in the URL.
- **Forgetting `requirements`.** The detail page renders an empty 2x2 grid. Either fill it or remove the `requirements` block from the component (riskier).
- **Empty `plans` array.** The plan selector breaks. Ship at least one plan.
