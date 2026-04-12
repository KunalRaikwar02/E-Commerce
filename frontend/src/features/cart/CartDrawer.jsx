import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "./CartContext";
import { useAuth } from "../auth/AuthContext";
import AuthModal from "../auth/AuthModal";

const CartDrawer = () => {
  const { cartItems, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, subtotal, totalItems } = useCart();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [showAuth, setShowAuth] = useState(false);

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    if (!isLoggedIn) {
      setShowAuth(true);
      return;
    }
    setIsCartOpen(false);
    navigate("/checkout");
  };

  const handleAuthClose = () => {
    setShowAuth(false);
    if (isLoggedIn) {
      setIsCartOpen(false);
      navigate("/checkout");
    }
  };

  return (
    <>
      {showAuth && <AuthModal onClose={handleAuthClose} />}

      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-200 flex justify-end animate-in fade-in duration-200"
        onClick={() => setIsCartOpen(false)}
      >
        <div
          className="w-full sm:w-105 h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100">
            <h2 className="text-black text-xl font-black uppercase tracking-tighter">
              Your Cart <span className="text-sm opacity-40 ml-1">({totalItems})</span>
            </h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 hover:bg-red-50 hover:text-red-500 transition cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {cartItems.length === 0 ? (
              <div className="text-center py-20 flex flex-col items-center gap-4 text-gray-300">
                <ShoppingBag size={48} strokeWidth={1} />
                <p className="font-bold text-sm uppercase tracking-widest">Your bag is empty.</p>
                <button
                  onClick={() => { setIsCartOpen(false); navigate("/collections/all"); }}
                  className="text-xs font-black text-black underline uppercase tracking-widest cursor-pointer hover:text-[#581a90] transition mt-2"
                >
                  Shop Now
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex gap-4 border-b border-gray-50 pb-5 last:border-0 last:pb-0">
                  {/* Image */}
                  <div className="w-20 h-24 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 shrink-0">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between py-0.5">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h3 className="font-black text-xs uppercase text-black leading-tight tracking-tight">{item.name}</h3>
                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mt-1">Size: {item.size}</p>
                      </div>
                      {/* Delete Button */}
                      <button
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="text-gray-300 hover:text-red-500 transition cursor-pointer shrink-0 p-1"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div className="flex justify-between items-center mt-3">
                      <span className="font-black text-sm text-[#581a90]">
                        ₹{(parseInt(item.price) * item.quantity).toLocaleString("en-IN")}
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                          className="w-9 h-9 flex items-center justify-center text-black hover:bg-gray-50 border-r border-gray-100 cursor-pointer font-black transition"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="w-9 text-center text-xs font-black text-black">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                          className="w-9 h-9 flex items-center justify-center text-black hover:bg-gray-50 border-l border-gray-100 cursor-pointer font-black transition"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-gray-100 bg-gray-50">
              <div className="flex justify-between items-center mb-2 font-black text-black text-base uppercase tracking-tight">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <p className="text-xs text-gray-400 mb-4">Taxes & shipping calculated at checkout.</p>
              <button
                onClick={handleCheckout}
                className="w-full bg-black text-white h-14 rounded-2xl font-black text-sm uppercase tracking-[0.15em] hover:bg-zinc-800 transition-all cursor-pointer flex items-center justify-center gap-3 shadow-lg"
              >
                {isLoggedIn ? "Proceed to Checkout" : "Login to Checkout"}
                <ShoppingBag size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;