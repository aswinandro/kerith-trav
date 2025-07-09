import React, { Suspense, lazy } from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { Element } from "react-scroll";
import Loader from "./Components/Loader/Loader";
import FloatingButtons from "./Components/FloatingButtons/FloatingButtons";

// Lazy-loaded components
const Navbar = lazy(() => import("./Components/Navbar/Navbar"));
const Home = lazy(() => import("./Components/Home/Home"));
const Middle = lazy(() => import("./Components/Middle/Middle"));
const Destinations = lazy(() => import("./Components/Destinations/Destinations"));
const Portfolio = lazy(() => import("./Components/Portfolio/Portfolio"));
const Reviews = lazy(() => import("./Components/Reviews/Reviews"));
const Questions = lazy(() => import("./Components/Questions/Questions"));
const Subscribe = lazy(() => import("./Components/Subscribe/Subscribe"));
const Packages = lazy(() => import("./Components/Packages/Packages"));
const Footer = lazy(() => import("./Components/Footer/Footer"));
const PaymentGateway = lazy(() => import("./Components/Payment/PaymentGateway"));
const PaymentSuccess = lazy(() => import("./Components/Payment/PaymentSuccess"));
const PaymentError = lazy(() => import("./Components/Payment/PaymentError"));

const LoaderFallback = () => <Loader />;

function App() {
  const location = useLocation();
  const isPaymentPage = location.pathname.startsWith("/payment");

  return (
    <Suspense fallback={<LoaderFallback />}>
      {isPaymentPage ? (
        <Routes>
          <Route path="/payment" element={<PaymentGateway />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/error" element={<PaymentError />} />
        </Routes>
      ) : (
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
          <FloatingButtons />
        </>
      )}
    </Suspense>
  );
}

export default App;
