import React, { useRef, useState, useEffect } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./components/ProductCard";
import CategoryCard from "./components/CategoryCard";
import AnimeFollowSection from "./components/AnimeFollowSection";
import { pageProductsAPI } from "../../services/api";

const STATIC_TOP_PICKS = [
  { id: "ap1", name: "Giyu Tomioka Oversized", price: "999", img: "/assets/images/tshirt11.png", collection: "DEMON SLAYER SERIES", badge: "NEW", sizes: ["S", "M", "L", "XL", "XXL"], brand: "VELTORN" },
  { id: "ap2", name: "Naruto Sage Mode Tee", price: "899", img: "/assets/images/tshirt2.jpeg", collection: "SHIPPUDEN EDITION", badge: "NEW", sizes: ["S", "M", "L", "XL"], brand: "VELTORN" },
  { id: "ap3", name: "Luffy Gear 5 Special", price: "1099", img: "/assets/images/tshirt3.jpeg", collection: "ONE PIECE WORLD", badge: "SPECIAL", sizes: ["M", "L", "XL", "XXL"], brand: "VELTORN" },
  { id: "ap4", name: "Solo Leveling Shadow Tee", price: "899", img: "/assets/images/tshirt4.jpeg", collection: "HUNTER COLLECTION", badge: "NEW", sizes: ["S", "M", "L", "XL"], brand: "VELTORN" },
  { id: "ap5", name: "Demon Slayer Black Tee", price: "949", img: "/assets/images/tshirt5.jpeg", collection: "DEMON SLAYER SERIES", badge: "LIMITED", sizes: ["M", "L", "XL"], brand: "VELTORN" },
  { id: "ap6", name: "One Piece Straw Hat Tee", price: "899", img: "/assets/images/tshirt6.jpeg", collection: "ONE PIECE WORLD", badge: "NEW", sizes: ["S", "M", "L", "XL", "XXL"], brand: "VELTORN" },
];

const STATIC_CATEGORIES = [
  { id: 1, name: "Naruto", label: "NARUTO / NARUTO SHIPPUDEN", items: "12 ITEMS", img: "/assets/images/tshirt2.jpeg", sectionKey: "anime_naruto" },
  { id: 2, name: "Solo Leveling", label: "SOLO LEVELING", items: "12 ITEMS", img: "/assets/images/tshirt4.jpeg", sectionKey: "anime_solo_leveling" },
  { id: 3, name: "Demon Slayer", label: "DEMON SLAYER", items: "12 ITEMS", img: "/assets/images/tshirt5.jpeg", sectionKey: "anime_demon_slayer" },
  { id: 4, name: "One Piece", label: "ONE PIECE", items: "12 ITEMS", img: "/assets/images/tshirt3.jpeg", sectionKey: "anime_one_piece" },
];

const AnimeCollection = () => {
  const topPicksRef = useRef(null);
  const navigate = useNavigate();
  const [topPicks, setTopPicks] = useState(STATIC_TOP_PICKS);
  const [animeCategories, setAnimeCategories] = useState(STATIC_CATEGORIES);

  // Fetch top picks
  useEffect(() => {
    pageProductsAPI.getSection("anime_picks")
      .then(data => {
        if (data.products && data.products.length > 0) {
          setTopPicks(data.products.map(p => ({
            id: String(p.id),
            name: p.name,
            price: String(p.price),
            img: p.img,
            collection: p.collection || "ANIME COLLECTION",
            badge: p.badge || "NEW",
            sizes: p.sizes || ["S", "M", "L", "XL"],
            brand: p.brand || "VELTORN",
          })));
        }
      })
      .catch(() => {});
  }, []);

  // Fetch category images
  useEffect(() => {
    const keys = ["anime_naruto", "anime_solo_leveling", "anime_demon_slayer", "anime_one_piece"];
    Promise.allSettled(keys.map(k => pageProductsAPI.getSection(k)))
      .then(results => {
        setAnimeCategories(prev =>
          prev.map((cat, i) => {
            const r = results[i];
            if (r.status === "fulfilled" && r.value.products?.length > 0) {
              return { ...cat, img: r.value.products[0].img };
            }
            return cat;
          })
        );
      })
      .catch(() => {});
  }, []);

  const scroll = (ref, direction) => {
    ref.current?.scrollBy({ left: direction === "left" ? -450 : 450, behavior: "smooth" });
  };

  const handleProductClick = (product) => {
    window.scrollTo(0, 0);
    navigate(`/product/${product.id}`, { state: { product } });
  };

  const navigateToFilter = (type, value) => {
    window.scrollTo(0, 0);
    navigate("/collections/all", { state: type === "anime" ? { anime: value } : { filter: value } });
  };

  return (
    <div className="min-h-screen bg-white mt-8 overflow-x-hidden">
      <div className="w-full">
        <img src="/assets/images/collectionimg.png" alt="Banner" className="w-full h-[40vh] md:h-[70vh] object-cover object-top" />
      </div>

      {/* TOP PICKS*/}
      <div className="px-4 md:px-6 lg:px-10 mt-16">
        <div className="flex justify-between items-center mb-3 py-4">
          <h2 className="text-[#581a90] text-3xl md:text-6xl font-black uppercase tracking-[-3px] scale-y-[1.6] origin-left leading-none">TOP PICKS FOR YOU</h2>
          <button onClick={() => navigateToFilter("filter", "All")}
            className="group bg-[#581a90] text-white px-5 py-2.5 rounded-md flex items-center gap-2 text-[10px] md:text-xs font-bold tracking-[2px] hover:bg-purple-800 transition-all shrink-0 uppercase cursor-pointer">
            VIEW ALL <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="flex justify-end gap-3 mb-4">
          <button onClick={() => scroll(topPicksRef, "left")} className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 text-zinc-500 hover:text-[#581a90] hover:border-[#581a90] transition-all rounded-sm font-bold text-[10px] uppercase tracking-widest cursor-pointer group">
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Prev
          </button>
          <button onClick={() => scroll(topPicksRef, "right")} className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 text-zinc-500 hover:text-[#581a90] hover:border-[#581a90] transition-all rounded-sm font-bold text-[10px] uppercase tracking-widest cursor-pointer group">
            Next <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div ref={topPicksRef} className="flex gap-x-4 md:gap-x-6 overflow-x-auto pb-16 scrollbar-hide py-2 items-start snap-x">
          {topPicks.map((product) => (
            <div key={product.id} onClick={() => handleProductClick(product)} className="cursor-pointer">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* ANIME COLLECTION*/}
      <div className="px-4 md:px-6 lg:px-10 mt-26">
        <div className="flex justify-between items-center mb-12 py-4">
          <h2 className="text-[#581a90] text-3xl md:text-6xl font-black uppercase tracking-[-3px] scale-y-[1.6] origin-left leading-none">ANIME COLLECTION</h2>
          <button onClick={() => navigateToFilter("filter", "Anime")}
            className="group bg-[#581a90] text-white px-5 py-2.5 rounded-md flex items-center gap-2 text-[10px] md:text-xs font-bold tracking-[2px] hover:bg-purple-800 transition-all shrink-0 uppercase cursor-pointer">
            SHOP ALL <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {animeCategories.map((cat, index) => (
            <div key={cat.id} onClick={() => navigateToFilter("anime", cat.name)} className="cursor-pointer">
              <CategoryCard cat={{ ...cat, name: cat.label }} isNew={index === 0} />
            </div>
          ))}
        </div>
      </div>

      <AnimeFollowSection />
    </div>
  );
};

export default AnimeCollection;