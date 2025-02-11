import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import fav from "./assets/favicon.png"
import "./App.css";
import HomePage from "./website/homepage/HomePage";
import AboutUs from "./website/aboutUs/AboutUs";
import { Navbar } from "./website/homepage/components/Navbar";
import Footer from "./website/homepage/components/Footer";
import FeaturePage from "./website/feature/FeaturePage";
import ProductPage from "./website/product/ProductPage";
import Pricepage from "./website/price/Pricepage";
import ContactPage from "./website/contactUs/ContactPage";

export default function App() {
  useEffect(() => {
    const setFavicon = (faviconUrl) => {
      let link = document.querySelector("link[rel='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        link.sizes = "64x64"; // Set a larger size
        link.type = "image/png"; // Ensure proper type
        document.head.appendChild(link);
      }
      link.href = faviconUrl;
    };
  
    setFavicon("/favicon-64x64.png"); // Replace with your larger favicon
  }, []);
  

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/features" element={<FeaturePage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/pricing" element={<Pricepage />} />
        <Route path="/contact-us" element={<ContactPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}
