import React, { useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Hook import karo
import ProductCard from "./components/ProductCard";
import CategoryCard from "./components/CategoryCard";
import AnimeFollowSection from "./components/AnimeFollowSection";

const AnimeCollection = () => {
  const topPicksRef = useRef(null);
  const navigate = useNavigate();

  const topPicks = [
    { id: 1, name: "Giyu Tomioka Oversized", price: "999", img: "/assets/images/tshirt11.png", collection: "DEMON SLAYER SERIES" },
    { id: 2, name: "Naruto Sage Mode Tee", price: "899", img: "/assets/images/tshirt2.jpeg", collection: "SHIPPUDEN EDITION" },
    { id: 3, name: "Luffy Gear 5 Special", price: "1099", img: "/assets/images/tshirt3.jpeg", collection: "ONE PIECE WORLD" },
    { id: 4, name: "Solo Leveling Shadow", price: "899", img: "/assets/images/tshirt4.jpeg", collection: "HUNTER COLLECTION" },
    { id: 5, name: "Solo Leveling Shadow", price: "899", img: "/assets/images/tshirt4.jpeg", collection: "HUNTER COLLECTION" },
    { id: 6, name: "Solo Leveling Shadow", price: "899", img: "/assets/images/tshirt4.jpeg", collection: "HUNTER COLLECTION" },
  ];

  const animeCategories = [
    { id: 1, name: "Naruto", label: "NARUTO / NARUTO SHIPPUDEN", items: "12 ITEMS", img: "/assets/images/tshirt2.jpeg" },
    { id: 2, name: "Solo Leveling", label: "SOLO LEVELING", items: "12 ITEMS", img: "/assets/images/tshirt4.jpeg" },
    { id: 3, name: "Demon Slayer", label: "DEMON SLAYER", items: "12 ITEMS", img: "/assets/images/tshirt5.jpeg" },
    { id: 4, name: "One Piece", label: "ONE PIECE", items: "12 ITEMS", img: "/assets/images/tshirt3.jpeg" },
  ];

  const scroll = (ref, direction) => {
    const container = ref.current;
    const amount = 450;
    container.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  // Helper function for Navigation
  const navigateToFilter = (type, value) => {
    window.scrollTo(0, 0);
    // Agar anime hai toh 'anime' key bhejenge, warna 'filter'
    const state = type === "anime" ? { anime: value } : { filter: value };
    navigate("/collections/all", { state });
  };

  return (
    <div className="min-h-screen bg-white mt-8 overflow-x-hidden">
      <div className="w-full">
        <img src="/assets/images/collectionimg.png" alt="Banner" className="w-full h-[40vh] md:h-[70vh] object-cover object-top" />
      </div>

      {/* TOP PICKS */}
      <div className="px-4 md:px-6 lg:px-10 mt-16">
        <div className="flex justify-between items-center mb-3 py-4">
          <h2 className="text-[#581a90] text-3xl md:text-6xl font-black uppercase tracking-[-3px] scale-y-[1.6] origin-left leading-none">TOP PICKS FOR YOU</h2>
          <button 
            onClick={() => navigateToFilter("filter", "All")}
            className="group bg-[#581a90] text-white px-5 py-2.5 rounded-md flex items-center gap-2 text-[10px] md:text-xs font-bold tracking-[2px] hover:bg-purple-800 transition-all shrink-0 uppercase cursor-pointer"
          >
            VIEW ALL <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Scroll Buttons */}
        <div className="flex justify-end gap-3 mb-4">
          <button onClick={() => scroll(topPicksRef, "left")} className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 text-zinc-500 hover:text-[#581a90] hover:border-[#581a90] transition-all rounded-sm font-bold text-[10px] uppercase tracking-widest cursor-pointer group">
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Prev
          </button>
          <button onClick={() => scroll(topPicksRef, "right")} className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 text-zinc-500 hover:text-[#581a90] hover:border-[#581a90] transition-all rounded-sm font-bold text-[10px] uppercase tracking-widest cursor-pointer group">
            Next <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div ref={topPicksRef} className="flex gap-x-4 md:gap-x-6 overflow-x-auto pb-16 scrollbar-hide py-2 items-start snap-x">
          {topPicks.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* ANIME COLLECTION */}
      <div className="px-4 md:px-6 lg:px-10 mt-26">
        <div className="flex justify-between items-center mb-12 py-4">
          <h2 className="text-[#581a90] text-3xl md:text-6xl font-black uppercase tracking-[-3px] scale-y-[1.6] origin-left leading-none">ANIME COLLECTION</h2>
          <button 
            onClick={() => navigateToFilter("filter", "All")}
            className="group bg-[#581a90] text-white px-5 py-2.5 rounded-md flex items-center gap-2 text-[10px] md:text-xs font-bold tracking-[2px] hover:bg-purple-800 transition-all shrink-0 uppercase cursor-pointer"
          >
            SHOP ALL <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {animeCategories.map((cat, index) => (
            <div 
              key={cat.id} 
              onClick={() => navigateToFilter("anime", cat.name)} // Naruto, Solo Leveling etc.
              className="cursor-pointer"
            >
              <CategoryCard cat={cat} isNew={index === 0} />
            </div>
          ))}
        </div>
      </div>

      <AnimeFollowSection />
    </div>
  );
};

export default AnimeCollection;