import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { pageProductsAPI } from "../../../services/api";

const STATIC_SHIRT = {
  id: "feat1", name: "RAGNAROK SHIRT BLACK", price: "1299",
  img: "/assets/images/tshirt11.png", image: "/assets/images/tshirt11.png",
  collection: "AMON AMARTH", badge: "NEW", sizes: ["S", "M", "L", "XL", "XXL"], brand: "AMON AMARTH",
};
const STATIC_SHORTS = {
  id: "feat2", name: "AMON AMARTH SHORTS GREY", price: "1099",
  img: "/assets/images/jeans5.png", image: "/assets/images/jeans5.png",
  collection: "AMON AMARTH", badge: "NEW", sizes: ["S", "M", "L", "XL"], brand: "AMON AMARTH",
};

function FeaturedCollection() {
  const navigate = useNavigate();
  const [smallCard, setSmallCard] = useState(STATIC_SHIRT);
  const [largeCard, setLargeCard] = useState(STATIC_SHORTS);

  useEffect(() => {
    pageProductsAPI.getSection("featured")
      .then(data => {
        if (data.products && data.products.length > 0) {
          const toP = (p) => ({
            id: String(p.id), name: p.name, price: String(p.price),
            img: p.img, image: p.img,
            collection: p.collection || "VELTORN",
            badge: p.badge || "NEW",
            sizes: p.sizes || ["S", "M", "L", "XL"],
            brand: p.brand || "VELTORN",
          });
          if (data.products[0]) setSmallCard(toP(data.products[0]));
          if (data.products[1]) setLargeCard(toP(data.products[1]));
        }
      })
      .catch(() => {});
  }, []);

  const handleClick = (product) => {
    window.scrollTo(0, 0);
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <section className="mt-20 sm:mt-24 md:mt-32 px-4 sm:px-6 md:px-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10 items-start">

        {/* LEFT TEXT */}
        <div className="md:col-span-1 flex flex-col gap-4">
          <span className="text-xs sm:text-sm text-gray-400">[featured]</span>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-black leading-snug">
            LIMITED EDITION MERCH
            <br />FROM THE AMON
            <br />AMARTH RAGNAROK
            <br />COLLECTION.
          </h2>
        </div>

        {/* SMALL CARD — slot 0 */}
        <div onClick={() => handleClick(smallCard)} className="md:col-span-1 cursor-pointer group">
          <div className="relative h-75 sm:h-95 md:h-100 flex items-center justify-center overflow-hidden bg-gray-100 rounded-lg transition-all duration-300 group-hover:shadow-xl">
            <img src={smallCard.image} alt={smallCard.name}
              className="h-full object-contain transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute top-3 left-3 flex gap-2">
              <span className="bg-green-600 text-white text-[9px] sm:text-[10px] px-2 sm:px-3 py-1 rounded-full font-semibold shadow">NEW</span>
              <span className="bg-black text-white text-[9px] sm:text-[10px] px-2 sm:px-3 py-1 rounded-full font-semibold shadow">LIMITED</span>
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 bg-black text-white text-xs font-bold px-4 py-2 rounded-lg transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                VIEW PRODUCT
              </span>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold text-black text-xs sm:text-sm group-hover:text-[#581a90] transition-colors">"{smallCard.name}"</h3>
            <p className="text-gray-400 text-xs mt-1">{smallCard.collection}</p>
          </div>
        </div>

        {/* LARGE CARD — slot 1 */}
        <div onClick={() => handleClick(largeCard)} className="md:col-span-2 cursor-pointer group">
          <div className="relative h-87.5 sm:h-112.5 md:h-150 lg:h-162.5 flex items-center justify-center overflow-hidden bg-gray-100 rounded-lg transition-all duration-300 group-hover:shadow-xl">
            <img src={largeCard.image} alt={largeCard.name}
              className="h-full object-contain transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="bg-green-600 text-white text-[9px] sm:text-[10px] px-2 sm:px-3 py-1 rounded-full font-semibold shadow">NEW</span>
              <span className="bg-black text-white text-[9px] sm:text-[10px] px-2 sm:px-3 py-1 rounded-full font-semibold shadow">LIMITED</span>
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 bg-black text-white text-xs font-bold px-4 py-2 rounded-lg transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                VIEW PRODUCT
              </span>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-black text-xs sm:text-sm group-hover:text-[#581a90] transition-colors">"{largeCard.name}"</h3>
            <p className="text-gray-400 text-xs mt-1">{largeCard.collection}</p>
          </div>
        </div>

      </div>

      <div className="mt-16 sm:mt-20">
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-none">AMON AMARTH</h1>
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-none">RAGNAROK</h1>
      </div>
    </section>
  );
}

export default FeaturedCollection;