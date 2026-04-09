// // import React, { useEffect, useState } from "react";
// // import { useNavigate, useLocation } from "react-router-dom";
// // import { Check, Package, ArrowRight } from "lucide-react";
// // import Confetti from "react-confetti";
// // import ScratchCard from "./ScratchCard";

// // export default function OrderSuccess() {
// //   const navigate = useNavigate();
// //   const { state } = useLocation();
// //   const orderId = state?.orderId || "VEL-XXXXX";

// //   const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
// //   const [showScratch, setShowScratch] = useState(false);
// //   const [scratchDone, setScratchDone] = useState(false);
// //   const [couponWon, setCouponWon] = useState(null);
// //   const [showConfetti, setShowConfetti] = useState(false);

// //   useEffect(() => {
// //     const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
// //     window.addEventListener("resize", handleResize);

// //     // Check if scratch card already used
// //     const used = JSON.parse(localStorage.getItem("veltorn_scratch_used") || "[]");
// //     const userId = JSON.parse(localStorage.getItem("veltorn_user") || "{}")?._id || "guest";
// //     const alreadyUsed = used.includes(userId);

// //     if (!alreadyUsed) {
// //       setTimeout(() => setShowScratch(true), 1000);
// //     } else {
// //       setScratchDone(true);
// //       setShowConfetti(true);
// //     }

// //     return () => window.removeEventListener("resize", handleResize);
// //   }, []);

// //   const handleScratchClose = () => {
// //     setShowScratch(false);
// //     setScratchDone(true);
// //     setShowConfetti(true);
// //   };

// //   return (
// //     <div className="min-h-screen bg-white flex flex-col items-center justify-center pt-20 pb-20 px-4 text-center relative overflow-hidden">

// //       {showConfetti && (
// //         <Confetti
// //           width={windowSize.width}
// //           height={windowSize.height}
// //           recycle={false}
// //           numberOfPieces={220}
// //           gravity={0.12}
// //           colors={["#581a90", "#34d399", "#facc15", "#000", "#f472b6"]}
// //         />
// //       )}

// //       {showScratch && (
// //         <ScratchCard
// //           onCouponRevealed={c => setCouponWon(c)}
// //           onClose={handleScratchClose}
// //         />
// //       )}

// //       {/* Check icon */}
// //       <div className="relative mb-12 animate-in zoom-in duration-500">
// //         <div className="w-32 h-32 bg-emerald-50 rounded-full flex items-center justify-center border-4 border-emerald-100 shadow-xl">
// //           <Check className="text-emerald-500" size={64} strokeWidth={2.5} />
// //         </div>
// //         <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-[#581a90] rounded-full flex items-center justify-center text-white shadow-xl animate-in fade-in slide-in-from-bottom-3 duration-500 delay-300">
// //           <Package size={22} />
// //         </div>
// //       </div>

// //       <div className="space-y-3 mb-10 max-w-md">
// //         <h1 className="text-emerald-500 text-4xl md:text-6xl font-black uppercase tracking-[-2px] scale-y-[1.3] origin-center leading-none">
// //           ORDER PLACED!
// //         </h1>
// //         <p className="text-zinc-400 font-bold text-xs uppercase tracking-[0.3em] mt-4 block">
// //           #{orderId}
// //         </p>
// //         <p className="text-sm leading-relaxed text-gray-500 pt-2">
// //           Your order is confirmed. We'll start processing it right away!
// //         </p>

// //         {couponWon && (
// //           <div className="mt-5 bg-[#581a90]/10 border border-[#581a90]/20 rounded-2xl p-4">
// //             <p className="text-xs font-bold text-[#581a90] uppercase tracking-widest">🎁 Coupon Saved!</p>
// //             <p className="font-black text-xl text-[#581a90] mt-1">{couponWon}</p>
// //             <p className="text-xs text-gray-400 mt-1">Use at checkout on your next order</p>
// //           </div>
// //         )}
// //       </div>

// //       <div className="flex flex-col sm:flex-row gap-4">
// //         <button onClick={() => navigate("/my-orders")}
// //           className="group bg-black text-white px-8 py-4 rounded-2xl flex items-center gap-3 font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-zinc-800 transition-all cursor-pointer">
// //           <Package size={15} /> View My Orders
// //         </button>
// //         <button onClick={() => navigate("/")}
// //           className="group bg-zinc-50 text-zinc-900 px-8 py-4 rounded-2xl flex items-center gap-3 font-black text-xs uppercase tracking-[0.2em] border border-zinc-100 hover:border-black transition-all cursor-pointer">
// //           Continue Shopping
// //           <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }



