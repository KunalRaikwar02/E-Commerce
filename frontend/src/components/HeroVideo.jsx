import { useState } from "react";
import { ShoppingBag } from "lucide-react";

const shirts = [
  {
    image: "/assets/images/heroimg1.png",
    name: "PINK FLOYD T-SHIRT WORLD TOUR",
    category: "BAND T-SHIRT",
    price: "$35.00 USD",
  },
  {
    image: "/assets/images/heroimg2.png",
    name: "METALLICA BLACK EDITION",
    category: "BAND T-SHIRT",
    price: "$40.00 USD",
  },
  {
    image: "/assets/images/heroimg3.png",
    name: "NIRVANA CLASSIC DROP",
    category: "BAND T-SHIRT",
    price: "$32.00 USD",
  },
  {
    image: "/assets/images/heroimg4.png",
    name: "LINKIN PARK LIMITED",
    category: "BAND T-SHIRT",
    price: "$38.00 USD",
  },
  {
    image: "/assets/images/heroimg5.png",
    name: "ARCTIC MONKEYS TOUR",
    category: "BAND T-SHIRT",
    price: "$36.00 USD",
  },
];

function HeroVideo() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState("next");

  const nextSlide = () => {
    if (index >= shirts.length - 1) return;
    setDirection("next");
    setIndex(index + 1);
  };

  const prevSlide = () => {
    if (index <= 0) return;
    setDirection("prev");
    setIndex(index - 1);
  };

  return (
    <section className="relative w-full h-screen bg-black text-white overflow-hidden pt-20">

      {/* Background */}
      <img
        src="/assets/images/heroimg.jpg"
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* BIG BACKGROUND TEXT */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden scale-y-250">
        <h1
          className="text-[24vw] font-extrabold uppercase tracking-tight text-white opacity-50 whitespace-nowrap"
          style={{
            filter: "blur(3px)",
            letterSpacing: "-20px",
          }}
        >
          VELTORN
        </h1>
      </div>

      {/* LEFT TOP TEXT */}
      <div className="absolute top-50 left-12 z-10">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-[-1px] scale-y-160">
          MERCH THAT HITS
          <br />
          <span className="text-red-600">DIFFERENT</span>
        </h1>
      </div>

      {/* CENTER SHIRT */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">

        {/* Fixed container so size never changes */}
        <div className="relative w-130 h-125 flex items-center justify-center overflow-hidden">

          <img
            key={index}
            src={shirts[index].image}
            alt="Shirt"
            className={`max-h-150 max-w-125 object-contain transition-all duration-500 cursor-pointer ${
              direction === "next"
                ? "animate-slideInRight"
                : "animate-slideInLeft"
            }`}
          />

        </div>

        {/* Controls (gap reduced) */}
        <div className="flex items-center gap-4 mt-3 text-xs">

          <button
            onClick={prevSlide}
            className="w-8 h-8 flex items-center justify-center bg-white text-black rounded-md hover:bg-gray-200 transition cursor-pointer"
          >
            ‹
          </button>

          <span className="text-white/80 tracking-wider">
            {index + 1}/{shirts.length}
          </span>

          <button
            onClick={nextSlide}
            className="w-8 h-8 flex items-center justify-center bg-white text-black rounded-md hover:bg-gray-200 transition cursor-pointer"
          >
            ›
          </button>

        </div>
      </div>

      {/* LEFT BOTTOM INFO */}
      <div className="absolute bottom-10 left-10 z-10 text-sm space-y-1">
        <p className="font-semibold">HOBIE MUSIC</p>
        <p className="text-gray-300">BASED IN CALIFORNIA</p>
        <p className="text-gray-400">@2026</p>
      </div>

      {/* SCROLL */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 opacity-40 flex flex-col items-center leading-none">
        <p className="tracking-widest text-sm animate-bounce">SCROLL</p>
        <span className="text-xl -mt-1 animate-bounce">⌄⌄</span>
      </div>

      {/* RIGHT PRODUCT CARD */}
      <div className="absolute bottom-6 right-6 z-20 bg-white text-black w-80 p-4 rounded-xl shadow-2xl flex gap-4">

        <img
          src={shirts[index].image}
          alt="Product"
          className="w-20 h-24 object-cover rounded-md"
        />

        <div className="flex flex-col justify-between flex-1">

          <div>
            <h3 className="font-bold text-sm leading-tight">
              {shirts[index].name}
            </h3>
            <p className="text-gray-500 text-xs mt-1">
              {shirts[index].category}
            </p>
          </div>

          <div className="mt-4">
            <div className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded-md w-fit cursor-pointer hover:bg-gray-800 transition">
              <ShoppingBag size={16} />
              <span className="font-semibold text-xs">
                {shirts[index].price}
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-linear-to-t from-black via-black/80 to-transparent pointer-events-none"></div>

    </section>
  );
}

export default HeroVideo;