// // // // import React from "react";
// // // // import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// // // // // --- MAIN PAGE COMPONENTS ---
// // // // import TopBanner from "./features/mainPage/topBanner/TopBanner";
// // // // import Navbar from "./features/mainPage/navbar/Navbar";
// // // // import HeroVideo from "./features/mainPage/heroPage/HeroVideo";
// // // // import Categories from "./features/mainPage/categories/Categories";
// // // // import CollectionBanner from "./features/mainPage/collection/CollectionBanner";
// // // // import NewArrivals from "./features/mainPage/newArrivals/NewArrivals";
// // // // import Accessories from "./features/mainPage/accessories/Accessories";
// // // // import FeaturedCollection from "./features/mainPage/featureCollection/FeaturedCollection";
// // // // import AboutBanner from "./features/mainPage/aboutUs/AboutBanner";
// // // // import FollowSection from "./features/mainPage/followUs/FollowSection";
// // // // import Footer from "./features/mainPage/footer/Footer";
// // // // import ProductPage from "./features/productPage/ProductPage";

// // // // // --- OTHER FEATURES ---
// // // // import FilterPage from "./features/filterPage/FilterPage";
// // // // import MouseTrail from "./features/CursorEffect/MouseTrail";
// // // // import AnimeCollection from "./features/animeCollection/AnimeCollection";
// // // // import AnimeFooter from "./features/animeCollection/components/AnimeFooter";

// // // // // --- ANIME SPECIFIC COMPONENTS ---
// // // // import AnimeTopBanner from "./features/animeCollection/components/AnimeTopBanner";
// // // // import AnimeNavbar from "./features/animeCollection/components/AnimeNavbar";

// // // // // --- LANDING PAGE COMPONENT ---
// // // // const LandingPage = () => (
// // // //   <>
// // // //     <HeroVideo />
// // // //     <Categories />
// // // //     <CollectionBanner />
// // // //     <NewArrivals />
// // // //     <Accessories />
// // // //     <FeaturedCollection />
// // // //     <AboutBanner />
// // // //     <FollowSection />
// // // //   </>
// // // // );

// // // // /**
// // // //  * MAIN CONTENT COMPONENT
// // // //  * Yahan hum conditional logic handle kar rahe hain
// // // //  */
// // // // function MainContent() {
// // // //   const location = useLocation();

// // // //   // Check kar rahe hain ki kya hum anime-collection page par hain
// // // //   const isAnimePage = location.pathname === "/anime-collection";

// // // //   const isProductPage = location.pathname.startsWith("/product/");
// // // //   const useAnimeTheme = isAnimePage || isProductPage;

// // // //   return (
// // // //     <>
// // // //       <MouseTrail />
      
// // // //       {/* 1. TOP BANNER LOGIC */}
// // // //       {/* {isAnimePage ? <AnimeTopBanner /> : <TopBanner />} */}
// // // //       {useAnimeTheme ? <AnimeTopBanner /> : <TopBanner />}

// // // //       {/* 2. NAVBAR LOGIC */}
// // // //       {/* {isAnimePage ? <AnimeNavbar /> : <Navbar />} */}
// // // //       {useAnimeTheme ? <AnimeNavbar /> : <Navbar />}

// // // //       <main className="min-h-screen">
// // // //         <Routes>
// // // //           {/* Route for Home Page */}
// // // //           <Route path="/" element={<LandingPage />} />
          
// // // //           {/* Route for Filter/Category Page */}
// // // //           <Route path="/collections/:categoryName" element={<FilterPage />} />

// // // //           {/* Anime Collection Page */}
// // // //           <Route path="/anime-collection" element={<AnimeCollection />} />

// // // //           <Route path="/product/:productId" element={<ProductPage />} />
// // // //         </Routes>
// // // //       </main>

// // // //       {/* 3. AGAR ANIME PAGE NAHI HAI, TABHI RED FOOTER DIKHAO */}
// // // //       {useAnimeTheme ? <AnimeFooter /> : <Footer />}
// // // //     </>
// // // //   );
// // // // }

// // // // /**
// // // //  * MAIN APP COMPONENT
// // // //  */
// // // // function App() {
// // // //   return (
// // // //     <Router>
// // // //       <MainContent />
// // // //     </Router>
// // // //   );
// // // // }

// // // // export default App;


