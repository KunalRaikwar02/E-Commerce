// // import React, { useState, useEffect } from "react";
// // import {
// //   LayoutDashboard, Package, ShoppingBag, Users,
// //   Plus, Pencil, Trash2, X, LogOut, Upload, TrendingUp,
// //   ChevronDown, ChevronUp, Layout, Check,
// // } from "lucide-react";
// // import { adminAPI, productAPI, authAPI, pageProductsAPI } from "../../services/api";

// // const PURPLE = "#581a90";
// // const CATEGORIES = ["T-Shirt", "Shirt", "Jeans", "Cap", "Accessories", "Anime"];
// // const ANIME_TAGS = ["Naruto", "Solo Leveling", "Demon Slayer", "One Piece"];
// // const BADGES = ["NEW", "LIMITED", "SPECIAL"];

// // const SECTIONS = [
// //   { key: "hero", label: "Hero Video Products", max: 5, desc: "Products shown in hero slider on main page (max 5)" },
// //   { key: "new_arrivals", label: "New Arrivals", max: 8, desc: "Products in New Arrivals section (max 8)" },
// //   { key: "accessories", label: "Accessories", max: 8, desc: "Products in Accessories section (max 8)" },
// //   { key: "featured", label: "Featured Collection", max: 2, desc: "Slot 0 = small card (left), Slot 1 = large card (right)" },
// //   { key: "anime_picks", label: "Anime Top Picks", max: 6, desc: "Top Picks For You on Anime page (max 6)" },
// //   { key: "anime_naruto", label: "Naruto Category Image", max: 1, desc: "Image shown on Naruto category card" },
// //   { key: "anime_solo_leveling", label: "Solo Leveling Image", max: 1, desc: "Image shown on Solo Leveling category card" },
// //   { key: "anime_demon_slayer", label: "Demon Slayer Image", max: 1, desc: "Image shown on Demon Slayer category card" },
// //   { key: "anime_one_piece", label: "One Piece Image", max: 1, desc: "Image shown on One Piece category card" },
// // ];

// // function StatusBadge({ status }) {
// //   const colors = {
// //     placed: "bg-yellow-100 text-yellow-700",
// //     confirmed: "bg-blue-100 text-blue-700",
// //     shipped: "bg-purple-100 text-purple-700",
// //     out_for_delivery: "bg-orange-100 text-orange-700",
// //     delivered: "bg-green-100 text-green-700",
// //     cancelled: "bg-red-100 text-red-700",
// //     pending: "bg-gray-100 text-gray-600",
// //     paid: "bg-green-100 text-green-700",
// //     failed: "bg-red-100 text-red-700",
// //   };
// //   return (
// //     <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${colors[status] || "bg-gray-100 text-gray-600"}`}>
// //       {(status || "").replace(/_/g, " ")}
// //     </span>
// //   );
// // }

// // function Sidebar({ active, setActive, onLogout, admin }) {
// //   const items = [
// //     { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
// //     { id: "main-page", label: "Main Page Products", icon: Layout },
// //     { id: "add-product", label: "Add Product", icon: Plus },
// //     { id: "products", label: "All Products", icon: Package },
// //     { id: "orders", label: "Orders", icon: ShoppingBag },
// //     { id: "users", label: "Users", icon: Users },
// //   ];
// //   return (
// //     <aside className="w-64 bg-black text-white min-h-screen flex flex-col shrink-0">
// //       <div className="px-6 py-8 border-b border-gray-800">
// //         <h1 className="text-xl font-black tracking-widest uppercase">VELTORN</h1>
// //         <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">Admin Panel</p>
// //         {admin && (
// //           <div className="mt-3">
// //             <p className="text-xs font-bold text-white truncate">{admin.name}</p>
// //             <p className="text-[10px] text-gray-600 truncate">{admin.email}</p>
// //           </div>
// //         )}
// //       </div>
// //       <nav className="flex-1 px-4 py-6 space-y-1">
// //         {items.map(({ id, label, icon: Icon }) => (
// //           <button key={id} onClick={() => setActive(id)}
// //             className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wide transition-all cursor-pointer ${active === id ? "bg-[#581a90] text-white" : "text-gray-400 hover:bg-gray-900 hover:text-white"}`}>
// //             <Icon size={16} /> {label}
// //           </button>
// //         ))}
// //       </nav>
// //       <div className="px-4 py-6 border-t border-gray-800">
// //         <button onClick={onLogout}
// //           className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-400 hover:bg-red-900/20 transition cursor-pointer">
// //           <LogOut size={16} /> Logout
// //         </button>
// //       </div>
// //     </aside>
// //   );
// // }

// // function Dashboard({ setActive }) {
// //   const [data, setData] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   useEffect(() => {
// //     adminAPI.getDashboard().then(setData).catch(console.error).finally(() => setLoading(false));
// //   }, []);
// //   if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" /></div>;
// //   const stats = [
// //     { label: "Total Orders", value: data?.totalOrders || 0, icon: ShoppingBag, color: "bg-purple-50 text-purple-600", action: () => setActive("orders") },
// //     { label: "Total Revenue", value: `₹${(data?.totalRevenue || 0).toLocaleString("en-IN")}`, icon: TrendingUp, color: "bg-green-50 text-green-600" },
// //     { label: "Products", value: data?.totalProducts || 0, icon: Package, color: "bg-blue-50 text-blue-600", action: () => setActive("products") },
// //     { label: "Users", value: data?.totalUsers || 0, icon: Users, color: "bg-orange-50 text-orange-600", action: () => setActive("users") },
// //   ];
// //   return (
// //     <div className="space-y-8">
// //       <div className="flex items-center justify-between">
// //         <h2 className="text-2xl font-black uppercase tracking-tight">Dashboard</h2>
// //         <button onClick={() => setActive("add-product")} style={{ backgroundColor: PURPLE }}
// //           className="flex items-center gap-2 text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:opacity-90 transition cursor-pointer">
// //           <Plus size={14} /> Add Product
// //         </button>
// //       </div>
// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
// //         {stats.map(({ label, value, icon: Icon, color, action }) => (
// //           <div key={label} onClick={action}
// //             className={`bg-white rounded-2xl p-6 border border-gray-100 shadow-sm ${action ? "cursor-pointer hover:shadow-md transition" : ""}`}>
// //             <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color}`}><Icon size={20} /></div>
// //             <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{label}</p>
// //             <p className="text-2xl font-black text-black mt-1">{value}</p>
// //           </div>
// //         ))}
// //       </div>
// //       <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
// //         <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
// //           <h3 className="font-black text-sm uppercase tracking-widest">Recent Orders</h3>
// //           <button onClick={() => setActive("orders")} className="text-xs font-bold text-gray-400 hover:text-black cursor-pointer">View all →</button>
// //         </div>
// //         <div className="overflow-x-auto">
// //           <table className="w-full text-sm">
// //             <thead className="bg-gray-50">
// //               <tr>{["Order ID", "Customer", "Total", "Status", "Date"].map(h => (
// //                 <th key={h} className="px-5 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">{h}</th>
// //               ))}</tr>
// //             </thead>
// //             <tbody className="divide-y divide-gray-50">
// //               {(data?.recentOrders || []).map((order) => (
// //                 <tr key={order._id} className="hover:bg-gray-50">
// //                   <td className="px-5 py-4 font-bold text-xs">{order.orderId}</td>
// //                   <td className="px-5 py-4 text-xs">{order.user?.name || "Guest"}</td>
// //                   <td className="px-5 py-4 font-bold text-xs">₹{Number(order.total).toLocaleString("en-IN")}</td>
// //                   <td className="px-5 py-4"><StatusBadge status={order.orderStatus} /></td>
// //                   <td className="px-5 py-4 text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString("en-IN")}</td>
// //                 </tr>
// //               ))}
// //               {(!data?.recentOrders || data.recentOrders.length === 0) && (
// //                 <tr><td colSpan={5} className="px-5 py-10 text-center text-xs text-gray-300 font-bold uppercase tracking-widest">No orders yet</td></tr>
// //               )}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // function MainPageProducts() {
// //   const [allProducts, setAllProducts] = useState([]);
// //   const [sectionData, setSectionData] = useState({});
// //   const [loadingProds, setLoadingProds] = useState(true);
// //   const [activeSection, setActiveSection] = useState("hero");
// //   const [saving, setSaving] = useState(false);
// //   const [savedMsg, setSavedMsg] = useState("");
// //   const [search, setSearch] = useState("");

// //   useEffect(() => {
// //     productAPI.getAll({ limit: 200 })
// //       .then(data => setAllProducts(data.products || []))
// //       .catch(console.error)
// //       .finally(() => setLoadingProds(false));
// //   }, []);

// //   useEffect(() => {
// //     if (sectionData[activeSection] !== undefined) return;
// //     pageProductsAPI.getSection(activeSection)
// //       .then(data => setSectionData(prev => ({ ...prev, [activeSection]: data.products || [] })))
// //       .catch(() => setSectionData(prev => ({ ...prev, [activeSection]: [] })));
// //   }, [activeSection]);

// //   const currentSection = SECTIONS.find(s => s.key === activeSection);
// //   const currentProducts = sectionData[activeSection] || [];
// //   const isSelected = (productId) => currentProducts.some(p => String(p.id) === String(productId));

// //   const toggleProduct = (product) => {
// //     const sec = SECTIONS.find(s => s.key === activeSection);
// //     if (isSelected(product._id)) {
// //       setSectionData(prev => ({ ...prev, [activeSection]: prev[activeSection].filter(p => String(p.id) !== String(product._id)) }));
// //     } else {
// //       if (currentProducts.length >= sec.max) { alert(`Maximum ${sec.max} product(s) allowed.`); return; }
// //       setSectionData(prev => ({
// //         ...prev,
// //         [activeSection]: [...(prev[activeSection] || []), {
// //           id: product._id, name: product.name, price: String(product.price),
// //           img: product.images?.[0] || "/assets/images/tshirt2.jpeg",
// //           badge: product.badge, sizes: product.sizes || [],
// //           collection: product.animeTag || product.category,
// //           slot: (prev[activeSection] || []).length,
// //         }],
// //       }));
// //     }
// //   };

// //   const handleSave = async () => {
// //     setSaving(true);
// //     try {
// //       const products = (sectionData[activeSection] || []).map((p, i) => ({ productId: p.id, slot: i }));
// //       await pageProductsAPI.setSection(activeSection, products);
// //       setSavedMsg("Saved! Website updated.");
// //       setTimeout(() => setSavedMsg(""), 3000);
// //     } catch (err) { alert("Save failed: " + err.message); }
// //     finally { setSaving(false); }
// //   };

// //   const filteredProducts = allProducts.filter(p =>
// //     p.name.toLowerCase().includes(search.toLowerCase()) ||
// //     (p.animeTag || "").toLowerCase().includes(search.toLowerCase()) ||
// //     p.category.toLowerCase().includes(search.toLowerCase())
// //   );

// //   return (
// //     <div className="space-y-6">
// //       <div>
// //         <h2 className="text-2xl font-black uppercase tracking-tight">Main Page Products</h2>
// //         <p className="text-xs text-gray-400 mt-1">Select products for each section. Saves instantly on website.</p>
// //       </div>
// //       <div className="flex flex-col lg:flex-row gap-6">
// //         <div className="w-full lg:w-56 space-y-2 shrink-0">
// //           {SECTIONS.map(s => (
// //             <button key={s.key} onClick={() => setActiveSection(s.key)}
// //               className={`w-full text-left px-4 py-3 rounded-xl border text-xs font-bold transition cursor-pointer ${activeSection === s.key ? "bg-[#581a90] text-white border-[#581a90]" : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"}`}>
// //               <p className="font-black leading-tight">{s.label}</p>
// //               <p className={`text-[10px] mt-0.5 ${activeSection === s.key ? "text-purple-200" : "text-gray-400"}`}>{(sectionData[s.key] || []).length}/{s.max} selected</p>
// //             </button>
// //           ))}
// //         </div>
// //         <div className="flex-1 space-y-4">
// //           <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
// //             <div className="flex items-start justify-between mb-3">
// //               <div>
// //                 <h3 className="font-black text-sm uppercase">{currentSection?.label}</h3>
// //                 <p className="text-xs text-gray-400 mt-0.5">{currentSection?.desc}</p>
// //               </div>
// //               <span className="text-xs font-bold text-gray-400 shrink-0 ml-4">{currentProducts.length}/{currentSection?.max}</span>
// //             </div>
// //             {currentProducts.length > 0 ? (
// //               <div className="flex gap-3 flex-wrap mb-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
// //                 {currentProducts.map((p, i) => (
// //                   <div key={i} className="relative group">
// //                     <img src={p.img} alt={p.name} className="w-16 h-16 object-cover rounded-xl border-2 border-[#581a90]" />
// //                     <button onClick={() => setSectionData(prev => ({ ...prev, [activeSection]: prev[activeSection].filter((_, fi) => fi !== i) }))}
// //                       className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full text-xs hidden group-hover:flex items-center justify-center cursor-pointer font-bold">×</button>
// //                     <p className="text-[9px] text-gray-500 mt-1 text-center truncate w-16 font-bold">{p.name.split(" ").slice(0, 2).join(" ")}</p>
// //                   </div>
// //                 ))}
// //               </div>
// //             ) : (
// //               <div className="mb-4 p-4 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-center">
// //                 <p className="text-xs text-gray-400 font-bold">No products selected. Click below to add.</p>
// //               </div>
// //             )}
// //             {savedMsg && (
// //               <div className="mb-3 bg-green-50 border border-green-200 text-green-700 text-xs font-bold px-4 py-3 rounded-xl flex items-center gap-2">
// //                 <Check size={14} /> {savedMsg}
// //               </div>
// //             )}
// //             <button onClick={handleSave} disabled={saving} style={{ backgroundColor: PURPLE }}
// //               className="w-full text-white h-11 rounded-xl font-black text-xs uppercase tracking-widest hover:opacity-90 transition cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2">
// //               {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : "Save to Website"}
// //             </button>
// //           </div>
// //           <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
// //             <div className="flex items-center gap-3 mb-4">
// //               <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..."
// //                 className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold outline-none focus:ring-2 focus:ring-black" />
// //               <span className="text-xs text-gray-400 font-bold shrink-0">{filteredProducts.length}</span>
// //             </div>
// //             {loadingProds ? (
// //               <div className="flex justify-center py-10"><div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" /></div>
// //             ) : (
// //               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-100 overflow-y-auto pr-1">
// //                 {filteredProducts.map(p => {
// //                   const selected = isSelected(p._id);
// //                   return (
// //                     <div key={p._id} onClick={() => toggleProduct(p)}
// //                       className={`relative cursor-pointer rounded-xl border-2 overflow-hidden transition-all ${selected ? "border-[#581a90] shadow-lg" : "border-gray-100 hover:border-gray-300"}`}>
// //                       <img src={p.images?.[0] || "/assets/images/tshirt2.jpeg"} alt={p.name} className="w-full h-24 object-cover" />
// //                       {selected && (
// //                         <div className="absolute inset-0 bg-[#581a90]/20 flex items-center justify-center">
// //                           <div className="w-7 h-7 bg-[#581a90] rounded-full flex items-center justify-center shadow-lg"><Check size={14} className="text-white" /></div>
// //                         </div>
// //                       )}
// //                       <div className="p-2">
// //                         <p className="text-[10px] font-black uppercase leading-tight truncate">{p.name}</p>
// //                         <p className="text-[9px] text-gray-400 font-bold mt-0.5">₹{p.price}</p>
// //                         <p className="text-[9px] text-gray-300 font-bold truncate">{p.animeTag || p.category}</p>
// //                       </div>
// //                     </div>
// //                   );
// //                 })}
// //                 {filteredProducts.length === 0 && <div className="col-span-4 py-10 text-center text-xs text-gray-300 font-bold uppercase">No products found</div>}
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // // ─── Add Product Form — IMAGE DELETE FIX ─────────────────────
// // function AddProductForm({ product, onSuccess, onCancel }) {
// //   const [form, setForm] = useState({
// //     name: product?.name || "", price: product?.price || "",
// //     description: product?.description || "", category: product?.category || "T-Shirt",
// //     animeTag: product?.animeTag || "", sizes: product?.sizes?.join(", ") || "S, M, L, XL, XXL",
// //     badge: product?.badge || "NEW", brand: product?.brand || "VELTORN",
// //     stock: product?.stock || 100, isActive: product?.isActive !== false,
// //   });
// //   const [files, setFiles] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");
// //   const [deletingImage, setDeletingImage] = useState(null);

