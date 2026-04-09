// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { useCart } from "../cart/CartContext";
// // import { useAuth } from "../auth/AuthContext";
// // import { orderAPI } from "../../services/api";
// // import { CreditCard, Truck, CheckCircle, Ticket, Tag } from "lucide-react";

// // const VALID_COUPONS = { "VELT500": 500, "VELT200": 200, "VELT150": 150 };
// // const COUPON_SUGGESTIONS = [
// //   { code: "VELT500", label: "Save ₹500" },
// //   { code: "VELT200", label: "Save ₹200" },
// //   { code: "VELT150", label: "Save ₹150" },
// // ];

// // const loadRazorpay = () => new Promise((resolve) => {
// //   if (window.Razorpay) { resolve(true); return; }
// //   const script = document.createElement("script");
// //   script.src = "https://checkout.razorpay.com/v1/checkout.js";
// //   script.onload = () => resolve(true);
// //   script.onerror = () => resolve(false);
// //   document.body.appendChild(script);
// // });

// // export default function CheckoutPage() {
// //   const { cartItems, subtotal, clearCart } = useCart();
// //   const { user, isLoggedIn } = useAuth();
// //   const navigate = useNavigate();

// //   // Pre-fill from user profile
// //   const [fullName, setFullName] = useState(user?.name || "");
// //   const [phone, setPhone] = useState(user?.phone || "");
// //   const [address, setAddress] = useState(user?.address?.street || "");
// //   const [city, setCity] = useState(user?.address?.city || "");
// //   const [pincode, setPincode] = useState(user?.address?.pincode || "");
// //   const [paymentMethod, setPaymentMethod] = useState("COD");
// //   const [loading, setLoading] = useState(false);

// //   const [couponInput, setCouponInput] = useState("");
// //   const [appliedCoupon, setAppliedCoupon] = useState(null);
// //   const [couponDiscount, setCouponDiscount] = useState(0);
// //   const [couponError, setCouponError] = useState("");
// //   const [showSuggestions, setShowSuggestions] = useState(false);

// //   useEffect(() => {
// //     const saved = localStorage.getItem("veltorn_coupon");
// //     if (saved) setCouponInput(saved);
// //   }, []);

// //   const validatePhone = (p) => /^[6-9]\d{9}$/.test(p);
// //   const gstAmount = parseFloat((subtotal * 0.18).toFixed(2));
// //   const shippingCharge = subtotal > 1500 ? 0 : 100;
// //   const total = Math.max(0, subtotal + gstAmount + shippingCharge - couponDiscount);

// //   if (cartItems.length === 0) { navigate("/"); return null; }

// //   const handleApplyCoupon = () => {
// //     const code = couponInput.trim().toUpperCase();
// //     if (!code) { setCouponError("Enter a coupon code"); return; }
// //     if (VALID_COUPONS[code]) {
// //       setAppliedCoupon(code);
// //       setCouponDiscount(VALID_COUPONS[code]);
// //       setCouponError("");
// //       setShowSuggestions(false);
// //       localStorage.removeItem("veltorn_coupon");
// //     } else {
// //       setCouponError("Invalid coupon code");
// //       setAppliedCoupon(null);
// //       setCouponDiscount(0);
// //     }
// //   };

// //   const handleRemoveCoupon = () => {
// //     setAppliedCoupon(null);
// //     setCouponDiscount(0);
// //     setCouponInput("");
// //     setCouponError("");
// //   };

// //   const buildOrderPayload = (method) => ({
// //     items: cartItems.map(item => ({
// //       product: item.id,
// //       name: item.name,
// //       price: item.price,
// //       img: item.img,
// //       size: item.size,
// //       quantity: item.quantity,
// //     })),
// //     shippingAddress: { fullName, phone, street: address, city, pincode },
// //     paymentMethod: method,
// //     coupon: appliedCoupon,
// //     discount: couponDiscount,
// //   });

// //   const handleCOD = async () => {
// //     setLoading(true);
// //     try {
// //       const data = await orderAPI.place(buildOrderPayload("COD"));
// //       clearCart();
// //       navigate("/order-success", { state: { orderId: data.order.orderId } });
// //     } catch (err) {
// //       alert("Order failed: " + err.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleRazorpay = async () => {
// //     const loaded = await loadRazorpay();
// //     if (!loaded) { alert("Razorpay failed to load. Please try COD."); return; }

// //     setLoading(true);
// //     try {
// //       // Place order in backend first
// //       const orderData = await orderAPI.place(buildOrderPayload(paymentMethod));
// //       const internalOrderId = orderData.order._id;
// //       const orderId = orderData.order.orderId;

// //       // Get Razorpay order
// //       const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
// //       const rzpRes = await fetch(`${BASE_URL}/payment/create-order`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ amount: total, orderId }),
// //       });
// //       const rzpData = await rzpRes.json();
// //       if (!rzpRes.ok) throw new Error(rzpData.message);

// //       const options = {
// //         key: rzpData.keyId,
// //         amount: rzpData.amount,
// //         currency: rzpData.currency,
// //         name: "VELTORN",
// //         description: `Order #${orderId}`,
// //         order_id: rzpData.razorpayOrderId,
// //         prefill: { name: fullName, contact: phone, email: user?.email || "" },
// //         theme: { color: "#581a90" },
// //         handler: async (response) => {
// //           const verifyRes = await fetch(`${BASE_URL}/payment/verify`, {
// //             method: "POST",
// //             headers: { "Content-Type": "application/json" },
// //             body: JSON.stringify({
// //               razorpay_order_id: response.razorpay_order_id,
// //               razorpay_payment_id: response.razorpay_payment_id,
// //               razorpay_signature: response.razorpay_signature,
// //               internalOrderId,
// //             }),
// //           });
// //           const verifyData = await verifyRes.json();
// //           if (verifyData.success) {
// //             clearCart();
// //             navigate("/order-success", { state: { orderId } });
// //           } else {
// //             alert("Payment verification failed. Contact support.");
// //           }
// //         },
// //         modal: { ondismiss: () => { setLoading(false); } },
// //       };

