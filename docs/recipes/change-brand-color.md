# Change the brand color

The brand accent appears on:

- The hero CTA, the "Most Popular" plan badge, the "Apply" button on checkout
- The pill navigation's active dot
- All `--accent`-colored status badges (`Undetected`, `Up to Date`)
- The hero pill tag
- Headline gradients, plan card highlights

Changing it touches **one file**.

## Steps

Open `theme.config.ts` (repo root). Change `colors.accent`, `colors.accentStrong`, `colors.accentSoft`, and `colors.accentForeground`:

```ts
// theme.config.ts
colors: {
  // ...existing surface tokens...

  // Before — Electric cyan
  accent: "#00d9ff",
  accentStrong: "#00b3d4",
  accentSoft: "rgba(0, 217, 255, 0.12)",
  accentForeground: "#001218",

  // After — example: Acid Green
  accent: "#a3ff00",
  accentStrong: "#7ed100",
  accentSoft: "rgba(163, 255, 0, 0.12)",
  accentForeground: "#0a1a00",
},
```

Pick the four values together:

| Token | Purpose | How to pick |
|---|---|---|
| `accent` | Solid color shown on buttons, badges, accents | Your brand color, vivid |
| `accentStrong` | Hover/pressed state on `accent` | 15–20% darker than `accent` |
| `accentSoft` | Subtle fills (badges, icon backgrounds) | `rgba(<accent_rgb>, 0.12)` |
| `accentForeground` | Text color on top of solid `accent` | Very dark or very light, contrast ≥ 7:1 against `accent` |

## Verify

Restart `bun run dev`, hard-refresh the browser. Check:

- Home hero `Start using it` button — should match new color
- Plan card "Most Popular" badge on detail page
- Active nav indicator (dot under current route)
- Status badges on `/status`

If any element is the old color, search the codebase for the old hex value — that's a hardcoded violation that needs fixing.

## Common mistakes

- **Forgetting `accentSoft`.** It controls subtle backgrounds; if untouched, a green accent with a cyan soft looks bad.
- **Picking too dark a color.** This template assumes the accent is *brighter* than the dark background. If you want a dark accent, swap to a light theme — that's a bigger refactor.
- **Quoting the rgba wrong.** Use `rgba(R, G, B, 0.12)` with three integers, not hex.