// //   // Existing images — track separately so we can delete them
// //   const [existingImages, setExistingImages] = useState(
// //     product ? (product.images || []).map((url, i) => ({
// //       url,
// //       fileId: product.imageFileIds?.[i] || null,
// //     })) : []
// //   );

// //   const showAnimeTag = form.category === "Anime";

// //   // Delete existing image from backend + remove from UI
// //   const handleDeleteExistingImage = async (img, index) => {
// //     if (!product?._id) return;
// //     if (!img.fileId) {
// //       // No fileId — just remove from local state
// //       setExistingImages(prev => prev.filter((_, i) => i !== index));
// //       return;
// //     }
// //     setDeletingImage(index);
// //     try {
// //       await productAPI.deleteImage(product._id, img.url, img.fileId);
// //       setExistingImages(prev => prev.filter((_, i) => i !== index));
// //     } catch (err) {
// //       alert("Failed to delete image: " + err.message);
// //     } finally {
// //       setDeletingImage(null);
// //     }
// //   };

// //   const handleSubmit = async () => {
// //     if (!form.name || !form.price || !form.description) { setError("Name, price and description are required"); return; }
// //     if (!files.length && !product) { setError("Please upload at least one image"); return; }
// //     setLoading(true); setError("");
// //     try {
// //       const fd = new FormData();
// //       fd.append("name", form.name); fd.append("price", form.price);
// //       fd.append("description", form.description); fd.append("category", form.category);
// //       fd.append("animeTag", showAnimeTag ? form.animeTag : "");
// //       fd.append("sizes", JSON.stringify(form.sizes.split(",").map(s => s.trim()).filter(Boolean)));
// //       fd.append("badge", form.badge); fd.append("brand", form.brand);
// //       fd.append("stock", form.stock); fd.append("isActive", form.isActive);
// //       files.forEach(f => fd.append("images", f));
// //       if (product) await productAPI.update(product._id, fd);
// //       else await productAPI.create(fd);
// //       onSuccess();
// //     } catch (err) { setError(err.message); }
// //     finally { setLoading(false); }
// //   };

// //   return (
// //     <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
// //       <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
// //         <h2 className="text-xl font-black uppercase tracking-tight">{product ? "Edit Product" : "Add New Product"}</h2>
// //         {onCancel && <button onClick={onCancel} className="text-gray-400 hover:text-black transition cursor-pointer"><X size={20} /></button>}
// //       </div>
// //       <div className="p-6 space-y-6">
// //         {error && <div className="bg-red-50 text-red-500 text-xs font-bold px-4 py-3 rounded-xl border border-red-100">{error}</div>}
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
// //           <div className="md:col-span-2">
// //             <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Product Name *</label>
// //             <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
// //               placeholder="e.g. Naruto Sage Mode Oversized Tee"
// //               className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-black" />
// //           </div>
// //           <div>
// //             <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Category *</label>
// //             <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value, animeTag: "" })}
// //               className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold outline-none cursor-pointer">
// //               {CATEGORIES.map(c => <option key={c}>{c}</option>)}
// //             </select>
// //           </div>
// //           {showAnimeTag && (
// //             <div>
// //               <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Anime Series *</label>
// //               <select value={form.animeTag} onChange={e => setForm({ ...form, animeTag: e.target.value })}
// //                 className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold outline-none cursor-pointer">
// //                 <option value="">Select anime...</option>
// //                 {ANIME_TAGS.map(a => <option key={a}>{a}</option>)}
// //               </select>
// //             </div>
// //           )}
// //           <div>
// //             <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Price (₹) *</label>
// //             <input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })}
// //               placeholder="999" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-black" />
// //           </div>
// //           <div>
// //             <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Brand</label>
// //             <input type="text" value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })}
// //               className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-black" />
// //           </div>
// //           <div>
// //             <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Stock</label>
// //             <input type="number" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })}
// //               className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-black" />
// //           </div>
// //           <div>
// //             <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Badge</label>
// //             <select value={form.badge} onChange={e => setForm({ ...form, badge: e.target.value })}
// //               className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold outline-none cursor-pointer">
// //               {BADGES.map(b => <option key={b}>{b}</option>)}
// //             </select>
// //           </div>
// //           <div>
// //             <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Status</label>
// //             <select value={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.value === "true" })}
// //               className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold outline-none cursor-pointer">
// //               <option value="true">Active (Visible)</option>
// //               <option value="false">Hidden</option>
// //             </select>
// //           </div>
// //           <div className="md:col-span-2">
// //             <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Sizes (comma separated)</label>
// //             <input type="text" value={form.sizes} onChange={e => setForm({ ...form, sizes: e.target.value })}
// //               placeholder="S, M, L, XL, XXL" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-black" />
// //             <p className="text-[10px] text-gray-400 mt-1">For accessories: Free Size · For jeans: 28, 30, 32, 34</p>
// //           </div>
// //           <div className="md:col-span-2">
// //             <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Description *</label>
// //             <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
// //               placeholder="Describe the product — material, fit, design inspiration..."
// //               className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-black h-28 resize-none" />
// //           </div>
// //         </div>

// //         {/* ── IMAGE SECTION ────────────────────────────────── */}
// //         <div>
// //           <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">
// //             Product Images (max 5) {!product && "*"}
// //           </label>

// //           <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-10 cursor-pointer hover:border-black hover:bg-gray-50 transition">
// //             <Upload size={28} className="text-gray-300 mb-3" />
// //             <span className="text-sm font-bold text-gray-400">Click to upload new images</span>
// //             <span className="text-xs text-gray-300 mt-1">JPG, PNG, WEBP · Max 5MB each</span>
// //             <input type="file" multiple accept="image/*" className="hidden"
// //               onChange={e => setFiles(Array.from(e.target.files).slice(0, 5))} />
// //           </label>

// //           {/* New files preview — with X to remove */}
// //           {files.length > 0 && (
// //             <div className="mt-4">
// //               <p className="text-xs text-gray-400 font-bold mb-2 uppercase tracking-widest">New Images (to be uploaded):</p>
// //               <div className="flex gap-3 flex-wrap">
// //                 {files.map((f, i) => (
// //                   <div key={i} className="relative group">
// //                     <img src={URL.createObjectURL(f)} className="w-20 h-20 object-cover rounded-xl border-2 border-[#581a90]" alt="" />
// //                     <button
// //                       onClick={() => setFiles(files.filter((_, fi) => fi !== i))}
// //                       className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs cursor-pointer shadow-md hover:bg-red-600 transition">
// //                       <X size={12} />
// //                     </button>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           )}

// //           {/* Existing images — with X to delete from backend */}
// //           {existingImages.length > 0 && (
// //             <div className="mt-4">
// //               <p className="text-xs text-gray-400 font-bold mb-2 uppercase tracking-widest">Current Images (click × to delete):</p>
// //               <div className="flex gap-3 flex-wrap">
// //                 {existingImages.map((img, i) => (
// //                   <div key={i} className="relative group">
// //                     <img src={img.url} className="w-20 h-20 object-cover rounded-xl border border-gray-200" alt="" />
// //                     <button
// //                       onClick={() => handleDeleteExistingImage(img, i)}
// //                       disabled={deletingImage === i}
// //                       className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs cursor-pointer shadow-md hover:bg-red-600 transition disabled:opacity-50">
// //                       {deletingImage === i
// //                         ? <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
// //                         : <X size={12} />}
// //                     </button>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           )}
// //         </div>

// //         <button onClick={handleSubmit} disabled={loading} style={{ backgroundColor: PURPLE }}
// //           className="w-full text-white h-14 rounded-xl font-black text-sm uppercase tracking-widest hover:opacity-90 transition cursor-pointer disabled:opacity-50 flex items-center justify-center gap-3">
// //           {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : (product ? "Update Product" : "Upload Product")}
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // function ProductsPanel({ setActive, setEditProduct }) {
// //   const [products, setProducts] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [filterCat, setFilterCat] = useState("");

// //   const fetchProducts = async () => {
// //     setLoading(true);
// //     try {
// //       const params = { limit: 100 };
// //       if (filterCat) params.category = filterCat;
// //       const data = await productAPI.getAll(params);
// //       setProducts(data.products || []);
// //     } catch (err) { console.error(err); }
// //     finally { setLoading(false); }
// //   };

// //   useEffect(() => { fetchProducts(); }, [filterCat]);

// //   const handleDelete = async (id) => {
// //     if (!window.confirm("Delete this product? This cannot be undone.")) return;
// //     try { await productAPI.delete(id); fetchProducts(); }
// //     catch (err) { alert("Delete failed: " + err.message); }
// //   };

// //   return (
// //     <div className="space-y-6">
// //       <div className="flex items-center justify-between flex-wrap gap-4">
// //         <h2 className="text-2xl font-black uppercase tracking-tight">All Products ({products.length})</h2>
// //         <div className="flex items-center gap-3">
// //           <select value={filterCat} onChange={e => setFilterCat(e.target.value)}
// //             className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold outline-none cursor-pointer">
// //             <option value="">All Categories</option>
// //             {CATEGORIES.map(c => <option key={c}>{c}</option>)}
// //           </select>
// //           <button onClick={() => setActive("add-product")} style={{ backgroundColor: PURPLE }}
// //             className="flex items-center gap-2 text-white px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:opacity-90 cursor-pointer">
// //             <Plus size={14} /> Add New
// //           </button>
// //         </div>
// //       </div>
// //       {loading ? (
// //         <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" /></div>
// //       ) : (
// //         <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
// //           <div className="overflow-x-auto">
// //             <table className="w-full text-sm">
// //               <thead className="bg-gray-50">
// //                 <tr>{["Image", "Name", "Category", "Price", "Stock", "Badge", "Status", "Actions"].map(h => (
// //                   <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">{h}</th>
// //                 ))}</tr>
// //               </thead>
// //               <tbody className="divide-y divide-gray-50">
// //                 {products.map((p) => (
// //                   <tr key={p._id} className="hover:bg-gray-50">
// //                     <td className="px-4 py-3"><img src={p.images?.[0] || "/assets/images/tshirt2.jpeg"} alt={p.name} className="w-12 h-12 object-cover rounded-lg bg-gray-100" /></td>
// //                     <td className="px-4 py-3 font-bold text-xs max-w-35 truncate">{p.name}</td>
// //                     <td className="px-4 py-3 text-xs text-gray-500">{p.animeTag || p.category}</td>
// //                     <td className="px-4 py-3 font-bold text-xs">₹{p.price}</td>
// //                     <td className="px-4 py-3 text-xs">{p.stock}</td>
// //                     <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-600 uppercase">{p.badge}</span></td>
// //                     <td className="px-4 py-3">
// //                       <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${p.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
// //                         {p.isActive ? "Active" : "Hidden"}
// //                       </span>
// //                     </td>
// //                     <td className="px-4 py-3">
// //                       <div className="flex items-center gap-2">
// //                         <button onClick={() => { setEditProduct(p); setActive("add-product"); }}
// //                           className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-black hover:text-white transition cursor-pointer"><Pencil size={12} /></button>
// //                         <button onClick={() => handleDelete(p._id)}
// //                           className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-red-500 hover:text-white transition cursor-pointer"><Trash2 size={12} /></button>
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 ))}
// //                 {products.length === 0 && (
// //                   <tr><td colSpan={8} className="py-12 text-center text-xs text-gray-300 font-bold uppercase tracking-widest">No products found</td></tr>
// //                 )}
// //               </tbody>
// //             </table>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // function OrdersPanel() {
// //   const [orders, setOrders] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [filterStatus, setFilterStatus] = useState("");
// //   const [expandedOrder, setExpandedOrder] = useState(null);

// //   const fetchOrders = async () => {
// //     setLoading(true);
// //     try {
// //       const params = filterStatus ? { status: filterStatus } : {};
// //       const data = await adminAPI.getAllOrders(params);
// //       setOrders(data.orders || []);
// //     } catch (err) { console.error(err); }
// //     finally { setLoading(false); }
// //   };