// //       const rzp = new window.Razorpay(options);
// //       rzp.on("payment.failed", () => { setLoading(false); alert("Payment failed. Please try again."); });
// //       rzp.open();
// //     } catch (err) {
// //       setLoading(false);
// //       alert("Error: " + err.message);
// //     }
// //   };

// //   const handlePlaceOrder = () => {
// //     if (!fullName || !phone || !address || !city || !pincode) {
// //       alert("Please fill all required shipping details."); return;
// //     }
// //     if (!validatePhone(phone)) {
// //       alert("Please enter a valid 10-digit Indian mobile number."); return;
// //     }
// //     if (paymentMethod === "COD") handleCOD();
// //     else handleRazorpay();
// //   };

// //   return (
// //     <div className="min-h-screen bg-zinc-50 pb-20 px-4 md:px-12 lg:px-20">
// //       <div className="pt-36 mb-10">
// //         <h1 className="text-black text-5xl md:text-7xl font-black uppercase tracking-[-4px] scale-y-[1.4] origin-left leading-none">
// //           Secure <span className="text-zinc-200">Checkout</span>
// //         </h1>
// //       </div>

// //       <div className="flex flex-col lg:flex-row gap-10">
// //         {/* LEFT */}
// //         <div className="w-full lg:w-2/3 space-y-8">

// //           {/* Address */}
// //           <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm">
// //             <h2 className="text-base font-black uppercase tracking-wider mb-6 flex items-center gap-3">
// //               <Truck className="text-emerald-500" size={18} /> 1. Delivery Address
// //             </h2>
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
// //               <input type="text" value={fullName} onChange={e => setFullName(e.target.value)}
// //                 placeholder="Full Name *"
// //                 className="border border-zinc-100 bg-zinc-50 rounded-xl px-5 py-4 text-sm font-bold outline-none focus:ring-1 focus:ring-black" />
// //               <div>
// //                 <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
// //                   placeholder="Mobile Number (10 digits) *"
// //                   className={`w-full border bg-zinc-50 rounded-xl px-5 py-4 text-sm font-bold outline-none focus:ring-1 focus:ring-black ${phone && !validatePhone(phone) ? "border-red-300" : "border-zinc-100"}`} />
// //                 {phone && !validatePhone(phone) && <p className="text-xs text-red-400 font-bold mt-1">Enter valid 10-digit number</p>}
// //               </div>
// //               <textarea value={address} onChange={e => setAddress(e.target.value)}
// //                 placeholder="Full Address *"
// //                 className="col-span-full border border-zinc-100 bg-zinc-50 rounded-xl px-5 py-4 text-sm font-bold outline-none focus:ring-1 focus:ring-black h-24 resize-none" />
// //               <input type="text" value={city} onChange={e => setCity(e.target.value)}
// //                 placeholder="City / State *"
// //                 className="border border-zinc-100 bg-zinc-50 rounded-xl px-5 py-4 text-sm font-bold outline-none focus:ring-1 focus:ring-black" />
// //               <input type="text" value={pincode} onChange={e => setPincode(e.target.value)}
// //                 placeholder="Pincode *"
// //                 className="border border-zinc-100 bg-zinc-50 rounded-xl px-5 py-4 text-sm font-bold outline-none focus:ring-1 focus:ring-black" />
// //             </div>
// //             {/* Warning if address not saved in profile */}
// //             {(!user?.address?.street || !user?.address?.city) && (
// //               <p className="text-xs text-amber-500 font-bold mt-3">
// //                 💡 Save your address in <span className="underline cursor-pointer" onClick={() => navigate("/profile")}>My Profile</span> for faster checkout next time.
// //               </p>
// //             )}
// //           </div>

// //           {/* Payment */}
// //           <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm">
// //             <h2 className="text-base font-black uppercase tracking-wider mb-6 flex items-center gap-3">
// //               <CreditCard className="text-[#581a90]" size={18} /> 2. Payment Method
// //             </h2>
// //             <div className="space-y-3">
// //               {[
// //                 { id: "UPI", label: "UPI (GPay, PhonePe, Paytm)", desc: "Pay instantly via Razorpay." },
// //                 { id: "CARD", label: "Credit / Debit Card", desc: "Visa, Mastercard, RuPay — powered by Razorpay." },
// //                 { id: "COD", label: "Cash On Delivery", desc: "Pay cash when your order arrives." },
// //               ].map(method => (
// //                 <label key={method.id} onClick={() => setPaymentMethod(method.id)}
// //                   className={`flex items-start gap-4 p-4 border rounded-2xl cursor-pointer transition ${paymentMethod === method.id ? "border-black bg-zinc-50" : "border-zinc-100 hover:bg-zinc-50"}`}>
// //                   <div className={`w-4 h-4 mt-1 rounded-full border-2 flex items-center justify-center shrink-0 ${paymentMethod === method.id ? "border-black" : "border-zinc-300"}`}>
// //                     {paymentMethod === method.id && <div className="w-2 h-2 bg-black rounded-full" />}
// //                   </div>
// //                   <div>
// //                     <span className="font-bold text-sm uppercase text-black">{method.label}</span>
// //                     <p className="text-xs text-gray-400 mt-0.5">{method.desc}</p>
// //                   </div>
// //                 </label>
// //               ))}
// //             </div>
// //           </div>
// //         </div>

// //         {/* RIGHT */}
// //         <div className="w-full lg:w-1/3">
// //           <div className="sticky top-36 space-y-5">

// //             {/* Items */}
// //             <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm">
// //               <h3 className="font-bold text-xs uppercase tracking-widest text-zinc-400 mb-5">Order Summary</h3>
// //               <div className="space-y-4 max-h-56 overflow-y-auto pr-2">
// //                 {cartItems.map(item => (
// //                   <div key={`${item.id}-${item.size}`} className="flex justify-between items-center gap-4 border-b border-zinc-50 pb-4 last:border-0 last:pb-0">
// //                     <div className="flex gap-3 items-center flex-1">
// //                       <img src={item.img} alt={item.name} className="w-11 h-14 object-cover rounded-lg bg-zinc-50 shrink-0" />
// //                       <div>
// //                         <p className="text-xs font-black uppercase text-black leading-tight truncate max-w-32.5">{item.name}</p>
// //                         <p className="text-[10px] font-bold text-zinc-400 mt-0.5">Size: {item.size} · Qty: {item.quantity}</p>
// //                       </div>
// //                     </div>
// //                     <span className="text-xs font-black text-black">₹{(parseInt(item.price) * item.quantity).toLocaleString("en-IN")}</span>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>

