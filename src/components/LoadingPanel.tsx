import './LoadingPanel.css';

interface LoadingPanelProps {
  rows?: number;
}

export function LoadingPanel({ rows = 4 }: LoadingPanelProps) {
  return (
    <div className="loading-panel">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="skeleton-row" style={{ width: `${85 - i * 8}%` }} />
      ))}
    </div>
  );
}

export function LoadingCard() {
  return (
    <div className="loading-card">
      <div className="skeleton-row" style={{ width: '45%', height: '1rem' }} />
      <div className="skeleton-grid">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="skeleton-kpi-block" />
        ))}
      </div>
    </div>
  );
}
