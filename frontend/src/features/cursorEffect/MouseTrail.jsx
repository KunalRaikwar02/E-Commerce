import { useEffect, useRef, useState } from "react";

export default function MouseTrail() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isWhite, setIsWhite] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let scale = 1;

    const moveCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const target = e.target;

      const isHeroOrNav = target.closest('[data-cursor="white"]') || target.closest("nav");

      const isOverTopBanner = target.closest(".top-banner") || target.closest("[class*='banner']");

      if (isHeroOrNav && !isOverTopBanner) {
        setIsWhite(true);
      } else {
        setIsWhite(false);
      }

      // Hover/Pointer logic for scale
      const isPointer = !!target.closest("button, a, .cursor-pointer");
      scale = isPointer ? 1.6 : 1;

      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) scale(${scale})`;
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", moveCursor);
    const animationFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      <style>{`
        body { cursor: none !important; }
        .cursor-el {
          position: fixed;
          top: 0;
          left: 0;
          pointer-events: none;
          border-radius: 50%;
          transition: background-color 0.3s ease, border-color 0.3s ease;
        }
      `}</style>

      <div
        ref={dotRef}
        className={`cursor-el w-2 h-2 z-9999 -translate-x-1/2 -translate-y-1/2 ${
          isWhite ? "bg-white" : "bg-black"
        }`}
      />

      <div
        ref={ringRef}
        className={`cursor-el w-12 h-12 border z-9998 -translate-x-1/2 -translate-y-1/2 ${
          isWhite ? "border-white" : "border-black"
        }`}
      />
    </>
  );
}