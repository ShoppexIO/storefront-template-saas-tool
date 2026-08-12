# Prompt: Replace the demo catalog with my real products

Copy this prompt into your AI agent:

---

Replace the demo catalog in `src/config/storefront.config.ts` with my real products. Here is the list:

| Product slug | Title | Short description | Category | Plans (id, label, days, price, popular?) |
|---|---|---|---|---|
| `<slug>` | `<title>` | `<one-line>` | `<category>` | `<list>` |
| ... | ... | ... | ... | ... |

For each product, also add:

- `requirements`: pick four icons from `cpu`, `os`, `platform`, `shield`, `drive` and label each (e.g. "Intel/AMD", "Windows 10/11", "Steam", "EAC Bypass")
- `videoId`: leave `null` unless I provide a YouTube video id
- `coverImage`: leave `null` unless I provide a path under `/public`
- `longDescription`: 2–3 sentences, written in the same voice as the existing entries

Then add matching entries to `statusReports` — assume `undetected` + `up-to-date` for new launches unless I say otherwise.

Don't change any component code. After the edit, list the file paths you touched and warn me if any product is missing a required field.

---
