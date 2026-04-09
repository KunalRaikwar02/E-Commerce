// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { ArrowLeft, Package, Truck, CheckCircle, MapPin, CreditCard, Clock } from "lucide-react";
// import { orderAPI } from "../../services/api";
// import { useAuth } from "../auth/AuthContext";

// const statusSteps = ["placed", "confirmed", "shipped", "delivered"];

// const statusColors = {
//   placed: "bg-yellow-100 text-yellow-700",
//   confirmed: "bg-blue-100 text-blue-700",
//   shipped: "bg-purple-100 text-purple-700",
//   delivered: "bg-green-100 text-green-700",
//   cancelled: "bg-red-100 text-red-700",
// };

// export default function OrderDetail() {
//   const { orderId } = useParams();
//   const navigate = useNavigate();
//   const { isLoggedIn } = useAuth();
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!isLoggedIn) { navigate("/"); return; }
//     orderAPI.getById(orderId)
//       .then(setOrder)
//       .catch(console.error)
//       .finally(() => setLoading(false));
//   }, [orderId, isLoggedIn]);

//   if (loading) return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
//     </div>
//   );

//   if (!order) return (
//     <div className="min-h-screen flex items-center justify-center">
//       <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Order not found</p>
//     </div>
//   );

//   const currentStep = statusSteps.indexOf(order.orderStatus);
//   const isCancelled = order.orderStatus === "cancelled";

//   return (
//     <div className="min-h-screen bg-zinc-50 pt-28 pb-20 px-4 md:px-12">
//       <button onClick={() => navigate("/my-orders")} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition mb-8 cursor-pointer">
//         <ArrowLeft size={14} /> My Orders
//       </button>

//       <div className="max-w-3xl mx-auto space-y-6">

//         {/* Header */}
//         <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
//           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
//             <div>
//               <h1 className="text-2xl font-black uppercase tracking-tight">Order #{order.orderId}</h1>
//               <p className="text-xs text-gray-400 mt-1">Placed on {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
//             </div>
//             <span className={`px-4 py-2 rounded-full text-xs font-black uppercase ${statusColors[order.orderStatus] || "bg-gray-100 text-gray-600"}`}>
//               {order.orderStatus}
//             </span>
//           </div>
//         </div>

//         {/* Progress Tracker */}
//         {!isCancelled && (
//           <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
//             <h3 className="font-black text-xs uppercase tracking-widest text-gray-400 mb-6">Order Progress</h3>
//             <div className="flex items-center justify-between relative">
//               {/* Line */}
//               <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-100 z-0" />
//               <div
//                 className="absolute top-4 left-0 h-0.5 bg-[#581a90] z-0 transition-all duration-500"
//                 style={{ width: `${currentStep >= 0 ? (currentStep / (statusSteps.length - 1)) * 100 : 0}%` }}
//               />

//               {statusSteps.map((step, i) => {
//                 const icons = [Package, CheckCircle, Truck, CheckCircle];
//                 const Icon = icons[i];
//                 const done = i <= currentStep;
//                 return (
//                   <div key={step} className="flex flex-col items-center gap-2 z-10">
//                     <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${done ? "bg-[#581a90] border-[#581a90] text-white" : "bg-white border-gray-200 text-gray-300"}`}>
//                       <Icon size={14} />
//                     </div>
//                     <span className={`text-[9px] font-bold uppercase ${done ? "text-[#581a90]" : "text-gray-400"}`}>{step}</span>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}

//         {/* Items */}
//         <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
//           <h3 className="font-black text-xs uppercase tracking-widest text-gray-400 mb-5">Items Ordered</h3>
//           <div className="space-y-4">
//             {order.items?.map((item, i) => (
//               <div key={i} className="flex gap-4 items-center border-b border-gray-50 pb-4 last:border-0 last:pb-0">
//                 <img src={item.img} alt={item.name} className="w-16 h-20 object-cover rounded-xl bg-gray-100 border border-gray-100" />
//                 <div className="flex-1">
//                   <p className="font-black text-sm uppercase text-black">{item.name}</p>
//                   <p className="text-xs text-gray-400 mt-1">Size: {item.size} · Qty: {item.quantity}</p>
//                 </div>
//                 <p className="font-black text-sm">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Shipping Address */}
//         <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
//           <h3 className="font-black text-xs uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2"><MapPin size={12} /> Delivery Address</h3>
//           <p className="font-bold text-sm">{order.shippingAddress?.fullName}</p>
//           <p className="text-sm text-gray-500 mt-1">{order.shippingAddress?.street}</p>
//           <p className="text-sm text-gray-500">{order.shippingAddress?.city} - {order.shippingAddress?.pincode}</p>
//           <p className="text-sm text-gray-500 mt-1">📞 {order.shippingAddress?.phone}</p>
//         </div>

