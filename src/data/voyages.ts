import type {
  Voyage, Route, DangerZone, ChatMessage, FuelHistoryPoint, OptimizeResult,
} from '../types';

interface ChatResponses {
  fuel: string;
  eta: string;
  weather: string;
  route: string;
  co2: string;
  safety: string;
  default: string;
}

interface VoyageDataset extends OptimizeResult {
  chatResponses: ChatResponses;
}

// ─── Voyage 1: Athens → Heraklion ───────────────────────────────────────────

const athensHeraklionVoyage: Voyage = {
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

const athensBaselineRoute: Route = [
  [37.94, 23.62],
  [37.2,  24.2],
  [36.5,  25.0],
  [35.34, 25.13],
];

const athensOptimalRoute: Route = [
  [37.94, 23.62],
  [36.9,  24.1],
  [36.2,  24.8],
  [35.6,  25.1],
  [35.34, 25.13],
];

const athensDangerZones: DangerZone[] = [
  { center: [36.8, 24.4], radiusMeters: 45000, severity: 'moderate', label: 'Seas 3.0–3.5 m (Meltemi front)' },
  { center: [36.3, 25.1], radiusMeters: 28000, severity: 'severe',   label: 'Seas 3.5–4.2 m (peak swell)' },
];

const athensSeedMessages: ChatMessage[] = [
  { role: 'user', time: '08:12 UTC', text: 'Why does the optimized route deviate south instead of following the straight line to Heraklion?' },
  { role: 'ai',   time: '08:12 UTC', text: 'The straight-line track crosses an area with forecast head seas of 3.2–3.6 m during your transit window. By shifting ~25 NM south, the vessel sails in 1.8–2.4 m following-to-beam seas, which reduces added resistance and slamming risk.' },
  { role: 'user', time: '08:13 UTC', text: 'How does that affect fuel and ETA?' },
  { role: 'ai',   time: '08:13 UTC', text: 'For this voyage, the southern corridor reduces fuel consumption by ~8.6% versus the baseline route, with no impact on requested ETA (arrival remains within the 08:00 window). If you tighten the ETA tolerance to ±30 minutes, NaviMind will slightly adjust speed but keep the same weather corridor.' },
];

const athensHistory: FuelHistoryPoint[] = [
  { label: 'Nov 25', baseline: 36.2, optimal: 33.1 },
  { label: 'Nov 28', baseline: 34.8, optimal: 32.0 },
  { label: 'Dec 01', baseline: 35.5, optimal: 32.4 },
  { label: 'Dec 03', baseline: 33.9, optimal: 31.2 },
  { label: 'Dec 05', baseline: 35.0, optimal: 32.0 },
];

const athensChat: ChatResponses = {
  route:   'The straight-line track crosses the Meltemi wind corridor where forecast wave heights reach 3.2–3.6 m. The AI shifted the track ~25 NM south into calmer following seas (1.8–2.4 m), reducing hull resistance significantly.',
  fuel:    'Fuel saving on this routing is ~8.6%, roughly 3 tons HFO. In a rolling 12-month programme across 50 similar voyages that compounds to roughly 150 t and ~€90 000 in bunker savings.',
  weather: 'A Meltemi system is active over the central Aegean. The baseline track heads directly into 3.2–3.5 m head seas. The optimal corridor stays south of the Cyclades in 2.0–2.4 m beam-to-following seas.',
  co2:     'CO₂ is reduced by ~8.2%, from 110 t to 101 t on this voyage. Under EU ETS Phase 2, that equates to ~€ 450 in avoided carbon allowance cost at current prices (~€ 50/t CO₂).',
  eta:     'ETA is unchanged at 08:00. The slightly longer southern arc is offset by higher achievable service speed in the calmer sea state — the vessel doesn\'t need to slow for slamming or green water.',
  safety:  'Max wave exposure drops from 3.2 m (baseline) to 2.4 m (optimized). This keeps the vessel safely below the 3.0 m master\'s discretion threshold and eliminates slamming risk on this hull form.',
  default: 'NaviMind found a southern corridor that reduces Meltemi exposure by 0.8 m peak wave height, saving ~8.6% fuel with no ETA penalty. Ask me about the route, fuel, weather, CO₂, or safety impact.',
};

// ─── Voyage 2: Piraeus → Thessaloniki ────────────────────────────────────────

const piraeusTHESSVoyage: Voyage = {
  id: 'Piraeus-Thessaloniki',
  label: 'Piraeus → Thessaloniki',
  origin: 'Piraeus (GR)',
  destination: 'Thessaloniki (GR)',
  objective: 'Minimise ETA',
  etaPlanned: '2025-12-06 14:00',
  etaBaseline: '2025-12-06 15:20',
  etaOptimal: '2025-12-06 14:00',
  fuelBaselineTons: 18,
  fuelOptimalTons: 16.2,
  maxWaveBaseline: 2.8,
  maxWaveOptimal: 1.9,
  co2Baseline: 57,
  co2Optimal: 51,
};

const piraeusTHESSBaseline: Route = [
  [37.94, 23.62],
  [38.6,  23.5],
  [39.4,  23.1],
  [40.0,  23.0],
  [40.64, 22.94],
];

const piraeusTHESSOptimal: Route = [
  [37.94, 23.62],
  [38.3,  23.9],
  [39.0,  23.6],
  [39.8,  23.2],
  [40.4,  23.1],
  [40.64, 22.94],
];

const piraeusTHESSDangerZones: DangerZone[] = [
  { center: [39.1, 23.3], radiusMeters: 55000, severity: 'moderate', label: 'Seas 2.5–3.0 m (north Aegean chop)' },
];

const piraeusTHESSSeedMessages: ChatMessage[] = [
  { role: 'user', time: '09:05 UTC', text: 'The objective here is to minimise ETA — how does the route help?' },
  { role: 'ai',   time: '09:05 UTC', text: 'The direct north-track enters a choppy 2.8 m cross-sea corridor that forces a speed reduction to ~12 kn to avoid slamming. The eastern arc stays in calmer water, allowing full service speed (15 kn), recovering 1 hr 20 min on arrival.' },
  { role: 'user', time: '09:06 UTC', text: 'Does the eastern detour add significant distance?' },
  { role: 'ai',   time: '09:06 UTC', text: 'The eastern arc adds ~18 NM (about 7% more distance), but the speed differential more than compensates. Net ETA gain: 80 minutes ahead of the baseline. Fuel is also lower — calmer water means less resistance even at higher speed.' },
];

const piThessHistory: FuelHistoryPoint[] = [
  { label: 'Nov 27', baseline: 18.8, optimal: 16.9 },
  { label: 'Nov 30', baseline: 17.5, optimal: 15.8 },
  { label: 'Dec 02', baseline: 18.2, optimal: 16.4 },
  { label: 'Dec 04', baseline: 17.8, optimal: 16.0 },
  { label: 'Dec 06', baseline: 18.0, optimal: 16.2 },
];

const piThessChat: ChatResponses = {
  route:   'The direct track bisects a choppy 2.8 m north-Aegean corridor that forces a speed reduction. The eastern arc adds 18 NM but allows full 15-knot service speed in calmer water, saving 80 min on ETA.',
  fuel:    'Even with the extra 18 NM, fuel drops from 18 t to 16.2 t (10% reduction). Calm water resistance is proportionally much lower than the extra distance cost — a classic weather routing trade-off.',
  weather: 'A moderate low off the north Aegean is generating 2.5–3.0 m cross-seas on the direct track. The eastern corridor stays east of Euboea in 1.5–2.0 m seas.',
  co2:     'CO₂ drops from 57 t to 51 t on this voyage (~10.5% reduction). The ETA objective is met 80 minutes early, demonstrating that routing for speed and routing for efficiency are compatible in the right conditions.',
  eta:     'Baseline ETA was 15:20 (80 min late). The optimized route arrives at 14:00 as scheduled. Speed through calmer water offsets the longer arc entirely.',
  safety:  'The direct route\'s 2.8 m cross-seas create significant roll motion on RoRo and ferry hulls. The eastern track stays below 2.0 m, within passenger comfort limits and below the master\'s advisory threshold.',
  default: 'NaviMind re-routed east of Euboea to avoid north-Aegean chop, saving 80 min ETA and 10% fuel despite a longer arc. Ask me about the route, fuel, weather, ETA, CO₂, or safety.',
};

// ─── Voyage 3: Rotterdam → Hamburg ───────────────────────────────────────────

const rotterdamHamburgVoyage: Voyage = {
  id: 'Rotterdam-Hamburg',
  label: 'Rotterdam → Hamburg',
  origin: 'Rotterdam (NL)',
  destination: 'Hamburg (DE)',
  objective: 'Minimise fuel cost',
  etaPlanned: '2025-12-08 06:00',
  etaBaseline: '2025-12-08 06:00',
  etaOptimal: '2025-12-08 06:00',
  fuelBaselineTons: 12,
  fuelOptimalTons: 10.8,
  maxWaveBaseline: 3.8,
  maxWaveOptimal: 2.7,
  co2Baseline: 38,
  co2Optimal: 34,
};

const rotterdamBaselineRoute: Route = [
  [51.90,  4.47],
  [52.8,   5.8],
  [53.3,   7.0],
  [53.55, 10.00],
];

const rotterdamOptimalRoute: Route = [
  [51.90,  4.47],
  [52.2,   5.2],
  [52.6,   6.5],
  [53.0,   8.2],
  [53.3,   9.3],
  [53.55, 10.00],
];

const rotterdamDangerZones: DangerZone[] = [
  { center: [53.1, 6.8], radiusMeters: 65000, severity: 'severe',   label: 'Seas 3.5–4.2 m (North Sea swell)' },
  { center: [52.7, 5.6], radiusMeters: 40000, severity: 'moderate', label: 'Seas 2.8–3.2 m (approaching front)' },
];

const rotterdamSeedMessages: ChatMessage[] = [
  { role: 'user', time: '21:30 UTC', text: 'North Sea looks rough. How is the routing handling the swell forecast?' },
  { role: 'ai',   time: '21:30 UTC', text: 'A 3.5–4.2 m swell band is crossing the German Bight corridor tonight. The AI steers the vessel on a more southerly coastal track to stay inshore of the swell, keeping seas below 2.7 m — within normal operating envelope.' },
  { role: 'user', time: '21:31 UTC', text: 'Does the inshore track slow us down due to traffic separation?' },
  { role: 'ai',   time: '21:31 UTC', text: 'The track is fully compliant with the German Bight TSS routing. The extra ~22 NM of coastal deviation costs ~1.4 hours at 15 kn but this is offset by not reducing speed in the swell — net zero ETA impact. Fuel saving is 10%.' },
];

const rotterdamHistory: FuelHistoryPoint[] = [
  { label: 'Dec 01', baseline: 12.5, optimal: 11.2 },
  { label: 'Dec 03', baseline: 11.8, optimal: 10.6 },
  { label: 'Dec 05', baseline: 13.1, optimal: 11.8 },
  { label: 'Dec 07', baseline: 12.0, optimal: 10.8 },
  { label: 'Dec 08', baseline: 12.0, optimal: 10.8 },
];

const rotterdamChat: ChatResponses = {
  route:   'A 3.5–4.2 m North Sea swell is crossing the direct track in the German Bight. The AI routes the vessel 30 NM south along the German coast, staying below 2.7 m seas while remaining fully TSS-compliant.',
  fuel:    'Fuel drops from 12 t to 10.8 t (10% saving, ~1.2 t HFO). In North Sea feeder operations running 3 voyages/week, that translates to ~180 t/year and ~€108 000 in bunker cost reduction.',
  weather: 'A vigorous Atlantic low is driving 3.5–4.0 m swell into the German Bight. The southern coastal track avoids the peak swell band — seas stay under 2.7 m throughout the optimized route.',
  co2:     'CO₂ reduced from 38 t to 34 t (~10.5%). Under EU ETS Phase 2, this saves approximately €200 in carbon allowances at current prices. For a feeder vessel on this run weekly, that\'s ~€10 000/year.',
  eta:     'ETA maintained at 06:00 despite the longer coastal arc. Speed reduction avoidance (from not sailing into 4 m head seas) fully compensates the extra distance. Harbour pilot slot preserved.',
  safety:  'Peak exposure drops from 3.8 m to 2.7 m. This keeps the vessel well clear of the 3.5 m threshold where cargo shifting and structural fatigue become concerns on this container feeder class.',
  default: 'NaviMind routed south of the German Bight swell band, saving 10% fuel with no ETA penalty. Ask me about the route, fuel, weather, ETA, CO₂, or safety.',
};

// ─── Voyage 4: Lisbon → New York ─────────────────────────────────────────────

const lisbonNYVoyage: Voyage = {
  id: 'Lisbon-NewYork',
  label: 'Lisbon → New York',
  origin: 'Lisbon (PT)',
  destination: 'New York (US)',
  objective: 'Minimise fuel cost + emissions',
  etaPlanned: '2025-12-16 08:00',
  etaBaseline: '2025-12-16 08:00',
  etaOptimal: '2025-12-16 08:00',
  fuelBaselineTons: 280,
  fuelOptimalTons: 248,
  maxWaveBaseline: 5.2,
  maxWaveOptimal: 3.1,
  co2Baseline: 882,
  co2Optimal: 781,
};

const lisbonBaselineRoute: Route = [
  [38.72, -9.14],
  [40.0, -20.0],
  [41.0, -35.0],
  [42.0, -50.0],
  [41.5, -63.0],
  [40.71, -74.01],
];

const lisbonOptimalRoute: Route = [
  [38.72, -9.14],
  [36.5, -17.0],
  [35.0, -32.0],
  [36.0, -48.0],
  [38.5, -62.0],
  [40.71, -74.01],
];

const lisbonDangerZones: DangerZone[] = [
  { center: [41.5, -35.0], radiusMeters: 350000, severity: 'severe',   label: 'N. Atlantic low — seas 5.0–6.5 m' },
  { center: [40.5, -20.0], radiusMeters: 180000, severity: 'moderate', label: 'Approaching front — seas 3.5–4.5 m' },
];

const lisbonSeedMessages: ChatMessage[] = [
  { role: 'user', time: '06:00 UTC', text: 'This is a transatlantic run — how much difference can routing really make?' },
  { role: 'ai',   time: '06:00 UTC', text: 'Substantially. A deep North Atlantic low is sitting on the great-circle track with 5.0–6.5 m seas. The southern arc adds only ~180 NM but avoids 3–4 days of head-sea steaming that would otherwise require a 2-knot speed reduction. Fuel saving: 32 t (~11.4%).' },
  { role: 'user', time: '06:01 UTC', text: 'Is the southern route longer in time?' },
  { role: 'ai',   time: '06:01 UTC', text: 'No — the low-pressure system forces speed reductions on the great-circle route that more than compensate for the extra distance. The southern arc arrives within the same ETA window. Think of it as the pilot taking a longer taxiway to avoid a crowded runway.' },
];

const lisbonHistory: FuelHistoryPoint[] = [
  { label: 'Nov 05', baseline: 292, optimal: 259 },
  { label: 'Nov 16', baseline: 275, optimal: 244 },
  { label: 'Nov 27', baseline: 288, optimal: 251 },
  { label: 'Dec 07', baseline: 283, optimal: 252 },
  { label: 'Dec 16', baseline: 280, optimal: 248 },
];

const lisbonChat: ChatResponses = {
  route:   'A deep North Atlantic low is anchored on the great-circle track with 5.0–6.5 m seas. The southern arc stays below 3.1 m by routing through the Azores High ridge, adding ~180 NM but avoiding 3 days of slow steaming.',
  fuel:    'Fuel saving is 32 t (~11.4%), worth approximately €19 200 at $600/t HFO. On 20 annual westbound crossings, NaviMind routing typically saves 500–650 t of HFO per vessel — over $300 000/year.',
  weather: 'A 985 hPa low is generating 5.0–6.5 m seas along the great-circle. The southern route passes through the Azores High corridor where seas are 2.5–3.1 m and following winds provide a slight boost.',
  co2:     'CO₂ reduced by 101 t on this voyage — from 882 t to 781 t (11.4%). Under EU ETS Phase 2 (now covering 50% of international voyages), this avoids ~€2 500 in carbon allowances at €50/t CO₂.',
  eta:     'ETA maintained despite 180 NM extra distance. The great-circle route would require slowing to 12 kn for 3 days in head seas; the southern arc sails 14.5 kn in following seas throughout. Net time difference: < 2 hours.',
  safety:  'Max exposure drops from 5.2 m to 3.1 m — a critical difference for crew safety and cargo security. Sustained 5+ m head seas cause significant structural fatigue cycles and create green-water events on most large container ships.',
  default: 'NaviMind found a southern Azores corridor that avoids a 5.2 m North Atlantic storm, saving 32 t of fuel (11.4%) with no ETA penalty. Ask me about the route, fuel, weather, ETA, CO₂, or safety.',
};

// ─── Dataset assembly ─────────────────────────────────────────────────────────

export const VOYAGES: VoyageDataset[] = [
  { voyage: athensHeraklionVoyage, baselineRoute: athensBaselineRoute, optimalRoute: athensOptimalRoute, dangerZones: athensDangerZones, seedMessages: athensSeedMessages, fuelHistory: athensHistory, chatResponses: athensChat },
  { voyage: piraeusTHESSVoyage,   baselineRoute: piraeusTHESSBaseline, optimalRoute: piraeusTHESSOptimal, dangerZones: piraeusTHESSDangerZones, seedMessages: piraeusTHESSSeedMessages, fuelHistory: piThessHistory, chatResponses: piThessChat },
  { voyage: rotterdamHamburgVoyage, baselineRoute: rotterdamBaselineRoute, optimalRoute: rotterdamOptimalRoute, dangerZones: rotterdamDangerZones, seedMessages: rotterdamSeedMessages, fuelHistory: rotterdamHistory, chatResponses: rotterdamChat },
  { voyage: lisbonNYVoyage, baselineRoute: lisbonBaselineRoute, optimalRoute: lisbonOptimalRoute, dangerZones: lisbonDangerZones, seedMessages: lisbonSeedMessages, fuelHistory: lisbonHistory, chatResponses: lisbonChat },
];

export function matchChatResponse(input: string, voyageId: string): string {
  const lower = input.toLowerCase();
  const dataset = VOYAGES.find(v => v.voyage.id === voyageId);
  if (!dataset) return 'Voyage data not found.';
  const { chatResponses: r } = dataset;
  if (/fuel|consumption|burn|diesel|bunker|cost/.test(lower))   return r.fuel;
  if (/eta|arrival|time|late|schedule|delay|fast|speed/.test(lower)) return r.eta;
  if (/weather|wave|wind|swell|storm|sea|forecast/.test(lower)) return r.weather;
  if (/route|path|track|deviat|south|why|direction/.test(lower)) return r.route;
  if (/co2|carbon|emission|green|environment|ets/.test(lower))  return r.co2;
  if (/safe|risk|slam|crew|cargo|structural/.test(lower))       return r.safety;
  return r.default;
}
