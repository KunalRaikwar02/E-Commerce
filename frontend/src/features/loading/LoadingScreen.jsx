import React, { useEffect, useState } from "react";

const LoadingScreen = ({ onDone }) => {
  const [phase, setPhase] = useState("welcome");
  const [progress, setProgress] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showVeltorn, setShowVeltorn] = useState(false);
  const [transitionOut, setTransitionOut] = useState(false);
  const [hideLine, setHideLine] = useState(false);
  const [zoomOut, setZoomOut] = useState(false);

  useEffect(() => {
    // "welcome to" — 400ms
    const t1 = setTimeout(() => setShowWelcome(true), 400);
    // VELTORN — 1100ms
    const t2 = setTimeout(() => setShowVeltorn(true), 1100);
    // phase switch — 3.5s
    const t3 = setTimeout(() => {
      setTransitionOut(true);
      setTimeout(() => {
        setTransitionOut(false);
        setPhase("loading");
      }, 500);
    }, 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  useEffect(() => {
    if (phase !== "loading") return;
    const totalDuration = 4000;
    const intervalMs = 50;
    const steps = totalDuration / intervalMs;
    const baseIncrement = 100 / steps;

    const interval = setInterval(() => {
      setProgress((p) => {
        const jitter = (Math.random() - 0.4) * 1.2;
        const next = p + baseIncrement + jitter;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setHideLine(true), 100);
          setTimeout(() => setZoomOut(true), 300);
          setTimeout(() => onDone(), 1100);
          return 100;
        }
        return Math.min(next, 100);
      });
    }, intervalMs);

    return () => clearInterval(interval);
  }, [phase]);

  return (
    <>
      <style>{`
        @keyframes welcomeSlide {
          from { opacity: 0; transform: scaleY(1.55) translateY(-20px); }
          to   { opacity: 1; transform: scaleY(1.55) translateY(0); }
        }
        @keyframes veltornIn {
          from { opacity: 0; transform: scaleY(1.55) translateY(24px); }
          to   { opacity: 1; transform: scaleY(1.55) translateY(0); }
        }
        @keyframes loadIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes phaseOut {
          from { opacity: 1; }
          to   { opacity: 0; }
        }
        @keyframes numberZoom {
          0%   { transform: scaleY(1.55) scale(1);  opacity: 1; }
          40%  { transform: scaleY(1.55) scale(5);  opacity: 1; }
          100% { transform: scaleY(1.55) scale(14); opacity: 0; }
        }
      `}</style>

      <div style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "#000", overflow: "hidden",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
      }}>
        <div style={{
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          animation: transitionOut ? "phaseOut 0.5s ease forwards" : "none",
        }}>

          {/* WELCOME PHASE */}
          {phase === "welcome" && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              {/* welcome to */}
              <p style={{
                color: "#581a90",
                fontSize: "clamp(25px, 4vw, 38px)",
                fontWeight: 900,
                letterSpacing: "0px",
                lineHeight: 1,
                textTransform: "uppercase",
                marginBottom: "85px",
                transformOrigin: "center bottom",
                opacity: showWelcome ? 1 : 0,
                animation: showWelcome ? "welcomeSlide 0.7s cubic-bezier(0.16,1,0.3,1) forwards" : "none",
              }}>
                welcome to
              </p>

              {/* VELTORN */}
              <h1 style={{
                color: "#fff",
                fontSize: "clamp(76px, 14vw, 144px)",
                fontWeight: 900,
                letterSpacing: "-5px",
                lineHeight: 0.85,
                margin: 0,
                transformOrigin: "center bottom",
                textShadow: "0 0 60px rgba(88,26,144,0.6)",
                display: "block",
                opacity: showVeltorn ? 1 : 0,
                animation: showVeltorn ? "veltornIn 0.85s cubic-bezier(0.16,1,0.3,1) forwards" : "none",
              }}>
                VELTORN
              </h1>
            </div>
          )}

          {/* LOADING PHASE */}
          {phase === "loading" && (
            <div style={{
              display: "flex", flexDirection: "column",
              alignItems: "center", gap: "28px",
              animation: "loadIn 0.5s ease forwards",
            }}>
              <div style={{
                color: "#fff",
                fontSize: "clamp(88px, 16vw, 152px)",
                fontWeight: 900,
                letterSpacing: "-6px",
                lineHeight: 1,
                transform: "scaleY(1.55)",
                transformOrigin: "center",
                animation: zoomOut ? "numberZoom 0.75s cubic-bezier(0.4,0,1,1) forwards" : "none",
              }}>
                {Math.floor(progress)}
                <span style={{ fontSize: "0.35em", letterSpacing: "-2px", color: "#581a90" }}>%</span>
              </div>

              {!hideLine && (
                <div style={{
                  width: "min(340px, 70vw)", height: "1px",
                  background: "#1a1a1a", borderRadius: "1px", overflow: "hidden",
                }}>
                  <div style={{
                    height: "100%",
                    width: `${Math.floor(progress)}%`,
                    background: "linear-gradient(90deg, #581a90, #9333ea)",
                    transition: "width 0.05s linear",
                    boxShadow: "0 0 8px rgba(147,51,234,0.7)",
                  }} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LoadingScreen;