import { reviews } from "@/config/storefront.config";

export function ReviewsWall() {
  return (
    <section className="container section section--dotted">
      <div className="section-heading section-heading--small">
        <span className="section-heading__eyebrow">Reviews</span>
      </div>
      <div className="reviews-grid">
        {reviews.map((review) => (
          <article className="review" key={`${review.username}-${review.productLabel}`}>
            <div className="review__user">
              <span className="review__avatar">
                {review.username.slice(0, 1).toUpperCase()}
              </span>
              <span className="review__user-meta">
                <span className="review__username">{review.username}</span>
                <span className="review__product">{review.productLabel}</span>
              </span>
            </div>
            <span className="review__stars" aria-label={`${review.rating} out of 5 stars`}>
              {"★".repeat(review.rating)}
              {"☆".repeat(5 - review.rating)}
            </span>
            <p className="review__body">{review.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