// //             {/* Coupon + Price */}
// //             <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm space-y-4">
// //               {appliedCoupon ? (
// //                 <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-4 py-3">
// //                   <div className="flex items-center gap-2">
// //                     <Tag size={13} className="text-green-600" />
// //                     <span className="text-sm font-black text-green-700">{appliedCoupon}</span>
// //                     <span className="text-xs text-green-600">-₹{couponDiscount}</span>
// //                   </div>
// //                   <button onClick={handleRemoveCoupon} className="text-red-400 text-xs font-bold hover:text-red-600 cursor-pointer">Remove</button>
// //                 </div>
// //               ) : (
// //                 <div className="relative">
// //                   <div className="flex gap-2 border border-zinc-100 bg-zinc-50 rounded-xl p-2">
// //                     <Ticket className="text-zinc-300 mt-2 ml-2 shrink-0" size={15} />
// //                     <input type="text" value={couponInput}
// //                       onChange={e => { setCouponInput(e.target.value); setCouponError(""); }}
// //                       onFocus={() => setShowSuggestions(true)}
// //                       onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
// //                       placeholder="Coupon Code"
// //                       className="flex-1 bg-transparent px-2 py-1.5 text-xs font-bold outline-none uppercase" />
// //                     <button onClick={handleApplyCoupon}
// //                       className="bg-zinc-200 text-zinc-600 px-3 py-2 rounded-lg font-bold text-[10px] hover:bg-black hover:text-white transition cursor-pointer">
// //                       APPLY
// //                     </button>
// //                   </div>
// //                   {showSuggestions && (
// //                     <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-100 rounded-xl shadow-lg z-10 overflow-hidden">
// //                       {COUPON_SUGGESTIONS.map(c => (
// //                         <button key={c.code} onClick={() => { setCouponInput(c.code); setShowSuggestions(false); }}
// //                           className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition cursor-pointer border-b border-gray-50 last:border-0">
// //                           <div className="flex items-center gap-2">
// //                             <Tag size={11} className="text-[#581a90]" />
// //                             <span className="text-xs font-black">{c.code}</span>
// //                           </div>
// //                           <span className="text-xs text-green-600 font-bold">{c.label}</span>
// //                         </button>
// //                       ))}
// //                     </div>
// //                   )}
// //                   {couponError && <p className="text-xs text-red-400 font-bold mt-1">{couponError}</p>}
// //                 </div>
// //               )}

// //               <div className="space-y-2.5 pt-2 border-t border-zinc-50">
// //                 <div className="flex justify-between text-xs font-bold text-zinc-500 uppercase">
// //                   <span>Subtotal</span><span className="text-black">₹{subtotal.toLocaleString("en-IN")}</span>
// //                 </div>
// //                 <div className="flex justify-between text-xs font-bold text-zinc-500 uppercase">
// //                   <span>GST (18%)</span><span className="text-black">₹{gstAmount.toLocaleString("en-IN")}</span>
// //                 </div>
// //                 <div className="flex justify-between text-xs font-bold text-zinc-500 uppercase">
// //                   <span>Shipping</span>
// //                   <span className={shippingCharge === 0 ? "text-emerald-500 font-extrabold" : "text-black"}>
// //                     {shippingCharge === 0 ? "FREE" : `₹${shippingCharge}`}
// //                   </span>
// //                 </div>
// //                 {couponDiscount > 0 && (
// //                   <div className="flex justify-between text-xs font-bold text-green-600 uppercase">
// //                     <span>Discount ({appliedCoupon})</span><span>-₹{couponDiscount}</span>
// //                   </div>
// //                 )}
// //                 <div className="flex justify-between font-black text-black text-lg uppercase border-t border-zinc-100 pt-3">
// //                   <span>Total</span><span>₹{total.toLocaleString("en-IN")}</span>
// //                 </div>
// //               </div>

// //               <button onClick={handlePlaceOrder} disabled={loading}
// //                 className="w-full bg-[#581a90] text-white h-14 rounded-2xl font-black text-sm uppercase tracking-[0.15em] shadow-xl hover:opacity-90 transition-all cursor-pointer flex items-center justify-center gap-3 disabled:opacity-50">
// //                 {loading ? (
// //                   <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
// //                 ) : (
// //                   <><CheckCircle size={16} /> Place Order (₹{total.toLocaleString("en-IN")})</>
// //                 )}
// //               </button>

// //               {paymentMethod !== "COD" && (
// //                 <p className="text-center text-[10px] text-gray-400 font-bold">🔒 Secured by Razorpay</p>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }



// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../cart/CartContext";
// import { useAuth } from "../auth/AuthContext";
// import { orderAPI } from "../../services/api";
// import { CreditCard, Truck, CheckCircle, Ticket, Tag } from "lucide-react";

// // ── Coupon rules ──────────────────────────────────────────────
// // VELT500 → ₹500 off  (min order ₹1200)
// // VELT200 → ₹200 off  (min order ₹800)
// // VELT150 → ₹150 off  (min order ₹500)
// const COUPON_RULES = {
//   "VELT500": { discount: 500, minOrder: 1200, label: "Save ₹500 on orders above ₹1200" },
//   "VELT200": { discount: 200, minOrder: 800,  label: "Save ₹200 on orders above ₹800" },
//   "VELT150": { discount: 150, minOrder: 500,  label: "Save ₹150 on orders above ₹500" },
// };

// const COUPON_SUGGESTIONS = [
//   { code: "VELT500", label: "Save ₹500 (min ₹1200)" },
//   { code: "VELT200", label: "Save ₹200 (min ₹800)" },
//   { code: "VELT150", label: "Save ₹150 (min ₹500)" },
// ];

