// src/components/AiChatPanel.jsx
import './AiChatPanel.css';

const demoMessages = [
  {
    role: 'user',
    time: '08:12 UTC',
    text: 'Why does the optimized route deviate south instead of following the straight line to Heraklion?',
  },
  {
    role: 'ai',
    time: '08:12 UTC',
    text:
      'The straight-line track crosses an area with forecast head seas of 3.2–3.6 m during your transit window. ' +
      'By shifting ~25 NM south, the vessel sails in 1.8–2.4 m following-to-beam seas, which reduces added resistance and slamming risk.',
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
      'For this voyage, the southern corridor is expected to reduce fuel consumption by ~8.2% versus the baseline route, ' +
      'with no impact on requested ETA (arrival remains within the 08:00 window). ' +
      'If you tighten the ETA tolerance to ±30 minutes, NaviMind will slightly adjust speed but keep the same weather corridor.',
  },
];

function AiChatPanel({ voyage }) {
  // You could use voyage-specific wording later; for now, static is fine.
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
            <div className="ai-chat-bubble">
              {msg.text}
            </div>
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
