// import React, { useEffect, useState } from "react";

// const LoadingScreen = ({ onDone }) => {
//   const [progress, setProgress] = useState(0);
//   const [fadeOut, setFadeOut] = useState(false);

//   useEffect(() => {
//     // 5-6 seconds total loading
//     const totalDuration = 5500; // ms
//     const intervalMs = 60;
//     const steps = totalDuration / intervalMs;
//     const incrementPerStep = 100 / steps;

//     const interval = setInterval(() => {
//       setProgress((p) => {
//         const next = p + incrementPerStep + (Math.random() - 0.5) * 0.5;
//         if (next >= 100) {
//           clearInterval(interval);
//           // Start fade out
//           setTimeout(() => setFadeOut(true), 200);
//           setTimeout(() => onDone(), 800);
//           return 100;
//         }
//         return Math.min(next, 99);
//       });
//     }, intervalMs);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div
//       style={{
//         opacity: fadeOut ? 0 : 1,
//         transform: fadeOut ? "scale(1.04)" : "scale(1)",
//         transition: "opacity 0.6s ease, transform 0.6s ease",
//         position: "fixed",
//         inset: 0,
//         zIndex: 9999,
//         background: "#000",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         gap: "32px",
//       }}
//     >
//       {/* Logo */}
//       <div style={{ textAlign: "center" }}>
//         <h1
//           style={{
//             fontSize: "clamp(48px, 10vw, 96px)",
//             fontWeight: 900,
//             letterSpacing: "0.25em",
//             color: "#fff",
//             textTransform: "uppercase",
//             transform: "scaleY(1.25)",
//             transformOrigin: "center",
//             display: "block",
//             lineHeight: 1,
//           }}
//         >
//           VELTORN
//         </h1>
//         <p
//           style={{
//             fontSize: "11px",
//             color: "#444",
//             letterSpacing: "0.5em",
//             textTransform: "uppercase",
//             fontWeight: 700,
//             marginTop: "10px",
//           }}
//         >
//           Anime Streetwear
//         </p>
//       </div>

//       {/* Animated dots */}
//       <div style={{ display: "flex", gap: "8px" }}>
//         {[0, 1, 2].map((i) => (
//           <div
//             key={i}
//             style={{
//               width: "8px",
//               height: "8px",
//               borderRadius: "50%",
//               backgroundColor: "#581a90",
//               animation: `loadBounce 1s ease-in-out ${i * 0.15}s infinite`,
//             }}
//           />
//         ))}
//       </div>

//       {/* Progress bar */}
//       <div style={{ width: "min(240px, 60vw)", display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" }}>
//         <div
//           style={{
//             width: "100%",
//             height: "2px",
//             backgroundColor: "#1a1a1a",
//             borderRadius: "999px",
//             overflow: "hidden",
//           }}
//         >
//           <div
//             style={{
//               height: "100%",
//               width: `${Math.floor(progress)}%`,
//               backgroundColor: "#581a90",
//               borderRadius: "999px",
//               transition: "width 0.06s linear",
//             }}
//           />
//         </div>
//         <p
//           style={{
//             fontSize: "11px",
//             color: "#333",
//             fontWeight: 700,
//             letterSpacing: "0.3em",
//             textTransform: "uppercase",
//           }}
//         >
//           {Math.floor(progress)}%
//         </p>
//       </div>

//       <style>{`
//         @keyframes loadBounce {
//           0%, 100% { transform: translateY(0); opacity: 0.35; }
//           50% { transform: translateY(-10px); opacity: 1; }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default LoadingScreen;




import React, { useEffect, useState } from "react";

const LoadingScreen = ({ onDone }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // 3-4 seconds total
    const totalDuration = 3500;
    const intervalMs = 50;
    const steps = totalDuration / intervalMs;
    const baseIncrement = 100 / steps;

    const interval = setInterval(() => {
      setProgress((p) => {
        const jitter = (Math.random() - 0.4) * 1.5;
        const next = p + baseIncrement + jitter;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setFadeOut(true), 150);
          setTimeout(() => onDone(), 750);
          return 100;
        }
        return Math.min(next, 99.9);
      });
    }, intervalMs);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "40px",
        opacity: fadeOut ? 0 : 1,
        transform: fadeOut ? "scale(1.03)" : "scale(1)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      {/* Animated Logo Mark */}
      <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
        {/* Geometric logo shape */}
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"
          style={{ animation: "logoPulse 2s ease-in-out infinite" }}>
          <polygon points="32,4 60,20 60,44 32,60 4,44 4,20" stroke="#581a90" strokeWidth="2" fill="none"
            style={{ animation: "strokeDraw 1.5s ease forwards" }} />
          <polygon points="32,14 50,24 50,40 32,50 14,40 14,24" stroke="#581a90" strokeWidth="1" fill="none" opacity="0.5" />
          <text x="32" y="37" textAnchor="middle" fill="white" fontSize="14" fontWeight="900"
            fontFamily="Arial, sans-serif" letterSpacing="1">V</text>
        </svg>

        {/* Brand name */}
        <div style={{ display: "flex", gap: "4px" }}>
          {"VELTORN".split("").map((char, i) => (
            <span
              key={i}
              style={{
                color: "white",
                fontSize: "clamp(20px, 4vw, 32px)",
                fontWeight: 900,
                fontFamily: "Arial, sans-serif",
                letterSpacing: "0.15em",
                animation: `charFade 0.4s ease ${i * 0.06}s both`,
              }}
            >
              {char}
            </span>
          ))}
        </div>
      </div>

      {/* Progress section */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", width: "min(200px, 50vw)" }}>
        {/* Bar */}
        <div style={{ width: "100%", height: "1px", background: "#1a1a1a", borderRadius: "1px", overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              width: `${Math.floor(progress)}%`,
              background: "linear-gradient(90deg, #581a90, #9333ea)",
              borderRadius: "1px",
              transition: "width 0.05s linear",
            }}
          />
        </div>

        {/* Animated dots */}
        <div style={{ display: "flex", gap: "6px" }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: "4px", height: "4px", borderRadius: "50%",
              background: "#581a90",
              animation: `dotBounce 1.2s ease-in-out ${i * 0.18}s infinite`,
            }} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes charFade {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes logoPulse {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        @keyframes dotBounce {
          0%, 100% { transform: translateY(0); opacity: 0.3; }
          50% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;