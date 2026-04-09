// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { ShoppingBag, ChevronRight, ArrowLeft } from "lucide-react";
// import { orderAPI } from "../../services/api";
// import { useAuth } from "../auth/AuthContext";

// const statusColors = {
//   placed: "bg-yellow-100 text-yellow-700",
//   confirmed: "bg-blue-100 text-blue-700",
//   shipped: "bg-purple-100 text-purple-700",
//   delivered: "bg-green-100 text-green-700",
//   cancelled: "bg-red-100 text-red-700",
// };

// export default function MyOrders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { isLoggedIn } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!isLoggedIn) { navigate("/"); return; }
//     orderAPI.getMyOrders()
//       .then(setOrders)
//       .catch(console.error)
//       .finally(() => setLoading(false));
//   }, [isLoggedIn]);

//   return (
//     <div className="min-h-screen bg-white pt-28 pb-20 px-4 md:px-12">
//       <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition mb-6 cursor-pointer">
//         <ArrowLeft size={14} /> Back
//       </button>

//       <h1 className="text-4xl md:text-6xl font-black uppercase tracking-[-3px] scale-y-[1.4] origin-left leading-none mb-10">
//         My Orders
//       </h1>

//       {loading ? (
//         <div className="flex justify-center py-20">
//           <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
//         </div>
//       ) : orders.length === 0 ? (
//         <div className="flex flex-col items-center justify-center py-32 gap-4 text-gray-300">
//           <ShoppingBag size={60} strokeWidth={1} />
//           <p className="font-bold text-sm uppercase tracking-widest">No orders yet</p>
//           <button onClick={() => navigate("/collections/all")}
//             className="mt-4 bg-black text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-zinc-800 transition cursor-pointer">
//             Start Shopping
//           </button>
//         </div>
//       ) : (
//         <div className="space-y-4 max-w-3xl">
//           {orders.map((order) => (
//             <div
//               key={order._id}
//               onClick={() => navigate(`/order/${order._id}`)}
//               className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-gray-200 transition cursor-pointer"
//             >
//               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//                 <div className="space-y-1">
//                   <div className="flex items-center gap-3 flex-wrap">
//                     <span className="font-black text-sm uppercase">{order.orderId}</span>
//                     <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${statusColors[order.orderStatus] || "bg-gray-100 text-gray-500"}`}>
//                       {order.orderStatus}
//                     </span>
//                   </div>
//                   <p className="text-xs text-gray-400 font-bold">
//                     {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
//                     {" · "}{order.items?.length} item{order.items?.length > 1 ? "s" : ""}
//                     {" · "}₹{order.total?.toLocaleString("en-IN")}
//                   </p>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="flex -space-x-2">
//                     {order.items?.slice(0, 3).map((item, i) => (
//                       <img key={i} src={item.img} alt={item.name}
//                         className="w-10 h-10 object-cover rounded-lg border-2 border-white bg-gray-100" />
//                     ))}
//                     {order.items?.length > 3 && (
//                       <div className="w-10 h-10 rounded-lg border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-black text-gray-500">
//                         +{order.items.length - 3}
//                       </div>
//                     )}
//                   </div>
//                   <ChevronRight size={16} className="text-gray-300 ml-2" />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }




import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, ChevronRight, ArrowLeft } from "lucide-react";
import { orderAPI } from "../../services/api";
import { useAuth } from "../auth/AuthContext";

const statusColors = {
  placed: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  out_for_delivery: "bg-orange-100 text-orange-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const statusLabel = {
  placed: "Placed",
  confirmed: "Confirmed",
  shipped: "Shipped",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) { navigate("/"); return; }
    orderAPI.getMyOrders()
      .then(data => {
        // Handle both: array directly OR { orders: [...] }
        const arr = Array.isArray(data) ? data : (data.orders || []);
        setOrders(arr);
      })
      .catch(err => {
        console.error("MyOrders error:", err);
        setError("Could not load orders.");
      })
      .finally(() => setLoading(false));
  }, [isLoggedIn]);

  return (
    <div className="min-h-screen bg-white pt-28 pb-20 px-4 md:px-12 mt-4">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition mb-6 cursor-pointer">
        <ArrowLeft size={14} /> Back
      </button>

      <h1 className="text-4xl md:text-6xl  font-black uppercase tracking-[-3px] scale-y-[1.4] origin-left leading-none mb-10">
        My Orders
      </h1>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
        </div>
      ) : error ? (
        <div className="text-center py-20">
          <p className="text-red-400 font-bold text-sm">{error}</p>
          <button onClick={() => window.location.reload()} className="mt-4 text-xs font-black underline cursor-pointer text-gray-400 hover:text-black">Retry</button>
        </div>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 gap-4 text-gray-300">
          <ShoppingBag size={60} strokeWidth={1} />
          <p className="font-bold text-sm uppercase tracking-widest">No orders yet</p>
          <button onClick={() => navigate("/collections/all")}
            className="mt-4 bg-black text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-zinc-800 transition cursor-pointer">
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-4 max-w-3xl">
          {orders.map((order) => (
            <div
              key={order._id}
              onClick={() => navigate(`/order/${order._id}`)}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-gray-200 transition cursor-pointer"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-black text-sm uppercase">{order.orderId}</span>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${statusColors[order.orderStatus] || "bg-gray-100 text-gray-500"}`}>
                      {statusLabel[order.orderStatus] || order.orderStatus}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 font-bold">
                    {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                    {" · "}{order.items?.length} item{order.items?.length > 1 ? "s" : ""}
                    {" · "}₹{Number(order.total).toLocaleString("en-IN")}
                  </p>
                  <p className="text-xs text-gray-400 font-bold">
                    Payment: <span className={order.paymentStatus === "paid" ? "text-green-600 font-black" : "text-gray-600"}>
                      {order.paymentMethod} — {order.paymentStatus}
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {order.items?.slice(0, 3).map((item, i) => (
                      <img key={i} src={item.img} alt={item.name}
                        className="w-10 h-10 object-cover rounded-lg border-2 border-white bg-gray-100" />
                    ))}
                    {order.items?.length > 3 && (
                      <div className="w-10 h-10 rounded-lg border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-black text-gray-500">
                        +{order.items.length - 3}
                      </div>
                    )}
                  </div>
                  <ChevronRight size={16} className="text-gray-300 ml-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}