function CollectionBanner() {
  return (
    <section className="relative mt-20">
      {/* Background Image */}
      <img
        src="/assets/images/vintage.jpeg"
        alt="Pink Floyd Collection"
        className="w-full h-200 object-cover object-center "
        style={{ imageOrientation: "none" }}
      />

      {/* Left Bottom Overlay */}
      <div className="absolute bottom-0 left-0 text-left flex flex-col gap-1 sm:gap-2 md:gap-3 lg:gap-4 p-4 sm:p-6">
        {/* COLLECTION */}
        <span className="text-xs sm:text-sm md:text-base text-gray-300 uppercase tracking-[1px]  scale-y-160">
          COLLECTION
        </span>

        {/* PINK FLOYD WORLD TOUR */}
        <h2 className="text-4xl sm:text-6xl md:text-5xl lg:text-6xl font-semibold text-white tracking-[1px]  scale-y-160 mb-4 mt-1">
          PINK FLOYD WORLD TOUR
        </h2>

        {/* PINK FLOYD COLLECTION TOUR */}
        <h1 className="text-1xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-white tracking-[1px]  scale-y-160">
          PINK FLOYD COLLECTION TOUR
        </h1>

        {/* Button */}
        <button className="mt-2 sm:mt-2 md:mt-3 bg-black text-white px-3 py-2 cursor-pointer rounded-md flex items-center gap-1.5 hover:bg-gray-800 transition text-xs sm:text-sm md:text-base w-max ">
          EXPLORE COLLECTION{" "}
          <span className="text-base sm:text-lg md:text-xl">→</span>
        </button>
      </div>
    </section>
  );
}

export default CollectionBanner;
