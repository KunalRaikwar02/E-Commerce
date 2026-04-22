// import { Search, Globe, User, ShoppingBag, X, LogOut, Package, Settings, Shield } from "lucide-react";
// import { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../auth/AuthContext";
// import { useCart } from "../../cart/CartContext";
// import AuthModal from "../../auth/AuthModal";
// import AdminPanel from "../../admin/AdminPanel";

// function Navbar() {
//   const [activeMenu, setActiveMenu] = useState(null);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [searchValue, setSearchValue] = useState("");
//   const [showCountry, setShowCountry] = useState(false);
//   const [showAuthModal, setShowAuthModal] = useState(false);
//   const [showAdminPanel, setShowAdminPanel] = useState(false);

//   const defaultTrending = ["Naruto T-Shirt", "Demon Slayer Hoodie", "Black Cap", "Jeans"];
//   const [trendingItems] = useState(defaultTrending);

//   const menuRef = useRef();
//   const inputRef = useRef();
//   const navigate = useNavigate();
//   const { user, logout, isLoggedIn, isAdmin } = useAuth();
//   const { totalItems, setIsCartOpen } = useCart();

//   useEffect(() => {
//     const handler = (e) => {
//       if (menuRef.current && !menuRef.current.contains(e.target)) {
//         setActiveMenu(null);
//         setSearchOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   const handleSearch = (query) => {
//     const q = (query || searchValue).trim();
//     if (!q) return;
//     setSearchOpen(false);
//     setSearchValue("");
//     navigate("/collections/all", { state: { search: q } });
//   };

//   const handleUserClick = () => {
//     if (!isLoggedIn) setShowAuthModal(true);
//     else setActiveMenu(activeMenu === "account" ? null : "account");
//   };

//   const initials = user?.name
//     ? user.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)
//     : "U";

//   // If admin panel overlay is open, show it fullscreen
//   if (showAdminPanel) {
//     return (
//       <div className="fixed inset-0 z-9000 bg-white overflow-auto">
//         <div className="sticky top-0 z-10 bg-black text-white px-6 py-3 flex items-center justify-between">
//           <span className="text-sm font-black uppercase tracking-widest">Admin Panel</span>
//           <button
//             onClick={() => setShowAdminPanel(false)}
//             className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition cursor-pointer"
//           >
//             <X size={16} /> Close Admin
//           </button>
//         </div>
//         <AdminPanel />
//       </div>
//     );
//   }

//   return (
//     <>
//       {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}

//       <nav data-cursor="white" className="w-full bg-black text-white border-b border-black fixed top-8 left-0 z-50">
//         <div ref={menuRef} className="w-full px-4 sm:px-6 md:px-12 h-16 sm:h-18 md:h-20 flex items-center justify-between">

//           <h1 onClick={() => navigate("/")} className="text-lg sm:text-xl font-bold tracking-widest cursor-pointer">
//             VELTORN
//           </h1>

//           <div className="flex items-center gap-4 sm:gap-6 md:gap-8 relative">

//             {/* SEARCH */}
//             <div className="relative">
//               <Search size={20} className="cursor-pointer hover:text-gray-400"
//                 onClick={() => { setSearchOpen(!searchOpen); setTimeout(() => inputRef.current?.focus(), 100); }} />
//               {searchOpen && (
//                 <div className="absolute right-0 top-14 w-[90vw] sm:w-80 md:w-96 bg-[#0f0f0f] border border-gray-800 rounded-2xl shadow-2xl p-4 sm:p-5 space-y-4">
//                   <div className="flex items-center gap-3 border border-gray-700 rounded-xl px-4 py-3 bg-black focus-within:border-white transition">
//                     <Search size={16} className="text-gray-400 shrink-0" />
//                     <input ref={inputRef} type="text" value={searchValue}
//                       onChange={e => setSearchValue(e.target.value)}
//                       onKeyDown={e => e.key === "Enter" && handleSearch()}
//                       placeholder="Search products..."
//                       className="w-full bg-transparent outline-none text-sm" />
//                     {searchValue && <X size={16} className="cursor-pointer hover:text-red-500 shrink-0" onClick={() => setSearchValue("")} />}
//                   </div>
//                   {searchValue === "" && (
//                     <div className="space-y-1.5">
//                       <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Trending</p>
//                       {trendingItems.map(item => (
//                         <div key={item} onClick={() => handleSearch(item)}
//                           className="flex items-center gap-2 px-2 py-1.5 hover:bg-white/5 rounded-lg cursor-pointer group">
//                           <Search size={12} className="text-gray-600 group-hover:text-gray-400" />
//                           <p className="text-sm text-gray-300 group-hover:text-white">{item}</p>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                   {searchValue && (
//                     <button onClick={() => handleSearch()}
//                       className="w-full bg-white text-black py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-100 transition cursor-pointer">
//                       Search "{searchValue}"
//                     </button>
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* GLOBE */}
//             <Globe size={20} className="cursor-pointer hover:text-gray-400" onClick={() => setShowCountry(true)} />

