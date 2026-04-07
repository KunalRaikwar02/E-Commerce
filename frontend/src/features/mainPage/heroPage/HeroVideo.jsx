//   // import { useState } from "react";
//   // import { ShoppingBag } from "lucide-react";

//   // const shirts = [
//   //   {
//   //     image: "/assets/images/heroimg1.png",
//   //     name: "PINK FLOYD T-SHIRT WORLD TOUR",
//   //     category: "BAND T-SHIRT",
//   //     price: "$35.00 USD",
//   //   },
//   //   {
//   //     image: "/assets/images/heroimg2.png",
//   //     name: "METALLICA BLACK EDITION",
//   //     category: "BAND T-SHIRT",
//   //     price: "$40.00 USD",
//   //   },
//   //   {
//   //     image: "/assets/images/heroimg3.png",
//   //     name: "NIRVANA CLASSIC DROP",
//   //     category: "BAND T-SHIRT",
//   //     price: "$32.00 USD",
//   //   },
//   //   {
//   //     image: "/assets/images/heroimg4.png",
//   //     name: "LINKIN PARK LIMITED",
//   //     category: "BAND T-SHIRT",
//   //     price: "$38.00 USD",
//   //   },
//   //   {
//   //     image: "/assets/images/heroimg5.png",
//   //     name: "ARCTIC MONKEYS TOUR",
//   //     category: "BAND T-SHIRT",
//   //     price: "$36.00 USD",
//   //   },
//   // ];

//   // function HeroVideo() {
//   //   const [index, setIndex] = useState(0);
//   //   const [direction, setDirection] = useState("next");

//   //   const nextSlide = () => {
//   //     if (index >= shirts.length - 1) return;
//   //     setDirection("next");
//   //     setIndex(index + 1);
//   //   };

//   //   const prevSlide = () => {
//   //     if (index <= 0) return;
//   //     setDirection("prev");
//   //     setIndex(index - 1);
//   //   };

//   //   return (
//   //     <section className="relative w-full h-screen bg-black text-white overflow-hidden pt-24 sm:pt-28 md:pt-20 HeroVideo">

//   //       {/* Background */}
//   //       <img
//   //         src="/assets/images/heroimg.jpg"
//   //         alt="Hero"
//   //         className="absolute inset-0 w-full h-full object-cover"
//   //       />

//   //       {/* BIG BACKGROUND TEXT */}
//   //       <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden scale-y-[2.5] sm:scale-y-[2.8]">
//   //         <h1
//   //           className="text-[28vw] sm:text-[24vw] font-extrabold uppercase tracking-tight text-white opacity-50 whitespace-nowrap"
//   //           style={{
//   //             filter: "blur(3px)",
//   //             letterSpacing: "-10px",
//   //           }}
//   //         >
//   //           VELTORN
//   //         </h1>
//   //       </div>

//   //       {/* LEFT TOP TEXT */}
//   //       <div className="absolute top-32 sm:top-40 md:top-50 left-6 sm:left-10 md:left-12 z-10">
//   //         <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold leading-tight tracking-[-1px] scale-y-[1.3] sm:scale-y-[1.5]">
//   //           MERCH THAT HITS
//   //           <br />
//   //           <span className="text-red-600">DIFFERENT</span>
//   //         </h1>
//   //       </div>

//   //       {/* CENTER SHIRT */}
//   //       <div className="absolute inset-0 flex flex-col items-center justify-center z-10">

//   //         <div className="relative w-64 h-72 sm:w-96 sm:h-112 md:w-lg md:h-120 flex items-center justify-center overflow-hidden">

//   //           <img
//   //             key={index}
//   //             src={shirts[index].image}
//   //             alt="Shirt"
//   //             className={`max-h-80 sm:max-h-104 md:max-h-120 max-w-full object-contain transition-all duration-500 cursor-pointer ${
//   //               direction === "next"
//   //                 ? "animate-slideInRight"
//   //                 : "animate-slideInLeft"
//   //             }`}
//   //           />

