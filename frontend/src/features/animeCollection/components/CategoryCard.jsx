import React from "react";

const CategoryCard = ({ cat, isNew }) => (
  <div className="w-full group cursor-pointer">
    <div className="relative overflow-hidden bg-[#f9f9f9] h-95 md:h-120 w-full rounded-2xl shadow-sm border border-zinc-100 transition-all duration-500">
      {isNew && (
        <div className="absolute top-4 left-4 z-20">
          <span className="bg-green-600 text-white text-[11px] px-2.5 py-1 rounded-full font-extrabold shadow-lg flex items-center justify-center leading-none uppercase tracking-widest">
            NEW
          </span>
        </div>
      )}
      <img 
        src={cat.img} 
        alt={cat.name} 
        className="w-full h-full object-cover group-hover:object-contain transition-all duration-700 ease-in-out group-hover:blur-[5px] rounded-2xl" 
      />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 bg-black/5">
        <div className="bg-[#581a90] text-white px-6 py-2 rounded-lg shadow-2xl transform translate-y-6 group-hover:translate-y-0 transition-all duration-300 font-bold tracking-widest text-sm text-nowrap">
          VIEW ALL
        </div>
      </div>
    </div>
    <div className="mt-4 px-1 space-y-1">
      <h3 className="text-sm md:text-base font-black uppercase text-zinc-900 leading-tight group-hover:text-[#581a90] transition-colors">{cat.name}</h3>
      <p className="text-[11px] md:text-[12px] text-zinc-400 font-bold uppercase tracking-widest">{cat.items}</p>
    </div>
  </div>
);

export default CategoryCard;