// // // import React from "react";
// // // import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// // // // --- CART & CHECKOUT FEATURES (Fixed Paths) ---
// // // import { CartProvider } from "./features/cart/CartContext";
// // // import CartDrawer from "./features/cart/CartDrawer";
// // // import CheckoutPage from "./features/checkout/CheckoutPage";
// // // import OrderSuccess from "./features/checkout/OrderSuccess";

// // // // --- MAIN PAGE COMPONENTS ---
// // // import TopBanner from "./features/mainPage/topBanner/TopBanner";
// // // import Navbar from "./features/mainPage/navbar/Navbar";
// // // import HeroVideo from "./features/mainPage/heroPage/HeroVideo";
// // // import Categories from "./features/mainPage/categories/Categories";
// // // import CollectionBanner from "./features/mainPage/collection/CollectionBanner";
// // // import NewArrivals from "./features/mainPage/newArrivals/NewArrivals";
// // // import Accessories from "./features/mainPage/accessories/Accessories";
// // // import FeaturedCollection from "./features/mainPage/featureCollection/FeaturedCollection";
// // // import AboutBanner from "./features/mainPage/aboutUs/AboutBanner";
// // // import FollowSection from "./features/mainPage/followUs/FollowSection";
// // // import Footer from "./features/mainPage/footer/Footer";
// // // import ProductPage from "./features/productPage/ProductPage";

// // // // --- OTHER FEATURES ---
// // // import FilterPage from "./features/filterPage/FilterPage";
// // // import MouseTrail from "./features/CursorEffect/MouseTrail";
// // // import AnimeCollection from "./features/animeCollection/AnimeCollection";
// // // import AnimeFooter from "./features/animeCollection/components/AnimeFooter";

// // // // --- ANIME SPECIFIC COMPONENTS ---
// // // import AnimeTopBanner from "./features/animeCollection/components/AnimeTopBanner";
// // // import AnimeNavbar from "./features/animeCollection/components/AnimeNavbar";

// // // // --- LANDING PAGE COMPONENT ---
// // // const LandingPage = () => (
// // //   <>
// // //     <HeroVideo />
// // //     <Categories />
// // //     <CollectionBanner />
// // //     <NewArrivals />
// // //     <Accessories />
// // //     <FeaturedCollection />
// // //     <AboutBanner />
// // //     <FollowSection />
// // //   </>
// // // );

// // // /**
// // //  * MAIN CONTENT COMPONENT
// // //  */
// // // function MainContent() {
// // //   const location = useLocation();

// // //   // Pages Check
// // //   const isAnimePage = location.pathname === "/anime-collection";
// // //   const isProductPage = location.pathname.startsWith("/product/");
  
// // //   // Checkout aur Success page par simple layout rakhne ke liye logic
// // //   const isCheckoutPage = location.pathname === "/checkout" || location.pathname === "/order-success";
  
// // //   const useAnimeTheme = isAnimePage || isProductPage;

// // //   return (
// // //     <>
// // //       <MouseTrail />
      
// // //       {/* Global Cart Drawer hamesha ready rahega */}
// // //       <CartDrawer />
      
// // //       {/* Header Logic: Checkout page par banners aur nav chupa sakte ho */}
// // //       {!isCheckoutPage && (
// // //         <>
// // //           {useAnimeTheme ? <AnimeTopBanner /> : <TopBanner />}
// // //           {useAnimeTheme ? <AnimeNavbar /> : <Navbar />}
// // //         </>
// // //       )}

// // //       {/* Header Logic: Isse confirm karo ki ye !isCheckoutPage ke andar hai */}
// // // {!isCheckoutPage && (
// // //   <>
// // //     {useAnimeTheme ? <AnimeTopBanner /> : <TopBanner />}
// // //     {useAnimeTheme ? <AnimeNavbar /> : <Navbar />}
// // //   </>
// // // )}

// // //       <main className="min-h-screen">
// // //         <Routes>
// // //           <Route path="/" element={<LandingPage />} />
// // //           <Route path="/collections/:categoryName" element={<FilterPage />} />
// // //           <Route path="/anime-collection" element={<AnimeCollection />} />
// // //           <Route path="/product/:productId" element={<ProductPage />} />
          
// // //           {/* Naye Routes */}
// // //           <Route path="/checkout" element={<CheckoutPage />} />
// // //           <Route path="/order-success" element={<OrderSuccess />} />
// // //         </Routes>
// // //       </main>

// // //       {/* Footer Logic */}
// // //       {!isCheckoutPage && (
// // //         useAnimeTheme ? <AnimeFooter /> : <Footer />
// // //       )}
// // //     </>
// // //   );
// // // }

