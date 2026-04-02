// import React, { useRef } from "react";
// import {
//   ChevronLeft,
//   ChevronRight,
//   ShoppingCart,
//   ArrowRight,
// } from "lucide-react";

// function NewArrivals() {
//   const scrollRef = useRef(null);

//   const products = [
//     {
//       id: 1,
//       title: "BLACK SHADOW TEE",
//       price: "999",
//       image: "/assets/images/tshirt2.jpeg",
//       collection: "NEW T-SHIRTS",
//     },
//     {
//       id: 2,
//       title: "WHITE GHOST TEE",
//       price: "899",
//       image: "/assets/images/tshirt3.jpeg",
//       collection: "MINIMAL EDITION",
//     },
//     {
//       id: 3,
//       title: "BLUE OCEAN TEE",
//       price: "1099",
//       image: "/assets/images/tshirt4.jpeg",
//       collection: "NATURE COLLECTION",
//     },
//     {
//       id: 4,
//       title: "RED FURY TEE",
//       price: "899",
//       image: "/assets/images/tshirt5.jpeg",
//       collection: "STREET STYLE",
//     },
//     {
//       id: 5,
//       title: "GREEN LEAF TEE",
//       price: "949",
//       image: "/assets/images/tshirt6.jpeg",
//       collection: "SEASONAL PICK",
//     },
//     {
//       id: 6,
//       title: "YELLOW SUN TEE",
//       price: "999",
//       image: "/assets/images/tshirt2.jpeg",
//       collection: "BRIGHT SERIES",
//     },
//     {
//       id: 7,
//       title: "PURPLE DARK TEE",
//       price: "1049",
//       image: "/assets/images/tshirt3.jpeg",
//       collection: "NOIR EDITION",
//     },
//     {
//       id: 8,
//       title: "ORANGE FIRE TEE",
//       price: "899",
//       image: "/assets/images/tshirt4.jpeg",
//       collection: "FLAME COLLECTION",
//     },
//   ];

//   const scroll = (direction) => {
//     const container = scrollRef.current;
//     const scrollAmount = 450;
//     if (direction === "left") {
//       container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
//     } else {
//       container.scrollBy({ left: scrollAmount, behavior: "smooth" });
//     }
//   };

//   return (
//     // Padding-left (px) kam kar diya taaki gap kam ho jaye
//     <section className="mt-26 sm:mt-30 md:mt-35 px-4 md:px-6 lg:px-10 relative overflow-hidden">
//       {/* Header Section - py-4 add kiya taaki stretch text upar se na kate */}
//       <div className="flex justify-between items-center mb-3 py-4">
//         <h2 className="text-black text-3xl md:text-6xl font-black uppercase tracking-[-3px] scale-y-[1.6] origin-left leading-none">
//           NEW ARRIVALS
//         </h2>

//         <button className="group bg-black text-white px-4 py-2.5 rounded-md flex items-center gap-2 text-[10px] md:text-xs font-bold tracking-[2px] hover:bg-zinc-800 transition-all shrink-0 cursor-pointer">
//           VIEW ALL
//           <ArrowRight
//             size={14}
//             className="group-hover:translate-x-1 transition-transform"
//           />
//         </button>
//       </div>

//       {/* Modern Navigation Buttons */}
//       <div className="flex justify-end gap-3 mb-4">
//         <button
//           onClick={() => scroll("left")}
//           className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 text-zinc-500 hover:text-black hover:border-black hover:shadow-lg transition-all duration-300 rounded-sm font-bold text-[10px] uppercase tracking-widest cursor-pointer group"
//         >
//           <ChevronLeft
//             size={16}
//             className="group-hover:-translate-x-1 transition-transform"
//           />
//           Prev
//         </button>
//         <button
//           onClick={() => scroll("right")}
//           className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 text-zinc-500 hover:text-black hover:border-black hover:shadow-lg transition-all duration-300 rounded-sm font-bold text-[10px] uppercase tracking-widest cursor-pointer group"
//         >
//           Next
//           <ChevronRight
//             size={16}
//             className="group-hover:translate-x-1 transition-transform"
//           />
//         </button>
//       </div>

