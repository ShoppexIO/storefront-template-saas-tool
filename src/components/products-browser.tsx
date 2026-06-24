"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { ToolCard } from "@/components/tool-card";
import { tools } from "@/config/storefront.config";

type SortOrder = "name-asc" | "name-desc" | "price-asc" | "price-desc";

const SORT_OPTIONS: { value: SortOrder; label: string }[] = [
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
  { value: "price-asc", label: "Price (Low to High)" },
  { value: "price-desc", label: "Price (High to Low)" },
];

function lowestPrice(tool: (typeof tools)[number]): number {
  return Math.min(...tool.plans.map((plan) => plan.price));
}

export function ProductsBrowser() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOrder>("name-asc");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    const list = query
      ? tools.filter(
          (tool) =>
            tool.title.toLowerCase().includes(query) ||
            tool.category.toLowerCase().includes(query) ||
            tool.shortDescription.toLowerCase().includes(query),
        )
      : [...tools];

    list.sort((a, b) => {
      switch (sort) {
        case "name-desc":
          return b.title.localeCompare(a.title);
        case "price-asc":
          return lowestPrice(a) - lowestPrice(b);
        case "price-desc":
          return lowestPrice(b) - lowestPrice(a);
        default:
          return a.title.localeCompare(b.title);
      }
    });

    return list;
  }, [search, sort]);

  return (
    <main className="container section--tight">
      <div className="section-heading">
        <span className="section-heading__eyebrow">Our products</span>
        <h1>Pick your tool</h1>
        <p>Choose the perfect solution for your needs.</p>
      </div>

      <div className="products-toolbar">
        <div className="products-toolbar__search">
          <Search size={16} className="products-toolbar__search-icon" />
          <input
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search products"
          />
        </div>
        <select
          className="products-toolbar__sort"
          value={sort}
          onChange={(event) => setSort(event.target.value as SortOrder)}
          aria-label="Sort products"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div
          style={{
            padding: "var(--space-12)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            background: "var(--surface)",
            textAlign: "center",
            color: "var(--muted)",
          }}
        >
          No tools match "{search}".
        </div>
      ) : (
        <div className="tool-grid">
          {filtered.map((tool) => (
            <ToolCard tool={tool} key={tool.slug} />
          ))}
        </div>
      )}
    </main>
  );
}
