import React from "react";
import { useNavigate } from "react-router-dom";

function Categories() {
  const navigate = useNavigate();
  const categories = [
    { name: "SHIRTS", items: 22, img: "/assets/images/shirts.jpg", filterValue: "Shirt" },
    { name: "T-SHIRTS", items: 18, img: "/assets/images/tshirts.jpg", filterValue: "T-Shirt" },
    { name: "ACCESSORIES", items: 15, img: "/assets/images/accessories.jpg", filterValue: "Accessories" },
    { name: "JEANS", items: 10, img: "/assets/images/jeans.jpg", filterValue: "Jeans" },
    { name: "CAP", items: 12, img: "/assets/images/accessori8.jpg", filterValue: "Cap" },
  ];

  return (
    <section className="bg-white py-14 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6 mb-10 sm:mb-12 mt-10 sm:mt-15">
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-1px] scale-y-[1.4] sm:scale-y-150 text-black">
          CATEGORIES
        </h2>
        <button 
          onClick={() => navigate("/collections/all", { state: { filter: "All" } })}
          className="text-xs sm:text-sm font-semibold cursor-pointer bg-black text-white px-4 sm:px-5 py-2 rounded-md hover:bg-gray-800 transition w-fit"
        >
          SHOP ALL
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.name}
            onClick={() => {
              window.scrollTo(0, 0);
              navigate("/collections/all", { state: { filter: cat.filterValue } });
            }}
            className="bg-gray-100 p-4 sm:p-5 md:p-6 rounded-2xl relative hover:shadow-lg transition h-auto md:h-100 flex flex-col cursor-pointer"
          >
            <div className="absolute top-4 sm:top-6 right-4 sm:right-6 w-3 h-3 bg-black rounded-full"></div>
            <div>
              <h3 className="font-bold text-xl sm:text-2xl md:text-3xl">{cat.name}</h3>
              <p className="text-gray-500 text-xs sm:text-sm">{cat.items} items</p>
            </div>
            <div className="flex justify-center items-center flex-1 relative group mt-6 sm:mt-8">
              <img src={cat.img} alt={cat.name} className="w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 lg:w-65 lg:h-65 object-cover rounded-full transition duration-300 group-hover:blur-sm" />
              <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition duration-300">
                <div className="bg-black px-3 sm:px-4 py-2 rounded-md text-white font-bold text-sm sm:text-lg">
                  SHOP {cat.name}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;