//         {/* Price Breakdown */}
//         <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-3">
//           <h3 className="font-black text-xs uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2"><CreditCard size={12} /> Payment Summary</h3>
//           <div className="flex justify-between text-xs font-bold text-gray-500 uppercase">
//             <span>Subtotal</span><span className="text-black">₹{order.subtotal?.toLocaleString("en-IN")}</span>
//           </div>
//           <div className="flex justify-between text-xs font-bold text-gray-500 uppercase">
//             <span>GST (18%)</span><span className="text-black">₹{order.gst?.toLocaleString("en-IN")}</span>
//           </div>
//           <div className="flex justify-between text-xs font-bold text-gray-500 uppercase border-b border-gray-100 pb-3">
//             <span>Shipping</span>
//             <span className={order.shippingCharge === 0 ? "text-emerald-500" : "text-black"}>
//               {order.shippingCharge === 0 ? "FREE" : `₹${order.shippingCharge}`}
//             </span>
//           </div>
//           <div className="flex justify-between font-black text-black text-lg uppercase">
//             <span>Total</span><span>₹{order.total?.toLocaleString("en-IN")}</span>
//           </div>
//           <div className="flex items-center gap-2 mt-2">
//             <span className="text-xs text-gray-400 font-bold uppercase">Payment:</span>
//             <span className="text-xs font-black uppercase text-black">{order.paymentMethod}</span>
//             <span className={`ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${order.paymentStatus === "paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
//               {order.paymentStatus}
//             </span>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }




import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Package, Truck, CheckCircle, MapPin, CreditCard, Navigation } from "lucide-react";
import { orderAPI } from "../../services/api";
import { useAuth } from "../auth/AuthContext";

// Added out_for_delivery step
const statusSteps = ["placed", "confirmed", "shipped", "out_for_delivery", "delivered"];

const stepIcons = [Package, CheckCircle, Truck, Navigation, CheckCircle];

const stepLabel = {
  placed: "Placed",
  confirmed: "Confirmed",
  shipped: "Shipped",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
};

