import { Server } from "lucide-react";
import { getTool, serverStatus, statusReports } from "@/config/storefront.config";

export default function StatusPage() {
  return (
    <main className="container section--tight section--dotted">
      <div className="section-heading">
        <span className="section-heading__eyebrow">Status</span>
        <h1>Product Status</h1>
        <p>Real-time status of our products and services.</p>
      </div>

      <div className="status-server">
        <div className="status-server__meta">
          <span className="status-server__icon">
            <Server size={18} />
          </span>
          <div>
            <div className="status-server__title-row">
              <span className="status-server__title">Server Status</span>
              <span className="status-badge status-badge--good">{serverStatus.label}</span>
            </div>
            <span className="status-server__detail">Response time: {serverStatus.responseMs}ms</span>
          </div>
        </div>
        <div className="status-bars" aria-hidden="true">
          {Array.from({ length: serverStatus.uptimeBars }).map((_, index) => (
            <span
              key={index}
              className="status-bars__bar"
              style={{ height: `${44 + ((index * 13) % 56)}%` }}
            />
          ))}
        </div>
      </div>

      <div className="status-list">
        {statusReports.map((report) => {
          const tool = getTool(report.productSlug);
          if (!tool) return null;

          return (
            <article className="status-row" key={report.productSlug}>
              <div className="status-row__cover">
                {tool.coverImage ? (
                  <img src={tool.coverImage} alt={tool.title} />
                ) : (
                  <span>{tool.title.slice(0, 1).toUpperCase()}</span>
                )}
              </div>
              <div className="status-row__main">
                <div className="status-row__title-row">
                  <span className="status-row__title">{tool.title}</span>
                  <span
                    className={
                      report.detectionStatus === "undetected"
                        ? "status-badge status-badge--good"
                        : "status-badge status-badge--bad"
                    }
                  >
                    {report.detectionStatus === "undetected" ? "Undetected" : "Detected"}
                  </span>
                  <span
                    className={
                      report.versionStatus === "up-to-date"
                        ? "status-badge status-badge--good"
                        : "status-badge status-badge--warn"
                    }
                  >
                    {report.versionStatus === "up-to-date" ? "Up to Date" : "Updating"}
                  </span>
                </div>
                <span className="status-row__detail">{report.detectionLabel} · {report.detail}</span>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