// // // /**
// // //  * MAIN APP COMPONENT
// // //  */
// // // function App() {
// // //   return (
// // //     <Router>
// // //       {/* Poori App ko CartProvider ke andar wrap kar diya */}
// // //       <CartProvider>
// // //         <MainContent />
// // //       </CartProvider>
// // //     </Router>
// // //   );
// // // }

// // // export default App;




// // import React from "react";
// // import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// // // ─── Providers ────────────────────────────────────────────────
// // import { AuthProvider } from "./features/auth/AuthContext";
// // import { CartProvider } from "./features/cart/CartContext";

// // // ─── Cart & Checkout ─────────────────────────────────────────
// // import CartDrawer from "./features/cart/CartDrawer";
// // import CheckoutPage from "./features/checkout/CheckoutPage";
// // import OrderSuccess from "./features/checkout/OrderSuccess";

// // // ─── Auth ─────────────────────────────────────────────────────
// // import MyOrders from "./features/auth/MyOrders";

// // // ─── Admin ────────────────────────────────────────────────────
// // import AdminPanel from "./features/admin/AdminPanel";

// // // ─── Main Page ────────────────────────────────────────────────
// // import TopBanner from "./features/mainPage/topBanner/TopBanner";
// // import Navbar from "./features/mainPage/navbar/Navbar";
// // import HeroVideo from "./features/mainPage/heroPage/HeroVideo";
// // import Categories from "./features/mainPage/categories/Categories";
// // import CollectionBanner from "./features/mainPage/collection/CollectionBanner";
// // import NewArrivals from "./features/mainPage/newArrivals/NewArrivals";
// // import Accessories from "./features/mainPage/accessories/Accessories";
// // import FeaturedCollection from "./features/mainPage/featureCollection/FeaturedCollection";
// // import AboutBanner from "./features/mainPage/aboutUs/AboutBanner";
// // import FollowSection from "./features/mainPage/followUs/FollowSection";
// // import Footer from "./features/mainPage/footer/Footer";

// // // ─── Other Features ───────────────────────────────────────────
// // import FilterPage from "./features/filterPage/FilterPage";
// // import MouseTrail from "./features/cursorEffect/MouseTrail";
// // import AnimeCollection from "./features/animeCollection/AnimeCollection";
// // import ProductPage from "./features/productPage/ProductPage";

// // // ─── Anime Components ─────────────────────────────────────────
// // import AnimeTopBanner from "./features/animeCollection/components/AnimeTopBanner";
// // import AnimeNavbar from "./features/animeCollection/components/AnimeNavbar";
// // import AnimeFooter from "./features/animeCollection/components/AnimeFooter";

// // import "./index.css";

// // // Landing Page
// // const LandingPage = () => (
// //   <>
// //     <HeroVideo />
// //     <Categories />
// //     <CollectionBanner />
// //     <NewArrivals />
// //     <Accessories />
// //     <FeaturedCollection />
// //     <AboutBanner />
// //     <FollowSection />
// //   </>
// // );

// // function MainContent() {
// //   const location = useLocation();
// //   const path = location.pathname;

// //   const isAnimePage = path === "/anime-collection";
// //   const isProductPage = path.startsWith("/product/");
// //   const isAdminPage = path.startsWith("/admin");
// //   const isCheckoutPage = path === "/checkout" || path === "/order-success";
// //   const isMyOrdersPage = path === "/my-orders";

// //   // Admin page — apna poora layout hai, kuch nahi dikhana
// //   if (isAdminPage) {
// //     return <AdminPanel />;
// //   }

// //   // Anime ya Product page — anime theme
// //   const useAnimeTheme = isAnimePage || isProductPage;

// //   // Checkout/Orders — sirf content, koi banner/footer nahi
// //   const hideAll = isCheckoutPage || isMyOrdersPage;

// //   return (
// //     <>
// //       <MouseTrail />
// //       <CartDrawer />

// //       {/* Top Banner */}
// //       {!hideAll && (useAnimeTheme ? <AnimeTopBanner /> : <TopBanner />)}

// //       {/* Navbar */}
// //       {!hideAll && (useAnimeTheme ? <AnimeNavbar /> : <Navbar />)}

// //       {/* Checkout/MyOrders pe bhi navbar dikhao */}
// //       {hideAll && <Navbar />}

