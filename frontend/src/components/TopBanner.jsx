function TopBanner() {
  const items = Array(6).fill("FREE SHIPPING WITHIN INDIA");

  return (
    <div className="bg-yellow-400 overflow-hidden fixed top-0 left-0 w-full z-50">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        
        {/* Duplicate container for smooth infinite scroll */}
        {[...items, ...items].map((text, index) => (
          <span
            key={index}
            className="px-12 py-2 text-black text-sm font-semibold"
          >
            {text}
          </span>
        ))}

      </div>
    </div>
  );
}

export default TopBanner;