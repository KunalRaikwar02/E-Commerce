import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function NewArrivals() {
  const scrollRef = useRef(null);

  const products = [
    { id: 1, title: "BLACK T-SHIRT", image: "/assets/images/tshirt2.jpeg" },
    { id: 2, title: "WHITE T-SHIRT", image: "/assets/images/tshirt3.jpeg" },
    { id: 3, title: "BLUE T-SHIRT", image: "/assets/images/tshirt4.jpeg" },
    { id: 4, title: "RED T-SHIRT", image: "/assets/images/tshirt5.jpeg" },
    { id: 5, title: "GREEN T-SHIRT", image: "/assets/images/tshirt6.jpeg" },
    { id: 6, title: "YELLOW T-SHIRT", image: "/assets/images/tshirt7.jpeg" },
    { id: 7, title: "PURPLE T-SHIRT", image: "/assets/images/tshirt8.jpeg" },
    { id: 8, title: "ORANGE T-SHIRT", image: "/assets/images/tshirt9.jpeg" },
  ];

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 320;

    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="mt-25 px-6 relative">
      <div className="flex justify-between items-center px-4 py-4">
        <span className="text-6xl font-bold text-black tracking-[-1px] scale-y-160">
          NEW ARRIVALS
        </span>

        <span className="font-semibold text-sm bg-black text-white px-4 py-2 rounded-md cursor-pointer hover:bg-gray-800 transition">
          VIEW ALL →
        </span>
      </div>

      {/* Left Button */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 
        bg-white/80 backdrop-blur-md border border-gray-300
        w-12 h-12 rounded-full shadow-lg 
        flex items-center justify-center
        hover:bg-black hover:text-white hover:scale-110
        transition-all duration-300 cursor-pointer"
      >
        <ChevronLeft size={22} />
      </button>

      {/* Right Button */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 
        bg-white/80 backdrop-blur-md border border-gray-300
        w-12 h-12 rounded-full shadow-lg 
        flex items-center justify-center
        hover:bg-black hover:text-white hover:scale-110
        transition-all duration-300 cursor-pointer"
      >
        <ChevronRight size={22} />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto py-6 scroll-smooth hide-scrollbar"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="relative w-64 sm:w-72 md:w-80 rounded-xl shrink-0 
            transition-all duration-300 hover:w-72 sm:hover:w-80 md:hover:w-96 
            cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-xl">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-72 sm:h-80 md:h-96 object-cover 
                transition-transform duration-500 hover:scale-110 cursor-pointer"
              />

              {/* 🔥 Updated Premium Badges */}
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="bg-emerald-500 text-white text-[10px] px-3 py-1 rounded-full font-semibold tracking-wide shadow-md">
                  NEW
                </span>

                <span className="bg-black text-white text-[10px] px-3 py-1 rounded-full font-semibold tracking-wide shadow-md">
                  ARRIVAL
                </span>
              </div>
            </div>

            <p className="mt-3 text-sm font-medium">{product.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default NewArrivals; 