//       {/* Horizontal Slider */}
//       <div
//         ref={scrollRef}
//         className="flex gap-x-4 md:gap-x-6 overflow-x-auto pb-16 scrollbar-hide py-2 items-start snap-x"
//       >
//         {products.map((product) => (
//           <div
//             key={product.id}
//             className="min-w-70 md:min-w-85 transition-all duration-500 ease-in-out hover:min-w-115 md:hover:min-w-130 group cursor-pointer snap-start"
//           >
//             {/* Image Box */}
//             <div className="relative overflow-hidden bg-[#f9f9f9] h-95 md:h-120 w-full rounded-2xl shadow-sm  transition-all duration-500 border border-zinc-100">
//               <div className="absolute top-4 left-4 z-20">
//                 <span className="bg-green-600 text-white text-[9px] px-3 py-1 rounded-full font-bold tracking-widest shadow-lg">
//                   NEW
//                 </span>
//               </div>

//               {/* Main Image */}
//               <img  
//                 src={product.image}
//                 alt={product.title}
//                 className="w-full h-full object-cover group-hover:object-contain transition-all duration-700 ease-in-out group-hover:blur-[5px] rounded-2xl"
//               />

//               {/* Shopping Cart Overlay */}
//               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 bg-black/5">
//                 <div className="bg-black text-white px-3 py-1.5 rounded-lg flex items-center gap-4 shadow-2xl transform translate-y-6 group-hover:translate-y-0 transition-all duration-300">
//                   <ShoppingCart size={20} />
//                   <span className="text-base font-bold">
//                     ₹ {product.price}{" "}
//                     <span className="text-1xl opacity-60 ml-1 font-medium text-nowrap">
//                       INR
//                     </span>
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Product Details */}
//             <div className="mt-4 px-1 space-y-1">
//               <h3 className="text-sm md:text-base font-black uppercase text-zinc-900 leading-tight transition-colors">
//                 {product.title}
//               </h3>
//               <p className="text-[11px] md:text-[12px] text-zinc-400 font-bold uppercase">
//                 {product.collection}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// export default NewArrivals;



import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, ShoppingCart, ArrowRight } from "lucide-react";

