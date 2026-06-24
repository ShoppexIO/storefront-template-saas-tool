import type { Product, Shop } from "@shoppexio/storefront";
import { getShoppexClient } from "@/lib/shoppex-client";
import {
  getSampleProduct,
  isSampleStorefrontEnabled,
  sampleProducts,
  sampleShop,
} from "@/lib/sample-storefront";

export type StorefrontDataResult =
  | { success: true; shop: Shop | null; products: Product[]; sample: boolean }
  | { success: false; message: string; sample: boolean };

export type ProductDataResult =
  | { success: true; product: Product; products: Product[]; shop: Shop | null; sample: boolean }
  | { success: false; message: string; products: Product[]; shop: Shop | null; sample: boolean };

export async function loadStorefrontData(): Promise<StorefrontDataResult> {
  if (isSampleStorefrontEnabled()) {
    return {
      success: true,
      shop: sampleShop,
      products: sampleProducts,
      sample: true,
    };
  }

  const result = await getShoppexClient().getStorefront();
  if (!result.success) {
    return {
      success: false,
      message: result.message ?? "Storefront could not be loaded.",
      sample: false,
    };
  }

  return {
    success: true,
    shop: result.data?.shop ?? null,
    products: result.data?.products ?? [],
    sample: false,
  };
}

export async function loadProductsData(): Promise<{ success: boolean; products: Product[]; shop: Shop | null; message?: string; sample: boolean }> {
  if (isSampleStorefrontEnabled()) {
    return {
      success: true,
      products: sampleProducts,
      shop: sampleShop,
      sample: true,
    };
  }

  const result = await getShoppexClient().getStorefront();
  return {
    success: result.success,
    products: result.success ? result.data?.products ?? [] : [],
    shop: result.success ? result.data?.shop ?? null : null,
    message: result.message,
    sample: false,
  };
}

export async function loadProductData(slug: string): Promise<ProductDataResult> {
  if (isSampleStorefrontEnabled()) {
    const product = getSampleProduct(slug);
    if (!product) {
      return {
        success: false,
        message: "Product could not be loaded.",
        products: sampleProducts,
        shop: sampleShop,
        sample: true,
      };
    }

    return {
      success: true,
      product,
      products: sampleProducts,
      shop: sampleShop,
      sample: true,
    };
  }

  const client = getShoppexClient();
  const [productResult, storefrontResult] = await Promise.all([
    client.getProduct(slug),
    client.getStorefront(),
  ]);

  const shop = storefrontResult.success ? storefrontResult.data?.shop ?? null : null;
  const products = storefrontResult.success ? storefrontResult.data?.products ?? [] : [];

  if (!productResult.success || !productResult.data) {
    return {
      success: false,
      message: productResult.message ?? "Product could not be loaded.",
      products,
      shop,
      sample: false,
    };
  }

  return {
    success: true,
    product: productResult.data,
    products,
    shop,
    sample: false,
  };
}
