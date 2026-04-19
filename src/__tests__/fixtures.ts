import type { Voyage, Route } from '../types';

export const mockVoyage: Voyage = {
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

export const mockBaselineRoute: Route = [
  [37.94, 23.62],
  [37.2, 24.2],
  [35.34, 25.13],
];

export const mockOptimalRoute: Route = [
  [37.94, 23.62],
  [36.9, 24.1],
  [35.34, 25.13],
];
