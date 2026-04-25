// import { useState, useEffect, useRef } from "react";
// import { ShoppingBag } from "lucide-react";
// import { Renderer, Camera, Geometry, Program, Mesh } from "ogl";
// import { useNavigate } from "react-router-dom";
// import { pageProductsAPI } from "../../../services/api";

// const STATIC_SHIRTS = [
//   { id: "hero1", image: "/assets/images/heroimg1.png", name: "PINK FLOYD WORLD TOUR", category: "BAND T-SHIRT", price: "2799", img: "/assets/images/heroimg1.png", collection: "BAND SERIES", badge: "NEW", sizes: ["S", "M", "L", "XL"], brand: "VELTORN" },
//   { id: "hero2", image: "/assets/images/heroimg2.png", name: "METALLICA BLACK EDITION", category: "BAND T-SHIRT", price: "3099", img: "/assets/images/heroimg2.png", collection: "BAND SERIES", badge: "LIMITED", sizes: ["M", "L", "XL", "XXL"], brand: "VELTORN" },
//   { id: "hero3", image: "/assets/images/heroimg3.png", name: "NIRVANA CLASSIC DROP", category: "BAND T-SHIRT", price: "2499", img: "/assets/images/heroimg3.png", collection: "BAND SERIES", badge: "NEW", sizes: ["S", "M", "L"], brand: "VELTORN" },
//   { id: "hero4", image: "/assets/images/heroimg4.png", name: "LINKIN PARK LIMITED", category: "BAND T-SHIRT", price: "2999", img: "/assets/images/heroimg4.png", collection: "BAND SERIES", badge: "LIMITED", sizes: ["M", "L", "XL"], brand: "VELTORN" },
//   { id: "hero5", image: "/assets/images/heroimg5.png", name: "ARCTIC MONKEYS TOUR", category: "BAND T-SHIRT", price: "2799", img: "/assets/images/heroimg5.png", collection: "BAND SERIES", badge: "NEW", sizes: ["S", "M", "L", "XL", "XXL"], brand: "VELTORN" },
// ];

// export default function HeroVideo() {
//   const [shirts, setShirts] = useState(STATIC_SHIRTS);
//   const [index, setIndex] = useState(0);
//   const [direction, setDirection] = useState("next");
//   const particleContainerRef = useRef(null);
//   const mouseRef = useRef({ x: 0, y: 0 });
//   const navigate = useNavigate();

//   // Fetch from backend if admin has set products
//   useEffect(() => {
//     pageProductsAPI.getSection("hero")
//       .then(data => {
//         if (data.products && data.products.length > 0) {
//           setShirts(data.products.map(p => ({
//             id: String(p.id),
//             image: p.img,
//             name: p.name,
//             category: p.collection || "VELTORN",
//             price: String(p.price),
//             img: p.img,
//             collection: p.collection || "VELTORN",
//             badge: p.badge || "NEW",
//             sizes: p.sizes || ["S", "M", "L", "XL"],
//             brand: p.brand || "VELTORN",
//           })));
//         }
//       })
//       .catch(() => {});
//   }, []);

//   const handleProductClick = (shirt) => {
//     window.scrollTo(0, 0);
//     navigate(`/product/${shirt.id}`, { state: { product: shirt } });
//   };

//   // Particle animation
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

//     const mesh = new Mesh(gl, {
//       mode: gl.POINTS,
//       geometry: new Geometry(gl, {
//         position: { size: 3, data: pos },
//         random: { size: 4, data: rnd },
//       }),
//       program,
//     });

//     const handleMouseMove = (e) => {
//       mouseRef.current = {
//         x: (e.clientX / window.innerWidth) * 2 - 1,
//         y: -(e.clientY / window.innerHeight) * 2 + 1,
//       };
//     };
//     window.addEventListener("mousemove", handleMouseMove);

//     const resize = () => {
//       renderer.setSize(container.clientWidth, container.clientHeight);
//       camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
//     };
//     window.addEventListener("resize", resize);
//     resize();

//     let frame;
//     const update = (t) => {
//       frame = requestAnimationFrame(update);
//       program.uniforms.uTime.value = t * 0.001;
//       mesh.rotation.y += (mouseRef.current.x * 0.2 - mesh.rotation.y) * 0.05;
//       mesh.rotation.x += (-mouseRef.current.y * 0.2 - mesh.rotation.x) * 0.05;
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

//       <img src="/assets/images/heroimg.jpg" className="absolute inset-0 w-full h-full object-cover opacity-20 z-0" alt="bg" />
//       <div ref={particleContainerRef} className="absolute inset-0 z-5 pointer-events-none" />

//       <div className="absolute top-32 left-8 md:left-12 z-20 pointer-events-none">
//         <h1 className="text-4xl md:text-7xl font-bold leading-tight tracking-tighter scale-y-[1.4]">
//           MERCH THAT HITS<br /><span className="text-red-600">DIFFERENT</span>
//         </h1>
//       </div>

//       <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
//         <div
//           className="relative w-72 h-80 sm:w-96 sm:h-112 flex items-center justify-center cursor-pointer"
//           onClick={() => handleProductClick(shirts[index])}
//         >
//           <img
//             key={index}
//             src={shirts[index].image}
//             className={`max-h-full max-w-full object-contain transition-all duration-500 hover:scale-105 ${direction === "next" ? "animate-in slide-in-from-right-10" : "animate-in slide-in-from-left-10"}`}
//             alt="shirt"
//           />
//           <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
//             Click to view
//           </div>
//         </div>

