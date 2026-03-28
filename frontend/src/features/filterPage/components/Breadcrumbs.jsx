import React from "react";
import { Home, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Breadcrumbs = ({ activeFilter, activeAnime, resetFilters }) => {
  const navigate = useNavigate();

  const handleShopAllClick = () => {
    if (resetFilters) {
      resetFilters(); // Ye function saare active filters (T-shirt, Anime etc.) ko "All" kar dega
    }
    navigate("/collections/all");
  };

  return (
    <div className="flex items-center gap-1 mb-6 mt-8 text-xs">
      {/* HOME ICON */}
      <div 
        onClick={() => navigate("/")} 
        className="p-2 bg-gray-100 text-gray-400 rounded-md cursor-pointer hover:bg-black hover:text-white transition"
      >
        <Home size={14} />
      </div>

      <ChevronRight size={12} className="text-gray-300" />

      {/* SHOP ALL BUTTON */}
      <div 
        onClick={handleShopAllClick} 
        className={`px-3 py-2 rounded-md cursor-pointer font-bold uppercase tracking-tighter transition 
          ${(activeFilter === "All" && !activeAnime) 
            ? "bg-gray-100 text-black shadow-sm" 
            : "bg-gray-100 text-gray-400 hover:bg-black hover:text-white"
          }`}
      >
        Shop All
      </div>

      {/* DYNAMIC CATEGORY (Only shows if something is selected) */}
      {(activeFilter !== "All" || activeAnime) && (
        <>
          <ChevronRight size={12} className="text-gray-300" />
          <span className="px-3 py-2 bg-gray-100 rounded-md font-bold uppercase tracking-widest text-black animate-in fade-in duration-300">
            {activeAnime || activeFilter}
          </span>
        </>
      )}
    </div>
  );
};

export default Breadcrumbs;