const statusColors = {
  placed: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  out_for_delivery: "bg-orange-100 text-orange-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function OrderDetail() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoggedIn) { navigate("/"); return; }
    orderAPI.getById(orderId)
      .then(data => setOrder(data))
      .catch(err => { setError(err.message); })
      .finally(() => setLoading(false));
  }, [orderId, isLoggedIn]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (error || !order) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">{error || "Order not found"}</p>
      <button onClick={() => navigate("/my-orders")} className="text-xs font-black underline cursor-pointer text-gray-400 hover:text-black">← Back to Orders</button>
    </div>
  );

  const currentStep = statusSteps.indexOf(order.orderStatus);
  const isCancelled = order.orderStatus === "cancelled";

  // Estimated delivery
  const orderDate = new Date(order.createdAt);
  const estimatedDate = new Date(orderDate);
  estimatedDate.setDate(estimatedDate.getDate() + (order.paymentMethod === "COD" ? 7 : 5));
  const estimatedStr = estimatedDate.toLocaleDateString("en-IN", { day: "numeric", month: "long" });

  return (
    <div className="min-h-screen bg-zinc-50 pt-28 pb-20 px-4 md:px-12 mt-4">
      <button onClick={() => navigate("/my-orders")} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition mb-8 cursor-pointer">
        <ArrowLeft size={14} /> My Orders
      </button>

      <div className="max-w-3xl mx-auto space-y-6">

        {/* Header */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-black uppercase tracking-tight">Order #{order.orderId}</h1>
              <p className="text-xs text-gray-400 mt-1">Placed on {orderDate.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
            </div>
            <span className={`px-4 py-2 rounded-full text-xs font-black uppercase w-fit ${statusColors[order.orderStatus] || "bg-gray-100 text-gray-600"}`}>
              {stepLabel[order.orderStatus] || order.orderStatus}
            </span>
          </div>
        </div>

        {/* Progress Tracker */}
        {!isCancelled && (
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-black text-xs uppercase tracking-widest text-gray-400 mb-6">Order Progress</h3>
            <div className="flex items-start justify-between relative">
              {/* Background line */}
              <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-100 z-0" />
              {/* Progress line */}
              <div
                className="absolute top-4 left-0 h-0.5 bg-[#581a90] z-0 transition-all duration-500"
                style={{ width: currentStep >= 0 ? `${(currentStep / (statusSteps.length - 1)) * 100}%` : "0%" }}
              />

              {statusSteps.map((step, i) => {
                const Icon = stepIcons[i];
                const done = i <= currentStep;
                return (
                  <div key={step} className="flex flex-col items-center gap-2 z-10" style={{ width: `${100 / statusSteps.length}%` }}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${done ? "bg-[#581a90] border-[#581a90] text-white" : "bg-white border-gray-200 text-gray-300"}`}>
                      <Icon size={14} />
                    </div>
                    <span className={`text-[9px] font-bold uppercase text-center leading-tight ${done ? "text-[#581a90]" : "text-gray-400"}`}>
                      {stepLabel[step]}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Tracking info */}
            {order.trackingInfo?.carrier && (
              <div className="mt-6 bg-purple-50 rounded-2xl p-4 border border-purple-100">
                <p className="text-xs font-black uppercase tracking-widest text-[#581a90] mb-2">Tracking Info</p>
                <div className="space-y-1 text-xs text-gray-600 font-bold">
                  {order.trackingInfo.carrier && <p>Carrier: <span className="text-black">{order.trackingInfo.carrier}</span></p>}
                  {order.trackingInfo.trackingNumber && <p>Tracking #: <span className="text-black">{order.trackingInfo.trackingNumber}</span></p>}
                  {order.trackingInfo.currentLocation && <p>Current Location: <span className="text-black">{order.trackingInfo.currentLocation}</span></p>}
                  {order.trackingInfo.estimatedDelivery && <p>Estimated: <span className="text-black">{order.trackingInfo.estimatedDelivery}</span></p>}
                </div>
              </div>
            )}

            {!order.trackingInfo?.carrier && order.orderStatus !== "delivered" && (
              <p className="text-xs text-gray-400 font-bold text-center mt-4">
                📦 Estimated delivery by <span className="text-black font-black">{estimatedStr}</span>
              </p>
            )}
          </div>
        )}

        {isCancelled && (
          <div className="bg-red-50 rounded-3xl p-6 border border-red-100">
            <p className="font-black text-red-600 text-sm uppercase tracking-widest">Order Cancelled</p>
            <p className="text-xs text-red-400 mt-1">Refund (if any) will be processed in 5-7 business days.</p>
          </div>
        )}

        {/* Items */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-black text-xs uppercase tracking-widest text-gray-400 mb-5">Items Ordered</h3>
          <div className="space-y-4">
            {order.items?.map((item, i) => (
              <div key={i} className="flex gap-4 items-center border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                <img src={item.img} alt={item.name} className="w-16 h-20 object-cover rounded-xl bg-gray-100 border border-gray-100" />
                <div className="flex-1">
                  <p className="font-black text-sm uppercase text-black">{item.name}</p>
                  <p className="text-xs text-gray-400 mt-1">Size: {item.size} · Qty: {item.quantity}</p>
                </div>
                <p className="font-black text-sm">₹{(Number(item.price) * Number(item.quantity)).toLocaleString("en-IN")}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-black text-xs uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2"><MapPin size={12} /> Delivery Address</h3>
          <p className="font-bold text-sm">{order.shippingAddress?.fullName}</p>
          <p className="text-sm text-gray-500 mt-1">{order.shippingAddress?.street}</p>
          <p className="text-sm text-gray-500">{order.shippingAddress?.city} - {order.shippingAddress?.pincode}</p>
          <p className="text-sm text-gray-500 mt-1">📞 {order.shippingAddress?.phone}</p>
        </div>

        {/* Price Breakdown */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-3">
          <h3 className="font-black text-xs uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2"><CreditCard size={12} /> Payment Summary</h3>
          <div className="flex justify-between text-xs font-bold text-gray-500 uppercase">
            <span>Subtotal</span><span className="text-black">₹{Number(order.subtotal || 0).toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between text-xs font-bold text-gray-500 uppercase">
            <span>GST (18%)</span><span className="text-black">₹{Number(order.gst || 0).toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between text-xs font-bold text-gray-500 uppercase border-b border-gray-100 pb-3">
            <span>Shipping</span>
            <span className={order.shippingCharge === 0 ? "text-emerald-500" : "text-black"}>
              {order.shippingCharge === 0 ? "FREE" : `₹${order.shippingCharge}`}
            </span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-xs font-bold text-green-600 uppercase">
              <span>Discount{order.coupon ? ` (${order.coupon})` : ""}</span>
              <span>-₹{Number(order.discount).toLocaleString("en-IN")}</span>
            </div>
          )}
          <div className="flex justify-between font-black text-black text-lg uppercase">
            <span>Total</span><span>₹{Number(order.total).toLocaleString("en-IN")}</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-gray-400 font-bold uppercase">Payment:</span>
            <span className="text-xs font-black uppercase text-black">{order.paymentMethod}</span>
            <span className={`ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${order.paymentStatus === "paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
              {order.paymentStatus}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}