import type { VoyageListItem, OptimizeResult } from '../types';
import { VOYAGES } from '../data/voyages';

const DELAY_MS = 800;

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function getVoyages(): Promise<VoyageListItem[]> {
  await delay(DELAY_MS);
  return VOYAGES.map(({ voyage }) => ({ id: voyage.id, label: voyage.label }));
}

export async function getVoyageOptimization(id: string): Promise<OptimizeResult> {
  await delay(DELAY_MS);
  const dataset = VOYAGES.find(v => v.voyage.id === id);
  if (!dataset) throw new Error(`Voyage "${id}" not found`);
  const { chatResponses: _omit, ...result } = dataset;
  return result;
}