// //       <main className="min-h-screen">
// //         <Routes>
// //           <Route path="/" element={<LandingPage />} />
// //           <Route path="/collections/:categoryName" element={<FilterPage />} />
// //           <Route path="/anime-collection" element={<AnimeCollection />} />
// //           <Route path="/product/:productId" element={<ProductPage />} />
// //           <Route path="/checkout" element={<CheckoutPage />} />
// //           <Route path="/order-success" element={<OrderSuccess />} />
// //           <Route path="/my-orders" element={<MyOrders />} />
// //         </Routes>
// //       </main>

// //       {/* Footer */}
// //       {!hideAll && (useAnimeTheme ? <AnimeFooter /> : <Footer />)}
// //     </>
// //   );
// // }

// // function App() {
// //   return (
// //     <Router>
// //       <AuthProvider>
// //         <CartProvider>
// //           <MainContent />
// //         </CartProvider>
// //       </AuthProvider>
// //     </Router>
// //   );
// // }

// // export default App;




// import React, { useState, useEffect, useRef } from "react";
// import { BrowserRouter as Router, Routes, Route, useLocation, useNavigationType } from "react-router-dom";

// // ─── Providers ────────────────────────────────────────────────
// import { AuthProvider } from "./features/auth/AuthContext";
// import { CartProvider } from "./features/cart/CartContext";

// // ─── Loading ──────────────────────────────────────────────────
// import LoadingScreen from "./features/loading/LoadingScreen";

// // ─── Cart & Checkout ─────────────────────────────────────────
// import CartDrawer from "./features/cart/CartDrawer";
// import CheckoutPage from "./features/checkout/CheckoutPage";
// import OrderSuccess from "./features/checkout/OrderSuccess";

// // ─── Auth ─────────────────────────────────────────────────────
// import MyOrders from "./features/auth/MyOrders";
// import UserProfile from "./features/auth/UserProfile";
// import OrderDetail from "./features/auth/OrderDetail";

// // ─── Admin ────────────────────────────────────────────────────
// import AdminPanel from "./features/admin/AdminPanel";

// // ─── Main Page ────────────────────────────────────────────────
// import TopBanner from "./features/mainPage/topBanner/TopBanner";
// import Navbar from "./features/mainPage/navbar/Navbar";
// import HeroVideo from "./features/mainPage/heroPage/HeroVideo";
// import Categories from "./features/mainPage/categories/Categories";
// import CollectionBanner from "./features/mainPage/collection/CollectionBanner";
// import NewArrivals from "./features/mainPage/newArrivals/NewArrivals";
// import Accessories from "./features/mainPage/accessories/Accessories";
// import FeaturedCollection from "./features/mainPage/featureCollection/FeaturedCollection";
// import AboutBanner from "./features/mainPage/aboutUs/AboutBanner";
// import FollowSection from "./features/mainPage/followUs/FollowSection";
// import Footer from "./features/mainPage/footer/Footer";

// // ─── Other Features ───────────────────────────────────────────
// import FilterPage from "./features/filterPage/FilterPage";
// import MouseTrail from "./features/cursorEffect/MouseTrail";
// import AnimeCollection from "./features/animeCollection/AnimeCollection";
// import ProductPage from "./features/productPage/ProductPage";

// // ─── Anime ────────────────────────────────────────────────────
// import AnimeTopBanner from "./features/animeCollection/components/AnimeTopBanner";
// import AnimeNavbar from "./features/animeCollection/components/AnimeNavbar";
// import AnimeFooter from "./features/animeCollection/components/AnimeFooter";

// import "./index.css";

// // Landing Page
// const LandingPage = () => (
//   <>
//     <HeroVideo />
//     <Categories />
//     <CollectionBanner />
//     <NewArrivals />
//     <Accessories />
//     <FeaturedCollection />
//     <AboutBanner />
//     <FollowSection />
//   </>
// );

// // ─── Scroll Manager ───────────────────────────────────────────
// // Scroll to top ONLY on PUSH (new navigation), NOT on POP (back/forward)
// // This preserves scroll position when going back
// function ScrollManager() {
//   const location = useLocation();
//   const navType = useNavigationType();

//   useEffect(() => {
//     // Only scroll to top when navigating forward (PUSH), not back (POP)
//     if (navType === "PUSH") {
//       window.scrollTo({ top: 0, behavior: "instant" });
//     }
//     // POP = browser back/forward → browser restores scroll position automatically
//   }, [location.pathname, navType]);

//   return null;
// }

