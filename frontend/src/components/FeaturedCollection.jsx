import React from "react";

function FeaturedCollection() {
  return (
    <section className="mt-32 px-10">

      <div className="grid grid-cols-4 gap-10 items-start">

        {/* LEFT TEXT */}
        <div className="col-span-1 flex flex-col gap-4">
          <span className="text-sm text-gray-400">
            [featured]
          </span>

          <h2 className="text-2xl font-bold text-black leading-snug">
            LIMITED EDITION MERCH
            <br />
            FROM THE AMON
            <br />
            AMARTH RAGNAROK
            <br />
            COLLECTION.
          </h2>
        </div>

        {/* ✅ SMALL CARD WITH GREY BG */}
        <div className="col-span-1 cursor-pointer">

          <div className="relative h-100 flex items-center justify-center overflow-hidden bg-gray-100 rounded-lg">

            <img
              src="/assets/images/tshirt11.png"
              alt="Ragnarok Shirt"
              className="h-full object-contain"
            />

            <div className="absolute top-3 left-3 flex gap-2">
              <span className="bg-emerald-500 text-white text-[10px] px-3 py-1 rounded-full font-semibold shadow">
                NEW
              </span>
              <span className="bg-black text-white text-[10px] px-3 py-1 rounded-full font-semibold shadow">
                LIMITED
              </span>
            </div>

          </div>

          <div className="mt-4">
            <h3 className="font-semibold text-black text-sm">
              "RAGNAROK" SHIRT BLACK
            </h3>
            <p className="text-gray-400 text-xs mt-1">
              AMON AMARTH
            </p>
          </div>
        </div>

        {/* ✅ LARGE CARD (BG REMOVED) */}
        <div className="col-span-2 cursor-pointer">

          <div className="relative h-150 flex items-center justify-center overflow-hidden  bg-gray-100 rounded-lg">

            <img
              src="/assets/images/jeans5.png"
              alt="Amon Amarth Shorts"
              className="h-full object-contain"
            />

            <div className="absolute top-4 left-4 flex gap-2">
              <span className="bg-emerald-500 text-white text-[10px] px-3 py-1 rounded-full font-semibold shadow">
                NEW
              </span>
              <span className="bg-black text-white text-[10px] px-3 py-1 rounded-full font-semibold shadow">
                LIMITED
              </span>
            </div>

          </div>

          <div className="mt-4">
            <h3 className="font-semibold text-black text-sm">
              "AMON AMARTH" SHORTS GREY
            </h3>
            <p className="text-gray-400 text-xs mt-1">
              AMON AMARTH
            </p>
          </div>

        </div>

      </div>

      {/* BIG TITLE */}
      <div>
        <h1 className="text-6xl font-extrabold leading-none">
          AMON AMARTH
        </h1>
        <h1 className="text-6xl font-extrabold leading-none">
          RAGNAROK
        </h1>
      </div>

    </section>
  );
}

export default FeaturedCollection;