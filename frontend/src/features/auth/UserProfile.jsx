import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Camera, User, MapPin, Phone, Mail, ChevronRight, Package, LogOut, ArrowLeft, Save, CheckCircle } from "lucide-react";

export default function UserProfile() {
  const { user, logout, isLoggedIn, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [street, setStreet] = useState(user?.address?.street || "");
  const [city, setCity] = useState(user?.address?.city || "");
  const [pincode, setPincode] = useState(user?.address?.pincode || "");
  const [avatarPreview, setAvatarPreview] = useState(user?.avatarUrl || null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef();

  if (!isLoggedIn) { navigate("/"); return null; }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // Convert to base64 for storage (simple approach without cloudinary for avatar)
    const reader = new FileReader();
    reader.onload = (ev) => setAvatarPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      const result = await updateProfile({
        name,
        phone,
        street,
        city,
        pincode,
        avatarUrl: avatarPreview || "",
      });

      if (result.success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const initials = name
    ? name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  return (
    <div className="min-h-screen bg-zinc-50 pt-28 pb-20 px-4 md:px-12">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition mb-8 cursor-pointer">
        <ArrowLeft size={14} /> Back
      </button>

      <div className="max-w-xl mx-auto space-y-5">

        {/* Avatar + Name header */}
        <div className="bg-white rounded-3xl p-7 border border-gray-100 shadow-sm flex items-center gap-5">
          <div className="relative shrink-0">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-[#581a90] flex items-center justify-center border-4 border-white shadow-lg">
              {avatarPreview ? (
                <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-2xl font-black text-white">{initials}</span>
              )}
            </div>
            <button onClick={() => fileRef.current.click()}
              className="absolute -bottom-1 -right-1 w-7 h-7 bg-black text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-[#581a90] transition">
              <Camera size={12} />
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
          </div>
          <div>
            <h2 className="text-xl font-black uppercase tracking-tight">{user?.name}</h2>
            <p className="text-xs text-gray-400 mt-1">{user?.email}</p>
            <span className={`inline-block mt-2 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest ${user?.role === "admin" ? "bg-purple-100 text-purple-700" : "bg-green-100 text-green-700"}`}>
              {user?.role === "admin" ? "Admin" : "Member"}
            </span>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-500 text-xs font-bold px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        {/* Personal Info */}
        <div className="bg-white rounded-3xl p-7 border border-gray-100 shadow-sm space-y-5">
          <h3 className="font-black text-xs uppercase tracking-widest text-gray-400">Personal Info</h3>

          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5 block">Full Name</label>
            <div className="relative">
              <User size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
              <input type="text" value={name} onChange={e => setName(e.target.value)}
                className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3.5 text-sm font-bold outline-none focus:ring-2 focus:ring-black transition" />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5 block">Phone</label>
            <div className="relative">
              <Phone size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                placeholder="10-digit mobile number"
                className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3.5 text-sm font-bold outline-none focus:ring-2 focus:ring-black transition" />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5 block">Email</label>
            <div className="relative">
              <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
              <input type="email" value={user?.email} disabled
                className="w-full border border-gray-100 rounded-xl pl-10 pr-4 py-3.5 text-sm font-bold outline-none bg-gray-50 text-gray-400 cursor-not-allowed" />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="bg-white rounded-3xl p-7 border border-gray-100 shadow-sm space-y-5">
          <h3 className="font-black text-xs uppercase tracking-widest text-gray-400 flex items-center gap-2">
            <MapPin size={12} /> Delivery Address
          </h3>
          <textarea value={street} onChange={e => setStreet(e.target.value)}
            placeholder="House No, Street, Landmark"
            className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-bold outline-none focus:ring-2 focus:ring-black transition h-20 resize-none" />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5 block">City</label>
              <input value={city} onChange={e => setCity(e.target.value)} placeholder="City"
                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-bold outline-none focus:ring-2 focus:ring-black transition" />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5 block">Pincode</label>
              <input value={pincode} onChange={e => setPincode(e.target.value)} placeholder="Pincode"
                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-bold outline-none focus:ring-2 focus:ring-black transition" />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button onClick={handleSave} disabled={saving}
          className={`w-full h-14 rounded-2xl font-black text-sm uppercase tracking-widest transition cursor-pointer flex items-center justify-center gap-2 ${saved ? "bg-green-500 text-white" : "bg-black text-white hover:bg-zinc-800"} disabled:opacity-50`}>
          {saving ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : saved ? (
            <><CheckCircle size={16} /> Saved!</>
          ) : (
            <><Save size={16} /> Save Changes</>
          )}
        </button>

        {/* My Orders */}
        <button onClick={() => navigate("/my-orders")}
          className="w-full bg-white border border-gray-200 text-black h-14 rounded-2xl font-black text-sm uppercase tracking-widest hover:border-black transition cursor-pointer flex items-center justify-between px-6">
          <div className="flex items-center gap-3"><Package size={16} /> My Orders</div>
          <ChevronRight size={16} className="text-gray-400" />
        </button>

        {/* Logout */}
        <button onClick={handleLogout}
          className="w-full bg-red-50 text-red-500 border border-red-100 h-14 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-red-100 transition cursor-pointer flex items-center justify-center gap-2">
          <LogOut size={16} /> Logout
        </button>
      </div>
    </div>
  );
}