//   //         </div>

//   //         <div className="flex items-center gap-4 mt-3 text-xs sm:text-sm">

//   //           <button
//   //             onClick={prevSlide}
//   //             className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-white text-black rounded-md hover:bg-gray-200 transition cursor-pointer"
//   //           >
//   //             ‹
//   //           </button>

//   //           <span className="text-white/80 tracking-wider">
//   //             {index + 1}/{shirts.length}
//   //           </span>

//   //           <button
//   //             onClick={nextSlide}
//   //             className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-white text-black rounded-md hover:bg-gray-200 transition cursor-pointer"
//   //           >
//   //             ›
//   //           </button>

//   //         </div>
//   //       </div>

//   //       {/* LEFT BOTTOM INFO */}
//   //       <div className="absolute bottom-6 sm:bottom-10 left-4 sm:left-8 md:left-10 z-10 text-xs sm:text-sm space-y-1">
//   //         <p className="font-semibold">HOBIE MUSIC</p>
//   //         <p className="text-gray-300">BASED IN CALIFORNIA</p>
//   //         <p className="text-gray-400">@2026</p>
//   //       </div>

//   //       {/* SCROLL */}
//   //       <div className="hidden sm:flex absolute bottom-10 left-1/2 -translate-x-1/2 z-10 opacity-40 flex-col items-center leading-none">
//   //         <p className="tracking-widest text-sm animate-bounce">SCROLL</p>
//   //         <span className="text-xl -mt-1 animate-bounce">⌄⌄</span>
//   //       </div>

//   //       {/* RIGHT PRODUCT CARD */}
//   //       <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 z-20 bg-white text-black w-[90%] sm:w-72 md:w-80 p-3 sm:p-4 rounded-xl shadow-2xl flex gap-3 sm:gap-4">

//   //         <img
//   //           src={shirts[index].image}
//   //           alt="Product"
//   //           className="w-16 h-20 sm:w-20 sm:h-24 object-cover rounded-md"
//   //         />

//   //         <div className="flex flex-col justify-between flex-1">

//   //           <div>
//   //             <h3 className="font-bold text-xs sm:text-sm leading-tight">
//   //               {shirts[index].name}
//   //             </h3>
//   //             <p className="text-gray-500 text-[10px] sm:text-xs mt-1">
//   //               {shirts[index].category}
//   //             </p>
//   //           </div>

//   //           <div className="mt-3 sm:mt-4">
//   //             <div className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded-md w-fit cursor-pointer hover:bg-gray-800 transition">
//   //               <ShoppingBag size={14} />
//   //               <span className="font-semibold text-[10px] sm:text-xs">
//   //                 {shirts[index].price}
//   //               </span>
//   //             </div>
//   //           </div>

//   //         </div>
//   //       </div>

//   //       {/* Bottom Fade */}
//   //       <div className="absolute bottom-0 left-0 w-full h-32 sm:h-40 bg-linear-to-t from-black via-black/80 to-transparent pointer-events-none"></div>

//   //     </section>
//   //   );
//   // }

//   // export default HeroVideo;



//   import { useState, useEffect, useRef } from "react";
// import { ShoppingBag } from "lucide-react";
// import { Renderer, Camera, Geometry, Program, Mesh } from "ogl";

// export default function HeroVideo() {
//   const [index, setIndex] = useState(0);
//   const [direction, setDirection] = useState("next");
//   const particleContainerRef = useRef(null);
//   const mouseRef = useRef({ x: 0, y: 0 }); // Mouse position store karne ke liye

//   const shirts = [
//     { image: "/assets/images/heroimg1.png", name: "PINK FLOYD WORLD TOUR", category: "BAND T-SHIRT", price: "$35.00 USD" },
//     { image: "/assets/images/heroimg2.png", name: "METALLICA BLACK EDITION", category: "BAND T-SHIRT", price: "$40.00 USD" },
//     { image: "/assets/images/heroimg3.png", name: "NIRVANA CLASSIC DROP", category: "BAND T-SHIRT", price: "$32.00 USD" },
//     { image: "/assets/images/heroimg4.png", name: "LINKIN PARK LIMITED", category: "BAND T-SHIRT", price: "$38.00 USD" },
//     { image: "/assets/images/heroimg5.png", name: "ARCTIC MONKEYS TOUR", category: "BAND T-SHIRT", price: "$36.00 USD" },
//   ];

