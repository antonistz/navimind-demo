export interface Voyage {
  id: string;
  label: string;
  origin: string;
  destination: string;
  objective: string;
  etaPlanned: string;
  etaBaseline: string;
  etaOptimal: string;
  fuelBaselineTons: number;
  fuelOptimalTons: number;
  maxWaveBaseline: number;
  maxWaveOptimal: number;
  co2Baseline: number;
  co2Optimal: number;
}

export type LatLng = [number, number];
export type Route = LatLng[];

export interface DangerZone {
  center: LatLng;
  radiusMeters: number;
  severity: 'moderate' | 'severe';
  label: string;
}

export interface VoyageListItem {
  id: string;
  label: string;
}

export interface FuelHistoryPoint {
  label: string;
  baseline: number;
  optimal: number;
}

export interface ChatMessage {
  role: 'user' | 'ai';
  time: string;
  text: string;
}

export interface OptimizeResult {
  voyage: Voyage;
  baselineRoute: Route;
  optimalRoute: Route;
  dangerZones: DangerZone[];
  seedMessages: ChatMessage[];
  fuelHistory: FuelHistoryPoint[];
}
