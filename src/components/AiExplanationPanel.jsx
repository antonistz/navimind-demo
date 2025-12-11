// src/components/AiExplanationPanel.jsx
import './AiExplanationPanel.css';

function AiExplanationPanel({ voyage }) {
  // Static text now; later, this will be generated from backend.
  const explanation = `
The optimized route deviates south of the baseline track in the central Mediterranean
to avoid a frontal system with significant wave heights above 5 m.

By combining forecast wind, wave and current fields with the vessel’s speed–power curve,
the AI identifies a corridor with following-to-beam seas and slightly more favourable currents.

This yields an estimated ~8% reduction in fuel consumption and CO₂ emissions
while keeping arrival time within the requested window.

In a live deployment, this panel would update if constraints change
(e.g. stricter wave limits or a tighter ETA window).
  `.trim();

  return (
    <section className="ai-card">
      <h2>AI Rationale (Demo)</h2>
      <p className="ai-subtitle">
        Static narrative for now – will be generated from optimizer outputs later.
      </p>
      <div className="ai-content">
        {explanation.split('\n\n').map((para, idx) => (
          <p key={idx}>{para}</p>
        ))}
      </div>
    </section>
  );
}

export default AiExplanationPanel;
