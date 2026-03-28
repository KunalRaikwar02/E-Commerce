import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// ... baaki saare imports wahi rahenge jo tumne diye hain ...
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
import MouseTrail from "./features/CursorEffect/MouseTrail";
import AnimeCollection from "./features/animeCollection/AnimeCollection";

import "./App.css";

// --- LANDING PAGE ---
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
 * Iske andar hum logic likhenge ki Footer kab dikhana hai kab nahi
 */
function MainContent() {
  const location = useLocation();

  // Check kar rahe hain ki kya hum anime-collection page par hain
  const isAnimePage = location.pathname === "/anime-collection";

  return (
    <>
      <MouseTrail />
      <TopBanner />
      <Navbar />
      
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/collections/:categoryName" element={<FilterPage />} />
          <Route path="/collections/all" element={<FilterPage />} />
          <Route path="/anime-collection" element={<AnimeCollection />} />
        </Routes>
      </main>

      {/* AGAR ANIME PAGE NAHI HAI, TABHI MAIN FOOTER DIKHAO */}
      {!isAnimePage && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

export default App;