// // ─── Page Fade Transition ─────────────────────────────────────
// function PageTransition({ children }) {
//   const location = useLocation();
//   const [show, setShow] = useState(true);

//   useEffect(() => {
//     setShow(false);
//     const t = setTimeout(() => setShow(true), 50);
//     return () => clearTimeout(t);
//   }, [location.pathname]);

//   return (
//     <div
//       style={{
//         opacity: show ? 1 : 0,
//         transition: "opacity 0.2s ease",
//       }}
//     >
//       {children}
//     </div>
//   );
// }

// // ─── Main Content ─────────────────────────────────────────────
// function MainContent() {
//   const location = useLocation();
//   const path = location.pathname;

//   const isAnimePage = path === "/anime-collection";
//   const isProductPage = path.startsWith("/product/");
//   const isAdminPage = path.startsWith("/admin");
//   const isCheckoutPage = path === "/checkout" || path === "/order-success";
//   const isAuthPage = path === "/my-orders" || path === "/profile" || path.startsWith("/order/");

//   if (isAdminPage) return <AdminPanel />;

//   const useAnimeTheme = isAnimePage || isProductPage;
//   const hideHeaderFooter = isCheckoutPage || isAuthPage;

//   return (
//     <>
//       <ScrollManager />
//       <MouseTrail />
//       <CartDrawer />

//       {/* Top Banner */}
//       {hideHeaderFooter ? <TopBanner /> : useAnimeTheme ? <AnimeTopBanner /> : <TopBanner />}

//       {/* Navbar */}
//       {hideHeaderFooter ? <Navbar /> : useAnimeTheme ? <AnimeNavbar /> : <Navbar />}

//       <main className="min-h-screen">
//         <PageTransition>
//           <Routes>
//             <Route path="/" element={<LandingPage />} />
//             <Route path="/collections/:categoryName" element={<FilterPage />} />
//             <Route path="/anime-collection" element={<AnimeCollection />} />
//             <Route path="/product/:productId" element={<ProductPage />} />
//             <Route path="/checkout" element={<CheckoutPage />} />
//             <Route path="/order-success" element={<OrderSuccess />} />
//             <Route path="/my-orders" element={<MyOrders />} />
//             <Route path="/profile" element={<UserProfile />} />
//             <Route path="/order/:orderId" element={<OrderDetail />} />
//           </Routes>
//         </PageTransition>
//       </main>

//       {/* Footer */}
//       {!hideHeaderFooter && (useAnimeTheme ? <AnimeFooter /> : <Footer />)}
//     </>
//   );
// }

// // ─── App ──────────────────────────────────────────────────────
// function App() {
//   const [loaded, setLoaded] = useState(() => {
//     return sessionStorage.getItem("veltorn_loaded") === "true";
//   });

//   const handleLoadDone = () => {
//     sessionStorage.setItem("veltorn_loaded", "true");
//     setLoaded(true);
//   };

//   return (
//     <Router>
//       <AuthProvider>
//         <CartProvider>
//           {!loaded ? (
//             <LoadingScreen onDone={handleLoadDone} />
//           ) : (
//             <MainContent />
//           )}
//         </CartProvider>
//       </AuthProvider>
//     </Router>
//   );
// }

// export default App;




import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigationType } from "react-router-dom";

import { AuthProvider } from "./features/auth/AuthContext";
import { CartProvider } from "./features/cart/CartContext";
import LoadingScreen from "./features/loading/LoadingScreen";
import CartDrawer from "./features/cart/CartDrawer";
import CheckoutPage from "./features/checkout/CheckoutPage";
import OrderSuccess from "./features/checkout/OrderSuccess";
import MyOrders from "./features/auth/MyOrders";
import UserProfile from "./features/auth/UserProfile";
import OrderDetail from "./features/auth/OrderDetail";
import AdminPanel from "./features/admin/AdminPanel";
import TopBanner from "./features/mainPage/topBanner/TopBanner";
import Navbar from "./features/mainPage/navbar/Navbar";
import HeroVideo from "./features/mainPage/heroPage/HeroVideo";
import Categories from "./features/mainPage/categories/Categories";
import CollectionBanner from "./features/mainPage/collection/CollectionBanner";
import NewArrivals from "./features/mainPage/newArrivals/NewArrivals";
import Accessories from "./features/mainPage/accessories/Accessories";
import FeaturedCollection from "./features/mainPage/featureCollection/FeaturedCollection";
import AboutBanner from "./features/mainPage/aboutUs/AboutBanner";
import FollowSection from "./features/mainPage/followUs/FollowSection";
import Footer from "./features/mainPage/footer/Footer";
import FilterPage from "./features/filterPage/FilterPage";
import MouseTrail from "./features/cursorEffect/MouseTrail";
import AnimeCollection from "./features/animeCollection/AnimeCollection";
import ProductPage from "./features/productPage/ProductPage";
import AnimeTopBanner from "./features/animeCollection/components/AnimeTopBanner";
import AnimeNavbar from "./features/animeCollection/components/AnimeNavbar";
import AnimeFooter from "./features/animeCollection/components/AnimeFooter";

