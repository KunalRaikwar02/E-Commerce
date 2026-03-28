import React from "react";
import { SlidersHorizontal, Filter, Search } from "lucide-react";

const TopToolbar = ({ 
  showFilters, setShowFilters, sortOption, setSortOption, 
  searchQuery, setSearchQuery, renderPagination 
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 mb-8">
      <div className="flex gap-2">
        <button onClick={() => setShowFilters(!showFilters)} className="flex-1 lg:flex-none flex items-center justify-center gap-2 border border-gray-200 px-5 py-3 rounded-md font-bold text-xs hover:bg-black hover:text-white transition-all">
          {showFilters ? <><SlidersHorizontal size={16} /> HIDE</> : <><Filter size={16} /> FILTERS</>}
        </button>
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="flex-1 lg:flex-none border border-gray-200 px-4 py-3 rounded-md font-bold text-xs outline-none bg-white uppercase tracking-tight cursor-pointer">
          <option value="NEWEST">Sort: Newest First</option>
          <option value="PRICE: LOW TO HIGH">Price: Low to High</option>
          <option value="PRICE: HIGH TO LOW">Price: High to Low</option>
        </select>
      </div>
      <div className="flex-1 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search for products..." className="w-full bg-gray-50 border-none rounded-md py-3 pl-12 pr-4 focus:ring-1 focus:ring-black outline-none font-medium text-sm" />
      </div>
      <div className="flex justify-center items-center gap-2">{renderPagination()}</div>
    </div>
  );
};

export default TopToolbar;