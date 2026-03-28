import React from "react";
import { ShoppingCart } from "lucide-react";

const ProductCard = ({ product }) => (
  <div className="min-w-70 md:min-w-85 transition-all duration-500 ease-in-out hover:min-w-115 md:hover:min-w-130 group cursor-pointer snap-start">
    <div className="relative overflow-hidden bg-[#f9f9f9] h-95 md:h-120 w-full rounded-2xl shadow-sm transition-all duration-500 border border-zinc-100">
      
      {/* Badge (Har Product pe dikhega jaisa tumhare original code mein tha) */}
      <div className="absolute top-4 left-4 z-20">
        <span className="bg-green-600 text-white text-[11px] px-2.5 py-1 rounded-full font-extrabold shadow-lg flex items-center justify-center leading-none uppercase tracking-widest">
          NEW
        </span>
      </div>

      {/* Product Image */}
      <img 
        src={product.img} 
        alt={product.name} 
        className="w-full h-full object-cover group-hover:object-contain transition-all duration-700 ease-in-out group-hover:blur-[5px] rounded-2xl" 
      />

      {/* Hover Price Box (Purple) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 bg-black/5">
        <div className="bg-[#581a90] text-white px-3 py-1.5 rounded-lg flex items-center gap-4 shadow-2xl transform translate-y-6 group-hover:translate-y-0 transition-all duration-300">
          <ShoppingCart size={20} />
          <span className="text-base font-bold">
            ₹ {product.price} 
            <span className="text-xs opacity-60 ml-1 font-medium text-nowrap uppercase">INR</span>
          </span>
        </div>
      </div>
    </div>

    {/* Product Details */}
    <div className="mt-4 px-1 space-y-1">
      <h3 className="text-sm md:text-base font-black uppercase text-zinc-900 leading-tight transition-colors group-hover:text-[#581a90]">
        {product.name}
      </h3>
      <p className="text-[11px] md:text-[12px] text-zinc-400 font-bold uppercase tracking-widest">
        {product.collection}
      </p>
    </div>
  </div>
);

export default ProductCard;