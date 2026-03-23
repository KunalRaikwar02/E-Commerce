import { useEffect, useRef } from "react";

export default function MouseTrail() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;

    let mouseX = 0;
    let mouseY = 0;

    let ringX = 0;
    let ringY = 0;

    const ringSpeed = 0.15; // smooth lag for outer ring

    const moveCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Dot follows instantly
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    };

    window.addEventListener("mousemove", moveCursor);

    const animate = () => {
      ringX += (mouseX - ringX) * ringSpeed;
      ringY += (mouseY - ringY) * ringSpeed;

      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;

      requestAnimationFrame(animate);
    };

    animate();

    // Hover effect (grow ring slightly)
    const handleHover = (e) => {
      if (
        e.target.closest(
          "button, a, input, textarea, [role='button'], .cursor-pointer"
        )
      ) {
        ring.style.transform += " scale(1.6)";
      } else {
        ring.style.transform += " scale(1)";
      }
    };

    window.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleHover);
    };
  }, []);

  return (
    <>
      {/* Hide default cursor */}
      <style>{`body { cursor: none; }`}</style>

      {/* Small center dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-black rounded-full pointer-events-none z-9999 -translate-x-1/2 -translate-y-1/2"
      />

      {/* Outer smooth ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-15 h-15 border border-black rounded-full pointer-events-none z-9998 -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 ease-out"
      />
    </>
  );
}