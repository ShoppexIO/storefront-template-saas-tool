import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product-detail";
import { getTool, tools } from "@/config/storefront.config";

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getTool(slug);

  if (!tool) {
    notFound();
  }

  return (
    <main>
      <ProductDetail tool={tool} />
    </main>
  );
}
