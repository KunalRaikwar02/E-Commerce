import React from "react";

function AboutBanner() {
  return (
    <section className="mt-40 px-10">
      <div className="grid grid-cols-2 gap-20 items-center">
        {/* LEFT IMAGE */}
        <div className="flex justify-start">
          <img
            src="/assets/images/about3.jpg"
            alt="About Hobie Music"
            className="w-180 h-180 object-cover rounded-3xl"
          />
        </div>

        {/* RIGHT CONTENT */}
        {/* RIGHT CONTENT */}
        <div className="flex flex-col justify-center h-full text-center">
          {/* Center Wrapper (content width ke hisaab se) */}
          <div className="inline-block">
            {/* Small Label centered according to heading width */}
            <p className="text-sm text-gray-400  mb-4">[about us]</p>

            {/* Main Heading */}
            <h2 className="text-3xl font-bold leading-tight tracking-[-1px] scale-y-150 mb-1">
              THIS IS <span className="text-yellow-500">HOBIE MUSIC</span>
            </h2>

            <h2 className="text-3xl font-bold leading-tight tracking-[-1px] scale-y-150 mb-1">
              LOUD, PROUD, AND
            </h2>

            <h2 className="text-3xl font-bold leading-tight tracking-[-1px] scale-y-150">
              UNTAMED
            </h2>
          </div>

          {/* Small Image */}
          <div className="mt-8 text-center">
            <img
              src="/assets/images/about1.jpg"
              alt="Band"
              className="inline-block w-45 h-55 object-cover rounded-lg"
            />
          </div>

          {/* Description */}
          <p className="mt-8 text-gray-600 leading-relaxed max-w-m text-center tracking-[-1px]">
            We are a brand built on passion, energy, and fearless expression.
            Our music and merch represent those who live loud, stay proud, and
            refuse to blend in. This is more than style — its an attitude.
            energy and unapologetic identity. Every piece we create reflects
            strength, individuality, and the spirit of staying untamed in a
            world that tries to make you ordinary.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutBanner;
