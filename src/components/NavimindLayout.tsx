import { useState } from 'react';
import RouteMap from './RouteMap';
import KpiPanel from './KpiPanel';
import AiExplanationPanel from './AiExplanationPanel';
import VoyageInfoBar from './VoyageInfoBar';
import AiChatPanel from './AiChatPanel';
import type { Voyage, Route } from '../types';
import './NavimindLayout.css';

const DEMO_VOYAGE: Voyage = {
  id: 'Athens-Heraklion',
  origin: 'Athens / Piraeus (GR)',
  destination: 'Heraklion (GR)',
  objective: 'Minimise fuel cost',
  etaPlanned: '2025-12-05 08:00',
  etaBaseline: '2025-12-05 08:00',
  etaOptimal: '2025-12-05 08:00',
  fuelBaselineTons: 35,
  fuelOptimalTons: 32,
  maxWaveBaseline: 3.2,
  maxWaveOptimal: 2.4,
  co2Baseline: 110,
  co2Optimal: 101,
};

const BASELINE_ROUTE: Route = [
  [37.94, 23.62],
  [37.2,  24.2],
  [36.5,  25.0],
  [35.34, 25.13],
];

const OPTIMAL_ROUTE: Route = [
  [37.94, 23.62],
  [36.9,  24.1],
  [36.2,  24.8],
  [35.6,  25.1],
  [35.34, 25.13],
];

function NavimindLayout() {
  const [selectedVoyage] = useState<Voyage>(DEMO_VOYAGE);

  return (
    <div className="navimind-container">
      <header className="navimind-header">
        <div>
          <h1>NaviMind – Route Intelligence Demo</h1>
          <p className="subtitle">
            Semi-functional preview – static data, real UX flow.
          </p>
        </div>
        <div className="voyage-selector">
          <span className="label">Voyage:</span>
          <select value={selectedVoyage.id} onChange={() => {}}>
            <option value="Athens-Heraklion">Athens → Heraklion</option>
          </select>
        </div>
      </header>

      <main className="navimind-main">
        <div className="navimind-left">
          <RouteMap
            baselineRoute={BASELINE_ROUTE}
            optimalRoute={OPTIMAL_ROUTE}
          />
        </div>
        <div className="navimind-right">
          <KpiPanel voyage={selectedVoyage} />
          <AiExplanationPanel voyage={selectedVoyage} />
          <AiChatPanel voyage={selectedVoyage} />
        </div>
      </main>

      <footer className="navimind-footer">
        <VoyageInfoBar voyage={selectedVoyage} />
      </footer>
    </div>
  );
}

export default NavimindLayout;
