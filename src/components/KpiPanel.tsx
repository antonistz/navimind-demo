import type { Voyage } from '../types';
import './KpiPanel.css';

export function formatDelta(current: number, baseline: number, unit: string): string {
  const diff = current - baseline;
  const pct = ((diff / baseline) * 100).toFixed(1);
  const sign = diff <= 0 ? '' : '+';
  const directionWord = diff <= 0 ? 'reduction' : 'increase';
  return `${sign}${diff.toFixed(1)} ${unit} (${pct}% ${directionWord})`;
}

interface KpiPanelProps {
  voyage: Voyage;
}

function KpiPanel({ voyage }: KpiPanelProps) {
  const {
    fuelBaselineTons,
    fuelOptimalTons,
    co2Baseline,
    co2Optimal,
    maxWaveBaseline,
    maxWaveOptimal,
    etaBaseline,
    etaOptimal,
  } = voyage;

  return (
    <section className="kpi-card">
      <h2>Route Comparison</h2>
      <p className="kpi-subtitle">
        AI-optimized route vs baseline great-circle.
      </p>

      <div className="kpi-grid">
        <div className="kpi-item">
          <div className="kpi-label">ETA</div>
          <div className="kpi-main">{etaOptimal}</div>
          <div className="kpi-delta">
            vs baseline: {etaBaseline} (same arrival window)
          </div>
        </div>

        <div className="kpi-item">
          <div className="kpi-label">Fuel consumption</div>
          <div className="kpi-main">{fuelOptimalTons.toFixed(1)} t</div>
          <div className="kpi-delta">
            {formatDelta(fuelOptimalTons, fuelBaselineTons, 't')}
          </div>
        </div>

        <div className="kpi-item">
          <div className="kpi-label">CO₂ emissions</div>
          <div className="kpi-main">{co2Optimal.toFixed(0)} t</div>
          <div className="kpi-delta">
            {formatDelta(co2Optimal, co2Baseline, 't')}
          </div>
        </div>

        <div className="kpi-item">
          <div className="kpi-label">Max wave height on route</div>
          <div className="kpi-main">{maxWaveOptimal.toFixed(1)} m</div>
          <div className="kpi-delta">
            {formatDelta(maxWaveOptimal, maxWaveBaseline, ' m')}
          </div>
        </div>
      </div>
    </section>
  );
}

export default KpiPanel;
