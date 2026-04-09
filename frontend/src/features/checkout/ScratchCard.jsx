// // import React, { useRef, useState, useEffect } from "react";

// // const COUPONS = ["VELT500", "VELT200", "VELT150"];

// // export default function ScratchCard({ onCouponRevealed, onClose }) {
// //   const canvasRef = useRef(null);
// //   const [revealed, setRevealed] = useState(false);
// //   const [coupon] = useState(() => COUPONS[Math.floor(Math.random() * COUPONS.length)]);
// //   const [scratchPercent, setScratchPercent] = useState(0);
// //   const isDrawing = useRef(false);

// //   useEffect(() => {
// //     const canvas = canvasRef.current;
// //     const ctx = canvas.getContext("2d");
// //     canvas.width = 280;
// //     canvas.height = 140;

// //     // Fill with scratch layer
// //     ctx.fillStyle = "#581a90";
// //     ctx.fillRect(0, 0, canvas.width, canvas.height);

// //     // Add text on scratch layer
// //     ctx.fillStyle = "rgba(255,255,255,0.15)";
// //     ctx.font = "bold 14px Arial";
// //     ctx.textAlign = "center";
// //     ctx.fillText("✨ SCRATCH HERE ✨", canvas.width / 2, canvas.height / 2 - 5);
// //     ctx.font = "11px Arial";
// //     ctx.fillText("Reveal your coupon!", canvas.width / 2, canvas.height / 2 + 18);
// //   }, []);

// //   const scratch = (e) => {
// //     if (!isDrawing.current || revealed) return;
// //     const canvas = canvasRef.current;
// //     const ctx = canvas.getContext("2d");
// //     const rect = canvas.getBoundingClientRect();
// //     const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
// //     const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;

// //     ctx.globalCompositeOperation = "destination-out";
// //     ctx.beginPath();
// //     ctx.arc(x, y, 22, 0, Math.PI * 2);
// //     ctx.fill();

// //     // Check how much is scratched
// //     const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
// //     let transparent = 0;
// //     for (let i = 3; i < imageData.data.length; i += 4) {
// //       if (imageData.data[i] === 0) transparent++;
// //     }
// //     const percent = (transparent / (canvas.width * canvas.height)) * 100;
// //     setScratchPercent(percent);

// //     if (percent > 45 && !revealed) {
// //       setRevealed(true);
// //       // Clear entire canvas
// //       ctx.clearRect(0, 0, canvas.width, canvas.height);
// //       onCouponRevealed?.(coupon);
// //       // Save to localStorage so it only shows once per account
// //       const used = JSON.parse(localStorage.getItem("veltorn_scratch_used") || "[]");
// //       const userId = JSON.parse(localStorage.getItem("veltorn_user") || "{}")?._id || "guest";
// //       if (!used.includes(userId)) {
// //         used.push(userId);
// //         localStorage.setItem("veltorn_scratch_used", JSON.stringify(used));
// //         localStorage.setItem("veltorn_coupon", coupon);
// //       }
// //     }
// //   };

// //   return (
// //     <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-500 flex items-center justify-center px-4">
// //       <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl text-center space-y-5">
// //         <div>
// //           <h2 className="text-2xl font-black uppercase tracking-tight">🎉 You Won!</h2>
// //           <p className="text-xs text-gray-400 mt-1 font-bold uppercase tracking-widest">Scratch to reveal your coupon</p>
// //         </div>

// //         {/* Scratch Area */}
// //         <div className="relative w-70 h-35 mx-auto rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 select-none">
// //           {/* Prize underneath */}
// //           <div className="absolute inset-0 flex flex-col items-center justify-center bg-linear-to-br from-[#581a90] to-purple-900">
// //             <span className="text-white text-3xl font-black">{coupon}</span>
// //             <span className="text-purple-200 text-xs font-bold mt-1 uppercase tracking-widest">Use at checkout</span>
// //           </div>

