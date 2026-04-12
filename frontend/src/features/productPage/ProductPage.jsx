import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, ChevronRight, Ruler, Search, Globe, User, ShoppingBag, X } from "lucide-react";


import { useCart } from "../cart/CartContext";   /* add to cart neeche se agar hataya toh isko bhi hatao */
 
const PURPLE = "#581a90";
 
// ===================== ACCORDION =====================
function AccordionItem({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 py-3">
      <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center">
        <span style={{ color: PURPLE }} className="font-bold text-sm uppercase tracking-wide">{title}</span>
        <span
          style={{ color: PURPLE }}
          className="text-2xl font-bold leading-none w-8 h-8 flex items-center justify-center select-none"
        >
          {open ? "×" : "+"}
        </span>
      </button>
      {open && (
        <div className="mt-3 text-sm leading-relaxed animate-in fade-in slide-in-from-top-2 duration-200">
          {children}
        </div>
      )}
    </div>
  );
}
 
// ===================== SIZE GUIDE MODAL =====================
function SizeGuideModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-200 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-500 hover:text-white text-2xl font-black leading-none transition cursor-pointer select-none"
        >
            <X size={16} />
        </button>
        <h3 className="font-black text-lg uppercase tracking-widest mb-5" style={{ color: PURPLE }}>
          Size Guide
        </h3>
        <table className="w-full text-sm text-center border-collapse">
          <thead>
            <tr style={{ backgroundColor: PURPLE }} className="text-white">
              <th className="py-2 px-3 rounded-tl-lg font-bold">Size</th>
              <th className="py-2 px-3 font-bold">Chest (in)</th>
              <th className="py-2 px-3 font-bold">Length (in)</th>
              <th className="py-2 px-3 rounded-tr-lg font-bold">Shoulder (in)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["S", "36–38", "27", "17"],
              ["M", "38–40", "28", "18"],
              ["L", "40–42", "29", "19"],
              ["XL", "42–44", "30", "20"],
              ["XXL", "44–46", "31", "21"],
            ].map(([size, chest, len, shoulder], i) => (
              <tr key={size} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="py-2 px-3 font-bold">{size}</td>
                <td className="py-2 px-3">{chest}</td>
                <td className="py-2 px-3">{len}</td>
                <td className="py-2 px-3">{shoulder}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-xs text-gray-400 mt-4 text-center">Measurements are approximate.</p>
      </div>
    </div>
  );
}
 
// ===================== PRODUCT DESCRIPTIONS =====================
const getDescription = (product) => {
  const name = product?.name?.toLowerCase() || "";
  const collection = product?.collection?.toLowerCase() || "";
  if (name.includes("naruto") || collection.includes("naruto"))
    return "Channel the power of the Hidden Leaf with this exclusive Naruto oversized tee. Featuring iconic Sage Mode artwork, this piece is a tribute to one of the greatest ninja stories ever told. 100% breathable cotton, perfect for fans who carry the will of fire.";
  if (name.includes("solo leveling") || collection.includes("solo leveling") || name.includes("shadow"))
    return "Rise from the weakest to the strongest. This Solo Leveling edition tee captures the dark intensity of Sung Jinwoo's journey. Premium heavyweight cotton with a striking shadow monarch graphic — wear the power of the S-Rank Hunter.";
  if (name.includes("demon slayer") || collection.includes("demon slayer") || name.includes("giyu") || name.includes("tanjiro"))
    return "Total Concentration — every thread. This Demon Slayer series tee is crafted for those who breathe with purpose. Bold print inspired by the Water Breathing forms, made from 100% pre-washed cotton for a soft oversized fit worthy of a Hashira.";
  if (name.includes("one piece") || collection.includes("one piece") || name.includes("luffy"))
    return "Set sail for the Grand Line in this One Piece edition tee. Featuring Luffy's Gear 5 transformation artwork, this piece embodies the spirit of freedom and adventure. Made from premium cotton — because the King of Pirates deserves nothing less.";
  if (name.includes("shirt"))
    return "A clean, structured premium shirt with a modern relaxed fit. Crafted from soft-woven cotton fabric with reinforced stitching for durability. Whether you're heading out or staying in — this shirt does both effortlessly.";
  if (name.includes("jeans") || name.includes("denim"))
    return "Premium denim crafted for the modern streetwear aesthetic. Slightly distressed, mid-rise fit with reinforced knees and a tapered leg. Fade-resistant fabric that gets better with every wash — built to last, built to move.";
  if (name.includes("cap"))
    return "A clean structured cap to top off any fit. Adjustable snapback closure, breathable panels, and an embroidered VELTORN logo. One size fits all — no bad hair days, just good fits.";
  if (name.includes("accessory") || name.includes("accessori"))
    return "A carefully designed VELTORN accessory to complete your look. Premium materials, precision finish, and a design language that speaks without words. Small detail, big statement.";
  return "A premium piece from the VELTORN collection — designed for those who refuse to blend in. Made from high-quality materials with an attention to detail that sets it apart. Wear it loud, wear it proud.";
};
 
