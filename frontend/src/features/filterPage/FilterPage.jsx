// // import React, { useState, useMemo, useEffect } from "react";
// // import { useLocation } from "react-router-dom"; // Navigation state read karne ke liye
// // import { ChevronLeft, ChevronRight } from "lucide-react";
// // import Breadcrumbs from "./components/Breadcrumbs";
// // import TopToolbar from "./components/TopToolbar";
// // import FilterSidebar from "./components/FilterSidebar";
// // import ProductGrid from "./components/ProductGrid";

// // const FilterPage = () => {
// //   const location = useLocation(); // Hook to get data from navigation
// //   const [showFilters, setShowFilters] = useState(true);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [activeFilter, setActiveFilter] = useState("All");
// //   const [activeAnime, setActiveAnime] = useState(null);
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [sortOption, setSortOption] = useState("NEWEST");
// //   const [selectedSize, setSelectedSize] = useState(null);
// //   const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  
// //   const itemsPerPage = 6;

// //   // --- SYNC WITH FOOTER & CATEGORIES CLICK ---
// //   useEffect(() => {
// //     // Agar location state mein koi filter ya anime data hai (Footer ya Categories se)
// //     if (location.state) {
// //       if (location.state.filter) {
// //         setActiveFilter(location.state.filter);
// //         setActiveAnime(null); // Reset anime if category is selected
// //       } else if (location.state.anime) {
// //         setActiveAnime(location.state.anime);
// //         setActiveFilter("All"); // Reset category if anime is selected
// //       }
      
// //       setCurrentPage(1);
// //       window.scrollTo(0, 0); // Ensure page starts from top
// //     }
// //   }, [location.state]);

// //   // --- MOCK DATA ---
// //   const allProducts = useMemo(() => {
// //     let data = [];
// //     const sizeOptions = [['S', 'M', 'L'], ['M', 'L', 'XL'], ['S', 'M', 'L', 'XL', 'XXL'], ['L'], ['M']];
    
// //     for (let i = 1; i <= 18; i++) data.push({ id: `t${i}`, name: `Graphic T-Shirt ${i}`, type: "T-Shirt", brand: "SPIRITBOX", img: "/assets/images/tshirt4.jpeg", badge: "NEW", price: 500 + (i * 15), sizes: sizeOptions[i % 3], date: 20260310 + i });
// //     for (let i = 1; i <= 22; i++) data.push({ id: `s${i}`, name: `Premium Shirt ${i}`, type: "Shirt", brand: "VELTORN", img: "/assets/images/tshirt2.jpeg", badge: "NEW", price: 400 + (i * 30), sizes: sizeOptions[i % 5], date: 20260300 + i });
// //     for (let i = 1; i <= 10; i++) data.push({ id: `j${i}`, name: `Denim Jeans ${i}`, type: "Jeans", brand: "MODA", img: "/assets/images/tshirt3.jpeg", badge: "LIMITED", price: 800 + (i * 20), sizes: ['30', '32', '34'], date: 20260200 + i });
// //     for (let i = 1; i <= 12; i++) data.push({ id: `c${i}`, name: `Street Cap ${i}`, type: "Cap", brand: "VELTORN", img: "/assets/images/tshirt5.jpeg", badge: "LIMITED", price: 300 + (i * 10), sizes: ['Free Size'], date: 20260100 + i });
// //     for (let i = 1; i <= 15; i++) data.push({ id: `a${i}`, name: `Accessory ${i}`, type: "Accessories", brand: "One Piece", img: "/assets/images/tshirt6.jpeg", badge: "NEW", price: 150 + (i * 5), sizes: ['N/A'], date: 20260315 + i });

// //     const animes = ["Naruto", "Solo Leveling", "Demon Slayer", "One Piece"];
// //     animes.forEach(anime => {
// //       for (let i = 1; i <= 12; i++) {
// //         data.push({ id: `${anime}-${i}`, name: `${anime} Edition Vol ${i}`, type: "Anime", animeTag: anime, brand: anime.toUpperCase(), img: "/assets/images/tshirt2.jpeg", badge: "SPECIAL", price: 999, sizes: ['M', 'L'], date: 20260320 });
// //       }
// //     });

