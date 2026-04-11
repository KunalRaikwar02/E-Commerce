// frontend/src/hooks/useScrollAnimation.js
import { useEffect } from "react";

export function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("scroll-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.07,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const sections = document.querySelectorAll("section");
    sections.forEach((sec) => {
      sec.classList.add("scroll-section");
      observer.observe(sec);
    });

    return () => observer.disconnect();
  }, []);
}