// import React, { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { Check, Package, ArrowRight } from "lucide-react";
// import Confetti from "react-confetti";
// import ScratchCard from "./ScratchCard";

// export default function OrderSuccess() {
//   const navigate = useNavigate();
//   const { state } = useLocation();
//   const orderId = state?.orderId || "VEL-XXXXX";

//   const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
//   const [showScratch, setShowScratch] = useState(false);
//   const [scratchDone, setScratchDone] = useState(false);
//   const [couponWon, setCouponWon] = useState(null);
//   const [showConfetti, setShowConfetti] = useState(false);

//   useEffect(() => {
//     const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
//     window.addEventListener("resize", handleResize);

//     // Check if scratch card already used for this user
//     const used = JSON.parse(localStorage.getItem("veltorn_scratch_used") || "[]");
//     const userId = JSON.parse(localStorage.getItem("veltorn_user") || "{}")?._id || "guest";
//     const alreadyUsed = used.includes(userId);

//     if (!alreadyUsed) {
//       setTimeout(() => setShowScratch(true), 1000);
//     } else {
//       setScratchDone(true);
//       setShowConfetti(true);
//     }

//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handleScratchClose = () => {
//     setShowScratch(false);
//     setScratchDone(true);
//     setShowConfetti(true);
//   };

//   return (
//     <div className="min-h-screen bg-white flex flex-col items-center justify-center pt-20 pb-20 px-4 text-center relative overflow-hidden">

//       {showConfetti && (
//         <Confetti
//           width={windowSize.width}
//           height={windowSize.height}
//           recycle={false}
//           numberOfPieces={220}
//           gravity={0.12}
//           colors={["#581a90", "#34d399", "#facc15", "#000", "#f472b6"]}
//         />
//       )}

//       {showScratch && (
//         <ScratchCard
//           onCouponRevealed={c => setCouponWon(c)}
//           onClose={handleScratchClose}
//         />
//       )}

//       {/* Check icon */}
//       <div className="relative mb-12 animate-in zoom-in duration-500">
//         <div className="w-32 h-32 bg-emerald-50 rounded-full flex items-center justify-center border-4 border-emerald-100 shadow-xl">
//           <Check className="text-emerald-500" size={64} strokeWidth={2.5} />
//         </div>
//         <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-[#581a90] rounded-full flex items-center justify-center text-white shadow-xl animate-in fade-in slide-in-from-bottom-3 duration-500 delay-300">
//           <Package size={22} />
//         </div>
//       </div>

//       <div className="space-y-3 mb-10 max-w-md">
//         <h1 className="text-emerald-500 text-4xl md:text-6xl font-black uppercase tracking-[-2px] scale-y-[1.3] origin-center leading-none">
//           ORDER PLACED!
//         </h1>
//         <p className="text-zinc-400 font-bold text-xs uppercase tracking-[0.3em] mt-4 block">
//           #{orderId}
//         </p>
//         <p className="text-sm leading-relaxed text-gray-500 pt-2">
//           Your order is confirmed. We'll start processing it right away!
//         </p>

//         {couponWon && (
//           <div className="mt-5 bg-[#581a90]/10 border border-[#581a90]/20 rounded-2xl p-4">
//             <p className="text-xs font-bold text-[#581a90] uppercase tracking-widest">🎁 Coupon Saved!</p>
//             <p className="font-black text-xl text-[#581a90] mt-1">{couponWon}</p>
//             <p className="text-xs text-gray-400 mt-1">Use at checkout on your next order</p>
//           </div>
//         )}
//       </div>

//       <div className="flex flex-col sm:flex-row gap-4">
//         <button onClick={() => navigate("/my-orders")}
//           className="group bg-black text-white px-8 py-4 rounded-2xl flex items-center gap-3 font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-zinc-800 transition-all cursor-pointer">
//           <Package size={15} /> View My Orders
//         </button>
//         <button onClick={() => navigate("/")}
//           className="group bg-zinc-50 text-zinc-900 px-8 py-4 rounded-2xl flex items-center gap-3 font-black text-xs uppercase tracking-[0.2em] border border-zinc-100 hover:border-black transition-all cursor-pointer">
//           Continue Shopping
//           <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
//         </button>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Check, Package, ArrowRight } from "lucide-react";
import ScratchCard from "./ScratchCard";