//             {/* ACCOUNT */}
//             <div className="relative">
//               <div className="relative cursor-pointer" onClick={handleUserClick}>
//                 {isLoggedIn && user?.avatarUrl ? (
//                   <img src={user.avatarUrl} alt="avatar" className="w-7 h-7 rounded-full object-cover border-2 border-gray-600" />
//                 ) : (
//                   <>
//                     <User size={20} className="hover:text-gray-400" />
//                     {isLoggedIn && <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border border-black" />}
//                   </>
//                 )}
//               </div>

//               {activeMenu === "account" && isLoggedIn && (
//                 <div className="absolute right-0 top-12 w-60 bg-[#111] border border-gray-800 rounded-2xl shadow-xl overflow-hidden z-50">
//                   {/* User info */}
//                   <div className="px-4 py-4 border-b border-gray-800 bg-[#0a0a0a]">
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 rounded-full bg-[#581a90] flex items-center justify-center text-white font-black text-sm shrink-0 overflow-hidden">
//                         {user?.avatarUrl ? (
//                           <img src={user.avatarUrl} className="w-full h-full object-cover" alt="" />
//                         ) : initials}
//                       </div>
//                       <div className="overflow-hidden">
//                         <p className="text-xs font-black uppercase text-white truncate">{user?.name}</p>
//                         <p className="text-[10px] text-gray-500 truncate">{user?.email}</p>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="p-2 space-y-0.5">
//                     <button onClick={() => { navigate("/profile"); setActiveMenu(null); }}
//                       className="w-full flex items-center gap-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition px-3 py-2.5 rounded-xl cursor-pointer">
//                       <Settings size={14} /> My Profile
//                     </button>
//                     <button onClick={() => { navigate("/my-orders"); setActiveMenu(null); }}
//                       className="w-full flex items-center gap-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition px-3 py-2.5 rounded-xl cursor-pointer">
//                       <Package size={14} /> My Orders
//                     </button>

//                     {/* ADMIN BUTTON — only for admin role */}
//                     {isAdmin && (
//                       <button
//                         onClick={() => { setShowAdminPanel(true); setActiveMenu(null); }}
//                         className="w-full flex items-center gap-3 text-sm text-purple-400 hover:text-purple-300 hover:bg-purple-900/20 transition px-3 py-2.5 rounded-xl cursor-pointer"
//                       >
//                         <Shield size={14} /> Admin Panel
//                       </button>
//                     )}

//                     <div className="h-px bg-gray-800 my-1" />

//                     <button onClick={() => { logout(); setActiveMenu(null); }}
//                       className="w-full flex items-center gap-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-900/10 transition px-3 py-2.5 rounded-xl cursor-pointer">
//                       <LogOut size={14} /> Logout
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* BAG */}
//             <div className="relative cursor-pointer" onClick={() => setIsCartOpen(true)}>
//               <ShoppingBag size={20} className="hover:text-gray-400" />
//               {totalItems > 0 && (
//                 <div className="absolute -top-2 -right-2 w-5 h-5 bg-[#581a90] rounded-full flex items-center justify-center">
//                   <span className="text-[9px] font-black text-white">{totalItems}</span>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* INDIA MODAL */}
//       {showCountry && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-100">
//           <div className="relative bg-[#111] border border-gray-800 rounded-3xl shadow-2xl p-6 sm:p-8 w-[95%] sm:w-125 text-white">
//             <X size={22} className="absolute top-5 right-5 cursor-pointer hover:text-red-500" onClick={() => setShowCountry(false)} />
//             <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">India 🇮🇳</h2>
//             <div className="flex justify-center">
//               <img src="/assets/images/earth4.png" alt="India Map" className="w-40 sm:w-60 md:w-80 object-contain" />
//             </div>
//             <p className="text-center text-gray-400 mt-6 text-sm">We proudly deliver across India.</p>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default Navbar;