// //   useEffect(() => { fetchOrders(); }, [filterStatus]);

// //   const handleStatusChange = async (orderId, newStatus) => {
// //     try { await adminAPI.updateOrderStatus(orderId, { orderStatus: newStatus }); fetchOrders(); }
// //     catch (err) { alert("Update failed: " + err.message); }
// //   };

// //   return (
// //     <div className="space-y-6">
// //       <div className="flex justify-between items-center flex-wrap gap-4">
// //         <h2 className="text-2xl font-black uppercase tracking-tight">Orders ({orders.length})</h2>
// //         <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
// //           className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold outline-none cursor-pointer">
// //           <option value="">All Orders</option>
// //           {["placed", "confirmed", "shipped", "out_for_delivery", "delivered", "cancelled"].map(s => (
// //             <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
// //           ))}
// //         </select>
// //       </div>
// //       {loading ? (
// //         <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" /></div>
// //       ) : (
// //         <div className="space-y-3">
// //           {orders.map((order) => (
// //             <div key={order._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
// //               <div className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50 transition"
// //                 onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}>
// //                 <div className="flex items-center gap-4 flex-wrap">
// //                   <span className="font-black text-sm">{order.orderId}</span>
// //                   <StatusBadge status={order.orderStatus} />
// //                   <StatusBadge status={order.paymentStatus} />
// //                   <span className="text-xs text-gray-400">{order.user?.name || "Guest"}</span>
// //                   <span className="text-xs font-black">₹{Number(order.total).toLocaleString("en-IN")}</span>
// //                   <span className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString("en-IN")}</span>
// //                 </div>
// //                 <div className="flex items-center gap-3">
// //                   <select value={order.orderStatus} onClick={e => e.stopPropagation()}
// //                     onChange={e => { e.stopPropagation(); handleStatusChange(order._id, e.target.value); }}
// //                     className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-bold outline-none cursor-pointer">
// //                     {["placed", "confirmed", "shipped", "out_for_delivery", "delivered", "cancelled"].map(s => (
// //                       <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
// //                     ))}
// //                   </select>
// //                   {expandedOrder === order._id ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
// //                 </div>
// //               </div>
// //               {expandedOrder === order._id && (
// //                 <div className="px-5 pb-5 border-t border-gray-50 pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
// //                   <div>
// //                     <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Items Ordered</p>
// //                     <div className="space-y-3">
// //                       {order.items?.map((item, i) => (
// //                         <div key={i} className="flex items-center gap-3">
// //                           <img src={item.img} alt={item.name} className="w-12 h-12 object-cover rounded-lg bg-gray-100" />
// //                           <div>
// //                             <p className="text-xs font-black uppercase">{item.name}</p>
// //                             <p className="text-[10px] text-gray-400">Size: {item.size} · Qty: {item.quantity} · ₹{item.price}</p>
// //                           </div>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   </div>
// //                   <div>
// //                     <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Shipping Address</p>
// //                     <p className="text-sm font-bold">{order.shippingAddress?.fullName}</p>
// //                     <p className="text-xs text-gray-500">{order.shippingAddress?.street}</p>
// //                     <p className="text-xs text-gray-500">{order.shippingAddress?.city} - {order.shippingAddress?.pincode}</p>
// //                     <p className="text-xs text-gray-500 mt-1">📞 {order.shippingAddress?.phone}</p>
// //                     <p className="text-xs text-gray-400 mt-2">Payment: <span className="font-bold text-black">{order.paymentMethod}</span></p>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>
// //           ))}
// //           {orders.length === 0 && (
// //             <div className="bg-white rounded-2xl border border-gray-100 py-16 text-center">
// //               <p className="text-xs font-bold uppercase tracking-widest text-gray-300">No orders found</p>
// //             </div>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // function UsersPanel() {
// //   const [users, setUsers] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   useEffect(() => {
// //     adminAPI.getAllUsers().then(setUsers).catch(console.error).finally(() => setLoading(false));
// //   }, []);
// //   return (
// //     <div className="space-y-6">
// //       <h2 className="text-2xl font-black uppercase tracking-tight">Users ({users.length})</h2>
// //       {loading ? (
// //         <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" /></div>
// //       ) : (
// //         <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
// //           <div className="overflow-x-auto">
// //             <table className="w-full text-sm">
// //               <thead className="bg-gray-50">
// //                 <tr>{["Name", "Email", "Phone", "Joined"].map(h => (
// //                   <th key={h} className="px-5 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">{h}</th>
// //                 ))}</tr>
// //               </thead>
// //               <tbody className="divide-y divide-gray-50">
// //                 {users.map((u) => (
// //                   <tr key={u._id} className="hover:bg-gray-50">
// //                     <td className="px-5 py-4 font-bold text-xs">{u.name}</td>
// //                     <td className="px-5 py-4 text-xs text-gray-500">{u.email}</td>
// //                     <td className="px-5 py-4 text-xs text-gray-500">{u.phone || "—"}</td>
// //                     <td className="px-5 py-4 text-xs text-gray-400">{new Date(u.createdAt).toLocaleDateString("en-IN")}</td>
// //                   </tr>
// //                 ))}
// //                 {users.length === 0 && (
// //                   <tr><td colSpan={4} className="py-10 text-center text-xs text-gray-300 font-bold">No users yet</td></tr>
// //                 )}
// //               </tbody>
// //             </table>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // function AdminLogin({ onLogin }) {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");
// //   const handleLogin = async () => {
// //     if (!email || !password) { setError("Both fields required"); return; }
// //     setLoading(true); setError("");
// //     try {
// //       const data = await authAPI.login({ email, password });
// //       if (data.user.role !== "admin") { setError("Access denied. Admins only."); return; }
// //       localStorage.setItem("veltorn_token", data.token);
// //       localStorage.setItem("veltorn_admin", JSON.stringify(data.user));
// //       onLogin(data.user);
// //     } catch (err) { setError(err.message); }
// //     finally { setLoading(false); }
// //   };
// //   return (
// //     <div className="min-h-screen bg-black flex items-center justify-center px-4">
// //       <div className="bg-white rounded-3xl p-10 w-full max-w-md shadow-2xl">
// //         <h1 className="text-3xl font-black uppercase tracking-tight mb-1" style={{ color: PURPLE }}>VELTORN</h1>
// //         <p className="text-xs text-gray-400 uppercase tracking-widest mb-8">Admin Panel — Restricted Access</p>
// //         {error && <div className="bg-red-50 text-red-500 text-xs font-bold px-4 py-3 rounded-xl mb-5 border border-red-100">{error}</div>}
// //         <div className="space-y-4">
// //           <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Admin Email"
// //             className="w-full border border-gray-200 rounded-xl px-5 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-black" />
// //           <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"
// //             onKeyDown={e => e.key === "Enter" && handleLogin()}
// //             className="w-full border border-gray-200 rounded-xl px-5 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-black" />
// //           <button onClick={handleLogin} disabled={loading} style={{ backgroundColor: PURPLE }}
// //             className="w-full text-white h-14 rounded-xl font-black text-sm uppercase tracking-widest hover:opacity-90 transition cursor-pointer disabled:opacity-50 flex items-center justify-center">
// //             {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : "LOGIN TO ADMIN"}
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default function AdminPanel() {
// //   const [activeSection, setActiveSection] = useState("dashboard");
// //   const [editProduct, setEditProduct] = useState(null);
// //   const [admin, setAdmin] = useState(() => {
// //     try { return JSON.parse(localStorage.getItem("veltorn_admin")); }
// //     catch { return null; }
// //   });
// //   const handleLogout = () => {
// //     localStorage.removeItem("veltorn_token");
// //     localStorage.removeItem("veltorn_admin");
// //     setAdmin(null);
// //   };
// //   const handleSetActive = (section) => {
// //     if (section !== "add-product") setEditProduct(null);
// //     setActiveSection(section);
// //   };
// //   if (!admin) return <AdminLogin onLogin={setAdmin} />;
// //   const renderSection = () => {
// //     switch (activeSection) {
// //       case "dashboard": return <Dashboard setActive={handleSetActive} />;
// //       case "main-page": return <MainPageProducts />;
// //       case "add-product": return (
// //         <AddProductForm
// //           product={editProduct}
// //           onSuccess={() => { setEditProduct(null); setActiveSection("products"); }}
// //           onCancel={editProduct ? () => { setEditProduct(null); setActiveSection("products"); } : null}
// //         />
// //       );
// //       case "products": return <ProductsPanel setActive={handleSetActive} setEditProduct={setEditProduct} />;
// //       case "orders": return <OrdersPanel />;
// //       case "users": return <UsersPanel />;
// //       default: return <Dashboard setActive={handleSetActive} />;
// //     }
// //   };
// //   return (
// //     <div className="flex min-h-screen bg-zinc-50">
// //       <Sidebar active={activeSection} setActive={handleSetActive} onLogout={handleLogout} admin={admin} />
// //       <main className="flex-1 p-8 overflow-y-auto">
// //         <div className="max-w-6xl mx-auto">{renderSection()}</div>
// //       </main>
// //     </div>
// //   );
// // }




// import React, { useState, useEffect } from "react";
// import {
//   LayoutDashboard, Package, ShoppingBag, Users,
//   Plus, Pencil, Trash2, X, LogOut, Upload, TrendingUp,
//   ChevronDown, ChevronUp, Layout, Check, MessageSquare, Trash,
// } from "lucide-react";
// import { adminAPI, productAPI, authAPI, pageProductsAPI } from "../../services/api";

// const PURPLE = "#581a90";
// const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
// const CATEGORIES = ["T-Shirt", "Shirt", "Jeans", "Cap", "Accessories", "Anime"];
// const ANIME_TAGS = ["Naruto", "Solo Leveling", "Demon Slayer", "One Piece"];
// const BADGES = ["NEW", "LIMITED", "SPECIAL"];

// const SECTIONS = [
//   { key: "hero", label: "Hero Video Products", max: 5, desc: "Products shown in hero slider on main page (max 5)" },
//   { key: "new_arrivals", label: "New Arrivals", max: 8, desc: "Products in New Arrivals section (max 8)" },
//   { key: "accessories", label: "Accessories", max: 8, desc: "Products in Accessories section (max 8)" },
//   { key: "featured", label: "Featured Collection", max: 2, desc: "Slot 0 = small card (left), Slot 1 = large card (right)" },
//   { key: "anime_picks", label: "Anime Top Picks", max: 6, desc: "Top Picks For You on Anime page (max 6)" },
//   { key: "anime_naruto", label: "Naruto Category Image", max: 1, desc: "Image shown on Naruto category card" },
//   { key: "anime_solo_leveling", label: "Solo Leveling Image", max: 1, desc: "Image shown on Solo Leveling category card" },
//   { key: "anime_demon_slayer", label: "Demon Slayer Image", max: 1, desc: "Image shown on Demon Slayer category card" },
//   { key: "anime_one_piece", label: "One Piece Image", max: 1, desc: "Image shown on One Piece category card" },
// ];

// function StatusBadge({ status }) {
//   const colors = {
//     placed: "bg-yellow-100 text-yellow-700", confirmed: "bg-blue-100 text-blue-700",
//     shipped: "bg-purple-100 text-purple-700", out_for_delivery: "bg-orange-100 text-orange-700",
//     delivered: "bg-green-100 text-green-700", cancelled: "bg-red-100 text-red-700",
//     pending: "bg-gray-100 text-gray-600", paid: "bg-green-100 text-green-700", failed: "bg-red-100 text-red-700",
//   };
//   return (
//     <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${colors[status] || "bg-gray-100 text-gray-600"}`}>
//       {(status || "").replace(/_/g, " ")}
//     </span>
//   );
// }

// function Sidebar({ active, setActive, onLogout, admin, unreadCount }) {
//   const items = [
//     { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
//     { id: "main-page", label: "Main Page Products", icon: Layout },
//     { id: "add-product", label: "Add Product", icon: Plus },
//     { id: "products", label: "All Products", icon: Package },
//     { id: "orders", label: "Orders", icon: ShoppingBag },
//     { id: "users", label: "Users", icon: Users },
//     { id: "support", label: "Support", icon: MessageSquare, badge: unreadCount },
//   ];
//   return (
//     <aside className="w-64 bg-black text-white min-h-screen flex flex-col shrink-0">
//       <div className="px-6 py-8 border-b border-gray-800">
//         <h1 className="text-xl font-black tracking-widest uppercase">VELTORN</h1>
//         <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">Admin Panel</p>
//         {admin && (
//           <div className="mt-3">
//             <p className="text-xs font-bold text-white truncate">{admin.name}</p>
//             <p className="text-[10px] text-gray-600 truncate">{admin.email}</p>
//           </div>
//         )}
//       </div>
//       <nav className="flex-1 px-4 py-6 space-y-1">
//         {items.map(({ id, label, icon: Icon, badge }) => (
//           <button key={id} onClick={() => setActive(id)}
//             className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wide transition-all cursor-pointer ${active === id ? "bg-[#581a90] text-white" : "text-gray-400 hover:bg-gray-900 hover:text-white"}`}>
//             <Icon size={16} /> {label}
//             {badge > 0 && (
//               <span className="ml-auto bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full min-w-4.5 text-center">
//                 {badge}
//               </span>
//             )}
//           </button>
//         ))}
//       </nav>
//       <div className="px-4 py-6 border-t border-gray-800">
//         <button onClick={onLogout}
//           className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-400 hover:bg-red-900/20 transition cursor-pointer">
//           <LogOut size={16} /> Logout
//         </button>
//       </div>
//     </aside>
//   );
// }

// // ─── Support Panel ────────────────────────────────────────────
// function SupportPanel() {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState("all");

//   const fetchMessages = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("veltorn_token");
//       const res = await fetch(`${BASE_URL}/support`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       setMessages(Array.isArray(data) ? data : []);
//     } catch (err) { console.error(err); }
//     finally { setLoading(false); }
//   };

//   useEffect(() => { fetchMessages(); }, []);

//   const handleResolve = async (id) => {
//     try {
//       const token = localStorage.getItem("veltorn_token");
//       await fetch(`${BASE_URL}/support/${id}/resolve`, {
//         method: "PUT",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchMessages();
//     } catch (err) { alert("Error: " + err.message); }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this message?")) return;
//     try {
//       const token = localStorage.getItem("veltorn_token");
//       await fetch(`${BASE_URL}/support/${id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchMessages();
//     } catch (err) { alert("Error: " + err.message); }
//   };

//   const filtered = filter === "all" ? messages : messages.filter(m => m.status === filter);
//   const openCount = messages.filter(m => m.status === "open").length;

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between flex-wrap gap-4">
//         <div>
//           <h2 className="text-2xl font-black uppercase tracking-tight">Support Messages</h2>
//           <p className="text-xs text-gray-400 mt-1">{openCount} open · {messages.length} total</p>
//         </div>
//         <div className="flex gap-2">
//           {["all", "open", "resolved"].map(f => (
//             <button key={f} onClick={() => setFilter(f)}
//               className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition cursor-pointer ${filter === f ? "bg-[#581a90] text-white" : "bg-white border border-gray-200 text-gray-500 hover:border-gray-400"}`}>
//               {f}
//             </button>
//           ))}
//         </div>
//       </div>

//       {loading ? (
//         <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" /></div>
//       ) : filtered.length === 0 ? (
//         <div className="bg-white rounded-2xl border border-gray-100 py-16 text-center">
//           <MessageSquare size={32} className="text-gray-200 mx-auto mb-3" />
//           <p className="text-xs font-bold uppercase tracking-widest text-gray-300">No messages</p>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {filtered.map((msg) => (
//             <div key={msg._id} className={`bg-white rounded-2xl border shadow-sm overflow-hidden ${msg.status === "open" ? "border-[#581a90]/30" : "border-gray-100"}`}>
//               <div className="px-6 py-4">
//                 <div className="flex items-start justify-between gap-4 flex-wrap">
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-center gap-3 flex-wrap mb-2">
//                       <span className="font-black text-sm">{msg.name}</span>
//                       <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${msg.status === "open" ? "bg-purple-100 text-purple-700" : "bg-green-100 text-green-700"}`}>
//                         {msg.status}
//                       </span>
//                       <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full uppercase">{msg.subject}</span>
//                     </div>
//                     <p className="text-xs text-gray-400 mb-3">{msg.email} · {new Date(msg.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
//                     <p className="text-sm text-gray-700 font-medium leading-relaxed bg-gray-50 rounded-xl px-4 py-3">{msg.message}</p>
//                   </div>
//                   <div className="flex flex-col gap-2 shrink-0">
//                     {msg.status === "open" && (
//                       <button onClick={() => handleResolve(msg._id)}
//                         className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 text-green-700 rounded-xl text-xs font-black uppercase hover:bg-green-100 transition cursor-pointer">
//                         <Check size={12} /> Resolve
//                       </button>
//                     )}
//                     <button onClick={() => handleDelete(msg._id)}
//                       className="flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-100 text-red-500 rounded-xl text-xs font-black uppercase hover:bg-red-100 transition cursor-pointer">
//                       <Trash size={12} /> Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// function Dashboard({ setActive }) {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   useEffect(() => { adminAPI.getDashboard().then(setData).catch(console.error).finally(() => setLoading(false)); }, []);
//   if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" /></div>;
//   const stats = [
//     { label: "Total Orders", value: data?.totalOrders || 0, icon: ShoppingBag, color: "bg-purple-50 text-purple-600", action: () => setActive("orders") },
//     { label: "Total Revenue", value: `₹${(data?.totalRevenue || 0).toLocaleString("en-IN")}`, icon: TrendingUp, color: "bg-green-50 text-green-600" },
//     { label: "Products", value: data?.totalProducts || 0, icon: Package, color: "bg-blue-50 text-blue-600", action: () => setActive("products") },
//     { label: "Users", value: data?.totalUsers || 0, icon: Users, color: "bg-orange-50 text-orange-600", action: () => setActive("users") },
//   ];
//   return (
//     <div className="space-y-8">
//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-black uppercase tracking-tight">Dashboard</h2>
//         <button onClick={() => setActive("add-product")} style={{ backgroundColor: PURPLE }}
//           className="flex items-center gap-2 text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:opacity-90 transition cursor-pointer">
//           <Plus size={14} /> Add Product
//         </button>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
//         {stats.map(({ label, value, icon: Icon, color, action }) => (
//           <div key={label} onClick={action} className={`bg-white rounded-2xl p-6 border border-gray-100 shadow-sm ${action ? "cursor-pointer hover:shadow-md transition" : ""}`}>
//             <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color}`}><Icon size={20} /></div>
//             <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{label}</p>
//             <p className="text-2xl font-black text-black mt-1">{value}</p>
//           </div>
//         ))}
//       </div>
//       <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
//         <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
//           <h3 className="font-black text-sm uppercase tracking-widest">Recent Orders</h3>
//           <button onClick={() => setActive("orders")} className="text-xs font-bold text-gray-400 hover:text-black cursor-pointer">View all →</button>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead className="bg-gray-50">
//               <tr>{["Order ID", "Customer", "Total", "Status", "Date"].map(h => (
//                 <th key={h} className="px-5 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">{h}</th>
//               ))}</tr>
//             </thead>
//             <tbody className="divide-y divide-gray-50">
//               {(data?.recentOrders || []).map((order) => (
//                 <tr key={order._id} className="hover:bg-gray-50">
//                   <td className="px-5 py-4 font-bold text-xs">{order.orderId}</td>
//                   <td className="px-5 py-4 text-xs">{order.user?.name || "Guest"}</td>
//                   <td className="px-5 py-4 font-bold text-xs">₹{Number(order.total).toLocaleString("en-IN")}</td>
//                   <td className="px-5 py-4"><StatusBadge status={order.orderStatus} /></td>
//                   <td className="px-5 py-4 text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString("en-IN")}</td>
//                 </tr>
//               ))}
//               {(!data?.recentOrders || data.recentOrders.length === 0) && (
//                 <tr><td colSpan={5} className="px-5 py-10 text-center text-xs text-gray-300 font-bold uppercase tracking-widest">No orders yet</td></tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// function MainPageProducts() {
//   const [allProducts, setAllProducts] = useState([]);
//   const [sectionData, setSectionData] = useState({});
//   const [loadingProds, setLoadingProds] = useState(true);
//   const [activeSection, setActiveSection] = useState("hero");
//   const [saving, setSaving] = useState(false);
//   const [savedMsg, setSavedMsg] = useState("");
//   const [search, setSearch] = useState("");
//   useEffect(() => { productAPI.getAll({ limit: 200 }).then(data => setAllProducts(data.products || [])).catch(console.error).finally(() => setLoadingProds(false)); }, []);
//   useEffect(() => {
//     if (sectionData[activeSection] !== undefined) return;
//     pageProductsAPI.getSection(activeSection).then(data => setSectionData(prev => ({ ...prev, [activeSection]: data.products || [] }))).catch(() => setSectionData(prev => ({ ...prev, [activeSection]: [] })));
//   }, [activeSection]);
//   const currentSection = SECTIONS.find(s => s.key === activeSection);
//   const currentProducts = sectionData[activeSection] || [];
//   const isSelected = (productId) => currentProducts.some(p => String(p.id) === String(productId));
//   const toggleProduct = (product) => {
//     const sec = SECTIONS.find(s => s.key === activeSection);
//     if (isSelected(product._id)) { setSectionData(prev => ({ ...prev, [activeSection]: prev[activeSection].filter(p => String(p.id) !== String(product._id)) })); }
//     else {
//       if (currentProducts.length >= sec.max) { alert(`Maximum ${sec.max} product(s) allowed.`); return; }
//       setSectionData(prev => ({ ...prev, [activeSection]: [...(prev[activeSection] || []), { id: product._id, name: product.name, price: String(product.price), img: product.images?.[0] || "/assets/images/tshirt2.jpeg", badge: product.badge, sizes: product.sizes || [], collection: product.animeTag || product.category, slot: (prev[activeSection] || []).length }] }));
//     }
//   };
//   const handleSave = async () => {
//     setSaving(true);
//     try { const products = (sectionData[activeSection] || []).map((p, i) => ({ productId: p.id, slot: i })); await pageProductsAPI.setSection(activeSection, products); setSavedMsg("Saved! Website updated."); setTimeout(() => setSavedMsg(""), 3000); }
//     catch (err) { alert("Save failed: " + err.message); }
//     finally { setSaving(false); }
//   };
//   const filteredProducts = allProducts.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || (p.animeTag || "").toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()));
//   return (
//     <div className="space-y-6">
//       <div><h2 className="text-2xl font-black uppercase tracking-tight">Main Page Products</h2><p className="text-xs text-gray-400 mt-1">Select products for each section. Saves instantly on website.</p></div>
//       <div className="flex flex-col lg:flex-row gap-6">
//         <div className="w-full lg:w-56 space-y-2 shrink-0">
//           {SECTIONS.map(s => (<button key={s.key} onClick={() => setActiveSection(s.key)} className={`w-full text-left px-4 py-3 rounded-xl border text-xs font-bold transition cursor-pointer ${activeSection === s.key ? "bg-[#581a90] text-white border-[#581a90]" : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"}`}><p className="font-black leading-tight">{s.label}</p><p className={`text-[10px] mt-0.5 ${activeSection === s.key ? "text-purple-200" : "text-gray-400"}`}>{(sectionData[s.key] || []).length}/{s.max} selected</p></button>))}
//         </div>
//         <div className="flex-1 space-y-4">
//           <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
//             <div className="flex items-start justify-between mb-3"><div><h3 className="font-black text-sm uppercase">{currentSection?.label}</h3><p className="text-xs text-gray-400 mt-0.5">{currentSection?.desc}</p></div><span className="text-xs font-bold text-gray-400 shrink-0 ml-4">{currentProducts.length}/{currentSection?.max}</span></div>
//             {currentProducts.length > 0 ? (<div className="flex gap-3 flex-wrap mb-4 p-3 bg-gray-50 rounded-xl border border-gray-100">{currentProducts.map((p, i) => (<div key={i} className="relative group"><img src={p.img} alt={p.name} className="w-16 h-16 object-cover rounded-xl border-2 border-[#581a90]" /><button onClick={() => setSectionData(prev => ({ ...prev, [activeSection]: prev[activeSection].filter((_, fi) => fi !== i) }))} className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full text-xs hidden group-hover:flex items-center justify-center cursor-pointer font-bold">×</button><p className="text-[9px] text-gray-500 mt-1 text-center truncate w-16 font-bold">{p.name.split(" ").slice(0, 2).join(" ")}</p></div>))}</div>) : (<div className="mb-4 p-4 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-center"><p className="text-xs text-gray-400 font-bold">No products selected.</p></div>)}
//             {savedMsg && (<div className="mb-3 bg-green-50 border border-green-200 text-green-700 text-xs font-bold px-4 py-3 rounded-xl flex items-center gap-2"><Check size={14} /> {savedMsg}</div>)}
//             <button onClick={handleSave} disabled={saving} style={{ backgroundColor: PURPLE }} className="w-full text-white h-11 rounded-xl font-black text-xs uppercase tracking-widest hover:opacity-90 transition cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2">{saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : "Save to Website"}</button>
//           </div>
//           <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
//             <div className="flex items-center gap-3 mb-4"><input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold outline-none focus:ring-2 focus:ring-black" /><span className="text-xs text-gray-400 font-bold shrink-0">{filteredProducts.length}</span></div>
//             {loadingProds ? (<div className="flex justify-center py-10"><div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" /></div>) : (
//               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-100 overflow-y-auto pr-1">
//                 {filteredProducts.map(p => { const selected = isSelected(p._id); return (<div key={p._id} onClick={() => toggleProduct(p)} className={`relative cursor-pointer rounded-xl border-2 overflow-hidden transition-all ${selected ? "border-[#581a90] shadow-lg" : "border-gray-100 hover:border-gray-300"}`}><img src={p.images?.[0] || "/assets/images/tshirt2.jpeg"} alt={p.name} className="w-full h-24 object-cover" />{selected && (<div className="absolute inset-0 bg-[#581a90]/20 flex items-center justify-center"><div className="w-7 h-7 bg-[#581a90] rounded-full flex items-center justify-center shadow-lg"><Check size={14} className="text-white" /></div></div>)}<div className="p-2"><p className="text-[10px] font-black uppercase leading-tight truncate">{p.name}</p><p className="text-[9px] text-gray-400 font-bold mt-0.5">₹{p.price}</p><p className="text-[9px] text-gray-300 font-bold truncate">{p.animeTag || p.category}</p></div></div>); })}
//                 {filteredProducts.length === 0 && <div className="col-span-4 py-10 text-center text-xs text-gray-300 font-bold uppercase">No products found</div>}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function AddProductForm({ product, onSuccess, onCancel }) {
//   const [form, setForm] = useState({ name: product?.name || "", price: product?.price || "", description: product?.description || "", category: product?.category || "T-Shirt", animeTag: product?.animeTag || "", sizes: product?.sizes?.join(", ") || "S, M, L, XL, XXL", badge: product?.badge || "NEW", brand: product?.brand || "VELTORN", stock: product?.stock || 100, isActive: product?.isActive !== false });
//   const [files, setFiles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [deletingImage, setDeletingImage] = useState(null);
//   const [existingImages, setExistingImages] = useState(product ? (product.images || []).map((url, i) => ({ url, fileId: product.imageFileIds?.[i] || null })) : []);
//   const showAnimeTag = form.category === "Anime";
//   const handleDeleteExistingImage = async (img, index) => {
//     if (!product?._id) return;
//     if (!img.fileId) { setExistingImages(prev => prev.filter((_, i) => i !== index)); return; }
//     setDeletingImage(index);
//     try { await productAPI.deleteImage(product._id, img.url, img.fileId); setExistingImages(prev => prev.filter((_, i) => i !== index)); }
//     catch (err) { alert("Failed to delete image: " + err.message); }
//     finally { setDeletingImage(null); }
//   };
//   const handleSubmit = async () => {
//     if (!form.name || !form.price || !form.description) { setError("Name, price and description are required"); return; }
//     if (!files.length && !product) { setError("Please upload at least one image"); return; }
//     setLoading(true); setError("");
//     try {
//       const fd = new FormData();
//       fd.append("name", form.name); fd.append("price", form.price); fd.append("description", form.description); fd.append("category", form.category); fd.append("animeTag", showAnimeTag ? form.animeTag : ""); fd.append("sizes", JSON.stringify(form.sizes.split(",").map(s => s.trim()).filter(Boolean))); fd.append("badge", form.badge); fd.append("brand", form.brand); fd.append("stock", form.stock); fd.append("isActive", form.isActive);
//       files.forEach(f => fd.append("images", f));
//       if (product) await productAPI.update(product._id, fd); else await productAPI.create(fd);
//       onSuccess();
//     } catch (err) { setError(err.message); } finally { setLoading(false); }
//   };
//   return (
//     <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
//       <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
//         <h2 className="text-xl font-black uppercase tracking-tight">{product ? "Edit Product" : "Add New Product"}</h2>
//         {onCancel && <button onClick={onCancel} className="text-gray-400 hover:text-black transition cursor-pointer"><X size={20} /></button>}
//       </div>
//       <div className="p-6 space-y-6">
//         {error && <div className="bg-red-50 text-red-500 text-xs font-bold px-4 py-3 rounded-xl border border-red-100">{error}</div>}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//           <div className="md:col-span-2"><label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Product Name *</label><input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Naruto Sage Mode Oversized Tee" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-black" /></div>
//           <div><label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Category *</label><select value={form.category} onChange={e => setForm({ ...form, category: e.target.value, animeTag: "" })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold outline-none cursor-pointer">{CATEGORIES.map(c => <option key={c}>{c}</option>)}</select></div>
//           {showAnimeTag && (<div><label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Anime Series *</label><select value={form.animeTag} onChange={e => setForm({ ...form, animeTag: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold outline-none cursor-pointer"><option value="">Select anime...</option>{ANIME_TAGS.map(a => <option key={a}>{a}</option>)}</select></div>)}
//           <div><label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Price (₹) *</label><input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="999" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-black" /></div>
//           <div><label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Brand</label><input type="text" value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-black" /></div>
//           <div><label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Stock</label><input type="number" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-black" /></div>
//           <div><label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Badge</label><select value={form.badge} onChange={e => setForm({ ...form, badge: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold outline-none cursor-pointer">{BADGES.map(b => <option key={b}>{b}</option>)}</select></div>
//           <div><label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Status</label><select value={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.value === "true" })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold outline-none cursor-pointer"><option value="true">Active (Visible)</option><option value="false">Hidden</option></select></div>
//           <div className="md:col-span-2"><label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Sizes (comma separated)</label><input type="text" value={form.sizes} onChange={e => setForm({ ...form, sizes: e.target.value })} placeholder="S, M, L, XL, XXL" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-black" /><p className="text-[10px] text-gray-400 mt-1">For accessories: Free Size · For jeans: 28, 30, 32, 34</p></div>
//           <div className="md:col-span-2"><label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Description *</label><textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Describe the product..." className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-black h-28 resize-none" /></div>
//         </div>
//         <div>
//           <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Product Images (max 5) {!product && "*"}</label>
//           <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-10 cursor-pointer hover:border-black hover:bg-gray-50 transition"><Upload size={28} className="text-gray-300 mb-3" /><span className="text-sm font-bold text-gray-400">Click to upload new images</span><span className="text-xs text-gray-300 mt-1">JPG, PNG, WEBP · Max 10MB each</span><input type="file" multiple accept="image/*" className="hidden" onChange={e => setFiles(Array.from(e.target.files).slice(0, 5))} /></label>
//           {files.length > 0 && (<div className="mt-4"><p className="text-xs text-gray-400 font-bold mb-2 uppercase tracking-widest">New Images (to be uploaded):</p><div className="flex gap-3 flex-wrap">{files.map((f, i) => (<div key={i} className="relative group"><img src={URL.createObjectURL(f)} className="w-20 h-20 object-cover rounded-xl border-2 border-[#581a90]" alt="" /><button onClick={() => setFiles(files.filter((_, fi) => fi !== i))} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs cursor-pointer shadow-md hover:bg-red-600 transition"><X size={12} /></button></div>))}</div></div>)}
//           {existingImages.length > 0 && (<div className="mt-4"><p className="text-xs text-gray-400 font-bold mb-2 uppercase tracking-widest">Current Images (click × to delete):</p><div className="flex gap-3 flex-wrap">{existingImages.map((img, i) => (<div key={i} className="relative group"><img src={img.url} className="w-20 h-20 object-cover rounded-xl border border-gray-200" alt="" /><button onClick={() => handleDeleteExistingImage(img, i)} disabled={deletingImage === i} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs cursor-pointer shadow-md hover:bg-red-600 transition disabled:opacity-50">{deletingImage === i ? <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" /> : <X size={12} />}</button></div>))}</div></div>)}
//         </div>
//         <button onClick={handleSubmit} disabled={loading} style={{ backgroundColor: PURPLE }} className="w-full text-white h-14 rounded-xl font-black text-sm uppercase tracking-widest hover:opacity-90 transition cursor-pointer disabled:opacity-50 flex items-center justify-center gap-3">{loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : (product ? "Update Product" : "Upload Product")}</button>
//       </div>
//     </div>
//   );
// }

// function ProductsPanel({ setActive, setEditProduct }) {
//   const [products, setProducts] = useState([]); const [loading, setLoading] = useState(true); const [filterCat, setFilterCat] = useState("");
//   const fetchProducts = async () => { setLoading(true); try { const params = { limit: 100 }; if (filterCat) params.category = filterCat; const data = await productAPI.getAll(params); setProducts(data.products || []); } catch (err) { console.error(err); } finally { setLoading(false); } };
//   useEffect(() => { fetchProducts(); }, [filterCat]);
//   const handleDelete = async (id) => { if (!window.confirm("Delete this product?")) return; try { await productAPI.delete(id); fetchProducts(); } catch (err) { alert("Delete failed: " + err.message); } };
//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between flex-wrap gap-4">
//         <h2 className="text-2xl font-black uppercase tracking-tight">All Products ({products.length})</h2>
//         <div className="flex items-center gap-3">
//           <select value={filterCat} onChange={e => setFilterCat(e.target.value)} className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold outline-none cursor-pointer"><option value="">All Categories</option>{CATEGORIES.map(c => <option key={c}>{c}</option>)}</select>
//           <button onClick={() => setActive("add-product")} style={{ backgroundColor: PURPLE }} className="flex items-center gap-2 text-white px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:opacity-90 cursor-pointer"><Plus size={14} /> Add New</button>
//         </div>
//       </div>
//       {loading ? <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" /></div> : (
//         <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm">
//               <thead className="bg-gray-50"><tr>{["Image", "Name", "Category", "Price", "Stock", "Badge", "Status", "Actions"].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">{h}</th>)}</tr></thead>
//               <tbody className="divide-y divide-gray-50">
//                 {products.map((p) => (
//                   <tr key={p._id} className="hover:bg-gray-50">
//                     <td className="px-4 py-3"><img src={p.images?.[0] || "/assets/images/tshirt2.jpeg"} alt={p.name} className="w-12 h-12 object-cover rounded-lg bg-gray-100" /></td>
//                     <td className="px-4 py-3 font-bold text-xs max-w-35 truncate">{p.name}</td>
//                     <td className="px-4 py-3 text-xs text-gray-500">{p.animeTag || p.category}</td>
//                     <td className="px-4 py-3 font-bold text-xs">₹{p.price}</td>
//                     <td className="px-4 py-3 text-xs">{p.stock}</td>
//                     <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-600 uppercase">{p.badge}</span></td>
//                     <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${p.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{p.isActive ? "Active" : "Hidden"}</span></td>
//                     <td className="px-4 py-3"><div className="flex items-center gap-2"><button onClick={() => { setEditProduct(p); setActive("add-product"); }} className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-black hover:text-white transition cursor-pointer"><Pencil size={12} /></button><button onClick={() => handleDelete(p._id)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-red-500 hover:text-white transition cursor-pointer"><Trash2 size={12} /></button></div></td>
//                   </tr>
//                 ))}
//                 {products.length === 0 && <tr><td colSpan={8} className="py-12 text-center text-xs text-gray-300 font-bold uppercase tracking-widest">No products found</td></tr>}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// function OrdersPanel() {
//   const [orders, setOrders] = useState([]); const [loading, setLoading] = useState(true); const [filterStatus, setFilterStatus] = useState(""); const [expandedOrder, setExpandedOrder] = useState(null);
//   const fetchOrders = async () => { setLoading(true); try { const params = filterStatus ? { status: filterStatus } : {}; const data = await adminAPI.getAllOrders(params); setOrders(data.orders || []); } catch (err) { console.error(err); } finally { setLoading(false); } };
//   useEffect(() => { fetchOrders(); }, [filterStatus]);
//   const handleStatusChange = async (orderId, newStatus) => { try { await adminAPI.updateOrderStatus(orderId, { orderStatus: newStatus }); fetchOrders(); } catch (err) { alert("Update failed: " + err.message); } };
//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center flex-wrap gap-4">
//         <h2 className="text-2xl font-black uppercase tracking-tight">Orders ({orders.length})</h2>
//         <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold outline-none cursor-pointer"><option value="">All Orders</option>{["placed","confirmed","shipped","out_for_delivery","delivered","cancelled"].map(s => <option key={s} value={s}>{s.replace(/_/g," ")}</option>)}</select>
//       </div>
//       {loading ? <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" /></div> : (
//         <div className="space-y-3">
//           {orders.map((order) => (
//             <div key={order._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
//               <div className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50 transition" onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}>
//                 <div className="flex items-center gap-4 flex-wrap"><span className="font-black text-sm">{order.orderId}</span><StatusBadge status={order.orderStatus} /><StatusBadge status={order.paymentStatus} /><span className="text-xs text-gray-400">{order.user?.name || "Guest"}</span><span className="text-xs font-black">₹{Number(order.total).toLocaleString("en-IN")}</span><span className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString("en-IN")}</span></div>
//                 <div className="flex items-center gap-3"><select value={order.orderStatus} onClick={e => e.stopPropagation()} onChange={e => { e.stopPropagation(); handleStatusChange(order._id, e.target.value); }} className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-bold outline-none cursor-pointer">{["placed","confirmed","shipped","out_for_delivery","delivered","cancelled"].map(s => <option key={s} value={s}>{s.replace(/_/g," ")}</option>)}</select>{expandedOrder === order._id ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}</div>
//               </div>
//               {expandedOrder === order._id && (
//                 <div className="px-5 pb-5 border-t border-gray-50 pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div><p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Items Ordered</p><div className="space-y-3">{order.items?.map((item, i) => (<div key={i} className="flex items-center gap-3"><img src={item.img} alt={item.name} className="w-12 h-12 object-cover rounded-lg bg-gray-100" /><div><p className="text-xs font-black uppercase">{item.name}</p><p className="text-[10px] text-gray-400">Size: {item.size} · Qty: {item.quantity} · ₹{item.price}</p></div></div>))}</div></div>
//                   <div><p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Shipping Address</p><p className="text-sm font-bold">{order.shippingAddress?.fullName}</p><p className="text-xs text-gray-500">{order.shippingAddress?.street}</p><p className="text-xs text-gray-500">{order.shippingAddress?.city} - {order.shippingAddress?.pincode}</p><p className="text-xs text-gray-500 mt-1">📞 {order.shippingAddress?.phone}</p><p className="text-xs text-gray-400 mt-2">Payment: <span className="font-bold text-black">{order.paymentMethod}</span></p></div>
//                 </div>
//               )}
//             </div>
//           ))}
//           {orders.length === 0 && <div className="bg-white rounded-2xl border border-gray-100 py-16 text-center"><p className="text-xs font-bold uppercase tracking-widest text-gray-300">No orders found</p></div>}
//         </div>
//       )}
//     </div>
//   );
// }

// function UsersPanel() {
//   const [users, setUsers] = useState([]); const [loading, setLoading] = useState(true);
//   useEffect(() => { adminAPI.getAllUsers().then(setUsers).catch(console.error).finally(() => setLoading(false)); }, []);
//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-black uppercase tracking-tight">Users ({users.length})</h2>
//       {loading ? <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" /></div> : (
//         <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm">
//               <thead className="bg-gray-50"><tr>{["Name","Email","Phone","Joined"].map(h => <th key={h} className="px-5 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">{h}</th>)}</tr></thead>
//               <tbody className="divide-y divide-gray-50">
//                 {users.map((u) => (<tr key={u._id} className="hover:bg-gray-50"><td className="px-5 py-4 font-bold text-xs">{u.name}</td><td className="px-5 py-4 text-xs text-gray-500">{u.email}</td><td className="px-5 py-4 text-xs text-gray-500">{u.phone || "—"}</td><td className="px-5 py-4 text-xs text-gray-400">{new Date(u.createdAt).toLocaleDateString("en-IN")}</td></tr>))}
//                 {users.length === 0 && <tr><td colSpan={4} className="py-10 text-center text-xs text-gray-300 font-bold">No users yet</td></tr>}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// function AdminLogin({ onLogin }) {
//   const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [loading, setLoading] = useState(false); const [error, setError] = useState("");
//   const handleLogin = async () => {
//     if (!email || !password) { setError("Both fields required"); return; }
//     setLoading(true); setError("");
//     try { const data = await authAPI.login({ email, password }); if (data.user.role !== "admin") { setError("Access denied. Admins only."); return; } localStorage.setItem("veltorn_token", data.token); localStorage.setItem("veltorn_admin", JSON.stringify(data.user)); onLogin(data.user); }
//     catch (err) { setError(err.message); } finally { setLoading(false); }
//   };
//   return (
//     <div className="min-h-screen bg-black flex items-center justify-center px-4">
//       <div className="bg-white rounded-3xl p-10 w-full max-w-md shadow-2xl">
//         <h1 className="text-3xl font-black uppercase tracking-tight mb-1" style={{ color: PURPLE }}>VELTORN</h1>
//         <p className="text-xs text-gray-400 uppercase tracking-widest mb-8">Admin Panel — Restricted Access</p>
//         {error && <div className="bg-red-50 text-red-500 text-xs font-bold px-4 py-3 rounded-xl mb-5 border border-red-100">{error}</div>}
//         <div className="space-y-4">
//           <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Admin Email" className="w-full border border-gray-200 rounded-xl px-5 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-black" />
//           <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" onKeyDown={e => e.key === "Enter" && handleLogin()} className="w-full border border-gray-200 rounded-xl px-5 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-black" />
//           <button onClick={handleLogin} disabled={loading} style={{ backgroundColor: PURPLE }} className="w-full text-white h-14 rounded-xl font-black text-sm uppercase tracking-widest hover:opacity-90 transition cursor-pointer disabled:opacity-50 flex items-center justify-center">{loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : "LOGIN TO ADMIN"}</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function AdminPanel() {
//   const [activeSection, setActiveSection] = useState("dashboard");
//   const [editProduct, setEditProduct] = useState(null);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [admin, setAdmin] = useState(() => { try { return JSON.parse(localStorage.getItem("veltorn_admin")); } catch { return null; } });

//   // Fetch unread support count
//   useEffect(() => {
//     if (!admin) return;
//     const fetchCount = async () => {
//       try {
//         const token = localStorage.getItem("veltorn_token");
//         const res = await fetch(`${BASE_URL}/support`, { headers: { Authorization: `Bearer ${token}` } });
//         const data = await res.json();
//         if (Array.isArray(data)) setUnreadCount(data.filter(m => m.status === "open").length);
//       } catch {}
//     };
//     fetchCount();
//     const interval = setInterval(fetchCount, 60000); // refresh every 1 min
//     return () => clearInterval(interval);
//   }, [admin]);

//   const handleLogout = () => { localStorage.removeItem("veltorn_token"); localStorage.removeItem("veltorn_admin"); setAdmin(null); };
//   const handleSetActive = (section) => { if (section !== "add-product") setEditProduct(null); setActiveSection(section); if (section === "support") setUnreadCount(0); };

//   if (!admin) return <AdminLogin onLogin={setAdmin} />;

//   const renderSection = () => {
//     switch (activeSection) {
//       case "dashboard": return <Dashboard setActive={handleSetActive} />;
//       case "main-page": return <MainPageProducts />;
//       case "add-product": return <AddProductForm product={editProduct} onSuccess={() => { setEditProduct(null); setActiveSection("products"); }} onCancel={editProduct ? () => { setEditProduct(null); setActiveSection("products"); } : null} />;
//       case "products": return <ProductsPanel setActive={handleSetActive} setEditProduct={setEditProduct} />;
//       case "orders": return <OrdersPanel />;
//       case "users": return <UsersPanel />;
//       case "support": return <SupportPanel />;
//       default: return <Dashboard setActive={handleSetActive} />;
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-zinc-50">
//       <Sidebar active={activeSection} setActive={handleSetActive} onLogout={handleLogout} admin={admin} unreadCount={unreadCount} />
//       <main className="flex-1 p-8 overflow-y-auto"><div className="max-w-6xl mx-auto">{renderSection()}</div></main>
//     </div>
//   );
// }



  import React, { useState, useEffect } from "react";
import {
  LayoutDashboard, Package, ShoppingBag, Users,
  Plus, Pencil, Trash2, X, LogOut, Upload, TrendingUp,
  ChevronDown, ChevronUp, Layout, Check, MessageSquare, Trash, Link,
} from "lucide-react";
import { adminAPI, productAPI, authAPI, pageProductsAPI } from "../../services/api";

const PURPLE = "#581a90";
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const CATEGORIES = ["T-Shirt", "Shirt", "Jeans", "Cap", "Accessories", "Anime"];
const ANIME_TAGS = ["Naruto", "Solo Leveling", "Demon Slayer", "One Piece"];
const BADGES = ["NEW", "LIMITED", "SPECIAL"];

const SECTIONS = [
  { key: "hero", label: "Hero Video Products", max: 5, desc: "Products shown in hero slider on main page (max 5)", type: "product" },
  { key: "new_arrivals", label: "New Arrivals", max: 8, desc: "Products in New Arrivals section (max 8)", type: "product" },
  { key: "accessories", label: "Accessories", max: 8, desc: "Products in Accessories section (max 8)", type: "product" },
  { key: "featured", label: "Featured Collection", max: 2, desc: "Slot 0 = small card (left), Slot 1 = large card (right)", type: "product" },
  { key: "anime_picks", label: "Anime Top Picks", max: 6, desc: "Top Picks For You on Anime page (max 6)", type: "product" },
  { key: "anime_naruto", label: "Naruto Banner Image", max: 1, desc: "Banner image for Naruto category card — upload or paste URL", type: "image" },
  { key: "anime_solo_leveling", label: "Solo Leveling Banner Image", max: 1, desc: "Banner image for Solo Leveling category card — upload or paste URL", type: "image" },
  { key: "anime_demon_slayer", label: "Demon Slayer Banner Image", max: 1, desc: "Banner image for Demon Slayer category card — upload or paste URL", type: "image" },
  { key: "anime_one_piece", label: "One Piece Banner Image", max: 1, desc: "Banner image for One Piece category card — upload or paste URL", type: "image" },
];

// ImageKit upload helper — reuse from product controller pattern
const uploadImageToImageKit = async (file) => {
  const token = localStorage.getItem("veltorn_token");
  const fd = new FormData();
  fd.append("images", file);
  // We upload via a dummy product update — instead use a dedicated endpoint
  // For now we use the pageProducts endpoint with a custom payload approach
  // Actually: upload as base64 and save URL directly
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result); // base64 data URL
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

function StatusBadge({ status }) {
  const colors = {
    placed: "bg-yellow-100 text-yellow-700", confirmed: "bg-blue-100 text-blue-700",
    shipped: "bg-purple-100 text-purple-700", out_for_delivery: "bg-orange-100 text-orange-700",
    delivered: "bg-green-100 text-green-700", cancelled: "bg-red-100 text-red-700",
    pending: "bg-gray-100 text-gray-600", paid: "bg-green-100 text-green-700", failed: "bg-red-100 text-red-700",
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${colors[status] || "bg-gray-100 text-gray-600"}`}>
      {(status || "").replace(/_/g, " ")}
    </span>
  );
}

function Sidebar({ active, setActive, onLogout, admin, unreadCount }) {
  const items = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "main-page", label: "Main Page Products", icon: Layout },
    { id: "add-product", label: "Add Product", icon: Plus },
    { id: "products", label: "All Products", icon: Package },
    { id: "orders", label: "Orders", icon: ShoppingBag },
    { id: "users", label: "Users", icon: Users },
    { id: "support", label: "Support", icon: MessageSquare, badge: unreadCount },
  ];
  return (
    <aside className="w-64 bg-black text-white min-h-screen flex flex-col shrink-0">
      <div className="px-6 py-8 border-b border-gray-800">
        <h1 className="text-xl font-black tracking-widest uppercase">VELTORN</h1>
        <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">Admin Panel</p>
        {admin && (
          <div className="mt-3">
            <p className="text-xs font-bold text-white truncate">{admin.name}</p>
            <p className="text-[10px] text-gray-600 truncate">{admin.email}</p>
          </div>
        )}
      </div>
      <nav className="flex-1 px-4 py-6 space-y-1">
        {items.map(({ id, label, icon: Icon, badge }) => (
          <button key={id} onClick={() => setActive(id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wide transition-all cursor-pointer ${active === id ? "bg-[#581a90] text-white" : "text-gray-400 hover:bg-gray-900 hover:text-white"}`}>
            <Icon size={16} /> {label}
            {badge > 0 && (
              <span className="ml-auto bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full min-w-4.5 text-center">{badge}</span>
            )}
          </button>
        ))}
      </nav>
      <div className="px-4 py-6 border-t border-gray-800">
        <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-400 hover:bg-red-900/20 transition cursor-pointer">
          <LogOut size={16} /> Logout
        </button>
      </div>
    </aside>
  );
}

