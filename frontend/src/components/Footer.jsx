import React, { useState } from "react";

function Footer() {
  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    setShowSuccess(true);
    setEmail("");

    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <footer className="relative bg-red-800 text-white h-160 overflow-hidden mt-32">
      
      {/* Success Card */}
      {showSuccess && (
        <div className="absolute top-8 right-8 z-50 bg-white text-black px-6 py-4 rounded-xl shadow-2xl animate-fadeIn">
          <p className="font-semibold text-sm">
            ✅ Successfully Subscribed!
          </p>
        </div>
      )}

      {/* Top Content */}
      <div className="relative z-10 w-full pt-10 pb-32 flex justify-between ">
        {/* Left Side */}
        <div className="flex gap-45 pl-25">
          
          {/* Catalog */}
          <div>
            <h4 className="text-xs tracking-widest mb-6 opacity-80 ">
              CATALOG
            </h4>
            <ul className="text-xs font-semibold scale-y-150">
              <li className="cursor-pointer hover:text-gray-300 transition">
                SHIRT
              </li>
              <li className="cursor-pointer hover:text-gray-300 transition">
                TSHIRT
              </li>
              <li className="cursor-pointer hover:text-gray-300 transition">
                JEANS
              </li>
              <li className="cursor-pointer hover:text-gray-300 transition">
                CAP
              </li>
            </ul>
          </div>

          {/* Collection */}
          <div>
            <h4 className="text-xs tracking-widest mb-6 opacity-80">
              COLLECTION
            </h4>
            <ul className=" text-xs font-semibold scale-y-150">
              <li className="cursor-pointer hover:text-gray-300 transition">
                ANIME TSHIRT
              </li>
              <li className="cursor-pointer hover:text-gray-300 transition">
                SHORTS
              </li>
              <li className="cursor-pointer hover:text-gray-300 transition">
                CHAINS
              </li>
              <li className="cursor-pointer hover:text-gray-300 transition">
                BANDS
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-widest mb-6 opacity-80">
              SOCIAL
            </h4>
            <ul className="text-xs font-semibold scale-y-150">
              <li className="cursor-pointer hover:text-gray-300 transition">
                INSTAGRAM
              </li>
              <li className="cursor-pointer hover:text-gray-300 transition">
                FACEBOOK
              </li>
              <li className="cursor-pointer hover:text-gray-300 transition">
                YOUTUBE
              </li>
            </ul>
          </div>
        </div>

        {/* Right Side */}
        <div className="max-w-md mr-25">
          <h4 className="text-xs tracking-widest mb-6 opacity-80">
            SIGN UP
          </h4>

          <p className="mb-6 text-sm font-semibold uppercase leading-snug scale-y-150">
            SIGN-UP TO RECIEVE THE LATEST NEWS FROM VELTORN
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex items-center bg-white rounded-md overflow-hidden h-12"
          >
            <input
              type="email"
              placeholder="Email *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-full px-4 text-black outline-none text-sm"
            />

            <button
              type="submit"
              className="bg-black text-white h-10 px-6 mr-1 rounded-md text-sm font-semibold flex items-center justify-center cursor-pointer hover:bg-gray-800 transition"
            >
              SUBMIT →
            </button>
          </form>
        </div>
      </div>

      {/* Big Background Text */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none select-none">
        <h1
          className="text-[20vw] scale-y-170 leading-none font-extrabold uppercase text-white pl-10 whitespace-nowrap opacity-90"
          style={{
            filter: "blur(1.5px)",
            textShadow: `
              0 0 8px rgba(255,255,255,0.6),
              0 0 20px rgba(255,255,255,0.4)
            `,
          }}
        >
          VELTORN
        </h1>
      </div>
    </footer>
  );
}

export default Footer;