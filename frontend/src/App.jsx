import React, { useState, useEffect } from "react";
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
import AIAssistant from "./features/ai/AIAssistant";

import "./index.css";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Backend wake-up ping
function useWakeUpBackend() {
  useEffect(() => {
    fetch(`${BASE_URL}/health`, { method: "GET" }).catch(() => {});
  }, []);
}

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

function useScrollAnimation() {
  useEffect(() => {
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("scroll-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.07, rootMargin: "0px 0px -50px 0px" }
      );
      document.querySelectorAll("section").forEach((sec, i) => {
        sec.classList.add("scroll-section");
        if (i === 0) sec.classList.add("scroll-visible");
        else observer.observe(sec);
      });
    }, 150);
    return () => clearTimeout(timer);
  }, []);
}

function ScrollManager() {
  const location = useLocation();
  const navType = useNavigationType();
  useEffect(() => {
    if (navType === "PUSH") window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname, navType]);
  return null;
}

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

function MainContent() {
  const location = useLocation();
  const path = location.pathname;

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

      {!isAdminPage && <AIAssistant />}

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

function App() {
  const [loaded, setLoaded] = useState(() => {
    return sessionStorage.getItem("veltorn_loaded") === "true";
  });

  useWakeUpBackend();

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