// //           {/* Scratch canvas on top */}
// //           <canvas
// //             ref={canvasRef}
// //             className="absolute inset-0 cursor-crosshair touch-none"
// //             onMouseDown={() => isDrawing.current = true}
// //             onMouseUp={() => isDrawing.current = false}
// //             onMouseLeave={() => isDrawing.current = false}
// //             onMouseMove={scratch}
// //             onTouchStart={() => isDrawing.current = true}
// //             onTouchEnd={() => isDrawing.current = false}
// //             onTouchMove={scratch}
// //           />
// //         </div>

// //         {revealed ? (
// //           <div className="space-y-3">
// //             <p className="text-sm font-bold text-gray-600">Your coupon code:</p>
// //             <div className="bg-[#581a90] text-white rounded-xl px-6 py-3 font-black text-xl tracking-widest">
// //               {coupon}
// //             </div>
// //             <p className="text-xs text-gray-400">Saved! Use it on your next order at checkout.</p>
// //             <button onClick={onClose}
// //               className="w-full bg-black text-white h-12 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-zinc-800 transition cursor-pointer">
// //               Continue
// //             </button>
// //           </div>
// //         ) : (
// //           <p className="text-xs text-gray-400 font-bold">
// //             {scratchPercent < 20 ? "Keep scratching..." : scratchPercent < 40 ? "Almost there!" : "A little more..."}
// //           </p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }



// import React, { useRef, useState, useEffect } from "react";

// const COUPONS = ["VELT500", "VELT200", "VELT150"];

// export default function ScratchCard({ onCouponRevealed, onClose }) {
//   const canvasRef = useRef(null);
//   const [revealed, setRevealed] = useState(false);
//   const [coupon] = useState(() => COUPONS[Math.floor(Math.random() * COUPONS.length)]);
//   const [scratchPercent, setScratchPercent] = useState(0);
//   const isDrawing = useRef(false);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     canvas.width = 280;
//     canvas.height = 140;

//     ctx.fillStyle = "#581a90";
//     ctx.fillRect(0, 0, canvas.width, canvas.height);

//     ctx.fillStyle = "rgba(255,255,255,0.15)";
//     ctx.font = "bold 14px Arial";
//     ctx.textAlign = "center";
//     ctx.fillText("✨ SCRATCH HERE ✨", canvas.width / 2, canvas.height / 2 - 5);
//     ctx.font = "11px Arial";
//     ctx.fillText("Reveal your coupon!", canvas.width / 2, canvas.height / 2 + 18);
//   }, []);

//   const scratch = (e) => {
//     if (!isDrawing.current || revealed) return;
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     const rect = canvas.getBoundingClientRect();
//     const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
//     const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;

//     ctx.globalCompositeOperation = "destination-out";
//     ctx.beginPath();
//     ctx.arc(x, y, 22, 0, Math.PI * 2);
//     ctx.fill();

//     const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//     let transparent = 0;
//     for (let i = 3; i < imageData.data.length; i += 4) {
//       if (imageData.data[i] === 0) transparent++;
//     }
//     const percent = (transparent / (canvas.width * canvas.height)) * 100;
//     setScratchPercent(percent);

//     if (percent > 45 && !revealed) {
//       setRevealed(true);
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       onCouponRevealed?.(coupon);
//       const used = JSON.parse(localStorage.getItem("veltorn_scratch_used") || "[]");
//       const userId = JSON.parse(localStorage.getItem("veltorn_user") || "{}")?._id || "guest";
//       if (!used.includes(userId)) {
//         used.push(userId);
//         localStorage.setItem("veltorn_scratch_used", JSON.stringify(used));
//         localStorage.setItem("veltorn_coupon", coupon);
//       }
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-500 flex items-center justify-center px-4">
//       <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl text-center space-y-5">
//         <div>
//           <h2 className="text-2xl font-black uppercase tracking-tight">🎉 You Won!</h2>
//           <p className="text-xs text-gray-400 mt-1 font-bold uppercase tracking-widest">Scratch to reveal your coupon</p>
//         </div>

