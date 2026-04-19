import type { Voyage } from '../types';
import './VoyageInfoBar.css';

interface VoyageInfoBarProps {
  voyage: Voyage | null;
  isLoading?: boolean;
}

function VoyageInfoBar({ voyage, isLoading = false }: VoyageInfoBarProps) {
  if (isLoading || !voyage) {
    return (
      <div className="voyage-bar">
        <div><span className="label">Route: </span><span className="bar-loading">—</span></div>
        <div><span className="label">Objective: </span><span className="bar-loading">—</span></div>
        <div><span className="label">Status: </span><span className="bar-loading">Optimizing…</span></div>
      </div>
    );
  }

  const { origin, destination, objective } = voyage;

  return (
    <div className="voyage-bar">
      <div><span className="label">Route: </span><span>{origin} → {destination}</span></div>
      <div><span className="label">Objective: </span><span>{objective}</span></div>
      <div><span className="label">Demo mode: </span><span>Mock API · static optimization data</span></div>
    </div>
  );
}

export default VoyageInfoBar;