// ─── Image Banner Upload Panel ────────────────────────────────
function ImageBannerSection({ sectionKey, label, desc, currentImg, onSave }) {
  const [urlInput, setUrlInput] = useState(currentImg || "");
  const [preview, setPreview] = useState(currentImg || "");
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState("");
  const [uploading, setUploading] = useState(false);

  // Sync when parent changes
  useEffect(() => {
    setUrlInput(currentImg || "");
    setPreview(currentImg || "");
  }, [currentImg]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      // Upload to backend via a temp product image approach
      // We'll use FormData to upload to our own /api/support-upload or
      // simply convert to base64 for preview and send URL via pageProducts
      const token = localStorage.getItem("veltorn_token");
      const fd = new FormData();
      fd.append("images", file);
      // Create a temporary product to get ImageKit URL
      // Better: use dedicated upload endpoint
      // For now: upload as FormData to backend upload route
      const res = await fetch(`${BASE_URL}/upload-image`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      if (res.ok) {
        const data = await res.json();
        setUrlInput(data.url);
        setPreview(data.url);
      } else {
        // Fallback: use base64 preview locally
        const reader = new FileReader();
        reader.onload = (ev) => {
          setPreview(ev.target.result);
          setUrlInput(ev.target.result);
        };
        reader.readAsDataURL(file);
      }
    } catch {
      // Fallback to base64
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPreview(ev.target.result);
        setUrlInput(ev.target.result);
      };
      reader.readAsDataURL(file);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!urlInput.trim()) { alert("Please enter an image URL or upload an image"); return; }
    setSaving(true);
    try {
      await onSave(urlInput.trim());
      setSavedMsg("Saved!");
      setTimeout(() => setSavedMsg(""), 3000);
    } catch (err) {
      alert("Save failed: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
      <div>
        <h3 className="font-black text-sm uppercase">{label}</h3>
        <p className="text-xs text-gray-400 mt-1">{desc}</p>
      </div>

      {/* Current preview */}
      {preview && (
        <div className="relative w-full h-40 rounded-xl overflow-hidden border border-gray-100 bg-gray-50">
          <img src={preview} alt="banner preview" className="w-full h-full object-cover" />
          <button
            onClick={() => { setPreview(""); setUrlInput(""); }}
            className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-red-600 transition cursor-pointer">
            <X size={13} />
          </button>
        </div>
      )}

      {/* Upload file */}
      <div>
        <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Upload Image</label>
        <label className="flex items-center gap-3 border-2 border-dashed border-gray-200 rounded-xl px-5 py-4 cursor-pointer hover:border-black hover:bg-gray-50 transition">
          <Upload size={18} className="text-gray-300 shrink-0" />
          <span className="text-sm font-bold text-gray-400">
            {uploading ? "Uploading..." : "Click to upload image"}
          </span>
          <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} disabled={uploading} />
        </label>
      </div>

      {/* OR paste URL */}
      <div>
        <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block items-center gap-2">
          <Link size={11} /> Or Paste Image URL
        </label>
        <input
          type="url"
          value={urlInput}
          onChange={e => { setUrlInput(e.target.value); setPreview(e.target.value); }}
          placeholder="https://example.com/image.jpg"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      {savedMsg && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-xs font-bold px-4 py-3 rounded-xl flex items-center gap-2">
          <Check size={14} /> {savedMsg}
        </div>
      )}

      <button onClick={handleSave} disabled={saving} style={{ backgroundColor: PURPLE }}
        className="w-full text-white h-11 rounded-xl font-black text-xs uppercase tracking-widest hover:opacity-90 transition cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2">
        {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : "Save Banner Image"}
      </button>
    </div>
  );
}