// ===================== MAIN PRODUCT PAGE =====================
export default function ProductPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
 
  const { addToCart, setIsCartOpen } = useCart(); 

  const product = state?.product || {
    id: "demo",
    name: "Giyu Tomioka Oversized Tee",
    price: "999",
    img: "/assets/images/tshirt11.png",
    collection: "DEMON SLAYER SERIES",
    badge: "NEW",
    sizes: ["S", "M", "L", "XL", "XXL"],
    brand: "VELTORN",
  };
 
  const variantImages = [product.img, product.img, product.img, product.img];
  const description = getDescription(product);
 
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
 
  // const handleAddToCart = () => {
  //   if (!selectedSize) {
  //     alert("Please select a size first!");
  //     return;
  //   }
    
  //   setAddedToCart(true);
  //   setTimeout(() => setAddedToCart(false), 2500);
  // };



// add to cart hatqane ke liye isko hatakar uper wala rehnde do ---------------------------------------------------------------------------
const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size first!");
      return;
    }

    // Actual cart context function call
    addToCart(product, selectedSize, quantity);
    
    setAddedToCart(true);
    // 1 second baad drawer khol do
    setTimeout(() => {
      setAddedToCart(false);
      setIsCartOpen(true);
    }, 1000);
  };
// ----------------------------------------------------------------------------------------


 
  return (
    <div className="min-h-screen bg-white mt-7">
      {/* Size Guide Modal */}
      {showSizeGuide && <SizeGuideModal onClose={() => setShowSizeGuide(false)} />}
 
      {/* Toast */}
      {addedToCart && (
        <div className="fixed top-6 right-6 z-150 bg-white border border-gray-200 rounded-xl px-5 py-3 shadow-2xl animate-in slide-in-from-right-4 duration-300">
          <p className="text-sm font-bold">✅ Added to cart!</p>
        </div>
      )}
 
      {/* Content */}
      <div className="pt-36 pb-4 px-4 md:px-12">
 
        {/* BREADCRUMB */}
        <div className="flex items-center gap-1 mb-8 text-xs flex-wrap">
          <div onClick={() => navigate("/")} className="p-2 bg-gray-100 text-gray-400 rounded-md cursor-pointer hover:bg-black hover:text-white transition">
            <Home size={14} />
          </div>
          <ChevronRight size={12} className="text-gray-300" />
          <div
            onClick={() => navigate(-1)}
            className="px-3 py-2 rounded-md cursor-pointer font-bold uppercase tracking-tighter transition bg-gray-100 text-gray-400 hover:bg-black hover:text-white"
          >
            {product.collection || "Shop All"}
          </div>
          <ChevronRight size={12} className="text-gray-300" />
          <span className="px-3 py-2 bg-gray-100 rounded-md font-bold uppercase tracking-widest text-black truncate max-w-40 sm:max-w-xs">
            {product.name}
          </span>
        </div>
 
        {/* MAIN LAYOUT */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
 
          {/* ===== LEFT: MAIN IMAGE ===== */}
          <div className="w-full lg:w-[55%]">
            <div className="w-full bg-gray-50 rounded-2xl overflow-hidden aspect-square flex items-center justify-center border border-gray-100">
              <img
                src={variantImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-500"
              />
            </div>
          </div>
 
          {/* ===== RIGHT: DETAILS ===== */}
          <div className="w-full lg:w-[45%] flex flex-col gap-5 lg:pt-4">
 
            {/* Product Name */}
            <h1 style={{ color: PURPLE }} className="text-2xl sm:text-3xl md:text-4xl font-black uppercase leading-tight tracking-tight mb-3">
              {product.name}
            </h1>
 
            {/* Price — RIGHT aligned */}
            <div className="flex items-baseline justify-end gap-2">
              <span style={{ color: PURPLE }} className="text-2xl font-black">₹{product.price}</span>
              <span style={{ color: PURPLE }} className="text-2xl font-black">INR</span>
            </div>
 
            {/* Description */}
            <p className="text-sm text-black leading-relaxed">{description}</p>
 
            {/* Accordions */}
            <div className="mt-1">
              <AccordionItem title="Delivery">
                <ul className="space-y-1.5">
                  <li><span style={{ color: PURPLE }} className="font-bold">Free Shipping</span> <span className="text-black">on orders above ₹999 within India.</span></li>
                  <li><span style={{ color: PURPLE }} className="font-bold">Standard Delivery:</span> <span className="text-black">5–7 business days.</span></li>
                  <li><span style={{ color: PURPLE }} className="font-bold">Express Delivery:</span> <span className="text-black">2–3 business days (charges apply).</span></li>
                  <li><span style={{ color: PURPLE }} className="font-bold">COD Available:</span> <span className="text-black">Cash on delivery pan-India.</span></li>
                </ul>
              </AccordionItem>
              <AccordionItem title="Payment">
                <ul className="space-y-1.5">
                  <li><span style={{ color: PURPLE }} className="font-bold">Accepted:</span> <span className="text-black">UPI, Credit/Debit Cards, Net Banking, Wallets.</span></li>
                  <li><span style={{ color: PURPLE }} className="font-bold">EMI Available:</span> <span className="text-black">No-cost EMI on orders above ₹1999.</span></li>
                  <li><span style={{ color: PURPLE }} className="font-bold">Secure Checkout:</span> <span className="text-black">256-bit SSL encrypted.</span></li>
                </ul>
              </AccordionItem>
              <AccordionItem title="Care">
                <ul className="space-y-1.5">
                  <li><span style={{ color: PURPLE }} className="font-bold">Wash:</span> <span className="text-black">Machine wash cold (30°C), inside out.</span></li>
                  <li><span style={{ color: PURPLE }} className="font-bold">Dry:</span> <span className="text-black">Hang dry in shade. No tumble dry.</span></li>
                  <li><span style={{ color: PURPLE }} className="font-bold">Iron:</span> <span className="text-black">Low heat. Do not iron on print.</span></li>
                  <li><span style={{ color: PURPLE }} className="font-bold">Bleach:</span> <span className="text-black">Do not bleach.</span></li>
                </ul>
              </AccordionItem>
            </div>
 
            {/* Size Selector */}
            <div>
              <div className="flex items-center justify-between mb-3 mt-5">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Select Size</span>
                {/* SIZE GUIDE with ruler + cross icon */}
                <button
                  onClick={() => setShowSizeGuide(true)}
                  className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-black transition cursor-pointer"
                >
                  <Ruler size={12} />
                  SIZE GUIDE
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {(product.sizes || ["S", "M", "L", "XL", "XXL"]).map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`w-12 h-12 rounded-lg border-2 text-xs font-black uppercase transition-all duration-200 cursor-pointer ${
                      selectedSize === sz
                        ? "border-[#581a90] bg-[#581a90] text-white"
                        : "border-gray-200 bg-white text-gray-500 hover:border-[#581a90] hover:bg-[#581a90] hover:text-white"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
              {!selectedSize && (
                <p className="text-xs text-red-400 font-semibold mt-2">* Please select a size</p>
              )}
            </div>
 
            {/* Variant Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {variantImages.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-200 ${
                    selectedImage === i ? "border-[#581a90] shadow-md" : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
 
            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-3 mt-2">
              {/* Quantity — using innerHTML style to guarantee − shows */}
              <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  style={{ fontFamily: "Arial, sans-serif", fontSize: "20px", fontWeight: "900", color: "#000" }}
                  className="w-11 h-12 flex items-center justify-center hover:bg-gray-100 transition cursor-pointer border-r border-gray-200"
                >
                  &#8722;
                </button>
                <span className="w-10 h-12 flex items-center justify-center text-sm font-black text-black">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  style={{ fontFamily: "Arial, sans-serif", fontSize: "20px", fontWeight: "900", color: "#000" }}
                  className="w-11 h-12 flex items-center justify-center hover:bg-gray-100 transition cursor-pointer border-l border-gray-200"
                >
                  &#43;
                </button>
              </div>
 
              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                style={{ backgroundColor: PURPLE }}
                className="flex-1 h-12 rounded-xl text-white font-black text-sm uppercase tracking-widest hover:opacity-90 transition-all duration-200 flex items-center justify-between px-5 cursor-pointer"
              >
                <span>ADD TO CART</span>
                <span className="opacity-80 font-bold">₹{parseInt(product.price) * quantity}</span>
              </button>
            </div>
 
          </div>
        </div>
      </div>

    </div>
  );
}