import TopBanner from "./components/TopBanner";
import Navbar from "./components/Navbar";
import HeroVideo from "./components/HeroVideo";
import Categories from "./components/Categories";
import CollectionBanner from "./components/CollectionBanner";
import NewArrivals from "./components/NewArrivals";
import Accessories from "./components/Accessories";
import FeaturedCollection from "./components/FeaturedCollection";
import AboutBanner from "./components/AboutBanner";
import FollowSection from "./components/FollowSection";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <TopBanner />
      <Navbar />

      {/* IMPORTANT WRAPPER */}
      <main>
        <HeroVideo />
        <Categories />
        <CollectionBanner />
        <NewArrivals />
        <Accessories />
        <FeaturedCollection />
        <AboutBanner />
        <FollowSection />
        <Footer />
      </main>
    </>
  );
}

export default App;