import type { Voyage, Route, ChatMessage, FuelHistoryPoint } from '../types';

export const mockVoyage: Voyage = {
  id: 'Athens-Heraklion',
  label: 'Athens → Heraklion',
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

export const mockSeedMessages: ChatMessage[] = [
  { role: 'user', time: '08:12 UTC', text: 'Why does the route deviate south?' },
  { role: 'ai',   time: '08:12 UTC', text: 'The straight-line track crosses rough seas.' },
];

export const mockFuelHistory: FuelHistoryPoint[] = [
  { label: 'Nov 25', baseline: 36.2, optimal: 33.1 },
  { label: 'Nov 28', baseline: 34.8, optimal: 32.0 },
  { label: 'Dec 05', baseline: 35.0, optimal: 32.0 },
];
