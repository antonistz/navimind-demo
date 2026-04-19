import type { Voyage } from '../types';
import './AiExplanationPanel.css';

interface AiExplanationPanelProps {
  voyage: Voyage;
}

function AiExplanationPanel({ voyage }: AiExplanationPanelProps) {
  const fuelSavingPct = (
    ((voyage.fuelBaselineTons - voyage.fuelOptimalTons) / voyage.fuelBaselineTons) * 100
  ).toFixed(1);
  const co2SavingPct = (
    ((voyage.co2Baseline - voyage.co2Optimal) / voyage.co2Baseline) * 100
  ).toFixed(1);
  const waveDelta = (voyage.maxWaveBaseline - voyage.maxWaveOptimal).toFixed(1);

  const paragraphs = [
    `The optimized route for ${voyage.origin} → ${voyage.destination} deviates south of the baseline track to avoid a frontal system with significant wave heights above ${voyage.maxWaveBaseline.toFixed(1)} m.`,
    `By combining forecast wind, wave and current fields with the vessel's speed–power curve, the AI identifies a corridor with following-to-beam seas. Max wave exposure drops from ${voyage.maxWaveBaseline.toFixed(1)} m to ${voyage.maxWaveOptimal.toFixed(1)} m (−${waveDelta} m).`,
    `This yields an estimated ~${fuelSavingPct}% reduction in fuel consumption and ~${co2SavingPct}% reduction in CO₂ emissions while keeping arrival time within the requested window. Objective: ${voyage.objective}.`,
    `In a live deployment, this panel updates in real time as constraints change (e.g. stricter wave limits or a tighter ETA window).`,
  ];

  return (
    <section className="ai-card">
      <h2>AI Rationale (Demo)</h2>
      <p className="ai-subtitle">
        Static narrative for now – will be generated from optimizer outputs later.
      </p>
      <div className="ai-content">
        {paragraphs.map((para, idx) => (
          <p key={idx}>{para}</p>
        ))}
      </div>
    </section>
  );
}

export default AiExplanationPanel;
