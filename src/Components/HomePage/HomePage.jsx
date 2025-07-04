import Home from "../Home/Home"
import Middle from "../Middle/Middle";
import Destinations from "../Destinations/Destinations";
import Portfolio from "../Portfolio/Portfolio";
import Reviews from "../Reviews/Reviews";
import Subscribe from "../Subscribe/Subscribe";
import Packages from "../Packages/Packages";
import Footer from "../Footer/Footer";
import { Link, Element } from "react-scroll";
import { Routes, Route } from "react-router-dom";
import PaymentGateway from "../Payment/PaymentGateway";
import Navbar from "../Navbar/Navbar";
import React from 'react'

const HomePage = () => {
  return (
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

      <Routes>
       <Route path="/" element={<HomePage />} />
        <Route path="/payment" element={<PaymentGateway />} />
      </Routes>

    </>
  );
}

export default HomePage