// //     return data.sort((a, b) => {
// //         if (a.type === "T-Shirt" && b.type !== "T-Shirt") return -1;
// //         if (a.type !== "T-Shirt" && b.type === "T-Shirt") return 1;
// //         return 0;
// //     });
// //   }, []);

// //   // --- COUNTS FOR SIDEBAR ---
// //   const counts = useMemo(() => ({
// //     types: {
// //       "T-Shirt": allProducts.filter(p => p.type === "T-Shirt").length,
// //       "Shirt": allProducts.filter(p => p.type === "Shirt").length,
// //       "Jeans": allProducts.filter(p => p.type === "Jeans").length,
// //       "Cap": allProducts.filter(p => p.type === "Cap").length,
// //       "Accessories": allProducts.filter(p => p.type === "Accessories").length,
// //     },
// //     animes: {
// //       "Naruto": allProducts.filter(p => p.animeTag === "Naruto").length,
// //       "Solo Leveling": allProducts.filter(p => p.animeTag === "Solo Leveling").length,
// //       "Demon Slayer": allProducts.filter(p => p.animeTag === "Demon Slayer").length,
// //       "One Piece": allProducts.filter(p => p.animeTag === "One Piece").length,
// //     }
// //   }), [allProducts]);

// //   // --- FILTER & SORT ---
// //   const processedProducts = useMemo(() => {
// //     let filtered = allProducts;
// //     if (activeAnime) filtered = filtered.filter(p => p.animeTag === activeAnime);
// //     else if (activeFilter !== "All") filtered = filtered.filter(p => p.type === activeFilter);
// //     if (searchQuery) filtered = filtered.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
// //     if (selectedSize) filtered = filtered.filter(p => p.sizes.includes(selectedSize));
// //     if (selectedPriceRange) {
// //       filtered = filtered.filter(p => {
// //         if (selectedPriceRange === "under499") return p.price < 499;
// //         if (selectedPriceRange === "599-799") return p.price >= 599 && p.price <= 799;
// //         if (selectedPriceRange === "899-999") return p.price >= 899 && p.price <= 999;
// //         if (selectedPriceRange === "over999") return p.price > 999;
// //         return true;
// //       });
// //     }
// //     if (sortOption === "PRICE: LOW TO HIGH") filtered.sort((a, b) => a.price - b.price);
// //     else if (sortOption === "PRICE: HIGH TO LOW") filtered.sort((a, b) => b.price - a.price);
// //     return filtered;
// //   }, [allProducts, activeFilter, activeAnime, searchQuery, sortOption, selectedSize, selectedPriceRange]);

// //   const totalPages = Math.ceil(processedProducts.length / itemsPerPage);
// //   const currentItems = processedProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

// //   // --- SLIDING WINDOW PAGINATION LOGIC ---
// //   const renderPagination = () => {
// //     if (totalPages <= 1) return null;
// //     let pages = [];
// //     const maxVisible = 3; 
// //     let startPage = Math.max(1, currentPage - 1);
// //     let endPage = Math.min(totalPages, startPage + maxVisible - 1);
// //     if (endPage - startPage < maxVisible - 1) startPage = Math.max(1, endPage - maxVisible + 1);

// //     pages.push(
// //       <button key="prev" disabled={currentPage === 1} onClick={() => { setCurrentPage(prev => Math.max(prev - 1, 1)); window.scrollTo(0, 0); }}
// //         className="w-8 h-8 flex items-center justify-center rounded bg-gray-50 disabled:opacity-30 border border-gray-100"><ChevronLeft size={14} /></button>
// //     );