import { Search, Globe, User, ShoppingBag, X, LogOut, Package, Settings, Shield, HeadphonesIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { useCart } from "../../cart/CartContext";
import AuthModal from "../../auth/AuthModal";
import AdminPanel from "../../admin/AdminPanel";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function SupportModal({ onClose, user }) {
  const [subject, setSubject] = useState("General Query");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSend = async () => {
    if (!message.trim()) { setError("Please write your message"); return; }
    setLoading(true); setError("");
    try {
      const token = localStorage.getItem("veltorn_token");
      const res = await fetch(`${BASE_URL}/support`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ subject, message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setSent(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-300 flex items-center justify-center px-4">
      <div className="bg-[#111] border border-gray-800 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
          <div>
            <h2 className="text-white font-black text-lg uppercase tracking-tight">Support</h2>
            <p className="text-gray-500 text-xs mt-0.5">We'll get back to you soon</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-red-900 text-gray-400 hover:text-red-400 transition cursor-pointer">
            <X size={16} />
          </button>
        </div>

        {sent ? (
          <div className="p-8 text-center space-y-4">
            <div className="text-4xl">✅</div>
            <h3 className="text-white font-black text-lg uppercase">Message Sent!</h3>
            <p className="text-gray-400 text-sm">Our team will reach out to you at<br /><span className="text-white font-bold">{user?.email}</span></p>
            <button onClick={onClose} className="w-full bg-[#581a90] text-white h-12 rounded-xl font-black text-xs uppercase tracking-widest hover:opacity-90 transition cursor-pointer">Close</button>
          </div>
        ) : (
          <div className="p-6 space-y-4">
            {error && <div className="bg-red-900/30 border border-red-800 text-red-400 text-xs font-bold px-4 py-3 rounded-xl">{error}</div>}

            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Subject</label>
              <select value={subject} onChange={e => setSubject(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-gray-700 text-white rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-[#581a90] cursor-pointer">
                <option>General Query</option>
                <option>Order Issue</option>
                <option>Return / Refund</option>
                <option>Product Question</option>
                <option>Payment Issue</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Message *</label>
              <textarea value={message} onChange={e => setMessage(e.target.value)}
                placeholder="Describe your issue or question..."
                className="w-full bg-[#0a0a0a] border border-gray-700 text-white rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-[#581a90] h-32 resize-none placeholder:text-gray-700" />
            </div>

            <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl px-4 py-3">
              <p className="text-xs text-gray-500">Sending as: <span className="text-white font-bold">{user?.name} · {user?.email}</span></p>
            </div>

            <button onClick={handleSend} disabled={loading}
              className="w-full bg-[#581a90] text-white h-12 rounded-xl font-black text-sm uppercase tracking-widest hover:opacity-90 transition cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2">
              {loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : "Send Message"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Navbar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showCountry, setShowCountry] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showSupport, setShowSupport] = useState(false);

  const defaultTrending = ["Naruto T-Shirt", "Demon Slayer Hoodie", "Black Cap", "Jeans"];
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
          <button onClick={() => setShowAdminPanel(false)} className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition cursor-pointer">
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
      {showSupport && isLoggedIn && <SupportModal onClose={() => setShowSupport(false)} user={user} />}

      <nav data-cursor="white" className="w-full bg-black text-white border-b border-black fixed top-8 left-0 z-50">
        <div ref={menuRef} className="w-full px-4 sm:px-6 md:px-12 h-16 sm:h-18 md:h-20 flex items-center justify-between">

          <h1 onClick={() => navigate("/")} className="text-lg sm:text-xl font-bold tracking-widest cursor-pointer">VELTORN</h1>

          <div className="flex items-center gap-4 sm:gap-6 md:gap-8 relative">

            {/* SEARCH */}
            <div className="relative">
              <Search size={20} className="cursor-pointer hover:text-gray-400"
                onClick={() => { setSearchOpen(!searchOpen); setTimeout(() => inputRef.current?.focus(), 100); }} />
              {searchOpen && (
                <div className="absolute right-0 top-14 w-[90vw] sm:w-80 md:w-96 bg-[#0f0f0f] border border-gray-800 rounded-2xl shadow-2xl p-4 sm:p-5 space-y-4">
                  <div className="flex items-center gap-3 border border-gray-700 rounded-xl px-4 py-3 bg-black focus-within:border-white transition">
                    <Search size={16} className="text-gray-400 shrink-0" />
                    <input ref={inputRef} type="text" value={searchValue}
                      onChange={e => setSearchValue(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && handleSearch()}
                      placeholder="Search products..."
                      className="w-full bg-transparent outline-none text-sm" />
                    {searchValue && <X size={16} className="cursor-pointer hover:text-red-500 shrink-0" onClick={() => setSearchValue("")} />}
                  </div>
                  {searchValue === "" && (
                    <div className="space-y-1.5">
                      <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Trending</p>
                      {trendingItems.map(item => (
                        <div key={item} onClick={() => handleSearch(item)}
                          className="flex items-center gap-2 px-2 py-1.5 hover:bg-white/5 rounded-lg cursor-pointer group">
                          <Search size={12} className="text-gray-600 group-hover:text-gray-400" />
                          <p className="text-sm text-gray-300 group-hover:text-white">{item}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {searchValue && (
                    <button onClick={() => handleSearch()}
                      className="w-full bg-white text-black py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-100 transition cursor-pointer">
                      Search "{searchValue}"
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* GLOBE */}
            <Globe size={20} className="cursor-pointer hover:text-gray-400" onClick={() => setShowCountry(true)} />

            {/* SUPPORT ICON — only when logged in */}
            {isLoggedIn && (
              <HeadphonesIcon
                size={20}
                className="cursor-pointer hover:text-gray-400 transition"
                onClick={() => setShowSupport(true)}
              />
            )}

            {/* ACCOUNT */}
            <div className="relative">
              <div className="relative cursor-pointer" onClick={handleUserClick}>
                {isLoggedIn && user?.avatarUrl ? (
                  <img src={user.avatarUrl} alt="avatar" className="w-7 h-7 rounded-full object-cover border-2 border-gray-600" />
                ) : (
                  <>
                    <User size={20} className="hover:text-gray-400" />
                    {isLoggedIn && <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border border-black" />}
                  </>
                )}
              </div>

              {activeMenu === "account" && isLoggedIn && (
                <div className="absolute right-0 top-12 w-60 bg-[#111] border border-gray-800 rounded-2xl shadow-xl overflow-hidden z-50">
                  <div className="px-4 py-4 border-b border-gray-800 bg-[#0a0a0a]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#581a90] flex items-center justify-center text-white font-black text-sm shrink-0 overflow-hidden">
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
              <ShoppingBag size={20} className="hover:text-gray-400" />
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
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-100">
          <div className="relative bg-[#111] border border-gray-800 rounded-3xl shadow-2xl p-6 sm:p-8 w-[95%] sm:w-125 text-white">
            <X size={22} className="absolute top-5 right-5 cursor-pointer hover:text-red-500" onClick={() => setShowCountry(false)} />
            <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">India 🇮🇳</h2>
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

export default Navbar;