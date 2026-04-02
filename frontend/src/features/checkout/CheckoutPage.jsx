import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../cart/CartContext";
import { CreditCard, Truck, CheckCircle, Ticket } from "lucide-react";

export default function CheckoutPage() {
  const { cartItems, subtotal } = useCart();
  const navigate = useNavigate();
  
  // States for Address & Number
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");

  // Calculations
  const gstRate = 0.18; // 18% GST
  const gstAmount = subtotal * gstRate;
  const shippingCharge = subtotal > 1500 ? 0 : 100; // Free above 1500
  const total = subtotal + gstAmount + shippingCharge;

  if (cartItems.length === 0) {
      navigate("/"); // Agar cart khali ho toh home bhejo
      return null;
  }

  return (
    <div className="min-h-screen bg-zinc-50 pt-40 pb-20 px-4 md:px-12 lg:px-20 relative z-10" data-cursor="black">
      
      {/* Header */}
      <div className="mb-12">
          <h1 className="text-black text-6xl md:text-8xl font-black uppercase tracking-[-5px] scale-y-[1.5] origin-left leading-none">
            secure <span className="text-zinc-200">Checkout</span>
          </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* LEFT: SHIPPING & ADDRESS FORM */}
        <div className="w-full lg:w-2/3 space-y-10">
          
          {/* Address Section */}
          <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm">
            <h2 className="text-lg font-black uppercase tracking-wider mb-8 flex items-center gap-3">
              <Truck className="text-emerald-500" />
              1. Delivery Address
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone Number (10 digits) *" className="col-span-1 border border-zinc-100 bg-zinc-50 rounded-xl px-5 py-4 text-sm font-bold w-full outline-none focus:ring-1 focus:ring-black" />
                <input type="text" placeholder="Full Name *" className="col-span-1 border border-zinc-100 bg-zinc-50 rounded-xl px-5 py-4 text-sm font-bold w-full outline-none focus:ring-1 focus:ring-black" />
                <textarea value={address} onChange={e => setAddress(e.target.value)} placeholder="Full Address (House No, Street, Landmark) *" className="col-span-full border border-zinc-100 bg-zinc-50 rounded-xl px-5 py-4 text-sm font-bold w-full outline-none focus:ring-1 focus:ring-black h-24 resize-none" />
                <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="City / State *" className="col-span-1 border border-zinc-100 bg-zinc-50 rounded-xl px-5 py-4 text-sm font-bold w-full outline-none focus:ring-1 focus:ring-black" />
                <input type="text" value={pincode} onChange={e => setPincode(e.target.value)} placeholder="Pincode *" className="col-span-1 border border-zinc-100 bg-zinc-50 rounded-xl px-5 py-4 text-sm font-bold w-full outline-none focus:ring-1 focus:ring-black" />
            </div>
          </div>

          {/* Payment Section */}
          <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm">
            <h2 className="text-lg font-black uppercase tracking-wider mb-8 flex items-center gap-3">
              <CreditCard className="text-[#581a90]" />
              2. Payment Method
            </h2>
            
            <div className="space-y-4">
              {[
                {id: 'upi', label: 'UPI (GPay, PhonePe, Paytm)', desc: 'Pay instantly using your preferred UPI app.'},
                {id: 'card', label: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay accepted.'},
                {id: 'cod', label: 'Cash On Delivery (COD)', desc: 'Pay in cash when your order is delivered.'},
              ].map(method => (
                <label key={method.id} className="flex items-start gap-4 p-5 border border-zinc-100 rounded-2xl cursor-pointer hover:bg-zinc-50 transition-colors has-checked:border-black has-checked:bg-zinc-50">
                    <input type="radio" name="payment_method" value={method.id} defaultChecked={method.id === 'upi'} className="mt-1 accent-black h-4 w-4 shrink-0" />
                    <div>
                        <span className="font-bold text-sm uppercase text-black">{method.label}</span>
                        <p className="text-xs text-gray-400 mt-1">{method.desc}</p>
                    </div>
                </label>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT: ORDER SUMMARY */}
        <div className="w-full lg:w-1/3">
          <div className="sticky top-40 space-y-6">
              
              {/* Items Summary */}
              <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm">
                <h3 className="font-bold text-sm uppercase tracking-widest text-zinc-400 mb-6">Order Summary</h3>
                <div className="space-y-4 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-zinc-100">
                    {cartItems.map(item => (
                        <div key={`${item.id}-${item.size}`} className="flex justify-between items-center gap-4 border-b border-zinc-50 pb-4 last:border-0 last:pb-0">
                            <div className="flex gap-3 items-center flex-1">
                                <img src={item.img} alt={item.name} className="w-12 h-14 object-cover rounded-lg bg-zinc-50" />
                                <div>
                                    <p className="text-xs font-black uppercase text-black leading-tight truncate max-w-37.5">{item.name}</p>
                                    <p className="text-[10px] font-bold text-zinc-300 uppercase mt-0.5">Size: {item.size} | Qty: {item.quantity}</p>
                                </div>
                            </div>
                            <span className="text-xs font-black text-black">₹{(parseInt(item.price) * item.quantity).toLocaleString('en-IN')}</span>
                        </div>
                    ))}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm space-y-4">
                  
                  {/* Coupon Code Input */}
                  <div className="flex gap-2 border border-zinc-100 bg-zinc-50 rounded-xl p-2 mb-6">
                    <Ticket className="text-zinc-300 mt-2 ml-2" size={18}/>
                    <input type="text" placeholder="Coupon Code (optional)" className="flex-1 bg-transparent px-2 py-2 text-xs font-bold outline-none" />
                    <button className="bg-zinc-200 text-zinc-600 px-4 py-2 rounded-lg font-bold text-[10px] hover:bg-black hover:text-white transition">APPLY</button>
                  </div>

                  <div className="flex justify-between text-xs font-bold text-zinc-500 uppercase">
                      <span>Subtotal</span>
                      <span className="text-black">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold text-zinc-500 uppercase">
                      <span>GST (18%)</span>
                      <span className="text-black">₹{gstAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold text-zinc-500 uppercase border-b border-zinc-100 pb-4 mb-4">
                      <span>Shipping</span>
                      <span className={`${shippingCharge === 0 ? 'text-emerald-500 font-extrabold' : 'text-black'}`}>
                        {shippingCharge === 0 ? "FREE" : `₹${shippingCharge}`}
                      </span>
                  </div>
                  <div className="flex justify-between font-black text-black text-lg uppercase tracking-tight scale-y-[1.2]">
                      <span>Total</span>
                      <span>₹{total.toLocaleString('en-IN')}</span>
                  </div>

                  <button 
                    onClick={() => {
                        if(!address || !phone || !city || !pincode) {
                            alert("Please fill all required shipping details.");
                            return;
                        }
                        // COD selection logic (simplified)
                        const method = document.querySelector('input[name="payment_method"]:checked').value;
                        if(method === 'cod') {
                            localStorage.removeItem("veltorn_cart"); // Cart clear karo
                            navigate("/order-success"); // Success page bhejo
                        } else {
                            alert("Online Payment Gateway Integration (Razorpay/Stripe) is required here for UPI/Card.");
                        }
                    }}
                    className="w-full bg-[#581a90] text-white h-16 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-purple-900/20 hover:opacity-90 transition-all cursor-pointer flex items-center justify-center gap-3 mt-8"
                  >
                     PLACE ORDER (₹{total.toLocaleString('en-IN')})
                     <CheckCircle size={18}/>
                  </button>
              </div>

          </div>
        </div>

      </div>

    </div>
  );
}