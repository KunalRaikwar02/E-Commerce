import React, { useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  ArrowRight,
} from "lucide-react";

function Accessories() {
  const scrollRef = useRef(null);

  const products = [
    {
      id: 1,
      title: "BLACK CAP",
      price: "799",
      image: "/assets/images/accessori7.jpg",
      collection: "HEADWEAR",
      isNew: true,
    },
    {
      id: 2,
      title: "SUNGLASSES",
      price: "1299",
      image: "/assets/images/accessori2.jpg",
      collection: "EYEWEAR",
      isNew: true,
      limited: true,
    },
    {
      id: 3,
      title: "LEATHER BELT",
      price: "1499",
      image: "/assets/images/accessori3.jpg",
      collection: "LEATHER GOODS",
    },
    {
      id: 4,
      title: "CHAIN NECKLACE",
      price: "999",
      image: "/assets/images/accessori9.jpg",
      collection: "JEWELRY",
      isNew: true,
    },
    {
      id: 5,
      title: "WRIST WATCH",
      price: "2499",
      image: "/assets/images/accessori5.jpg",
      collection: "TIMEPIECES",
      limited: true,
    },
    {
      id: 6,
      title: "BACKPACK",
      price: "1999",
      image: "/assets/images/accessori6.jpg",
      collection: "TRAVEL",
    },
  ];

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 450;
    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="mt-26 sm:mt-30 md:mt-35 px-4 md:px-6 lg:px-10 relative overflow-hidden font-sans">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-3 py-4">
        <h2 className="text-black text-3xl md:text-6xl font-black uppercase tracking-[-3px] scale-y-[1.6] origin-left leading-none">
          ACCESSORIES
        </h2>

        <button className="group bg-black text-white px-4 py-2.5 rounded-md flex items-center gap-2 text-[10px] md:text-xs font-bold tracking-[2px] hover:bg-zinc-800 transition-all shrink-0 cursor-pointer">
          VIEW ALL
          <ArrowRight
            size={14}
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>
      </div>

      {/* Modern Navigation Buttons */}
      <div className="flex justify-end gap-3 mb-4">
        <button
          onClick={() => scroll("left")}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 text-zinc-500 hover:text-black hover:border-black hover:shadow-lg transition-all duration-300 rounded-sm font-bold text-[10px] uppercase tracking-widest cursor-pointer group"
        >
          <ChevronLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Prev
        </button>
        <button
          onClick={() => scroll("right")}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 text-zinc-500 hover:text-black hover:border-black hover:shadow-lg transition-all duration-300 rounded-sm font-bold text-[10px] uppercase tracking-widest cursor-pointer group"
        >
          Next
          <ChevronRight
            size={16}
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>
      </div>

      {/* Horizontal Slider */}
      <div
        ref={scrollRef}
        className="flex gap-x-4 md:gap-x-6 overflow-x-auto pb-16 scrollbar-hide py-2 items-start snap-x"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="min-w-70 md:min-w-85 transition-all duration-500 ease-in-out hover:min-w-115 md:hover:min-w-130 group cursor-pointer snap-start"
          >
            {/* Image Box */}
            <div className="relative overflow-hidden bg-[#f9f9f9] h-95 md:h-120 w-full rounded-2xl shadow-sm transition-all duration-500 border border-zinc-100">
              {/* Badges Logic */}
              <div className="absolute top-4 left-4 z-20 flex gap-2">
                {product.isNew && (
                  <span className="bg-green-600 text-white text-[9px] px-3 py-1 rounded-full font-extrabold tracking-widest shadow-lg">
                    NEW
                  </span>
                )}
                {product.limited && (
                  <span className="bg-black text-white text-[9px] px-3 py-1 rounded-full font-extrabold tracking-widest shadow-lg">
                    LIMITED
                  </span>
                )}
              </div>

              {/* Main Image */}
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover group-hover:object-contain transition-all duration-700 ease-in-out group-hover:blur-[5px] rounded-2xl"
              />

              {/* Shopping Cart Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 bg-black/5">
                <div className="bg-black text-white px-3 py-1.5 rounded-lg flex items-center gap-4 shadow-2xl transform translate-y-6 group-hover:translate-y-0 transition-all duration-300">
                  <ShoppingCart size={20} />
                  <span className="text-base font-bold">
                    ₹ {product.price}{" "}
                    <span className="text-1xl opacity-60 ml-1 font-medium text-nowrap">
                      INR
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="mt-4 px-1 space-y-1">
              <h3 className="text-sm md:text-base font-black uppercase text-zinc-900 leading-tight transition-colors">
                {product.title}
              </h3>
              <p className="text-[11px] md:text-[12px] text-zinc-400 font-bold uppercase">
                {product.collection}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Accessories;
