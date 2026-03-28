import React from "react";

function AboutBanner() {
  return (
    <section className="mt-20 sm:mt-28 md:mt-40 px-4 sm:px-6 md:px-10">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        
        {/* LEFT IMAGE */}
        <div className="flex justify-center md:justify-start pl-10">
          <img 
            src="/assets/images/about3.jpg"
            alt="About Hobie Music"
            className="w-full max-w-155 h-87.5 sm:h-112.5 md:h-190 object-cover rounded-3xl"
          />
        </div>

        {/* RIGHT CONTENT */}
       {/* Parent div mein 'items-center' add kiya aur responsive text-align hata diya */}
<div className="flex flex-col items-center justify-center h-full text-center pr-25">
  
  <div className="inline-block">
    {/* Small Label - Slightly increased to text-sm */}
    <p className="text-sm sm:text-base text-gray-400 mb-6 tracking-widest">
      [about us]
    </p>

    {/* Main Heading - Sizes increased by one level */}
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-[-1px] scale-y-[1.3] sm:scale-y-150 mb-2">
      THIS IS <span className="text-yellow-500">HOBIE MUSIC</span>
    </h2>

    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-[-1px] scale-y-[1.3] sm:scale-y-150 mb-2">
      LOUD, PROUD, AND
    </h2>

    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-[-1px] scale-y-[1.3] sm:scale-y-150">
      UNTAMED
    </h2>
  </div>

  {/* Small Image - No changes to structure */}
  <div className="mt-10 flex justify-center">
    <img
      src="/assets/images/about1.jpg"
      alt="Band"
      className="w-32 sm:w-40 md:w-45 h-40 sm:h-48 md:h-55 object-cover rounded-lg"
    />
  </div>

  {/* Description - Text size changed to sm:text-lg */}
  <p className="mt-10 text-gray-600 leading-relaxed text-base sm:text-lg max-w-162.5 mx-auto tracking-tight text-center px-4">
    We are a brand built on passion, energy, and fearless expression.
    Our music and merch represent those who live loud, stay proud, and
    refuse to blend in. This is more than style — it’s an attitude,
    energy and unapologetic identity. Every piece we create you ordinary.
  </p>
</div>
      </div>

    </section>
  );
}

export default AboutBanner;