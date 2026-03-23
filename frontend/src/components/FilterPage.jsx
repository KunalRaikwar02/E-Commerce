import React, { useState, useMemo } from "react";
import { 
  Home, ChevronRight, ChevronDown, SlidersHorizontal, Search, ChevronUp, Filter, ChevronLeft, X 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const FilterPage = () => {
  const navigate = useNavigate();
  
  // --- STATES ---
  const [showFilters, setShowFilters] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeAnime, setActiveAnime] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("NEWEST");
  
  const [openSection, setOpenSection] = useState({
    productType: true,
    anime: true,
    price: true,
    size: true
  });

  const itemsPerPage = 6;

  // --- MOCK DATA ---
  const allProducts = useMemo(() => {
    const data = [];
    for (let i = 1; i <= 12; i++) data.push({ id: `s${i}`, name: `Premium Shirt ${i}`, type: "Shirt", brand: "VELTORN", img: "/assets/images/tshirt2.jpeg", badge: "NEW", price: 150 + i, date: 20260300 + i });
    for (let i = 1; i <= 10; i++) data.push({ id: `j${i}`, name: `Denim Jeans ${i}`, type: "Jeans", brand: "MODA", img: "/assets/images/tshirt3.jpeg", badge: "LIMITED", price: 250 - i, date: 20260200 + i });
    for (let i = 1; i <= 8; i++) data.push({ id: `t${i}`, name: `Graphic T-Shirt ${i}`, type: "T-Shirt", brand: "SPIRITBOX", img: "/assets/images/tshirt4.jpeg", badge: "NEW", price: 80 + i, date: 20260310 + i });
    for (let i = 1; i <= 4; i++) data.push({ id: `c${i}`, name: `Street Cap ${i}`, type: "Cap", brand: "VELTORN", img: "/assets/images/tshirt5.jpeg", badge: "LIMITED", price: 40 + i, date: 20260100 + i });
    for (let i = 1; i <= 8; i++) data.push({ id: `a${i}`, name: `Accessory ${i}`, type: "Accessories", brand: "EVANGELION", img: "/assets/images/tshirt6.jpeg", badge: "NEW", price: 20 + i, date: 20260315 + i });

    const animes = ["Naruto", "Solo Leveling", "Demon Slayer", "Evangelion"];
    animes.forEach(anime => {
      for (let i = 1; i <= 12; i++) {
        data.push({ 
          id: `${anime}-${i}`, 
          name: `${anime} Edition Vol ${i}`, 
          type: "Anime", 
          animeTag: anime, 
          brand: anime.toUpperCase(), 
          img: "/assets/images/tshirt2.jpeg", 
          badge: "SPECIAL", 
          price: 199, 
          date: 20260320 
        });
      }
    });
    return data;
  }, []);

  // --- FILTER & SORT LOGIC ---
  const processedProducts = useMemo(() => {
    let filtered = allProducts;
    if (activeAnime) {
      filtered = filtered.filter(p => p.animeTag === activeAnime);
    } else if (activeFilter !== "All") {
      filtered = filtered.filter(p => p.type === activeFilter);
    }
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (sortOption === "PRICE: LOW TO HIGH") filtered.sort((a, b) => a.price - b.price);
    else if (sortOption === "PRICE: HIGH TO LOW") filtered.sort((a, b) => b.price - a.price);
    else filtered.sort((a, b) => b.date - a.date);
    return filtered;
  }, [allProducts, activeFilter, activeAnime, searchQuery, sortOption]);

  const totalPages = Math.ceil(processedProducts.length / itemsPerPage);
  const currentItems = processedProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const renderPagination = () => {
    let pages = [];
    pages.push(
      <button key="prev" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        className="w-10 h-10 flex items-center justify-center rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-30">
        <ChevronLeft size={16} />
      </button>
    );
    const start = currentPage;
    const end = Math.min(start + 1, totalPages);
    for (let i = start; i <= end; i++) {
      pages.push(
        <div key={i} onClick={() => setCurrentPage(i)}
          className={`w-10 h-10 flex items-center justify-center rounded-md cursor-pointer transition-all text-sm font-bold ${currentPage === i ? "bg-black text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
          {i}
        </div>
      );
    }
    pages.push(
      <button key="next" disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        className="w-10 h-10 flex items-center justify-center rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-30">
        <ChevronRight size={16} />
      </button>
    );
    return pages;
  };

  const handleReset = () => {
    setActiveFilter("All");
    setActiveAnime(null);
    setSearchQuery("");
    setCurrentPage(1);
    setSortOption("NEWEST");
  };

  return (
    <div className="pt-20 md:pt-28 pb-10 px-4 md:px-12 bg-white min-h-screen font-sans text-black overflow-x-hidden">
      
      {/* 1. BREADCRUMBS */}
      <div className="flex mt-5 items-center gap-2 text-gray-400 mb-6 text-[10px] md:text-sm overflow-x-auto whitespace-nowrap scrollbar-hide">
        <Home size={16} className="cursor-pointer hover:text-black shrink-0" onClick={() => navigate("/")} />
        <ChevronRight size={12} className="shrink-0" />
        <span className="cursor-pointer hover:text-black shrink-0" onClick={() => navigate("/collections/all")}>Shop All</span>
        <ChevronRight size={12} className="shrink-0" />
        <span className="text-black font-medium uppercase tracking-wider shrink-0">{activeAnime || activeFilter}</span>
      </div>

      {/* 2. TOP TOOLBAR */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="flex gap-2 w-full lg:w-auto">
          <button onClick={() => setShowFilters(!showFilters)}
            className="flex-1 lg:flex-none flex items-center justify-center gap-2 border border-gray-200 px-4 py-3 rounded-md font-bold text-xs md:text-sm hover:bg-black hover:text-white transition-all whitespace-nowrap">
            {showFilters ? <><SlidersHorizontal size={18} /> HIDE</> : <><Filter size={18} /> FILTERS</>}
          </button>
          
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}
            className="flex-1 lg:flex-none border border-gray-200 px-2 md:px-4 py-3 rounded-md font-bold text-[10px] md:text-xs outline-none bg-white uppercase">
            <option value="NEWEST">Newest</option>
            <option value="PRICE: LOW TO HIGH">Price: Low to High</option>
            <option value="PRICE: HIGH TO LOW">Price: High to Low</option>
          </select>
        </div>
        
        <div className="flex-1 relative order-last lg:order-none">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input type="text" value={searchQuery} onChange={(e) => {setSearchQuery(e.target.value); setCurrentPage(1);}}
            placeholder="Search products..." className="w-full bg-gray-50 border border-gray-100 rounded-md py-3 pl-12 pr-4 focus:ring-1 focus:ring-black outline-none font-medium text-sm" />
        </div>

        <div className="flex justify-center md:justify-end items-center gap-2">
          {renderPagination()}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 md:gap-10 relative">
        
        {/* 3. LEFT SIDEBAR (RESPONSIVE) */}
        {showFilters && (
          <aside className="w-full lg:w-72 space-y-3 shrink-0 animate-in fade-in slide-in-from-left-4 duration-300">
            {/* Sidebar Sections (Same as your code) */}
            <div className="bg-[#f9f9f9] rounded-xl overflow-hidden shadow-sm border border-gray-50">
              <div onClick={() => setOpenSection({...openSection, productType: !openSection.productType})} className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-100 transition">
                <span className="font-bold text-xs uppercase tracking-widest">Product Type</span>
                {openSection.productType ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
              </div>
              {openSection.productType && (
                <div className="px-5 pb-5 pt-2 space-y-4 text-xs font-bold text-gray-500">
                  {[{ name: "T-Shirt", count: 8 }, { name: "Shirt", count: 12 }, { name: "Jeans", count: 10 }, { name: "Cap", count: 4 }, { name: "Accessories", count: 8 }].map((cat) => (
                    <div key={cat.name} onClick={() => {setActiveFilter(cat.name); setActiveAnime(null); setCurrentPage(1);}}
                      className={`flex justify-between cursor-pointer hover:text-black transition uppercase ${(activeFilter === cat.name && !activeAnime) ? "text-black font-black" : ""}`}>
                      <span>{cat.name}</span> <span className="text-[10px] bg-gray-200 px-2 py-0.5 rounded-full">{cat.count}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-[#f9f9f9] rounded-xl overflow-hidden shadow-sm border border-gray-50">
              <div onClick={() => setOpenSection({...openSection, anime: !openSection.anime})} className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-100 transition">
                <span className="font-bold text-xs uppercase tracking-widest">Anime Collection</span>
                {openSection.anime ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
              </div>
              {openSection.anime && (
                <div className="px-5 pb-5 pt-2 space-y-4 text-xs font-bold text-gray-500">
                  {["Naruto", "Solo Leveling", "Demon Slayer", "Evangelion"].map((anim) => (
                    <div key={anim} onClick={() => {setActiveAnime(anim); setCurrentPage(1);}}
                      className={`flex justify-between cursor-pointer hover:text-black transition uppercase ${activeAnime === anim ? "text-black font-black" : ""}`}>
                      <span>{anim}</span> <span className="text-[10px] bg-gray-200 px-2 py-0.5 rounded-full">12</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-[#f9f9f9] rounded-xl overflow-hidden shadow-sm border border-gray-50">
              <div onClick={() => setOpenSection({...openSection, price: !openSection.price})} className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-100 transition">
                <span className="font-bold text-xs uppercase tracking-widest">Shop by Price</span>
                {openSection.price ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
              </div>
              {openSection.price && (
                <div className="px-5 pb-5 pt-2 space-y-3">
                  {["$0 - $50", "$50 - $100", "Over $100"].map((p, i) => (
                    <label key={i} className="flex items-center gap-3 cursor-pointer text-[10px] md:text-xs font-bold text-gray-500 group uppercase">
                      <input type="checkbox" className="w-4 h-4 accent-black rounded border-gray-300" />
                      <span className="group-hover:text-black transition">{p}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-[#f9f9f9] rounded-xl overflow-hidden shadow-sm border border-gray-50">
              <div onClick={() => setOpenSection({...openSection, size: !openSection.size})} className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-100 transition">
                <span className="font-bold text-xs uppercase tracking-widest">Size</span>
                {openSection.size ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
              </div>
              {openSection.size && (
                <div className="px-5 pb-5 pt-2 grid grid-cols-3 gap-2">
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                    <button key={sz} className="py-2 border border-gray-200 text-[10px] font-black rounded-lg hover:bg-black hover:text-white transition uppercase">{sz}</button>
                  ))}
                </div>
              )}
            </div>

            <button onClick={handleReset} className="w-full py-4 mt-2 font-black text-xs border border-black rounded-xl hover:bg-black hover:text-white transition uppercase tracking-[0.2em] bg-white shadow-lg shadow-gray-100">
              Reset All
            </button>
          </aside>
        )}

        {/* 4. RIGHT PRODUCT GRID (DYNAMIC COLUMNS) */}
        <main className={`flex-1 grid grid-cols-1 sm:grid-cols-2 ${showFilters ? 'xl:grid-cols-2' : 'xl:grid-cols-3'} gap-x-4 md:gap-x-8 gap-y-10 transition-all duration-500`}>
          {currentItems.map((prod) => (
            <div key={prod.id} className="group cursor-pointer">
              <div className="relative aspect-[4/5] bg-gray-100 rounded-3xl overflow-hidden">
                <img src={prod.img} alt={prod.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-in-out" />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className={`${prod.badge === 'NEW' ? 'bg-emerald-500' : (prod.badge === 'SPECIAL' ? 'bg-indigo-600' : 'bg-black')} text-white text-[8px] md:text-[10px] px-3 py-1.5 rounded-full font-black tracking-tighter uppercase`}>
                    {prod.badge}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs md:text-sm font-black shadow-xl">
                  ${prod.price}
                </div>
              </div>
              <div className="mt-4 px-1">
                <h3 className="font-black text-base md:text-xl leading-tight uppercase tracking-tighter group-hover:text-indigo-600 transition-colors">{prod.name}</h3>
                <p className="text-gray-400 text-[10px] md:text-xs font-bold uppercase tracking-[0.1em] mt-1">{prod.brand}</p>
              </div>
            </div>
          ))}
          
          {currentItems.length === 0 && (
            <div className="col-span-full py-32 text-center">
              <div className="inline-block p-10 bg-gray-50 rounded-full mb-4">
                 <Search size={48} className="text-gray-200" />
              </div>
              <p className="font-black text-xl text-gray-300 uppercase tracking-widest">No Items Found</p>
            </div>
          )}
        </main>
      </div>

      {/* FOOTER PAGINATION (FOR MOBILE) */}
      <div className="mt-16 flex lg:hidden justify-center items-center gap-3">
        {renderPagination()}
      </div>
    </div>
  );
};

export default FilterPage;