// //     for (let i = startPage; i <= endPage; i++) {
// //       pages.push(
// //         <button key={i} onClick={() => { setCurrentPage(i); window.scrollTo(0, 0); }}
// //           className={`w-8 h-8 flex items-center justify-center rounded text-[10px] font-bold transition-all border ${currentPage === i ? "bg-black text-white border-black shadow-lg" : "bg-white text-gray-400 border-gray-100 hover:border-black hover:text-black"}`}>
// //           {i}
// //         </button>
// //       );
// //     }

// //     pages.push(
// //       <button key="next" disabled={currentPage === totalPages} onClick={() => { setCurrentPage(prev => Math.min(prev + 1, totalPages)); window.scrollTo(0, 0); }}
// //         className="w-8 h-8 flex items-center justify-center rounded bg-gray-50 disabled:opacity-30 border border-gray-100"><ChevronRight size={14} /></button>
// //     );

// //     return <div className="flex items-center gap-1.5">{pages}</div>;
// //   };

// //   const handleReset = () => {
// //     setActiveFilter("All"); setActiveAnime(null); setSearchQuery("");
// //     setCurrentPage(1); setSortOption("NEWEST"); setSelectedSize(null); setSelectedPriceRange(null);
// //   };

// //   return (
// //     <div className="pt-24 pb-10 px-4 md:px-12 bg-white min-h-screen text-black">
// //       <Breadcrumbs activeFilter={activeFilter} activeAnime={activeAnime} resetFilters={handleReset} />
      
// //       <TopToolbar 
// //         showFilters={showFilters} setShowFilters={setShowFilters}
// //         sortOption={sortOption} setSortOption={setSortOption}
// //         searchQuery={searchQuery} setSearchQuery={setSearchQuery}
// //         renderPagination={renderPagination}
// //       />

// //       <div className="flex flex-col lg:flex-row gap-8 mt-6">
// //         {showFilters && (
// //           <FilterSidebar 
// //             activeFilter={activeFilter} setActiveFilter={setActiveFilter}
// //             activeAnime={activeAnime} setActiveAnime={setActiveAnime}
// //             selectedPriceRange={selectedPriceRange} setSelectedPriceRange={setSelectedPriceRange}
// //             selectedSize={selectedSize} setSelectedSize={setSelectedSize}
// //             handleReset={handleReset} setCurrentPage={setCurrentPage}
// //             counts={counts}
// //           />
// //         )}
// //         <ProductGrid products={currentItems} showFilters={showFilters} />
// //       </div>
// //     </div>
// //   );
// // };

// // export default FilterPage;





// import React, { useState, useEffect, useCallback } from "react";
// import { useLocation } from "react-router-dom";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import Breadcrumbs from "./components/Breadcrumbs";
// import TopToolbar from "./components/TopToolbar";
// import FilterSidebar from "./components/FilterSidebar";
// import ProductGrid from "./components/ProductGrid";
// import { productAPI } from "../../services/api";

// const FilterPage = () => {
//   const location = useLocation();

//   const [showFilters, setShowFilters] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [activeFilter, setActiveFilter] = useState("All");
//   const [activeAnime, setActiveAnime] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortOption, setSortOption] = useState("NEWEST");
//   const [selectedSize, setSelectedSize] = useState(null);
//   const [selectedPriceRange, setSelectedPriceRange] = useState(null);

//   const [products, setProducts] = useState([]);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(false);

//   const itemsPerPage = 6;

//   // Sync from navigation state (footer, categories, navbar search)
//   useEffect(() => {
//     if (location.state) {
//       if (location.state.search) {
//         setSearchQuery(location.state.search);
//         setActiveFilter("All");
//         setActiveAnime(null);
//       } else if (location.state.filter) {
//         setActiveFilter(location.state.filter);
//         setActiveAnime(null);
//         setSearchQuery("");
//       } else if (location.state.anime) {
//         setActiveAnime(location.state.anime);
//         setActiveFilter("All");
//         setSearchQuery("");
//       }
//       setCurrentPage(1);
//       window.scrollTo(0, 0);
//     }
//   }, [location.state]);