//   useEffect(() => {
//     const container = particleContainerRef.current;
//     if (!container) return;

//     const renderer = new Renderer({ alpha: true, dpr: window.devicePixelRatio });
//     const gl = renderer.gl;
//     container.appendChild(gl.canvas);

//     const camera = new Camera(gl, { fov: 20 });
//     camera.position.z = 15;

//     const count = 300;
//     const pos = new Float32Array(count * 3);
//     const rnd = new Float32Array(count * 4);
    
//     for (let i = 0; i < count; i++) {
//       pos.set([(Math.random() - 0.5) * 15, (Math.random() - 0.5) * 15, (Math.random() - 0.5) * 10], i * 3);
//       rnd.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4);
//     }

//     const program = new Program(gl, {
//       vertex: `
//         attribute vec3 position;
//         attribute vec4 random;
//         uniform mat4 modelMatrix, viewMatrix, projectionMatrix;
//         uniform float uTime;
//         void main() {
//           vec3 p = position;
//           // Subtle floating animation
//           p.x += sin(uTime * 0.3 + random.x * 10.0) * 0.2;
//           p.y += cos(uTime * 0.3 + random.y * 10.0) * 0.2;
//           vec4 mvPos = viewMatrix * modelMatrix * vec4(p, 1.0);
//           gl_PointSize = (140.0 / length(mvPos.xyz)) * random.w;
//           gl_Position = projectionMatrix * mvPos;
//         }`,
//       fragment: `
//         precision highp float;
//         void main() {
//           if(length(gl_PointCoord - 0.5) > 0.5) discard;
//           gl_FragColor = vec4(1.0, 1.0, 1.0, 0.7);
//         }`,
//       uniforms: { uTime: { value: 0 } },
//       transparent: true,
//     });

//     const mesh = new Mesh(gl, { mode: gl.POINTS, geometry: new Geometry(gl, { position: { size: 3, data: pos }, random: { size: 4, data: rnd } }), program });

//     // --- MOUSE MOVE HANDLER ---
//     const handleMouseMove = (e) => {
//       // Normalizing mouse coordinates to -1 to 1 range
//       const x = (e.clientX / window.innerWidth) * 2 - 1;
//       const y = -(e.clientY / window.innerHeight) * 2 + 1;
//       mouseRef.current = { x, y };
//     };
//     window.addEventListener("mousemove", handleMouseMove);

//     const resize = () => {
//       renderer.setSize(container.clientWidth, container.clientHeight);
//       camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
//     };
//     window.addEventListener("resize", resize); resize();

//     let frame;
//     const update = (t) => {
//       frame = requestAnimationFrame(update);
//       program.uniforms.uTime.value = t * 0.001;

//       // --- CURSOR MOVEMENT LOGIC ---
//       // Particles ko cursor ki opposite direction mein halka move karenge
//       // Lerp (Linear Interpolation) for smooth movement
//       mesh.rotation.y += (mouseRef.current.x * 0.2 - mesh.rotation.y) * 0.05;
//       mesh.rotation.x += (-mouseRef.current.y * 0.2 - mesh.rotation.x) * 0.05;
      
//       // Halka sa position shift bhi denge
//       mesh.position.x += (mouseRef.current.x * 0.5 - mesh.position.x) * 0.05;
//       mesh.position.y += (mouseRef.current.y * 0.5 - mesh.position.y) * 0.05;

//       renderer.render({ scene: mesh, camera });
//     };
//     frame = requestAnimationFrame(update);

