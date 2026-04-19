import type { Voyage } from '../types';
import './AiChatPanel.css';

interface ChatMessage {
  role: 'user' | 'ai';
  time: string;
  text: string;
}

function buildDemoMessages(voyage: Voyage): ChatMessage[] {
  const fuelSavingPct = (
    ((voyage.fuelBaselineTons - voyage.fuelOptimalTons) / voyage.fuelBaselineTons) * 100
  ).toFixed(1);

  return [
    {
      role: 'user',
      time: '08:12 UTC',
      text: `Why does the optimized route deviate south instead of following the straight line to ${voyage.destination}?`,
    },
    {
      role: 'ai',
      time: '08:12 UTC',
      text:
        `The straight-line track crosses an area with forecast head seas of ${voyage.maxWaveBaseline.toFixed(1)}–${(voyage.maxWaveBaseline + 0.4).toFixed(1)} m during your transit window. ` +
        `By shifting ~25 NM south, the vessel sails in ${voyage.maxWaveOptimal.toFixed(1)}–${(voyage.maxWaveOptimal + 0.6).toFixed(1)} m following-to-beam seas, which reduces added resistance and slamming risk.`,
    },
    {
      role: 'user',
      time: '08:13 UTC',
      text: 'How does that affect fuel and ETA?',
    },
    {
      role: 'ai',
      time: '08:13 UTC',
      text:
        `For this voyage, the southern corridor reduces fuel consumption by ~${fuelSavingPct}% versus the baseline route, ` +
        `with no impact on requested ETA (arrival remains within the ${voyage.etaOptimal.split(' ')[1]} window). ` +
        `If you tighten the ETA tolerance to ±30 minutes, NaviMind will slightly adjust speed but keep the same weather corridor.`,
    },
  ];
}

interface AiChatPanelProps {
  voyage: Voyage;
}

function AiChatPanel({ voyage }: AiChatPanelProps) {
  const demoMessages = buildDemoMessages(voyage);

  return (
    <section className="ai-chat-card">
      <div className="ai-chat-header">
        <div>
          <h2>NaviMind Assistant</h2>
          <p className="ai-chat-subtitle">
            Explain and stress-test route decisions in natural language.
          </p>
        </div>
        <span className="ai-chat-badge">Demo</span>
      </div>

      <div className="ai-chat-messages">
        {demoMessages.map((msg, idx) => (
          <div
            key={idx}
            className={`ai-chat-message ${msg.role === 'ai' ? 'ai' : 'user'}`}
          >
            <div className="ai-chat-meta">
              <span className="ai-chat-role">
                {msg.role === 'ai' ? 'NaviMind' : 'Operator'}
              </span>
              <span className="ai-chat-dot">•</span>
              <span className="ai-chat-time">{msg.time}</span>
            </div>
            <div className="ai-chat-bubble">{msg.text}</div>
          </div>
        ))}
      </div>

      <div className="ai-chat-input-bar">
        <input
          type="text"
          placeholder="Type a question about this route… (demo mode)"
          disabled
        />
        <button disabled>Send</button>
      </div>
    </section>
  );
}

export default AiChatPanel;