//         <div className="relative w-70 h-35 mx-auto rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 select-none">
//           <div className="absolute inset-0 flex flex-col items-center justify-center bg-linear-to-br from-[#581a90] to-purple-900">
//             <span className="text-white text-3xl font-black">{coupon}</span>
//             <span className="text-purple-200 text-xs font-bold mt-1 uppercase tracking-widest">Use at checkout</span>
//           </div>

//           <canvas
//             ref={canvasRef}
//             className="absolute inset-0 cursor-crosshair touch-none"
//             onMouseDown={() => isDrawing.current = true}
//             onMouseUp={() => isDrawing.current = false}
//             onMouseLeave={() => isDrawing.current = false}
//             onMouseMove={scratch}
//             onTouchStart={() => isDrawing.current = true}
//             onTouchEnd={() => isDrawing.current = false}
//             onTouchMove={scratch}
//           />
//         </div>

//         {revealed ? (
//           <div className="space-y-3">
//             <p className="text-sm font-bold text-gray-600">Your coupon code:</p>
//             <div className="bg-[#581a90] text-white rounded-xl px-6 py-3 font-black text-xl tracking-widest">
//               {coupon}
//             </div>
//             <p className="text-xs text-gray-400">Saved! Use it on your next order at checkout.</p>
//             <button onClick={onClose}
//               className="w-full bg-black text-white h-12 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-zinc-800 transition cursor-pointer">
//               Continue
//             </button>
//           </div>
//         ) : (
//           <p className="text-xs text-gray-400 font-bold">
//             {scratchPercent < 20 ? "Keep scratching..." : scratchPercent < 40 ? "Almost there!" : "A little more..."}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }



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
    canvas.width = 300;
    canvas.height = 130;

    // Silver scratch layer
    const gradient = ctx.createLinearGradient(0, 0, 300, 130);
    gradient.addColorStop(0, "#c0c0c0");
    gradient.addColorStop(0.3, "#e8e8e8");
    gradient.addColorStop(0.5, "#a8a8a8");
    gradient.addColorStop(0.7, "#d4d4d4");
    gradient.addColorStop(1, "#b0b0b0");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Scratch texture pattern
    ctx.fillStyle = "rgba(0,0,0,0.06)";
    for (let i = 0; i < 80; i++) {
      ctx.fillRect(
        Math.random() * 300, Math.random() * 130,
        Math.random() * 4 + 1, 1
      );
    }

    // Text on scratch layer
    ctx.fillStyle = "rgba(80,80,80,0.9)";
    ctx.font = "bold 13px Arial";
    ctx.textAlign = "center";
    ctx.fillText("✦ SCRATCH HERE ✦", canvas.width / 2, canvas.height / 2 - 6);
    ctx.font = "10px Arial";
    ctx.fillStyle = "rgba(100,100,100,0.8)";
    ctx.fillText("Reveal your reward", canvas.width / 2, canvas.height / 2 + 14);
  }, []);

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX ?? e.touches?.[0]?.clientX;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY;
    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height),
    };
  };

  const scratch = (e) => {
    if (!isDrawing.current || revealed) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { x, y } = getPos(e, canvas);

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    // Bada radius — kam scratching mein jyada reveal
    ctx.arc(x, y, 30, 0, Math.PI * 2);
    ctx.fill();

    // Percentage check
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparent = 0;
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) transparent++;
    }
    const percent = (transparent / (canvas.width * canvas.height)) * 100;
    setScratchPercent(percent);

    // 30% pe reveal — pehle 45% tha
    if (percent > 30 && !revealed) {
      setRevealed(true);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      onCouponRevealed?.(coupon);
      const used = JSON.parse(localStorage.getItem("veltorn_scratch_used") || "[]");
      const userId = JSON.parse(localStorage.getItem("veltorn_user") || "{}")?._id || "guest";
      if (!used.includes(userId)) {
        used.push(userId);
        localStorage.setItem("veltorn_scratch_used", JSON.stringify(used));
        localStorage.setItem("veltorn_coupon", coupon);
      }
    }
  };

  const discountMap = { "VELT500": "₹500 OFF", "VELT200": "₹200 OFF", "VELT150": "₹150 OFF" };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[500] flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden">

        {/* Header */}
        <div style={{ background: "linear-gradient(135deg, #581a90, #7c3aed)" }} className="px-8 pt-8 pb-6 text-center">
          <div className="text-4xl mb-2">🎁</div>
          <h2 className="text-white text-xl font-black uppercase tracking-tight">You Won a Coupon!</h2>
          <p className="text-purple-200 text-xs font-bold mt-1 uppercase tracking-widest">
            Scratch below to reveal
          </p>
        </div>

        <div className="px-8 py-6 space-y-5">

          {/* Scratch area */}
          <div className="relative mx-auto rounded-2xl overflow-hidden select-none shadow-inner"
            style={{ width: "300px", height: "130px", border: "2px dashed #e0e0e0" }}>

            {/* Prize underneath */}
            <div className="absolute inset-0 flex flex-col items-center justify-center"
              style={{ background: "linear-gradient(135deg, #0f0f0f, #1a1a2e)" }}>
              <div className="text-[#581a90] text-xs font-black uppercase tracking-widest mb-1">VELTORN EXCLUSIVE</div>
              <div className="text-white font-black" style={{ fontSize: "36px", letterSpacing: "-1px", lineHeight: 1 }}>
                {discountMap[coupon]}
              </div>
              <div className="text-gray-400 text-xs font-bold mt-2 uppercase tracking-widest">
                Code: <span className="text-white">{coupon}</span>
              </div>
            </div>

            {/* Canvas overlay */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 cursor-crosshair touch-none"
              style={{ width: "300px", height: "130px" }}
              onMouseDown={() => (isDrawing.current = true)}
              onMouseUp={() => (isDrawing.current = false)}
              onMouseLeave={() => (isDrawing.current = false)}
              onMouseMove={scratch}
              onTouchStart={(e) => { isDrawing.current = true; scratch(e); }}
              onTouchEnd={() => (isDrawing.current = false)}
              onTouchMove={scratch}
            />
          </div>

          {/* Progress bar */}
          {!revealed && (
            <div className="space-y-2">
              <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-100"
                  style={{
                    width: `${Math.min(scratchPercent * 3.3, 100)}%`,
                    background: "linear-gradient(90deg, #581a90, #9333ea)",
                  }}
                />
              </div>
              <p className="text-center text-xs text-gray-400 font-bold">
                {scratchPercent < 10 ? "Start scratching..." : scratchPercent < 20 ? "Keep going..." : "Almost there!"}
              </p>
            </div>
          )}

          {/* After reveal */}
          {revealed && (
            <div className="space-y-4">
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-center">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-2">Your Coupon Code</p>
                <div className="flex items-center justify-center gap-3">
                  <span className="font-black text-2xl tracking-widest text-black">{coupon}</span>
                </div>
                <p className="text-xs text-emerald-600 font-bold mt-2">✓ Auto-saved for next order</p>
              </div>
              <button onClick={onClose}
                className="w-full text-white h-12 rounded-2xl font-black text-sm uppercase tracking-widest hover:opacity-90 transition cursor-pointer"
                style={{ background: "linear-gradient(135deg, #581a90, #7c3aed)" }}>
                Awesome, Let's Go!
              </button>
            </div>
          )}

          {/* Skip */}
          {!revealed && (
            <button onClick={onClose}
              className="w-full text-gray-300 text-xs font-bold py-2 hover:text-gray-500 transition cursor-pointer">
              Skip for now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}