//   const fetchProducts = useCallback(async () => {
//     setLoading(true);
//     try {
//       const params = { page: currentPage, limit: itemsPerPage };

//       if (activeAnime) params.anime = activeAnime;
//       else if (activeFilter !== "All") params.category = activeFilter;
//       if (searchQuery) params.search = searchQuery;
//       if (sortOption === "PRICE: LOW TO HIGH") params.sort = "price_asc";
//       else if (sortOption === "PRICE: HIGH TO LOW") params.sort = "price_desc";

//       const data = await productAPI.getAll(params);

//       let filtered = data.products || [];

//       // Client-side size + price filter
//       if (selectedSize) filtered = filtered.filter(p => p.sizes?.includes(selectedSize));
//       if (selectedPriceRange) {
//         filtered = filtered.filter(p => {
//           if (selectedPriceRange === "under499") return p.price < 499;
//           if (selectedPriceRange === "599-799") return p.price >= 599 && p.price <= 799;
//           if (selectedPriceRange === "899-999") return p.price >= 899 && p.price <= 999;
//           if (selectedPriceRange === "over999") return p.price > 999;
//           return true;
//         });
//       }

//       const formatted = filtered.map(p => ({
//         id: p._id,
//         name: p.name,
//         price: p.price,
//         img: p.images?.[0] || "/assets/images/tshirt2.jpeg",
//         brand: p.brand,
//         badge: p.badge,
//         sizes: p.sizes || [],
//         collection: p.animeTag || p.category,
//         type: p.category,
//         animeTag: p.animeTag,
//       }));

//       setProducts(formatted);
//       setTotalPages(data.pages || 1);
//     } catch (err) {
//       console.error("Products fetch error:", err.message);
//       setProducts([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [currentPage, activeFilter, activeAnime, searchQuery, sortOption, selectedSize, selectedPriceRange]);

//   useEffect(() => { fetchProducts(); }, [fetchProducts]);

//   const counts = {
//     types: { "T-Shirt": 18, "Shirt": 22, "Jeans": 10, "Cap": 12, "Accessories": 15 },
//     animes: { "Naruto": 12, "Solo Leveling": 12, "Demon Slayer": 12, "One Piece": 12 },
//   };

//   const renderPagination = () => {
//     if (totalPages <= 1) return null;
//     const pages = [];
//     const maxVisible = 3;
//     let startPage = Math.max(1, currentPage - 1);
//     let endPage = Math.min(totalPages, startPage + maxVisible - 1);
//     if (endPage - startPage < maxVisible - 1) startPage = Math.max(1, endPage - maxVisible + 1);

//     pages.push(
//       <button key="prev" disabled={currentPage === 1}
//         onClick={() => { setCurrentPage(p => Math.max(p - 1, 1)); window.scrollTo(0, 0); }}
//         className="w-8 h-8 flex items-center justify-center rounded bg-gray-50 disabled:opacity-30 border border-gray-100">
//         <ChevronLeft size={14} />
//       </button>
//     );
//     for (let i = startPage; i <= endPage; i++) {
//       pages.push(
//         <button key={i} onClick={() => { setCurrentPage(i); window.scrollTo(0, 0); }}
//           className={`w-8 h-8 flex items-center justify-center rounded text-[10px] font-bold transition-all border ${currentPage === i ? "bg-black text-white border-black" : "bg-white text-gray-400 border-gray-100 hover:border-black hover:text-black"}`}>
//           {i}
//         </button>
//       );
//     }
//     pages.push(
//       <button key="next" disabled={currentPage === totalPages}
//         onClick={() => { setCurrentPage(p => Math.min(p + 1, totalPages)); window.scrollTo(0, 0); }}
//         className="w-8 h-8 flex items-center justify-center rounded bg-gray-50 disabled:opacity-30 border border-gray-100">
//         <ChevronRight size={14} />
//       </button>
//     );
//     return <div className="flex items-center gap-1.5">{pages}</div>;
//   };

