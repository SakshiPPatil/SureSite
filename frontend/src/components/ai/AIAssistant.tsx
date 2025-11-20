import React, { useEffect, useMemo, useRef } from 'react';

type Message = { role: 'user' | 'assistant'; content: string; timestamp?: number };

export const AIAssistant: React.FC<{
  messages: Message[];
  value: string;
  setValue: (v: string) => void;
  loading: boolean;
  onSend: (text: string) => void;
}> = ({ messages, value, setValue, loading, onSend }) => {
  const endRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loading]);

  return (
    <div className="ai-builder" style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0, flex: 1 }}>
      <div className="relume-card" style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0, background: 'rgba(30,41,59,0.8)', borderColor: 'rgba(255,255,255,0.1)' }}>
        <div className="ai-chat-log" style={{ overflowY: 'auto', maxHeight: 380, padding: 8 }}>
          {messages.length === 0 && (
            <div style={{ color: 'var(--text-secondary)' }}>
              👋 Hi! I can help you create business sites, landing pages, e‑commerce stores, portfolios and more. What would you like to build?
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className="fade-in" style={{ display: 'flex', marginBottom: 10, justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{ maxWidth: '78%', padding: '10px 12px', borderRadius: 12, lineHeight: 1.5, fontSize: 14, color: '#f1f5f9', background: m.role === 'user' ? '#1e293b' : 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
                {m.content}
                <div style={{ fontSize: 12, opacity: 0.8, marginTop: 6 }}>{new Date(m.timestamp || Date.now()).toLocaleTimeString()}</div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="fade-in" style={{ display: 'flex', gap: 6, alignItems: 'center', color: 'var(--text-secondary)' }}>
              <span>AI is typing</span>
              <span className="dot-anim">•</span><span className="dot-anim" style={{ animationDelay: '0.15s' }}>•</span><span className="dot-anim" style={{ animationDelay: '0.3s' }}>•</span>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <textarea
            className="ai-textarea"
            placeholder="Describe your website idea..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{ minHeight: 52 }}
          />
          <button className="btn-primary" disabled={!value.trim() || loading} onClick={() => onSend(value)}>{loading ? 'Sending…' : 'Send'}</button>
        </div>
      </div>

      <style jsx>{`
        .dot-anim { animation: blink 1s infinite; }
        @keyframes blink { 0%, 80%, 100% { opacity: 0.2 } 40% { opacity: 1 } }
      `}</style>
    </div>
  );
};


