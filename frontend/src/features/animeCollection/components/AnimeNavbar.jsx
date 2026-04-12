import { Search, Globe, User, ShoppingBag, X, LogOut, Package, Settings, Shield } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { useCart } from "../../cart/CartContext";
import AuthModal from "../../auth/AuthModal";
import AdminPanel from "../../admin/AdminPanel";

function AnimeNavbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showCountry, setShowCountry] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  const defaultTrending = ["Naruto Oversized Tee", "Solo Leveling Hoodie", "Demon Slayer Shorts"];
  const [trendingItems] = useState(defaultTrending);

  const menuRef = useRef();
  const inputRef = useRef();
  const navigate = useNavigate();
  const { user, logout, isLoggedIn, isAdmin } = useAuth();
  const { totalItems, setIsCartOpen } = useCart();

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

  const handleSearch = (query) => {
    const q = (query || searchValue).trim();
    if (!q) return;
    setSearchOpen(false);
    setSearchValue("");
    navigate("/collections/all", { state: { search: q } });
  };

  const handleUserClick = () => {
    if (!isLoggedIn) setShowAuthModal(true);
    else setActiveMenu(activeMenu === "account" ? null : "account");
  };

  const initials = user?.name
    ? user.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  if (showAdminPanel) {
    return (
      <div className="fixed inset-0 z-9000 bg-white overflow-auto">
        <div className="sticky top-0 z-10 bg-black text-white px-6 py-3 flex items-center justify-between">
          <span className="text-sm font-black uppercase tracking-widest">Admin Panel</span>
          <button onClick={() => setShowAdminPanel(false)}
            className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition cursor-pointer">
            <X size={16} /> Close Admin
          </button>
        </div>
        <AdminPanel />
      </div>
    );
  }

  return (
    <>
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}

      <nav data-cursor="white" className="w-full fixed top-7.5 mt-4 left-0 z-50 px-4 sm:px-6 md:px-10">
        <div ref={menuRef} className="w-full bg-black text-white border border-gray-800 rounded-3xl shadow-2xl px-4 sm:px-6 md:px-12 h-16 sm:h-18 md:h-20 flex items-center justify-between">

          <h1 onClick={() => navigate("/")} className="text-lg sm:text-xl font-bold tracking-widest cursor-pointer uppercase">
            VELTORN
          </h1>

          <div className="flex items-center gap-4 sm:gap-6 md:gap-8 relative">

            {/* SEARCH */}
            <div className="relative">
              <Search size={20} className="cursor-pointer hover:text-purple-400"
                onClick={() => { setSearchOpen(!searchOpen); setTimeout(() => inputRef.current?.focus(), 100); }} />
              {searchOpen && (
                <div className="absolute right-0 top-14 w-[90vw] sm:w-80 md:w-96 bg-black border border-gray-800 rounded-2xl shadow-2xl p-4 sm:p-6 space-y-4">
                  <div className="flex items-center gap-3 border border-gray-700 rounded-xl px-4 py-3 bg-[#0a0a0a] focus-within:border-white transition">
                    <Search size={16} className="text-gray-400 shrink-0" />
                    <input ref={inputRef} type="text" value={searchValue}
                      onChange={e => setSearchValue(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && handleSearch()}
                      placeholder="Search anime gear..."
                      className="w-full bg-transparent outline-none text-sm placeholder:text-gray-600" />
                    {searchValue && <X size={16} className="cursor-pointer hover:text-red-500 shrink-0" onClick={() => setSearchValue("")} />}
                  </div>
                  {searchValue === "" && (
                    <div className="space-y-1.5">
                      <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Trending</p>
                      {trendingItems.map(item => (
                        <div key={item} onClick={() => handleSearch(item)}
                          className="flex items-center gap-2 px-2 py-1.5 hover:bg-white/5 rounded-lg cursor-pointer group">
                          <Search size={12} className="text-gray-600 group-hover:text-purple-400" />
                          <p className="text-sm text-gray-300 group-hover:text-purple-400">{item}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {searchValue && (
                    <button onClick={() => handleSearch()}
                      className="w-full bg-[#581a90] text-white py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:opacity-90 transition cursor-pointer">
                      Search "{searchValue}"
                    </button>
                  )}
                </div>
              )}
            </div>

            <Globe size={20} className="cursor-pointer hover:text-purple-400" onClick={() => setShowCountry(true)} />

            {/* ACCOUNT */}
            <div className="relative">
              <div className="relative cursor-pointer" onClick={handleUserClick}>
                <User size={20} className="hover:text-purple-400" />
                {isLoggedIn && <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border border-black" />}
              </div>

              {activeMenu === "account" && isLoggedIn && (
                <div className="absolute right-0 top-12 w-60 bg-black border border-gray-800 rounded-2xl shadow-xl overflow-hidden z-50">
                  <div className="px-4 py-4 border-b border-gray-800">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#581a90] flex items-center justify-center text-white font-black text-xs shrink-0 overflow-hidden">
                        {user?.avatarUrl ? <img src={user.avatarUrl} className="w-full h-full object-cover" alt="" /> : initials}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-xs font-black uppercase text-white truncate">{user?.name}</p>
                        <p className="text-[10px] text-gray-500 truncate">{user?.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2 space-y-0.5">
                    <button onClick={() => { navigate("/profile"); setActiveMenu(null); }}
                      className="w-full flex items-center gap-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition px-3 py-2.5 rounded-xl cursor-pointer">
                      <Settings size={14} /> My Profile
                    </button>
                    <button onClick={() => { navigate("/my-orders"); setActiveMenu(null); }}
                      className="w-full flex items-center gap-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition px-3 py-2.5 rounded-xl cursor-pointer">
                      <Package size={14} /> My Orders
                    </button>
                    {isAdmin && (
                      <button onClick={() => { setShowAdminPanel(true); setActiveMenu(null); }}
                        className="w-full flex items-center gap-3 text-sm text-purple-400 hover:text-purple-300 hover:bg-purple-900/20 transition px-3 py-2.5 rounded-xl cursor-pointer">
                        <Shield size={14} /> Admin Panel
                      </button>
                    )}
                    <div className="h-px bg-gray-800 my-1" />
                    <button onClick={() => { logout(); setActiveMenu(null); }}
                      className="w-full flex items-center gap-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-900/10 transition px-3 py-2.5 rounded-xl cursor-pointer">
                      <LogOut size={14} /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* BAG */}
            <div className="relative cursor-pointer" onClick={() => setIsCartOpen(true)}>
              <ShoppingBag size={20} className="hover:text-purple-400" />
              {totalItems > 0 && (
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-[#581a90] rounded-full flex items-center justify-center">
                  <span className="text-[9px] font-black text-white">{totalItems}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {showCountry && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-100">
          <div className="relative bg-[#111] border border-gray-800 rounded-3xl shadow-2xl p-6 sm:p-8 w-[95%] sm:w-125 text-white">
            <X size={22} className="absolute top-5 right-5 cursor-pointer hover:text-red-500" onClick={() => setShowCountry(false)} />
            <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center text-white">India 🇮🇳</h2>
            <div className="flex justify-center">
              <img src="/assets/images/earth4.png" alt="India Map" className="w-40 sm:w-60 md:w-80 object-contain" />
            </div>
            <p className="text-center text-gray-400 mt-6 text-sm">We proudly deliver across India.</p>
          </div>
        </div>
      )}
    </>
  );
}

export default AnimeNavbar;