// const loadRazorpay = () => new Promise((resolve) => {
//   if (window.Razorpay) { resolve(true); return; }
//   const script = document.createElement("script");
//   script.src = "https://checkout.razorpay.com/v1/checkout.js";
//   script.onload = () => resolve(true);
//   script.onerror = () => resolve(false);
//   document.body.appendChild(script);
// });

// export default function CheckoutPage() {
//   const { cartItems, subtotal, clearCart } = useCart();
//   const { user, isLoggedIn } = useAuth();
//   const navigate = useNavigate();

//   // Pre-fill from user profile
//   const [fullName, setFullName] = useState(user?.name || "");
//   const [phone, setPhone] = useState(user?.phone || "");
//   const [address, setAddress] = useState(user?.address?.street || "");
//   const [city, setCity] = useState(user?.address?.city || "");
//   const [pincode, setPincode] = useState(user?.address?.pincode || "");
//   const [paymentMethod, setPaymentMethod] = useState("COD");
//   const [loading, setLoading] = useState(false);

//   const [couponInput, setCouponInput] = useState("");
//   const [appliedCoupon, setAppliedCoupon] = useState(null);
//   const [couponDiscount, setCouponDiscount] = useState(0);
//   const [couponError, setCouponError] = useState("");
//   const [showSuggestions, setShowSuggestions] = useState(false);

//   useEffect(() => {
//     const saved = localStorage.getItem("veltorn_coupon");
//     if (saved) setCouponInput(saved);
//   }, []);

//   const validatePhone = (p) => /^[6-9]\d{9}$/.test(p);
//   const gstAmount = parseFloat((subtotal * 0.18).toFixed(2));
//   const shippingCharge = subtotal > 1500 ? 0 : 100;
//   const total = Math.max(0, subtotal + gstAmount + shippingCharge - couponDiscount);

//   if (cartItems.length === 0) { navigate("/"); return null; }

//   const handleApplyCoupon = () => {
//     const code = couponInput.trim().toUpperCase();
//     if (!code) { setCouponError("Enter a coupon code"); return; }

//     const rule = COUPON_RULES[code];
//     if (!rule) {
//       setCouponError("Invalid coupon code");
//       setAppliedCoupon(null);
//       setCouponDiscount(0);
//       return;
//     }

//     // Check minimum order amount
//     if (subtotal < rule.minOrder) {
//       setCouponError(`Minimum order of ₹${rule.minOrder} required for ${code}`);
//       setAppliedCoupon(null);
//       setCouponDiscount(0);
//       return;
//     }

//     // Valid coupon + meets minimum
//     setAppliedCoupon(code);
//     setCouponDiscount(rule.discount);
//     setCouponError("");
//     setShowSuggestions(false);
//     localStorage.removeItem("veltorn_coupon");
//   };

//   const handleRemoveCoupon = () => {
//     setAppliedCoupon(null);
//     setCouponDiscount(0);
//     setCouponInput("");
//     setCouponError("");
//   };

//   const buildOrderPayload = (method) => ({
//     items: cartItems.map(item => ({
//       product: item.id,
//       name: item.name,
//       price: item.price,
//       img: item.img,
//       size: item.size,
//       quantity: item.quantity,
//     })),
//     shippingAddress: { fullName, phone, street: address, city, pincode },
//     paymentMethod: method,
//     coupon: appliedCoupon,
//     discount: couponDiscount,
//   });

//   const handleCOD = async () => {
//     setLoading(true);
//     try {
//       const data = await orderAPI.place(buildOrderPayload("COD"));
//       clearCart();
//       navigate("/order-success", { state: { orderId: data.order.orderId } });
//     } catch (err) {
//       alert("Order failed: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRazorpay = async () => {
//     const loaded = await loadRazorpay();
//     if (!loaded) { alert("Razorpay failed to load. Please try COD."); return; }

//     setLoading(true);
//     try {
//       const orderData = await orderAPI.place(buildOrderPayload(paymentMethod));
//       const internalOrderId = orderData.order._id;
//       const orderId = orderData.order.orderId;

//       const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
//       const rzpRes = await fetch(`${BASE_URL}/payment/create-order`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ amount: total, orderId }),
//       });
//       const rzpData = await rzpRes.json();
//       if (!rzpRes.ok) throw new Error(rzpData.message);

//       const options = {
//         key: rzpData.keyId,
//         amount: rzpData.amount,
//         currency: rzpData.currency,
//         name: "VELTORN",
//         description: `Order #${orderId}`,
//         order_id: rzpData.razorpayOrderId,
//         prefill: { name: fullName, contact: phone, email: user?.email || "" },
//         theme: { color: "#581a90" },
//         handler: async (response) => {
//           const verifyRes = await fetch(`${BASE_URL}/payment/verify`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//               internalOrderId,
//             }),
//           });
//           const verifyData = await verifyRes.json();
//           if (verifyData.success) {
//             clearCart();
//             navigate("/order-success", { state: { orderId } });
//           } else {
//             alert("Payment verification failed. Contact support.");
//           }
//         },
//         modal: { ondismiss: () => { setLoading(false); } },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.on("payment.failed", () => { setLoading(false); alert("Payment failed. Please try again."); });
//       rzp.open();
//     } catch (err) {
//       setLoading(false);
//       alert("Error: " + err.message);
//     }
//   };

//   const handlePlaceOrder = () => {
//     if (!fullName || !phone || !address || !city || !pincode) {
//       alert("Please fill all required shipping details."); return;
//     }
//     if (!validatePhone(phone)) {
//       alert("Please enter a valid 10-digit Indian mobile number."); return;
//     }
//     if (paymentMethod === "COD") handleCOD();
//     else handleRazorpay();
//   };

//   return (
//     <div className="min-h-screen bg-zinc-50 pb-20 px-4 md:px-12 lg:px-20">
//       <div className="pt-36 mb-10">
//         <h1 className="text-black text-5xl md:text-7xl font-black uppercase tracking-[-4px] scale-y-[1.4] origin-left leading-none">
//           Secure <span className="text-zinc-200">Checkout</span>
//         </h1>
//       </div>

