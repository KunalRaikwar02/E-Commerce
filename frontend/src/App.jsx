import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopBanner from "./components/TopBanner";
import Navbar from "./components/Navbar";
import HeroVideo from "./components/HeroVideo";
import Categories from "./components/Categories";
import CollectionBanner from "./components/CollectionBanner";
import NewArrivals from "./components/NewArrivals";
import Accessories from "./components/Accessories";
import FilterPage from "./components/FilterPage";
import FeaturedCollection from "./components/FeaturedCollection";
import AboutBanner from "./components/AboutBanner";
import FollowSection from "./components/FollowSection";
import Footer from "./components/Footer";
import MouseTrail from "./components/MouseTrail";

function LandingPage() {
  return (
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
}

function App() {
  return (
    <Router>
      <MouseTrail />
      <TopBanner />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/collections/:categoryName" element={<FilterPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;