import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Package, ShoppingBag, Users,
  Plus, Pencil, Trash2, X, LogOut, Upload, TrendingUp, Eye,
  ChevronDown, ChevronUp,
} from "lucide-react";
import { adminAPI, productAPI, authAPI } from "../../services/api";

const PURPLE = "#581a90";

const CATEGORIES = ["T-Shirt", "Shirt", "Jeans", "Cap", "Accessories", "Anime"];
const ANIME_TAGS = ["Naruto", "Solo Leveling", "Demon Slayer", "One Piece"];
const BADGES = ["NEW", "LIMITED", "SPECIAL"];

// ─── Status Badge ─────────────────────────────────────────────
function StatusBadge({ status }) {
  const colors = {
    placed: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-blue-100 text-blue-700",
    shipped: "bg-purple-100 text-purple-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
    pending: "bg-gray-100 text-gray-600",
    paid: "bg-green-100 text-green-700",
    failed: "bg-red-100 text-red-700",
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${colors[status] || "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────
function Sidebar({ active, setActive, onLogout, admin }) {
  const items = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "add-product", label: "Add Product", icon: Plus },
    { id: "products", label: "All Products", icon: Package },
    { id: "orders", label: "Orders", icon: ShoppingBag },
    { id: "users", label: "Users", icon: Users },
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
        {items.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setActive(id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wide transition-all cursor-pointer ${active === id ? "bg-[#581a90] text-white" : "text-gray-400 hover:bg-gray-900 hover:text-white"}`}>
            <Icon size={16} /> {label}
          </button>
        ))}
      </nav>
      <div className="px-4 py-6 border-t border-gray-800">
        <button onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-400 hover:bg-red-900/20 transition cursor-pointer">
          <LogOut size={16} /> Logout
        </button>
      </div>
    </aside>
  );
}

// ─── Dashboard ────────────────────────────────────────────────
function Dashboard({ setActive }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminAPI.getDashboard().then(setData).catch(console.error).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" /></div>;

  const stats = [
    { label: "Total Orders", value: data?.totalOrders || 0, icon: ShoppingBag, color: "bg-purple-50 text-purple-600", action: () => setActive("orders") },
    { label: "Total Revenue", value: `₹${(data?.totalRevenue || 0).toLocaleString("en-IN")}`, icon: TrendingUp, color: "bg-green-50 text-green-600" },
    { label: "Products", value: data?.totalProducts || 0, icon: Package, color: "bg-blue-50 text-blue-600", action: () => setActive("products") },
    { label: "Users", value: data?.totalUsers || 0, icon: Users, color: "bg-orange-50 text-orange-600", action: () => setActive("users") },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black uppercase tracking-tight">Dashboard</h2>
        <button onClick={() => setActive("add-product")} style={{ backgroundColor: PURPLE }}
          className="flex items-center gap-2 text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:opacity-90 transition cursor-pointer">
          <Plus size={14} /> Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map(({ label, value, icon: Icon, color, action }) => (
          <div key={label} onClick={action}
            className={`bg-white rounded-2xl p-6 border border-gray-100 shadow-sm ${action ? "cursor-pointer hover:shadow-md transition" : ""}`}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color}`}>
              <Icon size={20} />
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{label}</p>
            <p className="text-2xl font-black text-black mt-1">{value}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-black text-sm uppercase tracking-widest">Recent Orders</h3>
          <button onClick={() => setActive("orders")} className="text-xs font-bold text-gray-400 hover:text-black cursor-pointer">View all →</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>{["Order ID", "Customer", "Total", "Status", "Date"].map(h => (
                <th key={h} className="px-5 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {(data?.recentOrders || []).map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-5 py-4 font-bold text-xs">{order.orderId}</td>
                  <td className="px-5 py-4 text-xs">{order.user?.name || "Guest"}</td>
                  <td className="px-5 py-4 font-bold text-xs">₹{order.total?.toLocaleString("en-IN")}</td>
                  <td className="px-5 py-4"><StatusBadge status={order.orderStatus} /></td>
                  <td className="px-5 py-4 text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString("en-IN")}</td>
                </tr>
              ))}
              {(!data?.recentOrders || data.recentOrders.length === 0) && (
                <tr><td colSpan={5} className="px-5 py-10 text-center text-xs text-gray-300 font-bold uppercase tracking-widest">No orders yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Add Product Form ─────────────────────────────────────────
function AddProductForm({ product, onSuccess, onCancel }) {
  const [form, setForm] = useState({
    name: product?.name || "",
    price: product?.price || "",
    description: product?.description || "",
    category: product?.category || "T-Shirt",
    animeTag: product?.animeTag || "",
    sizes: product?.sizes?.join(", ") || "S, M, L, XL, XXL",
    badge: product?.badge || "NEW",
    brand: product?.brand || "VELTORN",
    stock: product?.stock || 100,
    isActive: product?.isActive !== false,
  });
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // When category is "Anime", show anime tag selector
  const showAnimeTag = form.category === "Anime";

  const handleSubmit = async () => {
    if (!form.name || !form.price || !form.description) {
      setError("Name, price and description are required"); return;
    }
    if (!files.length && !product) {
      setError("Please upload at least one image"); return;
    }
    setLoading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("price", form.price);
      fd.append("description", form.description);
      fd.append("category", form.category);
      fd.append("animeTag", showAnimeTag ? form.animeTag : "");
      fd.append("sizes", JSON.stringify(form.sizes.split(",").map(s => s.trim()).filter(Boolean)));
      fd.append("badge", form.badge);
      fd.append("brand", form.brand);
      fd.append("stock", form.stock);
      fd.append("isActive", form.isActive);
      files.forEach(f => fd.append("images", f));

      if (product) await productAPI.update(product._id, fd);
      else await productAPI.create(fd);

      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
        <h2 className="text-xl font-black uppercase tracking-tight">{product ? "Edit Product" : "Add New Product"}</h2>
        {onCancel && <button onClick={onCancel} className="text-gray-400 hover:text-black transition cursor-pointer"><X size={20} /></button>}
      </div>

      <div className="p-6 space-y-6">
        {error && <div className="bg-red-50 text-red-500 text-xs font-bold px-4 py-3 rounded-xl border border-red-100">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Name */}
          <div className="md:col-span-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Product Name *</label>
            <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Naruto Sage Mode Oversized Tee"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-black" />
          </div>

          {/* Category */}
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Category *</label>
            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value, animeTag: "" })}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold outline-none cursor-pointer">
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          {/* Anime Tag — only when Anime category */}
          {showAnimeTag && (
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Anime Series *</label>
              <select value={form.animeTag} onChange={e => setForm({ ...form, animeTag: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold outline-none cursor-pointer">
                <option value="">Select anime...</option>
                {ANIME_TAGS.map(a => <option key={a}>{a}</option>)}
              </select>
            </div>
          )}

          {/* Price */}
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Price (₹) *</label>
            <input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })}
              placeholder="999"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-black" />
          </div>

          {/* Brand */}
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Brand</label>
            <input type="text" value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-black" />
          </div>

          {/* Stock */}
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Stock</label>
            <input type="number" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-black" />
          </div>

          {/* Badge */}
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Badge</label>
            <select value={form.badge} onChange={e => setForm({ ...form, badge: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold outline-none cursor-pointer">
              {BADGES.map(b => <option key={b}>{b}</option>)}
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Status</label>
            <select value={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.value === "true" })}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold outline-none cursor-pointer">
              <option value="true">Active (Visible)</option>
              <option value="false">Hidden</option>
            </select>
          </div>

          {/* Sizes */}
          <div className="md:col-span-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Sizes (comma separated)</label>
            <input type="text" value={form.sizes} onChange={e => setForm({ ...form, sizes: e.target.value })}
              placeholder="S, M, L, XL, XXL"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-black" />
            <p className="text-[10px] text-gray-400 mt-1">For accessories: Free Size · For jeans: 28, 30, 32, 34</p>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Description *</label>
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
              placeholder="Describe the product — material, fit, design inspiration..."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-black h-28 resize-none" />
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">
            Product Images (max 5) {!product && "*"}
          </label>
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-10 cursor-pointer hover:border-black hover:bg-gray-50 transition">
            <Upload size={28} className="text-gray-300 mb-3" />
            <span className="text-sm font-bold text-gray-400">Click to upload images</span>
            <span className="text-xs text-gray-300 mt-1">JPG, PNG, WEBP · Max 5MB each</span>
            <input type="file" multiple accept="image/*" className="hidden"
              onChange={e => setFiles(Array.from(e.target.files).slice(0, 5))} />
          </label>

          {files.length > 0 && (
            <div className="flex gap-3 mt-4 flex-wrap">
              {files.map((f, i) => (
                <div key={i} className="relative group">
                  <img src={URL.createObjectURL(f)} className="w-20 h-20 object-cover rounded-xl border border-gray-200" alt="" />
                  <button onClick={() => setFiles(files.filter((_, fi) => fi !== i))}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs cursor-pointer opacity-0 group-hover:opacity-100 transition">
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Existing images (edit mode) */}
          {product?.images?.length > 0 && (
            <div className="mt-3">
              <p className="text-xs text-gray-400 font-bold mb-2 uppercase tracking-widest">Current Images:</p>
              <div className="flex gap-3 flex-wrap">
                {product.images.map((url, i) => (
                  <img key={i} src={url} className="w-20 h-20 object-cover rounded-xl border border-gray-200" alt="" />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Submit */}
        <button onClick={handleSubmit} disabled={loading} style={{ backgroundColor: PURPLE }}
          className="w-full text-white h-14 rounded-xl font-black text-sm uppercase tracking-widest hover:opacity-90 transition cursor-pointer disabled:opacity-50 flex items-center justify-center gap-3">
          {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : (product ? "Update Product" : "Upload Product")}
        </button>
      </div>
    </div>
  );
}

// ─── All Products Panel ───────────────────────────────────────
function ProductsPanel({ setActive, setEditProduct }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCat, setFilterCat] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = { limit: 100 };
      if (filterCat) params.category = filterCat;
      const data = await productAPI.getAll(params);
      setProducts(data.products || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchProducts(); }, [filterCat]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product? This cannot be undone.")) return;
    try { await productAPI.delete(id); fetchProducts(); }
    catch (err) { alert("Delete failed: " + err.message); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-2xl font-black uppercase tracking-tight">All Products ({products.length})</h2>
        <div className="flex items-center gap-3">
          <select value={filterCat} onChange={e => setFilterCat(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold outline-none cursor-pointer">
            <option value="">All Categories</option>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
          <button onClick={() => setActive("add-product")} style={{ backgroundColor: PURPLE }}
            className="flex items-center gap-2 text-white px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:opacity-90 cursor-pointer">
            <Plus size={14} /> Add New
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>{["Image", "Name", "Category", "Price", "Stock", "Badge", "Status", "Actions"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">{h}</th>
                ))}</tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {products.map((p) => (
                  <tr key={p._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <img src={p.images?.[0] || "/assets/images/tshirt2.jpeg"} alt={p.name}
                        className="w-12 h-12 object-cover rounded-lg bg-gray-100" />
                    </td>
                    <td className="px-4 py-3 font-bold text-xs max-w-35 truncate">{p.name}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{p.animeTag || p.category}</td>
                    <td className="px-4 py-3 font-bold text-xs">₹{p.price}</td>
                    <td className="px-4 py-3 text-xs">{p.stock}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-600 uppercase">{p.badge}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${p.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {p.isActive ? "Active" : "Hidden"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => { setEditProduct(p); setActive("add-product"); }}
                          className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-black hover:text-white transition cursor-pointer">
                          <Pencil size={12} />
                        </button>
                        <button onClick={() => handleDelete(p._id)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-red-500 hover:text-white transition cursor-pointer">
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr><td colSpan={8} className="py-12 text-center text-xs text-gray-300 font-bold uppercase tracking-widest">No products found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Orders Panel ─────────────────────────────────────────────
function OrdersPanel() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("");
  const [expandedOrder, setExpandedOrder] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const params = filterStatus ? { status: filterStatus } : {};
      const data = await adminAPI.getAllOrders(params);
      setOrders(data.orders || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchOrders(); }, [filterStatus]);

  const handleStatusChange = async (orderId, newStatus) => {
    try { await adminAPI.updateOrderStatus(orderId, { orderStatus: newStatus }); fetchOrders(); }
    catch (err) { alert("Update failed: " + err.message); }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h2 className="text-2xl font-black uppercase tracking-tight">Orders ({orders.length})</h2>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold outline-none cursor-pointer">
          <option value="">All Orders</option>
          {["placed", "confirmed", "shipped", "delivered", "cancelled"].map(s => (
            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {/* Summary row */}
              <div className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50 transition"
                onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}>
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="font-black text-sm">{order.orderId}</span>
                  <StatusBadge status={order.orderStatus} />
                  <StatusBadge status={order.paymentStatus} />
                  <span className="text-xs text-gray-400">{order.user?.name || "Guest"}</span>
                  <span className="text-xs font-black">₹{order.total?.toLocaleString("en-IN")}</span>
                  <span className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString("en-IN")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <select value={order.orderStatus}
                    onClick={e => e.stopPropagation()}
                    onChange={e => { e.stopPropagation(); handleStatusChange(order._id, e.target.value); }}
                    className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-bold outline-none cursor-pointer">
                    {["placed", "confirmed", "shipped", "delivered", "cancelled"].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {expandedOrder === order._id ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                </div>
              </div>

              {/* Expanded details */}
              {expandedOrder === order._id && (
                <div className="px-5 pb-5 border-t border-gray-50 pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Items */}
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Items Ordered</p>
                    <div className="space-y-3">
                      {order.items?.map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <img src={item.img} alt={item.name} className="w-12 h-12 object-cover rounded-lg bg-gray-100" />
                          <div>
                            <p className="text-xs font-black uppercase">{item.name}</p>
                            <p className="text-[10px] text-gray-400">Size: {item.size} · Qty: {item.quantity} · ₹{item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping */}
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Shipping Address</p>
                    <p className="text-sm font-bold">{order.shippingAddress?.fullName}</p>
                    <p className="text-xs text-gray-500">{order.shippingAddress?.street}</p>
                    <p className="text-xs text-gray-500">{order.shippingAddress?.city} - {order.shippingAddress?.pincode}</p>
                    <p className="text-xs text-gray-500 mt-1">📞 {order.shippingAddress?.phone}</p>
                    <p className="text-xs text-gray-400 mt-2">Payment: <span className="font-bold text-black">{order.paymentMethod}</span></p>
                  </div>
                </div>
              )}
            </div>
          ))}
          {orders.length === 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 py-16 text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-300">No orders found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Users Panel ──────────────────────────────────────────────
function UsersPanel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminAPI.getAllUsers().then(setUsers).catch(console.error).finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black uppercase tracking-tight">Users ({users.length})</h2>
      {loading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>{["Name", "Email", "Phone", "Joined"].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">{h}</th>
                ))}</tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-gray-50">
                    <td className="px-5 py-4 font-bold text-xs">{u.name}</td>
                    <td className="px-5 py-4 text-xs text-gray-500">{u.email}</td>
                    <td className="px-5 py-4 text-xs text-gray-500">{u.phone || "—"}</td>
                    <td className="px-5 py-4 text-xs text-gray-400">{new Date(u.createdAt).toLocaleDateString("en-IN")}</td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr><td colSpan={4} className="py-10 text-center text-xs text-gray-300 font-bold">No users yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Admin Login ──────────────────────────────────────────────
function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) { setError("Both fields required"); return; }
    setLoading(true); setError("");
    try {
      const data = await authAPI.login({ email, password });
      if (data.user.role !== "admin") { setError("Access denied. Admins only."); return; }
      localStorage.setItem("veltorn_token", data.token);
      localStorage.setItem("veltorn_admin", JSON.stringify(data.user));
      onLogin(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl p-10 w-full max-w-md shadow-2xl">
        <h1 className="text-3xl font-black uppercase tracking-tight mb-1" style={{ color: PURPLE }}>VELTORN</h1>
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-8">Admin Panel — Restricted Access</p>

        {error && <div className="bg-red-50 text-red-500 text-xs font-bold px-4 py-3 rounded-xl mb-5 border border-red-100">{error}</div>}

        <div className="space-y-4">
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Admin Email"
            className="w-full border border-gray-200 rounded-xl px-5 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-black" />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            className="w-full border border-gray-200 rounded-xl px-5 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-black" />
          <button onClick={handleLogin} disabled={loading} style={{ backgroundColor: PURPLE }}
            className="w-full text-white h-14 rounded-xl font-black text-sm uppercase tracking-widest hover:opacity-90 transition cursor-pointer disabled:opacity-50 flex items-center justify-center">
            {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : "LOGIN TO ADMIN"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN ADMIN PAGE ──────────────────────────────────────────
export default function AdminPanel() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [editProduct, setEditProduct] = useState(null);
  const [admin, setAdmin] = useState(() => {
    try { return JSON.parse(localStorage.getItem("veltorn_admin")); }
    catch { return null; }
  });

  const handleLogout = () => {
    localStorage.removeItem("veltorn_token");
    localStorage.removeItem("veltorn_admin");
    setAdmin(null);
  };

  const handleSetActive = (section) => {
    if (section !== "add-product") setEditProduct(null);
    setActiveSection(section);
  };

  if (!admin) return <AdminLogin onLogin={setAdmin} />;

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard": return <Dashboard setActive={handleSetActive} />;
      case "add-product": return (
        <AddProductForm
          product={editProduct}
          onSuccess={() => { setEditProduct(null); setActiveSection("products"); }}
          onCancel={editProduct ? () => { setEditProduct(null); setActiveSection("products"); } : null}
        />
      );
      case "products": return <ProductsPanel setActive={handleSetActive} setEditProduct={setEditProduct} />;
      case "orders": return <OrdersPanel />;
      case "users": return <UsersPanel />;
      default: return <Dashboard setActive={handleSetActive} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-zinc-50">
      <Sidebar active={activeSection} setActive={handleSetActive} onLogout={handleLogout} admin={admin} />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">{renderSection()}</div>
      </main>
    </div>
  );
}