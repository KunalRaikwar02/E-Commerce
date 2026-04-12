import React from "react";

function FollowSection() {
  const handleInstagramClick = () => {
    window.open("https://www.instagram.com/veltornclothes", "_blank");
  };

  return (
    <section className="mt-24 sm:mt-32 md:mt-45 px-4 sm:px-6 md:px-10">

      <div className="text-center">
        <p className="text-xs sm:text-sm text-gray-400 tracking-wide">[follow us]</p>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-black mt-4 tracking-[-1px] scale-y-[1.3] sm:scale-y-150">
          VELTORN MOMENTS
        </h2>
      </div>

      {/* Instagram Strip */}
      <div className="mt-8 flex justify-center">
        <div
          onClick={handleInstagramClick}
          className="inline-flex items-center gap-3 sm:gap-4 bg-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-sm cursor-pointer hover:bg-gray-900 transition"
        >
          <span className="text-white text-xs sm:text-sm font-semibold tracking-wide">VELTORNCLOTHES</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1.5" />
          </svg>
        </div>
      </div>

      {/* Image Row */}
      <div className="mt-12 sm:mt-16">
        <div className="overflow-x-auto scrollbar-hide w-full">
          <div className="flex gap-6 sm:gap-8 w-max px-4 sm:px-6 items-center">
            <img src="/assets/images/follow2.jpg" alt="moment1" className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 object-cover rounded-full shrink-0" />
            <img src="/assets/images/follow5.jpg" alt="moment2" className="w-28 h-40 sm:w-36 sm:h-48 md:w-44 md:h-56 object-cover rounded-lg shrink-0" />
            <img src="/assets/images/follow1.jpg" alt="moment3" className="w-28 h-40 sm:w-36 sm:h-48 md:w-44 md:h-56 object-cover rounded-3xl shrink-0" />
            <img src="/assets/images/follow3.jpg" alt="moment4" className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 object-cover rounded-full shrink-0" />
            <img src="/assets/images/follow4.jpg" alt="moment5" className="w-28 h-40 sm:w-36 sm:h-48 md:w-44 md:h-56 object-cover rounded-lg shrink-0" />
            <img src="/assets/images/follow6.jpg" alt="moment6" className="w-28 h-40 sm:w-36 sm:h-48 md:w-44 md:h-56 object-cover rounded-3xl shrink-0" />
            <img src="/assets/images/follow7.jpg" alt="moment7" className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 object-cover rounded-full shrink-0" />
            <img src="/assets/images/follow8.jpg" alt="moment8" className="w-28 h-40 sm:w-36 sm:h-48 md:w-44 md:h-56 object-cover rounded-lg shrink-0" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default FollowSection;