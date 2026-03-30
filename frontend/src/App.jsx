import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

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

// --- OTHER FEATURES ---
import FilterPage from "./features/filterPage/FilterPage";
import MouseTrail from "./features/CursorEffect/MouseTrail";
import AnimeCollection from "./features/animeCollection/AnimeCollection";

// --- ANIME SPECIFIC COMPONENTS ---
import AnimeTopBanner from "./features/animeCollection/components/AnimeTopBanner";
import AnimeNavbar from "./features/animeCollection/components/AnimeNavbar";

// --- STYLES ---
import "./App.css";

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
 * Yahan hum conditional logic handle kar rahe hain
 */
function MainContent() {
  const location = useLocation();

  // Check kar rahe hain ki kya hum anime-collection page par hain
  const isAnimePage = location.pathname === "/anime-collection";

  return (
    <>
      <MouseTrail />
      
      {/* 1. TOP BANNER LOGIC */}
      {isAnimePage ? <AnimeTopBanner /> : <TopBanner />}
      
      {/* 2. NAVBAR LOGIC */}
      {isAnimePage ? <AnimeNavbar /> : <Navbar />}
      
      <main className="min-h-screen">
        <Routes>
          {/* Route for Home Page */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Route for Filter/Category Page */}
          <Route path="/collections/:categoryName" element={<FilterPage />} />
          
          {/* Default Route for 'Shop All' */}
          <Route path="/collections/all" element={<FilterPage />} />

          {/* Anime Collection Page */}
          <Route path="/anime-collection" element={<AnimeCollection />} />
        </Routes>
      </main>

      {/* 3. AGAR ANIME PAGE NAHI HAI, TABHI RED FOOTER DIKHAO */}
      {!isAnimePage && <Footer />}
    </>
  );
}

/**
 * MAIN APP COMPONENT
 */
function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

export default App;