//   const handleReset = () => {
//     setActiveFilter("All"); setActiveAnime(null); setSearchQuery("");
//     setCurrentPage(1); setSortOption("NEWEST"); setSelectedSize(null); setSelectedPriceRange(null);
//   };

//   return (
//     <div className="pt-24 pb-10 px-4 md:px-12 bg-white min-h-screen text-black">
//       <Breadcrumbs activeFilter={activeFilter} activeAnime={activeAnime} resetFilters={handleReset} />

//       <TopToolbar
//         showFilters={showFilters} setShowFilters={setShowFilters}
//         sortOption={sortOption} setSortOption={setSortOption}
//         searchQuery={searchQuery} setSearchQuery={setSearchQuery}
//         renderPagination={renderPagination}
//       />

//       <div className="flex flex-col lg:flex-row gap-8 mt-6">
//         {showFilters && (
//           <FilterSidebar
//             activeFilter={activeFilter} setActiveFilter={setActiveFilter}
//             activeAnime={activeAnime} setActiveAnime={setActiveAnime}
//             selectedPriceRange={selectedPriceRange} setSelectedPriceRange={setSelectedPriceRange}
//             selectedSize={selectedSize} setSelectedSize={setSelectedSize}
//             handleReset={handleReset} setCurrentPage={setCurrentPage}
//             counts={counts}
//           />
//         )}

//         {loading ? (
//           <div className="flex-1 flex items-center justify-center py-40">
//             <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
//           </div>
//         ) : (
//           <ProductGrid products={products} showFilters={showFilters} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default FilterPage;




import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Breadcrumbs from "./components/Breadcrumbs";
import TopToolbar from "./components/TopToolbar";
import FilterSidebar from "./components/FilterSidebar";
import ProductGrid from "./components/ProductGrid";
import { productAPI } from "../../services/api";

