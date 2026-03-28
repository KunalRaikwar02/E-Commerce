import React from "react";
import { useNavigate } from "react-router-dom"; 
import { ArrowRight } from "lucide-react"; // Icon import kiya

function CollectionBanner() {
  const navigate = useNavigate();

  const handleExplore = () => {
    window.scrollTo(0, 0); // Naye page par top se start ho
    navigate("/anime-collection"); // Naya route jo tumne banaya hai
  };

  return (
    <section className="relative mt-14 sm:mt-16 md:mt-20">
      
      {/* Background Image */}
      <img
        src="/assets/images/vintage.jpeg"
        alt="Anime Collection"
        className="w-full h-100 sm:h-137.5 md:h-162.5 lg:h-200 object-cover object-center"
        style={{ imageOrientation: "none" }}
      />

      {/* Left Bottom Overlay */}
      <div className="absolute bottom-0 left-0 text-left flex flex-col gap-1 sm:gap-2 md:gap-3 lg:gap-4 p-4 sm:p-6 md:p-10 max-w-[95%] sm:max-w-[80%] md:max-w-[65%]">
        
        {/* COLLECTION */}
        <span className="text-[10px] sm:text-xs md:text-sm lg:text-base text-gray-300 uppercase tracking-[1px] scale-y-[1.3] sm:scale-y-150">
          COLLECTION
        </span>

        {/* MAIN TITLE */}
        <h2 className="text-xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white tracking-[1px] scale-y-[1.3] sm:scale-y-150 mt-1">
          ULTIMATE ANIME DROP
        </h2>

        {/* SUBTITLE */}
        <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-[1px] scale-y-[1.3] sm:scale-y-150">
          LIMITED EDITION SERIES
        </h1>

        {/* Button with ArrowRight Icon */}
        <button 
          onClick={handleExplore}
          className="group mt-3 bg-black text-white px-3 sm:px-4 md:px-5 py-2 cursor-pointer rounded-md flex items-center gap-2 hover:bg-gray-800 transition text-xs sm:text-sm md:text-base w-max font-bold tracking-[1px]"
        >
          EXPLORE COLLECTION
          <ArrowRight 
            size={18} 
            className="group-hover:translate-x-1 transition-transform" 
          />
        </button>
      </div>
    </section>
  );
}

export default CollectionBanner;