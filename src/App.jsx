import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import Middle from "./Components/Middle/Middle";
import Destinations from "./Components/Destinations/Destinations";
import Portfolio from "./Components/Portfolio/Portfolio";
import Reviews from "./Components/Reviews/Reviews";
import Questions from "./Components/Questions/Questions";
import Subscribe from "./Components/Subscribe/Subscribe";
import Packages from "./Components/Packages/Packages";
import Footer from "./Components/Footer/Footer";
import PaymentGateway from "./Components/Payment/PaymentGateway";

import { Routes, Route, useLocation } from "react-router-dom";
import { Element } from "react-scroll";

function App() {
  const location = useLocation();

  const isPaymentPage = location.pathname === "/payment";

  return (
    <>
      {isPaymentPage ? (
        // 🔁 Just show payment gateway page
        <Routes>
          <Route path="/payment" element={<PaymentGateway />} />
        </Routes>
      ) : (
        // 🔁 Show homepage content
        <>
          <Navbar />
          <Home />
          <Middle />
          <Element name="destinations">
            <Destinations />
          </Element>
          <Element name="reviews">
            <Reviews />
          </Element>
          <Element name="packages">
            <Packages />
          </Element>
          <Element name="about">
            <Portfolio />
          </Element>
          <Subscribe />
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