const FilterPage = () => {
  const location = useLocation();

  const [showFilters, setShowFilters] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeAnime, setActiveAnime] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("NEWEST");
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);

  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 6;

  // Sync from navigation state
  useEffect(() => {
    if (location.state) {
      if (location.state.search) {
        setSearchQuery(location.state.search);
        setActiveFilter("All");
        setActiveAnime(null);
      } else if (location.state.filter) {
        setActiveFilter(location.state.filter);
        setActiveAnime(null);
        setSearchQuery("");
      } else if (location.state.anime) {
        setActiveAnime(location.state.anime);
        setActiveFilter("All");
        setSearchQuery("");
      }
      setCurrentPage(1);
      window.scrollTo(0, 0);
    }
  }, [location.state]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page: currentPage, limit: itemsPerPage };

      // ── KEY FIX ───────────────────────────────────────────────
      // "All" = NO category param → backend returns ALL products
      // Specific category = send only that category param
      // Anime filter = send anime tag (category param auto-set to Anime in backend)
      if (activeAnime) {
        params.anime = activeAnime;
        // Don't send category for anime — backend handles it
      } else if (activeFilter && activeFilter !== "All") {
        params.category = activeFilter;
        // Only send category if NOT "All"
      }
      // If activeFilter === "All" → send NO category → all products shown

      if (searchQuery) params.search = searchQuery;
      if (sortOption === "PRICE: LOW TO HIGH") params.sort = "price_asc";
      else if (sortOption === "PRICE: HIGH TO LOW") params.sort = "price_desc";

      const data = await productAPI.getAll(params);
      let filtered = data.products || [];

      // Client-side size + price filter
      if (selectedSize) filtered = filtered.filter(p => p.sizes?.includes(selectedSize));
      if (selectedPriceRange) {
        filtered = filtered.filter(p => {
          if (selectedPriceRange === "under499") return p.price < 499;
          if (selectedPriceRange === "599-799") return p.price >= 599 && p.price <= 799;
          if (selectedPriceRange === "899-999") return p.price >= 899 && p.price <= 999;
          if (selectedPriceRange === "over999") return p.price > 999;
          return true;
        });
      }

      const formatted = filtered.map(p => ({
        id: p._id,
        name: p.name,
        price: p.price,
        img: p.images?.[0] || "/assets/images/tshirt2.jpeg",
        brand: p.brand,
        badge: p.badge,
        sizes: p.sizes || [],
        collection: p.animeTag || p.category,
        type: p.category,
        animeTag: p.animeTag,
      }));

      setProducts(formatted);
      setTotalPages(data.pages || 1);
    } catch (err) {
      console.error("Products fetch error:", err.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, activeFilter, activeAnime, searchQuery, sortOption, selectedSize, selectedPriceRange]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const counts = {
    types: { "T-Shirt": 18, "Shirt": 22, "Jeans": 10, "Cap": 12, "Accessories": 15 },
    animes: { "Naruto": 12, "Solo Leveling": 12, "Demon Slayer": 12, "One Piece": 12 },
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;
    const pages = [];
    const maxVisible = 3;
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    if (endPage - startPage < maxVisible - 1) startPage = Math.max(1, endPage - maxVisible + 1);

    pages.push(
      <button key="prev" disabled={currentPage === 1}
        onClick={() => { setCurrentPage(p => Math.max(p - 1, 1)); window.scrollTo(0, 0); }}
        className="w-8 h-8 flex items-center justify-center rounded bg-gray-50 disabled:opacity-30 border border-gray-100">
        <ChevronLeft size={14} />
      </button>
    );
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button key={i} onClick={() => { setCurrentPage(i); window.scrollTo(0, 0); }}
          className={`w-8 h-8 flex items-center justify-center rounded text-[10px] font-bold transition-all border ${currentPage === i ? "bg-black text-white border-black" : "bg-white text-gray-400 border-gray-100 hover:border-black hover:text-black"}`}>
          {i}
        </button>
      );
    }
    pages.push(
      <button key="next" disabled={currentPage === totalPages}
        onClick={() => { setCurrentPage(p => Math.min(p + 1, totalPages)); window.scrollTo(0, 0); }}
        className="w-8 h-8 flex items-center justify-center rounded bg-gray-50 disabled:opacity-30 border border-gray-100">
        <ChevronRight size={14} />
      </button>
    );
    return <div className="flex items-center gap-1.5">{pages}</div>;
  };

  const handleReset = () => {
    setActiveFilter("All"); setActiveAnime(null); setSearchQuery("");
    setCurrentPage(1); setSortOption("NEWEST"); setSelectedSize(null); setSelectedPriceRange(null);
  };

  return (
    <div className="pt-24 pb-10 px-4 md:px-12 bg-white min-h-screen text-black">
      <Breadcrumbs activeFilter={activeFilter} activeAnime={activeAnime} resetFilters={handleReset} />

      <TopToolbar
        showFilters={showFilters} setShowFilters={setShowFilters}
        sortOption={sortOption} setSortOption={setSortOption}
        searchQuery={searchQuery} setSearchQuery={setSearchQuery}
        renderPagination={renderPagination}
      />

      <div className="flex flex-col lg:flex-row gap-8 mt-6">
        {showFilters && (
          <FilterSidebar
            activeFilter={activeFilter} setActiveFilter={setActiveFilter}
            activeAnime={activeAnime} setActiveAnime={setActiveAnime}
            selectedPriceRange={selectedPriceRange} setSelectedPriceRange={setSelectedPriceRange}
            selectedSize={selectedSize} setSelectedSize={setSelectedSize}
            handleReset={handleReset} setCurrentPage={setCurrentPage}
            counts={counts}
          />
        )}

        {loading ? (
          <div className="flex-1 flex items-center justify-center py-40">
            <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <ProductGrid products={products} showFilters={showFilters} />
        )}
      </div>
    </div>
  );
};

export default FilterPage;