import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, ShoppingCart, ArrowRight } from "lucide-react";
import { pageProductsAPI } from "../../../services/api";

const STATIC_PRODUCTS = [
  { id: "ac1", name: "BLACK CAP", title: "BLACK CAP", price: "799", img: "/assets/images/accessori7.jpg", image: "/assets/images/accessori7.jpg", collection: "HEADWEAR", badge: "NEW", sizes: ["Free Size"], brand: "VELTORN", isNew: true },
  { id: "ac2", name: "SUNGLASSES", title: "SUNGLASSES", price: "1299", img: "/assets/images/accessori2.jpg", image: "/assets/images/accessori2.jpg", collection: "EYEWEAR", badge: "LIMITED", sizes: ["Free Size"], brand: "VELTORN", isNew: true, limited: true },
  { id: "ac3", name: "LEATHER BELT", title: "LEATHER BELT", price: "1499", img: "/assets/images/accessori3.jpg", image: "/assets/images/accessori3.jpg", collection: "LEATHER GOODS", badge: "NEW", sizes: ["S", "M", "L", "XL"], brand: "VELTORN" },
  { id: "ac4", name: "CHAIN NECKLACE", title: "CHAIN NECKLACE", price: "999", img: "/assets/images/accessori9.jpg", image: "/assets/images/accessori9.jpg", collection: "JEWELRY", badge: "NEW", sizes: ["Free Size"], brand: "VELTORN", isNew: true },
  { id: "ac5", name: "WRIST WATCH", title: "WRIST WATCH", price: "2499", img: "/assets/images/accessori5.jpg", image: "/assets/images/accessori5.jpg", collection: "TIMEPIECES", badge: "LIMITED", sizes: ["Free Size"], brand: "VELTORN", limited: true },
  { id: "ac6", name: "BACKPACK", title: "BACKPACK", price: "1999", img: "/assets/images/accessori6.jpg", image: "/assets/images/accessori6.jpg", collection: "TRAVEL", badge: "NEW", sizes: ["Free Size"], brand: "VELTORN" },
];

function Accessories() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [products, setProducts] = useState(STATIC_PRODUCTS);

  useEffect(() => {
    pageProductsAPI.getSection("accessories")
      .then(data => {
        if (data.products && data.products.length > 0) {
          setProducts(data.products.map(p => ({
            id: String(p.id),
            name: p.name,
            title: p.name,
            price: String(p.price),
            img: p.img,
            image: p.img,
            collection: p.collection || "ACCESSORIES",
            badge: p.badge || "NEW",
            sizes: p.sizes || ["Free Size"],
            brand: p.brand || "VELTORN",
            isNew: p.badge === "NEW",
            limited: p.badge === "LIMITED",
          })));
        }
      })
      .catch(() => {});
  }, []);

  const handleProductClick = (product) => {
    window.scrollTo(0, 0);
    navigate(`/product/${product.id}`, { state: { product } });
  };

  const handleViewAll = () => {
    navigate("/collections/accessories", { state: { filter: "Accessories" } });
  };

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 450;
    if (direction === "left") container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    else container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section className="mt-26 sm:mt-30 md:mt-35 px-4 md:px-6 lg:px-10 relative overflow-hidden">
      <div className="flex justify-between items-center mb-3 py-4">
        <h2 className="text-black text-3xl md:text-6xl font-black uppercase tracking-[-3px] scale-y-[1.6] origin-left leading-none">
          ACCESSORIES
        </h2>
        <button onClick={handleViewAll} className="group bg-black text-white px-4 py-2.5 rounded-md flex items-center gap-2 text-[10px] md:text-xs font-bold tracking-[2px] hover:bg-zinc-800 transition-all shrink-0 cursor-pointer">
          VIEW ALL
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="flex justify-end gap-3 mb-4">
        <button onClick={() => scroll("left")} className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 text-zinc-500 hover:text-black hover:border-black hover:shadow-lg transition-all duration-300 rounded-sm font-bold text-[10px] uppercase tracking-widest cursor-pointer group">
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Prev
        </button>
        <button onClick={() => scroll("right")} className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 text-zinc-500 hover:text-black hover:border-black hover:shadow-lg transition-all duration-300 rounded-sm font-bold text-[10px] uppercase tracking-widest cursor-pointer group">
          Next <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div ref={scrollRef} className="flex gap-x-4 md:gap-x-6 overflow-x-auto pb-16 scrollbar-hide py-2 items-start snap-x">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => handleProductClick(product)}
            className="min-w-70 md:min-w-85 transition-all duration-500 ease-in-out hover:min-w-115 md:hover:min-w-130 group cursor-pointer snap-start"
          >
            <div className="relative overflow-hidden bg-[#f9f9f9] h-95 md:h-120 w-full rounded-2xl shadow-sm transition-all duration-500 border border-zinc-100">
              <div className="absolute top-4 left-4 z-20 flex gap-2">
                {product.isNew && <span className="bg-green-600 text-white text-[9px] px-3 py-1 rounded-full font-extrabold tracking-widest shadow-lg">NEW</span>}
                {product.limited && <span className="bg-black text-white text-[9px] px-3 py-1 rounded-full font-extrabold tracking-widest shadow-lg">LIMITED</span>}
                {!product.isNew && !product.limited && product.badge && (
                  <span className="bg-green-600 text-white text-[9px] px-3 py-1 rounded-full font-extrabold tracking-widest shadow-lg">{product.badge}</span>
                )}
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

export default Accessories;