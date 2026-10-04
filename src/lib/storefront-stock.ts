type VariantWithOptionalStock = {
  stock?: number | null;
};

type ProductLike = {
  type?: string | null;
  stock?: number | null;
  on_hold?: boolean | number | string | null;
  onHold?: boolean | number | string | null;
  is_on_hold?: boolean | number | string | null;
  isOnHold?: boolean | number | string | null;
  price_variants?: VariantWithOptionalStock[] | null;
  variants?: VariantWithOptionalStock[] | null;
};

function normalizeStockValue(value: unknown): number | null {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return null;
  }

  return Math.trunc(value);
}

function isTruthyFlag(value: unknown): boolean {
  if (value === true) return true;
  if (typeof value === "number" && Number.isFinite(value)) return value !== 0;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    return normalized === "true" || normalized === "1";
  }
  return false;
}

function isProductOnHold(product: ProductLike | null | undefined): boolean {
  if (!product) return false;
  return isTruthyFlag(product.on_hold)
    || isTruthyFlag(product.onHold)
    || isTruthyFlag(product.is_on_hold)
    || isTruthyFlag(product.isOnHold);
}

function collectVariantStocks(product: ProductLike): Array<number | null> {
  const priceVariantStocks = Array.isArray(product.price_variants)
    ? product.price_variants.map((variant) => normalizeStockValue(variant.stock))
    : [];
  if (priceVariantStocks.length > 0) {
    return priceVariantStocks;
  }

  const legacyVariantStocks = Array.isArray(product.variants)
    ? product.variants.map((variant) => normalizeStockValue(variant.stock))
    : [];

  return legacyVariantStocks;
}

export function resolveVariantStockValue(variant: VariantWithOptionalStock | null | undefined): number {
  const normalized = normalizeStockValue(variant?.stock);
  return normalized ?? -1;
}

export function resolveDisplayStock(product: ProductLike | null | undefined): number {
  if (!product) {
    return -1;
  }

  if (typeof product.type === "string" && product.type.toUpperCase() === "SERIALS") {
    return normalizeStockValue(product.stock) ?? -1;
  }

  const variantStocks = collectVariantStocks(product);
  if (variantStocks.length > 0) {
    if (variantStocks.some((stock) => stock === null || stock < 0)) {
      return -1;
    }

    return variantStocks
      .filter((stock): stock is number => stock !== null)
      .reduce((sum, stock) => sum + Math.max(stock, 0), 0);
  }

  return normalizeStockValue(product.stock) ?? -1;
}

export function isProductOutOfStock(product: ProductLike | null | undefined): boolean {
  if (isProductOnHold(product)) return true;
  return resolveDisplayStock(product) === 0;
}