//     return () => {
//       cancelAnimationFrame(frame);
//       window.removeEventListener("resize", resize);
//       window.removeEventListener("mousemove", handleMouseMove);
//       if (container.contains(gl.canvas)) container.removeChild(gl.canvas);
//     };
//   }, []);

//   const nextSlide = () => { if (index < shirts.length - 1) { setDirection("next"); setIndex(index + 1); } };
//   const prevSlide = () => { if (index > 0) { setDirection("prev"); setIndex(index - 1); } };

//   return (
//     <section data-cursor="white" className="relative w-full h-screen bg-black text-white mt-15 overflow-hidden pt-24">
      
//       {/* Background Image */}
//       <img src="/assets/images/heroimg.jpg" className="absolute inset-0 w-full h-full object-cover opacity-20 z-0" alt="bg" />

//       {/* Particles Layer */}
//       <div ref={particleContainerRef} className="absolute inset-0 z-5 pointer-events-none" />

//       {/* Text Content */}
//       <div className="absolute top-32 left-8 md:left-12 z-20 pointer-events-none">
//         <h1 className="text-4xl md:text-7xl font-bold leading-tight tracking-tighter scale-y-[1.4]">
//           MERCH THAT HITS<br /><span className="text-red-600">DIFFERENT</span>
//         </h1>
//       </div>

//       {/* Center Slider */}
//       <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
//         <div className="relative w-72 h-80 sm:w-96 sm:h-112 flex items-center justify-center">
//           <img 
//             key={index}
//             src={shirts[index].image} 
//             className={`max-h-full max-w-full object-contain transition-all duration-500 ${
//               direction === "next" ? "animate-in slide-in-from-right-10" : "animate-in slide-in-from-left-10"
//             }`} 
//             alt="shirt"
//           />
//         </div>
        
//         <div className="flex items-center gap-6">
//           <button onClick={prevSlide} className="w-10 h-10 flex items-center justify-center bg-white text-black rounded-lg font-bold hover:bg-gray-200 transition cursor-pointer">‹</button>
//           <span className="text-sm">{index + 1} / {shirts.length}</span>
//           <button onClick={nextSlide} className="w-10 h-10 flex items-center justify-center bg-white text-black rounded-lg font-bold hover:bg-gray-200 transition cursor-pointer">›</button>
//         </div>
//       </div>
            
//       {/* Product Card */}
//       <div className="absolute bottom-6 right-6 z-30 bg-white text-black w-72 p-4 rounded-2xl shadow-2xl flex gap-4 transition-transform duration-300 hover:scale-105">
//         <img src={shirts[index].image} className="w-16 h-20 object-cover rounded-lg bg-gray-100" alt="thumb" />
//         <div className="flex flex-col justify-between flex-1">
//           <div>
//             <h3 className="font-bold text-[13px] uppercase leading-tight">{shirts[index].name}</h3>
//             <p className="text-gray-500 text-[10px] mt-1">{shirts[index].category}</p>
//           </div>
//           <div className="flex items-center gap-2 bg-black text-white px-3 py-1.5 rounded-lg w-fit mt-2 cursor-pointer">
//             <ShoppingBag size={12} />
//             <span className="font-bold text-[11px]">{shirts[index].price}</span>
//           </div>
//         </div>
//       </div>

//       {/* Info */}
//       <div className="absolute bottom-10 left-8 z-20 text-[10px] tracking-[0.2em] opacity-60">
//         <p className="font-bold text-white uppercase tracking-widest leading-loose">Hobie Music Group</p>
//         <p>California / 2026</p>
//       </div>

//       <div className="absolute bottom-0 left-0 w-full h-40 bg-linear-to-t from-black to-transparent pointer-events-none z-10" />

//     </section>
//   );
// }




import { useState, useEffect, useRef } from "react";
import { ShoppingBag } from "lucide-react";
import { Renderer, Camera, Geometry, Program, Mesh } from "ogl";
import { useNavigate } from "react-router-dom";

