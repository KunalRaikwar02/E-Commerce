import React from "react";

function AnimeTopBanner() {
  const items = Array(6).fill("FREE SHIPPING WITHIN INDIA");

  return (
    <div className="bg-[#581a90] overflow-hidden fixed top-0 left-0 w-full z-50">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        
        {/* Duplicate container for smooth infinite scroll */}
        {[...items, ...items].map((text, index) => (
          <span
            key={index}
            className="
              px-6 sm:px-8 md:px-12
              py-1 sm:py-2
              text-xs sm:text-sm
              text-white font-semibold
            "
          >
            {text}
          </span>
        ))}

      </div>
    </div>
  );
}

export default AnimeTopBanner;