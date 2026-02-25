import React from "react";

function FollowSection() {
  return (
    <section className="mt-45 px-10">
      {/* ================= HEADING ================= */}
      <div className="text-center">
        <p className="text-sm text-gray-400 tracking-wide">[follow us]</p>

        <h2 className="text-5xl font-bold text-black mt-4 tracking-[-1px] scale-y-150">VELTORN MOMENTS</h2>
      </div>

      {/* ================= BLACK STRIP ================= */}
      {/* Wrapper for centering */}
      <div className="mt-8 flex justify-center">
        <div className="inline-flex items-center gap-4 bg-black px-3 py-1.5 rounded-sm cursor-pointer">
          <span className="text-white text-sm font-semibold tracking-wide">
            VELTORNCLOTHES
          </span>

          {/* Instagram SVG Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-white"
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

      {/* ================= IMAGE ROW ================= */}
     <div className="mt-16">
  <div className="overflow-x-auto scrollbar-hide w-full">
    <div className="flex gap-8 w-max px-6 items-center">

      {/* 1 - Circle */}
      <img
        src="/assets/images/follow2.jpg"
        alt="moment1"
        className="w-44 h-44 object-cover rounded-full shrink-0"
      />

      {/* 2 - Small Round Rectangle */}
      <img
        src="/assets/images/follow5.jpg"
        alt="moment2"
        className="w-44 h-56 object-cover rounded-lg shrink-0"
      />

      {/* 3 - More Rounded Rectangle */}
      <img
        src="/assets/images/follow1.jpg"
        alt="moment3"
        className="w-44 h-56 object-cover rounded-4xl shrink-0"
      />

      {/* 4 - Circle */}
      <img
        src="/assets/images/follow3.jpg"
        alt="moment4"
        className="w-44 h-44 object-cover rounded-full shrink-0"
      />

      {/* 5 - Small Round Rectangle */}
      <img
        src="/assets/images/follow4.jpg"
        alt="moment5"
        className="w-44 h-56 object-cover rounded-lg shrink-0"
      />

      {/* 6 - More Rounded Rectangle */}
      <img
        src="/assets/images/follow6.jpg"
        alt="moment6"
        className="w-44 h-56 object-cover rounded-4xl shrink-0"
      />

      {/* 7 - Circle */}
      <img
        src="/assets/images/follow7.jpg"
        alt="moment7"
        className="w-44 h-44 object-cover rounded-full shrink-0"
      />

      {/* 8 - Small Round Rectangle */}
      <img
        src="/assets/images/follow8.jpg"
        alt="moment8"
        className="w-44 h-56 object-cover rounded-lg shrink-0"
      />

    </div>
  </div>
</div>
    </section>
  );
}

export default FollowSection;