// ─── Main Page Products ───────────────────────────────────────
function MainPageProducts() {
  const [allProducts, setAllProducts] = useState([]);
  const [sectionData, setSectionData] = useState({});
  const [loadingProds, setLoadingProds] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    productAPI.getAll({ limit: 200 })
      .then(data => setAllProducts(data.products || []))
      .catch(console.error)
      .finally(() => setLoadingProds(false));
  }, []);

  // Load section data when switching
  useEffect(() => {
    if (sectionData[activeSection] !== undefined) return;
    pageProductsAPI.getSection(activeSection)
      .then(data => setSectionData(prev => ({ ...prev, [activeSection]: data.products || [] })))
      .catch(() => setSectionData(prev => ({ ...prev, [activeSection]: [] })));
  }, [activeSection]);

  const currentSectionMeta = SECTIONS.find(s => s.key === activeSection);
  const isImageSection = currentSectionMeta?.type === "image";
  const currentProducts = sectionData[activeSection] || [];
  const currentImageUrl = currentProducts[0]?.img || "";

  const isSelected = (productId) => currentProducts.some(p => String(p.id) === String(productId));

  const toggleProduct = (product) => {
    const sec = currentSectionMeta;
    if (isSelected(product._id)) {
      setSectionData(prev => ({ ...prev, [activeSection]: prev[activeSection].filter(p => String(p.id) !== String(product._id)) }));
    } else {
      if (currentProducts.length >= sec.max) { alert(`Maximum ${sec.max} product(s) allowed.`); return; }
      setSectionData(prev => ({
        ...prev,
        [activeSection]: [...(prev[activeSection] || []), {
          id: product._id, name: product.name, price: String(product.price),
          img: product.images?.[0] || "/assets/images/tshirt2.jpeg",
          badge: product.badge, sizes: product.sizes || [],
          collection: product.animeTag || product.category,
          slot: (prev[activeSection] || []).length,
        }],
      }));
    }
  };

  // Save image-type section — no productId, just customImage
  const handleSaveImage = async (imageUrl) => {
    await pageProductsAPI.setSection(activeSection, [{
      slot: 0,
      customImage: imageUrl,
      customName: currentSectionMeta.label,
    }]);
    // Update local state so preview stays
    setSectionData(prev => ({
      ...prev,
      [activeSection]: [{ id: "img_" + activeSection, name: currentSectionMeta.label, img: imageUrl, price: "0", sizes: [], collection: "" }],
    }));
  };

  // Save product-type section
  const handleSave = async () => {
    setSaving(true);
    try {
      const products = currentProducts.map((p, i) => ({ productId: p.id, slot: i }));
      await pageProductsAPI.setSection(activeSection, products);
      setSavedMsg("Saved! Website updated.");
      setTimeout(() => setSavedMsg(""), 3000);
    } catch (err) { alert("Save failed: " + err.message); }
    finally { setSaving(false); }
  };

  const filteredProducts = allProducts.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.animeTag || "").toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black uppercase tracking-tight">Main Page Products</h2>
        <p className="text-xs text-gray-400 mt-1">Select products or set banner images for each section.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Section selector */}
        <div className="w-full lg:w-56 space-y-2 shrink-0">
          {SECTIONS.map(s => (
            <button key={s.key} onClick={() => setActiveSection(s.key)}
              className={`w-full text-left px-4 py-3 rounded-xl border text-xs font-bold transition cursor-pointer ${activeSection === s.key ? "bg-[#581a90] text-white border-[#581a90]" : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"}`}>
              <p className="font-black leading-tight">{s.label}</p>
              <p className={`text-[10px] mt-0.5 ${activeSection === s.key ? "text-purple-200" : "text-gray-400"}`}>
                {s.type === "image" ? "Banner Image" : `${(sectionData[s.key] || []).length}/${s.max} selected`}
              </p>
            </button>
          ))}
        </div>

        <div className="flex-1 space-y-4">
          {/* IMAGE SECTION — upload/URL */}
          {isImageSection ? (
            <ImageBannerSection
              key={activeSection}
              sectionKey={activeSection}
              label={currentSectionMeta.label}
              desc={currentSectionMeta.desc}
              currentImg={currentImageUrl}
              onSave={handleSaveImage}
            />
          ) : (
            /* PRODUCT SECTION — same as before */
            <>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-black text-sm uppercase">{currentSectionMeta?.label}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{currentSectionMeta?.desc}</p>
                  </div>
                  <span className="text-xs font-bold text-gray-400 shrink-0 ml-4">{currentProducts.length}/{currentSectionMeta?.max}</span>
                </div>

                {currentProducts.length > 0 ? (
                  <div className="flex gap-3 flex-wrap mb-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                    {currentProducts.map((p, i) => (
                      <div key={i} className="relative group">
                        <img src={p.img} alt={p.name} className="w-16 h-16 object-cover rounded-xl border-2 border-[#581a90]" />
                        <button onClick={() => setSectionData(prev => ({ ...prev, [activeSection]: prev[activeSection].filter((_, fi) => fi !== i) }))}
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full text-xs hidden group-hover:flex items-center justify-center cursor-pointer font-bold">×</button>
                        <p className="text-[9px] text-gray-500 mt-1 text-center truncate w-16 font-bold">{p.name.split(" ").slice(0, 2).join(" ")}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mb-4 p-4 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-center">
                    <p className="text-xs text-gray-400 font-bold">No products selected. Click below to add.</p>
                  </div>
                )}

                {savedMsg && (
                  <div className="mb-3 bg-green-50 border border-green-200 text-green-700 text-xs font-bold px-4 py-3 rounded-xl flex items-center gap-2">
                    <Check size={14} /> {savedMsg}
                  </div>
                )}

                <button onClick={handleSave} disabled={saving} style={{ backgroundColor: PURPLE }}
                  className="w-full text-white h-11 rounded-xl font-black text-xs uppercase tracking-widest hover:opacity-90 transition cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2">
                  {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : "Save to Website"}
                </button>
              </div>

              {/* Product picker */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-center gap-3 mb-4">
                  <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..."
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold outline-none focus:ring-2 focus:ring-black" />
                  <span className="text-xs text-gray-400 font-bold shrink-0">{filteredProducts.length}</span>
                </div>
                {loadingProds ? (
                  <div className="flex justify-center py-10"><div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" /></div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-100 overflow-y-auto pr-1">
                    {filteredProducts.map(p => {
                      const selected = isSelected(p._id);
                      return (
                        <div key={p._id} onClick={() => toggleProduct(p)}
                          className={`relative cursor-pointer rounded-xl border-2 overflow-hidden transition-all ${selected ? "border-[#581a90] shadow-lg" : "border-gray-100 hover:border-gray-300"}`}>
                          <img src={p.images?.[0] || "/assets/images/tshirt2.jpeg"} alt={p.name} className="w-full h-24 object-cover" />
                          {selected && (
                            <div className="absolute inset-0 bg-[#581a90]/20 flex items-center justify-center">
                              <div className="w-7 h-7 bg-[#581a90] rounded-full flex items-center justify-center shadow-lg"><Check size={14} className="text-white" /></div>
                            </div>
                          )}
                          <div className="p-2">
                            <p className="text-[10px] font-black uppercase leading-tight truncate">{p.name}</p>
                            <p className="text-[9px] text-gray-400 font-bold mt-0.5">₹{p.price}</p>
                            <p className="text-[9px] text-gray-300 font-bold truncate">{p.animeTag || p.category}</p>
                          </div>
                        </div>
                      );
                    })}
                    {filteredProducts.length === 0 && <div className="col-span-4 py-10 text-center text-xs text-gray-300 font-bold uppercase">No products found</div>}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function SupportPanel() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const fetchMessages = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("veltorn_token");
      const res = await fetch(`${BASE_URL}/support`, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };
  useEffect(() => { fetchMessages(); }, []);
  const handleResolve = async (id) => {
    try { const token = localStorage.getItem("veltorn_token"); await fetch(`${BASE_URL}/support/${id}/resolve`, { method: "PUT", headers: { Authorization: `Bearer ${token}` } }); fetchMessages(); }
    catch (err) { alert("Error: " + err.message); }
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    try { const token = localStorage.getItem("veltorn_token"); await fetch(`${BASE_URL}/support/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }); fetchMessages(); }
    catch (err) { alert("Error: " + err.message); }
  };
  const filtered = filter === "all" ? messages : messages.filter(m => m.status === filter);
  const openCount = messages.filter(m => m.status === "open").length;
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div><h2 className="text-2xl font-black uppercase tracking-tight">Support Messages</h2><p className="text-xs text-gray-400 mt-1">{openCount} open · {messages.length} total</p></div>
        <div className="flex gap-2">{["all","open","resolved"].map(f => (<button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition cursor-pointer ${filter === f ? "bg-[#581a90] text-white" : "bg-white border border-gray-200 text-gray-500 hover:border-gray-400"}`}>{f}</button>))}</div>
      </div>
      {loading ? <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" /></div>
        : filtered.length === 0 ? <div className="bg-white rounded-2xl border border-gray-100 py-16 text-center"><MessageSquare size={32} className="text-gray-200 mx-auto mb-3" /><p className="text-xs font-bold uppercase tracking-widest text-gray-300">No messages</p></div>
        : <div className="space-y-4">{filtered.map((msg) => (
          <div key={msg._id} className={`bg-white rounded-2xl border shadow-sm overflow-hidden ${msg.status === "open" ? "border-[#581a90]/30" : "border-gray-100"}`}>
            <div className="px-6 py-4">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap mb-2">
                    <span className="font-black text-sm">{msg.name}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${msg.status === "open" ? "bg-purple-100 text-purple-700" : "bg-green-100 text-green-700"}`}>{msg.status}</span>
                    <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full uppercase">{msg.subject}</span>
                  </div>
                  <p className="text-xs text-gray-400 mb-3">{msg.email} · {new Date(msg.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
                  <p className="text-sm text-gray-700 font-medium leading-relaxed bg-gray-50 rounded-xl px-4 py-3">{msg.message}</p>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  {msg.status === "open" && (<button onClick={() => handleResolve(msg._id)} className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 text-green-700 rounded-xl text-xs font-black uppercase hover:bg-green-100 transition cursor-pointer"><Check size={12} /> Resolve</button>)}
                  <button onClick={() => handleDelete(msg._id)} className="flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-100 text-red-500 rounded-xl text-xs font-black uppercase hover:bg-red-100 transition cursor-pointer"><Trash size={12} /> Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}</div>}
    </div>
  );
}

function Dashboard({ setActive }) {
  const [data, setData] = useState(null); const [loading, setLoading] = useState(true);
  useEffect(() => { adminAPI.getDashboard().then(setData).catch(console.error).finally(() => setLoading(false)); }, []);
  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" /></div>;
  const stats = [
    { label: "Total Orders", value: data?.totalOrders || 0, icon: ShoppingBag, color: "bg-purple-50 text-purple-600", action: () => setActive("orders") },
    { label: "Total Revenue", value: `₹${(data?.totalRevenue || 0).toLocaleString("en-IN")}`, icon: TrendingUp, color: "bg-green-50 text-green-600" },
    { label: "Products", value: data?.totalProducts || 0, icon: Package, color: "bg-blue-50 text-blue-600", action: () => setActive("products") },
    { label: "Users", value: data?.totalUsers || 0, icon: Users, color: "bg-orange-50 text-orange-600", action: () => setActive("users") },
  ];
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between"><h2 className="text-2xl font-black uppercase tracking-tight">Dashboard</h2><button onClick={() => setActive("add-product")} style={{ backgroundColor: PURPLE }} className="flex items-center gap-2 text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:opacity-90 transition cursor-pointer"><Plus size={14} /> Add Product</button></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map(({ label, value, icon: Icon, color, action }) => (<div key={label} onClick={action} className={`bg-white rounded-2xl p-6 border border-gray-100 shadow-sm ${action ? "cursor-pointer hover:shadow-md transition" : ""}`}><div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color}`}><Icon size={20} /></div><p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{label}</p><p className="text-2xl font-black text-black mt-1">{value}</p></div>))}
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between"><h3 className="font-black text-sm uppercase tracking-widest">Recent Orders</h3><button onClick={() => setActive("orders")} className="text-xs font-bold text-gray-400 hover:text-black cursor-pointer">View all →</button></div>
        <div className="overflow-x-auto"><table className="w-full text-sm"><thead className="bg-gray-50"><tr>{["Order ID","Customer","Total","Status","Date"].map(h => <th key={h} className="px-5 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">{h}</th>)}</tr></thead>
        <tbody className="divide-y divide-gray-50">{(data?.recentOrders || []).map((order) => (<tr key={order._id} className="hover:bg-gray-50"><td className="px-5 py-4 font-bold text-xs">{order.orderId}</td><td className="px-5 py-4 text-xs">{order.user?.name || "Guest"}</td><td className="px-5 py-4 font-bold text-xs">₹{Number(order.total).toLocaleString("en-IN")}</td><td className="px-5 py-4"><StatusBadge status={order.orderStatus} /></td><td className="px-5 py-4 text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString("en-IN")}</td></tr>))}{(!data?.recentOrders || data.recentOrders.length === 0) && (<tr><td colSpan={5} className="px-5 py-10 text-center text-xs text-gray-300 font-bold uppercase tracking-widest">No orders yet</td></tr>)}</tbody></table></div>
      </div>
    </div>
  );
}

function AddProductForm({ product, onSuccess, onCancel }) {
  const [form, setForm] = useState({ name: product?.name || "", price: product?.price || "", description: product?.description || "", category: product?.category || "T-Shirt", animeTag: product?.animeTag || "", sizes: product?.sizes?.join(", ") || "S, M, L, XL, XXL", badge: product?.badge || "NEW", brand: product?.brand || "VELTORN", stock: product?.stock || 100, isActive: product?.isActive !== false });
  const [files, setFiles] = useState([]); const [loading, setLoading] = useState(false); const [error, setError] = useState(""); const [deletingImage, setDeletingImage] = useState(null);
  const [existingImages, setExistingImages] = useState(product ? (product.images || []).map((url, i) => ({ url, fileId: product.imageFileIds?.[i] || null })) : []);
  const showAnimeTag = form.category === "Anime";
  const handleDeleteExistingImage = async (img, index) => {
    if (!product?._id) return;
    if (!img.fileId) { setExistingImages(prev => prev.filter((_, i) => i !== index)); return; }
    setDeletingImage(index);
    try { await productAPI.deleteImage(product._id, img.url, img.fileId); setExistingImages(prev => prev.filter((_, i) => i !== index)); }
    catch (err) { alert("Failed to delete image: " + err.message); } finally { setDeletingImage(null); }
  };
  const handleSubmit = async () => {
    if (!form.name || !form.price || !form.description) { setError("Name, price and description are required"); return; }
    if (!files.length && !product) { setError("Please upload at least one image"); return; }
    setLoading(true); setError("");
    try {
      const fd = new FormData();
      fd.append("name", form.name); fd.append("price", form.price); fd.append("description", form.description); fd.append("category", form.category); fd.append("animeTag", showAnimeTag ? form.animeTag : ""); fd.append("sizes", JSON.stringify(form.sizes.split(",").map(s => s.trim()).filter(Boolean))); fd.append("badge", form.badge); fd.append("brand", form.brand); fd.append("stock", form.stock); fd.append("isActive", form.isActive);
      files.forEach(f => fd.append("images", f));
      if (product) await productAPI.update(product._id, fd); else await productAPI.create(fd);
      onSuccess();
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100"><h2 className="text-xl font-black uppercase tracking-tight">{product ? "Edit Product" : "Add New Product"}</h2>{onCancel && <button onClick={onCancel} className="text-gray-400 hover:text-black transition cursor-pointer"><X size={20} /></button>}</div>
      <div className="p-6 space-y-6">
        {error && <div className="bg-red-50 text-red-500 text-xs font-bold px-4 py-3 rounded-xl border border-red-100">{error}</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2"><label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Product Name *</label><input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Naruto Sage Mode Oversized Tee" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-black" /></div>
          <div><label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Category *</label><select value={form.category} onChange={e => setForm({ ...form, category: e.target.value, animeTag: "" })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold outline-none cursor-pointer">{CATEGORIES.map(c => <option key={c}>{c}</option>)}</select></div>
          {showAnimeTag && (<div><label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Anime Series *</label><select value={form.animeTag} onChange={e => setForm({ ...form, animeTag: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold outline-none cursor-pointer"><option value="">Select anime...</option>{ANIME_TAGS.map(a => <option key={a}>{a}</option>)}</select></div>)}
          <div><label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Price (₹) *</label><input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="999" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-black" /></div>
          <div><label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Brand</label><input type="text" value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-black" /></div>
          <div><label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Stock</label><input type="number" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-black" /></div>
          <div><label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Badge</label><select value={form.badge} onChange={e => setForm({ ...form, badge: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold outline-none cursor-pointer">{BADGES.map(b => <option key={b}>{b}</option>)}</select></div>
          <div><label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Status</label><select value={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.value === "true" })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold outline-none cursor-pointer"><option value="true">Active (Visible)</option><option value="false">Hidden</option></select></div>
          <div className="md:col-span-2"><label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Sizes (comma separated)</label><input type="text" value={form.sizes} onChange={e => setForm({ ...form, sizes: e.target.value })} placeholder="S, M, L, XL, XXL" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-black" /><p className="text-[10px] text-gray-400 mt-1">For accessories: Free Size · For jeans: 28, 30, 32, 34</p></div>
          <div className="md:col-span-2"><label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Description *</label><textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Describe the product..." className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-black h-28 resize-none" /></div>
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Product Images (max 5) {!product && "*"}</label>
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-10 cursor-pointer hover:border-black hover:bg-gray-50 transition"><Upload size={28} className="text-gray-300 mb-3" /><span className="text-sm font-bold text-gray-400">Click to upload new images</span><span className="text-xs text-gray-300 mt-1">JPG, PNG, WEBP · Max 10MB each</span><input type="file" multiple accept="image/*" className="hidden" onChange={e => setFiles(Array.from(e.target.files).slice(0, 5))} /></label>
          {files.length > 0 && (<div className="mt-4"><p className="text-xs text-gray-400 font-bold mb-2 uppercase tracking-widest">New Images:</p><div className="flex gap-3 flex-wrap">{files.map((f, i) => (<div key={i} className="relative group"><img src={URL.createObjectURL(f)} className="w-20 h-20 object-cover rounded-xl border-2 border-[#581a90]" alt="" /><button onClick={() => setFiles(files.filter((_, fi) => fi !== i))} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs cursor-pointer shadow-md hover:bg-red-600 transition"><X size={12} /></button></div>))}</div></div>)}
          {existingImages.length > 0 && (<div className="mt-4"><p className="text-xs text-gray-400 font-bold mb-2 uppercase tracking-widest">Current Images (click × to delete):</p><div className="flex gap-3 flex-wrap">{existingImages.map((img, i) => (<div key={i} className="relative group"><img src={img.url} className="w-20 h-20 object-cover rounded-xl border border-gray-200" alt="" /><button onClick={() => handleDeleteExistingImage(img, i)} disabled={deletingImage === i} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs cursor-pointer shadow-md hover:bg-red-600 transition disabled:opacity-50">{deletingImage === i ? <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" /> : <X size={12} />}</button></div>))}</div></div>)}
        </div>
        <button onClick={handleSubmit} disabled={loading} style={{ backgroundColor: PURPLE }} className="w-full text-white h-14 rounded-xl font-black text-sm uppercase tracking-widest hover:opacity-90 transition cursor-pointer disabled:opacity-50 flex items-center justify-center gap-3">{loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : (product ? "Update Product" : "Upload Product")}</button>
      </div>
    </div>
  );
}

function ProductsPanel({ setActive, setEditProduct }) {
  const [products, setProducts] = useState([]); const [loading, setLoading] = useState(true); const [filterCat, setFilterCat] = useState("");
  const fetchProducts = async () => { setLoading(true); try { const params = { limit: 100 }; if (filterCat) params.category = filterCat; const data = await productAPI.getAll(params); setProducts(data.products || []); } catch (err) { console.error(err); } finally { setLoading(false); } };
  useEffect(() => { fetchProducts(); }, [filterCat]);
  const handleDelete = async (id) => { if (!window.confirm("Delete this product?")) return; try { await productAPI.delete(id); fetchProducts(); } catch (err) { alert("Delete failed: " + err.message); } };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4"><h2 className="text-2xl font-black uppercase tracking-tight">All Products ({products.length})</h2><div className="flex items-center gap-3"><select value={filterCat} onChange={e => setFilterCat(e.target.value)} className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold outline-none cursor-pointer"><option value="">All Categories</option>{CATEGORIES.map(c => <option key={c}>{c}</option>)}</select><button onClick={() => setActive("add-product")} style={{ backgroundColor: PURPLE }} className="flex items-center gap-2 text-white px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:opacity-90 cursor-pointer"><Plus size={14} /> Add New</button></div></div>
      {loading ? <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" /></div> : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"><div className="overflow-x-auto"><table className="w-full text-sm"><thead className="bg-gray-50"><tr>{["Image","Name","Category","Price","Stock","Badge","Status","Actions"].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">{h}</th>)}</tr></thead>
        <tbody className="divide-y divide-gray-50">{products.map((p) => (<tr key={p._id} className="hover:bg-gray-50"><td className="px-4 py-3"><img src={p.images?.[0] || "/assets/images/tshirt2.jpeg"} alt={p.name} className="w-12 h-12 object-cover rounded-lg bg-gray-100" /></td><td className="px-4 py-3 font-bold text-xs max-w-35 truncate">{p.name}</td><td className="px-4 py-3 text-xs text-gray-500">{p.animeTag || p.category}</td><td className="px-4 py-3 font-bold text-xs">₹{p.price}</td><td className="px-4 py-3 text-xs">{p.stock}</td><td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-600 uppercase">{p.badge}</span></td><td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${p.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{p.isActive ? "Active" : "Hidden"}</span></td><td className="px-4 py-3"><div className="flex items-center gap-2"><button onClick={() => { setEditProduct(p); setActive("add-product"); }} className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-black hover:text-white transition cursor-pointer"><Pencil size={12} /></button><button onClick={() => handleDelete(p._id)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-red-500 hover:text-white transition cursor-pointer"><Trash2 size={12} /></button></div></td></tr>))}{products.length === 0 && <tr><td colSpan={8} className="py-12 text-center text-xs text-gray-300 font-bold uppercase tracking-widest">No products found</td></tr>}</tbody></table></div></div>
      )}
    </div>
  );
}

function OrdersPanel() {
  const [orders, setOrders] = useState([]); const [loading, setLoading] = useState(true); const [filterStatus, setFilterStatus] = useState(""); const [expandedOrder, setExpandedOrder] = useState(null);
  const fetchOrders = async () => { setLoading(true); try { const params = filterStatus ? { status: filterStatus } : {}; const data = await adminAPI.getAllOrders(params); setOrders(data.orders || []); } catch (err) { console.error(err); } finally { setLoading(false); } };
  useEffect(() => { fetchOrders(); }, [filterStatus]);
  const handleStatusChange = async (orderId, newStatus) => { try { await adminAPI.updateOrderStatus(orderId, { orderStatus: newStatus }); fetchOrders(); } catch (err) { alert("Update failed: " + err.message); } };
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4"><h2 className="text-2xl font-black uppercase tracking-tight">Orders ({orders.length})</h2><select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold outline-none cursor-pointer"><option value="">All Orders</option>{["placed","confirmed","shipped","out_for_delivery","delivered","cancelled"].map(s => <option key={s} value={s}>{s.replace(/_/g," ")}</option>)}</select></div>
      {loading ? <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" /></div> : (
        <div className="space-y-3">{orders.map((order) => (
          <div key={order._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50 transition" onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}>
              <div className="flex items-center gap-4 flex-wrap"><span className="font-black text-sm">{order.orderId}</span><StatusBadge status={order.orderStatus} /><StatusBadge status={order.paymentStatus} /><span className="text-xs text-gray-400">{order.user?.name || "Guest"}</span><span className="text-xs font-black">₹{Number(order.total).toLocaleString("en-IN")}</span><span className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString("en-IN")}</span></div>
              <div className="flex items-center gap-3"><select value={order.orderStatus} onClick={e => e.stopPropagation()} onChange={e => { e.stopPropagation(); handleStatusChange(order._id, e.target.value); }} className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-bold outline-none cursor-pointer">{["placed","confirmed","shipped","out_for_delivery","delivered","cancelled"].map(s => <option key={s} value={s}>{s.replace(/_/g," ")}</option>)}</select>{expandedOrder === order._id ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}</div>
            </div>
            {expandedOrder === order._id && (<div className="px-5 pb-5 border-t border-gray-50 pt-4 grid grid-cols-1 md:grid-cols-2 gap-6"><div><p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Items Ordered</p><div className="space-y-3">{order.items?.map((item, i) => (<div key={i} className="flex items-center gap-3"><img src={item.img} alt={item.name} className="w-12 h-12 object-cover rounded-lg bg-gray-100" /><div><p className="text-xs font-black uppercase">{item.name}</p><p className="text-[10px] text-gray-400">Size: {item.size} · Qty: {item.quantity} · ₹{item.price}</p></div></div>))}</div></div><div><p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Shipping Address</p><p className="text-sm font-bold">{order.shippingAddress?.fullName}</p><p className="text-xs text-gray-500">{order.shippingAddress?.street}</p><p className="text-xs text-gray-500">{order.shippingAddress?.city} - {order.shippingAddress?.pincode}</p><p className="text-xs text-gray-500 mt-1">📞 {order.shippingAddress?.phone}</p><p className="text-xs text-gray-400 mt-2">Payment: <span className="font-bold text-black">{order.paymentMethod}</span></p></div></div>)}
          </div>
        ))}{orders.length === 0 && <div className="bg-white rounded-2xl border border-gray-100 py-16 text-center"><p className="text-xs font-bold uppercase tracking-widest text-gray-300">No orders found</p></div>}</div>
      )}
    </div>
  );
}

function UsersPanel() {
  const [users, setUsers] = useState([]); const [loading, setLoading] = useState(true);
  useEffect(() => { adminAPI.getAllUsers().then(setUsers).catch(console.error).finally(() => setLoading(false)); }, []);
  return (
    <div className="space-y-6"><h2 className="text-2xl font-black uppercase tracking-tight">Users ({users.length})</h2>
      {loading ? <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" /></div> : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"><div className="overflow-x-auto"><table className="w-full text-sm"><thead className="bg-gray-50"><tr>{["Name","Email","Phone","Joined"].map(h => <th key={h} className="px-5 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">{h}</th>)}</tr></thead>
        <tbody className="divide-y divide-gray-50">{users.map((u) => (<tr key={u._id} className="hover:bg-gray-50"><td className="px-5 py-4 font-bold text-xs">{u.name}</td><td className="px-5 py-4 text-xs text-gray-500">{u.email}</td><td className="px-5 py-4 text-xs text-gray-500">{u.phone || "—"}</td><td className="px-5 py-4 text-xs text-gray-400">{new Date(u.createdAt).toLocaleDateString("en-IN")}</td></tr>))}{users.length === 0 && <tr><td colSpan={4} className="py-10 text-center text-xs text-gray-300 font-bold">No users yet</td></tr>}</tbody></table></div></div>
      )}
    </div>
  );
}

function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [loading, setLoading] = useState(false); const [error, setError] = useState("");
  const handleLogin = async () => {
    if (!email || !password) { setError("Both fields required"); return; }
    setLoading(true); setError("");
    try { const data = await authAPI.login({ email, password }); if (data.user.role !== "admin") { setError("Access denied. Admins only."); return; } localStorage.setItem("veltorn_token", data.token); localStorage.setItem("veltorn_admin", JSON.stringify(data.user)); onLogin(data.user); }
    catch (err) { setError(err.message); } finally { setLoading(false); }
  };
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4"><div className="bg-white rounded-3xl p-10 w-full max-w-md shadow-2xl"><h1 className="text-3xl font-black uppercase tracking-tight mb-1" style={{ color: PURPLE }}>VELTORN</h1><p className="text-xs text-gray-400 uppercase tracking-widest mb-8">Admin Panel — Restricted Access</p>{error && <div className="bg-red-50 text-red-500 text-xs font-bold px-4 py-3 rounded-xl mb-5 border border-red-100">{error}</div>}<div className="space-y-4"><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Admin Email" className="w-full border border-gray-200 rounded-xl px-5 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-black" /><input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" onKeyDown={e => e.key === "Enter" && handleLogin()} className="w-full border border-gray-200 rounded-xl px-5 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-black" /><button onClick={handleLogin} disabled={loading} style={{ backgroundColor: PURPLE }} className="w-full text-white h-14 rounded-xl font-black text-sm uppercase tracking-widest hover:opacity-90 transition cursor-pointer disabled:opacity-50 flex items-center justify-center">{loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : "LOGIN TO ADMIN"}</button></div></div></div>
  );
}

export default function AdminPanel() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [editProduct, setEditProduct] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [admin, setAdmin] = useState(() => { try { return JSON.parse(localStorage.getItem("veltorn_admin")); } catch { return null; } });

  useEffect(() => {
    if (!admin) return;
    const fetchCount = async () => {
      try { const token = localStorage.getItem("veltorn_token"); const res = await fetch(`${BASE_URL}/support`, { headers: { Authorization: `Bearer ${token}` } }); const data = await res.json(); if (Array.isArray(data)) setUnreadCount(data.filter(m => m.status === "open").length); } catch {}
    };
    fetchCount();
    const interval = setInterval(fetchCount, 60000);
    return () => clearInterval(interval);
  }, [admin]);

  const handleLogout = () => { localStorage.removeItem("veltorn_token"); localStorage.removeItem("veltorn_admin"); setAdmin(null); };
  const handleSetActive = (section) => { if (section !== "add-product") setEditProduct(null); setActiveSection(section); if (section === "support") setUnreadCount(0); };

  if (!admin) return <AdminLogin onLogin={setAdmin} />;

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard": return <Dashboard setActive={handleSetActive} />;
      case "main-page": return <MainPageProducts />;
      case "add-product": return <AddProductForm product={editProduct} onSuccess={() => { setEditProduct(null); setActiveSection("products"); }} onCancel={editProduct ? () => { setEditProduct(null); setActiveSection("products"); } : null} />;
      case "products": return <ProductsPanel setActive={handleSetActive} setEditProduct={setEditProduct} />;
      case "orders": return <OrdersPanel />;
      case "users": return <UsersPanel />;
      case "support": return <SupportPanel />;
      default: return <Dashboard setActive={handleSetActive} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-zinc-50">
      <Sidebar active={activeSection} setActive={handleSetActive} onLogout={handleLogout} admin={admin} unreadCount={unreadCount} />
      <main className="flex-1 p-8 overflow-y-auto"><div className="max-w-6xl mx-auto">{renderSection()}</div></main>
    </div>
  );
}