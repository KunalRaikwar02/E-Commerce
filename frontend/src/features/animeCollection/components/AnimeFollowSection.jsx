import React from "react";

function AnimeFollowSection() {
  return (
    <section className="mt-24 sm:mt-32 md:mt-40 px-1 sm:px-2 md:px-4 mb-20">
      
      {/* ================= HEADING ================= */}
      <div className="text-center">
        <p className="text-xs sm:text-sm text-gray-400 font-bold">
          [ follow us ]
        </p>

        <h2 className="text-[#581a90] text-2xl sm:text-4xl md:text-6xl font-black mt-4 tracking-[-3px] uppercase scale-y-[1.4] origin-center">
          VELTORN MOMENTS
        </h2>
      </div>

      {/* ================= PURPLE STRIP ================= */}
    {/* ================= PURPLE STRIP (Exact Original Layout) ================= */}
      <div className="mt-8 flex justify-center">
        <div className="inline-flex items-center gap-3 sm:gap-4 bg-[#581a90] px-3 sm:px-4 py-1.5 sm:py-2 rounded-sm cursor-pointer hover:bg-purple-800 transition">
          
          <span className="text-white text-xs sm:text-sm font-semibold tracking-wide uppercase">
            VELTORNCLOTHES
          </span>

          {/* Instagram SVG Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 sm:w-6 sm:h-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1.5" />
          </svg>
        </div>
      </div>

      {/* ================= IMAGE ROW (Same logic as main) ================= */}
      <div className="mt-12 sm:mt-16">
        <div className="overflow-x-auto scrollbar-hide w-full">
          <div className="flex gap-6 sm:gap-8 w-max px-4 sm:px-6 items-center">
            {/* Images are the same, just keeping the layout clean */}
            <img src="/assets/images/follow2.jpg" alt="1" className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 object-cover rounded-full shrink-0 border-2 border-purple-50 hover:scale-105 transition-transform duration-500" />
            <img src="/assets/images/follow5.jpg" alt="2" className="w-28 h-40 sm:w-36 sm:h-48 md:w-44 md:h-56 object-cover rounded-lg shrink-0 hover:scale-105 transition-transform duration-500" />
            <img src="/assets/images/follow1.jpg" alt="3" className="w-28 h-40 sm:w-36 sm:h-48 md:w-44 md:h-56 object-cover rounded-3xl shrink-0 hover:scale-105 transition-transform duration-500" />
            <img src="/assets/images/follow3.jpg" alt="4" className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 object-cover rounded-full shrink-0 border-2 border-purple-50 hover:scale-105 transition-transform duration-500" />
            <img src="/assets/images/follow4.jpg" alt="5" className="w-28 h-40 sm:w-36 sm:h-48 md:w-44 md:h-56 object-cover rounded-lg shrink-0 hover:scale-105 transition-transform duration-500" />
            <img src="/assets/images/follow6.jpg" alt="6" className="w-28 h-40 sm:w-36 sm:h-48 md:w-44 md:h-56 object-cover rounded-3xl shrink-0 hover:scale-105 transition-transform duration-500" />
            <img src="/assets/images/follow7.jpg" alt="7" className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 object-cover rounded-full shrink-0 border-2 border-purple-50 hover:scale-105 transition-transform duration-500" />
            <img src="/assets/images/follow8.jpg" alt="8" className="w-28 h-40 sm:w-36 sm:h-48 md:w-44 md:h-56 object-cover rounded-lg shrink-0 hover:scale-105 transition-transform duration-500" />
          </div>
        </div>
      </div>

    </section>
  );
}

export default AnimeFollowSection;