// Pure CSS confetti — no external package needed
function ConfettiPiece({ style }) {
  return <div style={style} />;
}

function Confetti() {
  const pieces = Array.from({ length: 80 }, (_, i) => {
    const colors = ["#581a90", "#34d399", "#facc15", "#000000", "#f472b6", "#60a5fa"];
    const color = colors[i % colors.length];
    const left = Math.random() * 100;
    const delay = Math.random() * 2;
    const duration = 2.5 + Math.random() * 2;
    const size = 6 + Math.random() * 8;
    const isRect = Math.random() > 0.5;
    return {
      position: "fixed",
      top: "-20px",
      left: `${left}vw`,
      width: `${isRect ? size : size / 2}px`,
      height: `${isRect ? size / 2 : size}px`,
      backgroundColor: color,
      borderRadius: isRect ? "2px" : "50%",
      animation: `confettiFall ${duration}s ease-in ${delay}s forwards`,
      zIndex: 9999,
      transform: `rotate(${Math.random() * 360}deg)`,
      opacity: 0,
    };
  });

  return (
    <>
      <style>{`
        @keyframes confettiFall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
      {pieces.map((style, i) => (
        <ConfettiPiece key={i} style={style} />
      ))}
    </>
  );
}

export default function OrderSuccess() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const orderId = state?.orderId || "VEL-XXXXX";

  const [showScratch, setShowScratch] = useState(false);
  const [scratchDone, setScratchDone] = useState(false);
  const [couponWon, setCouponWon] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const used = JSON.parse(localStorage.getItem("veltorn_scratch_used") || "[]");
    const userId = JSON.parse(localStorage.getItem("veltorn_user") || "{}")?._id || "guest";
    const alreadyUsed = used.includes(userId);

    if (!alreadyUsed) {
      setTimeout(() => setShowScratch(true), 800);
    } else {
      setScratchDone(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, []);

  const handleScratchClose = () => {
    setShowScratch(false);
    setScratchDone(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center pt-20 pb-20 px-4 text-center relative overflow-hidden">

      {showConfetti && <Confetti />}

      {showScratch && (
        <ScratchCard
          onCouponRevealed={(c) => setCouponWon(c)}
          onClose={handleScratchClose}
        />
      )}

      {/* Check icon */}
      <div className="relative mb-12 animate-in zoom-in duration-500">
        <div className="w-32 h-32 bg-emerald-50 rounded-full flex items-center justify-center border-4 border-emerald-100 shadow-xl">
          <Check className="text-emerald-500" size={64} strokeWidth={2.5} />
        </div>
        <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-[#581a90] rounded-full flex items-center justify-center text-white shadow-xl animate-in fade-in slide-in-from-bottom-3 duration-500 delay-300">
          <Package size={22} />
        </div>
      </div>

      <div className="space-y-3 mb-10 max-w-md">
        <h1 className="text-emerald-500 text-4xl md:text-6xl font-black uppercase tracking-[-2px] scale-y-[1.3] origin-center leading-none">
          ORDER PLACED!
        </h1>
        <p className="text-zinc-400 font-bold text-xs uppercase tracking-[0.3em] mt-4 block">
          #{orderId}
        </p>
        <p className="text-sm leading-relaxed text-gray-500 pt-2">
          Your order is confirmed. We'll start processing it right away!
        </p>

        {couponWon && (
          <div className="mt-5 bg-[#581a90]/10 border border-[#581a90]/20 rounded-2xl p-4">
            <p className="text-xs font-bold text-[#581a90] uppercase tracking-widest">🎁 Coupon Saved!</p>
            <p className="font-black text-xl text-[#581a90] mt-1">{couponWon}</p>
            <p className="text-xs text-gray-400 mt-1">Use at checkout on your next order</p>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate("/my-orders")}
          className="group bg-black text-white px-8 py-4 rounded-2xl flex items-center gap-3 font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-zinc-800 transition-all cursor-pointer"
        >
          <Package size={15} /> View My Orders
        </button>
        <button
          onClick={() => navigate("/")}
          className="group bg-zinc-50 text-zinc-900 px-8 py-4 rounded-2xl flex items-center gap-3 font-black text-xs uppercase tracking-[0.2em] border border-zinc-100 hover:border-black transition-all cursor-pointer"
        >
          Continue Shopping
          <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}