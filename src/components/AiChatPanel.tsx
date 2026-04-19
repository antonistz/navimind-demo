import { useState, useEffect, useRef } from 'react';
import type { Voyage, ChatMessage } from '../types';
import { matchChatResponse } from '../data/voyages';
import './AiChatPanel.css';

interface AiChatPanelProps {
  voyage: Voyage;
  seedMessages: ChatMessage[];
}

function nowUtc(): string {
  return new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' }) + ' UTC';
}

function AiChatPanel({ voyage, seedMessages }: AiChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(seedMessages);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Reset when voyage changes
  useEffect(() => {
    setMessages(seedMessages);
    setInputValue('');
    setIsThinking(false);
    setTypingText('');
    setIsTyping(false);
    if (typingRef.current) clearInterval(typingRef.current);
  }, [seedMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typingText, isThinking]);

  function startTyping(fullText: string) {
    setTypingText('');
    setIsTyping(true);
    let i = 0;
    typingRef.current = setInterval(() => {
      i++;
      setTypingText(fullText.slice(0, i));
      if (i >= fullText.length) {
        clearInterval(typingRef.current!);
        setIsTyping(false);
        setTypingText('');
        setMessages(prev => [...prev, { role: 'ai', time: nowUtc(), text: fullText }]);
      }
    }, 8);
  }

  function handleSend() {
    const text = inputValue.trim();
    if (!text || isThinking || isTyping) return;
    const userMsg: ChatMessage = { role: 'user', time: nowUtc(), text };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsThinking(true);
    setTimeout(() => {
      setIsThinking(false);
      const response = matchChatResponse(text, voyage.id);
      startTyping(response);
    }, 700);
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleSend();
  }

  const fuelSavingPct = (((voyage.fuelBaselineTons - voyage.fuelOptimalTons) / voyage.fuelBaselineTons) * 100).toFixed(1);

  return (
    <section className="ai-chat-card">
      <div className="ai-chat-header">
        <div>
          <h2>NaviMind Assistant</h2>
          <p className="ai-chat-subtitle">
            Ask anything about this route — fuel, weather, ETA, safety.
          </p>
        </div>
        <span className="ai-chat-badge">{fuelSavingPct}% fuel saved</span>
      </div>

      <div className="ai-chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`ai-chat-message ${msg.role}`}>
            <div className="ai-chat-meta">
              <span className="ai-chat-role">{msg.role === 'ai' ? 'NaviMind' : 'Operator'}</span>
              <span className="ai-chat-dot">•</span>
              <span className="ai-chat-time">{msg.time}</span>
            </div>
            <div className="ai-chat-bubble">{msg.text}</div>
          </div>
        ))}

        {isThinking && (
          <div className="ai-chat-message ai">
            <div className="ai-chat-meta">
              <span className="ai-chat-role">NaviMind</span>
              <span className="ai-chat-dot">•</span>
              <span className="ai-chat-time">{nowUtc()}</span>
            </div>
            <div className="ai-chat-bubble thinking-bubble">
              <span className="thinking-dot" /><span className="thinking-dot" /><span className="thinking-dot" />
            </div>
          </div>
        )}

        {isTyping && typingText && (
          <div className="ai-chat-message ai">
            <div className="ai-chat-meta">
              <span className="ai-chat-role">NaviMind</span>
              <span className="ai-chat-dot">•</span>
              <span className="ai-chat-time">{nowUtc()}</span>
            </div>
            <div className="ai-chat-bubble">
              {typingText}<span className="typing-cursor" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="ai-chat-input-bar active">
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask about fuel, weather, ETA, safety…"
          disabled={isThinking || isTyping}
        />
        <button
          onClick={handleSend}
          disabled={isThinking || isTyping || !inputValue.trim()}
        >
          Send
        </button>
      </div>
    </section>
  );
}

export default AiChatPanel;
