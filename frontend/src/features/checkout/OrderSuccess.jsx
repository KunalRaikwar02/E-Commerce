import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Package, ArrowRight } from "lucide-react";
import Confetti from "react-confetti"; // `npm install react-confetti` required

export default function OrderSuccess() {
  const navigate = useNavigate();
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    // Window resize handler for Confetti
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center pt-20 pb-20 px-4 text-center">
      
      {/* Confetti Animation (Optional) */}
      <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={300} gravity={0.1} colors={['#581a90', '#34d399', '#facc15', '#000000']}/>

      {/* Animated Tick Circle */}
      <div className="relative mb-12 animate-in zoom-in duration-700">
        <div className="w-40 h-40 bg-emerald-50 rounded-full flex items-center justify-center border-4 border-emerald-100 shadow-xl shadow-emerald-500/10">
          <Check className="text-emerald-500 stroke-5" size={80}/>
        </div>
        <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-[#581a90] rounded-full flex items-center justify-center text-white shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            <Package size={30}/>
        </div>
      </div>

      {/* Message - Stretched Typography */}
      <div className="space-y-4 mb-16 max-w-lg">
          <h1 className="text-emerald-500 text-5xl md:text-7xl font-black uppercase tracking-[-3px] scale-y-[1.5] origin-center leading-none">
            SUCCESSFULLY <span className="text-zinc-900">PLACED</span>
          </h1>
          <p className="text-zinc-500 font-bold text-xs uppercase tracking-[0.3em] mt-8 block">CURATED ORDER / #VEL-4091A</p>
          <p className="text-sm leading-relaxed text-black pt-4">
            Congratulations! Your order has been curated and is ready for dispatch. A confirmation email with tracking details will be sent to you shortly. Thank you for choosing VELTORN.
          </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => navigate("/")}
            className="group bg-black text-white px-8 py-4 rounded-2xl flex items-center gap-3 font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-zinc-800 transition-all cursor-pointer"
          >
            <Package size={16}/>
            VIEW MY ORDERS
          </button>
          <button 
            onClick={() => navigate("/")}
            className="group bg-zinc-50 text-zinc-900 px-8 py-4 rounded-2xl flex items-center gap-3 font-black text-xs uppercase tracking-[0.2em] border border-zinc-100 hover:border-black transition-all cursor-pointer"
          >
            CONTINUE SHOPPING
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
      </div>

    </div>
  );
}