//       <div className="flex flex-col lg:flex-row gap-10">
//         {/* LEFT */}
//         <div className="w-full lg:w-2/3 space-y-8">

//           {/* Address */}
//           <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm">
//             <h2 className="text-base font-black uppercase tracking-wider mb-6 flex items-center gap-3">
//               <Truck className="text-emerald-500" size={18} /> 1. Delivery Address
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//               <input type="text" value={fullName} onChange={e => setFullName(e.target.value)}
//                 placeholder="Full Name *"
//                 className="border border-zinc-100 bg-zinc-50 rounded-xl px-5 py-4 text-sm font-bold outline-none focus:ring-1 focus:ring-black" />
//               <div>
//                 <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
//                   placeholder="Mobile Number (10 digits) *"
//                   className={`w-full border bg-zinc-50 rounded-xl px-5 py-4 text-sm font-bold outline-none focus:ring-1 focus:ring-black ${phone && !validatePhone(phone) ? "border-red-300" : "border-zinc-100"}`} />
//                 {phone && !validatePhone(phone) && <p className="text-xs text-red-400 font-bold mt-1">Enter valid 10-digit number</p>}
//               </div>
//               <textarea value={address} onChange={e => setAddress(e.target.value)}
//                 placeholder="Full Address *"
//                 className="col-span-full border border-zinc-100 bg-zinc-50 rounded-xl px-5 py-4 text-sm font-bold outline-none focus:ring-1 focus:ring-black h-24 resize-none" />
//               <input type="text" value={city} onChange={e => setCity(e.target.value)}
//                 placeholder="City / State *"
//                 className="border border-zinc-100 bg-zinc-50 rounded-xl px-5 py-4 text-sm font-bold outline-none focus:ring-1 focus:ring-black" />
//               <input type="text" value={pincode} onChange={e => setPincode(e.target.value)}
//                 placeholder="Pincode *"
//                 className="border border-zinc-100 bg-zinc-50 rounded-xl px-5 py-4 text-sm font-bold outline-none focus:ring-1 focus:ring-black" />
//             </div>
//             {(!user?.address?.street || !user?.address?.city) && (
//               <p className="text-xs text-amber-500 font-bold mt-3">
//                 💡 Save your address in <span className="underline cursor-pointer" onClick={() => navigate("/profile")}>My Profile</span> for faster checkout next time.
//               </p>
//             )}
//           </div>

//           {/* Payment */}
//           <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm">
//             <h2 className="text-base font-black uppercase tracking-wider mb-6 flex items-center gap-3">
//               <CreditCard className="text-[#581a90]" size={18} /> 2. Payment Method
//             </h2>
//             <div className="space-y-3">
//               {[
//                 { id: "UPI", label: "UPI (GPay, PhonePe, Paytm)", desc: "Pay instantly via Razorpay." },
//                 { id: "CARD", label: "Credit / Debit Card", desc: "Visa, Mastercard, RuPay — powered by Razorpay." },
//                 { id: "COD", label: "Cash On Delivery", desc: "Pay cash when your order arrives." },
//               ].map(method => (
//                 <label key={method.id} onClick={() => setPaymentMethod(method.id)}
//                   className={`flex items-start gap-4 p-4 border rounded-2xl cursor-pointer transition ${paymentMethod === method.id ? "border-black bg-zinc-50" : "border-zinc-100 hover:bg-zinc-50"}`}>
//                   <div className={`w-4 h-4 mt-1 rounded-full border-2 flex items-center justify-center shrink-0 ${paymentMethod === method.id ? "border-black" : "border-zinc-300"}`}>
//                     {paymentMethod === method.id && <div className="w-2 h-2 bg-black rounded-full" />}
//                   </div>
//                   <div>
//                     <span className="font-bold text-sm uppercase text-black">{method.label}</span>
//                     <p className="text-xs text-gray-400 mt-0.5">{method.desc}</p>
//                   </div>
//                 </label>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* RIGHT */}
//         <div className="w-full lg:w-1/3">
//           <div className="sticky top-36 space-y-5">

//             {/* Items */}
//             <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm">
//               <h3 className="font-bold text-xs uppercase tracking-widest text-zinc-400 mb-5">Order Summary</h3>
//               <div className="space-y-4 max-h-56 overflow-y-auto pr-2">
//                 {cartItems.map(item => (
//                   <div key={`${item.id}-${item.size}`} className="flex justify-between items-center gap-4 border-b border-zinc-50 pb-4 last:border-0 last:pb-0">
//                     <div className="flex gap-3 items-center flex-1">
//                       <img src={item.img} alt={item.name} className="w-11 h-14 object-cover rounded-lg bg-zinc-50 shrink-0" />
//                       <div>
//                         <p className="text-xs font-black uppercase text-black leading-tight truncate max-w-[130px]">{item.name}</p>
//                         <p className="text-[10px] font-bold text-zinc-400 mt-0.5">Size: {item.size} · Qty: {item.quantity}</p>
//                       </div>
//                     </div>
//                     <span className="text-xs font-black text-black">₹{(parseInt(item.price) * item.quantity).toLocaleString("en-IN")}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Coupon + Price */}
//             <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm space-y-4">
//               {appliedCoupon ? (
//                 <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-4 py-3">
//                   <div className="flex items-center gap-2">
//                     <Tag size={13} className="text-green-600" />
//                     <span className="text-sm font-black text-green-700">{appliedCoupon}</span>
//                     <span className="text-xs text-green-600">-₹{couponDiscount}</span>
//                   </div>
//                   <button onClick={handleRemoveCoupon} className="text-red-400 text-xs font-bold hover:text-red-600 cursor-pointer">Remove</button>
//                 </div>
//               ) : (
//                 <div className="relative">
//                   <div className="flex gap-2 border border-zinc-100 bg-zinc-50 rounded-xl p-2">
//                     <Ticket className="text-zinc-300 mt-2 ml-2 shrink-0" size={15} />
//                     <input type="text" value={couponInput}
//                       onChange={e => { setCouponInput(e.target.value); setCouponError(""); }}
//                       onFocus={() => setShowSuggestions(true)}
//                       onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
//                       placeholder="Coupon Code"
//                       className="flex-1 bg-transparent px-2 py-1.5 text-xs font-bold outline-none uppercase" />
//                     <button onClick={handleApplyCoupon}
//                       className="bg-zinc-200 text-zinc-600 px-3 py-2 rounded-lg font-bold text-[10px] hover:bg-black hover:text-white transition cursor-pointer">
//                       APPLY
//                     </button>
//                   </div>