export default function HeroVideo() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState("next");
  const particleContainerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const navigate = useNavigate();

  const shirts = [
    { id: "hero1", image: "/assets/images/heroimg1.png", name: "PINK FLOYD WORLD TOUR", category: "BAND T-SHIRT", price: "2799", img: "/assets/images/heroimg1.png", collection: "BAND SERIES", badge: "NEW", sizes: ["S", "M", "L", "XL"], brand: "VELTORN" },
    { id: "hero2", image: "/assets/images/heroimg2.png", name: "METALLICA BLACK EDITION", category: "BAND T-SHIRT", price: "3099", img: "/assets/images/heroimg2.png", collection: "BAND SERIES", badge: "LIMITED", sizes: ["M", "L", "XL", "XXL"], brand: "VELTORN" },
    { id: "hero3", image: "/assets/images/heroimg3.png", name: "NIRVANA CLASSIC DROP", category: "BAND T-SHIRT", price: "2499", img: "/assets/images/heroimg3.png", collection: "BAND SERIES", badge: "NEW", sizes: ["S", "M", "L"], brand: "VELTORN" },
    { id: "hero4", image: "/assets/images/heroimg4.png", name: "LINKIN PARK LIMITED", category: "BAND T-SHIRT", price: "2999", img: "/assets/images/heroimg4.png", collection: "BAND SERIES", badge: "LIMITED", sizes: ["M", "L", "XL"], brand: "VELTORN" },
    { id: "hero5", image: "/assets/images/heroimg5.png", name: "ARCTIC MONKEYS TOUR", category: "BAND T-SHIRT", price: "2799", img: "/assets/images/heroimg5.png", collection: "BAND SERIES", badge: "NEW", sizes: ["S", "M", "L", "XL", "XXL"], brand: "VELTORN" },
  ];

  const handleProductClick = (shirt) => {
    window.scrollTo(0, 0);
    navigate(`/product/${shirt.id}`, { state: { product: shirt } });
  };

  useEffect(() => {
    const container = particleContainerRef.current;
    if (!container) return;

    const renderer = new Renderer({ alpha: true, dpr: window.devicePixelRatio });
    const gl = renderer.gl;
    container.appendChild(gl.canvas);

    const camera = new Camera(gl, { fov: 20 });
    camera.position.z = 15;

    const count = 300;
    const pos = new Float32Array(count * 3);
    const rnd = new Float32Array(count * 4);

    for (let i = 0; i < count; i++) {
      pos.set([(Math.random() - 0.5) * 15, (Math.random() - 0.5) * 15, (Math.random() - 0.5) * 10], i * 3);
      rnd.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4);
    }

    const program = new Program(gl, {
      vertex: `
        attribute vec3 position;
        attribute vec4 random;
        uniform mat4 modelMatrix, viewMatrix, projectionMatrix;
        uniform float uTime;
        void main() {
          vec3 p = position;
          p.x += sin(uTime * 0.3 + random.x * 10.0) * 0.2;
          p.y += cos(uTime * 0.3 + random.y * 10.0) * 0.2;
          vec4 mvPos = viewMatrix * modelMatrix * vec4(p, 1.0);
          gl_PointSize = (140.0 / length(mvPos.xyz)) * random.w;
          gl_Position = projectionMatrix * mvPos;
        }`,
      fragment: `
        precision highp float;
        void main() {
          if(length(gl_PointCoord - 0.5) > 0.5) discard;
          gl_FragColor = vec4(1.0, 1.0, 1.0, 0.7);
        }`,
      uniforms: { uTime: { value: 0 } },
      transparent: true,
    });

    const mesh = new Mesh(gl, {
      mode: gl.POINTS,
      geometry: new Geometry(gl, {
        position: { size: 3, data: pos },
        random: { size: 4, data: rnd },
      }),
      program,
    });

    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);

    const resize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
      camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
    };
    window.addEventListener("resize", resize);
    resize();

    let frame;
    const update = (t) => {
      frame = requestAnimationFrame(update);
      program.uniforms.uTime.value = t * 0.001;
      mesh.rotation.y += (mouseRef.current.x * 0.2 - mesh.rotation.y) * 0.05;
      mesh.rotation.x += (-mouseRef.current.y * 0.2 - mesh.rotation.x) * 0.05;
      mesh.position.x += (mouseRef.current.x * 0.5 - mesh.position.x) * 0.05;
      mesh.position.y += (mouseRef.current.y * 0.5 - mesh.position.y) * 0.05;
      renderer.render({ scene: mesh, camera });
    };
    frame = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (container.contains(gl.canvas)) container.removeChild(gl.canvas);
    };
  }, []);

  const nextSlide = () => { if (index < shirts.length - 1) { setDirection("next"); setIndex(index + 1); } };
  const prevSlide = () => { if (index > 0) { setDirection("prev"); setIndex(index - 1); } };

  return (
    <section data-cursor="white" className="relative w-full h-screen bg-black text-white mt-15 overflow-hidden pt-24">

      <img src="/assets/images/heroimg.jpg" className="absolute inset-0 w-full h-full object-cover opacity-20 z-0" alt="bg" />
      <div ref={particleContainerRef} className="absolute inset-0 z-5 pointer-events-none" />

      {/* Text */}
      <div className="absolute top-32 left-8 md:left-12 z-20 pointer-events-none">
        <h1 className="text-4xl md:text-7xl font-bold leading-tight tracking-tighter scale-y-[1.4]">
          MERCH THAT HITS<br /><span className="text-red-600">DIFFERENT</span>
        </h1>
      </div>

      {/* Center Slider — clickable */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
        <div
          className="relative w-72 h-80 sm:w-96 sm:h-112 flex items-center justify-center cursor-pointer"
          onClick={() => handleProductClick(shirts[index])}
        >
          <img
            key={index}
            src={shirts[index].image}
            className={`max-h-full max-w-full object-contain transition-all duration-500 hover:scale-105 ${direction === "next" ? "animate-in slide-in-from-right-10" : "animate-in slide-in-from-left-10"}`}
            alt="shirt"
          />
          {/* Click hint */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
            Click to view
          </div>
        </div>

        <div className="flex items-center gap-6 mt-4">
          <button onClick={prevSlide} className="w-10 h-10 flex items-center justify-center bg-white text-black rounded-lg font-bold hover:bg-gray-200 transition cursor-pointer">‹</button>
          <span className="text-sm">{index + 1} / {shirts.length}</span>
          <button onClick={nextSlide} className="w-10 h-10 flex items-center justify-center bg-white text-black rounded-lg font-bold hover:bg-gray-200 transition cursor-pointer">›</button>
        </div>
      </div>

      {/* Product Card — bottom right, clickable */}
      <div
        onClick={() => handleProductClick(shirts[index])}
        className="absolute bottom-6 right-6 z-30 bg-white text-black w-72 p-4 rounded-2xl shadow-2xl flex gap-4 transition-transform duration-300 hover:scale-105 cursor-pointer"
      >
        <img src={shirts[index].image} className="w-16 h-20 object-cover rounded-lg bg-gray-100" alt="thumb" />
        <div className="flex flex-col justify-between flex-1">
          <div>
            <h3 className="font-bold text-[13px] uppercase leading-tight">{shirts[index].name}</h3>
            <p className="text-gray-500 text-[10px] mt-1">{shirts[index].category}</p>
          </div>
          <div className="flex items-center gap-2 bg-black text-white px-3 py-1.5 rounded-lg w-fit mt-2">
            <ShoppingBag size={12} />
            <span className="font-bold text-[11px]">₹{shirts[index].price}</span>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="absolute bottom-10 left-8 z-20 text-[10px] tracking-[0.2em] opacity-60">
        <p className="font-bold text-white uppercase tracking-widest leading-loose">Hobie Music Group</p>
        <p>California / 2026</p>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-40 bg-linear-to-t from-black to-transparent pointer-events-none z-10" />
    </section>
  );
}