import "./index.css";

const LandingPage = () => (
  <>
    <HeroVideo />
    <Categories />
    <CollectionBanner />
    <NewArrivals />
    <Accessories />
    <FeaturedCollection />
    <AboutBanner />
    <FollowSection />
  </>
);

// ─── Scroll Animation — sirf ek baar, mount par ───────────────
function useScrollAnimation() {
  useEffect(() => {
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("scroll-visible");
              // Ek baar visible ho gaya — hata do observer se
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.07, rootMargin: "0px 0px -50px 0px" }
      );

      document.querySelectorAll("section").forEach((sec, i) => {
        sec.classList.add("scroll-section");
        // Pehli section (HeroVideo) — turant visible, no animation
        if (i === 0) {
          sec.classList.add("scroll-visible");
        } else {
          observer.observe(sec);
        }
      });

      // Observer ko disconnect mat karo — woh tab tak observe karta hai
      // jab tak saari sections visible nahi ho jaati
    }, 150);

    return () => clearTimeout(timer);
  }, []); // ← empty array — sirf ek baar, mount par
}

// ─── Scroll Manager ───────────────────────────────────────────
function ScrollManager() {
  const location = useLocation();
  const navType = useNavigationType();
  useEffect(() => {
    if (navType === "PUSH") window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname, navType]);
  return null;
}

// ─── Page Fade Transition ─────────────────────────────────────
function PageTransition({ children }) {
  const location = useLocation();
  const [show, setShow] = useState(true);
  useEffect(() => {
    setShow(false);
    const t = setTimeout(() => setShow(true), 50);
    return () => clearTimeout(t);
  }, [location.pathname]);
  return (
    <div style={{ opacity: show ? 1 : 0, transition: "opacity 0.2s ease" }}>
      {children}
    </div>
  );
}

// ─── Main Content ─────────────────────────────────────────────
function MainContent() {
  const location = useLocation();
  const path = location.pathname;

  // Sirf main page "/" par scroll animation
  useScrollAnimation();

  const isAnimePage = path === "/anime-collection";
  const isProductPage = path.startsWith("/product/");
  const isAdminPage = path.startsWith("/admin");
  const isCheckoutPage = path === "/checkout" || path === "/order-success";
  const isAuthPage = path === "/my-orders" || path === "/profile" || path.startsWith("/order/");

  if (isAdminPage) return <AdminPanel />;

  const useAnimeTheme = isAnimePage || isProductPage;
  const hideHeaderFooter = isCheckoutPage || isAuthPage;

  return (
    <>
      <ScrollManager />
      <MouseTrail />
      <CartDrawer />

      {hideHeaderFooter ? <TopBanner /> : useAnimeTheme ? <AnimeTopBanner /> : <TopBanner />}
      {hideHeaderFooter ? <Navbar /> : useAnimeTheme ? <AnimeNavbar /> : <Navbar />}

      <main className="min-h-screen">
        <PageTransition>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/collections/:categoryName" element={<FilterPage />} />
            <Route path="/anime-collection" element={<AnimeCollection />} />
            <Route path="/product/:productId" element={<ProductPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/order/:orderId" element={<OrderDetail />} />
          </Routes>
        </PageTransition>
      </main>

      {!hideHeaderFooter && (useAnimeTheme ? <AnimeFooter /> : <Footer />)}
    </>
  );
}

// ─── App ──────────────────────────────────────────────────────
function App() {
  const [loaded, setLoaded] = useState(() => {
    return sessionStorage.getItem("veltorn_loaded") === "true";
  });

  const handleLoadDone = () => {
    sessionStorage.setItem("veltorn_loaded", "true");
    setLoaded(true);
  };

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          {!loaded ? (
            <LoadingScreen onDone={handleLoadDone} />
          ) : (
            <MainContent />
          )}
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;