// import React from "react";
// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// // --- MAIN PAGE COMPONENTS ---
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
// import ProductPage from "./features/productPage/ProductPage";

// // --- OTHER FEATURES ---
// import FilterPage from "./features/filterPage/FilterPage";
// import MouseTrail from "./features/CursorEffect/MouseTrail";
// import AnimeCollection from "./features/animeCollection/AnimeCollection";
// import AnimeFooter from "./features/animeCollection/components/AnimeFooter";

// // --- ANIME SPECIFIC COMPONENTS ---
// import AnimeTopBanner from "./features/animeCollection/components/AnimeTopBanner";
// import AnimeNavbar from "./features/animeCollection/components/AnimeNavbar";

// // --- LANDING PAGE COMPONENT ---
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

// /**
//  * MAIN CONTENT COMPONENT
//  * Yahan hum conditional logic handle kar rahe hain
//  */
// function MainContent() {
//   const location = useLocation();

//   // Check kar rahe hain ki kya hum anime-collection page par hain
//   const isAnimePage = location.pathname === "/anime-collection";

//   const isProductPage = location.pathname.startsWith("/product/");
//   const useAnimeTheme = isAnimePage || isProductPage;

//   return (
//     <>
//       <MouseTrail />
      
//       {/* 1. TOP BANNER LOGIC */}
//       {/* {isAnimePage ? <AnimeTopBanner /> : <TopBanner />} */}
//       {useAnimeTheme ? <AnimeTopBanner /> : <TopBanner />}

//       {/* 2. NAVBAR LOGIC */}
//       {/* {isAnimePage ? <AnimeNavbar /> : <Navbar />} */}
//       {useAnimeTheme ? <AnimeNavbar /> : <Navbar />}

//       <main className="min-h-screen">
//         <Routes>
//           {/* Route for Home Page */}
//           <Route path="/" element={<LandingPage />} />
          
//           {/* Route for Filter/Category Page */}
//           <Route path="/collections/:categoryName" element={<FilterPage />} />

//           {/* Anime Collection Page */}
//           <Route path="/anime-collection" element={<AnimeCollection />} />

//           <Route path="/product/:productId" element={<ProductPage />} />
//         </Routes>
//       </main>

//       {/* 3. AGAR ANIME PAGE NAHI HAI, TABHI RED FOOTER DIKHAO */}
//       {useAnimeTheme ? <AnimeFooter /> : <Footer />}
//     </>
//   );
// }

// /**
//  * MAIN APP COMPONENT
//  */
// function App() {
//   return (
//     <Router>
//       <MainContent />
//     </Router>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// --- CART & CHECKOUT FEATURES (Fixed Paths) ---
import { CartProvider } from "./features/cart/CartContext";
import CartDrawer from "./features/cart/CartDrawer";
import CheckoutPage from "./features/checkout/CheckoutPage";
import OrderSuccess from "./features/checkout/OrderSuccess";

// --- MAIN PAGE COMPONENTS ---
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
import ProductPage from "./features/productPage/ProductPage";

// --- OTHER FEATURES ---
import FilterPage from "./features/filterPage/FilterPage";
import MouseTrail from "./features/CursorEffect/MouseTrail";
import AnimeCollection from "./features/animeCollection/AnimeCollection";
import AnimeFooter from "./features/animeCollection/components/AnimeFooter";

// --- ANIME SPECIFIC COMPONENTS ---
import AnimeTopBanner from "./features/animeCollection/components/AnimeTopBanner";
import AnimeNavbar from "./features/animeCollection/components/AnimeNavbar";

// --- LANDING PAGE COMPONENT ---
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

/**
 * MAIN CONTENT COMPONENT
 */
function MainContent() {
  const location = useLocation();

  // Pages Check
  const isAnimePage = location.pathname === "/anime-collection";
  const isProductPage = location.pathname.startsWith("/product/");
  
  // Checkout aur Success page par simple layout rakhne ke liye logic
  const isCheckoutPage = location.pathname === "/checkout" || location.pathname === "/order-success";
  
  const useAnimeTheme = isAnimePage || isProductPage;

  return (
    <>
      <MouseTrail />
      
      {/* Global Cart Drawer hamesha ready rahega */}
      <CartDrawer />
      
      {/* Header Logic: Checkout page par banners aur nav chupa sakte ho */}
      {!isCheckoutPage && (
        <>
          {useAnimeTheme ? <AnimeTopBanner /> : <TopBanner />}
          {useAnimeTheme ? <AnimeNavbar /> : <Navbar />}
        </>
      )}

      {/* Header Logic: Isse confirm karo ki ye !isCheckoutPage ke andar hai */}
{!isCheckoutPage && (
  <>
    {useAnimeTheme ? <AnimeTopBanner /> : <TopBanner />}
    {useAnimeTheme ? <AnimeNavbar /> : <Navbar />}
  </>
)}

      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/collections/:categoryName" element={<FilterPage />} />
          <Route path="/anime-collection" element={<AnimeCollection />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          
          {/* Naye Routes */}
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success" element={<OrderSuccess />} />
        </Routes>
      </main>

      {/* Footer Logic */}
      {!isCheckoutPage && (
        useAnimeTheme ? <AnimeFooter /> : <Footer />
      )}
    </>
  );
}

/**
 * MAIN APP COMPONENT
 */
function App() {
  return (
    <Router>
      {/* Poori App ko CartProvider ke andar wrap kar diya */}
      <CartProvider>
        <MainContent />
      </CartProvider>
    </Router>
  );
}

export default App;