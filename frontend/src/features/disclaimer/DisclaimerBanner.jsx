import React, { useState } from "react";
import { AlertTriangle, X } from "lucide-react";

export default function DisclaimerBanner({ onClose }) {
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    sessionStorage.setItem("veltorn_disclaimer_seen", "true");
    setTimeout(() => onClose(), 300);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9998,
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        opacity: closing ? 0 : 1,
        transition: "opacity 0.3s ease",
      }}
    >
      <div
        style={{
          background: "#0a0a0a",
          border: "1px solid #262626",
          borderRadius: "24px",
          maxWidth: "480px",
          width: "100%",
          padding: "0",
          overflow: "hidden",
          boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
          transform: closing ? "scale(0.95) translateY(10px)" : "scale(1) translateY(0)",
          transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(135deg, #581a90, #3b0764)",
            padding: "24px 24px 20px",
            display: "flex",
            alignItems: "flex-start",
            gap: "14px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              background: "rgba(255,255,255,0.15)",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <AlertTriangle size={20} color="#fcd34d" />
          </div>
          <div>
            <p style={{ color: "white", fontWeight: 800, fontSize: "16px", margin: 0, fontFamily: "Arial, sans-serif" }}>
              Before You Continue
            </p>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", margin: "4px 0 0 0" }}>
              Quick heads up
            </p>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "20px 24px" }}>
          <p style={{ color: "#d1d5db", fontSize: "13.5px", lineHeight: 1.6, margin: 0, fontFamily: "Arial, sans-serif" }}>
            VELTORN is currently a <strong style={{ color: "white" }}>work in progress</strong> — this site is a demo build, not yet a fully operational store.
            Orders placed here are{" "}
            <strong style={{ color: "white" }}>not fulfilled or delivered</strong> at this time, and payments should not be considered final purchases.
          </p>
          <p style={{ color: "#9ca3af", fontSize: "12.5px", lineHeight: 1.6, margin: "12px 0 0 0", fontFamily: "Arial, sans-serif" }}>
            We're actively building toward a full launch. Product images, prices, and details may change before we go live.
          </p>
        </div>

        {/* Footer */}
        <div style={{ padding: "0 24px 24px" }}>
          <button
            onClick={handleClose}
            style={{
              width: "100%",
              height: "48px",
              background: "linear-gradient(135deg, #581a90, #7c3aed)",
              border: "none",
              borderRadius: "14px",
              color: "white",
              fontWeight: 800,
              fontSize: "13px",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              cursor: "pointer",
              fontFamily: "Arial, sans-serif",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.9"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            I Understand, Continue
          </button>
        </div>
      </div>
    </div>
  );
}