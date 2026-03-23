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
    const scrollAmount = window.innerWidth < 640 ? 250 : 320;

    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="mt-16 sm:mt-20 md:mt-25 px-4 sm:px-6 relative">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 px-2 sm:px-4 py-4">
        
        <span className="text-3xl sm:text-5xl md:text-6xl font-bold text-black tracking-[-1px] scale-y-[1.3] sm:scale-y-150">
          NEW ARRIVALS
        </span>

        <span className="font-semibold text-xs sm:text-sm bg-black text-white px-4 py-2 rounded-md cursor-pointer hover:bg-gray-800 transition w-fit">
          VIEW ALL →
        </span>
      </div>

      {/* Left Button (Hidden on small screens) */}
      <button
        onClick={() => scroll("left")}
        className="hidden sm:flex absolute left-2 md:left-3 top-1/2 -translate-y-1/2 z-10 
        bg-white/80 backdrop-blur-md border border-gray-300
        w-10 h-10 md:w-12 md:h-12 rounded-full shadow-lg 
        items-center justify-center
        hover:bg-black hover:text-white hover:scale-110
        transition-all duration-300 cursor-pointer"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Right Button (Hidden on small screens) */}
      <button
        onClick={() => scroll("right")}
        className="hidden sm:flex absolute right-2 md:right-3 top-1/2 -translate-y-1/2 z-10 
        bg-white/80 backdrop-blur-md border border-gray-300
        w-10 h-10 md:w-12 md:h-12 rounded-full shadow-lg 
        items-center justify-center
        hover:bg-black hover:text-white hover:scale-110
        transition-all duration-300 cursor-pointer"
      >
        <ChevronRight size={20} />
      </button>

      {/* Products */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto py-6 scroll-smooth hide-scrollbar"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="relative w-48 sm:w-64 md:w-72 lg:w-80 rounded-xl shrink-0 
            transition-all duration-300 
            sm:hover:w-72 md:hover:w-80 lg:hover:w-96 
            cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-xl">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-56 sm:h-72 md:h-80 lg:h-96 object-cover 
                transition-transform duration-500 hover:scale-110"
              />

              {/* Badges */}
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="bg-emerald-500 text-white text-[9px] sm:text-[10px] px-2 sm:px-3 py-1 rounded-full font-semibold tracking-wide shadow-md">
                  NEW
                </span>

                <span className="bg-black text-white text-[9px] sm:text-[10px] px-2 sm:px-3 py-1 rounded-full font-semibold tracking-wide shadow-md">
                  ARRIVAL
                </span>
              </div>
            </div>

            <p className="mt-3 text-xs sm:text-sm font-medium">
              {product.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default NewArrivals;