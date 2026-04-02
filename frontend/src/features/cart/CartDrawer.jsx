import React from "react";
import { useNavigate } from "react-router-dom";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

import { useCart } from "./CartContext";

export default function CartDrawer() {
  const { cartItems, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, subtotal, totalItems } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCartOpen(false); 
    navigate("/checkout");
  };

  return (
    // Overlay backdrop
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-200 flex justify-end transition-opacity duration-300 animate-in fade-in" onClick={() => setIsCartOpen(false)}>
      
      {/* Drawer Panel - Responsive width */}
      <div 
        className="w-full sm:w-112.5 h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-500"
        onClick={(e) => e.stopPropagation()} 
      >
        
        {/* Header - Stretched Typography */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100 mt-2">
          <h2 className="text-black text-2xl font-black uppercase tracking-tighter scale-y-[1.3] origin-left">
            Your Cart <span className="text-sm opacity-50 ml-1">({totalItems})</span>
          </h2>
          <button onClick={() => setIsCartOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 hover:bg-red-50 hover:text-red-500 transition cursor-pointer">
            <X size={20} />
          </button>
        </div>

        {/* Cart Items List - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-gray-100">
          {cartItems.length === 0 ? (
            <div className="text-center py-20 flex flex-col items-center gap-4 text-gray-300">
                <ShoppingBag size={50} strokeWidth={1}/>
                <p className="font-bold text-sm uppercase tracking-widest">Your bag is empty.</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex gap-5 border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                
                {/* Product Image */}
                <div className="w-24 h-28 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 shrink-0">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                        <h3 className="font-black text-sm uppercase text-black leading-tight tracking-tight">{item.name}</h3>
                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mt-1">Size: {item.size}</p>
                    </div>
                    {/* Delete Button */}
                    <button onClick={() => removeFromCart(item.id, item.size)} className="text-gray-300 hover:text-red-500 transition cursor-pointer">
                        <Trash2 size={16} />
                    </button>
                  </div>

                  {/* Price & Quantity Controller */}
                  <div className="flex justify-between items-center mt-3">
                    <span className="font-black text-sm text-[#581a90]">₹{item.price}</span>
                    
                    <div className="flex items-center border border-gray-100 rounded-lg overflow-hidden bg-white">
                      <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-black hover:bg-gray-50 border-r border-gray-100 cursor-pointer">
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-xs font-black text-black">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-black hover:bg-gray-50 border-l border-gray-100 cursor-pointer">
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer - Checkout Button */}
        <div className="p-6 border-t border-gray-100 bg-gray-50 mt-auto">
          <div className="flex justify-between items-center mb-5 font-black text-black text-lg uppercase tracking-tight scale-y-[1.2]">
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString('en-IN')}</span>
          </div>
          <p className="text-xs text-gray-400 mb-5">Shipping, taxes, and discounts calculated at checkout.</p>
          
          <button 
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
            className="w-full bg-black text-white h-14 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-gray-200 hover:bg-zinc-800 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            PROCEED TO CHECKOUT
            <ShoppingBag size={18}/>
          </button>
        </div>
      </div>
    </div>
  );
}