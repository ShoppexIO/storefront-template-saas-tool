# Prompt: Add a new top-level page

Copy this into your AI agent:

---

Add a new top-level page at `/<route>` to this storefront. The page should:

- Use the existing layout (floating pill nav at top, footer at bottom — these are already in `src/app/layout.tsx`, don't add them again).
- Match the visual language of the other pages (`section-heading` block, container width `var(--container)`, 4px-grid spacing).
- Be a server component unless the page needs state.

The page content is:

> `<paste the content here, or describe sections>`

Steps to follow:

1. Create `src/app/<route>/page.tsx`. Use `src/app/jobs/page.tsx` as the closest layout reference.
2. If the page needs new content arrays, add them to `src/config/storefront.config.ts` with a CUSTOMIZE comment.
3. Add the new route to the `NAV_LINKS` array in `src/components/floating-pill-nav.tsx` so it appears in the floating nav.
4. Run `bun run typecheck && bun run lint && bun run build` to verify nothing breaks.

After the edit, show me the file tree of new files and tell me what `NAV_LINKS` looks like now.

---
