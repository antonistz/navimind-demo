import type { Voyage } from '../types';
import './VoyageInfoBar.css';

interface VoyageInfoBarProps {
  voyage: Voyage;
}

function VoyageInfoBar({ voyage }: VoyageInfoBarProps) {
  const { origin, destination, objective } = voyage;

  return (
    <div className="voyage-bar">
      <div>
        <span className="label">Route: </span>
        <span>{origin} → {destination}</span>
      </div>
      <div>
        <span className="label">Objective: </span>
        <span>{objective}</span>
      </div>
      <div>
        <span className="label">Demo mode: </span>
        <span>Static data, no live optimization</span>
      </div>
    </div>
  );
}

export default VoyageInfoBar;
