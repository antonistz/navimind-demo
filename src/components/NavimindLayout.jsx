// src/components/NavimindLayout.jsx
import { useState } from 'react';
import RouteMap from './RouteMap';
import KpiPanel from './KpiPanel';
import AiExplanationPanel from './AiExplanationPanel';
import VoyageInfoBar from './VoyageInfoBar';
import './NavimindLayout.css';
import AiChatPanel from './AiChatPanel';

// Dummy hard-coded data for v0 demo
const DEMO_VOYAGE = {
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


// visually believable path that goes through the Adriatic → Ionian → Mediterranean → Gibraltar → Atlantic → Rotterdam.
// These are not geo-accurate, they’re just for visualization.
// Baseline: direct-ish Athens → mid-Aegean → north of Crete → Heraklion
const BASELINE_ROUTE = [
  [37.94, 23.62],  // Piraeus
  [37.2,  24.2],   // central Aegean
  [36.5,  25.0],   // north of Crete
  [35.34, 25.13],  // Heraklion
];

// Optimal: slightly more southern track (e.g. avoiding rougher seas)
const OPTIMAL_ROUTE = [
  [37.94, 23.62],  // Piraeus
  [36.9,  24.1],   // south of baseline
  [36.2,  24.8],   // closer to Crete earlier
  [35.6,  25.1],   // along north coast of Crete
  [35.34, 25.13],  // Heraklion
];



function NavimindLayout() {
  const [selectedVoyage] = useState(DEMO_VOYAGE);

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
          <select value={selectedVoyage.id} readOnly>
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