function NewArrivals() {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const products = [
    { id: "na1", name: "BLACK SHADOW TEE", title: "BLACK SHADOW TEE", price: "999", img: "/assets/images/tshirt2.jpeg", image: "/assets/images/tshirt2.jpeg", collection: "NEW T-SHIRTS", badge: "NEW", sizes: ["S", "M", "L", "XL", "XXL"], brand: "VELTORN" },
    { id: "na2", name: "WHITE GHOST TEE", title: "WHITE GHOST TEE", price: "899", img: "/assets/images/tshirt3.jpeg", image: "/assets/images/tshirt3.jpeg", collection: "MINIMAL EDITION", badge: "NEW", sizes: ["S", "M", "L", "XL"], brand: "VELTORN" },
    { id: "na3", name: "BLUE OCEAN TEE", title: "BLUE OCEAN TEE", price: "1099", img: "/assets/images/tshirt4.jpeg", image: "/assets/images/tshirt4.jpeg", collection: "NATURE COLLECTION", badge: "NEW", sizes: ["M", "L", "XL", "XXL"], brand: "VELTORN" },
    { id: "na4", name: "RED FURY TEE", title: "RED FURY TEE", price: "899", img: "/assets/images/tshirt5.jpeg", image: "/assets/images/tshirt5.jpeg", collection: "STREET STYLE", badge: "NEW", sizes: ["S", "M", "L"], brand: "VELTORN" },
    { id: "na5", name: "GREEN LEAF TEE", title: "GREEN LEAF TEE", price: "949", img: "/assets/images/tshirt6.jpeg", image: "/assets/images/tshirt6.jpeg", collection: "SEASONAL PICK", badge: "NEW", sizes: ["S", "M", "L", "XL"], brand: "VELTORN" },
    { id: "na6", name: "YELLOW SUN TEE", title: "YELLOW SUN TEE", price: "999", img: "/assets/images/tshirt2.jpeg", image: "/assets/images/tshirt2.jpeg", collection: "BRIGHT SERIES", badge: "NEW", sizes: ["M", "L", "XL", "XXL"], brand: "VELTORN" },
    { id: "na7", name: "PURPLE DARK TEE", title: "PURPLE DARK TEE", price: "1049", img: "/assets/images/tshirt3.jpeg", image: "/assets/images/tshirt3.jpeg", collection: "NOIR EDITION", badge: "NEW", sizes: ["S", "M", "L"], brand: "VELTORN" },
    { id: "na8", name: "ORANGE FIRE TEE", title: "ORANGE FIRE TEE", price: "899", img: "/assets/images/tshirt4.jpeg", image: "/assets/images/tshirt4.jpeg", collection: "FLAME COLLECTION", badge: "NEW", sizes: ["S", "M", "L", "XL"], brand: "VELTORN" },
  ];

  const handleProductClick = (product) => {
    window.scrollTo(0, 0);
    navigate(`/product/${product.id}`, { state: { product } });
  };

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 450;
    if (direction === "left") container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    else container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section className="mt-26 sm:mt-30 md:mt-35 px-4 md:px-6 lg:px-10 relative overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center mb-3 py-4">
        <h2 className="text-black text-3xl md:text-6xl font-black uppercase tracking-[-3px] scale-y-[1.6] origin-left leading-none">
          NEW ARRIVALS
        </h2>
        <button className="group bg-black text-white px-4 py-2.5 rounded-md flex items-center gap-2 text-[10px] md:text-xs font-bold tracking-[2px] hover:bg-zinc-800 transition-all shrink-0 cursor-pointer">
          VIEW ALL
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Nav Buttons */}
      <div className="flex justify-end gap-3 mb-4">
        <button onClick={() => scroll("left")} className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 text-zinc-500 hover:text-black hover:border-black hover:shadow-lg transition-all duration-300 rounded-sm font-bold text-[10px] uppercase tracking-widest cursor-pointer group">
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Prev
        </button>
        <button onClick={() => scroll("right")} className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 text-zinc-500 hover:text-black hover:border-black hover:shadow-lg transition-all duration-300 rounded-sm font-bold text-[10px] uppercase tracking-widest cursor-pointer group">
          Next <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Slider */}
      <div ref={scrollRef} className="flex gap-x-4 md:gap-x-6 overflow-x-auto pb-16 scrollbar-hide py-2 items-start snap-x">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => handleProductClick(product)}
            className="min-w-70 md:min-w-85 transition-all duration-500 ease-in-out hover:min-w-115 md:hover:min-w-130 group cursor-pointer snap-start"
          >
            <div className="relative overflow-hidden bg-[#f9f9f9] h-95 md:h-120 w-full rounded-2xl shadow-sm transition-all duration-500 border border-zinc-100">
              <div className="absolute top-4 left-4 z-20">
                <span className="bg-green-600 text-white text-[9px] px-3 py-1 rounded-full font-bold tracking-widest shadow-lg">NEW</span>
              </div>
              <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:object-contain transition-all duration-700 ease-in-out group-hover:blur-[5px] rounded-2xl" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 bg-black/5">
                <div className="bg-black text-white px-3 py-1.5 rounded-lg flex items-center gap-4 shadow-2xl transform translate-y-6 group-hover:translate-y-0 transition-all duration-300">
                  <ShoppingCart size={20} />
                  <span className="text-base font-bold">₹ {product.price} <span className="opacity-60 ml-1 font-medium text-nowrap">INR</span></span>
                </div>
              </div>
            </div>
            <div className="mt-4 px-1 space-y-1">
              <h3 className="text-sm md:text-base font-black uppercase text-zinc-900 leading-tight">{product.title}</h3>
              <p className="text-[11px] md:text-[12px] text-zinc-400 font-bold uppercase">{product.collection}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default NewArrivals;