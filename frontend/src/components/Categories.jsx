function Categories() {
  const categories = [
    { name: "SHIRTS", items: 22, img: "/assets/images/shirts.jpg" },
    { name: "T-SHIRTS", items: 18, img: "/assets/images/tshirts.jpg" },
    { name: "ACCESSORIES", items: 15, img: "/assets/images/accessories.jpg" },
    { name: "JEANS", items: 10, img: "/assets/images/jeans.jpg" },
    { name: "CAP", items: 12, img: "/assets/images/accessori8.jpg" },
  ];

  return (
    <section className="bg-white py-20 px-12">
      {/* Top Heading Row */}
      <div className="flex justify-between items-start mb-12 mt-15">
        <h2 className="text-6xl md:text-7xl font-bold tracking-[-1px]  scale-y-160">
          CATEGORIES
        </h2>

        <p className="text-sm font-semibold cursor-pointer bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800 transition">
          SHOP ALL
        </p>
      </div>

      {/* Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="bg-gray-100 p-6 rounded-2xl relative hover:shadow-lg transition h-100 flex flex-col"
          >
            <div className="absolute top-6 right-6 w-3 h-3 bg-black rounded-full"></div>

            <div>
              <h3 className="font-bold text-3xl">{cat.name}</h3>
              <p className="text-gray-500 text-sm">{cat.items} items</p>
            </div>

            <div className="flex justify-center items-center flex-1 relative group cursor-pointer">
              <img
                src={cat.img}
                alt={cat.name}
                className="w-65 h-65 object-cover rounded-full transition duration-300 group-hover:blur-sm"
              />

              {/* Overlay text */}
              <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition duration-300">
                <div className="bg-black px-4 py-2 rounded-md text-white font-bold text-lg">
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
