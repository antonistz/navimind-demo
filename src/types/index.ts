export interface Voyage {
  id: string;
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
