"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ToolProduct } from "@/config/storefront.config";

type ProductsCarouselProps = {
  tools: ToolProduct[];
};

export function ProductsCarousel({ tools }: ProductsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    skipSnaps: false,
    dragFree: false,
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="carousel">
      <div className="carousel__viewport" ref={emblaRef}>
        <div className="carousel__container">
          {tools.map((tool) => (
            <Link
              className="carousel__slide product-card-v2"
              href={`/products/${tool.slug}`}
              key={tool.slug}
            >
              <div className="product-card-v2__media">
                {tool.coverImage ? (
                  <img
                    className="product-card-v2__img"
                    src={tool.coverImage}
                    alt={tool.title}
                    loading="lazy"
                    draggable={false}
                  />
                ) : (
                  <div className="product-card-v2__fallback">
                    {tool.title.slice(0, 2).toUpperCase()}
                  </div>
                )}
                <div className="product-card-v2__overlay" />
                <span className="product-card-v2__title">{tool.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <button
        type="button"
        aria-label="Previous"
        className="carousel__nav carousel__nav--prev"
        onClick={() => emblaApi?.scrollPrev()}
        disabled={!canScrollPrev}
      >
        <ChevronLeft size={18} />
      </button>
      <button
        type="button"
        aria-label="Next"
        className="carousel__nav carousel__nav--next"
        onClick={() => emblaApi?.scrollNext()}
        disabled={!canScrollNext}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
