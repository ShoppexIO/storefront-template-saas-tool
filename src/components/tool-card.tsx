import Link from "next/link";
import { getStatusFor, type ToolProduct } from "@/config/storefront.config";

type ToolCardProps = {
  tool: ToolProduct;
  showStatus?: boolean;
};

export function ToolCard({ tool, showStatus = true }: ToolCardProps) {
  const status = getStatusFor(tool.slug);

  return (
    <Link className="tool-card" href={`/products/${tool.slug}`}>
      <div className="tool-card__media">
        {tool.coverImage ? (
          <img src={tool.coverImage} alt={tool.title} />
        ) : (
          <div className="tool-card__media-fallback">{tool.title.slice(0, 2).toUpperCase()}</div>
        )}
        <div className="tool-card__overlay" />
        <h3 className="tool-card__title">{tool.title}</h3>
      </div>
      <div className="tool-card__body">
        <p className="tool-card__description">{tool.shortDescription}</p>
        {showStatus && status ? (
          <div className="tool-card__badges">
            <span
              className={
                status.detectionStatus === "undetected"
                  ? "status-badge status-badge--good"
                  : "status-badge status-badge--bad"
              }
            >
              {status.detectionStatus === "undetected" ? "Undetected" : "Detected"}
            </span>
            <span
              className={
                status.versionStatus === "up-to-date"
                  ? "status-badge status-badge--good"
                  : "status-badge status-badge--warn"
              }
            >
              {status.versionStatus === "up-to-date" ? "Up to Date" : "Updating"}
            </span>
          </div>
        ) : null}
      </div>
    </Link>
  );
}
