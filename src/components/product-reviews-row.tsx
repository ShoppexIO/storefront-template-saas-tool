"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { CustomerReview } from "@/config/storefront.config";

type Props = {
  reviews: CustomerReview[];
};

export function ProductReviewsRow({ reviews }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    dragFree: true,
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
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
    <div className="reviews-row">
      <div className="reviews-row__viewport" ref={emblaRef}>
        <div className="reviews-row__container">
          {reviews.map((review) => (
            <article
              className="reviews-row__slide review-card"
              key={`${review.username}-${review.body.slice(0, 12)}`}
            >
              <span
                className="review-card__stars"
                aria-label={`${review.rating} out of 5 stars`}
              >
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </span>
              <p className="review-card__body">{review.body}</p>
              <div className="review-card__user">
                <span className="review-card__avatar">
                  {review.username.slice(0, 2).toUpperCase()}
                </span>
                <span className="review-card__user-meta">
                  <span className="review-card__username">{review.username}</span>
                  <span className="review-card__product">{review.productLabel}</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {reviews.length > 3 ? (
        <>
          <button
            type="button"
            aria-label="Previous"
            className="carousel__nav carousel__nav--prev"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canPrev}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            aria-label="Next"
            className="carousel__nav carousel__nav--next"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canNext}
          >
            <ChevronRight size={18} />
          </button>
        </>
      ) : null}
    </div>
  );
}
