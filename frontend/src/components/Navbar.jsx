import {
  Search,
  Globe,
  User,
  ShoppingBag,
  X,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

function Navbar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showCountry, setShowCountry] = useState(false);
  const [showTrending, setShowTrending] = useState(true);

  // ✅ NEW STATE FOR TRENDING
  const defaultTrending = [
    "Black Overshirt",
    "Relaxed Fit Jeans",
    "Premium Cotton T-Shirt",
  ];
  const [trendingItems, setTrendingItems] =
    useState(defaultTrending);

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
    console.log("Searching:", searchValue);
  };

  const handleSuggestionClick = (text) => {
    setSearchValue(text);

    // ✅ clicked item hide ho jaaye
    setTrendingItems((prev) =>
      prev.filter((item) => item !== text)
    );

    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleClear = () => {
    setSearchValue("");

    // ✅ trending wapas aa jaaye
    setTrendingItems(defaultTrending);
  };

  return (
    <>
      <nav className="w-full bg-black text-white border-b border-gray-800 fixed top-8 left-0 z-50">
        <div
          ref={menuRef}
          className="w-full px-12 h-20 flex items-center justify-between"
        >
          <h1 className="text-xl font-bold tracking-widest cursor-pointer">
            VELTORN
          </h1>

          <div className="flex items-center gap-8 relative">
            {/* SEARCH */}
            <div className="relative">
              <Search
                size={20}
                className="cursor-pointer hover:text-gray-400"
                onClick={() => {
                  setSearchOpen(!searchOpen);
                }}
              />

              {searchOpen && (
                <div className="absolute right-0 top-14 w-96 bg-[#0f0f0f] border border-gray-800 rounded-2xl shadow-2xl p-6 space-y-5">
                  <div className="flex items-center gap-3 border border-gray-700 rounded-xl px-4 py-3 bg-black focus-within:border-white transition">
                    <Search size={18} className="text-gray-400" />
                    <input
                      ref={inputRef}
                      type="text"
                      value={searchValue}
                      onChange={(e) =>
                        setSearchValue(e.target.value)
                      }
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleSearch()
                      }
                      placeholder="Search products..."
                      className="w-full bg-transparent outline-none text-sm"
                    />
                    <X
                      size={18}
                      className="cursor-pointer hover:text-red-500"
                      onClick={handleClear}
                    />
                  </div>

                  {/* Trending */}
                  {showTrending &&
                    searchValue === "" &&
                    trendingItems.length > 0 && (
                      <div className="space-y-2 text-sm">
                        <p className="text-gray-500 text-xs uppercase">
                          Trending
                        </p>

                        {trendingItems.map((item) => (
                          <p
                            key={item}
                            onClick={() =>
                              handleSuggestionClick(item)
                            }
                            className="hover:text-gray-400 cursor-pointer"
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
              className="cursor-pointer hover:text-gray-400"
              onClick={() => setShowCountry(true)}
            />

            {/* ACCOUNT */}
            <div className="relative">
              <User
                size={20}
                className="cursor-pointer hover:text-gray-400"
                onClick={() =>
                  setActiveMenu(
                    activeMenu === "account"
                      ? null
                      : "account"
                  )
                }
              />

              {activeMenu === "account" && (
                <div className="absolute right-0 top-14 w-56 bg-[#111] border border-gray-800 rounded-2xl shadow-xl p-5 space-y-4">
                  <p className="hover:text-gray-400 cursor-pointer">
                    👤 My Profile
                  </p>
                  <p className="hover:text-gray-400 cursor-pointer">
                    📦 Orders
                  </p>
                  <p className="hover:text-red-500 cursor-pointer">
                    Logout
                  </p>
                </div>
              )}
            </div>

            {/* BAG */}
            <div className="relative">
              <ShoppingBag
                size={20}
                className="cursor-pointer hover:text-gray-400"
                onClick={() =>
                  setActiveMenu(
                    activeMenu === "bag" ? null : "bag"
                  )
                }
              />

              {activeMenu === "bag" && (
                <div className="absolute right-0 top-14 w-72 bg-[#111] border border-gray-800 rounded-2xl shadow-xl p-6 space-y-4">
                  <h3 className="text-sm font-semibold">
                    Your Shopping Bag
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Your bag is empty.
                  </p>
                  <button className="w-full bg-white text-black py-2 rounded-lg text-sm hover:bg-gray-200 transition">
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* INDIA MODAL */}
      {showCountry && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-100">
          <div className="relative bg-[#111] border border-gray-800 rounded-3xl shadow-2xl p-8 w-150 max-w-[90%] text-white">
            <X
              size={22}
              className="absolute top-5 right-5 cursor-pointer hover:text-red-500"
              onClick={() => setShowCountry(false)}
            />

            <h2 className="text-2xl font-semibold mb-6 text-center">
              India 🇮🇳
            </h2>

            <div className="flex justify-center">
              <img
                src="/assets/images/earth4.png"
                alt="India Map"
                className="w-100 object-contain"
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

export default Navbar;