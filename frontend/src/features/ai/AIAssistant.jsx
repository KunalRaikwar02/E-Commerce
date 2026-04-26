import React, { useState, useEffect, useRef } from "react";
import { X, Send, Sparkles } from "lucide-react";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const QUICK_SUGGESTIONS = [
  { icon: "🔥", text: "Best sellers", query: "Best selling products kaunse hain?" },
  { icon: "👕", text: "T-Shirts dikhao", query: "Saare T-shirts dikhao with prices" },
  { icon: "🎌", text: "Naruto collection", query: "Naruto collection mein kya kya hai?" },
  { icon: "💰", text: "Under ₹999", query: "₹999 ke andar best products kaunse hain?" },
  { icon: "👖", text: "Jeans & Caps", query: "Jeans aur Caps dikhao" },
  { icon: "🎁", text: "Discount codes", query: "Koi discount coupon hai?" },
];

// Format markdown
function formatMessage(text) {
  const lines = text.split("\n");
  return lines.map((line, i) => {

    const parts = line.split(/\*\*(.*?)\*\*/g);
    const formatted = parts.map((part, j) =>
      j % 2 === 1
        ? <strong key={j} style={{ color: "#c084fc", fontWeight: 800 }}>{part}</strong>
        : part
    );
  
    const isBullet = line.trim().startsWith("•") || line.trim().startsWith("-");
    return (
      <span key={i}>
        {isBullet
          ? <span style={{ display: "block", paddingLeft: "8px", borderLeft: "2px solid rgba(88,26,144,0.5)", marginBottom: "4px" }}>{formatted}</span>
          : formatted
        }
        {i < lines.length - 1 && !isBullet && <br />}
      </span>
    );
  });
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{
        role: "assistant",
        content: "Hey! 👋 I'm VIRA — VELTORN's AI Shopping Assistant!\n\nWhat are you looking for today? I'll recommend the best products, share prices, or answer any questions! 🛍️",
      }]);
    }
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const sendMessage = async (text) => {
    const userText = (text || input).trim();
    if (!userText || loading) return;

    setInput("");
    setShowSuggestions(false);
    const newMessages = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error");
      setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Oops! Something went wrong. Please try again later or contact support. 🙏",
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes vira-in {
          from { opacity: 0; transform: translateY(24px) scale(0.94); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes vira-msg {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes vira-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(88,26,144,0.5), 0 8px 32px rgba(88,26,144,0.4); }
          50%       { box-shadow: 0 0 0 10px rgba(88,26,144,0), 0 8px 32px rgba(88,26,144,0.6); }
        }
        @keyframes vira-dot {
          0%, 80%, 100% { transform: scale(0.55); opacity: 0.3; }
          40%            { transform: scale(1); opacity: 1; }
        }
        @keyframes vira-online {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
        .vira-panel      { animation: vira-in 0.38s cubic-bezier(0.16,1,0.3,1) forwards; }
        .vira-msg        { animation: vira-msg 0.22s ease forwards; }
        .vira-btn        { animation: vira-pulse 2.8s ease-in-out infinite; }
        .vira-dot-1      { animation: vira-dot 1.3s ease-in-out infinite; }
        .vira-dot-2      { animation: vira-dot 1.3s ease-in-out 0.22s infinite; }
        .vira-dot-3      { animation: vira-dot 1.3s ease-in-out 0.44s infinite; }
        .vira-online-dot { animation: vira-online 2s ease-in-out infinite; }
        .vira-scroll::-webkit-scrollbar       { width: 3px; }
        .vira-scroll::-webkit-scrollbar-track { background: transparent; }
        .vira-scroll::-webkit-scrollbar-thumb { background: rgba(147,51,234,0.25); border-radius: 10px; }
        .vira-suggestion { transition: all 0.18s; border: 1px solid rgba(88,26,144,0.12); background: rgba(255,255,255,0.025); }
        .vira-suggestion:hover { border-color: rgba(147,51,234,0.45); background: rgba(88,26,144,0.1); transform: translateY(-2px); }
        .vira-input { caret-color: #9333ea; }
        .vira-input::placeholder { color: rgba(156,163,175,0.4); }
        .vira-send { transition: all 0.15s; }
        .vira-send:not(:disabled):hover { transform: scale(1.08); }
        .vira-send:disabled { opacity: 0.3; }
      `}</style>

      {/* Floating Button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="vira-btn fixed bottom-6 right-6 z-200 w-14 h-14 rounded-2xl flex items-center justify-center cursor-pointer"
        style={{ background: "linear-gradient(135deg, #3d1166 0%, #581a90 50%, #7c3aed 100%)" }}
        title="VIRA — AI Shopping Assistant"
      >
        {open
          ? <X size={20} className="text-white" />
          : <Sparkles size={22} className="text-white" />
        }
        <span
          className="vira-online-dot absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full border-2 border-[#581a90]"
          style={{ background: "#4ade80" }}
        />
      </button>

      {/* Chat Panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-200 w-[92vw] sm:w-97.5">
          <div
            className="vira-panel rounded-3xl overflow-hidden flex flex-col"
            style={{
              height: "min(580px, 78vh)",
              background: "linear-gradient(160deg, #09090f 0%, #0d0d1a 100%)",
              border: "1px solid rgba(88,26,144,0.25)",
              boxShadow: "0 40px 100px rgba(0,0,0,0.85), 0 0 0 1px rgba(88,26,144,0.08), inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            {/* Top accent */}
            <div style={{ height: "1.5px", background: "linear-gradient(90deg, transparent, #581a90, #9333ea, #c084fc, transparent)" }} />

            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4 shrink-0"
              style={{ background: "rgba(88,26,144,0.08)", borderBottom: "1px solid rgba(88,26,144,0.15)" }}
            >
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "linear-gradient(135deg, #581a90, #9333ea)", boxShadow: "0 4px 16px rgba(88,26,144,0.5)" }}>
                  <Sparkles size={17} className="text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-white font-black text-sm tracking-widest uppercase">VIRA</p>
                    <span className="vira-online-dot w-1.5 h-1.5 rounded-full" style={{ background: "#4ade80" }} />
                  </div>
                  <p className="text-[10px] font-bold tracking-widest" style={{ color: "#7c3aed" }}>
                    VELTORN AI ASSISTANT
                  </p>
                </div>
              </div>
              <button onClick={() => setOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-xl cursor-pointer transition-all"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.15)"; e.currentTarget.style.borderColor = "rgba(239,68,68,0.3)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}
              >
                <X size={14} className="text-gray-500" />
              </button>
            </div>

            {/* Messages */}
            <div className="vira-scroll flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-0">

              {messages.map((msg, i) => (
                <div key={i} className={`vira-msg flex ${msg.role === "user" ? "justify-end" : "justify-start"} items-end gap-2`}>
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mb-0.5"
                      style={{ background: "linear-gradient(135deg, #581a90, #9333ea)", boxShadow: "0 2px 8px rgba(88,26,144,0.4)" }}>
                      <Sparkles size={12} className="text-white" />
                    </div>
                  )}
                  <div
                    className="max-w-[80%] px-4 py-3 text-[13px] leading-relaxed"
                    style={msg.role === "user" ? {
                      background: "linear-gradient(135deg, #581a90, #7c3aed)",
                      color: "#fff",
                      borderRadius: "18px 18px 4px 18px",
                      boxShadow: "0 4px 16px rgba(88,26,144,0.3)",
                    } : {
                      background: "rgba(255,255,255,0.05)",
                      color: "#d1d5db",
                      borderRadius: "18px 18px 18px 4px",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    {formatMessage(msg.content)}
                  </div>
                </div>
              ))}

              {/* Loading */}
              {loading && (
                <div className="vira-msg flex items-end gap-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "linear-gradient(135deg, #581a90, #9333ea)" }}>
                    <Sparkles size={12} className="text-white" />
                  </div>
                  <div className="px-4 py-3.5 rounded-2xl flex items-center gap-1.5"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "18px 18px 18px 4px" }}>
                    <div className="vira-dot-1 w-2 h-2 rounded-full" style={{ background: "#9333ea" }} />
                    <div className="vira-dot-2 w-2 h-2 rounded-full" style={{ background: "#9333ea" }} />
                    <div className="vira-dot-3 w-2 h-2 rounded-full" style={{ background: "#9333ea" }} />
                  </div>
                </div>
              )}

              {/* Quick suggestions */}
              {showSuggestions && messages.length <= 1 && !loading && (
                <div className="space-y-2.5 pt-1">
                  <p className="text-[9px] font-black tracking-[0.2em] uppercase px-1" style={{ color: "rgba(147,51,234,0.6)" }}>
                    Quick Actions
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {QUICK_SUGGESTIONS.map((s, i) => (
                      <button key={i} onClick={() => sendMessage(s.query)}
                        className="vira-suggestion text-left px-3 py-2.5 rounded-xl cursor-pointer">
                        <span className="text-lg leading-none">{s.icon}</span>
                        <p className="text-[11px] font-bold text-gray-300 mt-1.5 leading-tight">{s.text}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-4 pb-4 pt-3 shrink-0" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              <div
                className="flex items-center gap-2.5 px-4 py-3 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(88,26,144,0.2)",
                  transition: "border-color 0.2s",
                }}
                onFocus={() => {}}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage()}
                  placeholder="Ask me anything..."
                  className="vira-input flex-1 bg-transparent text-[13px] font-medium text-white outline-none"
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || loading}
                  className="vira-send w-8 h-8 rounded-xl flex items-center justify-center cursor-pointer"
                  style={{ background: "linear-gradient(135deg, #581a90, #9333ea)" }}
                >
                  <Send size={13} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}