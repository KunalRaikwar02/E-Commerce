import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AnimeFooter() {
  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleFilterClick = (type, value) => {
    window.scrollTo(0, 0);
    if (type === "anime") navigate("/collections/all", { state: { anime: value } });
    else navigate("/collections/all", { state: { filter: value } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    sessionStorage.setItem("veltorn_prefill_email", email);
    setShowSuccess(true);
    setEmail("");
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <footer className="relative bg-[#581a90] text-white h-160 overflow-hidden mt-32">

      {showSuccess && (
        <div className="absolute top-8 right-8 z-50 bg-white text-black px-6 py-4 rounded-xl shadow-2xl">
          <p className="font-semibold text-sm">✅ Email saved! Sign up now.</p>
        </div>
      )}

      <div className="relative z-10 w-full pt-10 pb-32 flex flex-col lg:flex-row justify-between">
        <div className="flex flex-col sm:flex-row gap-10 sm:gap-20 lg:gap-45 pl-6 sm:pl-10 lg:pl-25">
          <div>
            <h4 className="text-xs mb-6 tracking-widest font-bold opacity-80">CATALOG</h4>
            <ul className="text-xs font-bold scale-y-150">
              <li onClick={() => handleFilterClick("catalog", "Shirt")} className="cursor-pointer hover:text-gray-300 transition">SHIRT</li>
              <li onClick={() => handleFilterClick("catalog", "T-Shirt")} className="cursor-pointer hover:text-gray-300 transition">TSHIRT</li>
              <li onClick={() => handleFilterClick("catalog", "Jeans")} className="cursor-pointer hover:text-gray-300 transition">JEANS</li>
              <li onClick={() => handleFilterClick("catalog", "Cap")} className="cursor-pointer hover:text-gray-300 transition">CAP</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs mb-6 tracking-widest font-bold opacity-80">ANIME COLLECTION</h4>
            <ul className="text-xs font-bold scale-y-150">
              <li onClick={() => handleFilterClick("anime", "Naruto")} className="cursor-pointer hover:text-gray-300 transition">NARUTO</li>
              <li onClick={() => handleFilterClick("anime", "Solo Leveling")} className="cursor-pointer hover:text-gray-300 transition">SOLO LEVELING</li>
              <li onClick={() => handleFilterClick("anime", "Demon Slayer")} className="cursor-pointer hover:text-gray-300 transition">DEMON SLAYER</li>
              <li onClick={() => handleFilterClick("anime", "One Piece")} className="cursor-pointer hover:text-gray-300 transition">ONE PIECE</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs mb-6 tracking-widest font-bold opacity-80">SOCIAL</h4>
            <ul className="text-xs font-bold scale-y-150 space-y-0.5">
              <li onClick={() => window.open("https://www.instagram.com/veltornclothes", "_blank")} className="cursor-pointer hover:text-gray-300 transition">INSTAGRAM</li>
              <li className="cursor-pointer hover:text-gray-300 transition">FACEBOOK</li>
              <li className="cursor-pointer hover:text-gray-300 transition">YOUTUBE</li>
            </ul>
          </div>
        </div>

        <div className="max-w-md mr-6 sm:mr-10 lg:mr-25 mt-10 lg:mt-0">
          <h4 className="text-xs font-bold tracking-widest mb-6 opacity-80">SIGN UP</h4>
          <p className="mb-6 text-sm font-semibold uppercase leading-snug scale-y-150">
            SIGN-UP TO RECEIVE THE LATEST NEWS FROM VELTORN
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center bg-white rounded-md overflow-hidden h-auto sm:h-12">
            <input type="email" placeholder="Email *" value={email} onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-12 sm:h-full px-4 text-black outline-none text-sm" />
            <button type="submit" className="bg-black text-white h-12 sm:h-10 px-6 sm:mr-1 sm:my-1 rounded-md text-sm font-semibold flex items-center justify-center cursor-pointer hover:bg-gray-800 transition">
              SUBMIT →
            </button>
          </form>
          <p className="text-[10px] text-white/50 mt-2">Your email will be pre-filled in the signup form.</p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full pointer-events-none select-none">
        <h1 className="text-[28vw] lg:text-[20vw] scale-y-170 leading-none font-extrabold uppercase text-white pl-6 lg:pl-10 whitespace-nowrap opacity-90"
          style={{ filter: "blur(1.5px)", textShadow: "0 0 8px rgba(255,255,255,0.6), 0 0 20px rgba(255,255,255,0.4)" }}>
          VELTORN
        </h1>
      </div>
    </footer>
  );
}

export default AnimeFooter;