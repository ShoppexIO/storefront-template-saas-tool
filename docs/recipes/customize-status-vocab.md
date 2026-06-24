# Customize the status vocabulary

The default vocabulary is gaming-cheat coded:

- `Detected` / `Undetected`
- `Up to Date` / `Updating`

For other domains (general SaaS, automation tools, license-based software) you'll want different language. Examples:

- `Stable` / `Beta` / `Experimental`
- `Operational` / `Degraded` / `Outage`
- `Active` / `Sunset` / `Deprecated`

## Where the labels live

The literal strings are rendered in two places:

1. `src/components/tool-card.tsx` (badge on each card)
2. `src/app/status/page.tsx` (status table row)

Both branch on `report.detectionStatus` and `report.versionStatus`, which are set in `src/config/storefront.config.ts`.

## Recommended approach

Keep the **types** the same (so the union still pairs a "good" and a "warn" state), but rewrite the **labels** in two component files. Example: switch to `Stable / Beta`.

```ts
// src/components/tool-card.tsx — change this block

{status.detectionStatus === "undetected" ? "Stable" : "Beta"}
// and
{status.versionStatus === "up-to-date" ? "Maintained" : "Updating"}
```

```tsx
// src/app/status/page.tsx — same two strings, same swap
```

## Better approach: centralize the vocabulary

If you'll change labels often, add a `statusVocab` block to `theme.config.ts`:

```ts
// theme.config.ts
statusVocab: {
  goodDetection: "Stable",
  badDetection: "Beta",
  goodVersion: "Maintained",
  badVersion: "Updating",
},
```

Then read it in both components instead of literal strings. This trades simplicity for centralization — only do it if you really want one source of truth across all status surfaces.

## Verify

Refresh `/status` and a `/products` page — both badges should show the new labels.

## Common mistakes

- **Changing the `StatusBadge` type but only one rendering path.** Search the codebase for `"Detected"` / `"Updating"` literals before declaring done.
- **Forgetting that `--success` / `--warning` / `--danger` colors carry meaning.** If you rename "Detected" to "Stable", make sure you didn't flip the color polarity (Stable should be `--success-soft`, not `--danger-soft`).
