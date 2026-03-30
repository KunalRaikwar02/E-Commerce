import {
  Search,
  Globe,
  User,
  ShoppingBag,
  X,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

function AnimeNavbar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showCountry, setShowCountry] = useState(false);
  const [showTrending, setShowTrending] = useState(true);

  const defaultTrending = [
    "Naruto Oversized Tee",
    "Solo Leveling Hoodie",
    "Demon Slayer Shorts",
  ];
  const [trendingItems, setTrendingItems] = useState(defaultTrending);

  const menuRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setActiveMenu(null);
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSearch = () => {
    if (!searchValue.trim()) return;
    console.log("Searching Anime:", searchValue);
  };

  const handleSuggestionClick = (text) => {
    setSearchValue(text);
    setTrendingItems((prev) => prev.filter((item) => item !== text));
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleClear = () => {
    setSearchValue("");
    setTrendingItems(defaultTrending);
  };

  return (
    <>
      {/* NAVBAR: 
          - Position: top-15 
          - Color: bg-black
          - Shape: rounded-3xl
      */}
      <nav data-cursor="white" className="w-full fixed top-15 left-0 z-50 px-4 sm:px-6 md:px-10">
        <div
          ref={menuRef}
          className="w-full bg-black text-white border border-gray-800 rounded-3xl shadow-2xl px-4 sm:px-6 md:px-12 h-16 sm:h-18 md:h-20 flex items-center justify-between"
        >
          <h1 className="text-lg sm:text-xl font-bold tracking-widest cursor-pointer uppercase">
            VELTORN 
          </h1>

          <div className="flex items-center gap-4 sm:gap-6 md:gap-8 relative">
            {/* SEARCH */}
            <div className="relative">
              <Search
                size={20}
                className="cursor-pointer hover:text-purple-400"
                onClick={() => setSearchOpen(!searchOpen)}
              />

              {searchOpen && (
                <div className="absolute right-0 top-14 w-[90vw] sm:w-80 md:w-96 bg-black border border-gray-800 rounded-2xl shadow-2xl p-4 sm:p-6 space-y-5">
                  <div className="flex items-center gap-3 border border-gray-700 rounded-xl px-4 py-3 bg-[#0a0a0a] focus-within:border-white transition">
                    <Search size={18} className="text-gray-400" />
                    <input
                      ref={inputRef}
                      type="text"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                      placeholder="Search anime gear..."
                      className="w-full bg-transparent outline-none text-sm placeholder:text-gray-600"
                    />
                    <X
                      size={18}
                      className="cursor-pointer hover:text-red-500"
                      onClick={handleClear}
                    />
                  </div>

                  {showTrending && searchValue === "" && trendingItems.length > 0 && (
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-500 text-xs uppercase font-bold tracking-tighter">
                        Trending
                      </p>
                      {trendingItems.map((item) => (
                        <p
                          key={item}
                          onClick={() => handleSuggestionClick(item)}
                          className="hover:text-purple-400 cursor-pointer transition-colors"
                        >
                          {item}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* GLOBE */}
            <Globe
              size={20}
              className="cursor-pointer hover:text-purple-400"
              onClick={() => setShowCountry(true)}
            />

            {/* ACCOUNT */}
            <div className="relative">
              <User
                size={20}
                className="cursor-pointer hover:text-purple-400"
                onClick={() =>
                  setActiveMenu(activeMenu === "account" ? null : "account")
                }
              />

              {activeMenu === "account" && (
                <div className="absolute right-0 top-14 w-48 sm:w-56 bg-black border border-gray-800 rounded-2xl shadow-xl p-4 sm:p-5 space-y-4">
                  <p className="hover:text-purple-400 cursor-pointer transition-colors">
                    👤 My Profile
                  </p>
                  <p className="hover:text-purple-400 cursor-pointer transition-colors">
                    📦 Orders
                  </p>
                  <p className="hover:text-red-500 cursor-pointer transition-colors">
                    Logout
                  </p>
                </div>
              )}
            </div>

            {/* BAG */}
            <div className="relative">
              <ShoppingBag
                size={20}
                className="cursor-pointer hover:text-purple-400"
                onClick={() =>
                  setActiveMenu(activeMenu === "bag" ? null : "bag")
                }
              />

              {activeMenu === "bag" && (
                <div className="absolute right-0 top-14 w-[85vw] sm:w-64 md:w-72 bg-black border border-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 space-y-4">
                  <h3 className="text-sm font-semibold text-white">Your Anime Bag</h3>
                  <p className="text-gray-500 text-sm">Your bag is empty.</p>
                  <button className="w-full bg-white text-black py-2 rounded-lg text-sm font-bold hover:bg-gray-200 transition">
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* INDIA MODAL (Black Themed + Original Map) */}
      {showCountry && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-100">
          <div className="relative bg-[#111] border border-gray-800 rounded-3xl shadow-2xl p-6 sm:p-8 w-[95%] sm:w-125 md:w-150 max-w-[95%] text-white">
            <X
              size={22}
              className="absolute top-5 right-5 cursor-pointer hover:text-red-500"
              onClick={() => setShowCountry(false)}
            />
            <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center text-white">
              India 🇮🇳
            </h2>
            <div className="flex justify-center">
              {/* Removed grayscale to keep original colors */}
              <img
                src="/assets/images/earth4.png"
                alt="India Map"
                className="w-40 sm:w-60 md:w-80 object-contain"
              />
            </div>
            <p className="text-center text-gray-400 mt-6 text-sm">
              We proudly deliver across India.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default AnimeNavbar;