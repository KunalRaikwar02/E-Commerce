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