//         <div className="flex items-center gap-6 mt-4">
//           <button onClick={prevSlide} className="w-10 h-10 flex items-center justify-center bg-white text-black rounded-lg font-bold hover:bg-gray-200 transition cursor-pointer">‹</button>
//           <span className="text-sm">{index + 1} / {shirts.length}</span>
//           <button onClick={nextSlide} className="w-10 h-10 flex items-center justify-center bg-white text-black rounded-lg font-bold hover:bg-gray-200 transition cursor-pointer">›</button>
//         </div>
//       </div>

//       <div
//         onClick={() => handleProductClick(shirts[index])}
//         className="absolute bottom-6 right-6 z-30 bg-white text-black w-72 p-4 rounded-2xl shadow-2xl flex gap-4 transition-transform duration-300 hover:scale-105 cursor-pointer"
//       >
//         <img src={shirts[index].image} className="w-16 h-20 object-cover rounded-lg bg-gray-100" alt="thumb" />
//         <div className="flex flex-col justify-between flex-1">
//           <div>
//             <h3 className="font-bold text-[13px] uppercase leading-tight">{shirts[index].name}</h3>
//             <p className="text-gray-500 text-[10px] mt-1">{shirts[index].category}</p>
//           </div>
//           <div className="flex items-center gap-2 bg-black text-white px-3 py-1.5 rounded-lg w-fit mt-2">
//             <ShoppingBag size={12} />
//             <span className="font-bold text-[11px]">₹{shirts[index].price}</span>
//           </div>
//         </div>
//       </div>

//       <div className="absolute bottom-10 left-8 z-20 text-[10px] tracking-[0.2em] opacity-60">
//         <p className="font-bold text-white uppercase tracking-widest leading-loose">Veltorn Clothing Group</p>
//         <p>India / 2026</p>
//       </div>

//       <div className="absolute bottom-0 left-0 w-full h-40 bg-linear-to-t from-black to-transparent pointer-events-none z-10" />
//     </section>
//   );
// }


import { useState, useEffect, useRef } from "react";
import { ShoppingBag } from "lucide-react";
import { Renderer, Camera, Geometry, Program, Mesh } from "ogl";
import { useNavigate } from "react-router-dom";
import { pageProductsAPI } from "../../../services/api";

const STATIC_SHIRTS = [
  { id: "hero1", image: "/assets/images/heroimg1.png", name: "PINK FLOYD WORLD TOUR", category: "BAND T-SHIRT", price: "2799", img: "/assets/images/heroimg1.png", collection: "BAND SERIES", badge: "NEW", sizes: ["S", "M", "L", "XL"], brand: "VELTORN" },
  { id: "hero2", image: "/assets/images/heroimg2.png", name: "METALLICA BLACK EDITION", category: "BAND T-SHIRT", price: "3099", img: "/assets/images/heroimg2.png", collection: "BAND SERIES", badge: "LIMITED", sizes: ["M", "L", "XL", "XXL"], brand: "VELTORN" },
  { id: "hero3", image: "/assets/images/heroimg3.png", name: "NIRVANA CLASSIC DROP", category: "BAND T-SHIRT", price: "2499", img: "/assets/images/heroimg3.png", collection: "BAND SERIES", badge: "NEW", sizes: ["S", "M", "L"], brand: "VELTORN" },
  { id: "hero4", image: "/assets/images/heroimg4.png", name: "LINKIN PARK LIMITED", category: "BAND T-SHIRT", price: "2999", img: "/assets/images/heroimg4.png", collection: "BAND SERIES", badge: "LIMITED", sizes: ["M", "L", "XL"], brand: "VELTORN" },
  { id: "hero5", image: "/assets/images/heroimg5.png", name: "ARCTIC MONKEYS TOUR", category: "BAND T-SHIRT", price: "2799", img: "/assets/images/heroimg5.png", collection: "BAND SERIES", badge: "NEW", sizes: ["S", "M", "L", "XL", "XXL"], brand: "VELTORN" },
];

export default function HeroVideo() {
  const [shirts, setShirts] = useState([]);           // ← empty, no flash
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState("next");
  const particleContainerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    pageProductsAPI.getSection("hero")
      .then(data => {
        if (data.products && data.products.length > 0) {
          setShirts(data.products.map(p => ({
            id: String(p.id),
            image: p.img,
            name: p.name,
            category: p.collection || "VELTORN",
            price: String(p.price),
            img: p.img,
            collection: p.collection || "VELTORN",
            badge: p.badge || "NEW",
            sizes: p.sizes || ["S", "M", "L", "XL"],
            brand: p.brand || "VELTORN",
          })));
        } else {
          setShirts(STATIC_SHIRTS);   // fallback agar backend mein kuch nahi
        }
      })
      .catch(() => setShirts(STATIC_SHIRTS))  // error pe bhi fallback
      .finally(() => setLoading(false));
  }, []);

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
      <div className="absolute top-32 left-8 md:left-12 z-20 pointer-events-none">
        <h1 className="text-4xl md:text-7xl font-bold leading-tight tracking-tighter scale-y-[1.4]">
          MERCH THAT HITS<br /><span className="text-red-600">DIFFERENT</span>
        </h1>
      </div>

      {/* Loading state — spinner, no flash */}
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      ) : shirts.length > 0 && (
        <>
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
        </>
      )}

      <div className="absolute bottom-10 left-8 z-20 text-[10px] tracking-[0.2em] opacity-60">
        <p className="font-bold text-white uppercase tracking-widest leading-loose">Veltorn Clothing Group</p>
        <p>India / 2026</p>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-40 bg-linear-to-t from-black to-transparent pointer-events-none z-10" />
    </section>
  );
}