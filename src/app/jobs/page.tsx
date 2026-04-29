import { ArrowRight } from "lucide-react";
import { jobs } from "@/config/storefront.config";

export default function JobsPage() {
  return (
    <main className="container section--tight section--dotted">
      <div className="section-heading">
        <span className="section-heading__eyebrow">Open Positions</span>
        <h1>Work with us</h1>
        <p>
          Join the team and be part of something extraordinary. We're looking for passionate
          individuals in gaming and technology.
        </p>
      </div>

      <div className="job-list">
        {jobs.map((job) => (
          <article className="job-card" key={job.slug}>
            <div className="job-card__media">
              {job.coverImage ? (
                <img src={job.coverImage} alt={job.title} />
              ) : (
                <div className="job-card__media-fallback">
                  {job.title.slice(0, 1).toUpperCase()}
                </div>
              )}
            </div>
            <div className="job-card__body">
              <span className="job-card__category">{job.category}</span>
              <h2 className="job-card__title">{job.title}</h2>
              <p className="job-card__description">{job.description}</p>
              <a
                className="btn-ghost job-card__apply"
                href={job.applyUrl}
                target="_blank"
                rel="noreferrer noopener"
              >
                Apply
                <ArrowRight size={14} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
