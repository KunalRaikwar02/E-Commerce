import React, { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

const FilterSidebar = ({ 
  activeFilter, setActiveFilter, activeAnime, setActiveAnime, 
  selectedPriceRange, setSelectedPriceRange, selectedSize, setSelectedSize, 
  handleReset, setCurrentPage, counts // 'counts' prop yahan se aayega
}) => {
  const [openSection, setOpenSection] = useState({ productType: true, anime: true, price: true, size: true });

  const toggle = (sec) => setOpenSection(prev => ({ ...prev, [sec]: !prev[sec] }));

  return (
    <aside className="w-full lg:w-64 space-y-2 shrink-0 animate-in fade-in slide-in-from-left-4 duration-300">
      
      {/* PRODUCT TYPE */}
      <div className="bg-[#fcfcfc] border border-gray-100 rounded-lg overflow-hidden shadow-sm">
        <div onClick={() => toggle('productType')} className="flex justify-between items-center p-3 cursor-pointer hover:bg-gray-50 transition">
          <span className="font-bold text-[11px] uppercase">Product Type</span>
          {openSection.productType ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
        </div>
        {openSection.productType && (
          <div className="px-3 pb-3 space-y-1">
            {Object.keys(counts.types).map((cat) => (
              <div key={cat} onClick={() => {setActiveFilter(cat); setActiveAnime(null); setCurrentPage(1);}}
                className={`flex justify-between items-center cursor-pointer px-2 py-1.5 rounded transition-all text-[11px] font-bold ${activeFilter === cat && !activeAnime ? "bg-black text-white" : "text-gray-500 hover:text-black"}`}>
                <span>{cat}</span> 
                <span className={`text-[9px] ${activeFilter === cat && !activeAnime ? "text-white/70" : "opacity-60"}`}>
                  {counts.types[cat]}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ANIME COLLECTION */}
      <div className="bg-[#fcfcfc] border border-gray-100 rounded-lg overflow-hidden shadow-sm mt-2">
        <div onClick={() => toggle('anime')} className="flex justify-between items-center p-3 cursor-pointer hover:bg-gray-50 transition">
          <span className="font-bold text-[11px] uppercase">Anime Collection</span>
          {openSection.anime ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
        </div>
        {openSection.anime && (
          <div className="px-3 pb-3 space-y-1">
            {Object.keys(counts.animes).map((anim) => (
              <div key={anim} onClick={() => {setActiveAnime(anim); setActiveFilter("All"); setCurrentPage(1);}}
                className={`flex justify-between items-center cursor-pointer px-2 py-1.5 rounded transition-all text-[11px] font-bold ${activeAnime === anim ? "bg-black text-white" : "text-gray-500 hover:text-black"}`}>
                <span>{anim}</span> 
                <span className={`text-[9px] ${activeAnime === anim ? "text-white/70" : "opacity-60"}`}>
                  {counts.animes[anim]}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* PRICE WITH CHECKBOXES */}
      <div className="bg-[#fcfcfc] border border-gray-100 rounded-lg overflow-hidden shadow-sm mt-2">
        <div onClick={() => toggle('price')} className="flex justify-between items-center p-3 cursor-pointer hover:bg-gray-50 transition">
          <span className="font-bold text-[11px] uppercase">Shop by Price</span>
          {openSection.price ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
        </div>
        
        {openSection.price && (
          <div className="px-3 pb-3 space-y-1">
            {[
              {label: "Under ₹499", val: "under499"}, 
              {label: "₹599 - ₹799", val: "599-799"}, 
              {label: "₹899 - ₹999", val: "899-999"}, 
              {label: "Over ₹999", val: "over999"}
            ].map((p) => (
              <div 
                key={p.val} 
                onClick={() => {setSelectedPriceRange(selectedPriceRange === p.val ? null : p.val); setCurrentPage(1);}}
                className="group flex items-center gap-3 cursor-pointer px-2 py-2 rounded-md transition-all hover:bg-gray-50"
              >
                {/* Custom Checkbox */}
                <div className={`
                  w-4 h-4 rounded border flex items-center justify-center transition-all duration-200
                  ${selectedPriceRange === p.val 
                    ? "bg-black border-black shadow-[0_0_8px_rgba(0,0,0,0.1)]" 
                    : "bg-white border-gray-300 group-hover:border-black"}
                `}>
                  {selectedPriceRange === p.val && (
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-in zoom-in duration-200"></div>
                  )}
                </div>

                <span className={`
                  text-[11px] font-bold transition-colors
                  ${selectedPriceRange === p.val ? "text-black" : "text-gray-500 group-hover:text-black"}
                `}>
                  {p.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SIZE */}
      <div className="bg-[#fcfcfc] border border-gray-100 rounded-lg overflow-hidden shadow-sm mt-2">
        <div onClick={() => toggle('size')} className="flex justify-between items-center p-3 cursor-pointer hover:bg-gray-50 transition">
          <span className="font-bold text-[11px] uppercase">Size</span>
          {openSection.size ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
        </div>
        {openSection.size && (
          <div className="px-3 pb-3 grid grid-cols-3 gap-1">
            {['S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
              <button key={sz} onClick={() => {setSelectedSize(selectedSize === sz ? null : sz); setCurrentPage(1);}} 
                className={`py-2 text-[10px] font-bold rounded border transition-all ${selectedSize === sz ? "bg-black text-white border-black" : "bg-white border-gray-100 hover:border-black text-gray-400"}`}>
                {sz}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* RESET BUTTON */}
      <button onClick={handleReset} className="w-full py-3 mt-4 font-bold text-[10px] border border-black rounded-lg hover:bg-black hover:text-white transition uppercase tracking-widest">
        Reset All
      </button>
    </aside>
  );
};

export default FilterSidebar;