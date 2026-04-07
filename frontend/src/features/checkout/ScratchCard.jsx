import React, { useRef, useState, useEffect } from "react";

const COUPONS = ["VELT500", "VELT200", "VELT150"];

export default function ScratchCard({ onCouponRevealed, onClose }) {
  const canvasRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const [coupon] = useState(() => COUPONS[Math.floor(Math.random() * COUPONS.length)]);
  const [scratchPercent, setScratchPercent] = useState(0);
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = 280;
    canvas.height = 140;

    // Fill with scratch layer
    ctx.fillStyle = "#581a90";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add text on scratch layer
    ctx.fillStyle = "rgba(255,255,255,0.15)";
    ctx.font = "bold 14px Arial";
    ctx.textAlign = "center";
    ctx.fillText("✨ SCRATCH HERE ✨", canvas.width / 2, canvas.height / 2 - 5);
    ctx.font = "11px Arial";
    ctx.fillText("Reveal your coupon!", canvas.width / 2, canvas.height / 2 + 18);
  }, []);

  const scratch = (e) => {
    if (!isDrawing.current || revealed) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    // Check how much is scratched
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparent = 0;
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) transparent++;
    }
    const percent = (transparent / (canvas.width * canvas.height)) * 100;
    setScratchPercent(percent);

    if (percent > 45 && !revealed) {
      setRevealed(true);
      // Clear entire canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      onCouponRevealed?.(coupon);
      // Save to localStorage so it only shows once per account
      const used = JSON.parse(localStorage.getItem("veltorn_scratch_used") || "[]");
      const userId = JSON.parse(localStorage.getItem("veltorn_user") || "{}")?._id || "guest";
      if (!used.includes(userId)) {
        used.push(userId);
        localStorage.setItem("veltorn_scratch_used", JSON.stringify(used));
        localStorage.setItem("veltorn_coupon", coupon);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-500 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl text-center space-y-5">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tight">🎉 You Won!</h2>
          <p className="text-xs text-gray-400 mt-1 font-bold uppercase tracking-widest">Scratch to reveal your coupon</p>
        </div>

        {/* Scratch Area */}
        <div className="relative w-70 h-35 mx-auto rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 select-none">
          {/* Prize underneath */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-linear-to-br from-[#581a90] to-purple-900">
            <span className="text-white text-3xl font-black">{coupon}</span>
            <span className="text-purple-200 text-xs font-bold mt-1 uppercase tracking-widest">Use at checkout</span>
          </div>

          {/* Scratch canvas on top */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 cursor-crosshair touch-none"
            onMouseDown={() => isDrawing.current = true}
            onMouseUp={() => isDrawing.current = false}
            onMouseLeave={() => isDrawing.current = false}
            onMouseMove={scratch}
            onTouchStart={() => isDrawing.current = true}
            onTouchEnd={() => isDrawing.current = false}
            onTouchMove={scratch}
          />
        </div>

        {revealed ? (
          <div className="space-y-3">
            <p className="text-sm font-bold text-gray-600">Your coupon code:</p>
            <div className="bg-[#581a90] text-white rounded-xl px-6 py-3 font-black text-xl tracking-widest">
              {coupon}
            </div>
            <p className="text-xs text-gray-400">Saved! Use it on your next order at checkout.</p>
            <button onClick={onClose}
              className="w-full bg-black text-white h-12 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-zinc-800 transition cursor-pointer">
              Continue
            </button>
          </div>
        ) : (
          <p className="text-xs text-gray-400 font-bold">
            {scratchPercent < 20 ? "Keep scratching..." : scratchPercent < 40 ? "Almost there!" : "A little more..."}
          </p>
        )}
      </div>
    </div>
  );
}