//                   {/* Coupon suggestions dropdown */}
//                   {showSuggestions && (
//                     <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-100 rounded-xl shadow-lg z-10 overflow-hidden">
//                       {COUPON_SUGGESTIONS.map(c => {
//                         const rule = COUPON_RULES[c.code];
//                         const eligible = subtotal >= rule.minOrder;
//                         return (
//                           <button key={c.code}
//                             onClick={() => { setCouponInput(c.code); setShowSuggestions(false); }}
//                             className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition cursor-pointer border-b border-gray-50 last:border-0">
//                             <div className="flex items-center gap-2">
//                               <Tag size={11} className={eligible ? "text-[#581a90]" : "text-gray-300"} />
//                               <span className={`text-xs font-black ${eligible ? "text-black" : "text-gray-300"}`}>{c.code}</span>
//                             </div>
//                             <div className="text-right">
//                               <span className={`text-xs font-bold ${eligible ? "text-green-600" : "text-gray-300"}`}>{c.label}</span>
//                               {!eligible && (
//                                 <p className="text-[9px] text-red-400 font-bold">Min ₹{rule.minOrder} required</p>
//                               )}
//                             </div>
//                           </button>
//                         );
//                       })}
//                     </div>
//                   )}

//                   {couponError && <p className="text-xs text-red-400 font-bold mt-1">{couponError}</p>}
//                 </div>
//               )}

//               {/* Price breakdown */}
//               <div className="space-y-2.5 pt-2 border-t border-zinc-50">
//                 <div className="flex justify-between text-xs font-bold text-zinc-500 uppercase">
//                   <span>Subtotal</span><span className="text-black">₹{subtotal.toLocaleString("en-IN")}</span>
//                 </div>
//                 <div className="flex justify-between text-xs font-bold text-zinc-500 uppercase">
//                   <span>GST (18%)</span><span className="text-black">₹{gstAmount.toLocaleString("en-IN")}</span>
//                 </div>
//                 <div className="flex justify-between text-xs font-bold text-zinc-500 uppercase">
//                   <span>Shipping</span>
//                   <span className={shippingCharge === 0 ? "text-emerald-500 font-extrabold" : "text-black"}>
//                     {shippingCharge === 0 ? "FREE" : `₹${shippingCharge}`}
//                   </span>
//                 </div>
//                 {couponDiscount > 0 && (
//                   <div className="flex justify-between text-xs font-bold text-green-600 uppercase">
//                     <span>Discount ({appliedCoupon})</span><span>-₹{couponDiscount}</span>
//                   </div>
//                 )}
//                 <div className="flex justify-between font-black text-black text-lg uppercase border-t border-zinc-100 pt-3">
//                   <span>Total</span><span>₹{total.toLocaleString("en-IN")}</span>
//                 </div>
//               </div>

//               <button onClick={handlePlaceOrder} disabled={loading}
//                 className="w-full bg-[#581a90] text-white h-14 rounded-2xl font-black text-sm uppercase tracking-[0.15em] shadow-xl hover:opacity-90 transition-all cursor-pointer flex items-center justify-center gap-3 disabled:opacity-50">
//                 {loading ? (
//                   <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                 ) : (
//                   <><CheckCircle size={16} /> Place Order (₹{total.toLocaleString("en-IN")})</>
//                 )}
//               </button>

//               {paymentMethod !== "COD" && (
//                 <p className="text-center text-[10px] text-gray-400 font-bold">🔒 Secured by Razorpay</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../cart/CartContext";
import { useAuth } from "../auth/AuthContext";
import { orderAPI } from "../../services/api";
import { CreditCard, Truck, CheckCircle, Ticket, Tag } from "lucide-react";

const COUPON_RULES = {
  "VELT500": { discount: 500, minOrder: 1200, label: "Save ₹500 on orders above ₹1200" },
  "VELT200": { discount: 200, minOrder: 800,  label: "Save ₹200 on orders above ₹800" },
  "VELT150": { discount: 150, minOrder: 500,  label: "Save ₹150 on orders above ₹500" },
};

const COUPON_SUGGESTIONS = [
  { code: "VELT500", label: "Save ₹500 (min ₹1200)" },
  { code: "VELT200", label: "Save ₹200 (min ₹800)" },
  { code: "VELT150", label: "Save ₹150 (min ₹500)" },
];

const loadRazorpay = () => new Promise((resolve) => {
  if (window.Razorpay) { resolve(true); return; }
  const script = document.createElement("script");
  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  script.onload = () => resolve(true);
  script.onerror = () => resolve(false);
  document.body.appendChild(script);
});

