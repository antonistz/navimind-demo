import { AreaChart, Area, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { Voyage, FuelHistoryPoint } from '../types';
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
  fuelHistory: FuelHistoryPoint[];
}

function KpiPanel({ voyage, fuelHistory }: KpiPanelProps) {
  const {
    fuelBaselineTons, fuelOptimalTons,
    co2Baseline, co2Optimal,
    maxWaveBaseline, maxWaveOptimal,
    etaBaseline, etaOptimal,
  } = voyage;

  return (
    <section className="kpi-card">
      <h2>Route Comparison</h2>
      <p className="kpi-subtitle">AI-optimized route vs baseline great-circle.</p>

      <div className="kpi-grid">
        <div className="kpi-item">
          <div className="kpi-label">ETA</div>
          <div className="kpi-main">{etaOptimal}</div>
          <div className="kpi-delta">vs baseline: {etaBaseline}</div>
        </div>

        <div className="kpi-item">
          <div className="kpi-label">Fuel consumption</div>
          <div className="kpi-main">{fuelOptimalTons.toFixed(1)} t</div>
          <div className="kpi-delta">{formatDelta(fuelOptimalTons, fuelBaselineTons, 't')}</div>
        </div>

        <div className="kpi-item">
          <div className="kpi-label">CO₂ emissions</div>
          <div className="kpi-main">{co2Optimal.toFixed(0)} t</div>
          <div className="kpi-delta">{formatDelta(co2Optimal, co2Baseline, 't')}</div>
        </div>

        <div className="kpi-item">
          <div className="kpi-label">Max wave height</div>
          <div className="kpi-main">{maxWaveOptimal.toFixed(1)} m</div>
          <div className="kpi-delta">{formatDelta(maxWaveOptimal, maxWaveBaseline, ' m')}</div>
        </div>
      </div>

      <div className="kpi-chart-section">
        <p className="kpi-chart-title">Fuel consumption — last 5 voyages (t)</p>
        <ResponsiveContainer width="100%" height={110}>
          <AreaChart data={fuelHistory} margin={{ top: 4, right: 8, left: -24, bottom: 0 }}>
            <defs>
              <linearGradient id="baselineGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#6b7280" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6b7280" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="optimalGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#22d3ee" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="label" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: '#0f172a', border: '1px solid #1f2937', borderRadius: 6, fontSize: 11 }}
              labelStyle={{ color: '#9ca3af' }}
              itemStyle={{ color: '#e5e7eb' }}
            />
            <Legend wrapperStyle={{ fontSize: 10, color: '#9ca3af', paddingTop: 2 }} />
            <Area type="monotone" dataKey="baseline" name="Baseline" stroke="#6b7280" strokeWidth={1.5} fill="url(#baselineGrad)" dot={false} />
            <Area type="monotone" dataKey="optimal"  name="NaviMind"  stroke="#22d3ee" strokeWidth={2}   fill="url(#optimalGrad)"  dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default KpiPanel;
