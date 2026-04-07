import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useAuth } from "./AuthContext";

export default function AuthModal({ onClose, defaultMode = "login" }) {
  const [mode, setMode] = useState(defaultMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, register, loading } = useAuth();

  // Pre-fill email from footer signup
  useEffect(() => {
    const prefill = sessionStorage.getItem("veltorn_prefill_email");
    if (prefill) {
      setEmail(prefill);
      setMode("register");
      sessionStorage.removeItem("veltorn_prefill_email");
    }
  }, []);

  const handleSubmit = async () => {
    setError("");
    if (!email || !password) { setError("Email and password required"); return; }
    if (mode === "register" && !name) { setError("Name required"); return; }

    let result;
    if (mode === "login") result = await login(email, password);
    else result = await register(name, email, password);

    if (result.success) onClose();
    else setError(result.message);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-300 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">

        <div className="flex justify-between items-center px-8 pt-8 pb-6 border-b border-gray-100">
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tight text-black">
              {mode === "login" ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">
              {mode === "login" ? "Login to your account" : "Join VELTORN today"}
            </p>
          </div>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-100 hover:text-red-500 transition cursor-pointer">
            <X size={18} />
          </button>
        </div>

        <div className="px-8 py-6 space-y-4">
          {error && <div className="bg-red-50 border border-red-100 text-red-500 text-xs font-bold px-4 py-3 rounded-xl">{error}</div>}

          {mode === "register" && (
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5 block">Full Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name"
                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-bold outline-none focus:ring-2 focus:ring-black transition" />
            </div>
          )}

          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5 block">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com"
              className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-bold outline-none focus:ring-2 focus:ring-black transition" />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5 block">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-bold outline-none focus:ring-2 focus:ring-black transition" />
          </div>

          <button onClick={handleSubmit} disabled={loading}
            className="w-full bg-black text-white h-14 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-zinc-800 transition cursor-pointer disabled:opacity-50 flex items-center justify-center mt-2">
            {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : (mode === "login" ? "LOGIN" : "CREATE ACCOUNT")}
          </button>

          <p className="text-center text-xs text-gray-400 font-bold pt-2">
            {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}
              className="text-black underline cursor-pointer hover:text-[#581a90] transition">
              {mode === "login" ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}