export default function CheckoutPage() {
  const { cartItems, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Yeh ref track karega ki order place ho gaya
  // clearCart ke baad cartItems.length === 0 ho jaata hai
  // bina is flag ke useEffect "/" par redirect kar deta hai
  const orderPlacedRef = useRef(false);

  const [fullName, setFullName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address?.street || "");
  const [city, setCity] = useState(user?.address?.city || "");
  const [pincode, setPincode] = useState(user?.address?.pincode || "");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);

  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (cartItems.length === 0 && !orderPlacedRef.current) {
      navigate("/");
    }
  }, [cartItems.length, navigate]);

  useEffect(() => {
    const saved = localStorage.getItem("veltorn_coupon");
    if (saved) setCouponInput(saved);
  }, []);

  const validatePhone = (p) => /^[6-9]\d{9}$/.test(p);
  const gstAmount = parseFloat((subtotal * 0.18).toFixed(2));
  const shippingCharge = subtotal > 1500 ? 0 : 100;
  const total = Math.max(0, subtotal + gstAmount + shippingCharge - couponDiscount);

  if (cartItems.length === 0 && !orderPlacedRef.current) return null;

  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) { setCouponError("Enter a coupon code"); return; }
    const rule = COUPON_RULES[code];
    if (!rule) {
      setCouponError("Invalid coupon code");
      setAppliedCoupon(null); setCouponDiscount(0);
      return;
    }
    if (subtotal < rule.minOrder) {
      setCouponError(`Minimum order of ₹${rule.minOrder} required for ${code}`);
      setAppliedCoupon(null); setCouponDiscount(0);
      return;
    }
    setAppliedCoupon(code);
    setCouponDiscount(rule.discount);
    setCouponError("");
    setShowSuggestions(false);
    localStorage.removeItem("veltorn_coupon");
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null); setCouponDiscount(0);
    setCouponInput(""); setCouponError("");
  };

  const buildOrderPayload = (method) => ({
    items: cartItems.map(item => ({
      product: item.id, name: item.name, price: item.price,
      img: item.img, size: item.size, quantity: item.quantity,
    })),
    shippingAddress: { fullName, phone, street: address, city, pincode },
    paymentMethod: method,
    coupon: appliedCoupon,
    discount: couponDiscount,
  });

  const handleCOD = async () => {
    setLoading(true);
    try {
      const data = await orderAPI.place(buildOrderPayload("COD"));
      orderPlacedRef.current = true;
      clearCart();
      navigate("/order-success", { state: { orderId: data.order.orderId } });
    } catch (err) {
      alert("Order failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRazorpay = async () => {
    const loaded = await loadRazorpay();
    if (!loaded) { alert("Razorpay failed to load. Please try COD."); return; }
    setLoading(true);
    try {
      const orderData = await orderAPI.place(buildOrderPayload(paymentMethod));
      const internalOrderId = orderData.order._id;
      const orderId = orderData.order.orderId;
      const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const rzpRes = await fetch(`${BASE_URL}/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total, orderId }),
      });
      const rzpData = await rzpRes.json();
      if (!rzpRes.ok) throw new Error(rzpData.message);
      const options = {
        key: rzpData.keyId, amount: rzpData.amount, currency: rzpData.currency,
        name: "VELTORN", description: `Order #${orderId}`,
        order_id: rzpData.razorpayOrderId,
        prefill: { name: fullName, contact: phone, email: user?.email || "" },
        theme: { color: "#581a90" },
        handler: async (response) => {
          const verifyRes = await fetch(`${BASE_URL}/payment/verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              internalOrderId,
            }),
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            orderPlacedRef.current = true;
            clearCart();
            navigate("/order-success", { state: { orderId } });
          } else {
            alert("Payment verification failed. Contact support.");
          }
        },
        modal: { ondismiss: () => { setLoading(false); } },
      };
      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", () => { setLoading(false); alert("Payment failed. Please try again."); });
      rzp.open();
    } catch (err) {
      setLoading(false);
      alert("Error: " + err.message);
    }
  };

  const handlePlaceOrder = () => {
    if (!fullName || !phone || !address || !city || !pincode) {
      alert("Please fill all required shipping details."); return;
    }
    if (!validatePhone(phone)) {
      alert("Please enter a valid 10-digit Indian mobile number."); return;
    }
    if (paymentMethod === "COD") handleCOD();
    else handleRazorpay();
  };

  return (
    <div className="min-h-screen bg-zinc-50 pb-20 px-4 md:px-12 lg:px-20">
      <div className="pt-36 mb-10">
        <h1 className="text-black text-5xl md:text-7xl font-black uppercase tracking-[-4px] scale-y-[1.4] origin-left leading-none">
          Secure <span className="text-zinc-200">Checkout</span>
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">

        {/* LEFT */}
        <div className="w-full lg:w-2/3 space-y-8">

          {/* Address */}
          <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm">
            <h2 className="text-base font-black uppercase tracking-wider mb-6 flex items-center gap-3">
              <Truck className="text-emerald-500" size={18} /> 1. Delivery Address
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input type="text" value={fullName} onChange={e => setFullName(e.target.value)}
                placeholder="Full Name *"
                className="border border-zinc-100 bg-zinc-50 rounded-xl px-5 py-4 text-sm font-bold outline-none focus:ring-1 focus:ring-black" />
              <div>
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                  placeholder="Mobile Number (10 digits) *"
                  className={`w-full border bg-zinc-50 rounded-xl px-5 py-4 text-sm font-bold outline-none focus:ring-1 focus:ring-black ${phone && !validatePhone(phone) ? "border-red-300" : "border-zinc-100"}`} />
                {phone && !validatePhone(phone) && <p className="text-xs text-red-400 font-bold mt-1">Enter valid 10-digit number</p>}
              </div>
              <textarea value={address} onChange={e => setAddress(e.target.value)}
                placeholder="Full Address *"
                className="col-span-full border border-zinc-100 bg-zinc-50 rounded-xl px-5 py-4 text-sm font-bold outline-none focus:ring-1 focus:ring-black h-24 resize-none" />
              <input type="text" value={city} onChange={e => setCity(e.target.value)}
                placeholder="City / State *"
                className="border border-zinc-100 bg-zinc-50 rounded-xl px-5 py-4 text-sm font-bold outline-none focus:ring-1 focus:ring-black" />
              <input type="text" value={pincode} onChange={e => setPincode(e.target.value)}
                placeholder="Pincode *"
                className="border border-zinc-100 bg-zinc-50 rounded-xl px-5 py-4 text-sm font-bold outline-none focus:ring-1 focus:ring-black" />
            </div>
            {(!user?.address?.street || !user?.address?.city) && (
              <p className="text-xs text-amber-500 font-bold mt-3">
                💡 Save your address in{" "}
                <span className="underline cursor-pointer" onClick={() => navigate("/profile")}>My Profile</span>
                {" "}for faster checkout next time.
              </p>
            )}
          </div>

          {/* Payment */}
          <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm">
            <h2 className="text-base font-black uppercase tracking-wider mb-6 flex items-center gap-3">
              <CreditCard className="text-[#581a90]" size={18} /> 2. Payment Method
            </h2>
            <div className="space-y-3">
              {[
                { id: "UPI", label: "UPI (GPay, PhonePe, Paytm)", desc: "Pay instantly via Razorpay." },
                { id: "CARD", label: "Credit / Debit Card", desc: "Visa, Mastercard, RuPay — powered by Razorpay." },
                { id: "COD", label: "Cash On Delivery", desc: "Pay cash when your order arrives." },
              ].map(method => (
                <label key={method.id} onClick={() => setPaymentMethod(method.id)}
                  className={`flex items-start gap-4 p-4 border rounded-2xl cursor-pointer transition ${paymentMethod === method.id ? "border-black bg-zinc-50" : "border-zinc-100 hover:bg-zinc-50"}`}>
                  <div className={`w-4 h-4 mt-1 rounded-full border-2 flex items-center justify-center shrink-0 ${paymentMethod === method.id ? "border-black" : "border-zinc-300"}`}>
                    {paymentMethod === method.id && <div className="w-2 h-2 bg-black rounded-full" />}
                  </div>
                  <div>
                    <span className="font-bold text-sm uppercase text-black">{method.label}</span>
                    <p className="text-xs text-gray-400 mt-0.5">{method.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full lg:w-1/3">
          <div className="sticky top-36 space-y-5">

            {/* Items */}
            <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm">
              <h3 className="font-bold text-xs uppercase tracking-widest text-zinc-400 mb-5">Order Summary</h3>
              <div className="space-y-4 max-h-56 overflow-y-auto pr-2">
                {cartItems.map(item => (
                  <div key={`${item.id}-${item.size}`} className="flex justify-between items-center gap-4 border-b border-zinc-50 pb-4 last:border-0 last:pb-0">
                    <div className="flex gap-3 items-center flex-1">
                      <img src={item.img} alt={item.name} className="w-11 h-14 object-cover rounded-lg bg-zinc-50 shrink-0" />
                      <div>
                        <p className="text-xs font-black uppercase text-black leading-tight truncate max-w-[130px]">{item.name}</p>
                        <p className="text-[10px] font-bold text-zinc-400 mt-0.5">Size: {item.size} · Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="text-xs font-black text-black">₹{(parseInt(item.price) * item.quantity).toLocaleString("en-IN")}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Coupon + Price */}
            <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm space-y-4">
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Tag size={13} className="text-green-600" />
                    <span className="text-sm font-black text-green-700">{appliedCoupon}</span>
                    <span className="text-xs text-green-600">-₹{couponDiscount}</span>
                  </div>
                  <button onClick={handleRemoveCoupon} className="text-red-400 text-xs font-bold hover:text-red-600 cursor-pointer">Remove</button>
                </div>
              ) : (
                <div className="relative">
                  <div className="flex gap-2 border border-zinc-100 bg-zinc-50 rounded-xl p-2">
                    <Ticket className="text-zinc-300 mt-2 ml-2 shrink-0" size={15} />
                    <input type="text" value={couponInput}
                      onChange={e => { setCouponInput(e.target.value); setCouponError(""); }}
                      onFocus={() => setShowSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                      placeholder="Coupon Code"
                      className="flex-1 bg-transparent px-2 py-1.5 text-xs font-bold outline-none uppercase" />
                    <button onClick={handleApplyCoupon}
                      className="bg-zinc-200 text-zinc-600 px-3 py-2 rounded-lg font-bold text-[10px] hover:bg-black hover:text-white transition cursor-pointer">
                      APPLY
                    </button>
                  </div>
                  {showSuggestions && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-100 rounded-xl shadow-lg z-10 overflow-hidden">
                      {COUPON_SUGGESTIONS.map(c => {
                        const rule = COUPON_RULES[c.code];
                        const eligible = subtotal >= rule.minOrder;
                        return (
                          <button key={c.code}
                            onClick={() => { setCouponInput(c.code); setShowSuggestions(false); }}
                            className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition cursor-pointer border-b border-gray-50 last:border-0">
                            <div className="flex items-center gap-2">
                              <Tag size={11} className={eligible ? "text-[#581a90]" : "text-gray-300"} />
                              <span className={`text-xs font-black ${eligible ? "text-black" : "text-gray-300"}`}>{c.code}</span>
                            </div>
                            <div className="text-right">
                              <span className={`text-xs font-bold ${eligible ? "text-green-600" : "text-gray-300"}`}>{c.label}</span>
                              {!eligible && <p className="text-[9px] text-red-400 font-bold">Min ₹{rule.minOrder} required</p>}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                  {couponError && <p className="text-xs text-red-400 font-bold mt-1">{couponError}</p>}
                </div>
              )}

              <div className="space-y-2.5 pt-2 border-t border-zinc-50">
                <div className="flex justify-between text-xs font-bold text-zinc-500 uppercase">
                  <span>Subtotal</span><span className="text-black">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-zinc-500 uppercase">
                  <span>GST (18%)</span><span className="text-black">₹{gstAmount.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-zinc-500 uppercase">
                  <span>Shipping</span>
                  <span className={shippingCharge === 0 ? "text-emerald-500 font-extrabold" : "text-black"}>
                    {shippingCharge === 0 ? "FREE" : `₹${shippingCharge}`}
                  </span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-xs font-bold text-green-600 uppercase">
                    <span>Discount ({appliedCoupon})</span><span>-₹{couponDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between font-black text-black text-lg uppercase border-t border-zinc-100 pt-3">
                  <span>Total</span><span>₹{total.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <button onClick={handlePlaceOrder} disabled={loading}
                className="w-full bg-[#581a90] text-white h-14 rounded-2xl font-black text-sm uppercase tracking-[0.15em] shadow-xl hover:opacity-90 transition-all cursor-pointer flex items-center justify-center gap-3 disabled:opacity-50">
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <><CheckCircle size={16} /> Place Order (₹{total.toLocaleString("en-IN")})</>
                )}
              </button>

              {paymentMethod !== "COD" && (
                <p className="text-center text-[10px] text-gray-400 font-bold">🔒 Secured by Razorpay</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}