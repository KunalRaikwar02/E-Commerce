function CollectionBanner() {
  return (
    <section className="relative mt-14 sm:mt-16 md:mt-20">
      
      {/* Background Image */}
      <img
        src="/assets/images/vintage.jpeg"
        alt="Pink Floyd Collection"
        className="w-full h-100 sm:h-137.5 md:h-162.5 lg:h-200 object-cover object-center"
        style={{ imageOrientation: "none" }}
      />

      {/* Left Bottom Overlay */}
      <div className="absolute bottom-0 left-0 text-left flex flex-col gap-1 sm:gap-2 md:gap-3 lg:gap-4 p-4 sm:p-6 md:p-10 max-w-[95%] sm:max-w-[80%] md:max-w-[65%]">
        
        {/* COLLECTION */}
        <span className="text-[10px] sm:text-xs md:text-sm lg:text-base text-gray-300 uppercase tracking-[1px] scale-y-[1.3] sm:scale-y-150">
          COLLECTION
        </span>

        {/* PINK FLOYD WORLD TOUR */}
        <h2 className="text-xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white tracking-[1px] scale-y-[1.3] sm:scale-y-150 mt-1">
          PINK FLOYD WORLD TOUR
        </h2>

        {/* PINK FLOYD COLLECTION TOUR */}
        <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-[1px] scale-y-[1.3] sm:scale-y-150">
          PINK FLOYD COLLECTION TOUR
        </h1>

        {/* Button */}
        <button className="mt-3 bg-black text-white px-3 sm:px-4 md:px-5 py-2 cursor-pointer rounded-md flex items-center gap-2 hover:bg-gray-800 transition text-xs sm:text-sm md:text-base w-max">
          EXPLORE COLLECTION
          <span className="text-base sm:text-lg md:text-xl">→</span>
        </button>
      </div>
    </section>
  );
}

export default CollectionBanner;